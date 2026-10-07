import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vladimír PRO – systém pro majitele kaváren a gastro podniků",
    template: "%s | Vladimír PRO",
  },
  description:
    "Systém z praxe pro majitele kaváren a malých gastro podniků: produkt, provoz, lidé, identita a brand. Know-how vybudované a otestované na vlastních provozech.",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Vladimír PRO",
    title: "Vladimír PRO – systém pro majitele kaváren a gastro podniků",
    description:
      "Systém z praxe pro majitele kaváren a malých gastro podniků. Vyzkoušej ochutnávku zdarma.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" className={`${sora.variable} ${manrope.variable}`}>
      <body>
        <CursorGlow />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
