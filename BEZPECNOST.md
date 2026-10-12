# Vladimír PRO – bezpečnostní kontrolní seznam

Stav k 12. 10. 2026. **Závazné pro Claude Code:** při každé práci na projektu dodržuj tento seznam. Každý bod buď splň, nebo výslovně napiš, proč je odložený. Před každým milníkem uveď, které body se ho týkají a v jakém jsou stavu.

Tento seznam určuje, jak má být web Vladimír PRO zabezpečený, a slouží jako podklad pro kontrolu programátorem před spuštěním.

## Úvod

**Projekt:** web a členská sekce kurzu Vladimír PRO (náhrada Miowebu na inspiracevladimir.cz). Veřejné stránky, registrace s modulem zdarma (reSTART), placené moduly s videi a soubory ke stažení, administrace pro majitele. Později platby Stripe a AI asistent.

**Technologie:** Next.js 16 (App Router) + React 19, TypeScript, Tailwind CSS 4, Supabase (Postgres, Auth, Storage) přes `@supabase/ssr`, hosting Netlify, videa Bunny Stream, e-mail marketing Ecomail, přihlašovací e-maily Resend, platby Stripe (fáze 2).

**Repozitář:** `navladimira-creator/web_vladimir_pro` (soukromý). Vývoj probíhá ve větvi `claude/eager-fermi-h1znlb`, zadání je v `ZADANI.md`.

**Stav k datu dokumentu:** hotový veřejný web (milník 2), databáze s migracemi 0001–0003. Přihlašování, členská sekce, administrace a platby se teprve staví.

**Obchodní pravidla, která zabezpečení musí respektovat:**

- Modul 0 reSTART je zdarma po registraci, přístup navždy.
- Jednotlivě koupený modul platí **1 rok** od nákupu.
- Balíček All in One (moduly 0–5) platí **navždy**. Bonusový modul 5 nejde koupit samostatně.
- Přihlašování je jen odkazem z e-mailu (magic link), bez hesel.

## Co je už ověřeno v kódu

Zkontrolováno ve větvi `claude/eager-fermi-h1znlb`, commit `e1f9c43`. Programátor by měl stav potvrdit, ne převzít.

| Oblast | Stav | Poznámka |
| --- | --- | --- |
| RLS na tabulkách | Zapnuto na všech 8 | `profiles`, `modules`, `lessons`, `materials`, `module_access`, `lesson_progress`, `bundles`, `bundle_modules` |
| Změna vlastní role | Zablokováno | Politika `profiles_update_own` nedovolí změnit sloupec `role` |
| Čtení lekcí a materiálů | Jen s přístupem | Politiky volají `has_module_access(module_id) or is_admin()` |
| Klient se `service_role` | Oddělený soubor | `src/lib/supabase/admin.ts`, balíček `server-only` je nainstalovaný |
| Proměnné prostředí | `.env.example` existuje | Hodnoty nejsou v repozitáři |
| Kontrola přístupu u tras | Zatím není | `proxy.ts` zatím chybí, přihlašování je v milníku 3 |
| Ochrana formulářů | Ověřit | Existuje `src/app/api/formular/route.ts`, zatím bez ochrany proti robotům |

**K ověření programátorem:** funkce `is_admin()`, `has_module_access()` a `handle_new_user()` (security definer?) musí mít nastavené `search_path` a nesmí být volatelné tak, aby něco prozradily cizím uživatelům. `has_module_access` musí kontrolovat i datum vypršení přístupu.

## Přístup a přihlašování

Přístup k členské sekci a administraci se kontroluje ve **třech nezávislých vrstvách**. Selhání jedné nesmí otevřít obsah.

1. **Vrátnice `proxy.ts`** (v Next.js 16 náhrada za `middleware.ts`): obnovuje session v cookies a nepřihlášené přesměruje z `/clenska-sekce/*` a `/admin/*` na `/prihlaseni`. Slouží jen jako první síto, nikdy jako jediná kontrola (viz zranitelnost obcházení middlewaru CVE-2025-29927).
2. **Kontrola na serveru u každé stránky, Server Action a Route Handleru:** ověření uživatele přes `supabase.auth.getUser()` (ne `getSession()`), u modulu kontrola přístupu a platnosti, u adminu role `admin` načtená z databáze. Ideálně jedna sdílená vrstva (data access layer), kterou volá vše.
3. **RLS v databázi:** i když kód chybně nezkontroluje přístup, databáze cizí obsah nevydá.

**Přihlašování odkazem z e-mailu (magic link):**

- [ ] Platnost odkazu krátká (např. 1 hodina), odkaz jednorázový.
- [ ] Omezení počtu odeslání odkazu na jeden e-mail a jednu IP (ochrana proti zahlcení schránky a e-mailové kvóty).
- [ ] Přesměrování po přihlášení jen na adresy našeho webu (žádný otevřený redirect přes parametr v URL).
- [ ] V Supabase povolené „Redirect URLs“ jen pro naši doménu a zkušební adresy Netlify.
- [ ] Odhlášení zneplatní session i na serveru.

**Administrace:**

- [ ] Role `admin` se nikdy nepřiděluje z aplikace, jen ručně v databázi.
- [ ] Každá akce v adminu (přidělení přístupu, import CSV, nahrání souboru) ověřuje roli na serveru.
- [ ] Import CSV: kontrola formátu a velikosti, žádné vzorce (ochrana proti CSV injection při exportu).
- [ ] Účet majitele: dvoufázové ověření u e-mailu, přes který se přihlašuje (je to jeho „heslo“).
- [ ] Záznam důležitých akcí v adminu (kdo komu přidal nebo odebral přístup a kdy).

## Databáze a RLS

SQL injection je vyloučená tím, že se dotazy nikdy neskládají z textu od uživatele. Hlavní riziko je proto chybné nastavení oprávnění, ne injection.

- [ ] Žádný dotaz skládaný z textu (žádné `rpc` s dynamickým SQL, žádné `execute format(...)` s uživatelským vstupem v SQL funkcích).
- [ ] RLS zapnuté na každé nové tabulce (objednávky, platby, záznamy z adminu). Každá nová migrace se kontroluje proti tomuto bodu.
- [ ] Každá politika má test: uživatel A nevidí data uživatele B, uživatel bez přístupu nevidí lekce ani materiály, ne-admin nic nezapíše do `modules`, `lessons`, `materials`, `module_access`.
- [ ] `has_module_access()` kontroluje i `expires_at` (jednotlivý modul 1 rok, All in One a reSTART bez vypršení).
- [ ] Funkce `security definer` mají `set search_path = ''` (nebo `public`) a plně kvalifikované názvy tabulek.
- [ ] Klíč `service_role` (obchází RLS) jen v serverovém kódu chráněném `import 'server-only'`, jen tam, kde je to nutné (webhook Stripe, admin akce). Nikdy v souboru s `'use client'` ani s prefixem `NEXT_PUBLIC_`.
- [ ] V Supabase → Advisors (Security a Performance) žádná varování před spuštěním.
- [ ] Migrace jsou jediný způsob změn schématu; ruční změny v dashboardu se nepoužívají.
- [ ] Destruktivní migrace (drop, změna typu) se po spuštění ostrého provozu spouštějí až po záloze a kontrole programátorem.

## Ochrana obsahu

Placený obsah (videa a soubory) se vydává jen přes krátkodobé podepsané odkazy a jen uživateli s platným přístupem. Úplně zabránit kopírování nejde; cílem je ztížit ho a umožnit dohledat zdroj.

**Soubory (Supabase Storage):**

- [ ] Privátní bucket, žádné veřejné URL.
- [ ] Stažení přes serverovou akci: ověření přístupu → podepsaný odkaz s platností v minutách (např. 5 min).
- [ ] Politiky Storage odpovídají politikám tabulky `materials` (zápis jen admin).
- [ ] Nahrávání v adminu: povolené typy (PDF, DOCX, XLSX), limit velikosti, název souboru generovaný serverem.
- [ ] Volitelně: do PDF při stažení vložit e-mail kupujícího jako vodoznak.

**Videa (Bunny Stream):**

- [ ] Zapnuté Token Authentication; podepsané URL přehrávače generuje server pro ověřeného uživatele s krátkou platností.
- [ ] Povolené referery jen naše doména, vypnuté MP4 fallback stažení, zvážit DRM (MediaCage) u placených modulů.
- [ ] API klíč Bunny jen na serveru.

**Platnost přístupu a sdílení účtů:**

- [ ] Po vypršení (1 rok) se modul okamžitě zamkne všude (stránka, soubory, videa, RLS).
- [ ] Zvážit limit současně přihlášených zařízení na účet a upozornění na podezřele mnoho různých IP.

## Platby Stripe (fáze 2)

Platby jsou jednorázové (žádné předplatné) a odemykají konkrétní moduly s datem vypršení, ne obecnou roli „premium“. Modul se odemyká výhradně z ověřeného webhooku, nikdy z návratové stránky po platbě.

- [ ] Stripe Checkout; cenu a produkt určuje server podle ID modulu nebo balíčku, nikdy částka poslaná z prohlížeče.
- [ ] Webhook jako Route Handler `app/api/webhook/stripe/route.ts`: čte raw body (`await req.text()`), ověřuje podpis `stripe.webhooks.constructEvent` se `STRIPE_WEBHOOK_SECRET`; bez platného podpisu odpovídá 400 a nic nedělá.
- [ ] Zpracovávané události: `checkout.session.completed` jen při `payment_status = 'paid'`, dále `checkout.session.async_payment_succeeded` (bankovní převody apod.). `invoice.payment_succeeded` se netýká (je pro předplatné).
- [ ] Idempotence: ID události Stripe se ukládá do tabulky; stejná událost doručená dvakrát nesmí přidat přístup dvakrát ani prodloužit platnost.
- [ ] Vazba platby na uživatele přes `client_reference_id` nebo metadata (ID uživatele, ID modulu/balíčku) nastavená serverem při vytvoření Checkoutu.
- [ ] Zápis přístupu: jednotlivý modul `expires_at = now() + 1 rok`, All in One = moduly 0–5 bez vypršení. Opakovaný nákup modulu prodlužuje platnost, nevytváří duplicitu.
- [ ] Vrácení peněz (`charge.refunded`) přístup odebere.
- [ ] Tabulka objednávek s RLS (uživatel vidí jen své).
- [ ] Faktury: Stripe Invoicing nebo napojení na Fakturoid/iDoklad, podle účetní.
- [ ] Celý tok otestován v testovacím režimu Stripe a přes Stripe CLI (opakované doručení, neplatný podpis).

## Formuláře, vstupy, XSS a HTTP hlavičky

Každý vstup se ověřuje na serveru a každý veřejný formulář má ochranu proti robotům a limit počtu odeslání. Kontrola v prohlížeči je jen pro pohodlí uživatele.

**Formuláře (registrace, kontakt, konzultace):**

- [ ] Validace na serveru knihovnou `zod` (typy, délky, formát e-mailu); chybové hlášky neprozrazují, zda e-mail už existuje.
- [ ] Ochrana proti robotům: Cloudflare Turnstile (nebo hCaptcha) ověřený na serveru + skryté pole (honeypot).
- [ ] Rate limiting podle IP a e-mailu (např. Upstash Redis nebo tabulka v Supabase).
- [ ] Kontaktní formulář odesílá na pevnou adresu majitele; uživatelský text nikdy nejde do hlaviček e-mailu (header injection).
- [ ] Ecomail se volá jen ze serveru, klíč `ECOMAIL_API_KEY` bez prefixu `NEXT_PUBLIC_`.
- [ ] Server Actions: Next.js kontroluje Origin; ověřit, že nejsou přidané cizí domény do `serverActions.allowedOrigins`.

**XSS:**

- [ ] Žádné `dangerouslySetInnerHTML` s obsahem od uživatelů ani z adminu; pokud je formátovaný text z adminu nutný, čistit přes DOMPurify nebo použít Markdown bez HTML.
- [ ] Odkazy zadané v adminu jen `https:` (žádné `javascript:`).

**HTTP hlavičky (Netlify nebo `next.config`):**

| Hlavička | Hodnota / účel |
| --- | --- |
| Content-Security-Policy | Povolit jen vlastní doménu, Supabase, Bunny, Stripe, Turnstile, Google Fonts; `frame-ancestors 'none'` |
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | Vypnout kameru, mikrofon, polohu |

- [ ] Kontrola na Mozilla Observatory a securityheaders.com, cíl známka A.

## Klíče, závislosti, kvalita kódu a testy

Každá změna musí projít automatickými kontrolami dřív, než se dostane na web; tajné klíče nesmí být v repozitáři, v prohlížeči ani v chatu.

**Klíče:**

| Klíč | Kde smí být |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Veřejné, mohou do prohlížeče |
| `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `ECOMAIL_API_KEY`, `RESEND_API_KEY`, `BUNNY_API_KEY`, `BUNNY_TOKEN_KEY`, `TURNSTILE_SECRET_KEY` | Jen server: Netlify Environment variables (scope Functions), lokálně `.env.local` |

- [ ] GitHub: zapnout Secret scanning a Push protection.
- [ ] Zkušební (deploy preview) a ostré prostředí mají oddělené klíče (Stripe test vs. live).
- [ ] Postup výměny klíče, kdyby unikl (kde ho změnit, co restartovat).

**Kvalita kódu a testy:**

- [ ] TypeScript `strict`, ESLint bez chyb, build bez varování.
- [ ] Automatické testy (Playwright) hlavních scénářů: registrace → e-mail → přihlášení → reSTART; zamčený modul ani soubor se neotevře ani přímým odkazem; ne-admin se nedostane do `/admin`; nákup odemkne správný modul se správnou platností.
- [ ] Testy RLS politik proti databázi (např. pgTAP nebo testy přes dva testovací účty).
- [ ] GitHub Actions: při každém pull requestu lint, typy, build a testy; neúspěch blokuje sloučení do `main`.
- [ ] Ochrana větve `main` (změny jen přes pull request).
- [ ] Dependabot pro bezpečnostní aktualizace, `npm audit` bez vysokých a kritických zranitelností.
- [ ] Minimum závislostí; každá nová knihovna má důvod.
- [ ] Po každém milníku nezávislá revize kódu (`/review` v Claude Code nebo programátor).

## Provoz: zálohy, monitoring, e-maily

Bezplatný tarif Supabase nemá automatické zálohy a projekt se při nečinnosti uspává, proto ostrý provoz potřebuje placený tarif.

- [ ] Supabase Pro s denními zálohami; jednou otestovat obnovu ze zálohy.
- [ ] Záloha souborů v Storage a videa v Bunny mají originály i mimo službu.
- [ ] Sledování chyb (Sentry) pro server i prohlížeč, bez osobních údajů v záznamech.
- [ ] Hlídání dostupnosti (např. UptimeRobot) s upozorněním majiteli.
- [ ] Upozornění na selhané webhooky Stripe.
- [ ] E-maily: Resend s vlastní doménou, nastavené SPF, DKIM a DMARC u Wedosu; v Supabase vlastní SMTP místo vestavěného (limit a spam).
- [ ] Kontrola výkonu (Lighthouse) na slabším telefonu; 3D efekty respektují „omezit pohyb“ a na slabých zařízeních se zjednoduší.
- [ ] DNS domény u Wedosu: zámek proti převodu a dvoufázové ověření účtu; stejně tak u Netlify, Supabase, Stripe, GitHubu a Bunny.

## GDPR a právní náležitosti

U digitálního obsahu musí zákazník před platbou výslovně souhlasit se zpřístupněním obsahu před uplynutím 14denní lhůty, jinak může od smlouvy odstoupit i po zhlédnutí kurzu. Texty dokumentů má zkontrolovat právník, tento seznam je technický.

- [ ] Obchodní podmínky včetně délky přístupu (1 rok / navždy) a podmínek vrácení peněz.
- [ ] V Checkoutu povinné zaškrtávátko: souhlas se zpřístupněním obsahu před uplynutím lhůty pro odstoupení a vzetí na vědomí ztráty práva na odstoupení; uložit čas souhlasu.
- [ ] Zásady ochrany osobních údajů se seznamem zpracovatelů (Supabase, Netlify, Stripe, Ecomail, Resend, Bunny, Sentry) a jejich zemí.
- [ ] Smlouvy o zpracování (DPA) s těmito službami; Supabase projekt v EU regionu.
- [ ] Souhlas s marketingem oddělený od registrace a uložený s datem (sloupce `marketing_consent`, `marketing_consent_at` už existují).
- [ ] Lišta cookies jen pokud web použije analytiku nebo reklamní pixely; bez souhlasu se nenačítají.
- [ ] Možnost smazat účet a stáhnout svoje údaje; smazání i z Ecomailu.
- [ ] Faktura za každou platbu (plátcovství DPH ověřit s účetní).

## Kontrola před spuštěním a otázky pro programátora

Web se spouští až po splnění bodů níže a po nezávislé kontrole programátorem.

1. Všechny body tohoto seznamu zaškrtnuté nebo vědomě odložené s důvodem.
2. Revize celého kódu programátorem se zaměřením na přístupy, RLS, webhook a práci s klíči.
3. Ruční pokus o obejití ochrany: přímé odkazy na soubory a videa, cizí ID v URL, volání API bez přihlášení, starý odkaz z e-mailu.
4. Automatický sken (OWASP ZAP baseline) proti zkušební adrese.
5. Celý nákup v testovacím režimu Stripe, včetně vrácení peněz.
6. Supabase Advisors bez varování, Mozilla Observatory známka A.
7. Zapnuté zálohy, Sentry a hlídání dostupnosti.

**Otázky pro programátora:**

- Je třívrstvá kontrola přístupu (proxy, serverová vrstva, RLS) dostatečná, nebo něco chybí?
- Stačí pro videa Token Authentication v Bunny, nebo nasadit DRM?
- Rate limiting: tabulka v Supabase, nebo externí služba (Upstash)?
- Je potřeba limitovat počet zařízení na účet kvůli sdílení přístupů?
- Co dalšího by mělo být v tomto seznamu?

**Zdroje:** [Next.js 16 – přejmenování middleware na proxy](https://nextjs.org/blog/next-16)
