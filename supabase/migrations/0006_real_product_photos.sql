-- Run this in the Supabase SQL Editor after 0005_seed_site_sections.sql.
-- Replaces broken image paths (products seeded in 0001 pointed at
-- /ranjana-jewellers/section-image-*.png files that don't actually exist)
-- and adds real catalog photos found in public/ranjana-jewellers/,
-- placed into the existing 6 categories only (Rakhi and Crystals have no
-- matching local photos, so they're left untouched).

-- Fix broken images on existing products
update products set image_url = '/ranjana-jewellers/1049244.png' where name = 'Silver Durga Idol';
update products set image_url = '/ranjana-jewellers/1064100.png' where name = 'Krishna Idol';
update products set image_url = '/ranjana-jewellers/943642.png' where name = 'Silver Kamandal';
update products set image_url = '/ranjana-jewellers/928986.jpg' where name = 'Pooja Thali';
update products set image_url = '/ranjana-jewellers/1064187.png' where name = 'Gomukhi Shringi';
update products set image_url = '/ranjana-jewellers/1064188.jpg' where name = 'Aarti Set';

-- New products from real local catalog photos
insert into products (name, description, image_url, category_id)
select p.name, p.description, p.image_url, cat.id
from (
  values
    ('Lakshmi Ganesh Saraswati Idol', 'Sterling silver Lakshmi-Ganesh-Saraswati idol set for the home mandir.', '/ranjana-jewellers/747896.jpg', 'Silver Idols'),
    ('Silver Lakshmi Idol', 'Silver Lakshmi idol on a wooden mandir stand with matching silver charan paduka.', '/ranjana-jewellers/763869.jpg', 'Silver Idols'),
    ('Silver Ram Darbar Idol', '925 sterling silver Ram Darbar idol with Ram, Lakshman, Sita and Hanuman.', '/ranjana-jewellers/827124.jpg', 'Silver Idols'),
    ('Laddu Gopal Idol', 'Silver Laddu Gopal idol, finely detailed for daily pooja.', '/ranjana-jewellers/924223.png', 'Silver Idols'),
    ('Silver Ram Darbar Photo Frame', '999 silver embossed Ram Darbar frame for the home mandir.', '/ranjana-jewellers/758172.jpg', 'Mandir Decor'),
    ('Silver Shiva Family Frame', '999 silver embossed Shiva family frame in a wooden border.', '/ranjana-jewellers/753809.jpg', 'Mandir Decor'),
    ('Silver Kamdhenu Cow Article', '92.5 silver Kamdhenu cow and calf showpiece under a glass dome.', '/ranjana-jewellers/757746.jpg', 'Mandir Decor'),
    ('Silver Cow Shaped Kamandal', '92.5 silver cow-shaped kamandal with hand-carved detailing.', '/ranjana-jewellers/1064178.jpg', 'Mandir Decor'),
    ('Silver Pooja Glasses (Pair)', 'Set of two engraved 92.5 silver pooja glasses.', '/ranjana-jewellers/927194.png', 'Pooja Essentials'),
    ('Silver Conch Shankh', 'Silver and gold-toned engraved conch shankh for pooja rituals.', '/ranjana-jewellers/854574.jpg', 'Pooja Essentials'),
    ('Silver Water Bottle & Glass Set', '92.5 silver water bottle with 6 matching glasses.', '/ranjana-jewellers/976509.jpg', 'Pooja Essentials'),
    ('Tulasi Mala', '92.5 silver Tulasi mala, traditionally worn for daily worship.', '/ranjana-jewellers/779473.jpg', 'Rudraksh Mala')
) as p (name, description, image_url, category_name)
join categories cat on cat.name = p.category_name
on conflict do nothing;
