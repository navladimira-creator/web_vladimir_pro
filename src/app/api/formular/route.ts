import { NextResponse } from "next/server";
import { klientIp, overTurnstile, povolenoOdeslani } from "@/lib/ochrana";
import { kontaktSchema, konzultaceSchema } from "@/lib/validace";

// Příjem kontaktního formuláře a dotazníku ke konzultaci. Zprávu odešle přes Resend na pevný e-mail majitele.
// Klíče jsou jen v proměnných prostředí: RESEND_API_KEY, MAIL_FROM, CONTACT_TO_EMAIL.

type Telo = Record<string, unknown>;
const odpoved = (ok: boolean, chyba: string | undefined, status: number) =>
  NextResponse.json(ok ? { ok: true } : { ok: false, chyba }, { status });

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const komu = process.env.CONTACT_TO_EMAIL;
  const od = process.env.MAIL_FROM;
  if (!apiKey || !komu || !od) return odpoved(false, "Odesílání zpráv zatím není nastavené.", 503);

  let b: Telo;
  try {
    b = (await req.json()) as Telo;
  } catch {
    return odpoved(false, "Neplatný požadavek.", 400);
  }

  // Past na roboty: vyplněné skryté pole nebo odeslání dřív než za 3 s. Tváříme se, že vše proběhlo.
  const rychle = typeof b.t === "number" && Date.now() - b.t < 3000;
  if ((typeof b.web === "string" && b.web !== "") || rychle) return odpoved(true, undefined, 200);

  const ip = klientIp(req.headers);
  if (!(await overTurnstile(b["cf-turnstile-response"], ip))) {
    return odpoved(false, "Ověření, že nejsi robot, se nepodařilo. Zkus to prosím znovu.", 400);
  }
  if (!(await povolenoOdeslani("formular-ip", ip, 5))) {
    return odpoved(false, "Příliš mnoho zpráv. Zkus to prosím později.", 429);
  }

  const vstup = { ...b, souhlas: b.souhlas === true ? "on" : undefined };
  let telo: string;
  let predmet: string;
  let email: string;

  if (b.typ === "konzultace") {
    const p = konzultaceSchema.safeParse(vstup);
    if (!p.success) return odpoved(false, "Vyplň prosím všechna pole a souhlas se zpracováním údajů.", 400);
    const d = p.data;
    email = d.email;
    predmet = "Vladimír PRO: poptávka konzultace";
    telo = `Jméno: ${d.jmeno}\nE-mail: ${d.email}\nNázev podniku: ${d.podnik}\nPreferovaná forma: ${d.forma === "v-podniku" ? "v podniku" : "online"}\n\nCo řeším:\n${d.reseni}\n`;
  } else {
    const p = kontaktSchema.safeParse(vstup);
    if (!p.success) return odpoved(false, "Vyplň prosím jméno, platný e-mail, zprávu a souhlas.", 400);
    const d = p.data;
    email = d.email;
    predmet = "Vladimír PRO: zpráva z kontaktního formuláře";
    telo = `Jméno: ${d.jmeno}\nE-mail: ${d.email}\n\nZpráva:\n${d.zprava}\n`;
  }

  // Do hlaviček e-mailu (předmět, odesílatel, adresát) nejde žádný text od uživatele kromě ověřeného e-mailu pro odpověď.
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: od, to: [komu], reply_to: email, subject: predmet, text: telo }),
    signal: AbortSignal.timeout(8000),
  }).catch(() => null);

  if (!r || !r.ok) {
    console.error("[formular] Resend odmítl odeslání:", r?.status);
    return odpoved(false, "Zprávu se nepodařilo odeslat. Zkus to prosím znovu.", 502);
  }
  return odpoved(true, undefined, 200);
}
