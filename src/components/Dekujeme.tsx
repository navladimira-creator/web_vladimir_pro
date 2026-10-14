"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { poslatZnovu } from "@/app/(web)/registrace/actions";
import PuzzleBadge from "./PuzzleBadge";

const kroky = [
  { n: 1, nadpis: "Otevři e-mail", text: "Hledej zprávu od Vladimír PRO s předmětem „Tvůj přihlašovací odkaz“." },
  { n: 2, nadpis: "Klikni na „Přihlásit se“", text: "Žádné heslo nepotřebuješ. Odkaz platí 1 hodinu." },
  { n: 3, nadpis: "Začni reSTARTem", text: "Čeká tě úvodní video, checklist a manuál." },
];

// Stránka po odeslání registračního formuláře (design/registrace-dekujeme.dc.html).
export default function Dekujeme() {
  const surova = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return sessionStorage.getItem("registrace") ?? "";
      } catch {
        return "";
      }
    },
    () => "",
  );
  const osoba = useMemo<{ jmeno: string; email: string }>(() => {
    try {
      return surova ? (JSON.parse(surova) as { jmeno: string; email: string }) : { jmeno: "", email: "" };
    } catch {
      return { jmeno: "", email: "" };
    }
  }, [surova]);
  const [stav, setStav] = useState<"" | "odesilam" | "odeslano" | "chyba">("");
  const [zprava, setZprava] = useState("");

  async function znovu() {
    setStav("odesilam");
    const r = await poslatZnovu(osoba.email);
    setStav(r.ok ? "odeslano" : "chyba");
    setZprava(r.chyba ?? "");
  }

  return (
    <div className="wrap" style={{ paddingTop: 48 }}>
      <div className="grid items-center gap-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))" }}>
        <div className="flex flex-col gap-[22px]">
          <span className="eyebrow">Registrace proběhla</span>
          <h1 className="display" style={{ fontWeight: 800, fontSize: "clamp(38px, 6vw, 72px)", lineHeight: 1, letterSpacing: "-0.05em" }}>
            Díky{osoba.jmeno ? `, ${osoba.jmeno}` : ""}!
            <br />
            <span style={{ color: "var(--accent)" }}>Tvůj první dílek je na cestě.</span>
          </h1>
          <p className="lead" style={{ maxWidth: "46ch" }}>
            Poslali jsme ti e-mail s odkazem{osoba.email ? <> na <strong style={{ color: "#fff" }}>{osoba.email}</strong></> : null}. Jedním kliknutím se přihlásíš a odemkneš si Modul 0 – reSTART, ochutnávku z celého kurzu.
          </p>
        </div>
        <div aria-hidden="true" className="flex items-center justify-center" style={{ minHeight: 260 }}>
          <div style={{ animation: "cfloat 6s ease-in-out infinite" }}>
            <PuzzleBadge n={0} size={200} />
          </div>
        </div>
      </div>

      <section className="glass mt-12" style={{ padding: "clamp(24px, 4vw, 40px)" }}>
        <h2 className="display" style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>Co teď?</h2>
        <ol className="m-0 grid list-none gap-6 p-0" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))" }}>
          {kroky.map((k) => (
            <li key={k.n} className="grid items-start gap-4" style={{ gridTemplateColumns: "52px minmax(0, 1fr)" }}>
              <span className="num-icon">{k.n}</span>
              <span className="flex flex-col gap-1">
                <strong style={{ color: "#fff" }}>{k.nadpis}</strong>
                <span style={{ fontSize: 15, lineHeight: 1.6 }}>{k.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(380px, 100%), 1fr))" }}>
        <div className="glass flex flex-col gap-3.5" style={{ padding: 32 }}>
          <h2 className="display" style={{ fontWeight: 700, fontSize: 22 }}>E-mail nepřišel?</h2>
          <p style={{ fontSize: 16, lineHeight: 1.65 }}>
            Počkej minutku a mrkni i do složek <strong style={{ color: "#fff" }}>Hromadné</strong>, <strong style={{ color: "#fff" }}>Promo akce</strong> nebo <strong style={{ color: "#fff" }}>Spam</strong>. Pokud tam není, pošleme ho znovu.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" onClick={znovu} disabled={!osoba.email || stav === "odesilam" || stav === "odeslano"} className="btn btn-primary" style={{ minHeight: 48 }}>
              {stav === "odeslano" ? "✓ Odesláno znovu" : stav === "odesilam" ? "Odesílám…" : "Poslat e-mail znovu"}
            </button>
            <Link href="/#zdarma" style={{ fontSize: 15 }}>Zadal jsem špatný e-mail</Link>
          </div>
          {stav === "chyba" && <p role="alert" style={{ fontSize: 15, color: "#ffb4a2" }}>{zprava || "Odeslání se nepodařilo."}</p>}
        </div>
        <div className="glass flex flex-col gap-3.5" style={{ padding: 32 }}>
          <h2 className="display" style={{ fontWeight: 700, fontSize: 22 }}>Mezitím se podívej, co tě čeká</h2>
          <p style={{ fontSize: 16, lineHeight: 1.65 }}>Šest dílků, jeden systém. Od produktu přes provoz a lidi až po značku.</p>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <PuzzleBadge key={n} n={n} size={40} active={n === 0} />
            ))}
          </div>
          <Link href="/moduly" style={{ fontWeight: 600 }}>Prohlédnout moduly →</Link>
        </div>
      </section>
    </div>
  );
}
