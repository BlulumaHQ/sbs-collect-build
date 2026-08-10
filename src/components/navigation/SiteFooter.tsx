import { Link } from "@tanstack/react-router";
import { PRIMARY_CATEGORIES } from "./taxonomy";

const NAV = [
  { label: "Shop", to: "/shop" as const },
  { label: "Preorders", to: "/preorders" as const },
  { label: "Collections", to: "/collections" as const },
  { label: "Brands", to: "/brands" as const },
  { label: "About", to: "/about" as const },
];

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-sbs grid gap-10 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <img
            src="/images/brand/sbs-horizontal-dark-bg.svg"
            alt="Secret Builders Society"
            className="h-10 w-auto"
          />
          <p className="mt-6 max-w-sm text-sm text-white/60">
            Prototype catalogue. Product availability and pricing shown for design demonstration only.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="micro text-white/50">Navigate</h2>
          <ul className="mt-4 space-y-2">
            {NAV.map((item) => (
              <li key={item.to}>
                {item.to === "/shop" ? (
                  <Link to="/shop" search={{ sort: "featured" }} className="text-sm text-white/85 hover:text-sbs-red">
                    Shop
                  </Link>
                ) : (
                  <Link to={item.to} className="text-sm text-white/85 hover:text-sbs-red">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Shop categories">
          <h2 className="micro text-white/50">Categories</h2>
          <ul className="mt-4 space-y-2">
            {PRIMARY_CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  to="/shop/$category"
                  params={{ category: category.slug }}
                  search={{ sort: "featured" }}
                  className="text-sm text-white/85 hover:text-sbs-red"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/12">
        <div className="container-sbs py-6">
          <p className="micro text-white/55">
            © 2026 Secret Builders Society. All rights reserved. | Web Design by{" "}
            <a
              href="https://bluluma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-sbs-red"
            >
              Bluluma
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
