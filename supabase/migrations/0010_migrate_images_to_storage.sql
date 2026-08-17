-- Run this in the Supabase SQL Editor AFTER uploading every file from
-- public/ranjana-jewellers/ directly into the root of the Storage bucket
-- "product-images" (same filenames, no subfolder).
-- Rewrites local /ranjana-jewellers/... paths to their public Storage URL.

update products
set image_url = replace(
  image_url,
  '/ranjana-jewellers/',
  'https://fbvyvejldrqzuviyruzn.supabase.co/storage/v1/object/public/product-images/'
)
where image_url like '/ranjana-jewellers/%';

update site_sections
set image_url = replace(
  image_url,
  '/ranjana-jewellers/',
  'https://fbvyvejldrqzuviyruzn.supabase.co/storage/v1/object/public/product-images/'
)
where image_url like '/ranjana-jewellers/%';
