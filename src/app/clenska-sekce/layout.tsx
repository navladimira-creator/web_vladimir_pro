import type { Metadata } from "next";
import Link from "next/link";
import { getProfile, requireUser } from "@/lib/auth";
import { odhlasit } from "@/app/odhlaseni/actions";

export const metadata: Metadata = { title: "Členská sekce", robots: { index: false, follow: false } };

// Členská sekce: každý požadavek znovu ověří přihlášení na serveru (druhá vrstva za proxy.ts).
export default async function ClenskaLayout({ children }: LayoutProps<"/clenska-sekce">) {
  const user = await requireUser();
  const profil = await getProfile();
  const zaklad = (profil?.full_name || user.email || "?").trim();
  const pismeno = zaklad.charAt(0).toUpperCase();

  return (
    <>
      <header style={{ position: "sticky", top: 0, zIndex: 20, padding: "16px 24px" }}>
        <div className="nav-pill flex flex-wrap items-center justify-between gap-5">
          <Link href="/clenska-sekce" className="display flex items-center gap-2.5 no-underline" style={{ fontWeight: 700, fontSize: 18 }}>
            <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--coral)", boxShadow: "0 0 16px var(--coral)" }} />
            Vladimír PRO
          </Link>
          <nav aria-label="Členská sekce" className="flex items-center gap-5">
            <Link href="/clenska-sekce" className="nav-link">Moje moduly</Link>
            <form action={odhlasit}>
              <button type="submit" className="nav-link" style={{ background: "none", border: 0, cursor: "pointer", font: "inherit" }}>
                Odhlásit
              </button>
            </form>
            <span
              aria-hidden="true"
              className="display flex items-center justify-center"
              style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(145deg, #7ff5e6, #13a99a)", color: "#04201f", fontWeight: 800 }}
            >
              {pismeno}
            </span>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
