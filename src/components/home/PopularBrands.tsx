import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { brandLogo } from "@/commerce/artwork";

// name = vendor name used in the shop filter; box = visual logo size (w x h px)
const BRANDS: { name: string; label: string; w: number; h: number }[] = [
  { name: "BANDAI HOBBY", label: "Bandai Hobby", w: 64, h: 62 },
  { name: "TAMASHII NATIONS", label: "Tamashii Nations", w: 78, h: 63 },
  { name: "BANDAI", label: "Bandai", w: 64, h: 62 },
  { name: "MegaHouse", label: "MegaHouse", w: 168, h: 19 },
  { name: "GOOD SMILE COMPANY", label: "Good Smile Company", w: 168, h: 47 },
  { name: "KOTOBUKIYA", label: "Kotobukiya", w: 144, h: 45 },
  { name: "GSI Creos", label: "GSI Creos", w: 144, h: 48 },
  { name: "GodHand", label: "GodHand", w: 66, h: 62 },
  { name: "TAITO", label: "Taito", w: 144, h: 46 },
  { name: "SEGA", label: "Sega", w: 144, h: 44 },
  { name: "FuRyu", label: "FuRyu", w: 144, h: 43 },
  { name: "threezero", label: "threezero", w: 144, h: 48 },
];

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
                className="card-retail group flex flex-col items-center justify-center px-5 py-7"
              >
                <div className="flex h-[80px] w-full items-center justify-center">
                  {logo ? (
                    <img
                      src={logo}
                      alt={brand.label}
                      loading="lazy"
                      style={{ width: brand.w, height: brand.h }}
                      className="max-w-[85%] object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <span className="font-display text-lg">{brand.label}</span>
                  )}
                </div>
                <span className="micro mt-4 text-muted-foreground group-hover:text-sbs-red">
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
