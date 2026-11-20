import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

/**
 * Hero slides. Images are textless product shots — all words and buttons are
 * code, so they stay sharp, readable on mobile and editable here.
 *   imageStyle "fade": photo on the slide colour, edges faded into it
 *   imageStyle "card": photo on a white card (for white-background shots)
 */
interface Slide {
  image: string;
  alt: string;
  tone: "dark" | "light";
  background: string;
  imageStyle: "fade" | "card";
  eyebrow: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  details?: string[];
  cta: { label: string; to: "/preorders" | "/shop" | "/gundam" };
}

const SLIDES: Slide[] = [
  {
    image: "/images/hero/levi-ackerman-hiya.webp",
    alt: "Hiya Toys Exquisite Basic Levi Ackerman 1/12 figure",
    tone: "light",
    background: "#ece7e6",
    imageStyle: "fade",
    eyebrow: "Pre-order",
    kicker: "Hiya Toys / Exquisite Basic Series",
    title: "Levi Ackerman",
    subtitle: "Attack on Titan",
    details: ["1/12 Scale · 5.7 in / 14.5 cm", "Pre-order deadline Dec 10"],
    cta: { label: "Shop pre-orders", to: "/preorders" },
  },
  {
    image: "/images/hero/godzilla-minus-one-petitrama.webp",
    alt: "MegaHouse Petitrama DX Godzilla Minus One repaint version diorama",
    tone: "dark",
    background: "#172026",
    imageStyle: "card",
    eyebrow: "Pre-order / Featured release",
    kicker: "MegaHouse / Petitrama DX",
    title: "Godzilla -1.0",
    subtitle: "Repaint Version",
    details: ["14.5 cm · Not released yet", "Pre-order deadline Dec 10"],
    cta: { label: "Shop pre-orders", to: "/preorders" },
  },
];

const INTERVAL = 6000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured campaigns"
      className="relative isolate w-full overflow-hidden"
      style={{ backgroundColor: SLIDES[index]!.background }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      tabIndex={0}
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
      <h1 className="sr-only">Featured campaigns</h1>
      <div className="relative h-[520px] w-full sm:h-[580px] lg:h-[640px]">
        {SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.image}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              style={{ backgroundColor: slide.background }}
            >
              <div className="container-sbs grid h-full grid-rows-[1fr_auto] items-center gap-4 py-6 lg:grid-cols-[1fr_1.15fr] lg:grid-rows-1 lg:gap-12 lg:py-0">
                {/* image — first on mobile, right on desktop */}
                <div className="relative h-full min-h-0 lg:order-2 lg:h-[82%]">
                  <div
                    className={`absolute inset-0 overflow-hidden ${
                      slide.imageStyle === "card" ? "bg-white" : ""
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      loading={i === 0 ? "eager" : "lazy"}
                      className={`h-full w-full object-contain transition-transform duration-[7000ms] ease-out ${
                        slide.imageStyle === "card" ? "p-4 lg:p-8" : ""
                      } ${active ? "scale-[1.04]" : "scale-100"}`}
                      style={
                        slide.imageStyle === "fade"
                          ? {
                              maskImage:
                                "radial-gradient(ellipse 70% 75% at 50% 50%, #000 60%, transparent 100%)",
                              WebkitMaskImage:
                                "radial-gradient(ellipse 70% 75% at 50% 50%, #000 60%, transparent 100%)",
                            }
                          : undefined
                      }
                    />
                  </div>
                </div>

                {/* copy */}
                <div
                  className={`pb-16 lg:order-1 lg:pb-0 ${
                    slide.tone === "dark" ? "text-white" : "text-charcoal"
                  }`}
                >
                  <p
                    className={`micro inline-block border px-3 py-1.5 ${
                      slide.tone === "dark" ? "border-white/40" : "border-charcoal/40"
                    }`}
                  >
                    {slide.eyebrow}
                  </p>
                  {slide.kicker ? (
                    <p
                      className={`micro mt-4 hidden sm:block ${
                        slide.tone === "dark" ? "text-white/70" : "text-charcoal/70"
                      }`}
                    >
                      {slide.kicker}
                    </p>
                  ) : null}
                  {i === 0 ? (
                    <h2 className="mt-3 font-display text-[34px] uppercase leading-[0.95] sm:text-5xl lg:text-[64px]">
                      {slide.title}
                    </h2>
                  ) : (
                    <p className="mt-3 font-display text-[34px] uppercase leading-[0.95] sm:text-5xl lg:text-[64px]">
                      {slide.title}
                    </p>
                  )}
                  {slide.subtitle ? (
                    <p
                      className={`mt-2 text-base italic lg:text-xl ${
                        slide.tone === "dark" ? "text-white/80" : "text-charcoal/75"
                      }`}
                    >
                      {slide.subtitle}
                    </p>
                  ) : null}
                  {slide.details?.length ? (
                    <ul
                      className={`mt-4 hidden space-y-1 text-sm sm:block ${
                        slide.tone === "dark" ? "text-white/75" : "text-charcoal/75"
                      }`}
                    >
                      {slide.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  ) : null}
                  <Link
                    to={slide.cta.to}
                    tabIndex={active ? 0 : -1}
                    className={`micro mt-5 inline-flex items-center gap-3 px-6 py-3.5 transition-colors duration-200 lg:mt-7 ${
                      slide.tone === "dark"
                        ? "bg-white text-charcoal hover:bg-sbs-red hover:text-white"
                        : "bg-charcoal text-white hover:bg-sbs-red"
                    }`}
                  >
                    {slide.cta.label} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* controls */}
        <div className="container-sbs pointer-events-none absolute inset-x-0 bottom-7 flex items-center justify-between">
          <div className="pointer-events-auto flex gap-2.5">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.image}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={`h-1.5 w-10 transition-colors duration-200 ${
                  i === index
                    ? "bg-sbs-red"
                    : SLIDES[index]!.tone === "light"
                      ? "bg-charcoal/25 hover:bg-charcoal/50"
                      : "bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <div className="pointer-events-auto flex gap-2">
            {(["prev", "next"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
                onClick={() => go(index + (dir === "prev" ? -1 : 1))}
                className={`flex h-11 w-11 items-center justify-center border text-lg transition-colors duration-200 ${
                  SLIDES[index]!.tone === "light"
                    ? "border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-white"
                    : "border-white/35 text-white hover:bg-white hover:text-charcoal"
                }`}
              >
                {dir === "prev" ? "‹" : "›"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
