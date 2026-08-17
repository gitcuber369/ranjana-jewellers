import { createClient } from "@/lib/supabase/server";
import { QueryError } from "@/components/admin/query-error";
import { CategoriesView } from "./categories-view";

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("id, name, products(count)").order("name");

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground">Organize your jewelry catalog.</p>
        </div>
        <QueryError
          title="Unable to load categories"
          description="Something went wrong while loading your categories."
          retryHref="/admin/categories"
        />
      </div>
    );
  }

  const categories = (data ?? []).map((category) => ({
    id: category.id as string,
    name: category.name as string,
    productCount: (category.products as unknown as { count: number }[])[0]?.count ?? 0,
  }));

  return <CategoriesView categories={categories} />;
}
