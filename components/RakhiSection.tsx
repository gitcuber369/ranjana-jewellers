import SectionHeading from "@/components/SectionHeading";
import ImageGrid from "@/components/ImageGrid";
import { createClient } from "@/lib/supabase/server";

export default async function RakhiSection() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("name, image_url, categories!inner(name)")
    .eq("categories.name", "Rakhi")
    .order("created_at", { ascending: false })
    .limit(5);

  if (!products || products.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1600px] px-6 py-16">
      <SectionHeading title="Rakhi Collection" subtitle="Celebrate the bond this Raksha Bandhan" />
      <ImageGrid
        layout="grid-5-photo"
        tiles={products.map((product) => ({
          label: product.name as string,
          image: (product.image_url as string | null) ?? undefined,
        }))}
      />
    </section>
  );
}
