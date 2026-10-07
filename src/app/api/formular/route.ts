import { NextResponse } from "next/server";

// Příjem kontaktního formuláře a dotazníku ke konzultaci. Zprávu odešle přes Resend na e-mail majitele.
// Klíče jsou jen v proměnných prostředí: RESEND_API_KEY, MAIL_FROM, CONTACT_TO_EMAIL.

type Telo = Record<string, unknown>;

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const jednoRadek = (s: string) => s.replace(/[\r\n]+/g, " ");

// Jednoduchá ochrana proti zahlcení (best-effort, na serverless nemusí platit mezi instancemi).
const poslednich: Map<string, number[]> = new Map();
function prilisMnoho(ip: string) {
  const ted = Date.now();
  const okno = (poslednich.get(ip) ?? []).filter((t) => ted - t < 60 * 60 * 1000);
  okno.push(ted);
  poslednich.set(ip, okno);
  return okno.length > 5;
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const komu = process.env.CONTACT_TO_EMAIL;
  const od = process.env.MAIL_FROM;
  if (!apiKey || !komu || !od) {
    return NextResponse.json({ ok: false, chyba: "Odesílání zpráv zatím není nastavené." }, { status: 503 });
  }

  let b: Telo;
  try {
    b = (await req.json()) as Telo;
  } catch {
    return NextResponse.json({ ok: false, chyba: "Neplatný požadavek." }, { status: 400 });
  }

  // Past na roboty: skryté pole musí zůstat prázdné a formulář nesmí být odeslán okamžitě.
  const rychle = typeof b.t === "number" && Date.now() - b.t < 3000;
  if (text(b.web, 50) !== "" || rychle) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-nf-client-connection-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "?";
  if (prilisMnoho(ip)) {
    return NextResponse.json({ ok: false, chyba: "Příliš mnoho zpráv. Zkus to prosím později." }, { status: 429 });
  }

  const typ = b.typ === "konzultace" ? "konzultace" : "kontakt";
  const jmeno = jednoRadek(text(b.jmeno, 100));
  const email = jednoRadek(text(b.email, 200));
  const zprava = text(b.zprava, 4000);
  if (!jmeno || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !b.souhlas) {
    return NextResponse.json({ ok: false, chyba: "Vyplň prosím jméno, platný e-mail a souhlas." }, { status: 400 });
  }

  let telo = `Jméno: ${jmeno}\nE-mail: ${email}\n`;
  if (typ === "konzultace") {
    const podnik = jednoRadek(text(b.podnik, 150));
    const forma = b.forma === "v-podniku" ? "v podniku" : "online";
    const reseni = text(b.reseni, 4000);
    if (!podnik || !reseni) {
      return NextResponse.json({ ok: false, chyba: "Vyplň prosím název podniku a co řešíš." }, { status: 400 });
    }
    telo += `Název podniku: ${podnik}\nPreferovaná forma: ${forma}\n\nCo řeším:\n${reseni}\n`;
  } else {
    if (!zprava) {
      return NextResponse.json({ ok: false, chyba: "Napiš prosím zprávu." }, { status: 400 });
    }
    telo += `\nZpráva:\n${zprava}\n`;
  }

  const odpoved = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: od,
      to: [komu],
      reply_to: email,
      subject: typ === "konzultace" ? "Vladimír PRO: poptávka konzultace" : "Vladimír PRO: zpráva z kontaktního formuláře",
      text: telo,
    }),
  }).catch(() => null);

  if (!odpoved || !odpoved.ok) {
    console.error("[formular] Resend odmítl odeslání:", odpoved?.status);
    return NextResponse.json({ ok: false, chyba: "Zprávu se nepodařilo odeslat. Zkus to prosím znovu." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
