import Link from "next/link";
import HeroPuzzle from "@/components/HeroPuzzle";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import FreeForm from "@/components/FreeForm";
import ModulePath from "@/components/ModulePath";
import AllInOneCard from "@/components/AllInOneCard";
import Testimonials from "@/components/Testimonials";
import { cisla, prinosy, pribeh } from "@/content/moduly";
import { getModuly } from "@/lib/moduly";

export const metadata = {
  title: { absolute: "Vladimír PRO – systém pro majitele kaváren a gastro podniků" },
  alternates: { canonical: "/" },
};

export const revalidate = 60;

export default async function Home() {
  const moduly = await getModuly();
  const nazvy = Object.fromEntries(moduly.map((m) => [m.n, m.nazev]));
  return (
    <>
      {/* 1. Hero */}
      <section className="wrap" style={{ paddingBottom: 64 }}>
        <div className="grid items-center gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(480px, 100%), 1fr))" }}>
          <div className="flex flex-col gap-[26px]">
            <span
              className="inline-flex items-center gap-2.5 self-start"
              style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#cffaf3", padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(94,234,212,0.3)", background: "rgba(45,226,203,0.08)" }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
              Systém Vladimír PRO
            </span>
            <h1
              className="display"
              style={{ fontWeight: 800, fontSize: "clamp(64px, 9.5vw, 136px)", lineHeight: 0.9, letterSpacing: "-0.055em" }}
            >
              Pokus <span style={{ color: "var(--accent)" }}>–</span>
              <br />
              <span style={{ background: "linear-gradient(180deg, #fff 10%, var(--accent) 120%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                omyl
              </span>
            </h1>
            <p className="display" style={{ fontWeight: 600, fontSize: 24, lineHeight: 1.25, color: "#e6fffb" }}>
              Nejčastější způsob vedení a budování podniku
            </p>
            <p className="lead" style={{ maxWidth: "44ch" }}>
              Nemusíš ztrácet čas, utrácet hromady peněz a učit se ze svých chyb. Můžeš tomu předejít, vybrat si jednodušší cestu a svůj potenciál věnovat důležitým věcem.
            </p>
            <div>
              <Link href="#zdarma" className="btn btn-primary" style={{ padding: "18px 30px" }}>
                Vyzkoušet systém Vladimír PRO <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <HeroPuzzle nazvy={nazvy} />
        </div>

        <Reveal className="mt-10 grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))" }}>
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

      {/* 2. Modul 0 zdarma */}
      <section id="zdarma" className="wrap">
        <Reveal>
          <div
            className="glass grid items-center gap-12"
            style={{ padding: "clamp(28px, 5vw, 64px)", gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))", background: "linear-gradient(135deg, rgba(45,226,203,0.16), rgba(255,255,255,0.02) 60%)" }}
          >
            <div className="flex flex-col gap-[18px]">
              <span className="eyebrow">Přidej se k systému, který je založený na praxi a zkušenostech</span>
              <h2 className="display" style={{ fontWeight: 700, fontSize: "clamp(34px, 4.6vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.035em" }}>
                Video manuál, check-list a nový pohled na věc
              </h2>
              <p className="lead" style={{ maxWidth: "42ch", lineHeight: 1.6 }}>
                Vyzkoušej ochutnávku zdarma a zjisti, jestli ti to může něco dát a v něčem pomoct.
              </p>
            </div>
            <FreeForm />
          </div>
        </Reveal>
      </section>

      {/* 3. Je to pro mě vhodné? */}
      <section className="wrap" style={{ paddingBottom: 120 }}>
        <Reveal className="mb-11 grid items-end gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))" }}>
          <h2 className="h2" style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1, letterSpacing: "-0.04em" }}>
            Je to pro mě vhodné?
          </h2>
          <p className="lead">
            <strong style={{ color: "#fff" }}>Jednoznačně!</strong> Říká se, že chybovat je lidské, ale to jsou kecy – chyby stojí hodně peněz, a pokud je nějaká šance, jak se jim vyhnout, tak sem s tím. Život je změna a v gastru to platí dvojnásob. To, co platilo včera, už dnes nemusí, a je fajn být o krok napřed.
          </p>
        </Reveal>
        <Reveal className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))" }}>
          {prinosy.map((p) => (
            <div key={p.cislo} className="glass tilt flex flex-col gap-4" style={{ padding: 32 }}>
              <span className="num-icon">{p.cislo}</span>
              <h3 className="display" style={{ fontWeight: 700, fontSize: 24, lineHeight: 1.15 }}>{p.nadpis}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.65 }}>{p.text}</p>
              <Link href="#zdarma" style={{ fontWeight: 600, fontSize: 15, marginTop: "auto" }}>
                Začít teď →
              </Link>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 4. Velký citát na fotce */}
      <section
        className="photo"
        style={{ zIndex: 1, minHeight: 680, padding: "120px 24px", background: "radial-gradient(800px 420px at 50% 50%, rgba(45,226,203,0.22), transparent 70%), linear-gradient(180deg, #041A1C 0%, #0B3433 22%, #0B3433 78%, #041A1C 100%)" }}
      >
        <span style={{ position: "absolute", left: 24, top: 24, fontSize: 13, fontWeight: 600, color: "#6fa8a2", zIndex: 2 }}>
          [Foto přes celou šířku: atmosféra kavárny, dobarvená do tyrkysové]
        </span>
        <Reveal className="relative z-[2] flex max-w-[1080px] flex-col items-center gap-[26px]">
          <span className="eyebrow" style={{ fontSize: 14 }}>A věřte mi, když říkám:</span>
          <blockquote className="display" style={{ fontWeight: 800, fontSize: "clamp(36px, 6vw, 84px)", lineHeight: 1.02, letterSpacing: "-0.045em" }}>
            „Kavárna není v první řadě o kafi a ani o 16ti hodinové otevírací době!“
          </blockquote>
          <span style={{ width: 64, height: 2, background: "var(--accent)", boxShadow: "0 0 14px var(--accent)" }} />
        </Reveal>
      </section>

      {/* 5. Systém z praxe – cesta modulů */}
      <section className="wrap" style={{ paddingTop: 120 }}>
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[760px] flex-col gap-3.5">
            <span className="eyebrow">Systém z praxe</span>
            <h2 className="h2">Žádné nesmysly ani kecy – know-how vybudované a otestované na vlastních provozech.</h2>
          </div>
          <Link href="/moduly" style={{ fontSize: 16, fontWeight: 600 }}>Všechny moduly a ceny →</Link>
        </Reveal>
        <ModulePath moduly={moduly} />
        <div className="mt-10">
          <AllInOneCard />
        </div>
      </section>

      {/* 6. Můj příběh */}
      <section className="wrap">
        <Reveal className="grid items-start gap-14" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))" }}>
          <div style={{ position: "relative", perspective: 1400 }}>
            <div className="photo" style={{ aspectRatio: "4 / 5", borderRadius: 28, transform: "rotateY(12deg) rotateX(4deg)", border: "1px solid rgba(94,234,212,0.3)", boxShadow: "-30px 50px 80px -30px rgba(0,0,0,0.7)" }}>
              [Foto: Vladimír za barem, dobarvené do tyrkysové]
            </div>
            <div className="glass flex flex-col gap-0.5" style={{ position: "absolute", right: -8, bottom: 36, padding: "18px 22px", background: "rgba(4,26,28,0.82)", backdropFilter: "blur(10px)" }}>
              <span className="display" style={{ fontWeight: 800, fontSize: 30 }}>18 let</span>
              <span style={{ fontSize: 13 }}>v oboru</span>
            </div>
          </div>
          <div className="flex flex-col gap-[18px]">
            <span className="eyebrow">Můj příběh</span>
            <h2 className="h2" style={{ fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.12, letterSpacing: "-0.03em" }}>{pribeh.nadpis}</h2>
            {pribeh.odstavce.map((o) => (
              <p key={o} style={{ fontSize: 17, lineHeight: 1.7 }}>{o}</p>
            ))}
            <p className="display" style={{ fontWeight: 700, fontSize: 26, lineHeight: 1.25 }}>{pribeh.zaver}</p>
            <p className="flex items-center gap-3" style={{ fontSize: 16, color: "#8fb9b5" }}>
              <span style={{ flex: "none", width: 28, height: 2, background: "var(--accent)" }} />
              {pribeh.citat}
            </p>
          </div>
        </Reveal>
      </section>

      {/* 7. Reference */}
      <section aria-label="Reference" className="wrap">
        <Reveal>
          <Testimonials />
        </Reveal>
      </section>

      {/* 8. Závěrečná výzva */}
      <section className="wrap" style={{ paddingBottom: 96 }}>
        <Reveal>
          <div
            className="flex flex-col items-center gap-[22px] text-center"
            style={{ position: "relative", borderRadius: 32, overflow: "hidden", padding: "clamp(36px, 6vw, 88px)", background: "radial-gradient(700px 400px at 50% 0%, rgba(45,226,203,0.35), transparent 70%), #062A2B", border: "1px solid rgba(94,234,212,0.25)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)" }}
          >
            <span className="eyebrow">Nevíš, jak začít?</span>
            <h2 className="display" style={{ fontWeight: 800, fontSize: "clamp(38px, 6vw, 80px)", lineHeight: 0.98, letterSpacing: "-0.05em", maxWidth: "15ch" }}>
              Začni hned, protože čas jsou peníze.
            </h2>
            <p style={{ fontSize: 19, lineHeight: 1.6, maxWidth: "46ch" }}>
              Každou hodinu, kdy ve tvém podniku není systém, přicházíš o peníze. To je fakt.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Link href="#zdarma" className="btn btn-primary" style={{ minHeight: 54, padding: "18px 30px" }}>Jdu do toho hned!</Link>
              <Link href="/moduly" className="btn btn-ghost" style={{ minHeight: 54, padding: "17px 28px", fontWeight: 600 }}>Chci vědět víc</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
