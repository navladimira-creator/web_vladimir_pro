import Link from "next/link";
import { notFound } from "next/navigation";
import PuzzleBadge from "@/components/PuzzleBadge";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { kc, nactiPrehled, procenta } from "@/lib/clenska";
import { oznacitHotovo } from "./actions";

const SKUPINY: [string, string][] = [
  ["skripta", "Skripta"],
  ["manual", "Manuály"],
  ["checklist", "Checklisty"],
  ["tabulka", "Tabulky a nástroje"],
  ["ukoly_test", "Úkoly a testy"],
  ["dokument", "Dokumenty a vzory"],
];
const STITKY: Record<string, string> = { skripta: "SKRIPTA", manual: "MANUÁL", checklist: "CHECKLIST", tabulka: "TABULKA", ukoly_test: "ÚKOLY", dokument: "DOKUMENT" };

// Detail modulu (design/clenska-detail-modulu.dc.html). Zamčený modul ukáže jen nabídku.
export default async function ModulPage({ params, searchParams }: PageProps<"/clenska-sekce/[slug]">) {
  const user = await requireUser();
  const { slug } = await params;
  const q = await searchParams;
  const { moduly, lekce, hotoveIds } = await nactiPrehled(user.id);
  const modul = moduly.find((m) => m.slug === slug);
  if (!modul) notFound();

  const drobky = (
    <nav aria-label="Drobečková navigace" className="flex flex-wrap items-center gap-2" style={{ fontSize: 14 }}>
      <Link href="/clenska-sekce" style={{ color: "#8FB9B5", textDecoration: "none" }}>Moje moduly</Link>
      <span aria-hidden="true">/</span>
      <span style={{ color: "#fff", fontWeight: 600 }}>Modul {modul.sort_order} – {modul.title.length > 60 ? "Bonus" : modul.title}</span>
    </nav>
  );

  if (modul.stav !== "odemceno") {
    const vyprselo = modul.stav === "vyprselo";
    return (
      <div className="wrap flex flex-col gap-8" style={{ paddingTop: 24, paddingBottom: 96 }}>
        {drobky}
        <div className="glass flex flex-wrap items-center gap-8" style={{ padding: "clamp(24px, 4vw, 44px)" }}>
          <PuzzleBadge n={modul.sort_order} size={120} active={false} />
          <div className="flex flex-col gap-3" style={{ flex: "1 1 320px" }}>
            <span className="eyebrow">{vyprselo ? "Platnost přístupu vypršela" : "Zamčeno"}</span>
            <h1 className="display" style={{ fontWeight: 800, fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1, letterSpacing: "-0.04em" }}>
              {modul.title.length > 60 ? `Modul ${modul.sort_order}` : modul.title}
            </h1>
            {modul.description && <p style={{ fontSize: 17, lineHeight: 1.65 }}>{modul.description}</p>}
            {modul.price_czk && !modul.bundle_only && (
              <p style={{ fontSize: 17, color: "#fff" }}>
                {modul.original_price_czk && <s style={{ color: "#6F9592", marginRight: 8 }}>{kc(modul.original_price_czk)}</s>}
                <strong>{kc(modul.price_czk)}</strong>
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <Link href="/kontakt" className="btn btn-primary">
                {vyprselo ? "Prodloužit přístup" : modul.bundle_only ? "Zjistit víc" : "Odemknout modul"}
              </Link>
              <Link href="/moduly" className="btn btn-ghost">Přehled modulů</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sb = await createClient();
  const [materialyRes, uvodRes] = await Promise.all([
    sb.from("materials").select("id, type, title, file_path, sort_order").eq("module_id", modul.id).order("sort_order"),
    sb.from("module_members_content").select("intro").eq("module_id", modul.id).maybeSingle(),
  ]);
  const materialy = materialyRes.data ?? [];
  const uvod = uvodRes.data?.intro ?? null;

  const videa = lekce.filter((l) => l.module_id === modul.id);
  const zadane = typeof q.lekce === "string" ? q.lekce : undefined;
  const aktualni = videa.find((l) => l.id === zadane) ?? videa.find((l) => !hotoveIds.has(l.id)) ?? videa[0];
  const idx = aktualni ? videa.indexOf(aktualni) : -1;
  const predchozi = idx > 0 ? videa[idx - 1] : null;
  const dalsi = idx >= 0 && idx < videa.length - 1 ? videa[idx + 1] : null;
  const hotovoTed = aktualni ? hotoveIds.has(aktualni.id) : false;
  const pct = procenta(modul.hotovo, modul.lekci);
  const dalsiModul = moduly.find((m) => m.sort_order > modul.sort_order && m.stav !== "odemceno");
  const odkazLekce = (id: string) => `/clenska-sekce/${modul.slug}?lekce=${id}`;

  return (
    <div className="wrap flex flex-col gap-8" style={{ paddingTop: 24, paddingBottom: 96 }}>
      {drobky}

      <div className="flex flex-wrap items-center gap-7">
        <div style={{ flex: "none", transform: "rotate(-8deg)" }}>
          <PuzzleBadge n={modul.sort_order} size={120} />
        </div>
        <div className="flex flex-col gap-2.5" style={{ flex: "1 1 420px" }}>
          {modul.eyebrow && <span className="eyebrow">Modul {modul.sort_order} · {modul.eyebrow}</span>}
          <h1 className="display" style={{ fontWeight: 800, fontSize: "clamp(44px, 6vw, 76px)", lineHeight: 0.95, letterSpacing: "-0.05em" }}>
            {modul.title.length > 60 ? `Modul ${modul.sort_order}` : modul.title}
          </h1>
          <div className="flex items-center gap-4" style={{ maxWidth: 520 }}>
            <div className="k-bar" style={{ flex: 1 }}><span style={{ width: `${pct}%` }} /></div>
            <strong style={{ fontSize: 15, color: "#fff", whiteSpace: "nowrap" }}>Hotovo {modul.hotovo} z {modul.lekci}</strong>
          </div>
        </div>
      </div>

      {uvod && (
        <div className="glass" style={{ padding: "clamp(22px, 3vw, 32px)" }}>
          <p style={{ fontSize: 17, lineHeight: 1.7, whiteSpace: "pre-line", color: "#d5efec" }}>{uvod}</p>
        </div>
      )}

      {aktualni && (
        <div className="grid items-start gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(360px, 100%), 1fr))" }}>
          <div className="flex flex-col gap-5" style={{ gridColumn: "span 1" }}>
            <div
              className="glass relative flex items-center justify-center overflow-hidden"
              style={{ aspectRatio: "16 / 9", borderRadius: 26, background: "radial-gradient(500px 280px at 50% 50%, rgba(45,226,203,0.18), transparent 70%), linear-gradient(160deg, #0F3D3C, #051F20)" }}
            >
              <span style={{ fontSize: 15, color: "#8FB9B5", padding: 24, textAlign: "center" }}>
                {aktualni.bunny_video_id ? "Přehrávač videa se připravuje." : "Video k této lekci přibude."}
              </span>
            </div>

            <div className="glass flex flex-col gap-4" style={{ padding: "clamp(22px, 3vw, 32px)" }}>
              <span className="eyebrow">Video {idx + 1} z {videa.length}</span>
              <h2 className="display" style={{ fontWeight: 700, fontSize: "clamp(22px, 2.4vw, 30px)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#fff" }}>
                {aktualni.title}
              </h2>
              {aktualni.description && <p style={{ fontSize: 16, lineHeight: 1.65 }}>{aktualni.description}</p>}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <form action={oznacitHotovo}>
                  <input type="hidden" name="lekce" value={aktualni.id} />
                  <input type="hidden" name="hotovo" value={hotovoTed ? "0" : "1"} />
                  <button
                    type="submit"
                    aria-pressed={hotovoTed}
                    className="btn"
                    style={
                      hotovoTed
                        ? { background: "rgba(45,226,203,0.14)", color: "#5EEAD4", border: "1px solid rgba(94,234,212,0.5)" }
                        : { background: "#2DE2CB", color: "#04201F", border: "1px solid #2DE2CB" }
                    }
                  >
                    {hotovoTed ? "✓ Hotovo" : "Označit jako hotové"}
                  </button>
                </form>
                <div className="ml-auto flex gap-2">
                  {predchozi && (
                    <Link href={odkazLekce(predchozi.id)} aria-label="Předchozí video" className="btn btn-ghost">←</Link>
                  )}
                  {dalsi && (
                    <Link href={odkazLekce(dalsi.id)} className="btn btn-ghost">Další video →</Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside className="glass flex flex-col gap-1.5" aria-label="Videa modulu" style={{ padding: 18 }}>
            <div className="flex items-baseline justify-between" style={{ padding: "6px 8px 10px" }}>
              <h2 className="display" style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>Videa</h2>
              <span style={{ fontSize: 14 }}>Hotovo {modul.hotovo} z {modul.lekci}</span>
            </div>
            {videa.map((l, i) => {
              const hotovo = hotoveIds.has(l.id);
              const on = l.id === aktualni.id;
              return (
                <Link
                  key={l.id}
                  href={odkazLekce(l.id)}
                  aria-current={on ? "true" : undefined}
                  className="flex items-start gap-3.5 no-underline"
                  style={{
                    padding: "14px 16px",
                    borderRadius: 16,
                    minHeight: 56,
                    border: `1px solid ${on ? "rgba(94,234,212,0.4)" : "transparent"}`,
                    background: on ? "rgba(45,226,203,0.12)" : "transparent",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="display inline-flex flex-none items-center justify-center"
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      fontWeight: 700,
                      fontSize: 13,
                      background: hotovo ? "#2DE2CB" : on ? "rgba(45,226,203,0.2)" : "rgba(255,255,255,0.07)",
                      color: hotovo ? "#04201F" : on ? "#5EEAD4" : "#8FB9B5",
                    }}
                  >
                    {hotovo ? "✓" : i + 1}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span style={{ fontSize: 15, lineHeight: 1.4, fontWeight: 600, color: on ? "#fff" : hotovo ? "#9FC9C4" : "#D5EFEC" }}>{l.title}</span>
                    <span style={{ fontSize: 12, color: "#6FA8A2" }}>{hotovo ? "Hotovo" : on ? "Právě sleduješ" : ""}</span>
                  </span>
                </Link>
              );
            })}
          </aside>
        </div>
      )}

      {materialy.length > 0 && (
        <section className="flex flex-col gap-5">
          <h2 className="display" style={{ fontWeight: 700, fontSize: 28, letterSpacing: "-0.03em" }}>Materiály ke stažení</h2>
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))" }}>
            {SKUPINY.map(([typ, nadpis]) => {
              const polozky = materialy.filter((m) => m.type === typ);
              if (polozky.length === 0) return null;
              return (
                <div key={typ} className="flex flex-col gap-3">
                  <h3 className="display flex items-center gap-2.5" style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>
                    {nadpis}
                    <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 13, fontWeight: 700, color: "#04201F", background: "#5EEAD4", borderRadius: 99, padding: "2px 8px" }}>
                      {polozky.length}
                    </span>
                  </h3>
                  {polozky.map((p) => (
                    <div key={p.id} className="glass flex items-center gap-3.5" style={{ padding: 16, borderRadius: 18 }}>
                      <span className="chip flex-none">{STITKY[p.type] ?? "SOUBOR"}</span>
                      <span className="flex min-w-0 flex-col gap-0.5">
                        <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>{p.title}</span>
                        <span style={{ fontSize: 13 }}>{p.file_path ? "Ke stažení brzy" : "Soubor se připravuje"}</span>
                      </span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {dalsiModul && (
        <div className="glass flex flex-wrap items-center gap-6" style={{ padding: "clamp(22px, 3vw, 32px)", background: "rgba(255,255,255,0.02)" }}>
          <PuzzleBadge n={dalsiModul.sort_order} size={84} active={false} />
          <div className="flex flex-col gap-1" style={{ flex: "1 1 280px" }}>
            <span className="eyebrow" style={{ color: "#8FB9B5" }}>Další dílek</span>
            <span className="display" style={{ fontWeight: 700, fontSize: 24, color: "#fff" }}>
              Modul {dalsiModul.sort_order} – {dalsiModul.title.length > 60 ? "Bonus" : dalsiModul.title}
            </span>
            {dalsiModul.description && <span style={{ fontSize: 15 }}>{dalsiModul.description}</span>}
          </div>
          <Link href={`/clenska-sekce/${dalsiModul.slug}`} className="btn btn-primary">
            {dalsiModul.price_czk && !dalsiModul.bundle_only ? `Odemknout za ${kc(dalsiModul.price_czk)}` : "Zjistit víc"}
          </Link>
        </div>
      )}
    </div>
  );
}
