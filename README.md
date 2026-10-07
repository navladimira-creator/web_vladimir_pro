# Vladimír PRO – web a členská sekce

Veřejný web, členská sekce a administrace systému Vladimír PRO. Zadání je v `ZADANI.md`, vzhled (směr C) v `design/`, texty v `texty/`.

## Jak projekt funguje
- **Next.js + TypeScript + Tailwind** – jeden projekt pro web, členskou sekci i admin.
- **Supabase** – přihlašování (magic link) a databáze. Tabulky a pravidla přístupu jsou v `supabase/migrations/`.
- **Netlify** – hosting. **Bunny Stream** – videa. **Ecomail** – kontakty.

## Kde co je
- `src/app/` – stránky (`/`, `/moduly`, `/konzultace`, `/o-mne`, `/kontakt`, `/prihlaseni`, právní stránky).
- `src/components/` – části stránek (hlavička, 3D puzzle, cesta modulů, reference…).
- `src/content/moduly.ts` – texty veřejných stránek mimo moduly (příběh, reference, konzultace, FAQ…).
- **Texty modulů jsou v databázi** (tabulka `modules`). Veřejné stránky je čtou přes `src/lib/moduly.ts`. Kdyby databáze nebyla dostupná, použije se záložní kopie `src/content/moduly-data.json`. Úprava textů modulů se bude dělat v administraci (milník 5).
- `src/app/api/formular/` – příjem kontaktního formuláře a dotazníku ke konzultaci, zprávu odešle přes Resend.
- `src/app/globals.css` – barvy, písma a vzhled karet a tlačítek.
- `netlify.toml` a `next.config.ts` – přesměrování starých adres z Miowebu (301).

## Spuštění na vlastním počítači
1. `npm install`
2. Zkopíruj `.env.example` na `.env.local` a doplň hodnoty.
3. `npm run dev` a otevři http://localhost:3000

## Nastavení
Všechny klíče jsou jen v proměnných prostředí (`.env.local` lokálně, Netlify → Site configuration → Environment variables). Seznam je v `.env.example`. Do kódu ani na GitHub se nikdy nepíšou.

## Databáze
Soubory ze `supabase/migrations/` se spouštějí **po řadě** v Supabase → SQL Editor → Run:
1. `0001_zaklad.sql` – tabulky, zabezpečení (RLS), výchozí moduly a balíček All in One.
2. `0002_typy_materialu.sql` – 6 typů materiálů (skripta, manuál, checklist, tabulka, úkoly/test, dokument).
3. `0003_vychozi_obsah.sql` – výchozí videa a materiály podle `texty/obsah-modulu.md` (pracovní názvy, bez souborů a Bunny ID).
4. `0004_restart_texty_pristup.sql` – Modul 0 se jmenuje reSTART (adresa `restart`), texty modulů v databázi, veřejné čtení publikovaných modulů, délka přístupu (`access_months`: jednotlivý modul 12 měsíců, reSTART a All in One navždy = prázdné).

Hotové migrace se nikdy neupravují, změny jdou do nové (`0004_…`).

## E-maily z formulářů (Resend)
Proměnné `RESEND_API_KEY`, `MAIL_FROM`, `CONTACT_TO_EMAIL` (viz `.env.example`). Bez nich formulář odpoví, že odesílání není nastavené.

## Nasazení na Netlify
Netlify → Site configuration → Environment variables: doplnit všechny proměnné z `.env.example`. `SUPABASE_SERVICE_ROLE_KEY` a `RESEND_API_KEY` označit jako **Secret**. Zkušební adresa: Site configuration → Build & deploy → Branches and deploy contexts → Branch deploys → přidat větev.

## Jak přidat nový modul
Bude doplněno v milníku 5 (administrace). Moduly členské sekce nejsou v kódu, přidávají se v `/admin`.
