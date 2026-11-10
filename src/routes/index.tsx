import { createFileRoute, Link } from "@tanstack/react-router";
import {
  getAllProducts,
  getCategories,
  getPreorderProducts,
  getProductsByIds,
  getSaleProducts,
  getSeries,
} from "@/commerce/adapter";
import { CATEGORY_ARTWORK, seriesArtwork } from "@/commerce/artwork";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Secret Builders Society | Figures, Model Kits & Collector Goods" },
      {
        name: "description",
        content:
          "Collector store on Commercial Drive in Vancouver. Gundam model kits, figures, plush, blind boxes and hobby supplies. Prices in CAD, local pickup only.",
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
  const preorders = getPreorderProducts().slice(0, 4);
  const onSale = getSaleProducts().slice(0, 4);
  const categories = getCategories();
  const series = getSeries().slice(0, 8);
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
            <Link to="/collections" className="micro text-sbs-red hover:underline">
              View all collections
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {series.map((entry) => (
              <Link
                key={entry.name}
                to="/shop"
                search={{ sort: "featured", series: entry.name }}
                className="group relative block aspect-video overflow-hidden bg-charcoal"
              >
                <img
                  src={seriesArtwork(entry.name)}
                  alt={`${entry.name} collection artwork`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="clamp-1 block font-display text-lg text-white">
                    {entry.name}
                  </span>
                  <span className="micro-sm mt-1 block text-white/65">{entry.count} {entry.count === 1 ? "product" : "products"}</span>
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
