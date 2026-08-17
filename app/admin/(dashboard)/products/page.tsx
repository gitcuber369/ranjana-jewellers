import { createClient } from "@/lib/supabase/server";
import { QueryError } from "@/components/admin/query-error";
import { ProductsView } from "./products-view";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("id, name").order("name");

  let query = supabase
    .from("products")
    .select("id, name, description, image_url, category_id, created_at, is_featured, categories(name)")
    .order("created_at", { ascending: false });

  if (q) query = query.ilike("name", `%${q}%`);
  if (category) query = query.eq("category_id", category);

  const { data, error } = await query;

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">Manage your jewelry catalog and product information.</p>
        </div>
        <QueryError
          title="Unable to load products"
          description="Something went wrong while loading your catalog."
          retryHref="/admin/products"
        />
      </div>
    );
  }

  const products = (data ?? []).map((product) => ({
    id: product.id as string,
    name: product.name as string,
    description: product.description as string,
    categoryId: product.category_id as string | null,
    categoryName: (product.categories as unknown as { name: string } | null)?.name ?? null,
    imageUrl: product.image_url as string | null,
    createdAt: product.created_at as string,
    isFeatured: product.is_featured as boolean,
  }));

  return <ProductsView products={products} categories={categories ?? []} isFiltered={Boolean(q || category)} />;
}
