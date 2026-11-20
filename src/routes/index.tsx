import { createFileRoute, Link } from "@tanstack/react-router";
import {
  getAllProducts,
  getVisibleCategories,
  getNewArrivals,
  getPreorderProducts,
  getFeaturedProducts,
  getSaleProducts,
} from "@/commerce/adapter";
import { CATEGORY_ARTWORK } from "@/commerce/artwork";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { RecentlyViewed } from "@/components/commerce/RecentlyViewed";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { InfoStrip } from "@/components/home/InfoStrip";
import { PopularBrands } from "@/components/home/PopularBrands";
import { StoreInfo } from "@/components/home/StoreInfo";
import { GundamGrades } from "@/components/home/GundamGrades";
import { BeginnersCorner } from "@/components/home/BeginnersCorner";
import { Newsletter } from "@/components/home/Newsletter";

const HOME_SERIES: {
  name: string;
  series: string;
  keys: string[];
  to: "/shop" | "/gundam";
  override?: string;
  fallback: string;
}[] = [
  {
    name: "Gundam (Gunpla)",
    override: "/images/collections/sbs-gundam.webp",
    series: "Gundam",
    keys: ["gundam", "gunpla"],
    to: "/gundam",
    fallback: "/images/categories/model-kits.webp",
  },
  {
    name: "Pokémon",
    override: "/images/collections/sbs-pokemon.webp",
    series: "Pokémon",
    keys: ["pokémon", "pokemon"],
    to: "/shop",
    fallback: "/images/collections/pokemon.jpg",
  },
  {
    name: "One Piece",
    override: "/images/collections/sbs-one-piece.webp",
    series: "ONE PIECE",
    keys: ["one piece"],
    to: "/shop",
    fallback: "/images/collections/one-piece.jpg",
  },
  {
    name: "Dragon Ball",
    override: "/images/collections/sbs-dragon-ball.webp",
    series: "Dragon Ball",
    keys: ["dragon ball"],
    to: "/shop",
    fallback: "/images/categories/figures.webp",
  },
  {
    name: "Naruto",
    override: "/images/collections/sbs-naruto.webp",
    series: "NARUTO",
    keys: ["naruto"],
    to: "/shop",
    fallback: "/images/categories/blind-boxes.webp",
  },
  {
    name: "Evangelion",
    override: "/images/collections/sbs-evangelion.webp",
    series: "Evangelion",
    keys: ["evangelion"],
    to: "/shop",
    fallback: "/images/categories/figures.webp",
  },
  {
    name: "Demon Slayer",
    override: "/images/collections/sbs-demon-slayer.webp",
    series: "Demon Slayer",
    keys: ["demon slayer", "kimetsu"],
    to: "/shop",
    fallback: "/images/categories/figures.webp",
  },
  {
    name: "Jujutsu Kaisen",
    override: "/images/collections/sbs-jujutsu-kaisen.webp",
    series: "Jujutsu Kaisen",
    keys: ["jujutsu", "jujustu"],
    to: "/shop",
    fallback: "/images/categories/plush.webp",
  },
  {
    name: "My Hero Academia",
    override: "/images/collections/sbs-my-hero-academia.webp",
    series: "My Hero Academia",
    keys: ["my hero academia", "boku no hero"],
    to: "/shop",
    fallback: "/images/categories/character-goods.webp",
  },
  {
    name: "Haikyu!!",
    override: "/images/collections/sbs-haikyu.webp",
    series: "Haikyu!!",
    keys: ["haikyu"],
    to: "/shop",
    fallback: "/images/categories/character-goods.webp",
  },
  {
    name: "Hatsune Miku",
    override: "/images/collections/sbs-hatsune-miku.webp",
    series: "Hatsune Miku",
    keys: ["hatsune", "miku"],
    to: "/shop",
    fallback: "/images/collections/hatsune-miku.svg",
  },
  {
    name: "Star Wars",
    override: "/images/collections/sbs-star-wars.webp",
    series: "Star Wars",
    keys: ["star wars", "star destroyer", "millennium falcon", "death star"],
    to: "/shop",
    fallback: "/images/categories/model-kits.webp",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Secret Builders Society | Figures, Model Kits & Collector Goods" },
      {
        name: "description",
        content:
          "Collector store on Commercial Drive in Vancouver. Gundam model kits, figures, plush, blind boxes and hobby supplies. Prices in CAD, ships across Canada.",
      },
      {
        property: "og:title",
        content: "Secret Builders Society | Figures, Model Kits & Collector Goods",
      },
      {
        property: "og:description",
        content:
          "Collector store on Commercial Drive in Vancouver. Figures, model kits, plush, blind boxes, hobby supplies, character goods and apparel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals(8);
  const preorders = getPreorderProducts().slice(0, 4);
  const onSale = getSaleProducts().slice(0, 4);
  const categories = getVisibleCategories();
  const allProducts = getAllProducts();
  const homeSeries = HOME_SERIES.map((entry) => {
    const matches = allProducts.filter((p) =>
      entry.keys.some((k) => `${p.series ?? ""} ${p.title}`.toLowerCase().includes(k)),
    );
    const image = entry.override || matches.find((p) => p.image)?.image || entry.fallback;
    return { ...entry, image, count: matches.length };
  });
  const total = getAllProducts().length;

  return (
    <>
      <HeroCarousel />
      <InfoStrip />

      {/* 03 — SHOP BY CATEGORY */}
      <section className="section-y border-b border-border bg-bone">
        <div className="container-sbs">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SBSBuildRail index="02" label="Category Index" />
              <h2 className="mt-5 font-display text-[32px] lg:text-[38px]">Shop by Category</h2>
            </div>
            <Link
              to="/shop"
              search={{ sort: "featured" }}
              className="micro text-sbs-red hover:underline"
            >
              View all {total} products
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => {
              const art = CATEGORY_ARTWORK[category.name]!;
              return (
                <Link
                  key={category.slug}
                  to="/shop/$category"
                  params={{ category: category.slug }}
                  search={{ sort: "featured" }}
                  className="card-retail group flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                    <img
                      src={art.src}
                      alt={art.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex h-[84px] flex-col justify-center border-t border-border px-4">
                    <h3 className="font-display text-lg leading-tight transition-colors duration-200 group-hover:text-sbs-red">
                      {category.name}
                    </h3>
                    <span className="micro-sm mt-1.5 text-muted-foreground">
                      {category.count} {category.count === 1 ? "product" : "products"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 ? (
        <section className="section-y border-b border-border bg-white">
          <div className="container-sbs">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SBSBuildRail index="03" label="Just Landed" />
                <h2 className="mt-5 font-display text-[32px] lg:text-[38px]">New Arrivals</h2>
              </div>
              <Link
                to="/shop"
                search={{ sort: "featured", new: true }}
                className="micro text-sbs-red hover:underline"
              >
                All new arrivals
              </Link>
            </div>
            <div className="mt-9">
              <ProductGrid products={newArrivals} />
            </div>
          </div>
        </section>
      ) : null}

      {/* 03 — GUNDAM BY GRADE */}
      <GundamGrades index="03" />

      {/* 05 — SELECTED FROM THE SHELF */}
      <section className="section-y border-b border-border bg-bone">
        <div className="container-sbs">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SBSBuildRail index="04" label="Featured Picks" />
              <h2 className="mt-5 font-display text-[32px] lg:text-[38px]">
                Selected from the Shelf
              </h2>
            </div>
            <Link
              to="/shop"
              search={{ sort: "featured" }}
              className="micro text-sbs-red hover:underline"
            >
              Shop all
            </Link>
          </div>
          <div className="mt-9">
            <ProductGrid products={featured} />
          </div>
        </div>
      </section>

      {/* 06 — COMING SOON */}
      {preorders.length > 0 ? (
        <section className="section-y border-b border-border bg-white">
          <div className="container-sbs">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SBSBuildRail index="05" label="Preorder Window" />
                <h2 className="mt-5 font-display text-[32px] lg:text-[38px]">Coming Soon</h2>
              </div>
              <Link to="/preorders" className="micro text-sbs-red hover:underline">
                All preorders
              </Link>
            </div>
            <div className="mt-9">
              <ProductGrid products={preorders} />
            </div>
          </div>
        </section>
      ) : null}

      {/* 07 — ON SALE */}
      {onSale.length > 0 ? (
        <section className="section-y border-b border-border bg-bone-deep">
          <div className="container-sbs">
            <h2 className="font-display text-[32px] lg:text-[38px]">On Sale Now</h2>
            <div className="mt-9">
              <ProductGrid products={onSale} />
            </div>
          </div>
        </section>
      ) : null}

      {/* 06 — BEGINNER'S CORNER */}
      <BeginnersCorner index="06" />

      {/* 07 — POPULAR BRANDS */}
      <PopularBrands />

      {/* 08 — EXPLORE COLLECTIONS */}
      <section className="section-y border-b border-border bg-white">
        <div className="container-sbs">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SBSBuildRail index="08" label="Series Directory" />
              <h2 className="mt-5 font-display text-[32px] lg:text-[38px]">Explore Collections</h2>
            </div>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {homeSeries.map((entry) => (
              <Link
                key={entry.name}
                to={entry.to}
                search={
                  entry.to === "/shop" ? { sort: "featured", series: entry.series } : undefined
                }
                className="group relative block aspect-video overflow-hidden bg-charcoal"
              >
                <img
                  src={entry.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="clamp-1 block font-display text-lg text-white">
                    {entry.name}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 09 — SHARED STORE */}
      <StoreInfo />

      <RecentlyViewed index="10" />

      {/* NEWSLETTER */}
      <Newsletter />
    </>
  );
}
