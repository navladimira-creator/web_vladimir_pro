-- Novinky o systému po registraci: právní základ je oprávněný zájem (ne zaškrtnutý souhlas).
-- Ukládáme základ a verzi věty, kterou člověk pod formulářem viděl. Sloupec marketing_consent
-- zůstává a znamená "novinky povoleny" (podle něj se kontakt posílá do Ecomailu).

alter table public.profiles
  add column marketing_basis text check (marketing_basis in ('souhlas', 'opravneny-zajem')),
  add column marketing_text_version text;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  v_basis text := case new.raw_user_meta_data ->> 'marketing_basis'
                    when 'opravneny-zajem' then 'opravneny-zajem'
                    when 'souhlas' then 'souhlas'
                  end;
begin
  insert into public.profiles (
    id, email, full_name, marketing_consent, marketing_consent_at, marketing_basis, marketing_text_version
  )
  values (
    new.id,
    new.email,
    left(nullif(trim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), ''), 100),
    v_basis is not null,
    case when v_basis is not null then now() end,
    v_basis,
    left(nullif(trim(coalesce(new.raw_user_meta_data ->> 'marketing_text_version', '')), ''), 40)
  );

  insert into public.module_access (user_id, module_id, source)
  select new.id, m.id, 'free'
  from public.modules m
  where m.is_free and m.published;

  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
