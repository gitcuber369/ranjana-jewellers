"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

export type HeroSlide = { id: string; src: string };

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const splide = new Splide(trackRef.current, {
      type: "loop",
      perPage: 1,
      padding: "5rem",
      gap: "0.5rem",
      autoplay: true,
      interval: 4000,
      arrows: false,
      pagination: true,
      height: "500px",
      drag: true,
      rewind: true,
      breakpoints: {
        768: { padding: "2rem", height: "320px" },
        480: { padding: "1rem", height: "260px" },
      },
    });
    splide.mount();
    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <section className="bg-white pt-2">
      <div ref={trackRef} className="splide">
        <div className="splide__track">
          <ul className="splide__list">
            {slides.map((slide, i) => (
              <li key={slide.id} className="splide__slide">
                <div className="relative h-full w-full overflow-hidden gap-0 bg-pink-50 rounded-lg">
                  <Image src={slide.src} alt="" fill className="object-cover" priority={i === 0} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
