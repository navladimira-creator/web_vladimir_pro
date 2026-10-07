# Zadání: Vladimír PRO – nový web a členská sekce (fáze 1)

> Tento dokument je zadání pro Claude Code. Ulož ho do kořene projektu jako `ZADANI.md` a drž se ho. Když něco v zadání chybí nebo si odporuje, zeptej se, nedomýšlej.

---

## 1. O projektu a o mně

- Jsem Vladimír, majitel gastro podniků (kavárny, pražírna, pekárna) a autor vzdělávacího systému **Vladimír PRO** pro majitele kaváren a malých gastro podniků.
- Současný web **inspiracevladimir.cz** běží na Miowebu (WordPress). Chci ho nahradit vlastním systémem, který mám pod kontrolou, je levný na provoz a má jednoduchou administraci.
- **Neumím programovat.** Proto:
  - komunikuj se mnou česky, prakticky, bez zbytečného žargonu,
  - před každým větším krokem mi v pár větách řekni, co uděláš a proč,
  - když po mně potřebuješ něco udělat (založit účet, vložit klíč, kliknout v nějaké službě), popiš to krok za krokem,
  - po každé dokončené části mi řekni, jak si ji můžu sám vyzkoušet.

---

## 2. Cíl fáze 1

1. Nový veřejný web s přehlednou strukturou (náhrada Miowebu).
2. Landing page se sběrem kontaktů: kdo se zaregistruje, dostane **zdarma přístup k prvnímu modulu**.
3. Kontakty se automaticky ukládají do **Ecomailu**.
4. **Členská sekce** se 6 moduly (1 zdarma + 5 placených). Placené jsou v této fázi zamčené a odemykám je ručně v administraci.
5. **Jednoduchá administrace**, ve které sám přidám modul, video a soubory a přidělím přístup uživateli bez programování.

**Mimo fázi 1** (ale databázi a strukturu navrhni tak, aby to šlo později snadno doplnit):
- platby přes **Stripe** (fáze 2): zaplacení automaticky odemkne modul,
- **PWA aplikace s AI asistentem** (fáze 3): stejné přihlášení, AI běží na mém serveru (Postgres + pgvector, dotazy přes Claude API).

---

## 3. Technologie

| Část | Technologie | Poznámka |
|---|---|---|
| Web + členská sekce + admin | Next.js (App Router), TypeScript, Tailwind CSS | Jeden projekt |
| Hosting | Netlify | Doména zůstane registrovaná na Wedosu, jen se přesměruje |
| Přihlašování | Supabase Auth – **přihlášení odkazem z e-mailu (magic link)** | Žádná hesla, méně starostí pro uživatele i pro mě |
| Databáze | Supabase Postgres | Zapnout Row Level Security na všech tabulkách |
| Soubory ke stažení | Supabase Storage (privátní bucket) | Stahování jen přes podepsané odkazy s krátkou platností |
| Videa | Bunny Stream | Přehrávání s ochranou (token authentication), videa se nesmí dát jednoduše stáhnout ani sdílet odkazem |
| E-mail marketing | Ecomail API | Volání jen ze serveru, API klíč nikdy v kódu prohlížeče |
| Kód | GitHub (účet `navladimira-creator`), soukromý repozitář `web_vladimir_pro` (už založený) | |

Všechny klíče a hesla patří do proměnných prostředí (`.env.local` a nastavení Netlify), nikdy ne do kódu. Připrav soubor `.env.example` se seznamem proměnných bez hodnot.

### Na co dát pozor (provozní detaily)
- **Odesílání přihlašovacích e-mailů:** vestavěné odesílání e-mailů v Supabase je jen na testování a má přísný limit. Před spuštěním napoj vlastní SMTP pro transakční e-maily (např. Resend nebo transakční e-maily Ecomailu) a nastav odesílatele na moji doménu, aby e-maily nekončily ve spamu. Doporuč mi, co je nejjednodušší.
- **Supabase zdarma:** projekt v bezplatném tarifu se při delší nečinnosti uspí. Před ostrým spuštěním mi řekni, jestli a kdy přejít na placený tarif.
- **Netlify kredity:** každé nasazení na ostrou adresu stojí kredity. Během vývoje testuj lokálně nebo na náhledech (deploy previews) a na produkci nasazuj jen hotové milníky.
- **Rychlost a SEO:** veřejné stránky musí mít správné titulky, popisy a náhled pro sdílení na sociálních sítích. Původní adresy z Miowebu (`/jednotlive-moduly/`, `/eshop/`, `/kontakt/`, `/prihlaseni/`, `/nastenka/`, `/rezervace-konzultace/`) přesměruj (301) na nové stránky.

---

## 4. Struktura webu

Současný web je nepřehledný. Novou strukturu chci jednodušší:

### Veřejná část
| Stránka | Adresa | Obsah |
|---|---|---|
| Úvod | `/` | Hlavní stránka systému Vladimír PRO (viz níže) |
| Moduly a ceny | `/moduly` | Přehled všech modulů, co obsahují, ceny, balíček All in One |
| Konzultace | `/konzultace` | Online konzultace a konzultace v podniku, kontaktní formulář nebo odkaz na rezervaci |
| O mně | `/o-mne` | Můj příběh (od myče nádobí po síť podniků, 12+ let firma, 30+ lidí) |
| Kontakt | `/kontakt` | Kontaktní údaje a formulář |
| Přihlášení | `/prihlaseni` | Zadání e-mailu → přijde přihlašovací odkaz |
| Právní stránky | `/obchodni-podminky`, `/ochrana-osobnich-udaju` | Zatím šablona s místem pro můj text |

**Hlavní menu:** Úvod · Moduly a ceny · Konzultace · O mně · Kontakt · tlačítko **Přihlásit**

### Úvodní stránka – pořadí sekcí (podle návrhu `design/uvod.dc.html`, směr C)
1. **Hero:** „Pokus – omyl / Nejčastější způsob vedení a budování podniku", úvodní odstavec, tlačítko „Vyzkoušet systém Vladimír PRO". Vpravo 3D puzzle z 6 dílků (Modul 0–5), které se při posouvání rozloží a ukáže cedulky s názvy modulů. Pod tím čísla: 18 let v oboru, 12 let budování brandu, 3 kavárny s vlastní pražírnou, 1 pekařská a cukrářská výroba, 30+ zaměstnanců (načítají se od nuly).
2. **Modul 0 zdarma:** „Video manuál, check-list a nový pohled na věc" + formulář (jméno, e-mail, souhlas se zpracováním údajů).
3. **Je to pro mě vhodné?** Úvodní odstavec + tři přínosy (Vytvoříš stabilní kotevní body / Nastavíš správný kurz / Odemkneš nový potenciál).
4. **Velký citát přes celou šířku na fotce:** „Kavárna není v první řadě o kafi a ani o 16ti hodinové otevírací době!"
5. **Systém z praxe – cesta modulů:** Modul 0 → 5 pod sebou propojené svítící čárou. **Kliknutím se modul rozbalí** (všechny body, nabídková karta, klíčové prvky, cena, tlačítko). Na začátku jsou všechny sbalené. Pod tím karta All in One.
6. **Můj příběh:** celý text včetně citátu.
7. **Reference:** karusel – Háňa, Adri, Káťa, jedna naráz, s fotkou a tlačítkem „Číst celé".
8. **Nevíš, jak začít?** „Začni hned, protože čas jsou peníze." + tlačítka „Jdu do toho hned!" a „Chci vědět víc".

Stránka `/moduly` se staví podle návrhu `design/moduly-a-ceny.dc.html` (texty jsou v návrhu, vycházejí ze stránky `inspiracevladimir.cz/jednotlive-moduly/`). Text „Ukážu ti, jak na to“ je na stránce záměrně useknutý s výzvou „Chceš si to dočíst? Celý text najdeš v Modulu 0 – reSTART“ → registrace zdarma. Celý text proto patří do obsahu reSTARTu. Původně: (úvod „Systém z praxe", „Co se v systému Vladimír PRO naučíš?", podrobné body každého modulu, klíčové prvky, text ke konzultacím).

### Členská sekce (jen pro přihlášené)
| Stránka | Adresa | Obsah |
|---|---|---|
| Nástěnka | `/clenska-sekce` | Přehled všech modulů: odemčené jsou klikací, zamčené mají zámek, cenu a tlačítko „Mám zájem" (zatím vede na `/moduly` nebo kontakt) |
| Detail modulu | `/clenska-sekce/[modul]` | Videa (lekce) v pořadí + materiály ke stažení rozdělené do skupin: **Skripta · Manuály · Checklisty · Tabulky a nástroje · Úkoly a testy · Dokumenty a vzory**. Přesný obsah modulů je v `texty/obsah-modulu.md`. |
| Můj účet | `/clenska-sekce/ucet` | E-mail, jméno, odhlášení |

U lekcí chci, aby si uživatel mohl označit „Hotovo" a na nástěnce viděl, kolik z modulu má za sebou.

### Administrace (jen pro mě, role `admin`)
`/admin` – jednoduché formuláře, žádná složitá rozhraní:
- **Moduly:** přidat, upravit, seřadit, publikovat/skrýt, nastavit „zdarma ano/ne", cenu (jen zobrazení), krátký popis, obrázek.
- **Lekce (videa):** přidat do modulu, název, popis, ID videa z Bunny, pořadí.
- **Materiály:** nahrát soubor (PDF, DOCX, XLSX…) k modulu, zvolit typ (skripta, manuál, checklist, tabulka, úkoly/test, dokument/vzor), název, pořadí.
- **Uživatelé:** seznam, vyhledávání podle e-mailu, **ručně přidělit nebo odebrat přístup k modulu**.
- **Import zákazníků z CSV** (e-mail, jméno, moduly), abych mohl převést stávající zákazníky z Miowebu bez ručního klikání.

Moduly nesmí být napevno v kódu. Modul 7, 8 nebo 10 chci přidat jen přes administraci.

---

## 5. Moduly (výchozí obsah)

| # | Modul | Přístup | Zobrazená cena |
|---|---|---|---|
| 0 | **reSTART** (zdarma): ochutnávka z celého kurzu + úvodní data | Zdarma po registraci | 0 Kč |
| 1 | Produkt | Placený | 7 990 Kč |
| 2 | Provoz | Placený | 7 990 Kč |
| 3 | Lidé | Placený | 7 990 Kč |
| 4 | Identita a brand | Placený | 7 990 Kč |
| 5 | Bonusový modul – „Jak si udržet zdravého ducha a neposrat se z toho.“ | **Jen v balíčku All in One**, samostatně nejde koupit | – |
| – | **All in One** – všechny moduly 0–5 v plném rozsahu | Balíček | 24 990 Kč |

U placených modulů zobrazuj i původní cenu 12 990 Kč přeškrtnutě, u All in One 51 960 Kč.

Popisy modulů převezmi ze stránky `inspiracevladimir.cz/jednotlive-moduly/`.

### Konzultace (stránka `/konzultace`)
| Služba | Cena | Obsah |
|---|---|---|
| Online konzultace | 14 900 Kč | 4 online hodiny + 1 hodina na představení projektu zdarma. Začíná vstupním dotazníkem. |
| Konzultace v podniku | 55 000 Kč | 8 hodin v podniku + 2 hodiny na představení + zpracování vyhodnocení (mystery shopping, analýza procesů a ekonomiky, písemné výstupy a doporučení) |

Ostatní texty ke konzultacím převezmi ze stránky `inspiracevladimir.cz/jednotlive-moduly/`.

---

## 6. Datový model (návrh, uprav podle potřeby)

- `profiles` – uživatel (id z Supabase Auth, jméno, e-mail, role `member` / `admin`, datum registrace, souhlas s marketingem + datum)
- `modules` – id, slug, název, popis, obrázek, pořadí, zdarma (ano/ne), cena v Kč, publikováno
- `lessons` – id, modul, název, popis, Bunny video ID, pořadí
- `materials` – id, modul, typ (`skripta`, `manual`, `checklist`, `tabulka`, `ukoly_test`, `dokument`), název, cesta k souboru, pořadí
- `module_access` – uživatel, modul, zdroj (`free`, `manual`, `import`, později `stripe`), datum přidělení, datum vypršení. **Pravidla přístupu:** jednotlivě koupený modul = přístup na **1 rok** od nákupu; balíček **All in One = navždy** (bez vypršení); reSTART (zdarma) = navždy. Po vypršení se modul na nástěnce zobrazí jako zamčený s možností prodloužit. Při ručním přidělení v adminu jde datum vypršení nastavit.
- `lesson_progress` – uživatel, lekce, dokončeno kdy
- `bundles` + `bundle_modules` – balíčky (All in One), připraveno pro Stripe

Přístup k obsahu se vždy kontroluje **na serveru i v databázi (RLS)**, ne jen schováním tlačítka.

---

## 7. Hlavní scénáře, které musí fungovat

1. **Registrace z landing page:** vyplní jméno a e-mail a zaškrtne souhlas → přijde e-mail s přihlašovacím odkazem → po kliknutí je přihlášen, má přístup k modulu 0 → kontakt je v Ecomailu v seznamu „Vladimír PRO – zdarma" se štítkem `modul-zdarma`.
2. **Opakované přihlášení:** zadá e-mail na `/prihlaseni` → přijde odkaz → je v členské sekci.
3. **Ruční odemčení:** v adminu najdu uživatele → zaškrtnu modul → uživatel ho hned vidí odemčený. Kontakt v Ecomailu dostane štítek daného modulu.
4. **Zamčený obsah:** nepřihlášený nebo bez přístupu se na lekci ani soubor nedostane, ani když zná přímý odkaz.
5. **Přidání obsahu:** v adminu vytvořím modul, přidám video podle Bunny ID a nahraju soubory → objeví se v členské sekci ve správném pořadí.

---

## 8. Vzhled

**Vybraný směr: „C – Hloubka"** (tmavý, prémiový, s 3D prvky). Závazné návrhy jsou ve složce `design/`:
- `uvod.dc.html` – úvodní stránka (včetně rozbalovacích modulů a karuselu referencí)
- `clenska-nastenka.dc.html` – nástěnka členské sekce
- `clenska-detail-modulu.dc.html` – detail modulu (videa, postup, materiály)
- `registrace-dekujeme.dc.html` – stránka hned po odeslání registračního formuláře („zkontroluj e-mail“, poslat znovu)
- `moduly-a-ceny.dc.html` – stránka Moduly a ceny (3D kniha, která při posouvání zamrzne, záložky modulů, All in One s úsporou, FAQ)
- `registrace-vitej.dc.html` – první přihlášení po kliknutí na odkaz v e-mailu (animace zapadnutí dílku, Modul 0 odemčen, co dál)

Jsou to HTML soubory návrhového nástroje: převezmi z nich rozložení, barvy, písma, texty, tvary (puzzle dílek je SVG cesta v souboru) i animace. Interaktivita je v bloku `class Component` na konci souboru. Složka `design/archiv-smer-A/` je stará verze – **nepoužívej ji**.

- **Písma (Google Fonts):** **Sora** (nadpisy, čísla) + **Manrope** (běžný text). Žádná kurzíva.
- **Barvy:** pozadí **#041A1C** (téměř černo-tyrkysová) s jemnou tyrkysovou září a zrnem, hlavní tyrkysová **#2DE2CB**, světlá **#5EEAD4**, tmavší **#0E8C82**, text **#B7D6D3**, nadpisy bílé. **Korálová #FF7A59 jen jako „šperk"** na třech místech: tečka u loga, štítky ZDARMA a odlesk na dílku Modul 0.
- **Prvky:** skleněné karty (průsvitné, jemný okraj, při najetí myší svítí), tlačítka s plně zaoblenými rohy, puzzle dílky jako symbol systému (6 dílků = 6 modulů).
- **Pohyb:** puzzle reaguje na pohyb myši, rozkládá se při posouvání, sekce se plynule vynořují, čísla se načítají, svítící čára u cesty modulů se nabíjí, horní menu se při posouvání zmenší, za kurzorem jde jemná záře. Vše musí fungovat i v Safari (v návrhu jsou některé efekty jen pro Chrome – udělej je univerzálně) a respektovat nastavení „omezit pohyb".
- **Mobil:** místo 3D puzzle balíček karet, kterými se listuje prstem. Vše ostatní pod sebou. Mobil je prioritní.
- **Fotky:** místa jsou připravená ([Foto: …]); fotky dodá majitel, na webu dostanou jemný tyrkysový nádech.
- Maximálně jedna hlavní výzva na sekci. Celý web v češtině, včetně e-mailů s přihlašovacím odkazem.

**Texty:** používej texty ze současného webu **doslovně** (opravit lze jen překlepy), ne převyprávěné. Nástroje pro načtení webu často vrací jen shrnutí, proto texty převezmi z plátna nebo si o ně řekni.

---

## 9. Postup práce (milníky)

Po každém milníku se zastav, ukaž mi výsledek a řekni, jak ho vyzkoušet.

1. **Příprava:** projekt, GitHub repozitář, napojení Supabase a Netlify. Řekni mi přesně, které účty mám založit a jaké klíče ti dát.
2. **Veřejný web:** všechny veřejné stránky s převzatými texty, zatím bez registrace.
3. **Registrace a přihlášení:** magic link, profil, modul 0 zdarma, napojení Ecomailu.
4. **Členská sekce:** nástěnka, detail modulu, videa z Bunny, stahování souborů, označení „Hotovo".
5. **Administrace:** moduly, lekce, materiály, uživatelé, přístupy, import CSV.
6. **Kontrola a spuštění:** test všech scénářů z bodu 7, kontrola zabezpečení, nasazení na Netlify na zkušební adrese. Přepnutí domény až na můj pokyn.

---

## 10. Účty, které budu potřebovat (řekni mi, kdy který)

- GitHub (mám)
- Supabase (zdarma pro začátek)
- Netlify (zdarma pro začátek)
- Bunny.net (Stream)
- Ecomail (mám, potřebuji API klíč a ID seznamu)
- Služba pro odesílání přihlašovacích e-mailů (SMTP), doporučíš mi ji
- Wedos (doména, mám, budu potřebovat přístup k DNS)

---

## 11. Otevřené otázky (vyřešíme během práce)

- **Stávající zákazníci z Miowebu:** kolik jich je a jde z Miowebu exportovat seznam s moduly, které mají?
- **Rezervace konzultací:** stačí kontaktní formulář, nebo chci kalendář s výběrem termínu?
- **Fakturace** (pro fázi 2): Fakturoid, iDoklad, nebo faktury ze Stripe? Domluvím s účetní.
- **Texty obchodních podmínek a GDPR:** dodám já.

---

## 12. Hotovo znamená

- [ ] Web běží na Netlify na zkušební adrese a dobře vypadá na mobilu i počítači.
- [ ] Registrace → e-mail → přihlášení → modul 0 funguje a kontakt je v Ecomailu.
- [ ] Přihlašovací e-maily chodí z mé domény a nepadají do spamu.
- [ ] Staré adresy z Miowebu přesměrovávají na nové stránky.
- [ ] Zamčený obsah se nedá otevřít ani přímým odkazem.
- [ ] V adminu umím bez pomoci přidat modul, video, soubor a přidělit přístup.
- [ ] Import zákazníků z CSV funguje.
- [ ] V repozitáři je `README.md` v češtině: jak projekt funguje, kde je co nastavené a jak přidat nový modul.
