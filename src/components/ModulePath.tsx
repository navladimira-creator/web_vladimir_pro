"use client";

import { useEffect, useRef, useState } from "react";
import type { Modul } from "@/content/moduly";
import ModuleDetail from "./ModuleDetail";
import Reveal from "./Reveal";

// Cesta modulů 0 → 5: kliknutím se modul rozbalí, svítící čára se při posouvání „nabíjí“.
export default function ModulePath({ moduly }: { moduly: Modul[] }) {
  const [open, setOpen] = useState(-1);
  const path = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = path.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.85;
      const end = vh * 0.25;
      const total = r.height + (start - end);
      const done = start - r.top;
      el.style.setProperty("--fill", Math.min(1, Math.max(0, done / total)).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={path} className="path">
      <div className="path-line" aria-hidden="true">
        <div className="path-fill" />
      </div>

      {moduly.map((m) => {
        const jeOtevreny = open === m.n;
        return (
          <Reveal key={m.n} style={{ position: "relative" }}>
            <span className="path-node" aria-hidden="true">{m.n}</span>
            <div className="glass overflow-hidden" style={m.n === 0 ? { borderColor: "rgba(94,234,212,0.4)" } : undefined}>
              <h3 className="m-0">
                <button
                  type="button"
                  className="modbtn"
                  aria-expanded={jeOtevreny}
                  aria-controls={`modul-${m.n}`}
                  onClick={() => setOpen(jeOtevreny ? -1 : m.n)}
                >
                  <span className="flex min-w-[200px] flex-col gap-1.5">
                    <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--accent)" }}>
                      Modul {m.n}
                    </span>
                    <span className="display" style={{ fontWeight: 700, fontSize: 24 }}>{m.nazev}</span>
                  </span>
                  <span style={{ flex: "1 1 260px", fontSize: 15, lineHeight: 1.6 }}>{m.teaser}</span>
                  <span className="ml-auto flex items-center gap-[18px]">
                    {m.zdarma && <span className="badge-free" style={{ fontSize: 12, padding: "7px 12px" }}>ZDARMA</span>}
                    {m.cena && (
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
                        <s style={{ color: "#6f9592", fontWeight: 400, fontSize: 14 }}>{m.cenaPuvodni}</s>{" "}
                        {m.cena}
                      </span>
                    )}
                    {m.jenVBalicku && (
                      <span className="chip" style={{ letterSpacing: "0.08em", borderColor: "rgba(94,234,212,0.4)" }}>
                        JEN V ALL IN ONE
                      </span>
                    )}
                    <span
                      aria-hidden="true"
                      className="chev"
                      style={{ transform: `rotate(${jeOtevreny ? 180 : 0}deg)` }}
                    >
                      ⌄
                    </span>
                  </span>
                </button>
              </h3>
              {jeOtevreny && (
                <div id={`modul-${m.n}`} role="region" aria-label={`Modul ${m.n}: ${m.nazev}`}>
                  <ModuleDetail m={m} />
                </div>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
