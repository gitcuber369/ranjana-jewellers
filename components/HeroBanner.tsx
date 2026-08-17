import HeroCarousel from "@/components/HeroCarousel";
import { createClient } from "@/lib/supabase/server";

export default async function HeroBanner() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_sections")
    .select("id, image_url")
    .eq("section_key", "hero")
    .order("sort_order");

  const slides = (data ?? [])
    .filter((row) => row.image_url)
    .map((row) => ({ id: row.id as string, src: row.image_url as string }));

  if (slides.length === 0) return null;

  return <HeroCarousel slides={slides} />;
}
