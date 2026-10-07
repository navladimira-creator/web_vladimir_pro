"use client";

import { useEffect, useRef } from "react";

// Jemná záře za kurzorem (jen na zařízeních s myší).
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" style={{ transform: "translate(-999px,-999px)" }} />;
}
