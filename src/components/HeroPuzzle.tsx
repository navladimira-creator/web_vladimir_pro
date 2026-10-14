"use client";

import { useEffect, useRef } from "react";
import { PUZZLE_D, PuzzleDefs } from "./PuzzlePath";

// Dílky od spodního (Modul 5) po horní (Modul 0), hodnoty z návrhu.
const dilky = [
  { n: 5, nazev: "Bonusový modul", z0: 0, z1: 0, opacity: 0.6 },
  { n: 4, nazev: "Identita a brand", z0: 34, z1: 104, opacity: 0.68 },
  { n: 3, nazev: "Lidé", z0: 68, z1: 208, opacity: 0.76 },
  { n: 2, nazev: "Provoz", z0: 102, z1: 312, opacity: 0.84 },
  { n: 1, nazev: "Produkt", z0: 136, z1: 416, opacity: 0.92 },
  { n: 0, nazev: "reSTART", z0: 176, z1: 540, opacity: 1 },
];

const balicek = [0, 1, 2, 3, 4, 5].map((n) => dilky.find((d) => d.n === n)!);

export default function HeroPuzzle({ nazvy = {} }: { nazvy?: Record<number, string> }) {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      el.style.setProperty("--p", Math.min(1, Math.max(0, window.scrollY / 240)).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / (window.innerWidth || 1) - 0.5;
      const ny = e.clientY / (window.innerHeight || 1) - 0.5;
      el.style.setProperty("--rx", (58 - ny * 16).toFixed(2) + "deg");
      el.style.setProperty("--rz", (-36 + nx * 24).toFixed(2) + "deg");
    };
    const onLeave = () => {
      el.style.setProperty("--rx", "58deg");
      el.style.setProperty("--rz", "-36deg");
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <PuzzleDefs />
      <div ref={stage} className="pz-stage" aria-hidden="true">
        <div className="pz-ring" />
        <div className="pz-ring2" />
        <div className="pz-floatwrap">
          <div className="pz-stack">
            {dilky.map((d) => (
              <div
                key={d.n}
                className="pz-slab"
                style={{ "--z0": `${d.z0}px`, "--z1": `${d.z1}px` } as React.CSSProperties}
              >
                <div style={{ position: "absolute", inset: 0, opacity: d.opacity }}>
                  <svg className="pz-svg" viewBox="0 0 320 320">
                    <path
                      d={PUZZLE_D}
                      fill={d.n === 0 ? "url(#cpztop)" : "url(#cpzfill)"}
                      stroke={d.n === 0 ? "rgba(255,255,255,0.7)" : "rgba(94,234,212,0.6)"}
                      strokeWidth="1.5"
                    />
                    {d.n === 0 && <path d={PUZZLE_D} fill="url(#cpzglint)" />}
                  </svg>
                  <span className="pz-num" style={d.n === 0 ? { color: "rgba(255,255,255,0.32)" } : undefined}>
                    {d.n}
                  </span>
                  {d.n === 0 && (
                    <span
                      style={{
                        position: "absolute",
                        left: 236,
                        top: 72,
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: "var(--coral)",
                        boxShadow: "0 0 22px 6px var(--coral)",
                        animation: "cglint 3s ease-in-out infinite",
                      }}
                    />
                  )}
                </div>
                <span
                  className={`pz-label ${d.n === 0 ? "" : "pz-label-fade"}`}
                  style={d.n === 0 ? { borderColor: "rgba(255,255,255,0.6)" } : undefined}
                >
                  <b>Modul {d.n}</b>
                  <small>{nazvy[d.n] ?? d.nazev}</small>
                  {d.n === 0 && (
                    <span className="badge-free" style={{ alignSelf: "flex-start", marginTop: 6 }}>
                      ZDARMA
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobil: balíček karet, kterými se listuje prstem */}
      <div className="pz-deck" aria-hidden="true">
        {balicek.map((d) => (
          <div key={d.n}>
            <svg className="pz-svg" viewBox="0 0 320 320">
              <path
                d={PUZZLE_D}
                fill={d.n === 0 ? "url(#cpztop)" : "url(#cpzfill)"}
                stroke="rgba(94,234,212,0.6)"
                strokeWidth="1.5"
              />
              {d.n === 0 && <path d={PUZZLE_D} fill="url(#cpzglint)" />}
            </svg>
            <b className="display" style={{ position: "relative", fontWeight: 800, fontSize: 26 }}>Modul {d.n}</b>
            <small style={{ position: "relative", fontWeight: 700, fontSize: 15, color: "#e6fffb" }}>{nazvy[d.n] ?? d.nazev}</small>
            {d.n === 0 && (
              <span className="badge-free" style={{ position: "relative", marginTop: 6 }}>ZDARMA</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
