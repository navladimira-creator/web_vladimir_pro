"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { klientIp, overTurnstile, povolenoOdeslani } from "@/lib/ochrana";
import { ZNENI_OZNAMENI } from "@/lib/oznameni";
import { emailSchema, prihlaseniSchema, registraceSchema } from "@/lib/validace";

export type Stav = { ok: boolean; chyba?: string };

const OBECNA_CHYBA = "Odeslání se nepodařilo. Zkus to prosím za chvíli.";
const PRILIS_MNOHO = "Příliš mnoho pokusů. Zkus to prosím později.";

const text = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" ? v : undefined;
};

// Registrace z úvodní stránky: pošle e-mail s odkazem. Profil, přístup k reSTARTu a základ pro zasílání novinek
// (oprávněný zájem + verze oznámení) uloží databáze (trigger handle_new_user), do Ecomailu se kontakt dostane až po ověření e-mailu.
export async function registrovat(_prev: Stav, fd: FormData): Promise<Stav> {
  // Skrytá past na roboty: tvářit se, že vše proběhlo
  if ((text(fd, "web") ?? "") !== "") return { ok: true };

  const h = await headers();
  const ip = klientIp(h);

  const parsed = registraceSchema.safeParse({
    jmeno: text(fd, "jmeno"),
    email: text(fd, "email"),
  });
  if (!parsed.success) return { ok: false, chyba: "Vyplň prosím jméno a platný e-mail." };
  const d = parsed.data;

  if (!(await overTurnstile(fd.get("cf-turnstile-response"), ip))) {
    return { ok: false, chyba: "Ověření, že nejsi robot, se nepodařilo. Zkus to prosím znovu." };
  }
  if (!(await povolenoOdeslani("registrace-ip", ip, 10)) || !(await povolenoOdeslani("registrace-email", d.email, 3))) {
    return { ok: false, chyba: PRILIS_MNOHO };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: d.email,
    options: {
      shouldCreateUser: true,
      data: { full_name: d.jmeno, marketing_basis: "opravneny-zajem", marketing_text_version: ZNENI_OZNAMENI },
    },
  });
  if (error) {
    console.error("[registrace] Odeslání odkazu selhalo:", error.code ?? error.message);
    return { ok: false, chyba: OBECNA_CHYBA };
  }
  return { ok: true };
}

// Opakované přihlášení. Odpověď je vždy stejná, ať e-mail existuje, nebo ne.
export async function prihlasit(_prev: Stav, fd: FormData): Promise<Stav> {
  if ((text(fd, "web") ?? "") !== "") return { ok: true };

  const h = await headers();
  const ip = klientIp(h);

  const parsed = prihlaseniSchema.safeParse({ email: text(fd, "email") });
  if (!parsed.success) return { ok: false, chyba: "Zadej prosím platný e-mail." };
  const { email } = parsed.data;

  if (!(await overTurnstile(fd.get("cf-turnstile-response"), ip))) {
    return { ok: false, chyba: "Ověření, že nejsi robot, se nepodařilo. Zkus to prosím znovu." };
  }
  if (!(await povolenoOdeslani("prihlaseni-ip", ip, 20)) || !(await povolenoOdeslani("prihlaseni-email", email, 5))) {
    return { ok: false, chyba: PRILIS_MNOHO };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
  // Chybu (např. neexistující účet) záměrně neprozrazujeme, jen ji zapíšeme do záznamu serveru.
  if (error) console.warn("[prihlaseni] Odkaz neodeslán:", error.code ?? error.message);
  return { ok: true };
}

// „Poslat e-mail znovu“ na stránce po registraci.
export async function poslatZnovu(email: string): Promise<Stav> {
  const h = await headers();
  const ip = klientIp(h);
  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) return { ok: false, chyba: "Neplatný e-mail." };

  if (!(await povolenoOdeslani("znovu-ip", ip, 10)) || !(await povolenoOdeslani("znovu-email", parsed.data, 3))) {
    return { ok: false, chyba: PRILIS_MNOHO };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({ email: parsed.data, options: { shouldCreateUser: false } });
  if (error) console.warn("[znovu] Odkaz neodeslán:", error.code ?? error.message);
  return { ok: true };
}
