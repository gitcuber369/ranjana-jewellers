-- Run this in the Supabase SQL Editor after 0004_site_sections.sql.
-- Seeds site_sections with the same images the old hardcoded components used,
-- so the landing page looks the same as before, now editable from /admin/content.

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
  ('collections', 'Gomukhi Shringi', null, '/ranjana-jewellers/section-image-5.png', 0),
  ('collections', 'Stunning Studs', null, 'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=1200', 1),
  ('collections', '18Kt Jewellery', null, 'https://images.pexels.com/photos/3641059/pexels-photo-3641059.jpeg?auto=compress&cs=tinysrgb&w=1200', 2),

  -- Occasion grid: 4 tiles
  ('occasion_grid', 'Wedding', null, 'https://images.pexels.com/photos/10074704/pexels-photo-10074704.jpeg?auto=compress&cs=tinysrgb&w=1200', 0),
  ('occasion_grid', 'Diamond', null, 'https://images.pexels.com/photos/265804/pexels-photo-265804.jpeg?auto=compress&cs=tinysrgb&w=1200', 1),
  ('occasion_grid', 'Gold', null, 'https://images.pexels.com/photos/6153885/pexels-photo-6153885.jpeg?auto=compress&cs=tinysrgb&w=1200', 2),
  ('occasion_grid', 'Daily Wear', null, 'https://images.pexels.com/photos/8184263/pexels-photo-8184263.jpeg?auto=compress&cs=tinysrgb&w=1200', 3),

  -- Curated for you: 3 tiles
  ('curated_for_you', 'Women Jewellery', null, 'https://images.pexels.com/photos/18819619/pexels-photo-18819619.jpeg?auto=compress&cs=tinysrgb&w=1200', 0),
  ('curated_for_you', 'Men Jewellery', null, 'https://images.pexels.com/photos/10330415/pexels-photo-10330415.jpeg?auto=compress&cs=tinysrgb&w=1200', 1),
  ('curated_for_you', 'Kids Jewellery', null, 'https://images.pexels.com/photos/6189935/pexels-photo-6189935.jpeg?auto=compress&cs=tinysrgb&w=1200', 2),

  -- Mosaic gallery: exactly 7, in order — first 6 are outer tiles, 7th is the large center tile
  ('mosaic_gallery', null, null, 'https://images.pexels.com/photos/13180094/pexels-photo-13180094.jpeg?auto=compress&cs=tinysrgb&w=1200', 0),
  ('mosaic_gallery', null, null, 'https://images.pexels.com/photos/12992568/pexels-photo-12992568.jpeg?auto=compress&cs=tinysrgb&w=1200', 1),
  ('mosaic_gallery', null, null, 'https://images.pexels.com/photos/18231729/pexels-photo-18231729.jpeg?auto=compress&cs=tinysrgb&w=1200', 2),
  ('mosaic_gallery', null, null, 'https://images.pexels.com/photos/5017601/pexels-photo-5017601.jpeg?auto=compress&cs=tinysrgb&w=1200', 3),
  ('mosaic_gallery', null, null, 'https://images.pexels.com/photos/7686386/pexels-photo-7686386.jpeg?auto=compress&cs=tinysrgb&w=1200', 4),
  ('mosaic_gallery', null, null, 'https://images.pexels.com/photos/12507515/pexels-photo-12507515.jpeg?auto=compress&cs=tinysrgb&w=1200', 5),
  ('mosaic_gallery', null, null, 'https://images.pexels.com/photos/38036019/pexels-photo-38036019.jpeg?auto=compress&cs=tinysrgb&w=1200', 6),

  -- Dark promo: first row (order 0) is the heading text (subtitle = eyebrow, title = big heading), rest are image tiles
  ('dark_promo', 'Shop the Festive Season', 'New Arrivals', null, 0),
  ('dark_promo', 'Silver Durga Idol', null, '/ranjana-jewellers/section-image-1.png', 1),
  ('dark_promo', 'Silver Kamandal', null, '/ranjana-jewellers/section-image-3.png', 2)
on conflict do nothing;
