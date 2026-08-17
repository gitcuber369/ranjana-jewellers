-- Run this in the Supabase SQL Editor after 0008_remove_pexels_products.sql.
-- Removes categories left with zero products after the pexels cleanup
-- (Rudraksh Mala, Crystals), so the navbar/collections only show
-- categories that actually have items.

delete from categories
where id not in (select distinct category_id from products where category_id is not null);
