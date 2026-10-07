import type { NextConfig } from "next";

// Staré adresy z Miowebu přesměrované (301) na nové stránky.
const stareAdresy: [string, string][] = [
  ["/jednotlive-moduly", "/moduly"],
  ["/eshop", "/moduly"],
  ["/nastenka", "/clenska-sekce"],
  ["/rezervace-konzultace", "/konzultace"],
  // /kontakt a /prihlaseni mají stejnou adresu i na novém webu (lomítko na konci řeší Next.js)
];

const nextConfig: NextConfig = {
  async redirects() {
    return stareAdresy.map(([from, to]) => ({ source: from, destination: to, statusCode: 301 }));
  },
};

export default nextConfig;
