import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { ContactForm } from "@/components/SimpleForms";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktní údaje a formulář. Napiš mi k modulům, konzultacím nebo spolupráci.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <PageHead stitek="Kontakt" nadpis="Napiš mi" />
      <section className="wrap" style={{ paddingTop: 24, paddingBottom: 96 }}>
        <Reveal className="grid items-start gap-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))" }}>
          <div className="glass flex flex-col gap-4" style={{ padding: 32 }}>
            <h2 className="display" style={{ fontWeight: 700, fontSize: 24 }}>Kontaktní údaje</h2>
            {/* DOPLNIT: údaje dodá majitel */}
            <p style={{ fontSize: 16, lineHeight: 1.7 }}>E-mail: [doplní majitel]</p>
            <p style={{ fontSize: 16, lineHeight: 1.7 }}>Telefon: [doplní majitel]</p>
            <p style={{ fontSize: 16, lineHeight: 1.7 }}>Fakturační údaje (firma, IČO, adresa): [doplní majitel]</p>
          </div>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
