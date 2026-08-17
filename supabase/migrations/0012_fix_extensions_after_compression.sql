-- Run this in the Supabase SQL Editor after re-uploading the compressed
-- images from public/ranjana-jewellers-compressed/ (all normalized to .jpg).

update products
set image_url = regexp_replace(image_url, '\.(png|jpeg)$', '.jpg')
where image_url like 'https://fbvyvejldrqzuviyruzn.supabase.co/storage/v1/object/public/product-images/%'
  and image_url ~ '\.(png|jpeg)$';

update site_sections
set image_url = regexp_replace(image_url, '\.(png|jpeg)$', '.jpg')
where image_url like 'https://fbvyvejldrqzuviyruzn.supabase.co/storage/v1/object/public/product-images/%'
  and image_url ~ '\.(png|jpeg)$';
