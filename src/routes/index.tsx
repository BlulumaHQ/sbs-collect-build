import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchHome } from "@/commerce/catalog-api";
import { useNavSummary } from "@/commerce/nav-summary";
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

const HOME_SERIES: {
  name: string;
  series: string;
  keys: string[];
  to: "/shop" | "/gundam";
  override?: string;
  fallback: string;
}[] = [
  { name: "Gundam (Gunpla)", series: "Gundam", keys: ["gundam", "gunpla"], to: "/gundam", fallback: "/images/categories/model-kits.webp" },
  { name: "Pokémon", series: "Pokémon", keys: ["pokémon", "pokemon"], to: "/shop", fallback: "/images/collections/pokemon.jpg", override: "/images/uploads/20261115-secret-builders-society-pokemon-star-war.webp" },
  { name: "One Piece", series: "ONE PIECE", keys: ["one piece"], to: "/shop", fallback: "/images/collections/one-piece.jpg" },
  { name: "Dragon Ball", series: "Dragon Ball", keys: ["dragon ball"], to: "/shop", fallback: "/images/categories/figures.webp" },
  { name: "Naruto", series: "NARUTO", keys: ["naruto"], to: "/shop", fallback: "/images/categories/blind-boxes.webp" },
  { name: "Evangelion", series: "Evangelion", keys: ["evangelion"], to: "/shop", fallback: "/images/categories/figures.webp" },
  { name: "Demon Slayer", series: "Demon Slayer", keys: ["demon slayer", "kimetsu"], to: "/shop", fallback: "/images/categories/figures.webp" },
  { name: "Jujutsu Kaisen", series: "Jujutsu Kaisen", keys: ["jujutsu", "jujustu"], to: "/shop", fallback: "/images/categories/plush.webp" },
  { name: "My Hero Academia", series: "My Hero Academia", keys: ["my hero academia", "boku no hero"], to: "/shop", fallback: "/images/categories/character-goods.webp" },
  { name: "Haikyu!!", series: "Haikyu!!", keys: ["haikyu"], to: "/shop", fallback: "/images/categories/character-goods.webp" },
  { name: "Hatsune Miku", series: "Hatsune Miku", keys: ["hatsune", "miku"], to: "/shop", fallback: "/images/collections/hatsune-miku.svg" },
  { name: "Star Wars", series: "Star Wars", keys: ["star wars", "star destroyer", "millennium falcon", "death star"], to: "/shop", fallback: "/images/categories/model-kits.webp" },
];

export const Route = createFileRoute("/")({
  loader: () => fetchHome({ data: HOME_SERIES.map(({ series, keys }) => ({ series, keys })) }),
  staleTime: 5 * 60_000,
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
  const { featured, preorders, onSale, series } = Route.useLoaderData();
  const { categories, total } = useNavSummary();
  const homeSeries = HOME_SERIES.map((entry, i) => {
    const found = series[i];
    const image = entry.override || found?.image || entry.fallback;
    return { ...entry, image, count: found?.count ?? 0 };
  });

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
              <Link to="/preorders" search={{ sort: "featured" }} className="micro text-sbs-red hover:underline">
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
                search={entry.to === "/shop" ? { sort: "featured", series: entry.series } : undefined}
                className="group relative block aspect-video overflow-hidden bg-charcoal"
              >
                <img
                  src={entry.image}
                  alt={`${entry.name} collection artwork`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
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

    </>
  );
}
