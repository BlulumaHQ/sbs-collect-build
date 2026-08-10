import { useCallback, useEffect, useRef, useState } from "react";


interface Slide {
  image: string;
  alt: string;
  eyebrow: string;
  title: string[];
  body: string;
  tone: "dark" | "light";
  background: string;
  /** Render the artwork as a contained right-side layer instead of a full-bleed cover crop. */
  artworkLayer?: boolean;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
}


const SLIDES: Slide[] = [
  {
    image: "/images/hero/hero-gundam.webp",
    alt: "Gundam style mecha model kit campaign artwork",
    eyebrow: "Gundam / Model Kit Feature",
    title: ["Built for the workbench.", "Made for the shelf."],
    body: "Explore Gundam and model kits for builders who care about every panel line, pose and finishing detail.",
    tone: "dark",
    background: "#0d1017",

    primary: { label: "Shop model kits", to: "/shop/model-kits" },
    secondary: { label: "Explore Gundam", to: "/shop/model-kits?subcategory=Gunpla" },
  },
  {
    image: "/images/hero/hero-zoids.webp",
    alt: "Mechanical beast model kit campaign artwork on a black background",
    eyebrow: "Preorder Spotlight",
    title: ["Big builds are", "worth the wait."],
    body: "Browse upcoming collector releases and reserve the kits you do not want to miss.",
    tone: "dark",
    background: "#0b0b0c",
    primary: { label: "View preorders", to: "/preorders" },
    secondary: { label: "Shop model kits", to: "/shop/model-kits" },
  },
  {
    image: "/images/hero/hero-spacecraft.webp",
    alt: "Blue and red spacecraft model kit on a light grey background",
    eyebrow: "Sci-Fi Model Kits",
    title: ["Every detail", "earns its place."],
    body: "From character kits to detailed machines, discover builds made to move from the bench to the display shelf.",
    tone: "light",
    background: "#EDEDED",
    primary: { label: "Explore model kits", to: "/shop/model-kits" },
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
      <div className="relative h-[520px] w-full sm:h-[580px] lg:h-[640px]">
        {SLIDES.map((slide, i) => {
          const active = i === index;
          const light = slide.tone === "light";
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
              <div
                className="absolute inset-0"
                style={{
                  background: light
                    ? "linear-gradient(90deg, rgba(230,228,224,0.97) 0%, rgba(230,228,224,0.86) 46%, rgba(230,228,224,0.15) 78%)"
                    : slide.artworkLayer
                      ? "linear-gradient(90deg, rgba(12,12,13,0.96) 0%, rgba(12,12,13,0.82) 34%, rgba(12,12,13,0.05) 56%)"
                      : "linear-gradient(90deg, rgba(12,12,13,0.94) 0%, rgba(12,12,13,0.78) 46%, rgba(12,12,13,0.15) 82%)",
                }}
              />

              <div className="container-sbs relative flex h-full items-center">
                <div className="max-w-[640px] py-12">
                  <p
                    className={`micro ${light ? "text-sbs-red" : "text-white/70"}`}
                  >
                    {slide.eyebrow}
                  </p>
                  <h1
                    className={`mt-6 font-display text-[38px] leading-[1.05] sm:text-[46px] lg:text-[62px] ${
                      light ? "text-charcoal" : "text-white"
                    }`}
                  >
                    {slide.title[0]}
                    <br />
                    {slide.title[1]}
                  </h1>
                  <p
                    className={`mt-6 max-w-xl text-[16px] leading-relaxed lg:text-[17px] ${
                      light ? "text-charcoal/75" : "text-white/75"
                    }`}
                  >
                    {slide.body}
                  </p>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <a href={slide.primary.to} className="btn-primary-sbs">
                      {slide.primary.label}
                    </a>
                    {slide.secondary ? (
                      <a
                        href={slide.secondary.to}
                        className={`micro inline-flex items-center border px-6 py-3.5 transition-colors duration-200 ${
                          light
                            ? "border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
                            : "border-white/50 text-white hover:bg-white hover:text-charcoal"
                        }`}
                      >
                        {slide.secondary.label}
                      </a>
                    ) : null}
                  </div>
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
