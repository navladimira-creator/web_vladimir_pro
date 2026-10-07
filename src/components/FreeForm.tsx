"use client";

import { useState } from "react";

// Formulář pro Modul 0 zdarma. Odesílání (magic link + Ecomail) se napojí v milníku 3.
export default function FreeForm() {
  const [info, setInfo] = useState("");

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setInfo("Registrace se spustí v dalším kroku vývoje. Zatím se nic neodesílá.");
      }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="f-jmeno" style={{ fontSize: 14, fontWeight: 600, color: "#e6fffb" }}>Jméno</label>
        <input id="f-jmeno" name="jmeno" type="text" autoComplete="given-name" className="input" required />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="f-email" style={{ fontSize: 14, fontWeight: 600, color: "#e6fffb" }}>E-mail</label>
        <input id="f-email" name="email" type="email" autoComplete="email" className="input" required />
      </div>
      <div className="flex items-start gap-2.5">
        <input
          id="f-souhlas"
          name="souhlas"
          type="checkbox"
          required
          style={{ width: 20, height: 20, margin: "2px 0 0", accentColor: "#2de2cb" }}
        />
        <label htmlFor="f-souhlas" style={{ fontSize: 14, lineHeight: 1.5 }}>
          Souhlasím se zpracováním osobních údajů.
        </label>
      </div>
      <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", minHeight: 54 }}>
        Odeslat
      </button>
      {info && (
        <p role="status" style={{ fontSize: 14, color: "#7ff0e2" }}>
          {info}
        </p>
      )}
    </form>
  );
}
