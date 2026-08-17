import Image from "next/image";
import type { ReactNode } from "react";

type Item = { icon: string | ReactNode; label: string; href?: string };

export default function IconRow({ items }: { items: Item[] }) {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      {items.map(({ icon, label, href }) => (
        <a
          key={label}
          href={href ?? "#"}
          className="flex w-20 flex-col items-center gap-2 text-center"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-pink-50 text-pink-700">
            {typeof icon === "string" ? <Image src={icon} alt="" width={24} height={24} /> : icon}
          </span>
          <span className="text-sm text-ink/80">{label}</span>
        </a>
      ))}
    </div>
  );
}
