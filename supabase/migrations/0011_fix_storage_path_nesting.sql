-- Run this in the Supabase SQL Editor after 0010_migrate_images_to_storage.sql.
-- The images were uploaded into a subfolder also named "product-images"
-- inside the "product-images" bucket, so the URLs written by migration 0010
-- are missing that extra path segment. This inserts it.

update products
set image_url = replace(
  image_url,
  '/storage/v1/object/public/product-images/',
  '/storage/v1/object/public/product-images/product-images/'
)
where image_url like 'https://fbvyvejldrqzuviyruzn.supabase.co/storage/v1/object/public/product-images/%'
  and image_url not like 'https://fbvyvejldrqzuviyruzn.supabase.co/storage/v1/object/public/product-images/product-images/%';

update site_sections
set image_url = replace(
  image_url,
  '/storage/v1/object/public/product-images/',
  '/storage/v1/object/public/product-images/product-images/'
)
where image_url like 'https://fbvyvejldrqzuviyruzn.supabase.co/storage/v1/object/public/product-images/%'
  and image_url not like 'https://fbvyvejldrqzuviyruzn.supabase.co/storage/v1/object/public/product-images/product-images/%';
