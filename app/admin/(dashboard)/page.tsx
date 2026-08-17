import { FolderX, ImageOff, Package, Tags } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: productCount },
    { count: categoryCount },
    { count: missingImageCount },
    { count: uncategorizedCount },
    { data: categoryBreakdown },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }).is("image_url", null),
    supabase.from("products").select("*", { count: "exact", head: true }).is("category_id", null),
    supabase.from("categories").select("name, products(count)").order("name"),
  ]);

  const kpis = [
    { label: "Total Products", value: productCount ?? 0, icon: Package },
    { label: "Categories", value: categoryCount ?? 0, icon: Tags },
    { label: "Missing Images", value: missingImageCount ?? 0, icon: ImageOff },
    { label: "Uncategorized", value: uncategorizedCount ?? 0, icon: FolderX },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your product catalog.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tracking-tight">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {categoryBreakdown && categoryBreakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Products by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categoryBreakdown.map((category) => {
              const count = (category.products as unknown as { count: number }[])[0]?.count ?? 0;
              return (
                <div key={category.name} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{category.name}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
