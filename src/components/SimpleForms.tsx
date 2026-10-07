"use client";

import { useState } from "react";

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

// Kontaktní formulář. Odesílání zprávy se domluví s majitelem (viz otevřené otázky).
export function ContactForm() {
  const [info, setInfo] = useState("");
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setInfo("Odesílání zpráv se zapne v dalším kroku vývoje. Zatím se nic neodesílá.");
      }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="k-jmeno" style={label}>Jméno</label>
        <input id="k-jmeno" name="jmeno" type="text" autoComplete="name" className="input" required />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="k-email" style={label}>E-mail</label>
        <input id="k-email" name="email" type="email" autoComplete="email" className="input" required />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="k-zprava" style={label}>Zpráva</label>
        <textarea id="k-zprava" name="zprava" rows={5} className="input" required />
      </div>
      <div className="flex items-start gap-2.5">
        <input id="k-souhlas" name="souhlas" type="checkbox" required style={{ width: 20, height: 20, margin: "2px 0 0", accentColor: "#2de2cb" }} />
        <label htmlFor="k-souhlas" style={{ fontSize: 14, lineHeight: 1.5 }}>Souhlasím se zpracováním osobních údajů.</label>
      </div>
      <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", minHeight: 54 }}>Odeslat</button>
      {info && <p role="status" style={{ fontSize: 14, color: "#7ff0e2" }}>{info}</p>}
    </form>
  );
}
