import Link from "next/link";
import { allInOne } from "@/content/moduly";
import Reveal from "./Reveal";

export default function AllInOneCard() {
  return (
    <Reveal>
      <div
        style={{
          position: "relative",
          borderRadius: 28,
          padding: "clamp(28px, 4vw, 48px)",
          overflow: "hidden",
          background: "linear-gradient(120deg, #0B6F67, #0E8C82 45%, #13A99A)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 50px 90px -40px rgba(45,226,203,0.6)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 28,
          flexWrap: "wrap",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: -80,
            top: -120,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.45), rgba(255,255,255,0) 60%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10, maxWidth: 660 }}>
          <span
            style={{
              alignSelf: "flex-start",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#04201F",
              background: "#fff",
              padding: "6px 12px",
              borderRadius: 999,
            }}
          >
            {allInOne.stitek}
          </span>
          <span className="display" style={{ fontWeight: 700, fontSize: "clamp(26px, 3vw, 36px)", lineHeight: 1.1 }}>
            {allInOne.nazev}
          </span>
          <span style={{ fontSize: 16, lineHeight: 1.6, color: "#e6fffb" }}>{allInOne.popisKratky}</span>
          <span style={{ fontSize: 17, color: "#e6fffb" }}>
            <s style={{ color: "#a9dcd6" }}>{allInOne.cenaPuvodni}</s>{" "}
            <strong className="display" style={{ fontSize: 34, letterSpacing: "-0.03em" }}>
              {allInOne.cena}
            </strong>
          </span>
        </div>
        <Link href="/kontakt" className="btn btn-white" style={{ position: "relative", minHeight: 54 }}>
          {allInOne.tlacitko}
        </Link>
      </div>
    </Reveal>
  );
}
