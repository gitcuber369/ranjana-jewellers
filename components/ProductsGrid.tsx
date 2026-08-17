"use client";

import { useState } from "react";
import Image from "next/image";
import { PackageIcon, ShareNetworkIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { enquiryWhatsAppLink, productShareLink } from "@/lib/whatsapp";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string | null;
  category: string;
};

export default function ProductsGrid({
  products,
  categories,
  emptyTitle = "No products yet",
  emptyDescription = "We're adding new pieces to this collection soon. Check back shortly.",
}: {
  products: Product[];
  categories: string[];
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                active === category ? "bg-pink-700 text-white" : "bg-pink-50 text-ink/70 hover:bg-pink-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-pink-200 py-20 text-center">
          <PackageIcon size={40} className="text-pink-300" />
          <p className="font-serif text-xl text-ink">{emptyTitle}</p>
          <p className="max-w-xs text-sm text-ink/60">{emptyDescription}</p>
        </div>
      ) : (
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
        {visible.map(({ id, name, image, category, description }) => (
          <div key={id} className="flex h-full flex-col overflow-hidden rounded-lg border border-pink-100 bg-white">
            <div className="relative aspect-[4/5] bg-pink-100">
              {image && <Image src={image} alt={name} fill className="object-cover" />}
            </div>
            <div className="flex flex-1 flex-col p-3 sm:p-5">
              <div className="flex-1">
                <span className="w-fit rounded-full bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-700">
                  {category}
                </span>
                <p className="mt-2 text-sm font-medium text-ink sm:text-base">{name}</p>
                <p className="mt-1 line-clamp-2 text-xs text-ink/60 sm:text-sm">{description}</p>
              </div>
              <div className="mt-3 flex items-center gap-1.5 sm:mt-4 sm:gap-2">
                <a
                  href={enquiryWhatsAppLink(name, image)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-pink-700 py-2 text-xs font-medium whitespace-nowrap text-white hover:bg-pink-800 sm:gap-2 sm:py-2.5 sm:text-sm"
                >
                  <WhatsappLogoIcon size={16} className="shrink-0 sm:size-[18px]" />
                  Enquire Now
                </a>
                <a
                  href={productShareLink({ name, description, image })}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share ${name}`}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-pink-200 text-pink-700 hover:bg-pink-50 sm:size-10"
                >
                  <ShareNetworkIcon size={16} className="sm:size-[18px]" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </>
  );
}
