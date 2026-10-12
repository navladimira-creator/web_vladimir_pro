import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { bezpecnaCesta } from "@/lib/bezpecna-cesta";

// Vrátnice (v Next.js 16 náhrada za middleware): obnoví přihlášení v cookies a nepřihlášené
// pošle na /prihlaseni. Je to jen první síto. Každá chráněná stránka, akce i API si přístup
// ověřuje znovu (src/lib/auth.ts) a nad tím je ještě pravidlo RLS v databázi.
const CHRANENE = ["/clenska-sekce", "/admin"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const klic = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let prihlasen = false;

  if (url && klic) {
    const supabase = createServerClient(url, klic, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (items) => {
          items.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          items.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    });
    try {
      const { data } = await supabase.auth.getUser();
      prihlasen = !!data.user;
    } catch {
      prihlasen = false;
    }
  }

  const cesta = request.nextUrl.pathname;
  const chranena = CHRANENE.some((p) => cesta === p || cesta.startsWith(`${p}/`));

  if (chranena && !prihlasen) {
    const cil = request.nextUrl.clone();
    cil.pathname = "/prihlaseni";
    cil.search = "";
    cil.searchParams.set("next", bezpecnaCesta(cesta + request.nextUrl.search));
    return NextResponse.redirect(cil);
  }

  if (cesta === "/prihlaseni" && prihlasen) {
    const cil = request.nextUrl.clone();
    cil.pathname = "/clenska-sekce";
    cil.search = "";
    return NextResponse.redirect(cil);
  }

  return response;
}

// Jen cesty, které přihlášení potřebují. Veřejné stránky zůstávají rychlé a bez volání databáze.
export const config = {
  matcher: ["/clenska-sekce/:path*", "/admin/:path*", "/prihlaseni"],
};
