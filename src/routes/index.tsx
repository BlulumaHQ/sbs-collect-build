import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CATEGORY_ORDER,
  categorySlug,
  getAllProducts,
  getCategories,
  getPreorderProducts,
  getProductsByCategorySlug,
  getProductsByIds,
  getSeries,
  getVendors,
} from "@/commerce/adapter";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ProductGrid } from "@/components/commerce/ProductGrid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Secret Builders Society | Figures, Model Kits & Collector Goods" },
      {
        name: "description",
        content:
          "Explore figures, model kits, plush, blind boxes, hobby supplies, character goods and apparel in a modern collector-first storefront from Secret Builders Society.",
      },
      { property: "og:title", content: "Secret Builders Society | Figures, Model Kits & Collector Goods" },
      {
        property: "og:description",
        content:
          "Explore figures, model kits, plush, blind boxes, hobby supplies, character goods and apparel in a modern collector-first storefront from Secret Builders Society.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const HERO_IMAGES = [
  { src: "/images/products/figures-01-pop-up-parade-kirby.webp", alt: "POP UP PARADE Kirby" },
  {
    src: "/images/products/model-kits-02-one-piece-oro-jackson.webp",
    alt: "ONE PIECE Oro Jackson model kit",
  },
  { src: "/images/products/plush-03-oshi-no-ko-ai-plushie.webp", alt: "【OSHI NO KO】Ai plushie" },
  { src: "/images/products/blind-boxes-01-hazbin-hotel.webp", alt: "Hazbin Hotel blind box" },
];

const CATEGORY_IMAGE: Record<string, { src: string; alt: string }> = {
  Figures: {
    src: "/images/products/figures-02-nendoroid-bruce-lee.webp",
    alt: "Nendoroid Bruce Lee",
  },
  "Model Kits": {
    src: "/images/products/model-kits-01-nier-automata-2b-9s.webp",
    alt: "NieR:Automata 2B & 9S model kit",
  },
  Plush: {
    src: "/images/products/plush-01-kingdom-hearts-shadow.webp",
    alt: "Kingdom Hearts Shadow plush",
  },
  "Blind Boxes": {
    src: "/images/products/blind-boxes-03-my-melody-classic.webp",
    alt: "My Melody Classic blind box",
  },
  "Hobby Supplies": {
    src: "/images/products/hobby-supplies-01-mr-basic-tool-set.webp",
    alt: "Mr. Basic Tool Set",
  },
  "Character Goods": {
    src: "/images/products/character-goods-01-chainsaw-man-makima-stand.webp",
    alt: "Chainsaw Man Makima acrylic stand",
  },
  Apparel: {
    src: "/images/products/apparel-02-blue-archive-kazusa-hoodie.webp",
    alt: "Blue Archive Kazusa hoodie",
  },
};

function HomePage() {
  const featured = getProductsByIds([
    "figures-01",
    "figures-02",
    "model-kits-02",
    "plush-03",
    "blind-boxes-01",
    "hobby-supplies-01",
    "character-goods-01",
    "apparel-04",
  ]);
  const hobby = getProductsByCategorySlug("hobby-supplies");
  const preorders = getPreorderProducts();
  const series = getSeries().slice(0, 8);
  const vendors = getVendors();
  const categories = getCategories();
  const total = getAllProducts().length;

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="bg-charcoal pt-[64px] text-white md:pt-[78px]">
        <div className="container-sbs grid gap-10 py-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <SBSBuildRail index="00" label="Secret Builders Society / Collector Store" tone="light" />
            <h1 className="mt-7 max-w-[14ch] font-display text-[2.6rem] leading-[1.02] sm:text-5xl xl:text-6xl">
              Build the collection
              <br />
              you actually want.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              Figures, model kits, plush, blind boxes, hobby supplies, character goods, and apparel —
              organized for collectors, not clutter.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/shop"
                search={{ sort: "featured" }}
                className="micro border border-sbs-red bg-sbs-red px-7 py-4 text-white transition-colors duration-200 hover:bg-transparent"
              >
                Shop the collection
              </Link>
              <Link
                to="/preorders"
                className="micro border border-white/35 px-7 py-4 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-charcoal"
              >
                Browse preorders
              </Link>
            </div>
            <p className="micro mt-10 text-white/40">{total} demo products / 7 categories</p>
          </div>

          {/* Editorial product window — composed in CSS, not a merged image */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="col-span-1 flex flex-col gap-3 md:gap-4">
              <HeroTile image={HERO_IMAGES[0]!} className="aspect-[4/5]" />
              <HeroTile image={HERO_IMAGES[2]!} className="aspect-square" />
            </div>
            <div className="col-span-1 flex flex-col gap-3 pt-8 md:gap-4 md:pt-14">
              <HeroTile image={HERO_IMAGES[1]!} className="aspect-square" />
              <HeroTile image={HERO_IMAGES[3]!} className="hidden aspect-[4/5] sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — SHOP BY CATEGORY */}
      <section className="section-y border-b border-border">
        <div className="container-sbs">
          <SBSBuildRail index="01" label="Category Index" />
          <h2 className="mt-5 font-display text-3xl md:text-5xl">Shop by Category</h2>

          <div className="mt-10 grid gap-3 md:grid-cols-6 md:gap-4">
            {categories.slice(0, 2).map((category) => {
              const art = CATEGORY_IMAGE[category.name]!;
              return (
                <Link
                  key={category.slug}
                  to="/shop/$category"
                  params={{ category: category.slug }}
                  search={{ sort: "featured" }}
                  className="group relative flex flex-col justify-between border border-border bg-card transition-colors duration-200 hover:border-charcoal/40 md:col-span-3"
                >
                  <div className="h-[220px] shrink-0 bg-bone md:h-[280px]">
                    <img
                      src={art.src}
                      alt={art.alt}
                      loading="lazy"
                      className="h-full w-full object-contain p-6 transition-transform duration-200 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-end justify-between gap-4 border-t border-border px-5 py-5">
                    <div>
                      <span className="micro text-sbs-red">{category.count} products</span>
                      <h3 className="mt-2 font-display text-2xl md:text-4xl">{category.name}</h3>
                    </div>
                    <span className="micro text-muted-foreground">View</span>
                  </div>
                </Link>
              );
            })}

            {categories.slice(2).map((category, index) => {
              const art = CATEGORY_IMAGE[category.name]!;
              return (
                <Link
                  key={category.slug}
                  to="/shop/$category"
                  params={{ category: category.slug }}
                  search={{ sort: "featured" }}
                  className={`group flex flex-col border border-border bg-card transition-colors duration-200 hover:border-charcoal/40 ${
                    index >= 3 ? "md:col-span-3" : "md:col-span-2"
                  }`}
                >
                  <div className="h-[200px] shrink-0 bg-bone">
                    <img
                      src={art.src}
                      alt={art.alt}
                      loading="lazy"
                      className="h-full w-full object-contain p-5 transition-transform duration-200 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-border px-4 py-3">
                    <h3 className="font-display text-lg">{category.name}</h3>
                    <span className="micro text-muted-foreground">{category.count}</span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 3 — FEATURED PICKS */}
      <section className="section-y border-b border-border">
        <div className="container-sbs">
          <SBSBuildRail index="02" label="Featured Picks" />
          <h2 className="mt-5 font-display text-3xl md:text-5xl">Selected from the Catalogue</h2>
          <div className="mt-10">
            <ProductGrid products={featured} />
          </div>
        </div>
      </section>

      {/* SECTION 4 — BUILD BENCH */}
      <section className="bg-charcoal text-white">
        <div className="container-sbs section-y grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
          <div>
            <SBSBuildRail index="03" label="Build Bench" tone="light" />
            <h2 className="mt-5 font-display text-3xl md:text-4xl">Tools for the Build</h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              Paints, tools and airbrush support kept alongside the kits they belong with.
            </p>
            <Link
              to="/shop/$category"
              params={{ category: "hobby-supplies" }}
              search={{ sort: "featured" }}
              className="micro mt-8 inline-block border border-white/35 px-6 py-3 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-charcoal"
            >
              Shop hobby supplies
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {hobby.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — PREORDERS */}
      <section className="section-y border-b border-border">
        <div className="container-sbs">
          <SBSBuildRail index="04" label="Preorders" />
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl md:text-5xl">On the Horizon</h2>
            <Link
              to="/preorders"
              className="micro border border-charcoal px-5 py-3 transition-colors duration-200 hover:bg-charcoal hover:text-white"
            >
              View all preorders
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {preorders.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — SERIES */}
      <section className="section-y border-b border-border bg-bone-deep">
        <div className="container-sbs">
          <SBSBuildRail index="05" label="Series Index" />
          <h2 className="mt-5 font-display text-3xl md:text-5xl">Explore by Series</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {series.map((entry) => (
              <Link
                key={entry.name}
                to="/shop"
                search={{ sort: "featured", series: entry.name }}
                className="group flex flex-col border border-border bg-card transition-colors duration-200 hover:border-charcoal/40"
              >
                <div className="aspect-square bg-bone">
                  <img
                    src={entry.image}
                    alt={entry.name}
                    loading="lazy"
                    className="h-full w-full object-contain p-5 transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-3">
                  <span className="truncate text-sm font-medium">{entry.name}</span>
                  <span className="micro text-muted-foreground">{entry.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — BRANDS */}
      <section className="section-y">
        <div className="container-sbs">
          <SBSBuildRail index="06" label="Maker Index" />
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl md:text-5xl">Brands in the Demo Catalogue</h2>
            <Link
              to="/brands"
              className="micro border border-charcoal px-5 py-3 transition-colors duration-200 hover:bg-charcoal hover:text-white"
            >
              View all brands
            </Link>
          </div>
          <ul className="mt-10 grid gap-x-8 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor) => (
              <li key={vendor.name} className="border-b border-border">
                <Link
                  to="/shop"
                  search={{ sort: "featured", vendor: vendor.name }}
                  className="flex items-baseline justify-between gap-4 py-4 transition-colors duration-200 hover:text-sbs-red"
                >
                  <span className="font-display text-lg md:text-xl">{vendor.name}</span>
                  <span className="micro text-muted-foreground">{vendor.count}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="micro mt-8 text-muted-foreground">
            {CATEGORY_ORDER.map((c) => c).join(" · ")}
          </p>
        </div>
      </section>
    </>
  );
}

function HeroTile({
  image,
  className,
}: {
  image: { src: string; alt: string };
  className: string;
}) {
  return (
    <div className={`bg-bone ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        width={600}
        height={600}
        className="h-full w-full object-contain p-4 md:p-6"
      />
    </div>
  );
}

export { categorySlug };
