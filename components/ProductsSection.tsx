import SectionHeading from "@/components/SectionHeading";
import ProductsGrid from "@/components/ProductsGrid";
import { createClient } from "@/lib/supabase/server";

export default async function ProductsSection() {
  const supabase = await createClient();

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("id, name, description, image_url, categories(name)")
      .order("created_at", { ascending: false }),
    supabase.from("categories").select("name").order("name"),
  ]);

  const items = (products ?? []).map((product) => ({
    id: product.id as string,
    name: product.name as string,
    description: product.description as string,
    image: product.image_url as string | null,
    category: (product.categories as unknown as { name: string } | null)?.name ?? "Uncategorised",
  }));

  return (
    <section className="mx-auto max-w-[1600px] px-6 py-16">
      <SectionHeading title="Shop Our Products" subtitle="Enquire directly on WhatsApp for pricing" />
      <ProductsGrid products={items} categories={(categories ?? []).map((c) => c.name as string)} />
    </section>
  );
}
