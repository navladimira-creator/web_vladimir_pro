"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string; callback?: (t: string) => void; theme?: string; language?: string }) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

// Cloudflare Turnstile: ochrana formuláře před roboty. Token se vloží do skrytého pole
// "cf-turnstile-response", které server ověří. Bez klíče se nezobrazí nic.
export default function Turnstile({ resetSignal }: { resetSignal?: unknown }) {
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    if (!sitekey) return;
    let zrusit = false;
    const t = setInterval(() => {
      if (zrusit || !box.current || !window.turnstile || widget.current) return;
      widget.current = window.turnstile.render(box.current, { sitekey, theme: "dark", language: "cs" });
      clearInterval(t);
    }, 150);
    return () => {
      zrusit = true;
      clearInterval(t);
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, [sitekey]);

  // Po každém výsledku odeslání (např. chybě) se token musí získat znovu, protože je jednorázový.
  useEffect(() => {
    if (widget.current && window.turnstile) window.turnstile.reset(widget.current);
  }, [resetSignal]);

  if (!sitekey) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="lazyOnload" />
      <div ref={box} />
    </>
  );
}
