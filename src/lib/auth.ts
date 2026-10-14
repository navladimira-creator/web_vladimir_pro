import "server-only";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Sdílená vrstva pro kontrolu přihlášení. Používá se v každé chráněné stránce, akci a API.
// Vždy getUser() (ověří přihlášení u Supabase), nikdy getSession().
export const getUser = cache(async () => {
  const sb = await createClient();
  const { data, error } = await sb.auth.getUser();
  return error ? null : data.user;
});

export async function requireUser() {
  const user = await getUser();
  if (!user) redirect("/prihlaseni");
  return user;
}

export const getProfile = cache(async () => {
  const user = await getUser();
  if (!user) return null;
  const sb = await createClient();
  const { data } = await sb.from("profiles").select("id, email, full_name, role").eq("id", user.id).maybeSingle();
  return data;
});

// Role admin se čte z databáze, nikdy z dat, která uživatel ovlivní.
export async function requireAdmin() {
  await requireUser();
  const profil = await getProfile();
  if (profil?.role !== "admin") notFound();
  return profil;
}
