import Link from "next/link";
import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { pribeh } from "@/content/moduly";

export const metadata: Metadata = {
  title: "O mně",
  description:
    "Můj příběh: od sklízení špinavého nádobí až po síť podniků. Více než 12 let firma, přes 30 zaměstnanců, tři kavárny, pražírna a pekárna.",
  alternates: { canonical: "/o-mne" },
};

export default function OMnePage() {
  return (
    <>
      <PageHead stitek="Můj příběh" nadpis="O mně" />
      <section className="wrap" style={{ paddingTop: 24, paddingBottom: 96 }}>
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
            <h2 className="h2" style={{ fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.12, letterSpacing: "-0.03em" }}>{pribeh.nadpis}</h2>
            {pribeh.odstavce.map((o) => (
              <p key={o} style={{ fontSize: 17, lineHeight: 1.7 }}>{o}</p>
            ))}
            <p className="display" style={{ fontWeight: 700, fontSize: 26, lineHeight: 1.25 }}>{pribeh.zaver}</p>
            <p className="flex items-center gap-3" style={{ fontSize: 16, color: "#8fb9b5" }}>
              <span style={{ flex: "none", width: 28, height: 2, background: "var(--accent)" }} />
              {pribeh.citat}
            </p>
            <div className="mt-2 flex flex-wrap gap-3.5">
              <Link href="/#zdarma" className="btn btn-primary">Vyzkoušet systém zdarma</Link>
              <Link href="/moduly" className="btn btn-ghost" style={{ fontWeight: 600 }}>Moduly a ceny</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
