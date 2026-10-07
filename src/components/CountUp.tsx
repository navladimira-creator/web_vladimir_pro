"use client";

import { useEffect, useRef } from "react";

// Číslo, které se načte od nuly. Čtečky a vyhledávače vždy vidí konečnou hodnotu.
export default function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const out = num.current;
    if (!el || !out) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    let raf = 0;
    out.textContent = "0";
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 2400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        out.textContent = String(Math.round(to * (1 - Math.pow(1 - t, 4))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={root}>
      <span ref={num} aria-hidden="true">{to}</span>
      <span className="sr-only-c">{to}</span>
      {suffix}
    </span>
  );
}
