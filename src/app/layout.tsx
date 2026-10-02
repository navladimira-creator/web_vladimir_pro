import type { Metadata } from "next";
import { Bricolage_Grotesque, Proza_Libre } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
});

const proza = Proza_Libre({
  variable: "--font-proza",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vladimír PRO",
  description:
    "Vzdělávací systém pro majitele kaváren a malých gastro podniků.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" className={`${bricolage.variable} ${proza.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
