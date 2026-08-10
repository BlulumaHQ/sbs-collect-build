import { Link } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";
import { PRIMARY_CATEGORIES } from "./taxonomy";
import { STORE } from "@/config/store";
import { PaymentMethods } from "@/components/home/PaymentMethods";
import { useRewards } from "@/components/rewards/RewardsProvider";

const EXPLORE_LINKS = [
  { label: "Preorders", to: "/preorders" as const },
  { label: "Collections", to: "/collections" as const },
  { label: "Brands", to: "/brands" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

const CARE_LINKS = [
  { label: "FAQ", to: "/faq" as const },
  { label: "Shipping Information", to: "/shipping-information" as const },
  { label: "Terms & Conditions", to: "/terms-and-conditions" as const },
  { label: "Privacy Policy", to: "/privacy-policy" as const },
  { label: "My Account", to: "/account" as const },
];

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.4 2.2 1.7 3.6 3.9 3.8v2.5c-1.4.1-2.7-.3-3.9-1v5.9c0 4.4-4.2 7.1-7.9 5.3-2.4-1.2-3.4-4-2.7-6.5.7-2.4 3-3.9 5.6-3.6v2.6c-.4-.1-.8-.2-1.2-.1-1.4.1-2.4 1.2-2.4 2.6 0 1.5 1.3 2.7 2.8 2.6 1.4-.1 2.4-1.2 2.4-2.6V3h3.4z" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.2l-4.4-5.7L6.1 21H3l7.3-8.3L2.6 3h6.4l4 5.3L17.5 3zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Facebook", Icon: Facebook },
  { label: "Instagram", Icon: Instagram },
  { label: "TikTok", Icon: TikTokIcon },
  { label: "X", Icon: XIcon },
];

export function SiteFooter() {
  const { openRewards } = useRewards();

  return (
    <footer className="bg-charcoal text-white">
      <div className="container-sbs grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-20">
        {/* 1 — brand */}
        <div>
          <img
            src="/images/brand/sbs-horizontal-dark-bg.svg"
            alt="Secret Builders Society"
            width={300}
            height={86}
            loading="lazy"
            className="h-auto w-[200px] object-contain lg:w-[290px]"
          />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/65">
            A collector-focused store for figures, model kits, plush, blind boxes, hobby supplies,
            character goods and apparel.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {SOCIALS.map(({ label, Icon }) => (
              <li key={label}>
                <button
                  type="button"
                  title="Social profile coming soon"
                  aria-label={`${label} — coming soon`}
                  className="flex h-11 w-11 items-center justify-center border border-white/20 text-white/75 transition-colors duration-200 hover:border-sbs-red hover:text-white"
                >
                  <Icon size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 2 — shop */}
        <nav aria-label="Shop">
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

        {/* 3 — explore */}
        <nav aria-label="Explore">
          <h2 className="micro-sm text-white/45">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {EXPLORE_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-[15px] text-white/80 hover:text-sbs-red">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={openRewards}
                className="text-[15px] text-white/80 hover:text-sbs-red"
              >
                Rewards
              </button>
            </li>
          </ul>
        </nav>

        {/* 4 — customer care */}
        <nav aria-label="Customer care">
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

        {/* 5 — store info */}
        <div>
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
                <dd className="text-white/85">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="container-sbs py-8">
          <PaymentMethods tone="dark" />
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="container-sbs flex flex-wrap items-center justify-between gap-3 py-6">
          <p className="text-[13px] text-white/55">
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
          <p className="text-[13px] text-white/35">
            Prototype catalogue — pricing shown for demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}
