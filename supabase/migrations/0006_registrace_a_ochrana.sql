-- Milník 3: registrace, souhlas s marketingem, omezení počtu odeslání, zpřísnění funkcí.

-- 1) Profil: příznak, že kontakt je v Ecomailu
alter table public.profiles add column if not exists ecomail_synced_at timestamptz;

-- 2) Zpřísněné pomocné funkce: prázdný search_path a plně kvalifikované názvy tabulek
create or replace function public.is_admin() returns boolean
language sql security definer stable set search_path = '' as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin');
$$;

create or replace function public.has_module_access(m uuid) returns boolean
language sql security definer stable set search_path = '' as $$
  select exists (
    select 1 from public.module_access
    where user_id = (select auth.uid()) and module_id = m
      and (expires_at is null or expires_at > now())
  );
$$;

-- 3) Po registraci: profil + souhlas s marketingem (s datem) + přístup k modulům zdarma
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  v_consent boolean := coalesce(new.raw_user_meta_data ->> 'marketing_consent', '') = 'true';
begin
  insert into public.profiles (id, email, full_name, marketing_consent, marketing_consent_at)
  values (
    new.id,
    new.email,
    left(nullif(trim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), ''), 100),
    v_consent,
    case when v_consent then now() end
  );

  insert into public.module_access (user_id, module_id, source)
  select new.id, m.id, 'free'
  from public.modules m
  where m.is_free and m.published;

  return new;
end;
$$;

-- Spouštěcí funkci nesmí nikdo volat přímo přes API
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- 4) Uživatel smí v profilu měnit jen své jméno (ne e-mail, roli, souhlas ani synchronizaci)
revoke update on public.profiles from authenticated;
grant update (full_name) on public.profiles to authenticated;

-- 5) Omezení počtu odeslání (tabulka + funkce volaná jen ze serveru přes service_role)
create table public.rate_limits (
  id bigint generated always as identity primary key,
  bucket text not null,
  key_hash text not null,
  created_at timestamptz not null default now()
);
create index on public.rate_limits (bucket, key_hash, created_at);
alter table public.rate_limits enable row level security;
-- bez politik: nikdo kromě service_role se k tabulce nedostane

create or replace function public.rate_limit_hit(p_bucket text, p_key text, p_limit int, p_window interval)
returns boolean
language plpgsql security definer set search_path = '' as $$
declare
  v_count int;
begin
  delete from public.rate_limits where created_at < now() - interval '1 day';
  insert into public.rate_limits (bucket, key_hash) values (p_bucket, p_key);
  select count(*) into v_count from public.rate_limits
    where bucket = p_bucket and key_hash = p_key and created_at > now() - p_window;
  return v_count <= p_limit;
end;
$$;

revoke execute on function public.rate_limit_hit(text, text, int, interval) from public, anon, authenticated;
grant execute on function public.rate_limit_hit(text, text, int, interval) to service_role;
