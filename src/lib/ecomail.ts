import "server-only";

// Ecomail se volá jen ze serveru. Klíč je jen v proměnné prostředí ECOMAIL_API_KEY.
export const SEZNAM_ZDARMA_STITEK = "modul-zdarma";

export async function pridatKontakt(args: { email: string; jmeno?: string | null; stitky: string[] }): Promise<boolean> {
  const klic = process.env.ECOMAIL_API_KEY;
  const seznam = process.env.ECOMAIL_LIST_ID;
  if (!klic || !seznam) {
    console.warn("[ecomail] Chybí ECOMAIL_API_KEY nebo ECOMAIL_LIST_ID, kontakt se nepřidává.");
    return false;
  }
  try {
    const r = await fetch(`https://api2.ecomailapp.cz/lists/${encodeURIComponent(seznam)}/subscribe`, {
      method: "POST",
      headers: { key: klic, "Content-Type": "application/json" },
      body: JSON.stringify({
        subscriber_data: { email: args.email, name: args.jmeno ?? undefined },
        tags: args.stitky,
        trigger_autoresponders: false,
        update_existing: true,
        resubscribe: false,
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!r.ok) console.error("[ecomail] Odmítnuto, stav", r.status);
    return r.ok;
  } catch (e) {
    console.error("[ecomail] Volání selhalo:", e);
    return false;
  }
}
