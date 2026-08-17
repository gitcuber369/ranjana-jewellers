import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import ProductsGrid from "@/components/ProductsGrid";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const [{ data: categories }, { data: allCategories }] = await Promise.all([
    supabase.from("categories").select("id, name"),
    supabase.from("categories").select("id, name").order("name"),
  ]);

  const category = (categories ?? []).find((c) => slugify(c.name as string) === slug);
  if (!category) notFound();

  const { data: products } = await supabase
    .from("products")
    .select("id, name, description, image_url, categories(name)")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  const items = (products ?? []).map((product) => ({
    id: product.id as string,
    name: product.name as string,
    description: product.description as string,
    image: product.image_url as string | null,
    category: (product.categories as unknown as { name: string } | null)?.name ?? "Uncategorised",
  }));

  return (
    <div>
      <NavBar categories={allCategories ?? []} />
      <section className="mx-auto max-w-[1600px] px-6 py-16">
        <SectionHeading title={category.name as string} subtitle="Enquire directly on WhatsApp for pricing" />
        <ProductsGrid products={items} categories={[]} />
      </section>
      <Footer />
    </div>
  );
}
