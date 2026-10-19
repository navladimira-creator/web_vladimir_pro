import "server-only";
import { createClient } from "@/lib/supabase/server";

// Data pro členskou sekci. Čte se přes přihlášeného uživatele, takže o tom, co uvidí,
// rozhoduje databáze (RLS), ne tento kód. Stav "zamčeno" se tu jen dopočítává pro zobrazení.

export type ModulRadek = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  eyebrow: string | null;
  sort_order: number;
  is_free: boolean;
  price_czk: number | null;
  original_price_czk: number | null;
  bundle_only: boolean;
};

export type Lekce = { id: string; module_id: string; title: string; description: string | null; bunny_video_id: string | null; sort_order: number };

export type Stav = "odemceno" | "zamceno" | "vyprselo";

export type ModulSPristupem = ModulRadek & { stav: Stav; lekci: number; hotovo: number };

export const kc = (n: number) => `${n.toLocaleString("cs-CZ").replace(/\s/g, " ")} Kč`;

export function procenta(hotovo: number, celkem: number) {
  return celkem > 0 ? Math.round((hotovo / celkem) * 100) : 0;
}

export async function nactiPrehled(userId: string) {
  const sb = await createClient();
  const [moduly, pristupy, lekce, hotove] = await Promise.all([
    sb
      .from("modules")
      .select("id, slug, title, description, eyebrow, sort_order, is_free, price_czk, original_price_czk, bundle_only")
      .eq("published", true)
      .order("sort_order"),
    sb.from("module_access").select("module_id, expires_at").eq("user_id", userId),
    sb.from("lessons").select("id, module_id, title, description, bunny_video_id, sort_order").order("sort_order"),
    sb.from("lesson_progress").select("lesson_id").eq("user_id", userId),
  ]);

  const ted = Date.now();
  const stavy = new Map<string, Stav>();
  for (const p of pristupy.data ?? []) {
    const platne = !p.expires_at || new Date(p.expires_at).getTime() > ted;
    // Platný přístup má přednost, kdyby u modulu bylo řádků víc.
    if (platne) stavy.set(p.module_id, "odemceno");
    else if (!stavy.has(p.module_id)) stavy.set(p.module_id, "vyprselo");
  }

  const hotoveIds = new Set((hotove.data ?? []).map((h) => h.lesson_id));
  const lekceVsechny = (lekce.data ?? []) as Lekce[];

  const seznam: ModulSPristupem[] = ((moduly.data ?? []) as ModulRadek[]).map((m) => {
    const stav = stavy.get(m.id) ?? "zamceno";
    const jeho = stav === "odemceno" ? lekceVsechny.filter((l) => l.module_id === m.id) : [];
    return { ...m, stav, lekci: jeho.length, hotovo: jeho.filter((l) => hotoveIds.has(l.id)).length };
  });

  return { moduly: seznam, lekce: lekceVsechny, hotoveIds };
}
