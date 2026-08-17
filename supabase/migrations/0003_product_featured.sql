-- Run this in the Supabase SQL Editor after 0002_category_icon.sql.
-- Lets admin mark products as "Trending" on the homepage.

alter table products add column if not exists is_featured boolean not null default false;
