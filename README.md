## Gold & Silver Works

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
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace_me
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
ADMIN_EMAILS=
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
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
3. Enter weight (grams), purity (‰), karat. Submit → SKU `SLV-YYYY-########` is minted and stored.
4. Latest inserts render on the right for quick confirmation.

## Verification Flow

1. Navigate to `/verify`.
2. Enter the engraved SKU.
3. Server action validates format, queries Supabase, and prints the canonical weight/purity/karat.

## Production Checklist

- Configure Google OAuth origin + redirect URLs.
- Set all env vars in your hosting platform.
- Optionally enable Supabase Row Level Security with service role restricted APIs.
- Run `npm run build && npm run start` to verify the deployment bundle.
# ib-silver-works
