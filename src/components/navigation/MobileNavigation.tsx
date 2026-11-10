import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PRIMARY_CATEGORIES } from "./taxonomy";
import { GUNPLA_GRADES } from "@/commerce/attributes";
import { getGundamProducts } from "@/commerce/adapter";
import { GUIDES } from "@/content/guides";
import { STORE } from "@/config/store";
import { useRewards } from "@/components/rewards/RewardsProvider";

const NAV = [
  { label: "Preorders", to: "/preorders" as const },
  { label: "Guides", to: "/guides" as const },
  { label: "Collections", to: "/collections" as const },
  { label: "Brands", to: "/brands" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
  { label: "My Account", to: "/account" as const },
];

const SUPPORT = [
  { label: "FAQ", to: "/faq" as const },
  { label: "Pickup Information", to: "/pickup-information" as const },
  { label: "Terms & Conditions", to: "/terms-and-conditions" as const },
  { label: "Privacy Policy", to: "/privacy-policy" as const },
];

export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [shopOpen, setShopOpen] = useState(true);
  const [gundamOpen, setGundamOpen] = useState(false);
  const gundam = getGundamProducts();
  const { openRewards } = useRewards();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[85] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 flex h-full flex-col bg-card">
        <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-border px-5">
          <img
            src="/images/brand/sbs-horizontal-light-bg.svg"
            alt="Secret Builders Society"
            className="h-9 w-[170px] object-contain"
          />
          <button type="button" onClick={onClose} className="micro text-muted-foreground">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <button
            type="button"
            onClick={() => setShopOpen((v) => !v)}
            aria-expanded={shopOpen}
            className="flex w-full items-center justify-between border-b border-border py-3 font-display text-2xl"
          >
            Shop
            <span className="micro text-muted-foreground">{shopOpen ? "−" : "+"}</span>
          </button>
          {shopOpen ? (
            <div className="flex flex-col gap-1 border-b border-border py-4">
              <Link
                to="/shop"
                search={{ sort: "featured" }}
                onClick={onClose}
                className="py-1.5 text-[15px] text-sbs-red"
              >
                All Products
              </Link>
              {PRIMARY_CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  to="/shop/$category"
                  params={{ category: category.slug }}
                  search={{ sort: "featured" }}
                  onClick={onClose}
                  className="py-1.5 text-[15px] text-charcoal/80"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setGundamOpen((v) => !v)}
            aria-expanded={gundamOpen}
            className="flex w-full items-center justify-between border-b border-border py-3 font-display text-2xl text-sbs-red"
          >
            Gundam
            <span className="micro text-muted-foreground">{gundamOpen ? "−" : "+"}</span>
          </button>
          {gundamOpen ? (
            <div className="border-b border-border py-4">
              <Link to="/gundam" search={{ sort: "featured" }} onClick={onClose} className="block py-1.5 text-[15px] text-sbs-red">
                All Gundam
              </Link>
              <p className="micro-sm mt-3 text-muted-foreground">Shop by grade</p>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {GUNPLA_GRADES.filter((g) => g.code !== "OTHER").map((g) =>
                  gundam.some((p) => p.grade === g.code) ? (
                    <Link key={g.code} to="/gundam" search={{ sort: "featured", grade: g.code }} onClick={onClose} className="micro border border-border py-2 text-center">
                      {g.code}
                    </Link>
                  ) : (
                    <Link key={g.code} to="/guides/gunpla-grades-explained" hash={`grade-${g.code.toLowerCase()}`} onClick={onClose} className="micro border border-border py-2 text-center text-muted-foreground">
                      {g.code}
                    </Link>
                  ),
                )}
              </div>
              {gundam.length === 0 ? (
                <p className="mt-2 text-xs text-muted-foreground">No Gundam kits listed yet — grades open our guide.</p>
              ) : null}
              <p className="micro-sm mt-4 text-muted-foreground">Build &amp; learn</p>
              {GUIDES.map((g) => (
                <Link key={g.slug} to={g.path} onClick={onClose} className="block py-1.5 text-[15px] text-charcoal/80">
                  {g.title}
                </Link>
              ))}
            </div>
          ) : null}

          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className="block border-b border-border py-3 font-display text-2xl"
            >
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => {
              onClose();
              openRewards();
            }}
            className="block w-full border-b border-border py-3 text-left font-display text-2xl text-sbs-red"
          >
            Rewards
          </button>

          <div className="mt-8">
            <h2 className="micro text-muted-foreground">Customer Care</h2>
            <ul className="mt-3 space-y-2">
              {SUPPORT.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} onClick={onClose} className="text-[15px] text-charcoal/80">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="micro text-muted-foreground">Visit the shop</p>
            <p className="mt-2 text-[15px]">
              {STORE.addressLine}
              <br />
              {STORE.city}, {STORE.region}
            </p>
            <a href={STORE.phoneHref} className="mt-2 block text-[15px] text-sbs-red">
              {STORE.phone}
            </a>
            <p className="mt-3 text-[15px] text-muted-foreground">
              {STORE.hours.map((h) => (
                <span key={h.day} className="block">
                  {h.day}: {h.time}
                </span>
              ))}
            </p>
            <p className="micro-sm mt-4 text-muted-foreground">{STORE.currencyLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
