import Link from "next/link";
import PuzzleBadge from "@/components/PuzzleBadge";
import { getProfile, requireUser } from "@/lib/auth";
import { kc, nactiPrehled, procenta, type ModulSPristupem } from "@/lib/clenska";

const POPISKY: Record<ModulSPristupem["stav"], string> = { odemceno: "ODEMČENO", zamceno: "ZAMČENO", vyprselo: "PLATNOST VYPRŠELA" };

// Nástěnka (design/clenska-nastenka.dc.html): pokračování, moduly se zámky, nabídka All in One.
export default async function ClenskaSekcePage() {
  const user = await requireUser();
  const profil = await getProfile();
  const { moduly, lekce, hotoveIds } = await nactiPrehled(user.id);

  const odemcene = moduly.filter((m) => m.stav === "odemceno");
  const vsechnoMa = moduly.length > 0 && odemcene.length === moduly.length;

  // Pokračovat: první neprojité video v prvním odemčeném modulu, kde ještě něco zbývá.
  let pokracovat: { modul: ModulSPristupem; lekceId: string; nazev: string } | null = null;
  for (const m of odemcene) {
    const dalsi = lekce.find((l) => l.module_id === m.id && !hotoveIds.has(l.id));
    if (dalsi) {
      pokracovat = { modul: m, lekceId: dalsi.id, nazev: dalsi.title };
      break;
    }
  }

  return (
    <div className="wrap flex flex-col gap-10" style={{ paddingTop: 40, paddingBottom: 96 }}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-2.5">
          <h1 className="display" style={{ fontWeight: 800, fontSize: "clamp(40px, 5.5vw, 68px)", lineHeight: 0.95, letterSpacing: "-0.05em" }}>
            Ahoj{profil?.full_name ? `, ${profil.full_name}` : ""}.
          </h1>
          <p style={{ fontSize: 18 }}>Pokračuj tam, kde jsi skončil.</p>
        </div>
        <div className="glass flex flex-wrap items-center gap-5" style={{ padding: "16px 22px" }}>
          <div className="flex items-center" aria-hidden="true">
            {moduly.map((m, i) => (
              <span key={m.id} style={{ marginLeft: i === 0 ? 0 : -14 }}>
                <PuzzleBadge n={m.sort_order} size={56} active={m.stav === "odemceno"} />
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="display" style={{ fontWeight: 800, fontSize: 24, color: "#fff" }}>
              {odemcene.length} z {moduly.length}
            </span>
            <span style={{ fontSize: 14 }}>dílků systému poskládáno</span>
          </div>
        </div>
      </div>

      {pokracovat && (
        <Link
          href={`/clenska-sekce/${pokracovat.modul.slug}?lekce=${pokracovat.lekceId}`}
          className="glass grid items-center gap-7 no-underline"
          style={{ padding: "clamp(24px, 4vw, 44px)", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", borderColor: "rgba(94,234,212,0.4)", color: "inherit" }}
        >
          <div className="flex items-center gap-6">
            <PuzzleBadge n={pokracovat.modul.sort_order} size={110} />
            <div className="flex flex-col gap-1.5">
              <span className="eyebrow">Pokračovat · Modul {pokracovat.modul.sort_order} · {pokracovat.modul.title}</span>
              <span className="display" style={{ fontWeight: 700, fontSize: "clamp(22px, 2.4vw, 30px)", lineHeight: 1.2, color: "#fff" }}>
                {pokracovat.nazev}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between" style={{ fontSize: 15 }}>
              <span>Hotovo {pokracovat.modul.hotovo} z {pokracovat.modul.lekci} videí</span>
              <strong style={{ color: "#fff" }}>{procenta(pokracovat.modul.hotovo, pokracovat.modul.lekci)} %</strong>
            </div>
            <div className="k-bar" style={{ height: 10 }}>
              <span style={{ width: `${procenta(pokracovat.modul.hotovo, pokracovat.modul.lekci)}%` }} />
            </div>
            <span className="btn btn-primary self-start">
              Pokračovat <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>
      )}

      <section className="flex flex-col gap-[18px]">
        <h2 className="display" style={{ fontWeight: 700, fontSize: 28, letterSpacing: "-0.03em" }}>Moje moduly</h2>
        <div className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))" }}>
          {moduly.map((m) => {
            const otevrene = m.stav === "odemceno";
            const pct = procenta(m.hotovo, m.lekci);
            const nazev = m.title.length > 60 ? `Modul ${m.sort_order}` : m.title;
            const obsah = (
              <>
                <div className="flex items-start justify-between">
                  <PuzzleBadge n={m.sort_order} size={84} active={otevrene} />
                  {m.is_free ? (
                    <span className="badge-free">ZDARMA</span>
                  ) : (
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        padding: "6px 10px",
                        borderRadius: 999,
                        ...(otevrene
                          ? { color: "#04201F", background: "#5EEAD4" }
                          : { color: "#8FB9B5", border: "1px solid rgba(255,255,255,0.14)" }),
                      }}
                    >
                      {POPISKY[m.stav]}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span style={{ fontSize: 13, fontWeight: 600, color: otevrene ? "var(--accent-light)" : "#6FA8A2" }}>Modul {m.sort_order}</span>
                  <span className="display" style={{ fontWeight: 700, fontSize: 24, color: otevrene ? "#fff" : "#D5EFEC" }}>{nazev}</span>
                </div>
                {otevrene ? (
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex justify-between" style={{ fontSize: 14 }}>
                      <span>{m.hotovo} z {m.lekci} videí</span>
                      <strong style={{ color: "#fff" }}>{pct} %</strong>
                    </div>
                    <div className="k-bar"><span style={{ width: `${pct}%` }} /></div>
                  </div>
                ) : (
                  <div className="mt-auto flex items-center justify-between gap-3">
                    {m.bundle_only ? (
                      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", color: "#CFFAF3" }}>JEN V ALL IN ONE</span>
                    ) : m.price_czk ? (
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
                        {m.original_price_czk && <s style={{ color: "#6F9592", fontWeight: 400, fontSize: 13, marginRight: 8 }}>{kc(m.original_price_czk)}</s>}
                        {kc(m.price_czk)}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span style={{ fontWeight: 700, fontSize: 15, color: "var(--accent-light)" }}>
                      {m.stav === "vyprselo" ? "Prodloužit →" : m.bundle_only ? "Zjistit víc →" : "Odemknout →"}
                    </span>
                  </div>
                )}
              </>
            );
            return (
              <Link
                key={m.id}
                href={`/clenska-sekce/${m.slug}`}
                className="glass flex flex-col gap-3.5 no-underline"
                style={{
                  padding: 26,
                  minHeight: 260,
                  color: "inherit",
                  ...(otevrene ? { borderColor: "rgba(94,234,212,0.35)" } : { background: "rgba(255,255,255,0.02)" }),
                }}
              >
                {obsah}
              </Link>
            );
          })}
        </div>
      </section>

      {!vsechnoMa && (
        <div
          className="relative flex flex-wrap items-center justify-between gap-6 overflow-hidden"
          style={{ borderRadius: 28, padding: "clamp(26px, 4vw, 40px)", background: "linear-gradient(120deg, #0B6F67, #0E8C82 45%, #13A99A)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 50px 90px -40px rgba(45,226,203,0.6)" }}
        >
          <div className="relative flex max-w-[640px] flex-col gap-2">
            <span className="display" style={{ fontWeight: 700, fontSize: "clamp(24px, 2.6vw, 32px)", lineHeight: 1.15, color: "#fff" }}>Poskládej celý systém najednou</span>
            <span style={{ fontSize: 16, color: "#E6FFFB" }}>
              All in One – všechny moduly 0–5 za <strong style={{ color: "#fff" }}>24 990 Kč</strong> místo 51 960 Kč.
            </span>
          </div>
          <Link href="/kontakt" className="btn btn-white relative">Chci All in One</Link>
        </div>
      )}
    </div>
  );
}
