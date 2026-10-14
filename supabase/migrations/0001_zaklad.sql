-- Vladimír PRO: základní databáze (fáze 1, připraveno na Stripe a AI ve fázích 2-3)

create type user_role as enum ('member', 'admin');
create type material_type as enum ('skripta', 'manual', 'checklist', 'tabulka', 'ostatni');
create type access_source as enum ('free', 'manual', 'import', 'stripe');

-- Uživatelé (navazuje na Supabase Auth)
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role user_role not null default 'member',
  marketing_consent boolean not null default false,
  marketing_consent_at timestamptz,
  created_at timestamptz not null default now()
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  image_url text,
  sort_order int not null default 0,
  is_free boolean not null default false,
  price_czk int,
  original_price_czk int,
  bundle_only boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references modules (id) on delete cascade,
  title text not null,
  description text,
  bunny_video_id text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table materials (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references modules (id) on delete cascade,
  type material_type not null default 'ostatni',
  title text not null,
  file_path text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table module_access (
  user_id uuid not null references profiles (id) on delete cascade,
  module_id uuid not null references modules (id) on delete cascade,
  source access_source not null default 'manual',
  granted_at timestamptz not null default now(),
  expires_at timestamptz,
  primary key (user_id, module_id)
);

create table lesson_progress (
  user_id uuid not null references profiles (id) on delete cascade,
  lesson_id uuid not null references lessons (id) on delete cascade,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- Balíčky (All in One), připraveno pro Stripe
create table bundles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  price_czk int,
  original_price_czk int,
  published boolean not null default false
);

create table bundle_modules (
  bundle_id uuid not null references bundles (id) on delete cascade,
  module_id uuid not null references modules (id) on delete cascade,
  primary key (bundle_id, module_id)
);

create index on lessons (module_id, sort_order);
create index on materials (module_id, sort_order);
create index on module_access (user_id);

-- Pomocné funkce (security definer, aby nevznikala smyčka v RLS)
create function is_admin() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

create function has_module_access(m uuid) returns boolean
language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from module_access
    where user_id = auth.uid() and module_id = m
      and (expires_at is null or expires_at > now())
  );
$$;

-- Po registraci v Auth se automaticky založí profil
create function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Zabezpečení (Row Level Security) na všech tabulkách
alter table profiles enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table materials enable row level security;
alter table module_access enable row level security;
alter table lesson_progress enable row level security;
alter table bundles enable row level security;
alter table bundle_modules enable row level security;

-- profiles: každý vidí a upravuje jen sebe (roli si změnit nesmí), admin vše
create policy profiles_select on profiles for select
  using (id = auth.uid() or is_admin());
create policy profiles_update_own on profiles for update
  using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from profiles where id = auth.uid()));
create policy profiles_admin_all on profiles for all
  using (is_admin()) with check (is_admin());

-- modules: přihlášení vidí publikované (kvůli nástěnce se zámky), admin vše
create policy modules_select on modules for select
  using ((published and auth.uid() is not null) or is_admin());
create policy modules_admin_write on modules for all
  using (is_admin()) with check (is_admin());

-- lessons a materials: jen s přístupem k modulu
create policy lessons_select on lessons for select
  using (has_module_access(module_id) or is_admin());
create policy lessons_admin_write on lessons for all
  using (is_admin()) with check (is_admin());

create policy materials_select on materials for select
  using (has_module_access(module_id) or is_admin());
create policy materials_admin_write on materials for all
  using (is_admin()) with check (is_admin());

-- module_access: uživatel vidí své, zapisuje jen admin (nebo server)
create policy access_select on module_access for select
  using (user_id = auth.uid() or is_admin());
create policy access_admin_write on module_access for all
  using (is_admin()) with check (is_admin());

-- lesson_progress: jen vlastní, a jen u lekcí, ke kterým má přístup
create policy progress_select on lesson_progress for select
  using (user_id = auth.uid() or is_admin());
create policy progress_insert on lesson_progress for insert
  with check (
    user_id = auth.uid()
    and exists (select 1 from lessons l where l.id = lesson_id and has_module_access(l.module_id))
  );
create policy progress_delete on lesson_progress for delete
  using (user_id = auth.uid());

-- bundles: čitelné pro přihlášené, zapisuje admin
create policy bundles_select on bundles for select
  using ((published and auth.uid() is not null) or is_admin());
create policy bundles_admin_write on bundles for all
  using (is_admin()) with check (is_admin());
create policy bundle_modules_select on bundle_modules for select
  using (auth.uid() is not null);
create policy bundle_modules_admin_write on bundle_modules for all
  using (is_admin()) with check (is_admin());

-- Výchozí moduly (jdou později upravit v administraci)
insert into modules (slug, title, sort_order, is_free, price_czk, original_price_czk, bundle_only, published) values
  ('ochutnavka-zdarma', 'Ochutnávka zdarma', 0, true, 0, null, false, true),
  ('produkt', 'Produkt', 1, false, 7990, 12990, false, true),
  ('provoz', 'Provoz', 2, false, 7990, 12990, false, true),
  ('lide', 'Lidé', 3, false, 7990, 12990, false, true),
  ('identita-a-brand', 'Identita a brand', 4, false, 7990, 12990, false, true),
  ('bonus', 'Bonusový modul – „Jak si udržet zdravého ducha a neposrat se z toho."', 5, false, null, null, true, true);

insert into bundles (slug, title, price_czk, original_price_czk, published)
values ('all-in-one', 'All in One', 24990, 51960, true);

insert into bundle_modules (bundle_id, module_id)
select b.id, m.id from bundles b, modules m where b.slug = 'all-in-one';
