import { Link } from "@tanstack/react-router";
import { getVendors } from "@/commerce/adapter";
import { brandLogo } from "@/commerce/artwork";

export function PopularBrands() {
  const brands = getVendors()
    .slice()
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <section className="section-y border-b border-border bg-white">
      <div className="container-sbs">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[32px] lg:text-[38px]">Popular Brands</h2>
            <p className="mt-2 text-[16px] text-muted-foreground">Shop by maker.</p>
          </div>
          <Link to="/brands" className="micro text-sbs-red hover:underline">
            View all brands
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => {
            const logo = brandLogo(brand.name);
            return (
              <Link
                key={brand.name}
                to="/shop"
                search={{ sort: "featured", vendor: brand.name }}
                className="card-retail group flex flex-col items-center justify-center px-5 py-7"
              >
                <div className="flex h-[80px] w-full items-center justify-center">
                  {logo ? (
                    <img
                      src={logo}
                      alt={brand.name}
                      loading="lazy"
                      className="max-h-[64px] w-auto max-w-[80%] object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <span className="font-display text-lg">{brand.name}</span>
                  )}
                </div>
                <span className="micro mt-4 text-muted-foreground group-hover:text-sbs-red">
                  {brand.count} products
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
