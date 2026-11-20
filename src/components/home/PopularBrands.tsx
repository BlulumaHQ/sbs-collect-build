import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { brandLogo } from "@/commerce/artwork";

// name = vendor name used in the shop filter; ratio = width / height of the logo's ink
const BRANDS: { name: string; label: string; ratio: number; boost?: number }[] = [
  { name: "BANDAI HOBBY", label: "Bandai Hobby", ratio: 1.03 },
  { name: "TAMASHII NATIONS", label: "Tamashii Nations", ratio: 1.24, boost: 1.2 },
  { name: "BANDAI", label: "Bandai", ratio: 1.03 },
  { name: "MegaHouse", label: "MegaHouse", ratio: 8.8 },
  { name: "GOOD SMILE COMPANY", label: "Good Smile Company", ratio: 3.56 },
  { name: "KOTOBUKIYA", label: "Kotobukiya", ratio: 3.21 },
  { name: "GSI Creos", label: "GSI Creos", ratio: 5.45 },
  { name: "GodHand", label: "GodHand", ratio: 1.07, boost: 1.2 },
  { name: "TAITO", label: "Taito", ratio: 3.13 },
  { name: "SEGA", label: "Sega", ratio: 3.3 },
  { name: "FuRyu", label: "FuRyu", ratio: 3.37 },
  { name: "threezero", label: "threezero", ratio: 3.0 },
];

/**
 * Optical sizing: every logo gets roughly the same visual area, so square marks
 * and long wordmarks look equally heavy. Capped so squares don't dominate and
 * wide wordmarks stay inside the card (and shrink with it on mobile).
 */
const LOGO_AREA = 9200;
const MAX_H = 76;
const MAX_W = 240;
// boost: marks whose lettering is small inside the artwork (GodHand, Tamashii) get a little extra.
function logoSize(ratio: number, boost = 1): { width: number; height: number } {
  let height = Math.min(MAX_H * boost, Math.sqrt(LOGO_AREA / ratio) * boost);
  let width = height * ratio;
  if (width > MAX_W) {
    width = MAX_W;
    height = width / ratio;
  }
  return { width: Math.round(width), height: Math.round(height) };
}

function shuffle<T>(list: T[]): T[] {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function PopularBrands() {
  const [brands, setBrands] = useState(BRANDS);
  useEffect(() => {
    setBrands(shuffle(BRANDS));
  }, []);

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
                className="card-retail group flex flex-col items-center justify-center px-4 py-7 sm:px-6"
              >
                <div className="flex h-[96px] w-full items-center justify-center">
                  {logo ? (
                    <img
                      src={logo}
                      alt={brand.label}
                      loading="lazy"
                      style={{
                        width: logoSize(brand.ratio, brand.boost).width,
                        aspectRatio: brand.ratio,
                      }}
                      className="h-auto max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <span className="font-display text-lg">{brand.label}</span>
                  )}
                </div>
                <span className="micro mt-4 text-center text-muted-foreground group-hover:text-sbs-red">
                  {brand.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
