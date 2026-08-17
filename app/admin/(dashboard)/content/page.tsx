import { createClient } from "@/lib/supabase/server";
import { QueryError } from "@/components/admin/query-error";
import { ContentView } from "./content-view";

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("site_sections")
    .select("id, section_key, title, subtitle, image_url, link_href, sort_order")
    .order("section_key")
    .order("sort_order");

  if (section) query = query.eq("section_key", section);

  const { data, error } = await query;

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Content</h1>
          <p className="text-sm text-muted-foreground">Manage editorial blocks shown on the landing page.</p>
        </div>
        <QueryError
          title="Unable to load content"
          description="Something went wrong while loading content blocks."
          retryHref="/admin/content"
        />
      </div>
    );
  }

  const sections = (data ?? []).map((row) => ({
    id: row.id as string,
    sectionKey: row.section_key as string,
    title: row.title as string | null,
    subtitle: row.subtitle as string | null,
    imageUrl: row.image_url as string | null,
    linkHref: row.link_href as string | null,
    sortOrder: row.sort_order as number,
  }));

  return <ContentView sections={sections} isFiltered={Boolean(section)} />;
}
