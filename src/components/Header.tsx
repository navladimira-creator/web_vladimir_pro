"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const odkazy = [
  { href: "/moduly", text: "Moduly a ceny" },
  { href: "/konzultace", text: "Konzultace" },
  { href: "/o-mne", text: "O mně" },
  { href: "/kontakt", text: "Kontakt" },
];

export default function Header() {
  const pathname = usePathname();
  const [shrunk, setShrunk] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, padding: "16px 24px" }}>
      <div className={`nav-pill ${shrunk ? "shrunk" : ""}`}>
        <div className="flex items-center justify-between gap-5">
          <Link
            href="/"
            className="display flex items-center gap-2.5 no-underline"
            style={{ fontWeight: 700, fontSize: 18 }}
          >
            <span
              aria-hidden="true"
              style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--coral)", boxShadow: "0 0 16px var(--coral)" }}
            />
            Vladimír PRO
          </Link>

          <nav aria-label="Hlavní menu" className="hidden items-center gap-6 md:flex">
            {odkazy.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                className="nav-link"
                aria-current={pathname === o.href ? "page" : undefined}
              >
                {o.text}
              </Link>
            ))}
            <Link href="/prihlaseni" className="btn btn-primary" style={{ minHeight: 44, padding: "10px 20px", fontSize: 15 }}>
              Přihlásit
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobilni-menu"
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            onClick={() => setOpen((v) => !v)}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {open && (
          <nav id="mobilni-menu" aria-label="Mobilní menu" className="mt-3 flex flex-col gap-1 pb-2 md:hidden">
            {odkazy.map((o) => (
              <Link key={o.href} href={o.href} className="nav-link" style={{ fontSize: 17, padding: "12px 4px" }} onClick={() => setOpen(false)}>
                {o.text}
              </Link>
            ))}
            <Link href="/prihlaseni" className="btn btn-primary mt-2" style={{ justifyContent: "center" }} onClick={() => setOpen(false)}>
              Přihlásit
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
