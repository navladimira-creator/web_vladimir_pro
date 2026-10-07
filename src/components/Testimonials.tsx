"use client";

import { useState } from "react";
import { reference } from "@/content/moduly";

// Karusel referencí: jedna naráz, s fotkou a tlačítkem „Číst celé“.
export default function Testimonials() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const n = reference.length;
  const go = (k: number) => {
    setI((k + n) % n);
    setOpen(false);
  };
  const r = reference[i];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <h2 className="h2" style={{ fontSize: "clamp(30px, 4vw, 46px)", maxWidth: "18ch" }}>
          Co říkají zaměstnanci mých kaváren o systému
        </h2>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => go(i - 1)}
            aria-label="Předchozí reference"
            className="btn"
            style={{ width: 52, height: 52, padding: 0, justifyContent: "center", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 20 }}
          >
            ←
          </button>
          <span className="display" style={{ fontWeight: 600, fontSize: 15, color: "#e6fffb", minWidth: 48, textAlign: "center" }}>
            {i + 1} / {n}
          </span>
          <button
            type="button"
            onClick={() => go(i + 1)}
            aria-label="Další reference"
            className="btn btn-primary"
            style={{ width: 52, height: 52, padding: 0, justifyContent: "center", fontSize: 20 }}
          >
            →
          </button>
        </div>
      </div>

      <figure className="glass tgrid" style={{ padding: "clamp(24px, 4vw, 48px)" }} aria-live="polite">
        <div
          className="photo"
          style={{ aspectRatio: "1 / 1", borderRadius: 24, maxWidth: 360, border: "1px solid rgba(94,234,212,0.3)" }}
        >
          [Foto: {r.jmeno}]
        </div>
        <div className="flex flex-col gap-5">
          <span aria-hidden="true" className="display" style={{ fontWeight: 800, fontSize: 72, lineHeight: 0.5, color: "var(--accent)" }}>
            “
          </span>
          <blockquote
            className="tq"
            style={{ fontSize: 20, lineHeight: 1.65, color: "#d5efec", WebkitLineClamp: open ? "unset" : 6 }}
          >
            {r.text}
          </blockquote>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            style={{ alignSelf: "flex-start", font: "inherit", fontWeight: 700, fontSize: 15, color: "var(--accent)", background: "none", border: 0, padding: "10px 0", minHeight: 44, cursor: "pointer" }}
          >
            {open ? "Sbalit" : "Číst celé"}
          </button>
          <figcaption className="flex flex-col">
            <span className="display" style={{ fontWeight: 700, fontSize: 20 }}>{r.jmeno}</span>
            <span style={{ fontSize: 15 }}>{r.role}</span>
          </figcaption>
        </div>
      </figure>

      <div className="mt-[18px] flex justify-center gap-1">
        {reference.map((x, k) => (
          <button
            key={x.jmeno}
            type="button"
            onClick={() => go(k)}
            aria-label={`Reference ${k + 1}`}
            aria-current={k === i}
            style={{ background: "none", border: 0, padding: "17px 4px", cursor: "pointer", display: "inline-flex", alignItems: "center" }}
          >
            <span
              style={{
                display: "block",
                height: 10,
                borderRadius: 99,
                width: k === i ? 32 : 10,
                background: k === i ? "var(--accent)" : "rgba(255,255,255,0.25)",
                transition: "width 0.3s, background 0.3s",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
