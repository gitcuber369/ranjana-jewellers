import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { createClient } from "@/lib/supabase/server";

export default async function TrendingSection() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("name, image_url")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (!products || products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading title="Trending Now" subtitle="Jewellery pieces everyone's eyeing right now" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.name as string}>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-pink-100">
              {product.image_url && (
                <Image src={product.image_url as string} alt={product.name as string} fill className="object-cover" />
              )}
            </div>
            <p className="mt-3 text-center text-sm text-ink/80">{product.name as string}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
