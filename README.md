# Mandi Price Watch

**Track what your crop actually sells for**

A shared log of mandi prices, so farmers and small traders can see what a quintal is really fetching this week instead of relying on someone else's number.

A full-stack demo built with **Next.js 14 (App Router)**, **Tailwind CSS** and a
**Supabase (Postgres)** backend. Records are written from the browser straight to
Postgres through row-level security policies — no custom API layer to maintain.

---

**Live demo:** https://password123-blip.github.io/mandi-price-watch/

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14, App Router, TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase Postgres, RLS-secured |
| Hosting | Netlify (`@netlify/plugin-nextjs`) |

## Run it locally

```bash
npm install
cp .env.example .env.local   # add your Supabase URL + anon key
npm run dev
```

Open http://localhost:3000.

## Set up the database

Run `supabase/migrations/0001_init.sql` in the Supabase SQL editor. It is
idempotent — safe to run more than once. It creates the `mandi_price_watch_prices` table,
enables row-level security, adds read/insert policies for anonymous users, and
seeds a few example rows.

## Data model

Table: `mandi_price_watch_prices`

| Column | Type |
| --- | --- |
| `crop` | text |
| `mandi` | text |
| `price_per_quintal` | numeric |
| `quoted_on` | date |
| `notes` | text |
| `created_at` | timestamptz |

Every row also has `id uuid` and `created_at timestamptz`.

## Deploy

Push to GitHub, then import the repo on Netlify. Set `NEXT_PUBLIC_SUPABASE_URL`
and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Netlify's environment variables — the
included `netlify.toml` handles the build.

## What it does

- **Log a price in seconds** — Crop, mandi, rate and date — four fields, one tap, and it is in the database for everyone.
- **Compare across mandis** — See the same crop from different markets side by side before you commit to a buyer.
- **Open and free** — No login, no middleman, no paywall. Read access is public by design.

## License

MIT
