import { POPULAR_BRANDS } from "@/commerce/adapter";
import { Link } from "@tanstack/react-router";
import { SBSBuildRail } from "@/components/SBSBuildRail";

/**
 * Popular brands rail.
 * Official maker logotypes are trademarked and were not supplied with the asset
 * package, so each tile uses an approved typographic lockup as the fallback.
 */
export function PopularBrands() {
  return (
    <section className="section-y border-b border-border bg-white">
      <div className="container-sbs">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SBSBuildRail index="04" label="Popular Brands" />
            <h2 className="mt-5 font-display text-3xl md:text-4xl">Makers We Stock</h2>
          </div>
          <Link to="/brands" className="micro text-sbs-red hover:underline">
            View all brands
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
          {POPULAR_BRANDS.map((brand) => (
            <li key={brand}>
              <Link
                to="/shop"
                search={{ sort: "featured", vendor: brand }}
                className="group flex h-24 items-center justify-center bg-white px-4 text-center transition-colors duration-200 hover:bg-bone md:h-28"
              >
                <span className="font-display text-sm uppercase tracking-[0.22em] text-charcoal/70 transition-colors duration-200 group-hover:text-sbs-red">
                  {brand}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
