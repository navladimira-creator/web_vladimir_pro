import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import { bezpecnaCesta } from "@/lib/bezpecna-cesta";
import { potvrdit } from "./actions";

export const metadata: Metadata = { title: "Dokončení přihlášení", robots: { index: false, follow: false } };

export default async function PotvrditPage({ searchParams }: PageProps<"/auth/confirm">) {
  const p = await searchParams;
  const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");
  const tokenHash = one(p.token_hash);
  const typ = one(p.type) || "email";
  const next = bezpecnaCesta(one(p.next) || null);

  return (
    <>
      <PageHead stitek="Členská sekce" nadpis="Skoro hotovo">
        <p className="lead" style={{ maxWidth: "46ch" }}>
          Klikni na tlačítko a přihlásíme tě. Odkaz je jednorázový a platí jen krátce.
        </p>
      </PageHead>
      <section className="wrap" style={{ paddingTop: 24, paddingBottom: 96 }}>
        {tokenHash ? (
          <form action={potvrdit} className="glass" style={{ padding: "clamp(24px, 4vw, 40px)", maxWidth: 520 }}>
            <input type="hidden" name="token_hash" value={tokenHash} />
            <input type="hidden" name="type" value={typ} />
            <input type="hidden" name="next" value={next} />
            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", minHeight: 54 }}>
              Přihlásit se
            </button>
          </form>
        ) : (
          <p className="lead">Odkaz není úplný. Požádej prosím o nový na stránce přihlášení.</p>
        )}
      </section>
    </>
  );
}
