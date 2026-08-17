import SectionHeading from "@/components/SectionHeading";
import ImageGrid from "@/components/ImageGrid";
import { createClient } from "@/lib/supabase/server";

export default async function OccasionGrid() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_sections")
    .select("title, image_url")
    .eq("section_key", "occasion_grid")
    .order("sort_order");

  const tiles = (data ?? []).map((row) => ({
    label: (row.title as string | null) ?? "",
    image: (row.image_url as string | null) ?? undefined,
  }));

  if (tiles.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading title="Ranjana World" subtitle="A companion for every occasion" />
      <ImageGrid layout="grid-2x2" tiles={tiles} />
    </section>
  );
}
