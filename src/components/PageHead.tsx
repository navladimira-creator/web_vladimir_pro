import Reveal from "./Reveal";

export default function PageHead({ stitek, nadpis, children }: { stitek: string; nadpis: string; children?: React.ReactNode }) {
  return (
    <section className="wrap" style={{ paddingBottom: 24 }}>
      <Reveal className="flex max-w-[900px] flex-col gap-5">
        <span className="eyebrow">{stitek}</span>
        <h1 className="display" style={{ fontWeight: 800, fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 1, letterSpacing: "-0.045em" }}>
          {nadpis}
        </h1>
        {children}
      </Reveal>
    </section>
  );
}
