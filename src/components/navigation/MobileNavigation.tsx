import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PRIMARY_CATEGORIES } from "./taxonomy";

const NAV = [
  { label: "PREORDERS", to: "/preorders" as const },
  { label: "COLLECTIONS", to: "/collections" as const },
  { label: "BRANDS", to: "/brands" as const },
  { label: "ABOUT", to: "/about" as const },
];

export function MobileNavigation({
  open,
  onClose,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}) {
  const [shopOpen, setShopOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[85] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 flex h-full flex-col bg-card">
        <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-border px-5">
          <img
            src="/images/brand/sbs-horizontal-light-bg.svg"
            alt="Secret Builders Society"
            className="h-7 w-auto"
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
              <Link to="/shop" search={{ sort: "featured" }} onClick={onClose} className="py-1.5 text-sm text-sbs-red">
                All Products
              </Link>
              {PRIMARY_CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  to="/shop/$category"
                  params={{ category: category.slug }}
                  search={{ sort: "featured" }}
                  onClick={onClose}
                  className="py-1.5 text-sm text-charcoal/80"
                >
                  {category.name}
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
              {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
            </Link>
          ))}

          <button type="button" onClick={onSearch} className="mt-6 micro w-full border border-charcoal px-5 py-3">
            Search the catalogue
          </button>
        </div>
      </div>
    </div>
  );
}
