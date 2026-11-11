-- Mandi Price Watch — schema
-- Safe to run more than once.

create extension if not exists "pgcrypto";

create table if not exists public.mandi_price_watch_prices (
  id uuid primary key default gen_random_uuid(),
  crop text,
  mandi text,
  price_per_quintal numeric,
  quoted_on date,
  notes text null,
  created_at timestamptz not null default now()
);

create index if not exists mandi_price_watch_prices_created_idx on public.mandi_price_watch_prices (created_at desc);

alter table public.mandi_price_watch_prices enable row level security;

drop policy if exists "mandi_price_watch_prices_read" on public.mandi_price_watch_prices;
create policy "mandi_price_watch_prices_read" on public.mandi_price_watch_prices for select using (true);

drop policy if exists "mandi_price_watch_prices_insert" on public.mandi_price_watch_prices;
create policy "mandi_price_watch_prices_insert" on public.mandi_price_watch_prices for insert with check (true);

insert into public.mandi_price_watch_prices (crop, mandi, price_per_quintal, quoted_on, notes) values
  ('Wheat', 'Karnal', 2450, '2026-11-09', 'Fair average quality'),
  ('Onion', 'Lasalgaon', 1820, '2026-11-10', 'Red, well graded'),
  ('Soybean', 'Indore', 4310, '2026-11-10', '');
