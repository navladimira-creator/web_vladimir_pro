import type { NextConfig } from "next";

// Staré adresy z Miowebu přesměrované (301) na nové stránky.
const stareAdresy: [string, string][] = [
  ["/jednotlive-moduly", "/moduly"],
  ["/eshop", "/moduly"],
  ["/nastenka", "/clenska-sekce"],
  ["/rezervace-konzultace", "/konzultace"],
  // /kontakt a /prihlaseni mají stejnou adresu i na novém webu (lomítko na konci řeší Next.js)
];

// Základní bezpečnostní hlavičky pro všechny stránky. Přísná CSP přibude před spuštěním (milník 6),
// až budou známé všechny služby (Bunny, Stripe...). Zatím jen zákaz vkládání webu do cizích stránek.
const hlavicky = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
];

const nextConfig: NextConfig = {
  // Pracovní mezipaměť sestavení by obsahovala hodnoty klíčů; Netlify ji pak (právem) označí jako únik.
  // Na výsledný web to nemá vliv, jen sestavení může být o něco pomalejší.
  experimental: { turbopackFileSystemCacheForBuild: false },
  async headers() {
    return [{ source: "/:path*", headers: hlavicky }];
  },
  async redirects() {
    return stareAdresy.map(([from, to]) => ({ source: from, destination: to, statusCode: 301 }));
  },
};

export default nextConfig;
