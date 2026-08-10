import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SBSBuildRail } from "@/components/SBSBuildRail";

interface Slide {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  primary: { label: string; category: string };
}

const SLIDES: Slide[] = [
  {
    image: "/images/hero/hero-01-zoids.jpg",
    alt: "Black and gunmetal mechanical beast model kit under dramatic studio light",
    eyebrow: "Mech & Model Kits",
    title: "Assemble the apex predator.",
    body: "Precision mech kits, articulated frames and the tools to finish them properly — curated for builders who care about panel lines.",
    primary: { label: "Shop model kits", category: "model-kits" },
  },
  {
    image: "/images/hero/hero-02-spacecraft.jpg",
    alt: "White and grey sci-fi spacecraft scale model kit on a display stand",
    eyebrow: "Scale & Sci-Fi",
    title: "Every panel line matters.",
    body: "Scale kits, finishing supplies and display pieces selected for collectors who build for the shelf, not the box.",
    primary: { label: "Shop hobby supplies", category: "hobby-supplies" },
  },
];

const INTERVAL = 6500;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative isolate overflow-hidden bg-charcoal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        const end = e.changedTouches[0]?.clientX ?? null;
        if (start === null || end === null) return;
        if (Math.abs(end - start) > 48) go(index + (end < start ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="relative h-[460px] w-full sm:h-[540px] lg:h-[640px]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.image}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              width={1920}
              height={1088}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              className="h-full w-full object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-0">
              <div className="container-sbs flex h-full items-center">
                <div className={`max-w-xl text-white ${i === index ? "animate-slide-in" : ""}`}>
                  <SBSBuildRail
                    index={String(i + 1).padStart(2, "0")}
                    label={slide.eyebrow}
                    tone="light"
                  />
                  <h1 className="mt-6 font-display text-[2.4rem] leading-[1.03] sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
                    {slide.body}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to="/shop/$category"
                      params={{ category: slide.primary.category }}
                      search={{ sort: "featured" }}
                      className="btn-primary-sbs"
                    >
                      {slide.primary.label}
                    </Link>
                    <Link
                      to="/preorders"
                      className="micro inline-flex items-center justify-center border border-white/40 px-6 py-3.5 text-white transition-colors duration-200 hover:bg-white hover:text-charcoal"
                    >
                      Browse preorders
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-0 right-0">
          <div className="container-sbs flex items-center gap-4">
            <div className="flex gap-2">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show slide ${i + 1}: ${slide.eyebrow}`}
                  aria-current={i === index}
                  className={`h-1 w-12 transition-colors duration-200 ${
                    i === index ? "bg-sbs-red" : "bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="micro border border-white/35 px-4 py-2 text-white hover:bg-white hover:text-charcoal"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="micro border border-white/35 px-4 py-2 text-white hover:bg-white hover:text-charcoal"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
