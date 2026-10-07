import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { LoginForm } from "@/components/SimpleForms";

export const metadata: Metadata = {
  title: "Přihlášení",
  description: "Zadej e-mail a pošleme ti přihlašovací odkaz.",
  alternates: { canonical: "/prihlaseni" },
  robots: { index: false },
};

export default function PrihlaseniPage() {
  return (
    <>
      <PageHead stitek="Členská sekce" nadpis="Přihlášení">
        <p className="lead" style={{ maxWidth: "46ch" }}>
          Zadej svůj e-mail. Pošleme ti odkaz, po jehož otevření se přihlásíš. Žádné heslo nepotřebuješ.
        </p>
      </PageHead>
      <section className="wrap" style={{ paddingTop: 24, paddingBottom: 96 }}>
        <Reveal>
          <div className="glass" style={{ padding: "clamp(24px, 4vw, 40px)", maxWidth: 520 }}>
            <LoginForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
