-- Tythas contact-form leads. Run once in Supabase → SQL Editor → New query → Run.
create table if not exists public.leads (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text,
  company     text,
  role        text,
  services    text[] not null default '{}',
  goal        text,
  stage       text,
  budget      text,
  timeline    text,
  idea        text,
  score       int,
  tier        text,                      -- Hot / Warm / Cold
  status      text not null default 'new', -- new / contacted / call booked / proposal / won / lost
  notes       text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_tier_idx on public.leads (tier);

-- Lock the table: only the website's server (secret key) can write; nobody can read it publicly.
alter table public.leads enable row level security;
