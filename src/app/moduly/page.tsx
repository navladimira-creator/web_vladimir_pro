import Link from "next/link";
import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import ModuleDetail from "@/components/ModuleDetail";
import AllInOneCard from "@/components/AllInOneCard";
import { cisla, moduly, naucis } from "@/content/moduly";

export const metadata: Metadata = {
  title: "Moduly a ceny",
  description:
    "Systém z praxe: moduly Produkt, Provoz, Lidé a Identita a brand, bonusový modul a balíček All in One. Ochutnávka zdarma.",
  alternates: { canonical: "/moduly" },
};

export default function ModulyPage() {
  return (
    <>
      <PageHead stitek="Systém z praxe" nadpis="Máš nebo chceš kavárnu?">
        <p className="lead" style={{ maxWidth: "52ch" }}>
          Žádné nesmysly ani kecy – know-how vybudované a otestované na vlastních provozech.
        </p>
        <p className="lead" style={{ maxWidth: "52ch" }}>
          Pomáhám kavárnám zvýšit útratu hostů, zlepšit marže a nastavit provoz tak, aby více vydělával a méně stresoval majitele.
        </p>
        <p className="lead" style={{ maxWidth: "52ch" }}>
          Budoucím majitelům kaváren pomáhám vyhnout se chybám, které často stojí statisíce až miliony korun.
        </p>
      </PageHead>

      <section className="wrap" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <Reveal className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))" }}>
          {cisla.map((c) => (
            <div key={c.popis} className="glass flex flex-col gap-1.5" style={{ padding: "22px 24px" }}>
              <span className="display" style={{ fontWeight: 800, fontSize: 40, letterSpacing: "-0.03em" }}>
                <CountUp to={c.do} suffix={c.pripona} />
              </span>
              <span style={{ fontSize: 15 }}>{c.popis}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <Reveal className="grid items-start gap-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))" }}>
          <div className="glass flex flex-col gap-3" style={{ padding: 32 }}>
            <span className="eyebrow">Kdybych napsal knihu, jmenovala by se takto:</span>
            <p className="display" style={{ fontWeight: 800, fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
              Jak se neutopit v gastru
            </p>
            <p style={{ fontSize: 16, color: "#8fb9b5" }}>Vladimír Macoun</p>
            <p style={{ fontSize: 17, lineHeight: 1.65 }}>
              Díky bohu jsem knížku nebo e-book nenapsal. Postavil jsem ti systém který tě dostane z „Bermudského gastro trojúhelníku“
            </p>
          </div>
          <div className="flex flex-col gap-[18px]">
            <h2 className="h2">Ukážu ti jak na to</h2>
            <p style={{ fontSize: 17, lineHeight: 1.7 }}>
              Není ani zdaleka tak důležité jakou myšlenku jsi měl/a na začátku, protože každá myšlenka je skvělá ... na začátku.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7 }}>
              Pravděpodobně ti chybělo nebo chybí jenom o trochu více know-how nebo o trochu víc zkušenosti. Hodně podniků které dnes prosperují ani neví proč tomu tak je. To je právě ta nejtěžší disciplína. Definovat to co je úspěšné a to co funguje. Občas se povede, že si někdo něco otevře, stojí při něm všichni svatí a podnik začne šlapat. Když se takového člověka zeptáš: „Jak jsi to dokázal?“ Odpověď je většinou: „No asi proto, že máme dobrý kafe, ne?“ Nebo: „Dřel jsem jak kůň 16h denně.“ Může to tak být, bezpochyby, ale pravda je v 99% jinde a nikdo vlastně netuší, co za tím úspěchem stojí.
            </p>
            <p className="display" style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.3 }}>
              A věřte mi když říkám: „Kavárna není v první řadě o kafi a ani o 16ti hodinové otevírací době!“
            </p>
          </div>
        </Reveal>
      </section>

      <section className="wrap" style={{ paddingTop: 48 }}>
        <Reveal className="mb-10 flex flex-col gap-3.5">
          <span className="eyebrow">v kavárně jako když najdeš</span>
          <h2 className="h2">Co se v systému Vladimír PRO naučíš?</h2>
        </Reveal>
        <Reveal className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))" }}>
          {naucis.map((n, i) => (
            <div key={n.nadpis} className="glass tilt flex flex-col gap-3.5" style={{ padding: 28 }}>
              <span className="num-icon">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display" style={{ fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em" }}>{n.nadpis}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.65 }}>{n.text}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-10">
          <p className="flex items-center gap-3" style={{ fontSize: 17, color: "#8fb9b5" }}>
            <span style={{ flex: "none", width: 28, height: 2, background: "var(--accent)" }} />
            „Svět patří těm, co se neposerou.“ — Charles Bukowski
          </p>
        </Reveal>
      </section>

      <section className="wrap">
        <Reveal className="mb-8 flex max-w-[820px] flex-col gap-3.5">
          <span className="eyebrow">Celý program Vladimír PRO</span>
          <h2 className="h2">Komplexní a přitom jednoduchý ve svém použití – systém, co mění zajeté zvyky a rutiny, co nefungují.</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7 }}>
            Od A až po Z. Pokud bych měl možnost ve svých začátcích získat tyto informace a kdyby tehdy existoval někdo kdo by sdílel své zkušenosti, neváhal bych.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7 }}>
            Není to koučink, není to mentoring a není to ani forma krizového managementu, ale má to hodnotu jako kdybyste tyto 3 odborníky pozvali do svého života a platili jim 4.000,- za hodinu konzultace.
          </p>
          <p style={{ fontSize: 16, color: "#8fb9b5" }}>„Vše co si umíte představit může existovat.“ — Steve Jobs</p>
        </Reveal>
        <AllInOneCard />
      </section>

      <section className="wrap" style={{ paddingTop: 24 }}>
        <div className="flex flex-col gap-8">
          {moduly.map((m) => (
            <Reveal key={m.n}>
              <article className="glass overflow-hidden" id={`modul-${m.n}`}>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2" style={{ padding: "26px 30px 22px" }}>
                  <span
                    className="display flex items-center justify-center"
                    style={{ width: 52, height: 52, borderRadius: "50%", fontWeight: 800, fontSize: 22, color: "#04201f", background: "radial-gradient(circle at 35% 30%, #b9fff5, #2de2cb 55%, #0e8c82)" }}
                  >
                    {m.n}
                  </span>
                  <h2 className="display" style={{ fontWeight: 700, fontSize: "clamp(24px, 3vw, 32px)", letterSpacing: "-0.02em" }}>
                    Modul {m.n} – {m.nazev}
                  </h2>
                  {m.zdarma && <span className="badge-free">ZDARMA</span>}
                </div>
                <ModuleDetail m={m} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 96 }}>
        <Reveal>
          <div
            className="flex flex-col items-center gap-[22px] text-center"
            style={{ borderRadius: 32, padding: "clamp(36px, 6vw, 80px)", background: "radial-gradient(700px 400px at 50% 0%, rgba(45,226,203,0.35), transparent 70%), #062A2B", border: "1px solid rgba(94,234,212,0.25)" }}
          >
            <h2 className="display" style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1, letterSpacing: "-0.045em", maxWidth: "18ch" }}>
              Kdo jiný než ty! Kdy jindy než teď! Nikdy před tím to nebylo tak jednoduché.
            </h2>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Link href="/kontakt" className="btn btn-primary" style={{ minHeight: 54 }}>Koupit celý program</Link>
              <Link href="/konzultace" className="btn btn-ghost" style={{ minHeight: 54, fontWeight: 600 }}>Individuální konzultace</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
