import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function DarkPromoBanner() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_sections")
    .select("title, subtitle, image_url")
    .eq("section_key", "dark_promo")
    .order("sort_order");

  if (!data || data.length === 0) return null;

  const [heading, ...tiles] = data;
  const eyebrow = heading.subtitle as string | null;
  const title = heading.title as string | null;

  return (
    <section className="relative overflow-hidden bg-pink-950 py-12 text-white">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url(/jupiter.svg)",
          backgroundRepeat: "repeat",
          backgroundSize: "52px 52px",
        }}
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 md:flex-row">
        <div className="shrink-0 text-center md:w-1/3 md:text-left">
          {eyebrow && <p className="text-sm tracking-wide text-pink-300 uppercase">{eyebrow}</p>}
          {title && <h3 className="mt-2 font-serif text-2xl sm:text-4xl">{title}</h3>}
        </div>

        {tiles.length > 0 && (
          <div className="grid w-full grid-cols-2 gap-4 md:w-2/3">
            {tiles.map((tile, i) => (
              <div key={i}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-pink-900">
                  {tile.image_url && (
                    <Image src={tile.image_url as string} alt={(tile.title as string) ?? ""} fill className="object-cover" />
                  )}
                </div>
                {tile.title && <p className="mt-2 text-center text-sm text-pink-200">{tile.title as string}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
