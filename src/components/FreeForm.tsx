"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { registrovat, type Stav } from "@/app/(web)/registrace/actions";
import Turnstile from "./Turnstile";

const pocatek: Stav = { ok: false };
const label = { fontSize: 14, fontWeight: 600, color: "#e6fffb" } as const;

// Formulář pro reSTART zdarma: jméno a e-mail. Bez zaškrtávátek; pod tlačítkem je viditelná věta
// o novinkách (oprávněný zájem) s odkazy na podmínky a ochranu osobních údajů.
export default function FreeForm() {
  const router = useRouter();
  const [stav, akce, caka] = useActionState(registrovat, pocatek);
  const jmeno = useRef("");
  const email = useRef("");

  useEffect(() => {
    if (stav.ok) {
      try {
        sessionStorage.setItem("registrace", JSON.stringify({ jmeno: jmeno.current, email: email.current }));
      } catch {
        /* bez úložiště se stránka s poděkováním zobrazí bez jména */
      }
      router.push("/registrace/dekujeme");
    }
  }, [stav, router]);

  return (
    <form
      action={akce}
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        const d = new FormData(e.currentTarget);
        jmeno.current = String(d.get("jmeno") ?? "");
        email.current = String(d.get("email") ?? "");
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
        <label>
          Web
          <input name="web" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="f-jmeno" style={label}>Jméno</label>
        <input id="f-jmeno" name="jmeno" type="text" autoComplete="given-name" className="input" required maxLength={100} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="f-email" style={label}>E-mail</label>
        <input id="f-email" name="email" type="email" autoComplete="email" className="input" required maxLength={200} />
      </div>
      <Turnstile resetSignal={stav} />
      <button type="submit" disabled={caka} className="btn btn-primary" style={{ justifyContent: "center", minHeight: 54 }}>
        {caka ? "Odesílám…" : "Odeslat"}
      </button>
      <p style={{ fontSize: 13, lineHeight: 1.55, color: "#8fb9b5" }}>
        Odesláním získáš modul reSTART zdarma a budeme ti posílat novinky o systému Vladimír PRO. Odhlásit se můžeš
        kdykoli jedním kliknutím. Souhlasíš s <Link href="/obchodni-podminky" style={{ textDecoration: "underline" }}>obchodními podmínkami</Link> a{" "}
        <Link href="/ochrana-osobnich-udaju" style={{ textDecoration: "underline" }}>ochranou osobních údajů</Link>.
      </p>
      {stav.chyba && (
        <p role="alert" style={{ fontSize: 15, color: "#ffb4a2" }}>
          {stav.chyba}
        </p>
      )}
    </form>
  );
}
