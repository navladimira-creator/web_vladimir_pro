import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import BookIce from "@/components/BookIce";
import ModuleTabs from "@/components/ModuleTabs";
import PuzzleBadge from "@/components/PuzzleBadge";
import { allInOne, cisla, faq, knihaUvod, konzultace, naucis } from "@/content/moduly";
import { getModuly } from "@/lib/moduly";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Moduly a ceny",
  description:
    "Žádné kecy – know-how postavené na vlastní kůži. Moduly Produkt, Provoz, Lidé a Identita a brand, bonusový modul, balíček All in One a ochutnávka reSTART zdarma.",
  alternates: { canonical: "/moduly" },
};

const kc = (n: number) => `${n.toLocaleString("cs-CZ").replace(/\s/g, " ")} Kč`;

export default async function ModulyPage() {
  const moduly = await getModuly();
  // Pořadí čísel podle návrhu: 18, 12, 1, 3, 30
  const cislaPodleNavrhu = [cisla[0], cisla[1], cisla[3], cisla[2], cisla[4]];
  const soucetJednotlive = moduly.reduce((s, m) => s + (m.cenaCislo ?? 0), 0);
  const uspora = soucetJednotlive - 24990;
  const cislaCenovych = moduly.filter((m) => m.cenaCislo).map((m) => m.n);
  const rozsah =
    cislaCenovych.length > 1 ? `${Math.min(...cislaCenovych)}–${Math.max(...cislaCenovych)}` : `${cislaCenovych[0] ?? ""}`;

  return (
    <>
      {/* Úvod */}
      <section className="wrap flex flex-col gap-8" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <Reveal className="flex flex-col gap-8">
          <span className="eyebrow" style={{ fontWeight: 700, letterSpacing: "0.1em" }}>Systém z praxe</span>
          <h1
            className="display"
            style={{ fontWeight: 800, fontSize: "clamp(40px, 6.4vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.055em", maxWidth: "16ch" }}
          >
            Žádné kecy – know-how postavené na vlastní kůži.
          </h1>
          <div className="flex max-w-[760px] flex-col gap-3">
            <h2 className="display" style={{ fontWeight: 700, fontSize: 26 }}>Máš nebo chceš kavárnu?</h2>
            <p style={{ fontSize: 19, lineHeight: 1.6 }}>
              Pomáhám kavárnám zvýšit útratu hostů, zlepšit marže a nastavit provoz tak, aby více vydělával a méně stresoval majitele.
            </p>
            <p style={{ fontSize: 19, lineHeight: 1.6 }}>
              Budoucím majitelům kaváren pomáhám vyhnout se chybám, které často stojí statisíce až miliony korun.
            </p>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))" }}>
            {cislaPodleNavrhu.map((c) => (
              <div key={c.popis} className="glass flex flex-col gap-1" style={{ padding: "20px 22px" }}>
                <span className="display" style={{ fontWeight: 800, fontSize: 34, letterSpacing: "-0.03em" }}>
                  {c.do}
                  {c.pripona}
                </span>
                <span style={{ fontSize: 14 }}>{c.popis}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Kniha */}
      <section className="wrap" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="grid items-center gap-14" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(380px, 100%), 1fr))" }}>
          <BookIce nadpis={knihaUvod.nadpis} autor={knihaUvod.autor} />
          <Reveal className="flex flex-col gap-[18px]">
            <span className="eyebrow" style={{ fontWeight: 700, letterSpacing: "0.1em" }}>Kdybych napsal knihu, jmenovala by se takto</span>
            <h2 className="display" style={{ fontWeight: 800, fontSize: "clamp(32px, 4.6vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.045em" }}>
              {knihaUvod.nadpis}
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.65 }}>{knihaUvod.text}</p>
            <h3 className="display" style={{ fontWeight: 700, fontSize: 22, marginTop: 8 }}>{knihaUvod.ukazuNadpis}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.7 }}>{knihaUvod.ukazuUvod}</p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                maxHeight: "7.2em",
                overflow: "hidden",
                WebkitMaskImage: "linear-gradient(180deg, #000 20%, transparent 100%)",
                maskImage: "linear-gradient(180deg, #000 20%, transparent 100%)",
              }}
            >
              {knihaUvod.ukazuUseknuty}
            </p>
            <div
              className="flex flex-wrap items-center gap-[18px]"
              style={{ padding: "20px 22px", borderRadius: 20, background: "linear-gradient(135deg, rgba(45,226,203,0.18), rgba(255,255,255,0.03))", border: "1px solid rgba(94,234,212,0.4)" }}
            >
              <div className="flex flex-col gap-1" style={{ flex: "1 1 240px" }}>
                <strong className="display" style={{ fontSize: 18, color: "#fff" }}>Chceš si to dočíst?</strong>
                <span style={{ fontSize: 15, lineHeight: 1.5 }}>Celý text najdeš v Modulu 0 – reSTART. Je zdarma.</span>
              </div>
              <Link href="/#zdarma" className="btn btn-primary" style={{ minHeight: 50, padding: "14px 24px", fontSize: 16 }}>
                Dočíst zdarma <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Co se naučíš */}
      <section className="wrap flex flex-col gap-8" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <Reveal className="flex flex-col gap-3">
          <span className="eyebrow" style={{ fontWeight: 700, letterSpacing: "0.1em" }}>V kavárně jako když najdeš</span>
          <h2 className="display" style={{ fontWeight: 800, fontSize: "clamp(32px, 4.6vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.045em" }}>
            Co se v systému Vladimír PRO naučíš?
          </h2>
        </Reveal>
        <Reveal className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))" }}>
          {naucis.map((n, i) => (
            <div key={n.nadpis} className="glass tilt flex flex-col gap-3.5" style={{ padding: 28 }}>
              <span className="display" style={{ fontWeight: 800, fontSize: 14, letterSpacing: "0.1em", color: "var(--accent-light)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display" style={{ fontWeight: 800, fontSize: 26, letterSpacing: "-0.03em", textTransform: "uppercase" }}>
                {n.nadpis}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>{n.text}</p>
            </div>
          ))}
        </Reveal>
        <Reveal>
          <figure
            className="flex flex-col gap-3.5"
            style={{ margin: "24px 0 0", padding: "clamp(24px, 4vw, 40px)", borderLeft: "3px solid var(--accent)", background: "linear-gradient(90deg, rgba(45,226,203,0.1), transparent 70%)", borderRadius: "0 24px 24px 0" }}
          >
            <blockquote className="display" style={{ margin: 0, fontWeight: 800, fontSize: "clamp(30px, 4.4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.04em" }}>
              „Svět patří těm, co se neposerou.“
            </blockquote>
            <figcaption style={{ fontSize: 17, fontWeight: 600, color: "var(--accent-light)" }}>– Charles Bukowski</figcaption>
          </figure>
        </Reveal>
      </section>

      {/* All in One */}
      <section className="wrap" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <Reveal>
          <div
            className="grid items-center gap-10"
            style={{ position: "relative", borderRadius: 32, overflow: "hidden", padding: "clamp(28px, 5vw, 64px)", gridTemplateColumns: "repeat(auto-fit, minmax(min(400px, 100%), 1fr))", color: "#e6fffb", background: "radial-gradient(700px 400px at 100% 0%, rgba(255,255,255,0.28), transparent 60%), linear-gradient(125deg, #0B6F67, #0E8C82 45%, #13A99A)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 60px 100px -40px rgba(45,226,203,0.6)" }}
          >
            <div className="flex flex-col gap-[18px]">
              <span className="self-start" style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", color: "#04201F", background: "#fff", padding: "7px 12px", borderRadius: 999 }}>
                {allInOne.stitek}
              </span>
              <h2 className="display" style={{ fontWeight: 800, fontSize: "clamp(32px, 4.4vw, 54px)", lineHeight: 1, letterSpacing: "-0.045em" }}>
                {allInOne.nazev}
              </h2>
              <p style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.04em", color: "#fff" }}>
                KOMPLEXNÍ A PŘITOM JEDNODUCHÝ VE SVÉM POUŽITÍ – SYSTÉM, CO MĚNÍ ZAJETÉ ZVYKY A RUTINY, CO NEFUNGUJÍ.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.7 }}>
                Od A až po Z. Pokud bych měl možnost ve svých začátcích získat tyto informace a kdyby tehdy existoval někdo, kdo by sdílel své zkušenosti, neváhal bych.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.7 }}>
                Není to koučink, není to mentoring a není to ani forma krizového managementu, ale má to hodnotu, jako kdybyste tyto 3 odborníky pozvali do svého života a platili jim 4 000,- za hodinu konzultace.
              </p>
              <figure className="flex flex-col gap-2" style={{ margin: "8px 0 0", paddingLeft: 18, borderLeft: "3px solid #fff" }}>
                <blockquote className="display" style={{ margin: 0, fontWeight: 700, fontSize: "clamp(22px, 2.6vw, 30px)", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                  „Vše, co si umíte představit, může existovat.“
                </blockquote>
                <figcaption style={{ fontSize: 15, fontWeight: 600, color: "#cffaf3" }}>– Steve Jobs</figcaption>
              </figure>
            </div>
            <div
              className="flex flex-col gap-[18px]"
              style={{ borderRadius: 24, padding: 30, background: "rgba(4,26,28,0.55)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "var(--accent-light)" }}>VŠE, CO POTŘEBUJEŠ</span>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <PuzzleBadge key={n} n={n} size={40} />
                ))}
              </div>
              <span className="flex flex-wrap items-baseline gap-3.5">
                <s style={{ fontSize: 18, color: "#8fb9b5" }}>{allInOne.cenaPuvodni}</s>
                <strong className="display" style={{ fontSize: 54, letterSpacing: "-0.04em", lineHeight: 1 }}>{allInOne.cena}</strong>
              </span>
              <p style={{ fontSize: 15, lineHeight: 1.65 }}>{allInOne.kartaPopis}</p>
              <ul className="m-0 flex list-none flex-col gap-2 p-0" style={{ paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.15)", fontSize: 14 }}>
                <li className="flex justify-between gap-3">
                  <span>Moduly {rozsah} jednotlivě</span>
                  <span style={{ color: "#fff", fontWeight: 700 }}>{kc(soucetJednotlive)}</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span>Bonusový modul 5</span>
                  <span style={{ color: "#fff", fontWeight: 700 }}>jen v All in One</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span>Ušetříš oproti jednotlivým modulům</span>
                  <span style={{ color: "var(--accent-light)", fontWeight: 800 }}>{kc(uspora)}</span>
                </li>
              </ul>
              <Link href="/kontakt" className="btn btn-white" style={{ justifyContent: "center", minHeight: 54, padding: "18px 28px" }}>
                {allInOne.tlacitko}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Vyber si dílek */}
      <section className="wrap flex flex-col gap-6" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <Reveal className="flex flex-col gap-3">
          <span className="eyebrow" style={{ fontWeight: 700, letterSpacing: "0.1em" }}>Jednotlivé moduly</span>
          <h2 className="display" style={{ fontWeight: 800, fontSize: "clamp(32px, 4.6vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.045em" }}>
            Vyber si dílek
          </h2>
        </Reveal>
        <ModuleTabs moduly={moduly} />
      </section>

      {/* Závěrečná výzva */}
      <section className="wrap" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <Reveal>
          <div
            className="flex flex-col items-center gap-7 text-center"
            style={{ borderRadius: 32, padding: "clamp(36px, 6vw, 80px)", background: "radial-gradient(700px 400px at 50% 0%, rgba(45,226,203,0.35), transparent 70%), #062A2B", border: "1px solid rgba(94,234,212,0.25)" }}
          >
            <h2 className="display flex flex-col" style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1, letterSpacing: "-0.045em" }}>
              <span>Kdo jiný než ty!</span>
              <span>Kdy jindy než teď!</span>
              <span style={{ color: "var(--accent)" }}>Nikdy předtím to nebylo tak jednoduché.</span>
            </h2>
            <Link href="/kontakt" className="btn btn-primary" style={{ minHeight: 54, padding: "18px 30px" }}>
              Koupit celý program
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="wrap flex flex-col gap-6" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <Reveal className="flex flex-col gap-3">
          <span className="eyebrow" style={{ fontWeight: 700, letterSpacing: "0.1em" }}>FAQ</span>
          <h2 className="display" style={{ fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.04em", maxWidth: "20ch" }}>
            Nikdo se sice neptal, ale mohl by třeba na toto
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[860px] flex-col gap-3">
          {faq.map((f) => (
            <details key={f.otazka} className="glass faq">
              <summary>
                {f.otazka}
                <span className="faq-i" aria-hidden="true">+</span>
              </summary>
              <p style={{ padding: "0 26px 24px", fontSize: 16, lineHeight: 1.7 }}>{f.odpoved}</p>
            </details>
          ))}
        </Reveal>
      </section>

      {/* Konzultace */}
      <section className="wrap" style={{ paddingTop: 56, paddingBottom: 96 }}>
        <Reveal>
          <div
            className="glass grid items-center gap-10"
            style={{ padding: "clamp(24px, 4vw, 48px)", gridTemplateColumns: "repeat(auto-fit, minmax(min(380px, 100%), 1fr))" }}
          >
            <div className="flex flex-col gap-3.5">
              <span className="eyebrow" style={{ fontWeight: 700, letterSpacing: "0.1em" }}>Individuální konzultace</span>
              <h2 className="display" style={{ fontWeight: 800, fontSize: "clamp(28px, 3.6vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.04em" }}>
                Máš velmi specifický podnik?
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.7 }}>{konzultace.uvodKratky}</p>
            </div>
            <div className="flex flex-col gap-3">
              {[konzultace.online, konzultace.vPodniku].map((k) => (
                <div
                  key={k.nazev}
                  className="flex flex-wrap items-baseline justify-between gap-3"
                  style={{ padding: "18px 22px", borderRadius: 18, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}
                >
                  <span className="display" style={{ fontWeight: 700, fontSize: 18 }}>{k.nazev}</span>
                  <strong className="display" style={{ fontSize: 22 }}>{k.cena}</strong>
                </div>
              ))}
              <Link href="/konzultace" style={{ fontWeight: 600, fontSize: 16, marginTop: 6 }}>Více o konzultacích →</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
