import { createClient } from "@/lib/supabase/server";

export default async function PromoBanner() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_sections")
    .select("title")
    .eq("section_key", "promo_banner")
    .order("sort_order")
    .limit(1)
    .maybeSingle();

  if (!data?.title) return null;

  return (
    <div className="relative w-full overflow-hidden bg-pink-700 py-3">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url(/jupiter.svg)",
          backgroundRepeat: "repeat",
          backgroundSize: "52px 52px",
        }}
      />
      <p className="relative text-center text-sm font-medium text-white">{data.title}</p>
    </div>
  );
}
