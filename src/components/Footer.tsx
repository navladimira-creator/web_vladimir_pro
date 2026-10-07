import Link from "next/link";

export default function Footer() {
  const odkaz = { color: "#7fa9a5" };
  return (
    <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div
        className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-6"
        style={{ padding: "32px 24px", fontSize: 14, color: "#7fa9a5" }}
      >
        <span>© {new Date().getFullYear()} inspiracevladimir.cz</span>
        <div className="flex flex-wrap gap-6">
          <Link href="/obchodni-podminky" style={odkaz}>Obchodní podmínky</Link>
          <Link href="/ochrana-osobnich-udaju" style={odkaz}>Ochrana osobních údajů</Link>
          <Link href="/kontakt" style={odkaz}>Kontakt</Link>
        </div>
      </div>
    </footer>
  );
}
