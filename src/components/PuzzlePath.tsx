// Tvar puzzle dílku z návrhu (design/uvod.dc.html). Používá HeroPuzzle.
export const PUZZLE_D =
  "M64 44 L130 44 C138 44 142 34 134 26 C122 14 133 3 148 3 C163 3 174 14 162 26 C154 34 158 44 166 44 L256 44 A20 20 0 0 1 276 64 L276 156.9 C276 164.5 285.5 168.3 293.1 160.7 C304.5 149.3 314.9 159.8 314.9 174 C314.9 188.2 304.5 198.7 293.1 187.3 C285.5 179.7 276 183.5 276 191.1 L276 256 A20 20 0 0 1 256 276 L186.9 276 C178.5 276 174.3 265.5 182.7 257.1 C195.3 244.5 183.8 232.9 168 232.9 C152.2 232.9 140.7 244.5 153.3 257.1 C161.7 265.5 157.5 276 149.1 276 L64 276 A20 20 0 0 1 44 256 L44 154.2 C44 147 53 143.4 60.2 150.6 C71 161.4 80.9 151.5 80.9 138 C80.9 124.5 71 114.6 60.2 125.4 C53 132.6 44 129 44 121.8 L44 64 A20 20 0 0 1 64 44 Z";

export function PuzzleDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        <linearGradient id="cpzfill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2DE2CB" stopOpacity="0.32" />
          <stop offset="1" stopColor="#06282A" stopOpacity="0.88" />
        </linearGradient>
        <linearGradient id="cpztop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5EEAD4" stopOpacity="0.7" />
          <stop offset="1" stopColor="#0A5A56" stopOpacity="0.92" />
        </linearGradient>
        <radialGradient id="cpzglint" cx="0.8" cy="0.2" r="0.45">
          <stop offset="0" stopColor="#FF7A59" stopOpacity="0.45" />
          <stop offset="1" stopColor="#FF7A59" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
