## IB Metal Works

Two-page Next.js 14 experience for silver-bar traders:

- `/` – marketing page with hero, carousel showcase, about, and footer.
- `/verify` – public SKU lookup returning weight, purity, and karat.
- `/admin` – Google SSO gated console to register new bars (auto SKU).

The stack uses the App Router, server actions, Tailwind v4, Supabase, and NextAuth.

## Local Development

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Environment Variables

Create `.env.local` with:

```
NEXTAUTH_SECRET=replace_me
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
ADMIN_EMAILS=
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_URL=...
```

- `ADMIN_EMAILS` is a comma-separated allowlist for Google sign-ins.
- Use the Supabase **service role** key only on the server (never expose it client-side). The form + verification actions already stay on the server, so credentials remain safe.
- The browser helper (if/when needed) should use the public URL & anon key pair. These can mirror the server values by exporting them with `NEXT_PUBLIC_...`.

## Supabase Setup (Free Tier Friendly)

Supabase is ideal here because it delivers:

1. **Postgres + SQL** – predictable transactions and sequences for SKUs.
2. **Row Level Security & Auth** – optional future hardening at no extra cost.
3. **Generous free tier** (500 MB DB, 2GB bandwidth) perfect for verification workloads.

Schema (run inside the SQL editor):

```sql
create table if not exists silver_bars (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  weight numeric(10,2) not null,
  purity numeric(6,2) not null,
  karat numeric(4,2) not null,
  year int not null,
  sequence int not null,
  created_at timestamptz not null default timezone('utc', now()),
  constraint unique_year_sequence unique (year, sequence)
);

create index if not exists silver_bars_year_idx on silver_bars (year, sequence desc);
```

> Tip: keep everything server-side. No Supabase anon keys are exposed in the browser.

## Admin Flow

1. Visit `/admin`.
2. Sign in with an allowlisted Google account.
3. Enter weight (grams), purity (‰), karat. Submit → SKU `IB-#######` is minted and stored.
4. Latest inserts render on the right for quick confirmation.

## Verification Flow

1. Navigate to `/verify`.
2. Enter the engraved SKU.
3. Server action validates format, queries Supabase, and prints the canonical weight/purity/karat.

## Production Checklist

### Daily Supabase health check

Vercel Cron calls `GET /api/cron/supabase-health` daily at `0 4 * * *`
(04:00 UTC, approximately 09:00–09:59 Pakistan time on Hobby). Each call
performs an uncached read of at most one ID from `silver_bars`. An empty table
is healthy. This reduces inactivity risk but does not guarantee Supabase will
never pause a free project.

1. Generate a secret with `openssl rand -hex 32` and save it as `CRON_SECRET`
   in the Vercel project's **Production** environment. Never commit the value
   or use a `NEXT_PUBLIC_` prefix.
2. Confirm `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are configured there.
   Restore the project in Supabase's dashboard first if it is paused.
3. Deploy through the existing production workflow. Vercel automatically sends
   `Authorization: Bearer <CRON_SECRET>` when invoking the job.
4. Open **Settings → Cron Jobs**, confirm the schedule, and trigger a manual run.
   Check function logs for `Supabase health check` with status `200`, then
   confirm the first scheduled execution the next day.

For local testing, set the same variables in `.env.local`, run `npm run dev`,
and call the endpoint with an authorization header using your local secret.
For example, with `CRON_SECRET` also exported in your shell:

```sh
curl -i -H "Authorization: Bearer ${CRON_SECRET}" http://localhost:3000/api/cron/supabase-health
```

Successful reads return `200` and `{ "ok": true }`. Missing or incorrect
authorization returns `401` without database access. Database errors, missing
database configuration, and requests exceeding the 10-second database timeout
return `503` and `{ "ok": false }`. Responses are not cached; logs include only
status and duration, never credentials or records.

Monitoring uses Vercel function logs; no external alerts or automatic Supabase
restore are configured. Remove the `crons` entry from `vercel.json` and redeploy
to stop the schedule.

Run the isolated endpoint regression checks with `node --test tests/supabase-health.test.mjs`.

### Application checks

- Configure Google OAuth origin + redirect URLs.
- Set all env vars in your hosting platform.
- Optionally enable Supabase Row Level Security with service role restricted APIs.
- Run `npm run build && npm run start` to verify the deployment bundle.
# ib-silver-works
