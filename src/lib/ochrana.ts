import "server-only";
import { createHash } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

const jeProdukce = process.env.NODE_ENV === "production";

export function klientIp(h: Headers): string {
  return (
    h.get("x-nf-client-connection-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "neznama"
  );
}

// Do databáze se neukládá IP ani e-mail, jen jejich otisk.
export function otisk(hodnota: string): string {
  const sul = process.env.RATE_LIMIT_SALT ?? "vladimir-pro";
  return createHash("sha256").update(`${sul}:${hodnota.toLowerCase()}`).digest("hex");
}

// Vrací true, když je odeslání povolené. Při chybě databáze odmítne (bezpečnější varianta).
export async function povolenoOdeslani(bucket: string, klic: string, limit: number, okno = "1 hour"): Promise<boolean> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    if (!jeProdukce) return true;
    console.error("[ochrana] Chybí nastavení Supabase pro omezení počtu odeslání.");
    return false;
  }
  try {
    const { data, error } = await createAdminClient().rpc("rate_limit_hit", {
      p_bucket: bucket,
      p_key: otisk(klic),
      p_limit: limit,
      p_window: okno,
    });
    if (error) throw error;
    return data === true;
  } catch (e) {
    console.error("[ochrana] Omezení počtu odeslání selhalo:", e);
    return false;
  }
}

// Ověření Cloudflare Turnstile na serveru. Bez nastaveného klíče se v ostrém provozu formulář nepustí.
export async function overTurnstile(token: unknown, ip: string): Promise<boolean> {
  const tajny = process.env.TURNSTILE_SECRET_KEY;
  if (!tajny) {
    if (!jeProdukce) return true;
    console.error("[ochrana] Chybí TURNSTILE_SECRET_KEY.");
    return false;
  }
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) return false;
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: tajny, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(5000),
    });
    const j = (await r.json()) as { success?: boolean };
    return j.success === true;
  } catch (e) {
    console.error("[ochrana] Ověření Turnstile selhalo:", e);
    return false;
  }
}
