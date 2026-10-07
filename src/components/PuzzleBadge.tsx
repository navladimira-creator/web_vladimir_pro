import { PUZZLE_D } from "./PuzzlePath";

// Malý puzzle dílek s číslem modulu (stránka Moduly a ceny).
export default function PuzzleBadge({ n, size = 56, active = true }: { n: number; size?: number; active?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 320"
      aria-hidden="true"
      style={{ display: "block", overflow: "visible", filter: active ? "drop-shadow(0 0 14px rgba(45,226,203,0.45))" : undefined }}
    >
      <defs>
        <linearGradient id="kon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7FF5E6" />
          <stop offset="0.55" stopColor="#2DE2CB" />
          <stop offset="1" stopColor="#0E8C82" />
        </linearGradient>
        <linearGradient id="koff" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path
        d={PUZZLE_D}
        fill={active ? "url(#kon)" : "url(#koff)"}
        stroke={active ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)"}
        strokeWidth="4"
      />
      <text
        x="160"
        y="186"
        textAnchor="middle"
        fontFamily="Sora, sans-serif"
        fontWeight="800"
        fontSize="104"
        fill={active ? "#04201F" : "rgba(255,255,255,0.7)"}
      >
        {n}
      </text>
    </svg>
  );
}
