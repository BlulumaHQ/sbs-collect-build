import { createFileRoute, Link } from "@tanstack/react-router";
import {
  getAllProducts,
  getCategories,
  getPreorderProducts,
  getProductsByIds,
  getSaleProducts,
  getSeries,
} from "@/commerce/adapter";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { RecentlyViewed } from "@/components/commerce/RecentlyViewed";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { InfoStrip } from "@/components/home/InfoStrip";
import { PopularBrands } from "@/components/home/PopularBrands";
import { StoreInfo } from "@/components/home/StoreInfo";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Secret Builders Society | Figures, Model Kits & Collector Goods" },
      {
        name: "description",
        content:
          "Shop figures, model kits, plush, blind boxes, hobby supplies, character goods and apparel. Collector-first retail, shipped across Canada.",
      },
      {
        property: "og:title",
        content: "Secret Builders Society | Figures, Model Kits & Collector Goods",
      },
      {
        property: "og:description",
        content:
          "Shop figures, model kits, plush, blind boxes, hobby supplies, character goods and apparel. Collector-first retail, shipped across Canada.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const CATEGORY_IMAGE: Record<string, { src: string; alt: string }> = {
  Figures: { src: "/images/products/figures-02-nendoroid-bruce-lee.webp", alt: "Nendoroid Bruce Lee" },
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
  const preorders = getPreorderProducts().slice(0, 4);
  const onSale = getSaleProducts().slice(0, 4);
  const categories = getCategories();
  const series = getSeries().slice(0, 10);
  const total = getAllProducts().length;

  return (
    <>
      <HeroCarousel />
      <InfoStrip />

      {/* SHOP BY CATEGORY */}
      <section className="section-y border-b border-border">
        <div className="container-sbs">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SBSBuildRail index="02" label="Category Index" />
              <h2 className="mt-5 font-display text-3xl md:text-4xl">Shop by Category</h2>
            </div>
            <Link to="/shop" search={{ sort: "featured" }} className="micro text-sbs-red hover:underline">
              View all {total} products
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-7">
            {categories.map((category) => {
              const art = CATEGORY_IMAGE[category.name]!;
              return (
                <Link
                  key={category.slug}
                  to="/shop/$category"
                  params={{ category: category.slug }}
                  search={{ sort: "featured" }}
                  className="card-retail group flex flex-col"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-white">
                    <img
                      src={art.src}
                      alt={art.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex h-[74px] flex-col justify-center border-t border-border px-3 text-center">
                    <h3 className="font-display text-sm leading-tight transition-colors duration-200 group-hover:text-sbs-red">
                      {category.name}
                    </h3>
                    <span className="micro mt-1.5 text-muted-foreground">
                      {category.count} items
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section-y border-b border-border bg-white">
        <div className="container-sbs">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SBSBuildRail index="03" label="Featured Picks" />
              <h2 className="mt-5 font-display text-3xl md:text-4xl">Selected from the Shelf</h2>
            </div>
            <Link to="/shop" search={{ sort: "featured" }} className="micro text-sbs-red hover:underline">
              Shop all
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={featured} />
          </div>
        </div>
      </section>

      <PopularBrands />
      <StoreInfo />

      {/* ON SALE */}
      {onSale.length > 0 ? (
        <section className="section-y border-b border-border">
          <div className="container-sbs">
            <SBSBuildRail index="07" label="Marked Down" />
            <h2 className="mt-5 font-display text-3xl md:text-4xl">On Sale Now</h2>
            <div className="mt-10">
              <ProductGrid products={onSale} />
            </div>
          </div>
        </section>
      ) : null}

      <Testimonials />

      {/* PREORDERS */}
      {preorders.length > 0 ? (
        <section className="section-y border-b border-border bg-white">
          <div className="container-sbs">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SBSBuildRail index="09" label="Preorder Window" />
                <h2 className="mt-5 font-display text-3xl md:text-4xl">Coming Soon</h2>
              </div>
              <Link to="/preorders" className="micro text-sbs-red hover:underline">
                All preorders
              </Link>
            </div>
            <div className="mt-10">
              <ProductGrid products={preorders} />
            </div>
          </div>
        </section>
      ) : null}

      <RecentlyViewed index="10" />

      {/* SERIES */}
      <section className="section-y border-b border-border">
        <div className="container-sbs">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SBSBuildRail index="11" label="Series Directory" />
              <h2 className="mt-5 font-display text-3xl md:text-4xl">Shop by Series</h2>
            </div>
            <Link to="/collections" className="micro text-sbs-red hover:underline">
              All collections
            </Link>
          </div>
          <ul className="mt-9 flex flex-wrap gap-2.5">
            {series.map((entry) => (
              <li key={entry.name}>
                <Link
                  to="/shop"
                  search={{ sort: "featured", series: entry.name }}
                  className="micro inline-flex items-center gap-2 border border-border bg-white px-4 py-2.5 transition-colors duration-200 hover:border-sbs-red hover:text-sbs-red"
                >
                  {entry.name}
                  <span className="text-muted-foreground">{entry.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
