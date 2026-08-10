import { Link } from "@tanstack/react-router";
import { PRIMARY_CATEGORIES } from "./taxonomy";
import { STORE, SHIPPING_LINE } from "@/config/store";

const SHOP_LINKS = [
  { label: "Shop All", to: "/shop" as const },
  { label: "Preorders", to: "/preorders" as const },
  { label: "Collections", to: "/collections" as const },
  { label: "Brands", to: "/brands" as const },
];

const CARE_LINKS = [
  { label: "Contact Us", to: "/contact" as const },
  { label: "FAQ", to: "/faq" as const },
  { label: "Shipping Information", to: "/shipping-information" as const },
  { label: "Terms & Conditions", to: "/terms-and-conditions" as const },
  { label: "Privacy Policy", to: "/privacy-policy" as const },
  { label: "My Account", to: "/account" as const },
];

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-sbs grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.3fr] lg:gap-10 lg:py-20">
        {/* 1 — brand */}
        <div>
          <img
            src="/images/brand/sbs-horizontal-dark-bg.svg"
            alt="Secret Builders Society"
            width={360}
            height={102}
            loading="lazy"
            className="h-16 w-auto md:h-20"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
            A collector-first store for figures, model kits, plush, blind boxes and the hobby
            supplies that finish the build. {SHIPPING_LINE}.
          </p>
          <ul className="mt-6 flex flex-wrap gap-4">
            {STORE.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="micro text-white/70 hover:text-sbs-red"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 2 — shop */}
        <nav aria-label="Shop">
          <h2 className="micro text-white/45">Shop</h2>
          <ul className="mt-4 space-y-2.5">
            {SHOP_LINKS.map((item) => (
              <li key={item.to}>
                {item.to === "/shop" ? (
                  <Link
                    to="/shop"
                    search={{ sort: "featured" }}
                    className="text-sm text-white/80 hover:text-sbs-red"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link to={item.to} className="text-sm text-white/80 hover:text-sbs-red">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* 3 — categories */}
        <nav aria-label="Categories">
          <h2 className="micro text-white/45">Categories</h2>
          <ul className="mt-4 space-y-2.5">
            {PRIMARY_CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  to="/shop/$category"
                  params={{ category: category.slug }}
                  search={{ sort: "featured" }}
                  className="text-sm text-white/80 hover:text-sbs-red"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 4 — customer care */}
        <nav aria-label="Customer care">
          <h2 className="micro text-white/45">Customer Care</h2>
          <ul className="mt-4 space-y-2.5">
            {CARE_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-white/80 hover:text-sbs-red">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 5 — store info */}
        <div>
          <h2 className="micro text-white/45">Visit the Shop</h2>
          <address className="mt-4 not-italic text-sm leading-relaxed text-white/80">
            {STORE.addressLine}
            <br />
            {STORE.city}, {STORE.region} {STORE.postal}
            <br />
            {STORE.country}
          </address>
          <p className="mt-3 text-sm">
            <a
              href={`tel:${STORE.phone.replace(/[^\d+]/g, "")}`}
              className="text-white/80 hover:text-sbs-red"
            >
              {STORE.phone}
            </a>
            <br />
            <a href={`mailto:${STORE.email}`} className="text-white/80 hover:text-sbs-red">
              {STORE.email}
            </a>
          </p>
          <dl className="mt-5 space-y-1.5">
            {STORE.hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4 text-xs text-white/60">
                <dt>{h.day}</dt>
                <dd className="text-white/85">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="container-sbs flex flex-wrap items-center justify-between gap-3 py-6">
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
          <p className="micro text-white/35">Prototype catalogue — pricing shown for demonstration.</p>
        </div>
      </div>
    </footer>
  );
}
