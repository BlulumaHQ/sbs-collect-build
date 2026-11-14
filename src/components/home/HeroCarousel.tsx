import { useCallback, useEffect, useRef, useState } from "react";


interface Slide {
  image: string;
  alt: string;
  tone: "dark" | "light";
  background: string;
}

const SLIDES: Slide[] = [
  {
    image: "/images/uploads/20261114-levi-ackerman-preorder-spotlight-12.webp",
    alt: "Levi Ackerman preorder spotlight",
    tone: "dark",
    background: "#0b0b0c",
  },
  {
    image: "/images/uploads/20261114-levi-ackerman-preorder-spotlight-13.webp",
    alt: "Levi Ackerman preorder spotlight",
    tone: "dark",
    background: "#0b0b0c",
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
              <img
                src={slide.image}
                alt={slide.alt}
                loading={i === 0 ? "eager" : "lazy"}
                width={1920}
                height={1080}
                className={`absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[7000ms] ease-out ${
                  active ? "scale-[1.04]" : "scale-100"
                }`}
              />
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
