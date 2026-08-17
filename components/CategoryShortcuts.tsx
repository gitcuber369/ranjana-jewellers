import SectionHeading from "@/components/SectionHeading";
import IconRow from "@/components/IconRow";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

const FALLBACK_ICON = "/all-jewellery-l1.svg.svg";

export default async function CategoryShortcuts() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("name, icon_url")
    .order("name");

  const items = (categories ?? []).map((category) => ({
    icon: (category.icon_url as string | null) ?? FALLBACK_ICON,
    label: category.name as string,
    href: `/collections/${slugify(category.name as string)}`,
  }));

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading title="Find Your Perfect Match" subtitle="Shop by category" />
      <IconRow items={items} />
    </section>
  );
}
