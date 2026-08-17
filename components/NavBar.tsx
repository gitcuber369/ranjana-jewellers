"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagnifyingGlass, WhatsappLogoIcon } from "@phosphor-icons/react";
import { slugify } from "@/lib/slugify";
import { generalWhatsAppLink } from "@/lib/whatsapp";

const SEARCH_SUGGESTIONS = [
  "Gold",
  "Diamond Rings",
  "Rakhi",
  "Rudraksh Mala",
  "Silver Payal",
  "Bridal Sets",
];

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex shrink-0 items-center gap-2 text-[15px] font-regular text-pink-900 hover:text-pink-700"
    >
      {children}
      <motion.span
        className="absolute -bottom-3 left-0 h-0.5 w-full bg-pink-700"
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        style={{ originX: hovered ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
    </Link>
  );
}

function AnimatedSearchPlaceholder() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SEARCH_SUGGESTIONS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="pointer-events-none absolute inset-0 flex items-center gap-1 text-sm text-ink/40">
      Search for
      <span className="overflow-hidden" style={{ perspective: 300 }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={SEARCH_SUGGESTIONS[index]}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="inline-block origin-bottom"
          >
            {SEARCH_SUGGESTIONS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export type NavCategory = { id: string; name: string };

export default function NavBar({ categories }: { categories: NavCategory[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Throttle live search-as-you-type: wait for a pause in typing before
  // navigating, instead of firing a request on every keystroke.
  useEffect(() => {
    const query = searchValue.trim();
    if (!query) return;

    const timeout = setTimeout(() => {
      const navigate = pathname === "/search" ? router.replace : router.push;
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchValue, pathname, router]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = searchValue.trim();
    if (query) router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 md:flex-nowrap md:justify-center md:gap-6 md:px-6 md:py-4">
        <Link href="/" className="order-1 shrink-0 md:pl-5">
          <Image
            src="/logo.png"
            alt="Ranjana Jewellers"
            width={600}
            height={300}
            className="h-9 w-auto md:h-12"
            priority
          />
        </Link>

        <a
          href={generalWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="order-2 flex shrink-0 items-center gap-1.5 rounded-full border border-pink-200 px-3 py-1.5 text-pink-900 md:order-3 md:flex-col md:gap-1 md:border-none md:px-0 md:py-0 md:pr-5"
        >
          <WhatsappLogoIcon size={20} weight="light" className="shrink-0 text-pink-900 md:size-8" />
          <span className="text-xs font-medium md:hidden">WhatsApp</span>
          <span className="hidden text-xs font-medium md:inline">Connect on WhatsApp</span>
        </a>

        <div className="order-3 w-full md:order-2 md:flex md:flex-1 md:justify-center">
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 md:max-w-xl"
          >
            <button type="submit" aria-label="Search" className="shrink-0">
              <MagnifyingGlass className="size-5 text-pink-900" />
            </button>
            <div className="relative h-6 flex-1">
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="h-6 w-full bg-transparent text-sm text-ink outline-none"
              />
              {!searchFocused && searchValue === "" && <AnimatedSearchPlaceholder />}
            </div>
          </form>
        </div>
      </div>

      <nav className="px-4 pt-2 pb-2 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8">
          <div className="flex items-center gap-6 overflow-x-auto pb-3 text-primary md:gap-8">
            <NavLink href="/">All Jewellery</NavLink>
            {categories.map((category) => (
              <NavLink key={category.id} href={`/collections/${slugify(category.name)}`}>
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
