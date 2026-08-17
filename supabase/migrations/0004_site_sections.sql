-- Run this in the Supabase SQL Editor after 0003_product_featured.sql.
-- Generic editorial content blocks (Hero, Promo Banner, Collections, Occasion Grid,
-- Curated For You, Mosaic Gallery, Dark Promo Banner) managed from one admin screen.

create table if not exists site_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null,
  title text,
  subtitle text,
  image_url text,
  link_href text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table site_sections enable row level security;

create policy "public read site sections" on site_sections for select using (true);

create policy "authenticated write site sections" on site_sections for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
