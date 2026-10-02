# Vladimír PRO – web a členská sekce

Veřejný web, členská sekce a administrace systému Vladimír PRO. Zadání je v `ZADANI.md`, vzhled v `design/`.

## Jak projekt funguje
- **Next.js + TypeScript + Tailwind** – jeden projekt pro web, členskou sekci i admin.
- **Supabase** – přihlašování (magic link) a databáze. Tabulky a pravidla přístupu jsou v `supabase/migrations/`.
- **Netlify** – hosting. **Bunny Stream** – videa. **Ecomail** – kontakty.

## Spuštění na vlastním počítači
1. `npm install`
2. Zkopíruj `.env.example` na `.env.local` a doplň hodnoty (viz níže).
3. `npm run dev` a otevři http://localhost:3000

## Nastavení
Všechny klíče jsou jen v proměnných prostředí (`.env.local` lokálně, Netlify → Site configuration → Environment variables). Seznam je v `.env.example`. Do kódu ani na GitHub se nikdy nepíšou.

## Databáze
Obsah souboru `supabase/migrations/0001_zaklad.sql` se vloží do Supabase → SQL Editor → Run. Vytvoří tabulky, zabezpečení (RLS) a výchozí moduly 0–5 a balíček All in One.

## Jak přidat nový modul
Bude doplněno v milníku 5 (administrace). Moduly nejsou v kódu, přidávají se v `/admin`.
