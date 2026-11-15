import { Link } from "@tanstack/react-router";

const BRANDS = [
  { name: "Gundam (Gunpla)", logo: "gundam", to: "/gundam" },
  { name: "Pokémon", logo: "pokemon", series: "Pokémon" },
  { name: "One Piece", logo: "one-piece", series: "ONE PIECE" },
  { name: "Dragon Ball", logo: "dragon-ball", series: "Dragon Ball" },
  { name: "Naruto", logo: "naruto", series: "NARUTO" },
  { name: "Evangelion", logo: "evangelion", series: "Evangelion" },
  { name: "Demon Slayer", logo: "demon-slayer", series: "Demon Slayer" },
  { name: "Jujutsu Kaisen", logo: "jujutsu-kaisen", series: "Jujutsu Kaisen" },
  { name: "My Hero Academia", logo: "my-hero-academia", series: "My Hero Academia" },
  { name: "Haikyu!!", logo: "haikyu", series: "Haikyu!!" },
  { name: "Hatsune Miku", logo: "hatsune-miku", series: "Hatsune Miku" },
  { name: "Star Wars", logo: "star-wars", series: "Star Wars" },
] as const;

export function PopularBrands() {
  return (
    <section className="section-y border-b border-border bg-white">
      <div className="container-sbs">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[32px] lg:text-[38px]">Popular Brands</h2>
            <p className="mt-2 text-[16px] text-muted-foreground">Shop by series.</p>
          </div>
          <Link to="/brands" className="micro text-sbs-red hover:underline">
            View all brands
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {BRANDS.map((brand) => (
            <Link
              key={brand.name}
              {...("to" in brand
                ? { to: brand.to }
                : { to: "/shop", search: { sort: "featured", series: brand.series } })}
              className="card-retail group flex flex-col items-center justify-center px-5 py-6"
            >
              <div className="flex h-[80px] w-full items-center justify-center">
                <img
                  src={`/images/brands/series/${brand.logo}.svg`}
                  alt={brand.name}
                  loading="lazy"
                  className="h-[64px] w-[150px] object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                />
              </div>
              <span className="micro mt-3 text-muted-foreground group-hover:text-sbs-red">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
