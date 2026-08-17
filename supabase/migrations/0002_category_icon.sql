-- Run this in the Supabase SQL Editor after 0001_init.sql.
-- Adds an optional icon/cover image per category, used by the navbar,
-- CategoryShortcuts, and the new /collections/[slug] category page.

alter table categories add column if not exists icon_url text;
