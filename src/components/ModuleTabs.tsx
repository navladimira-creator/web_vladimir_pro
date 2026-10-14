"use client";

import Link from "next/link";
import { useState } from "react";
import type { Modul } from "@/content/moduly";
import PuzzleBadge from "./PuzzleBadge";

// Záložky „Vyber si dílek“ a panel s popisem vybraného modulu.
export default function ModuleTabs({ moduly }: { moduly: Modul[] }) {
  const vychozi = Math.max(0, moduly.findIndex((m) => m.n === 1));
  const [sel, setSel] = useState(vychozi);
  const m = moduly[sel];
  if (!m) return null;

  const maTextModulu = m.odrazky.length > 0 || !!m.dlouhyPopis;

  return (
    <div className="flex flex-col gap-6">
      <div className="mod-tabs" role="group" aria-label="Výběr modulu">
        {moduly.map((x, i) => {
          const on = i === sel;
          return (
            <button
              key={x.slug}
              type="button"
              className="mod-tab"
              aria-pressed={on}
              onClick={() => setSel(i)}
              style={{
                borderColor: on ? "rgba(94,234,212,0.6)" : "rgba(255,255,255,0.1)",
                background: on ? "rgba(45,226,203,0.14)" : "rgba(255,255,255,0.03)",
              }}
            >
              <span style={{ opacity: on ? 1 : 0.45, transition: "opacity .3s" }}>
                <PuzzleBadge n={x.n} size={56} active={on} />
              </span>
              <span className="flex flex-col items-center gap-0.5 text-center">
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-light)" }}>Modul {x.n}</span>
                <span className="display" style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>{x.nazev}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="glass mod-panel" key={m.slug} aria-live="polite">
        <div className="flex flex-col gap-[18px]">
          <div className="flex items-center gap-3.5">
            <PuzzleBadge n={m.n} size={44} />
            <div className="flex flex-col">
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)" }}>Modul {m.n}</span>
              <h3 className="display" style={{ fontWeight: 800, fontSize: "clamp(26px, 3vw, 36px)", letterSpacing: "-0.03em" }}>
                {m.nazev}
              </h3>
            </div>
          </div>
          {m.eyebrow && <span className="eyebrow" style={{ fontWeight: 700, letterSpacing: "0.1em" }}>{m.eyebrow}</span>}
          {m.odrazky.length > 0 && (
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {m.odrazky.map((o) => (
                <li key={o} className="bullet"><span>{o}</span></li>
              ))}
            </ul>
          )}
          {m.dlouhyPopis && <p style={{ fontSize: 17, lineHeight: 1.65, color: "#d5efec" }}>{m.dlouhyPopis}</p>}
          {(m.zdarma || !maTextModulu) && (
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "#d5efec" }}>
              {m.teaser}
              {m.zdarma && m.popis ? ` ${m.popis}` : ""}
            </p>
          )}
          {m.souhrn && (
            <p style={{ fontSize: 15, lineHeight: 1.6 }}>
              <strong style={{ color: "#fff" }}>V modulu najdeš:</strong> {m.souhrn}
            </p>
          )}
        </div>

        <div className="offer" style={{ alignSelf: "start" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "var(--accent)" }}>{m.stitek}</span>
          {m.cena && (
            <span className="flex items-baseline gap-3">
              {m.cenaPuvodni && <s style={{ fontSize: 16, color: "#6f9592" }}>{m.cenaPuvodni}</s>}
              <strong className="display" style={{ fontSize: 34, letterSpacing: "-0.03em" }}>{m.cena}</strong>
            </span>
          )}
          <p style={{ fontSize: 15, lineHeight: 1.65 }}>
            {m.zdarma ? "Stačí jméno a e-mail. Přístup ti přijde e-mailem hned po registraci." : m.popis}
          </p>
          {m.klicove.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#8fb9b5" }}>KLÍČOVÉ PRVKY</span>
              <div className="flex flex-wrap gap-2">
                {m.klicove.map((k) => (
                  <span key={k} className="chip">{k}</span>
                ))}
              </div>
            </div>
          )}
          <Link
            href={m.zdarma ? "/#zdarma" : "/kontakt"}
            className="btn btn-primary"
            style={{ alignSelf: "flex-start", fontSize: 16 }}
          >
            {m.zdarma ? "Získat zdarma" : m.jenVBalicku ? "Koupit celý program" : "Objednat"}
          </Link>
        </div>
      </div>
    </div>
  );
}
