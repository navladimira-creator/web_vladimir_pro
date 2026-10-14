"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { bezpecnaCesta } from "@/lib/bezpecna-cesta";
import { pridatKontakt, SEZNAM_ZDARMA_STITEK } from "@/lib/ecomail";

const POVOLENE_TYPY = ["email", "magiclink", "signup"] as const;
type Typ = (typeof POVOLENE_TYPY)[number];

// Po ověření e-mailu přidá kontakt do Ecomailu, ale jen s uděleným souhlasem s marketingem.
async function synchronizovatEcomail(userId: string) {
  try {
    const admin = createAdminClient();
    const { data: p } = await admin
      .from("profiles")
      .select("email, full_name, marketing_consent, ecomail_synced_at")
      .eq("id", userId)
      .maybeSingle();
    if (!p || !p.marketing_consent || p.ecomail_synced_at) return;
    const ok = await pridatKontakt({ email: p.email, jmeno: p.full_name, stitky: [SEZNAM_ZDARMA_STITEK] });
    if (ok) await admin.from("profiles").update({ ecomail_synced_at: new Date().toISOString() }).eq("id", userId);
  } catch (e) {
    console.error("[ecomail] Synchronizace po přihlášení selhala:", e);
  }
}

// Odkaz z e-mailu se spotřebuje až kliknutím na tlačítko (ne samotným otevřením odkazu),
// aby ho nespálila ochrana schránky, která odkazy předem otevírá.
export async function potvrdit(formData: FormData) {
  const tokenHash = formData.get("token_hash");
  const typ = formData.get("type");
  const next = bezpecnaCesta(typeof formData.get("next") === "string" ? (formData.get("next") as string) : null);

  if (
    typeof tokenHash !== "string" ||
    tokenHash.length === 0 ||
    tokenHash.length > 512 ||
    typeof typ !== "string" ||
    !(POVOLENE_TYPY as readonly string[]).includes(typ)
  ) {
    redirect("/prihlaseni?chyba=odkaz");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({ type: typ as Typ, token_hash: tokenHash });
  if (error || !data.user) redirect("/prihlaseni?chyba=odkaz");

  await synchronizovatEcomail(data.user.id);
  redirect(next);
}
