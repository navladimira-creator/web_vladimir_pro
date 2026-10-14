"use client";

import { useEffect, useRef } from "react";

// 3D kniha, která při posouvání „zamrzá“ (led a rampouchy). Funguje i v Safari, bez nových CSS funkcí.
export default function BookIce({ nadpis, autor }: { nadpis: string; autor: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = clamp((vh - r.top) / (vh + r.height));
      el.style.setProperty("--ice", clamp((p - 0.3) / 0.28).toFixed(3));
      el.style.setProperty("--icicle", clamp((p - 0.42) / 0.2).toFixed(3));
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

  const rampouchy: [number, number][] = [[12, 22], [24, 34], [37, 16], [52, 40], [66, 20], [79, 30], [90, 14]];

  return (
    <div ref={root} className="book-wrap">
      <div className="book" role="img" aria-label={`Obálka knihy ${nadpis}`}>
        <span style={{ position: "relative", zIndex: 2, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "#b9fff5" }}>
          VLADIMÍR PRO
        </span>
        <span className="display" style={{ position: "relative", zIndex: 2, fontWeight: 800, fontSize: 32, lineHeight: 1.02, letterSpacing: "-0.03em" }}>
          Jak se neutopit v&nbsp;gastru
        </span>
        <span style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: "#cffaf3" }}>{autor}</span>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--coral)", boxShadow: "0 0 12px var(--coral)" }} />
        </span>
        <span className="book-ice" aria-hidden="true" />
        <span className="book-icicles" aria-hidden="true">
          {rampouchy.map(([l, h]) => (
            <i key={l} style={{ left: `${l}%`, height: h }} />
          ))}
        </span>
      </div>
    </div>
  );
}
