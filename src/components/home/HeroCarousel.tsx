import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import type { CommerceProduct } from "@/types/commerce";
import { formatPrice } from "@/commerce/format";
import { FramedImage } from "@/components/commerce/FramedImage";

/**
 * Home hero — three coded slides (design picks 1A / 2B / 3B). Photos are only
 * backgrounds; every word and button is code.
 *   brand    — shop interior + Unity Tattoo split, "The Secret's Out."
 *   hot      — shelf photo, live in-stock cards (Shopify tag `hot`, else the shop's own stock)
 *   preorder — Levi + Godzilla cards on navy
 */
type SlideKind = "brand" | "hot" | "preorder";
const SLIDES: { kind: SlideKind; background: string }[] = [
  { kind: "brand", background: "#141414" },
  { kind: "hot", background: "#111111" },
  { kind: "preorder", background: "#172026" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="micro self-start border border-white/45 px-3.5 py-2 text-white">{children}</p>
  );
}

function Cta({
  to,
  label,
  variant,
  active,
}: {
  to: "/gundam" | "/guides" | "/shop" | "/preorders";
  label: string;
  variant: "red" | "white" | "ghost";
  active: boolean;
}) {
  const style =
    variant === "red"
      ? "bg-sbs-red text-white hover:bg-sbs-red-deep"
      : variant === "white"
        ? "bg-white text-charcoal hover:bg-sbs-red hover:text-white"
        : "border border-white/60 text-white hover:bg-white hover:text-charcoal";
  return (
    <Link
      to={to}
      tabIndex={active ? 0 : -1}
      className={`micro inline-flex min-h-[48px] items-center gap-3 px-6 transition-colors duration-200 lg:min-h-[52px] lg:px-7 ${style}`}
    >
      {label} <span aria-hidden="true">→</span>
    </Link>
  );
}

function BrandSlide({ active, first }: { active: boolean; first: boolean }) {
  const Title = first ? "h2" : "p";
  return (
    <>
      <img
        src="/images/hero/shop-interior.webp"
        alt=""
        loading={first ? "eager" : "lazy"}
        className="absolute inset-0 h-full w-full object-cover object-[60%_40%] lg:right-auto lg:w-[57.3%]"
      />
      <img
        src="/images/hero/tattoo-interior.webp"
        alt=""
        loading="lazy"
        className="absolute inset-y-0 right-0 hidden h-full w-[42.5%] object-cover lg:block"
      />
      <div className="absolute inset-y-0 left-[57.3%] hidden w-1 bg-sbs-red lg:block" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,16,0.92)_0%,rgba(16,16,16,0.78)_36%,rgba(16,16,16,0.3)_62%,rgba(16,16,16,0.12)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(16,16,16,0.55)_0%,rgba(16,16,16,0.85)_100%)]" />
      <p className="micro absolute bottom-24 left-[calc(57.3%+20px)] hidden bg-black/70 px-2.5 py-1.5 text-white lg:block">
        × Unity Tattoo
      </p>
      <div className="container-sbs relative flex h-full items-center pb-10">
        <div className="flex max-w-[640px] flex-col gap-5 lg:gap-6">
          <Eyebrow>
            Gunpla &amp; Collectibles
            <span className="hidden sm:inline"> · Commercial Drive, Vancouver</span>
          </Eyebrow>
          <Title className="font-display text-[44px] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-6xl lg:text-[84px]">
            The Secret&apos;s Out.
          </Title>
          <p className="max-w-[560px] text-base leading-relaxed text-white/85 lg:text-xl">
            Vancouver&apos;s builders&apos; society — Gunpla, figures and tools, hand-picked by a
            25-year toy-trade veteran. Inside a working tattoo shop.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Cta to="/gundam" label="Shop Gunpla" variant="red" active={active} />
            <Cta to="/guides" label="Beginner's Guide" variant="ghost" active={active} />
          </div>
        </div>
      </div>
    </>
  );
}

function HotSlide({ active, hot }: { active: boolean; hot: CommerceProduct[] }) {
  return (
    <>
      <img
        src="/images/hero/gunpla-shelf.webp"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,14,14,0.9)_0%,rgba(14,14,14,0.75)_45%,rgba(14,14,14,0.45)_100%)]" />
      <div className="container-sbs relative flex h-full flex-col justify-center gap-6 pb-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:pb-0">
        <div className="flex max-w-[520px] flex-col gap-4 lg:gap-5">
          <Eyebrow>In stock now</Eyebrow>
          <p className="font-display text-[40px] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-6xl lg:text-[72px]">
            On Our Shelf
          </p>
          <p className="hidden text-lg leading-relaxed text-white/85 sm:block">
            Picked by the shop — ready to ship this Friday or grab in store this weekend.
          </p>
          <div className="pt-1">
            <Cta to="/shop" label="Shop in-stock" variant="red" active={active} />
          </div>
        </div>
        <ul className="flex gap-3 lg:gap-4">
          {hot.map((p, i) => (
            <li key={p.id} className={i === 2 ? "hidden sm:block" : undefined}>
              <Link
                to="/product/$handle"
                params={{ handle: p.handle }}
                tabIndex={active ? 0 : -1}
                className="group flex w-[150px] flex-col bg-white sm:w-[200px] lg:w-[248px]"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-white">
                  <FramedImage
                    src={p.image}
                    frame={p.frame}
                    alt={p.title}
                    className="transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col gap-1.5 border-t border-border px-3 pb-3 pt-2.5 lg:px-4 lg:pb-4">
                  <p className="micro-sm clamp-1 text-muted-foreground">{p.vendor}</p>
                  <p className="clamp-2 h-[2.5rem] text-[13px] font-medium leading-snug text-charcoal lg:text-[15px]">
                    {p.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base font-semibold text-charcoal lg:text-lg">
                      {formatPrice(p.price, p.currency)}
                    </span>
                    <span className="micro-sm hidden border border-emerald-700 px-1.5 py-0.5 text-emerald-700 sm:inline">
                      In stock
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function PreorderSlide({ active }: { active: boolean }) {
  return (
    <div className="container-sbs relative flex h-full flex-col justify-center gap-6 pb-14 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-12 lg:pb-0">
      <div className="flex gap-3 lg:gap-5">
        <figure className="relative h-[150px] w-[130px] bg-[#ece7e6] sm:h-[220px] sm:w-[190px] lg:h-[500px] lg:w-[340px]">
          <img
            src="/images/hero/levi.webp"
            alt="Hiya Toys Exquisite Basic Levi Ackerman 1/12 figure"
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />
          <figcaption className="micro-sm absolute bottom-3.5 left-4 hidden bg-white/80 px-1.5 py-0.5 text-charcoal sm:block">
            Levi Ackerman · 1/12
          </figcaption>
        </figure>
        <figure className="relative h-[150px] w-[150px] bg-white sm:h-[220px] sm:w-[220px] lg:h-[500px] lg:w-[380px]">
          <img
            src="/images/hero/godzilla.webp"
            alt="MegaHouse Petitrama DX Godzilla Minus One repaint version diorama"
            loading="lazy"
            className="h-full w-full object-contain p-3 sm:pb-8 lg:p-6 lg:pb-12"
          />
          <figcaption className="micro-sm absolute bottom-3.5 left-4 hidden bg-white/80 px-1.5 py-0.5 text-charcoal sm:block">
            Godzilla -1.0 · Petitrama DX
          </figcaption>
        </figure>
      </div>
      <div className="flex max-w-[520px] flex-col gap-4 lg:gap-5">
        <Eyebrow>Pre-order · Closing Dec 10</Eyebrow>
        <p className="font-display text-[36px] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-5xl lg:text-[68px]">
          Two Legends.
          <br />
          One Deadline.
        </p>
        <div className="hidden flex-col gap-1.5 text-base leading-relaxed text-white/80 sm:flex">
          <p>
            <strong className="font-semibold text-white">Levi Ackerman</strong> — Hiya Toys
            Exquisite Basic, 1/12 scale
          </p>
          <p>
            <strong className="font-semibold text-white">Godzilla -1.0</strong> — MegaHouse
            Petitrama DX, repaint
          </p>
        </div>
        <div className="pt-1">
          <Cta to="/preorders" label="Shop pre-orders" variant="white" active={active} />
        </div>
      </div>
    </div>
  );
}

const INTERVAL = 6000;

export function HeroCarousel({ hot }: { hot: CommerceProduct[] }) {
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
      <div className="relative h-[560px] w-full sm:h-[600px] lg:h-[680px]">
        {SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.kind}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              style={{ backgroundColor: slide.background }}
            >
              {slide.kind === "brand" ? (
                <BrandSlide active={active} first={i === 0} />
              ) : slide.kind === "hot" ? (
                <HotSlide active={active} hot={hot} />
              ) : (
                <PreorderSlide active={active} />
              )}
            </div>
          );
        })}

        {/* controls */}
        <div className="container-sbs pointer-events-none absolute inset-x-0 bottom-7 flex items-center justify-between">
          <div className="pointer-events-auto flex gap-2.5">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.kind}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={`h-1.5 w-10 transition-colors duration-200 ${
                  i === index ? "bg-sbs-red" : "bg-white/30 hover:bg-white/60"
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
                className={`flex h-11 w-11 items-center justify-center border text-lg transition-colors duration-200 ${"border-white/35 text-white hover:bg-white hover:text-charcoal"}`}
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
