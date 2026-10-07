import Link from "next/link";
import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { konzultace } from "@/content/moduly";

export const metadata: Metadata = {
  title: "Individuální konzultace",
  description:
    "Online konzultace (14 900 Kč) a konzultace přímo ve tvém podniku (55 000 Kč). Soukromé konzultace doporučuji až po dokončení programu Vladimír PRO.",
  alternates: { canonical: "/konzultace" },
};

function Balicek({ b }: { b: typeof konzultace.online }) {
  return (
    <article className="glass flex flex-col gap-4" style={{ padding: "clamp(24px, 3vw, 40px)" }}>
      <h2 className="display" style={{ fontWeight: 700, fontSize: "clamp(24px, 2.6vw, 30px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
        {b.nazev}
      </h2>
      <strong className="display" style={{ fontSize: 40, letterSpacing: "-0.03em" }}>{b.cena}</strong>
      <p className="display" style={{ fontWeight: 600, fontSize: 18, lineHeight: 1.35, color: "#e6fffb" }}>{b.shrnuti}</p>
      <p style={{ fontSize: 16, lineHeight: 1.7 }}>{b.text}</p>
      <Link href="/kontakt" className="btn btn-primary" style={{ alignSelf: "flex-start", marginTop: "auto" }}>
        Objednat
      </Link>
    </article>
  );
}

export default function KonzultacePage() {
  return (
    <>
      <PageHead stitek="Konzultace" nadpis="Individuální konzultace">
        {konzultace.uvod.map((o) => (
          <p key={o.slice(0, 30)} className="lead" style={{ maxWidth: "62ch" }}>{o}</p>
        ))}
      </PageHead>

      <section className="wrap" style={{ paddingBottom: 96 }}>
        <Reveal className="grid items-stretch gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))" }}>
          <Balicek b={konzultace.online} />
          <Balicek b={konzultace.vPodniku} />
        </Reveal>
        <Reveal className="mt-10">
          <p style={{ fontSize: 16, color: "#8fb9b5" }}>
            Máš otázky? <Link href="/kontakt">Napiš mi</Link>. Ochutnávku programu najdeš <Link href="/#zdarma">zdarma na úvodní stránce</Link>.
          </p>
        </Reveal>
      </section>
    </>
  );
}
