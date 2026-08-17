import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import ProductsGrid from "@/components/ProductsGrid";
import { createClient } from "@/lib/supabase/server";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const supabase = await createClient();

  // .or() takes a raw PostgREST filter-DSL string (not a bound parameter),
  // so commas/parens in user input could inject extra filter clauses.
  const safeQuery = q?.replace(/[,()]/g, "").trim();

  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from("categories").select("id, name").order("name"),
    safeQuery
      ? supabase
          .from("products")
          .select("id, name, description, image_url, categories(name)")
          .or(`name.ilike.%${safeQuery}%,description.ilike.%${safeQuery}%`)
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: [] }),
  ]);

  const items = (products ?? []).map((product) => ({
    id: product.id as string,
    name: product.name as string,
    description: product.description as string,
    image: product.image_url as string | null,
    category: (product.categories as unknown as { name: string } | null)?.name ?? "Uncategorised",
  }));

  return (
    <div>
      <NavBar categories={categories ?? []} />
      <section className="mx-auto max-w-[1600px] px-6 py-16">
        <SectionHeading
          title={q ? `Results for "${q}"` : "Search"}
          subtitle="Enquire directly on WhatsApp for pricing"
        />
        <ProductsGrid
          products={items}
          categories={[]}
          emptyTitle={q ? "No matches found" : "Search for something"}
          emptyDescription={
            q
              ? "Try a different search term, or browse our collections from the menu above."
              : "Type a product or category name into the search bar above."
          }
        />
      </section>
      <Footer />
    </div>
  );
}
