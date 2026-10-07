// Texty pro veřejné stránky. Zdroj: texty/jednotlive-moduly.md a design/uvod.dc.html.
// Texty se přebírají doslovně, měnit se smějí jen překlepy.
// Moduly členské sekce se NEBEROU odsud, ty jsou v databázi a spravují se v administraci.

export type Modul = {
  n: number;
  nazev: string;
  teaser: string;
  eyebrow: string;
  odrazky?: string[];
  dlouhyPopis?: string;
  stitek?: string;
  popis: string;
  klicove?: string[];
  cenaPuvodni?: string;
  cena?: string;
  zdarma?: boolean;
  jenVBalicku?: boolean;
};

const CENA_PUVODNI = "12 990 Kč";
const CENA = "7 990 Kč";

export const moduly: Modul[] = [
  {
    n: 0,
    nazev: "Ochutnávka",
    teaser: "Ochutnávka z celého kurzu + úvodní data.",
    eyebrow: "Video manuál, check-list a nový pohled na věc",
    popis: "Vyzkoušej ochutnávku zdarma a zjisti, jestli ti to může něco dát a v něčem pomoct.",
    stitek: "ZDARMA PO REGISTRACI",
    zdarma: true,
  },
  {
    n: 1,
    nazev: "Produkt",
    teaser: "Odrazový můstek a základní stavební kámen pro všechny gastro podniky.",
    eyebrow: "Odrazový můstek a základní stavební kámen pro všechny gastro podniky",
    odrazky: [
      "Co je produkt, jak se tvoří a jak funguje nejlepší produkt?",
      "Je důležité mít signature produkt? Jak se z průměru tvoří best seller?",
      "Zapamatovatelnost jako klíč k návratnosti a udržitelnosti.",
      "Smysluplné menu = skvělá zpětná vazba a zisk. Jak se vyhnout nesmyslům a jak najít „svatý grál“ tvého menu?",
      "Food cost a marže aneb na čem se dá vydělat a co je do počtu? Jak se marže počítá a v čem dělá téměř každý chybu, která může stát i fusekle?",
      "BONUS – PRODUKT, na který si nelze sáhnout, jako nehmotná přidaná hodnota",
    ],
    stitek: "ZÁKLADNÍ KÁMEN",
    popis:
      "Kolem produktu se točí úplně vše. Podnik bez produktů by byl jen tělocvična. Je to základ a musí stát pevně. Tenhle modul nesmíš vynechat.",
    klicove: ["FUNKČNÍ NÁSTROJE", "INSPIRACE A SMĚR", "SYSTÉM"],
    cenaPuvodni: CENA_PUVODNI,
    cena: CENA,
  },
  {
    n: 2,
    nazev: "Provoz",
    teaser: "Po 1. modulu máš na čem stavět, teď je potřeba next level.",
    eyebrow: "Po 1. modulu máš na čem stavět, teď je potřeba next level",
    odrazky: [
      "Workflow jako hlavní urychlovač částic.",
      "Jak si uspořádat bar od základu, abys tam nelítal jak brk na náledí?",
      "Sklad – velký špatný každé kavárny. Jak s tím naložit?",
      "Rychlost jako faktor zisku. Proč je rychlost důležitá a jak s tím souvisí profesionalita?",
      "Plánování směn a provozní doba. Čeho je moc, toho je příliš.",
      "Hlavní zdroje provozních problémů.",
      "Jak se tvoří standardy a jak se zavádějí?",
      "Stress killer – hlavně udrž paniku jako motto dne, co nefunguje?",
      "Efektivita, co šetří peníze.",
      "Jak a hlavně co plánovat? – Hýbat se směrem kupředu je nutnost.",
    ],
    stitek: "SMĚR K UDRŽITELNOSTI",
    popis:
      "Každodenní provoz musí plynout jako voda v řece. Nechceš mít stresu plný podnik, ve kterém to jede jak na D1 v pátek odpoledne. Tohle je takový digitální provozní manažer tvého podniku.",
    klicove: ["PLYNULOST PROVOZU", "ODSTRAŇ STRESS FAKTORY", "FUNKČNÍ PLÁNY"],
    cenaPuvodni: CENA_PUVODNI,
    cena: CENA,
  },
  {
    n: 3,
    nazev: "Lidé",
    teaser: "Nový výchozí bod pro tebe. Pochopení zákazníka a výběr personálu nikdy nepřehlížej.",
    eyebrow: "Nový výchozí bod pro tebe. Pochopení zákazníka a výběr personálu nikdy nepřehlížej",
    odrazky: [
      "Kdo jsou ti, co ti vydělávají?",
      "Proč lidi chodí do kavárny?",
      "Jak zlepšit den člověku a sobě?",
      "Úsměv a pochopení jako cesta k úspěchu.",
      "Vřelý a přátelský pozdrav versus chladná anglická profesionalita.",
      "Zážitková gastronomie, co může fungovat i v „Hospodě Na Růžku“ a není o „kostce ve skluzu“.",
      "Týmový duch a individualita.",
    ],
    stitek: "NOVÝ VÝCHOZÍ BOD",
    popis:
      "Teprve ve chvíli, kdy pochopíte svého zákazníka, začnete ho „milovat“. Teprve až pochopíte své zákazníky, zvládnete jim vybrat toho správného člověka. On je bude obsluhovat a hýčkat. Bez porozumění této věci si budete stále pokládat ty otázky, které zdánlivě nemají řešení.",
    klicove: ["KOMUNIKAČNÍ NÁSTROJE", "POROZUMĚNÍ ZÁKAZNÍKOVI", "FRESH START"],
    cenaPuvodni: CENA_PUVODNI,
    cena: CENA,
  },
  {
    n: 4,
    nazev: "Identita a brand",
    teaser: "Poslední krok k výjimečnosti. Získej „NEFÉR“ výhodu.",
    eyebrow: "Poslední krok k výjimečnosti",
    odrazky: [
      "Základní tvorba identity, aniž bys musel být marketingový specialista.",
      "Jak se odlišit od průměru?",
      "Zvýšení viditelnosti podniku.",
      "Kde se bere duše podniku?",
      "Každý nápad je geniální, ale proč některé nefungují?",
      "Proč je správné načasování věc, o které je nutné přemýšlet?",
      "Kdy má smysl offline reklama a kdy jen online?",
      "Maloměsto vs. vesnice vs. velká města – všude to funguje jinak, otázka je jak?",
    ],
    stitek: "POSLEDNÍ KROK K VÝJIMEČNOSTI",
    popis:
      "Získej „NEFÉR“ výhodu. Podnik musí prosperovat. Ne každý podnik se hodí do každého prostoru. Výběr místa úzce souvisí s identitou a brandem. Budování vlastního stylu, tvoření povědomí o vlastní značce a posouvání se směrem, který je nevyčerpatelný.",
    klicove: ["CO JE IDENTITA", "CO JE BRAND", "BÝT VIDĚT"],
    cenaPuvodni: CENA_PUVODNI,
    cena: CENA,
  },
  {
    n: 5,
    nazev: "Bonusový modul",
    teaser: "Jak si udržet zdravého ducha a neposrat se z toho.",
    eyebrow: "Jak si udržet zdravého ducha a neposrat se z toho",
    dlouhyPopis:
      "Celý byznys obvykle stojí na pár lidech. Buď je to majitel, nebo manažer, nebo ředitel nebo šéf a jeho nejlepší zaměstnanec. Je to hodně křehké a je potřeba držet se v dobré mentální pozici. K tomu také vede pár základních kroků. Není to o tom, že musíš meditovat na úpatí hory každý den, objímat stromy nebo si vytloukat mozek z hlavy kamenama. Každý máme nějaký ten způsob úniku od reality. V tomto modulu ti ukážu, jak této realitě čelit a neposrat se z toho!",
    stitek: "JEN V BALÍČKU ALL IN ONE",
    popis:
      "Bonusový modul nejde koupit samostatně. Získáš ho jako součást celého programu Vladimír PRO.",
    jenVBalicku: true,
  },
];

export const allInOne = {
  nazev: "Modul All in One – celý program Vladimír PRO",
  stitek: "NEJPRODÁVANĚJŠÍ",
  popisKratky: "Pořádný vítr do plachet a stabilní informace – tady máš vše. Všechny moduly 0–5.",
  kartaNadpis: "VŠE CO POTŘEBUJEŠ",
  kartaPopis:
    "Pořádný vítr do plachet a stabilní informace – tady máš vše. 18 let pozorování funkčních i nefunkčních konceptů, 18 let praxe, know how, budování brandu a budování systému na jednom místě.",
  cenaPuvodni: "51 960 Kč",
  cena: "24 990 Kč",
  tlacitko: "Koupit celý program",
};

export const cisla = [
  { do: 18, pripona: " let", popis: "v oboru" },
  { do: 12, pripona: " let", popis: "budování brandu" },
  { do: 3, pripona: "", popis: "kavárny s vlastní pražírnou" },
  { do: 1, pripona: "", popis: "pekařská a cukrářská výroba" },
  { do: 30, pripona: "+", popis: "zaměstnanců" },
];

export const prinosy = [
  {
    cislo: "01",
    nadpis: "Vytvoříš stabilní kotevní body",
    text: "Je důležité stát pevně a ještě důležitější je vědět, co mi stabilitu přináší. Není to jen o tom, že ustojím víc než všichni kolem, a proto jsem stabilní – to je jen půl pravdy.",
  },
  {
    cislo: "02",
    nadpis: "Nastavíš správný kurz",
    text: "Buď tvůj byznys roste, nebo upadá. Nic mezi tím není. Tohle je svatá pravda. Chvíli to může být stejné, ale každá stagnace je budoucí pád. Neudělej tu chybu co ostatní a pojď si to udržet.",
  },
  {
    cislo: "03",
    nadpis: "Odemkneš nový potenciál",
    text: "Občas je těžké se na věci podívat s odstupem a nadhledem. Ukážu ti, jak si ten nadhled nejen získat, ale i udržet. Ukážu ti jiný způsob vnímání toho, co jsi vybudoval, a toho, co teprve vybuduješ.",
  },
];

export const naucis = [
  {
    nadpis: "SMĚR",
    text: "Jak nabrat ten správný. Rozlišit důležité věci od zbytečných. Utvrdíš se a nebo vytvoříš svůj názor postavený na funkčních informacích. Přestaneš si pokládat otázky coby? a kdyby?",
  },
  {
    nadpis: "OVLÁDAT ČAS",
    text: "Čas je relativní a čas jsou peníze. Je dobré tedy neztrácet čas. Ukážu ti důležitější věc a to jak čas získat. To je totiž klíč. Chceš aby tvůj den měl 28 hodin a tvůj podnik makal jak kdyby byl otevřený non-stop? Jde to!",
  },
  {
    nadpis: "OPTIMALIZOVAT",
    text: "I když si myslíš že šetříš a možná jedeš v zero waste módu tak optimalizovaní výdajů je jeden z klíčů. Mít přehled o každé koruně je to oč tu běží.",
  },
  {
    nadpis: "TVOŘIT",
    text: "Říká se že cesta je cíl. V tomto případě ano. Až když vytvoříš dokonalý brunch, dokonalé kafe, dokonalou limonádu, dokonalé cokoliv - budeš chtít víc. Neustálé tvoření věcí je nejlepší obrana proti úpadku.",
  },
  {
    nadpis: "PRODAT",
    text: "Upsell, upsell, upsell. Prodávej své produkty tak, aby z toho měli lidé radost. Vztah s hostem je samostatná disciplína. Bez toho to nejde a většina z nás v sobě prostě nemá Horsta z teleshopingu. Můžeš si osvojit to jak z kafe a dortu udělat návštěvu za 1000,-",
  },
  {
    nadpis: "POZNAT LIDI",
    text: "Neskutečně hodnotná super schopnost. Jak odhadnout zákazníka? Ještě větší super schopnost - jak odhadnout zaměstnance? Poznat kdo je Áčkový hráč a koho si do týmu nebrat. To je asi 80% úspěchu.",
  },
];

export const pribeh = {
  nadpis: "Když mi bylo 15 let, věděl jsem, že můj život bude spojený s gastronomií.",
  odstavce: [
    "Od té doby jsem prošel cestu od člověka, který sklízí špinavé nádobí, přes číšníka, barmana, baristu, kuchaře, someliéra a provozovatele malého fast foodu až k vybudování vlastní značky.",
    "Dnes moje firma funguje více než 12 let, zaměstnává přes 30 lidí a zahrnuje výrobu sirupů, tři kavárny, vlastní pražírnu kávy, pekárnu s cukrárnou a další gastro aktivity.",
    "Za tu dobu jsem zjistil jednu důležitou věc. Uvařit skvělou kávu, upéct dobrý dort nebo vytvořit výjimečný produkt je krásné řemeslo. Skutečná výzva ale začíná ve chvíli, kdy je potřeba vše řídit, organizovat, počítat marže, vést lidi a zajistit, aby podnik nejen dobře vypadal, ale také skutečně vydělával.",
    "V tu chvíli se vysněná práce může snadno změnit ve stres a boj o přežití. I tím jsem si prošel.",
  ],
  zaver: "Vy nemusíte. Proto vznikl Vladimír PRO.",
  citat: "Jak řekl Charles Bukowski: „Svět patří těm, co se neposerou.“",
};

export const reference = [
  {
    jmeno: "Háňa",
    role: "Baristka a pražič",
    text: "Beru to jako zaměstnanec firmy Produkty Vladimír, která je součástí kavárenského týmu, a zároveň jako pražič v naší pražírně No Brand Roastery. Ať už mluvím o produktech nebo přístupu k samotným zákazníkům. Vždy je vidět důraz na kvalitu. Velmi si vážím toho, že se u nás věci nedělají jen proto, že se musí, ale především proto, že nás baví a věříme jim. A když se něco dělá srdcem, je to vidět. Firma se neustále rozrůstá a přicházejí noví kolegové, přesto se nám daří udržovat přátelskou atmosféru, vzájemný respekt a týmového ducha. Právě to považuji za jeden z důvodů, proč se nám daří růst a proč jsem ráda, že mohu být součástí tohoto týmu.",
  },
  {
    jmeno: "Adri",
    role: "Baristka",
    text: "Na práci tady nejvíc oceňuji fungování celého provozu, člověk je vždy veden správným směrem a zároveň dostává podporu v tom, jak svou práci dělat co nejlépe. Velkou výhodou je možnost neustálého rozvoje a zlepšování, stejně jako předávání zkušeností mezi kolegy, což jsem v předchozí kavárně vůbec nezažila. Od prvního dne je každý zaměstnanec veden k týmové práci, a právě ta je podle mě klíčem k úspěšné a pohodové směně. Moc si vážím také prostoru pro vlastní nápady a fantazii, které nezůstávají jen „v hlavě“, ale často se promění v realitu a někdy dokonce v něco ještě lepšího. Celý provoz je flexibilní a umí se přizpůsobit různým situacím, což vytváří příjemné pracovní prostředí. A v neposlední řadě oceňuji konstruktivní kritiku, která člověka neshazuje, ale naopak motivuje posouvat se dál a růst.",
  },
  {
    jmeno: "Káťa",
    role: "Baristka",
    text: "Při práci v kavárně jsem v sobě objevila obchodního ducha. Baví mě prodávat naše produkty, u kterých klademe vysoký důraz na kvalitu. Celkově se snažíme v ničem nedělat kompromisy, ať už je to péče o klienty nebo volba surovin. To je v souladu s mým vnitřním nastavením a přináší mi to profesní naplnění. S kolegy, kteří zajišťují podporu a zásobování kaváren, se mi velmi dobře spolupracuje. Myslím, že je to hlavně tím, že všichni následujeme společnou vizi a pracujeme na tom, aby naše vztahy byly funkční a přátelské. Největší rozdíl oproti předchozím zkušenostem vnímám v konstruktivní a přátelské komunikaci s vedením firmy, která je podle mě klíčová pro moji vlastní loajalitu a pracovní nasazení.",
  },
];

export const konzultace = {
  uvod: [
    "Soukromé konzultace doporučuji až poté co dokončíš celý program Vladimír PRO. Možná to máš jinak, ale moje zkušenost je ta, že když chci aby mi v životě něco fungovalo, tak o tom první musím mít alespoň základní informace. Poté co projdeš všechny moduly tak jsem si téměř jistý, že už další konzultace a rady potřebovat nebudeš, je tam opravdu vše :-).",
    "Může se však stát, že tvůj podnik nebo byznys plát je velmi specifický, třeba jako první kavárna Elona Mlaska na Marsu. Pak osobní setkání nebo online konzultace dává smysl.",
    "Jak ušetříš další peníze? Projdi si celý program Vladimír PRO. Stane se mimo jiné i to, že začneme mluvit „řečí stejného kmene“. Tím, že si budeme více rozumět se stane to, že případná konzultace bude plynout jak voda v řece a to s maximálním výsledkem a minimálním úsilím. Sjet se dá každá řeka, některá na kajaku, některá na raftu, jiná zase spíš v ponorce a některá zase v offroadu.",
    "V rámci základního pochopení se, způsobíš to, že šetříme čas, nervy a peníze (ty tvoje)",
  ],
  online: {
    nazev: "Online konzultace",
    cena: "14 900 Kč",
    shrnuti: "4 online hodiny + 1 hodina na představení projektu zdarma",
    text: "Tento balíček hodin slouží k tomu, aby jsme přes online hovor rozebrali tvůj podnik do šroubku. Nejprve mi vyplníš krátký dotazník, tím ušetříme tvůj čas a následně na tom začneme makat. Předem se domluvíme co má být výsledkem těchto sezení a tam to budeme tlačit hlava nehlava.",
  },
  vPodniku: {
    nazev: "Konzultace ve tvém podniku",
    cena: "55 000 Kč",
    shrnuti: "8 hodin strávených ve tvém podniku + 2 hodiny na představení + zpracování vyhodnocení",
    text: "V rámci tohoto balíčku získáš, mystery shopping analýzu, následný support přímo na místě. Analýzu procesů, analýzu ekonomických standardů, průzkum veřejného mínění a povědomí o tvém podniku v dané lokalitě. Na jeden den ti dám know how svého týmu, dorazíme ve třech, převrátíme to u tebe vzhůru nohama a budeme kouzlit. Do 3 dnů od návštěvy dostaneš kompletní výstupy které spolu online probereme a vyhodnotíme.",
  },
};
