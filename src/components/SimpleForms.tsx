"use client";

import { useEffect, useRef, useState } from "react";

const label = { fontSize: 14, fontWeight: 600, color: "#e6fffb" } as const;

// Přihlašovací formulář. Odeslání odkazu e-mailem (magic link) se napojí v milníku 3.
export function LoginForm() {
  const [info, setInfo] = useState("");
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setInfo("Přihlašování se zapne v dalším kroku vývoje. Zatím se nic neodesílá.");
      }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="l-email" style={label}>E-mail</label>
        <input id="l-email" name="email" type="email" autoComplete="email" className="input" required />
      </div>
      <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", minHeight: 54 }}>
        Poslat přihlašovací odkaz
      </button>
      {info && <p role="status" style={{ fontSize: 14, color: "#7ff0e2" }}>{info}</p>}
    </form>
  );
}

type Stav = { druh: "" | "odesilam" | "ok" | "chyba"; text: string };

function useOdeslani(typ: "kontakt" | "konzultace") {
  const [stav, setStav] = useState<Stav>({ druh: "", text: "" });
  const nacteno = useRef(0);
  useEffect(() => {
    nacteno.current = Date.now();
  }, []);

  async function odeslat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const telo: Record<string, unknown> = { typ, t: nacteno.current, souhlas: d.get("souhlas") === "on" };
    d.forEach((v, k) => {
      if (k !== "souhlas") telo[k] = v;
    });
    setStav({ druh: "odesilam", text: "Odesílám…" });
    try {
      const r = await fetch("/api/formular", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(telo) });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; chyba?: string };
      if (r.ok && j.ok) {
        setStav({ druh: "ok", text: "Díky, zpráva je odeslaná. Ozvu se ti co nejdřív." });
        form.reset();
      } else {
        setStav({ druh: "chyba", text: j.chyba ?? "Zprávu se nepodařilo odeslat." });
      }
    } catch {
      setStav({ druh: "chyba", text: "Zprávu se nepodařilo odeslat. Zkontroluj připojení a zkus to znovu." });
    }
  }
  return { stav, odeslat };
}

function Past() {
  // Skryté pole pro roboty. Člověk ho nevidí ani nevyplní.
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
      <label>
        Web
        <input name="web" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function Stav({ s }: { s: Stav }) {
  if (!s.text) return null;
  return (
    <p role="status" style={{ fontSize: 15, color: s.druh === "chyba" ? "#ffb4a2" : "#7ff0e2" }}>
      {s.text}
    </p>
  );
}

// Kontaktní formulář: zpráva jde na e-mail majitele (přes Resend).
export function ContactForm() {
  const { stav, odeslat } = useOdeslani("kontakt");
  return (
    <form className="flex flex-col gap-4" onSubmit={odeslat}>
      <Past />
      <div className="flex flex-col gap-2">
        <label htmlFor="k-jmeno" style={label}>Jméno</label>
        <input id="k-jmeno" name="jmeno" type="text" autoComplete="name" className="input" required maxLength={100} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="k-email" style={label}>E-mail</label>
        <input id="k-email" name="email" type="email" autoComplete="email" className="input" required maxLength={200} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="k-zprava" style={label}>Zpráva</label>
        <textarea id="k-zprava" name="zprava" rows={5} className="input" required maxLength={4000} />
      </div>
      <div className="flex items-start gap-2.5">
        <input id="k-souhlas" name="souhlas" type="checkbox" required style={{ width: 20, height: 20, margin: "2px 0 0", accentColor: "#2de2cb" }} />
        <label htmlFor="k-souhlas" style={{ fontSize: 14, lineHeight: 1.5 }}>Souhlasím se zpracováním osobních údajů.</label>
      </div>
      <button type="submit" disabled={stav.druh === "odesilam"} className="btn btn-primary" style={{ justifyContent: "center", minHeight: 54 }}>
        Odeslat
      </button>
      <Stav s={stav} />
    </form>
  );
}

// Dotazník ke konzultaci: název podniku, co řeším, preferovaná forma.
export function ConsultForm({ vychoziForma = "online" }: { vychoziForma?: "online" | "v-podniku" }) {
  const { stav, odeslat } = useOdeslani("konzultace");
  return (
    <form className="flex flex-col gap-4" onSubmit={odeslat} id="dotaznik">
      <Past />
      <div className="flex flex-col gap-2">
        <label htmlFor="d-jmeno" style={label}>Jméno</label>
        <input id="d-jmeno" name="jmeno" type="text" autoComplete="name" className="input" required maxLength={100} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="d-email" style={label}>E-mail</label>
        <input id="d-email" name="email" type="email" autoComplete="email" className="input" required maxLength={200} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="d-podnik" style={label}>Název podniku</label>
        <input id="d-podnik" name="podnik" type="text" className="input" required maxLength={150} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="d-reseni" style={label}>Co řeším</label>
        <textarea id="d-reseni" name="reseni" rows={5} className="input" required maxLength={4000} />
      </div>
      <fieldset className="flex flex-col gap-2.5" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend style={{ ...label, marginBottom: 8, padding: 0 }}>Preferovaná forma</legend>
        <label className="flex items-center gap-2.5" style={{ fontSize: 16 }}>
          <input type="radio" name="forma" value="online" defaultChecked={vychoziForma === "online"} style={{ width: 20, height: 20, accentColor: "#2de2cb" }} />
          Online konzultace
        </label>
        <label className="flex items-center gap-2.5" style={{ fontSize: 16 }}>
          <input type="radio" name="forma" value="v-podniku" defaultChecked={vychoziForma === "v-podniku"} style={{ width: 20, height: 20, accentColor: "#2de2cb" }} />
          Konzultace ve tvém podniku
        </label>
      </fieldset>
      <div className="flex items-start gap-2.5">
        <input id="d-souhlas" name="souhlas" type="checkbox" required style={{ width: 20, height: 20, margin: "2px 0 0", accentColor: "#2de2cb" }} />
        <label htmlFor="d-souhlas" style={{ fontSize: 14, lineHeight: 1.5 }}>Souhlasím se zpracováním osobních údajů.</label>
      </div>
      <button type="submit" disabled={stav.druh === "odesilam"} className="btn btn-primary" style={{ justifyContent: "center", minHeight: 54 }}>
        Odeslat dotazník
      </button>
      <Stav s={stav} />
    </form>
  );
}
