import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { SignInCard } from "@/components/admin/sign-in-card";
import { RegisterBarForm } from "@/components/admin/register-form";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { SiteFooter } from "@/components/sections/footer";
import { getSupabaseAdmin } from "@/lib/supabase/server";

type RecentBar = {
  sku: string;
  weight: number;
  purity: number;
  karat: number;
  created_at: string;
};

async function fetchRecentBars(): Promise<RecentBar[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("silver_bars")
      .select("sku, weight, purity, karat, created_at")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.error("Failed to fetch bars", error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Supabase unavailable", error);
    return [];
  }
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] flex-col">
        <section className="flex-1 px-6 py-20">
          <SignInCard />
        </section>
        <SiteFooter />
      </div>
    );
  }

  const recentBars = await fetchRecentBars();

  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col">
      <section className="flex-1 px-6 py-16">
        <div className="section-shell flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-4 text-[var(--ink)] md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--slate)]">
                Admin
              </p>
              <h1 className="text-4xl font-semibold">
                Inventory console
              </h1>
            </div>
            <SignOutButton />
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <RegisterBarForm />
            <div className="rounded-[28px] border border-[var(--border)] bg-white p-8 text-[var(--ink)]">
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--slate)]">
                Recent entries
              </p>
              <div className="mt-6 space-y-4">
                {recentBars.length === 0 && (
                  <p className="text-sm text-[var(--slate)]">
                    No entries yet. Registered bars appear here.
                  </p>
                )}
                {recentBars.map((bar) => (
                  <div
                    key={bar.sku}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--sand)] p-4 text-sm text-[var(--ink)]"
                  >
                    <p className="font-mono text-base text-[var(--accent)]">
                      {bar.sku}
                    </p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      <span>{bar.weight} g</span>
                      <span>{bar.purity}‰</span>
                      <span>{bar.karat}k</span>
                    </div>
                    <p className="mt-2 text-xs text-[var(--slate)]/80">
                      {new Date(bar.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

