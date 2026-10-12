"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { registrovat, type Stav } from "@/app/(web)/registrace/actions";
import Turnstile from "./Turnstile";

const pocatek: Stav = { ok: false };
const label = { fontSize: 14, fontWeight: 600, color: "#e6fffb" } as const;

// Formulář pro reSTART zdarma: jméno, e-mail, souhlas se zpracováním (povinný)
// a samostatný, nepovinný souhlas s e-maily s novinkami.
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
      <div className="flex items-start gap-2.5">
        <input id="f-souhlas" name="souhlas" type="checkbox" required style={{ width: 20, height: 20, margin: "2px 0 0", accentColor: "#2de2cb" }} />
        <label htmlFor="f-souhlas" style={{ fontSize: 14, lineHeight: 1.5 }}>
          Souhlasím se zpracováním osobních údajů.
        </label>
      </div>
      <div className="flex items-start gap-2.5">
        <input id="f-marketing" name="marketing" type="checkbox" style={{ width: 20, height: 20, margin: "2px 0 0", accentColor: "#2de2cb" }} />
        <label htmlFor="f-marketing" style={{ fontSize: 14, lineHeight: 1.5 }}>
          Chci dostávat e-maily s novinkami. <span style={{ color: "#8fb9b5" }}>(nepovinné)</span>
        </label>
      </div>
      <Turnstile resetSignal={stav} />
      <button type="submit" disabled={caka} className="btn btn-primary" style={{ justifyContent: "center", minHeight: 54 }}>
        {caka ? "Odesílám…" : "Odeslat"}
      </button>
      {stav.chyba && (
        <p role="alert" style={{ fontSize: 15, color: "#ffb4a2" }}>
          {stav.chyba}
        </p>
      )}
    </form>
  );
}
