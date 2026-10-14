-- Nové typy materiálů (směr C): skripta, manuál, checklist, tabulka/nástroj, úkoly/test, dokument/vzor.
-- Původní migraci 0001 neměníme, jen na ni navazujeme.

alter type material_type rename to material_type_old;

create type material_type as enum ('skripta', 'manual', 'checklist', 'tabulka', 'ukoly_test', 'dokument');

alter table materials alter column type drop default;
alter table materials
  alter column type type material_type
  using (case type::text when 'ostatni' then 'dokument' else type::text end)::material_type;
alter table materials alter column type set default 'dokument';

drop type material_type_old;

-- Soubor se nahrává až v administraci, do té doby může být cesta prázdná
alter table materials alter column file_path drop not null;

-- Delší popis modulu (rozbalovací část na webu, např. modul 5)
alter table modules add column if not exists long_description text;
