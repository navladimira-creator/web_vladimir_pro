"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Odhlášení zneplatní přihlášení (refresh token) i na straně Supabase, ne jen v prohlížeči.
export async function odhlasit() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
  redirect("/");
}
