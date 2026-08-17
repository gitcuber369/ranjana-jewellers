-- Run this whole file in the Supabase dashboard's SQL Editor (Project > SQL Editor > New query).
-- It creates the schema, locks it down with row level security, sets up the
-- product-images storage bucket, and seeds today's existing catalog so the
-- homepage looks identical right after migration.

create extension if not exists pgcrypto;

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  image_url text,
  category_id uuid references categories(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table categories enable row level security;
alter table products enable row level security;

create policy "public read categories" on categories for select using (true);
create policy "public read products" on products for select using (true);

-- No public signup exists in this app, so any authenticated user is an admin.
create policy "authenticated write categories" on categories for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated write products" on products for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "public read product images" on storage.objects
  for select using (bucket_id = 'product-images');
create policy "authenticated upload product images" on storage.objects
  for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');
create policy "authenticated update product images" on storage.objects
  for update using (bucket_id = 'product-images' and auth.role() = 'authenticated');
create policy "authenticated delete product images" on storage.objects
  for delete using (bucket_id = 'product-images' and auth.role() = 'authenticated');

-- Seed: today's existing hardcoded catalog, so nothing changes visually.
with cat as (
  insert into categories (name) values
    ('Rakhi'),
    ('Silver Idols'),
    ('Pooja Essentials'),
    ('Rudraksh Mala'),
    ('Crystals'),
    ('Mandir Decor')
  returning id, name
)
insert into products (name, description, image_url, category_id)
select p.name, p.description, p.image_url, cat.id
from (
  values
    ('Rakhi Gift Box', 'Silver rakhi presented in a handcrafted wooden keepsake box.', '/ranjana-jewellers/image-1-new.png', 'Rakhi'),
    ('Rudraksh Rakhi', 'Twin rudraksh beads set in silver on a soft cotton thread.', '/ranjana-jewellers/image-2-new.png', 'Rakhi'),
    ('Festive Rakhi Set', 'Tasseled rakhi set with tilak and chawal in a mirrored box.', '/ranjana-jewellers/image-3-new.png', 'Rakhi'),
    ('Silver Rakhi', 'Temple-motif silver rakhi in a magenta gift box.', '/ranjana-jewellers/image-4-new.png', 'Rakhi'),
    ('Pearl Coin Rakhi', 'Silver coin pendant strung with pearls and beaded accents.', '/ranjana-jewellers/image-5-new.png', 'Rakhi'),
    ('Silver Durga Idol', 'Finely detailed silver-finish Durga idol for your home mandir.', '/ranjana-jewellers/section-image-1.png', 'Silver Idols'),
    ('Krishna Idol', 'Silver-toned Krishna idol with intricate hand-finished detailing.', '/ranjana-jewellers/section-image-2.png', 'Silver Idols'),
    ('Silver Kamandal', 'Ornate silver kamandal with engraved floral patterns.', '/ranjana-jewellers/section-image-3.png', 'Pooja Essentials'),
    ('Pooja Thali', 'Complete silver pooja thali set for daily rituals.', '/ranjana-jewellers/section-image-4.png', 'Pooja Essentials'),
    ('Gomukhi Shringi', 'Traditional silver gomukhi shringi for abhishek rituals.', '/ranjana-jewellers/section-image-5.png', 'Pooja Essentials'),
    ('Aarti Set', 'Silver aarti set with incense holder and diya cup.', '/ranjana-jewellers/section-image-6.png', 'Pooja Essentials'),
    ('Rudraksh Mala', 'Traditional rudraksh mala with a red tasseled finish.', 'https://images.pexels.com/photos/6633942/pexels-photo-6633942.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Rudraksh Mala'),
    ('Rudraksh Bead Necklace', 'Classic rudraksh bead necklace, strung by hand.', 'https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Rudraksh Mala'),
    ('Mala Bead Necklace', 'Wooden bead mala necklace with a traditional tassel.', 'https://images.pexels.com/photos/10813684/pexels-photo-10813684.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Rudraksh Mala'),
    ('Healing Crystal Set', 'Curated set of natural crystals in assorted colours.', 'https://images.pexels.com/photos/4040611/pexels-photo-4040611.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Crystals'),
    ('Amethyst Cluster', 'Raw amethyst and quartz cluster for display or ritual use.', 'https://images.pexels.com/photos/1573236/pexels-photo-1573236.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Crystals'),
    ('Gemstone Collection', 'Assorted polished gemstones including amethyst and jade.', 'https://images.pexels.com/photos/15081674/pexels-photo-15081674.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Crystals'),
    ('Clay Diya', 'Handmade clay diya for daily aarti and festive lighting.', 'https://images.pexels.com/photos/34385012/pexels-photo-34385012.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Mandir Decor'),
    ('Decorative Diya', 'Ornamental diya suited for mandir and festive decor.', 'https://images.pexels.com/photos/13689170/pexels-photo-13689170.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Mandir Decor'),
    ('Mandir Diya Set', 'Set of diyas for illuminating your home mandir altar.', 'https://images.pexels.com/photos/37650548/pexels-photo-37650548.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Mandir Decor')
) as p(name, description, image_url, category_name)
join cat on cat.name = p.category_name;
