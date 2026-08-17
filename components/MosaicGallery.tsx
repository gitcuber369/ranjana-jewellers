import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { createClient } from "@/lib/supabase/server";

function Tile({ src, className }: { src: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-pink-100 ${className ?? ""}`}>
      <Image src={src} alt="" fill className="object-cover" />
    </div>
  );
}

export default async function MosaicGallery() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_sections")
    .select("image_url")
    .eq("section_key", "mosaic_gallery")
    .order("sort_order")
    .limit(7);

  const images = (data ?? []).map((row) => row.image_url as string | null).filter(Boolean) as string[];

  // Layout needs 6 outer tiles + 1 center tile (7th, spans both rows).
  if (images.length < 7) return null;
  const [t1, t2, t3, t4, t5, t6, center] = images;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading title="The Rakhi Ritual" subtitle="Moments of love, tied together" />
      <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <Tile src={t1} className="aspect-square" />
        <Tile src={t2} className="aspect-square" />
        <Tile src={center} className="row-span-2" />
        <Tile src={t3} className="aspect-square" />
        <Tile src={t4} className="aspect-square" />
        <Tile src={t5} className="aspect-square" />
        <Tile src={t6} className="aspect-square" />
      </div>
    </section>
  );
}
