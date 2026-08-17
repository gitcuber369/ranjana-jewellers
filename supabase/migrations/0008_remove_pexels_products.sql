-- Run this in the Supabase SQL Editor after 0007_site_sections_real_photos.sql.
-- Removes products that only had pexels.com placeholder images (no local
-- photo available to replace them with) so the catalog is local-images-only.

delete from products where image_url like 'https://images.pexels.com/%';
