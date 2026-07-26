import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { SignInCard } from "@/components/admin/sign-in-card";
import { RegisterBarForm } from "@/components/admin/register-form";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { DeleteBarButton } from "@/components/admin/delete-bar-button";
import { SiteFooter } from "@/components/sections/footer";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import Link from "next/link";

type RecentBar = {
  sku: string;
  weight: number;
  purity: number;
  created_at: string;
};

type PaginatedBars = {
  data: RecentBar[];
  total: number;
};

async function fetchBars(page: number, limit: number = 6): Promise<PaginatedBars> {
  try {
    const supabase = getSupabaseAdmin();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("silver_bars")
      .select("sku, weight, purity, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Failed to fetch bars", error);
      return { data: [], total: 0 };
    }

    return { data: data ?? [], total: count ?? 0 };
  } catch (error) {
    console.error("Supabase unavailable", error);
    return { data: [], total: 0 };
  }
}

export default async function AdminPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return (
      <div className="flex min-h-screen flex-col bg-dark pt-20">
        <section className="flex-1 px-6 py-20">
          <SignInCard />
        </section>
        <SiteFooter />
      </div>
    );
  }

  const searchParams = await props.searchParams;
  const pageStr = typeof searchParams?.page === "string" ? searchParams.page : "1";
  const page = parseInt(pageStr, 10) || 1;
  const limit = 6;
  
  const { data: bars, total } = await fetchBars(page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex min-h-screen flex-col bg-dark pt-20">
      <section className="flex-1 px-6 py-16">
        <div className="section-shell flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-4 text-[var(--light-silver)] md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--silver)]">
                Admin
              </p>
              <h1 className="text-4xl font-semibold">
                Inventory console
              </h1>
            </div>
            <SignOutButton />
          </div>
          <div className="flex flex-col gap-8">
            <RegisterBarForm />
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--charcoal)] p-8 text-[var(--light-silver)] flex flex-col">
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--silver)]">
                Registered entries
              </p>
              
              <div className="overflow-x-auto mt-6 flex-1">
                <table className="w-full text-left text-sm text-[var(--light-silver)]">
                  <thead className="border-b border-[var(--border)] text-xs uppercase text-[var(--silver)]">
                    <tr>
                      <th className="px-4 py-3 font-medium whitespace-nowrap">SKU</th>
                      <th className="px-4 py-3 font-medium whitespace-nowrap">Weight (g)</th>
                      <th className="px-4 py-3 font-medium whitespace-nowrap">Weight (tol)</th>
                      <th className="px-4 py-3 font-medium whitespace-nowrap">Purity (‰)</th>
                      <th className="px-4 py-3 font-medium whitespace-nowrap">Date</th>
                      <th className="px-4 py-3 font-medium text-right whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {bars.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-[var(--silver)]">
                          No entries yet. Registered bars appear here.
                        </td>
                      </tr>
                    ) : (
                      bars.map((bar) => (
                        <tr key={bar.sku} className="group hover:bg-[var(--dark-gray)]">
                          <td className="px-4 py-4 font-mono text-[var(--silver)] whitespace-nowrap">{bar.sku}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{bar.weight}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{(bar.weight / 11.6638).toFixed(3)}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{bar.purity}</td>
                          <td className="px-4 py-4 text-[var(--silver)]/80 whitespace-nowrap">
                            {new Date(bar.created_at).toLocaleString()}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100 inline-block">
                              <DeleteBarButton sku={bar.sku} />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4 text-sm text-[var(--silver)]">
                  <div>
                    Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} entries
                  </div>
                  <div className="flex gap-2">
                    {page > 1 ? (
                      <Link
                        href={`/admin?page=${page - 1}`}
                        className="rounded-lg border border-[var(--border)] px-3 py-1.5 hover:bg-[var(--dark-gray)] transition-colors"
                      >
                        Previous
                      </Link>
                    ) : (
                      <button disabled className="rounded-lg border border-[var(--border)] px-3 py-1.5 opacity-50 cursor-not-allowed">
                        Previous
                      </button>
                    )}
                    {page < totalPages ? (
                      <Link
                        href={`/admin?page=${page + 1}`}
                        className="rounded-lg border border-[var(--border)] px-3 py-1.5 hover:bg-[var(--dark-gray)] transition-colors"
                      >
                        Next
                      </Link>
                    ) : (
                      <button disabled className="rounded-lg border border-[var(--border)] px-3 py-1.5 opacity-50 cursor-not-allowed">
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
