// Texty veřejných stránek mimo moduly. Zdroj: texty/jednotlive-moduly.md a design/*.dc.html.
// Texty se přebírají doslovně, měnit se smějí jen překlepy.
// Texty MODULŮ jsou v databázi (tabulka modules, spravují se v administraci).
// Záložní kopie pro případ, že databáze není dostupná, je v moduly-data.json.

export type Modul = {
  slug: string;
  n: number;
  nazev: string;
  teaser: string;
  eyebrow: string;
  odrazky: string[];
  dlouhyPopis?: string;
  stitek: string;
  popis: string;
  klicove: string[];
  souhrn?: string;
  cenaPuvodni?: string;
  cena?: string;
  cenaCislo?: number;
  zdarma?: boolean;
  jenVBalicku?: boolean;
};

export const allInOne = {
  nazev: "Modul All in One – celý program Vladimír PRO",
  stitek: "NEJPRODÁVANĚJŠÍ",
  popisKratky: "Pořádný vítr do plachet a stabilní informace – tady máš vše. Všechny moduly 0–5.",
  kartaNadpis: "VŠE CO POTŘEBUJEŠ",
  kartaPopis:
    "Pořádný vítr do plachet a stabilní informace – tady máš vše. 18 let pozorování funkčních i nefunkčních konceptů, 18 let praxe, know-how, budování brandu a budování systému na jednom místě.",
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
    nadpis: "Směr",
    text: "Jak nabrat ten správný. Rozlišit důležité věci od zbytečných. Utvrdíš se, a nebo vytvoříš svůj názor postavený na funkčních informacích. Přestaneš si pokládat otázky „coby?“ a „kdyby?“.",
  },
  {
    nadpis: "Ovládat čas",
    text: "Čas je relativní a čas jsou peníze. Je dobré tedy neztrácet čas. Ukážu ti důležitější věc, a to, jak čas získat. To je totiž klíč. Chceš, aby tvůj den měl 28 hodin a tvůj podnik makal, jako kdyby byl otevřený non-stop? Jde to!",
  },
  {
    nadpis: "Optimalizovat",
    text: "I když si myslíš, že šetříš, a možná jedeš v zero waste módu, tak optimalizování výdajů je jeden z klíčů. Mít přehled o každé koruně je to, oč tu běží.",
  },
  {
    nadpis: "Tvořit",
    text: "Říká se, že cesta je cíl. V tomto případě ano. Až když vytvoříš dokonalý brunch, dokonalé kafe, dokonalou limonádu, dokonalé cokoliv – budeš chtít víc. Neustálé tvoření věcí je nejlepší obrana proti úpadku.",
  },
  {
    nadpis: "Prodat",
    text: "Upsell, upsell, upsell. Prodávej své produkty tak, aby z toho měli lidé radost. Vztah s hostem je samostatná disciplína. Bez toho to nejde a většina z nás v sobě prostě nemá Horsta z teleshoppingu. Můžeš si osvojit, jak z kafe a dortu udělat návštěvu za 1000,-.",
  },
  {
    nadpis: "Poznat lidi",
    text: "Neskutečně hodnotná superschopnost. Jak odhadnout zákazníka? Ještě větší superschopnost – jak odhadnout zaměstnance? Poznat, kdo je áčkový hráč a koho si do týmu nebrat. To je asi 80 % úspěchu.",
  },
];

export const faq = [
  {
    otazka: "Jak dlouho mám k modulům přístup?",
    odpoved: "Jednotlivé moduly jsou na rok. Balíček All in One je navždy, a nebo do armagedonu.",
  },
  { otazka: "Jak probíhá platba?", odpoved: "Jednorázově přes platební bránu." },
  { otazka: "Dostanu fakturu?", odpoved: "Jasná věc." },
  {
    otazka: "Můžu začít jedním modulem a zbytek dokoupit později?",
    odpoved:
      "Ano, ale prodraží se to. Proto reSTART grátis. Je to sice mikro modul oproti těm ostatním, ale ať si to umíš představit.",
  },
];

export const knihaUvod = {
  nadpis: "Jak se neutopit v gastru",
  autor: "Vladimír Macoun",
  text: "Díky bohu jsem knížku nebo e-book nenapsal. Postavil jsem ti systém, který tě dostane z „Bermudského gastro trojúhelníku“.",
  ukazuNadpis: "Ukážu ti, jak na to",
  ukazuUvod: "Není ani zdaleka tak důležité, jakou myšlenku jsi měl/a na začátku, protože každá myšlenka je skvělá… na začátku.",
  ukazuUseknuty:
    "Pravděpodobně ti chybělo nebo chybí jenom o trochu více know-how nebo o trochu víc zkušeností. Hodně podniků, které dnes prosperují, ani neví, proč tomu tak je. To je právě ta nejtěžší disciplína. Definovat to, co je úspěšné a co funguje. Občas se povede, že si někdo něco otevře, stojí při něm všichni svatí a podnik začne šlapat…",
};

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
  uvodKratky:
    "Soukromé konzultace doporučuji až poté, co dokončíš celý program Vladimír PRO. Může se však stát, že tvůj podnik nebo byznys plán je velmi specifický, třeba jako první kavárna Elona Mlaska na Marsu. Pak osobní setkání nebo online konzultace dává smysl.",
  uvod: [
    "Soukromé konzultace doporučuji až poté, co dokončíš celý program Vladimír PRO. Možná to máš jinak, ale moje zkušenost je ta, že když chci, aby mi v životě něco fungovalo, tak o tom první musím mít alespoň základní informace. Poté, co projdeš všechny moduly, tak jsem si téměř jistý, že už další konzultace a rady potřebovat nebudeš, je tam opravdu vše :-).",
    "Může se však stát, že tvůj podnik nebo byznys plán je velmi specifický, třeba jako první kavárna Elona Mlaska na Marsu. Pak osobní setkání nebo online konzultace dává smysl.",
    "Jak ušetříš další peníze? Projdi si celý program Vladimír PRO. Stane se mimo jiné i to, že začneme mluvit „řečí stejného kmene“. Tím, že si budeme více rozumět, se stane to, že případná konzultace bude plynout jak voda v řece, a to s maximálním výsledkem a minimálním úsilím. Sjet se dá každá řeka, některá na kajaku, některá na raftu, jiná zase spíš v ponorce a některá zase v offroadu.",
    "V rámci základního pochopení způsobíš to, že šetříme čas, nervy a peníze (ty tvoje).",
  ],
  online: {
    nazev: "Online konzultace",
    cena: "14 900 Kč",
    shrnuti: "4 online hodiny + 1 hodina na představení projektu zdarma",
    text: "Tento balíček hodin slouží k tomu, abychom přes online hovor rozebrali tvůj podnik do šroubku. Nejprve mi vyplníš krátký dotazník, tím ušetříme tvůj čas, a následně na tom začneme makat. Předem se domluvíme, co má být výsledkem těchto sezení, a tam to budeme tlačit hlava nehlava.",
  },
  vPodniku: {
    nazev: "Konzultace ve tvém podniku",
    cena: "55 000 Kč",
    shrnuti: "8 hodin strávených ve tvém podniku + 2 hodiny na představení + zpracování vyhodnocení",
    text: "V rámci tohoto balíčku získáš mystery shopping analýzu, následný support přímo na místě, analýzu procesů, analýzu ekonomických standardů, průzkum veřejného mínění a povědomí o tvém podniku v dané lokalitě. Na jeden den ti dám know-how svého týmu, dorazíme ve třech, převrátíme to u tebe vzhůru nohama a budeme kouzlit. Do 3 dnů od návštěvy dostaneš kompletní výstupy, které spolu online probereme a vyhodnotíme.",
  },
};
