import { createBrowserClient } from "@supabase/ssr";

// Klient pro prohlížeč. Používá jen veřejný (anon) klíč.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
