import { createClient } from "@supabase/supabase-js";
import type { Modul } from "@/content/moduly";
import zaloha from "@/content/moduly-data.json";

// Řádek tabulky modules (jen sloupce, které používají veřejné stránky).
type Radek = {
  slug: string;
  sort_order?: number;
  n?: number;
  title: string;
  description: string | null;
  eyebrow: string | null;
  bullets: string[] | null;
  long_description: string | null;
  badge_label: string | null;
  offer_text: string | null;
  key_features: string[] | null;
  contents_summary: string | null;
  price_czk: number | null;
  original_price_czk: number | null;
  is_free: boolean;
  bundle_only: boolean;
};

const kc = (n: number) => `${n.toLocaleString("cs-CZ").replace(/\s/g, " ")} Kč`;

function naModul(r: Radek, poradi: number): Modul {
  const n = r.n ?? r.sort_order ?? poradi;
  return {
    slug: r.slug,
    n,
    nazev: r.title,
    teaser: r.description ?? "",
    eyebrow: r.eyebrow ?? "",
    odrazky: r.bullets ?? [],
    dlouhyPopis: r.long_description ?? undefined,
    stitek: r.badge_label ?? "",
    popis: r.offer_text ?? "",
    klicove: r.key_features ?? [],
    souhrn: r.contents_summary ?? undefined,
    zdarma: r.is_free,
    jenVBalicku: r.bundle_only,
    cenaCislo: !r.is_free && !r.bundle_only && r.price_czk ? r.price_czk : undefined,
    cena: !r.is_free && r.price_czk ? kc(r.price_czk) : undefined,
    cenaPuvodni: !r.is_free && r.original_price_czk ? kc(r.original_price_czk) : undefined,
  };
}

// Moduly pro veřejné stránky: z databáze (publikované, podle pořadí).
// Když databáze není nastavená nebo nedostupná, použije se záložní kopie (moduly-data.json).
export async function getModuly(): Promise<Modul[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    try {
      const sb = createClient(url, key, { auth: { persistSession: false } });
      const { data, error } = await sb
        .from("modules")
        .select(
          "slug, sort_order, title, description, eyebrow, bullets, long_description, badge_label, offer_text, key_features, contents_summary, price_czk, original_price_czk, is_free, bundle_only",
        )
        .eq("published", true)
        .order("sort_order");
      if (error) throw error;
      if (data && data.length > 0) return data.map(naModul);
      console.warn("[moduly] Databáze nevrátila žádné publikované moduly, používá se záložní kopie.");
    } catch (e) {
      console.warn("[moduly] Načtení z databáze selhalo, používá se záložní kopie:", e);
    }
  }
  return (zaloha as unknown as Radek[]).map(naModul);
}
