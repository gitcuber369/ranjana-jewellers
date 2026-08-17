-- Run this in the Supabase SQL Editor after 0006_real_product_photos.sql.
-- Populates every landing-page editorial section (managed at /admin/content)
-- with real local photos from public/ranjana-jewellers/, replacing any
-- earlier pexels/placeholder seed. Safe to re-run.

delete from site_sections;

insert into site_sections (section_key, title, subtitle, image_url, sort_order) values
  -- Hero carousel: 5 slides, image only
  ('hero', null, null, '/ranjana-jewellers/image-1-new.png', 0),
  ('hero', null, null, '/ranjana-jewellers/image-2-new.png', 1),
  ('hero', null, null, '/ranjana-jewellers/image-3-new.png', 2),
  ('hero', null, null, '/ranjana-jewellers/image-4-new.png', 3),
  ('hero', null, null, '/ranjana-jewellers/image-5-new.png', 4),

  -- Promo banner: single row, title = banner text
  ('promo_banner', 'Rakhi Season Celebration — Flat 20% Off on Selected Jewellery!', null, null, 0),

  -- Collections: first (order 0) is the large tile
  ('collections', 'Bridal Gold Sets', null, '/ranjana-jewellers/746837.jpg', 0),
  ('collections', 'Oxidised Silver Sets', null, '/ranjana-jewellers/744757.jpg', 1),
  ('collections', 'Fine Diamond Jewellery', null, '/ranjana-jewellers/972850.png', 2),

  -- Occasion grid: 4 tiles
  ('occasion_grid', 'Wedding', null, '/ranjana-jewellers/746837.jpg', 0),
  ('occasion_grid', 'Diamond', null, '/ranjana-jewellers/904338.jpg', 1),
  ('occasion_grid', 'Gold', null, '/ranjana-jewellers/766505.jpg', 2),
  ('occasion_grid', 'Daily Wear', null, '/ranjana-jewellers/772997.jpg', 3),

  -- Curated for you: 3 tiles
  ('curated_for_you', 'Necklaces', null, '/ranjana-jewellers/765704.jpg', 0),
  ('curated_for_you', 'Bracelets', null, '/ranjana-jewellers/788307.jpg', 1),
  ('curated_for_you', 'Bangles', null, '/ranjana-jewellers/773161.png', 2),

  -- Mosaic gallery: exactly 7, in order — first 6 are outer tiles, 7th is the large center tile
  ('mosaic_gallery', null, null, '/ranjana-jewellers/751412.jpg', 0),
  ('mosaic_gallery', null, null, '/ranjana-jewellers/775526.jpg', 1),
  ('mosaic_gallery', null, null, '/ranjana-jewellers/765886.jpg', 2),
  ('mosaic_gallery', null, null, '/ranjana-jewellers/766505.jpg', 3),
  ('mosaic_gallery', null, null, '/ranjana-jewellers/929385.jpg', 4),
  ('mosaic_gallery', null, null, '/ranjana-jewellers/904338.jpg', 5),
  ('mosaic_gallery', null, null, '/ranjana-jewellers/972850.png', 6),

  -- Dark promo: first row (order 0) is the heading text (subtitle = eyebrow, title = big heading), rest are image tiles
  ('dark_promo', 'Shop the Festive Season', 'New Arrivals', null, 0),
  ('dark_promo', 'Silver Kada', null, '/ranjana-jewellers/929385.jpg', 1),
  ('dark_promo', 'Ruby Drop Earrings', null, '/ranjana-jewellers/928986.jpg', 2);
