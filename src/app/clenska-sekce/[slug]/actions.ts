"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({ lekce: z.uuid(), hotovo: z.enum(["0", "1"]) });

// Označí video jako hotové (nebo zruší označení). O tom, zda smí uživatel zapisovat, rozhoduje
// databáze: zapsat jde jen u videí z modulu s platným přístupem (RLS na lesson_progress).
export async function oznacitHotovo(formData: FormData) {
  const user = await requireUser();
  const d = schema.safeParse({ lekce: formData.get("lekce"), hotovo: formData.get("hotovo") });
  if (!d.success) return;

  const sb = await createClient();
  if (d.data.hotovo === "1") {
    const { error } = await sb
      .from("lesson_progress")
      .upsert({ user_id: user.id, lesson_id: d.data.lekce }, { onConflict: "user_id,lesson_id", ignoreDuplicates: true });
    if (error) console.error("[prubeh] Uložení selhalo:", error.code ?? error.message);
  } else {
    const { error } = await sb.from("lesson_progress").delete().eq("user_id", user.id).eq("lesson_id", d.data.lekce);
    if (error) console.error("[prubeh] Smazání selhalo:", error.code ?? error.message);
  }
  revalidatePath("/clenska-sekce", "layout");
}
