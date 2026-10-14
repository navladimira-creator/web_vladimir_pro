import Link from "next/link";
import PuzzleBadge from "@/components/PuzzleBadge";
import { getProfile, requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const TYPY: Record<string, string> = {
  skripta: "SKRIPTA",
  manual: "MANUÁL",
  checklist: "CHECKLIST",
  tabulka: "TABULKA",
  ukoly_test: "ÚKOLY",
  dokument: "DOKUMENT",
};

const kroky = [
  { n: 1, nadpis: "Pusť si úvodní video", text: "Zjistíš, jak systém funguje a co tě v modulech čeká." },
  { n: 2, nadpis: "Stáhni si checklist a manuál", text: "Vyzkoušej je rovnou ve svém podniku." },
  { n: 3, nadpis: "Přidej další dílek", text: "Vyber modul, který tě pálí nejvíc – nebo si poskládej celý systém najednou." },
];

// První přihlášení (design/registrace-vitej.dc.html). Seznam obsahu čte databáze jen s platným přístupem (RLS).
export default async function VitejPage() {
  await requireUser();
  const profil = await getProfile();
  const sb = await createClient();
  const { data: modul } = await sb.from("modules").select("id").eq("slug", "restart").maybeSingle();
  const lekce = modul ? ((await sb.from("lessons").select("title, sort_order").eq("module_id", modul.id).order("sort_order")).data ?? []) : [];
  const materialy = modul ? ((await sb.from("materials").select("title, type, sort_order").eq("module_id", modul.id).order("sort_order")).data ?? []) : [];

  return (
    <div className="wrap" style={{ paddingTop: 40 }}>
      <div className="grid items-center gap-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))" }}>
        <div aria-hidden="true" className="flex items-center justify-center" style={{ minHeight: 260 }}>
          <div className="snap-in">
            <PuzzleBadge n={0} size={200} />
          </div>
        </div>
        <div className="flex flex-col gap-[22px]">
          <span className="badge-free self-start" style={{ background: "transparent", color: "var(--accent)", border: "1px solid rgba(94,234,212,0.5)" }}>
            reSTART ODEMČEN
          </span>
          <h1 className="display" style={{ fontWeight: 800, fontSize: "clamp(36px, 5.5vw, 64px)", lineHeight: 1, letterSpacing: "-0.045em" }}>
            Vítej v systému{profil?.full_name ? `, ${profil.full_name}` : ""}.
          </h1>
          <p className="lead" style={{ maxWidth: "46ch" }}>
            První dílek do sebe právě zapadl. Modul 0 – reSTART je ochutnávka z celého kurzu + úvodní data – projdi si ho a uvidíš, jestli ti systém Vladimír PRO sedne.
          </p>
          <div>
            <Link href="/clenska-sekce" className="btn btn-primary">
              Začít úvodním videem <span aria-hidden="true">▶</span>
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-12 grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(380px, 100%), 1fr))" }}>
        <div className="glass flex flex-col gap-4" style={{ padding: 32 }}>
          <h2 className="display" style={{ fontWeight: 700, fontSize: 22 }}>V reSTARTu najdeš</h2>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {lekce.map((l) => (
              <li key={l.title + l.sort_order} className="flex items-center gap-3.5">
                <span className="chip">VIDEO</span>
                <span style={{ color: "#fff" }}>{l.title}</span>
              </li>
            ))}
            {materialy.map((m) => (
              <li key={m.title + m.sort_order} className="flex items-center gap-3.5">
                <span className="chip">{TYPY[m.type] ?? "SOUBOR"}</span>
                <span style={{ color: "#fff" }}>{m.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass flex flex-col gap-4" style={{ padding: 32 }}>
          <h2 className="display" style={{ fontWeight: 700, fontSize: 22 }}>Co dál</h2>
          <ol className="m-0 flex list-none flex-col gap-5 p-0">
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
        </div>
      </section>

      <div className="glass mt-6 flex flex-wrap items-center gap-5" style={{ padding: "24px 32px" }}>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <PuzzleBadge key={n} n={n} size={36} active={n === 0} />
          ))}
        </div>
        <span style={{ flex: "1 1 260px" }}>
          <strong style={{ color: "#fff" }}>1 z 6</strong> dílků poskládáno. All in One – všechny moduly 0–5 za <strong style={{ color: "#fff" }}>24 990 Kč</strong>.
        </span>
        <Link href="/clenska-sekce">Na nástěnku →</Link>
      </div>
    </div>
  );
}
