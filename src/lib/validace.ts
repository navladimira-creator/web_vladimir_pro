import { z } from "zod";

// Společná pravidla pro všechny veřejné formuláře. Validace vždy na serveru.
const email = z.string().trim().toLowerCase().max(200).pipe(z.email());
const jmeno = z.string().trim().min(1).max(100);
const potvrzeno = z.literal("on");

export const registraceSchema = z.object({ jmeno, email });

export const prihlaseniSchema = z.object({ email });

export const kontaktSchema = z.object({
  jmeno,
  email,
  zprava: z.string().trim().min(1).max(4000),
  souhlas: potvrzeno,
});

export const konzultaceSchema = z.object({
  jmeno,
  email,
  podnik: z.string().trim().min(1).max(150),
  reseni: z.string().trim().min(1).max(4000),
  forma: z.enum(["online", "v-podniku"]),
  souhlas: potvrzeno,
});

export const emailSchema = email;
