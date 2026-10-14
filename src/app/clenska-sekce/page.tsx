import { getProfile, requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

type Pristup = { expires_at: string | null; modules: { slug: string; title: string; description: string | null } | null };

// Zatím jen přehled přidělených modulů. Plná nástěnka (průběh, zámky, ceny) přijde v milníku 4.
export default async function ClenskaSekcePage() {
  const user = await requireUser();
  const profil = await getProfile();
  const sb = await createClient();
  const { data } = await sb
    .from("module_access")
    .select("expires_at, modules(slug, title, description)")
    .eq("user_id", user.id);
  const pristupy = ((data ?? []) as unknown as Pristup[]).filter((p) => p.modules);

  return (
    <section className="wrap" style={{ paddingTop: 40 }}>
      <h1 className="display" style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.04em" }}>
        Ahoj{profil?.full_name ? `, ${profil.full_name}` : ""}.
      </h1>
      <p className="lead" style={{ marginTop: 12, maxWidth: "52ch" }}>
        Jsi přihlášený jako {user.email}. Plná nástěnka s videi a materiály přibude v dalším kroku vývoje.
      </p>
      <h2 className="display" style={{ fontWeight: 700, fontSize: 28, margin: "40px 0 18px" }}>Moje moduly</h2>
      <div className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))" }}>
        {pristupy.map((p) => (
          <div key={p.modules!.slug} className="glass flex flex-col gap-2.5" style={{ padding: 26, borderColor: "rgba(94,234,212,0.35)" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "var(--accent)" }}>ODEMČENO</span>
            <h3 className="display" style={{ fontWeight: 700, fontSize: 24 }}>{p.modules!.title}</h3>
            {p.modules!.description && <p style={{ fontSize: 15, lineHeight: 1.6 }}>{p.modules!.description}</p>}
          </div>
        ))}
        {pristupy.length === 0 && <p>Zatím nemáš přidělený žádný modul.</p>}
      </div>
    </section>
  );
}
