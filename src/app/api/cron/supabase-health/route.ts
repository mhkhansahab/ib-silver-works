import { getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request: Request) {
  const startedAt = Date.now();
  const respond = (status: number) => {
    console.info("Supabase health check", {
      status,
      durationMs: Date.now() - startedAt,
    });
    return Response.json(
      { ok: status === 200 },
      { status, headers: { "Cache-Control": "no-store" } },
    );
  };

  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return respond(401);
  }

  try {
    const { error } = await getSupabaseAdmin()
      .from("silver_bars")
      .select("id")
      .limit(1)
      .abortSignal(AbortSignal.timeout(10_000));

    return respond(error ? 503 : 200);
  } catch {
    return respond(503);
  }
}
