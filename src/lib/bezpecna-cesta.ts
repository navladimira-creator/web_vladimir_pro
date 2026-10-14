// Přesměrování po přihlášení smí vést jen na stránku našeho webu (žádný otevřený redirect přes parametr v adrese).
export function bezpecnaCesta(next: string | null | undefined, vychozi = "/clenska-sekce"): string {
  if (!next || typeof next !== "string") return vychozi;
  if (!next.startsWith("/") || next.startsWith("//") || next.includes("\\")) return vychozi;
  if (/[\u0000-\u001f\u007f]/.test(next)) return vychozi;
  try {
    const u = new URL(next, "http://lokalni.invalid");
    if (u.origin !== "http://lokalni.invalid") return vychozi;
    return u.pathname + u.search;
  } catch {
    return vychozi;
  }
}
