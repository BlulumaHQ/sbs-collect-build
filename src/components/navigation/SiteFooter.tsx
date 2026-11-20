import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";
import { usePrimaryCategories } from "./taxonomy";
import { STORE } from "@/config/store";
import { PaymentMethods } from "@/components/home/PaymentMethods";

const EXPLORE_LINKS = [
  { label: "Gundam", to: "/gundam" as const },
  { label: "Preorders", to: "/preorders" as const },
  { label: "Guides", to: "/guides" as const },
  { label: "Collections", to: "/collections" as const },
  { label: "Brands", to: "/brands" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

const CARE_LINKS = [
  { label: "FAQ", to: "/faq" as const },
  { label: "Shipping", to: "/shipping-information" as const },
  { label: "Pickup Info", to: "/pickup-information" as const },
  { label: "Terms", to: "/terms-and-conditions" as const },
  { label: "Privacy", to: "/privacy-policy" as const },
  { label: "Account", to: "/account" as const },
];

const SOCIAL_ICONS = { Facebook, Instagram } as const;

function MobileAccordion({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group border-b border-white/12 lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-[15px] font-medium text-white/90">
        {title}
        <span className="text-white/40 transition-transform group-open:rotate-180">▼</span>
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}

export function SiteFooter() {
  const PRIMARY_CATEGORIES = usePrimaryCategories();
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-sbs grid gap-8 py-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-20">
        {/* 1 — brand */}
        <div>
          <img
            src="/images/brand/sbs-horizontal-dark-bg.svg"
            alt="Secret Builders Society"
            width={300}
            height={86}
            loading="lazy"
            className="h-auto w-[170px] object-contain lg:w-[290px]"
          />
          <p className="mt-6 hidden max-w-sm text-[15px] leading-relaxed text-white/65 lg:block">
            A collector-focused store for figures, model kits, plush, blind boxes, hobby supplies,
            character goods and apparel.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2 lg:mt-6 lg:gap-3">
            {STORE.social.map(({ label, href }) => {
              const Icon = SOCIAL_ICONS[label];
              return (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Secret Builders Society on ${label}`}
                    className="flex h-11 w-11 items-center justify-center border border-white/20 text-white/75 transition-colors duration-200 hover:border-sbs-red hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile accordion nav */}
        <div className="lg:hidden">
          <MobileAccordion title="Shop">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop"
                  search={{ sort: "featured" }}
                  className="text-[15px] text-white/80 hover:text-sbs-red"
                >
                  Shop All
                </Link>
              </li>
              {PRIMARY_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    to="/shop/$category"
                    params={{ category: category.slug }}
                    search={{ sort: "featured" }}
                    className="text-[15px] text-white/80 hover:text-sbs-red"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </MobileAccordion>

          <MobileAccordion title="Explore">
            <ul className="space-y-2">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-[15px] text-white/80 hover:text-sbs-red">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </MobileAccordion>

          <MobileAccordion title="Customer Care">
            <ul className="space-y-2">
              {CARE_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-[15px] text-white/80 hover:text-sbs-red">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </MobileAccordion>

          <MobileAccordion title="Visit the Store">
            <address className="not-italic leading-relaxed text-white/80">
              {STORE.addressLine}
              <br />
              {STORE.city}, {STORE.region}
            </address>
            <p className="mt-2">
              <a href={STORE.phoneHref} className="text-white/80 hover:text-sbs-red">
                {STORE.phone}
              </a>
            </p>
            <p className="mt-1">
              <a href={`mailto:${STORE.email}`} className="text-white/80 hover:text-sbs-red">
                {STORE.email}
              </a>
            </p>
          </MobileAccordion>
        </div>

        {/* 2 — shop (desktop) */}
        <nav aria-label="Shop" className="hidden lg:block">
          <h2 className="micro-sm text-white/45">Shop</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link
                to="/shop"
                search={{ sort: "featured" }}
                className="text-[15px] text-white/80 hover:text-sbs-red"
              >
                Shop All
              </Link>
            </li>
            {PRIMARY_CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  to="/shop/$category"
                  params={{ category: category.slug }}
                  search={{ sort: "featured" }}
                  className="text-[15px] text-white/80 hover:text-sbs-red"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3 — explore (desktop) */}
        <nav aria-label="Explore" className="hidden lg:block">
          <h2 className="micro-sm text-white/45">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {EXPLORE_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-[15px] text-white/80 hover:text-sbs-red">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 4 — customer care (desktop) */}
        <nav aria-label="Customer care" className="hidden lg:block">
          <h2 className="micro-sm text-white/45">Customer Care</h2>
          <ul className="mt-4 space-y-2.5">
            {CARE_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-[15px] text-white/80 hover:text-sbs-red">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 5 — store info (desktop) */}
        <div className="hidden lg:block">
          <h2 className="micro-sm text-white/45">Visit the Store</h2>
          <address className="mt-4 text-[15px] not-italic leading-relaxed text-white/80">
            {STORE.addressLine}
            <br />
            {STORE.city}, {STORE.region}
          </address>
          <p className="mt-3 text-[15px]">
            <a href={STORE.phoneHref} className="text-white/80 hover:text-sbs-red">
              {STORE.phone}
            </a>
            <br />
            <a href={`mailto:${STORE.email}`} className="text-white/80 hover:text-sbs-red">
              {STORE.email}
            </a>
          </p>
          <dl className="mt-5 space-y-1.5 text-[14px]">
            {STORE.hours.map((h) => (
              <div key={h.day} className="flex justify-between gap-4 text-white/60">
                <dt>{h.day}</dt>
                <dd className="whitespace-nowrap text-white/85">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="container-sbs py-5 lg:py-8">
          <PaymentMethods tone="dark" />
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="container-sbs flex flex-col items-center gap-2 py-4 lg:flex-row lg:justify-between lg:gap-3 lg:py-6">
          <p className="text-center text-[12px] text-white/55 lg:text-left lg:text-[13px]">
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
          <p className="text-[12px] text-white/35 lg:text-[13px]">
            All prices in CAD. Ships across Canada.
          </p>
        </div>
      </div>
    </footer>
  );
}
