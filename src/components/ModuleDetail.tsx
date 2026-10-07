import Link from "next/link";
import type { Modul } from "@/content/moduly";

// Rozbalená část modulu: body, nabídková karta, klíčové prvky, cena, tlačítko.
export default function ModuleDetail({ m }: { m: Modul }) {
  return (
    <div className="moddetail">
      <div className="flex flex-col gap-[18px]">
        <span className="eyebrow">{m.eyebrow}</span>
        {m.odrazky && (
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {m.odrazky.map((o) => (
              <li key={o} className="bullet">
                <span>{o}</span>
              </li>
            ))}
          </ul>
        )}
        {m.dlouhyPopis && <p style={{ fontSize: 17, lineHeight: 1.65, color: "#d5efec" }}>{m.dlouhyPopis}</p>}
        {m.zdarma && <p style={{ fontSize: 17, lineHeight: 1.65, color: "#d5efec" }}>{m.popis}</p>}
      </div>

      <div className="offer">
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "var(--accent)" }}>{m.stitek}</span>
        {m.cena && (
          <span className="flex items-baseline gap-3">
            {m.cenaPuvodni && <s style={{ fontSize: 16, color: "#6f9592" }}>{m.cenaPuvodni}</s>}
            <strong className="display" style={{ fontSize: 34, letterSpacing: "-0.03em" }}>{m.cena}</strong>
          </span>
        )}
        <p style={{ fontSize: 15, lineHeight: 1.65 }}>{m.zdarma ? "Ochutnávka z celého kurzu + úvodní data." : m.popis}</p>
        {m.klicove && (
          <div className="flex flex-col gap-2.5">
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#8fb9b5" }}>KLÍČOVÉ PRVKY</span>
            <div className="flex flex-wrap gap-2">
              {m.klicove.map((k) => (
                <span key={k} className="chip">{k}</span>
              ))}
            </div>
          </div>
        )}
        {m.zdarma ? (
          <Link href="/#zdarma" className="btn btn-primary" style={{ alignSelf: "flex-start", fontSize: 16 }}>
            Získat zdarma
          </Link>
        ) : m.jenVBalicku ? (
          <Link href="/kontakt" className="btn btn-primary" style={{ alignSelf: "flex-start", fontSize: 16 }}>
            Koupit celý program
          </Link>
        ) : (
          <Link href="/kontakt" className="btn btn-primary" style={{ alignSelf: "flex-start", fontSize: 16 }}>
            Objednat
          </Link>
        )}
      </div>
    </div>
  );
}
