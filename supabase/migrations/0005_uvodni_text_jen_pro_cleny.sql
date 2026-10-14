-- Oprava chyby z 0004: celý text „Ukážu ti, jak na to“ (členský obsah reSTARTu) byl ve sloupci
-- modules.members_intro, který je díky veřejnému čtení modulů čitelný i bez přihlášení.
-- Přesouváme ho do samostatné tabulky chráněné stejně jako lekce a materiály.

create table module_members_content (
  module_id uuid primary key references modules (id) on delete cascade,
  intro text,
  updated_at timestamptz not null default now()
);

alter table module_members_content enable row level security;

create policy members_content_select on module_members_content for select
  using (has_module_access(module_id) or is_admin());
create policy members_content_admin_write on module_members_content for all
  using (is_admin()) with check (is_admin());

insert into module_members_content (module_id, intro)
select id, members_intro from modules where members_intro is not null;

alter table modules drop column members_intro;
