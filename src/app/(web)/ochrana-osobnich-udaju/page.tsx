import type { Metadata } from "next";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  alternates: { canonical: "/ochrana-osobnich-udaju" },
  robots: { index: false },
};

export default function Page() {
  return (
    <>
      <PageHead stitek="Právní informace" nadpis="Ochrana osobních údajů" />
      <section className="wrap" style={{ paddingTop: 24, paddingBottom: 96 }}>
        {/* DOPLNIT: text dodá majitel */}
        <p className="lead" style={{ maxWidth: "62ch" }}>[Sem přijde text, který dodá majitel.]</p>
      </section>
    </>
  );
}
