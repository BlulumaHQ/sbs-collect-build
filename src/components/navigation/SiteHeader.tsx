import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { MapPin, Phone, Search, ShoppingBag } from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { MobileNavigation } from "./MobileNavigation";
import { useCart } from "@/commerce/cart";
import { formatMoneyCAD } from "@/commerce/format";
import { PRIMARY_CATEGORIES } from "./taxonomy";
import { STORE } from "@/config/store";

const CATEGORY_NAV = PRIMARY_CATEGORIES.slice(0, 5);

const NAV = [
  { label: "Preorders", to: "/preorders" as const },
  { label: "Collections", to: "/collections" as const },
  { label: "Brands", to: "/brands" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count, subtotal, openDrawer } = useCart();

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate({ to: "/search", search: { q } });
  };

  return (
    <>
      <header className="sticky top-0 z-[60] bg-card" onMouseLeave={() => setMegaOpen(false)}>
        {/* TIER 1 — utility bar */}
        <div className="bg-charcoal text-white">
          <div className="container-sbs flex h-9 items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] text-white/75 hover:text-white"
              >
                <MapPin size={14} aria-hidden="true" />
                <span className="truncate">
                  <span className="hidden sm:inline">
                    {STORE.addressLine}, {STORE.city}, {STORE.region}
                  </span>
                  <span className="sm:hidden">Vancouver, BC</span>
                </span>
              </a>
              <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden="true" />
              <a
                href={STORE.phoneHref}
                className="hidden items-center gap-1.5 text-[13px] text-white/75 hover:text-white sm:flex"
              >
                <Phone size={14} aria-hidden="true" />
                {STORE.phone}
              </a>
            </div>

            <div className="flex shrink-0 items-center gap-5">
              <Link
                to="/shipping-information"
                className="hidden text-[13px] text-white/75 hover:text-white md:inline"
              >
                Shipping Information
              </Link>
              <span className="hidden text-[13px] text-white/50 lg:inline">
                {STORE.currencyLabel}
              </span>
              <Link to="/account" className="text-[13px] text-white/75 hover:text-white">
                My Account
              </Link>
            </div>
          </div>
        </div>

        {/* TIER 2 — brand + search + cart */}
        <div className="border-b border-border bg-card">
          <div className="container-sbs flex items-center gap-6 py-4 lg:h-[108px] lg:py-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="micro border border-border px-3 py-3 lg:hidden"
            >
              Menu
            </button>

            <Link to="/" aria-label="Secret Builders Society — home" className="shrink-0">
              <img
                src="/images/brand/sbs-horizontal-light-bg.svg"
                alt="Secret Builders Society"
                width={310}
                height={87}
                className="h-12 w-[168px] object-contain object-left md:h-[68px] md:w-[240px] lg:h-[86px] lg:w-[310px]"
              />

            </Link>

            <form
              onSubmit={submit}
              role="search"
              className="mx-auto hidden w-full max-w-[680px] items-stretch md:flex"
              aria-label="Search the catalogue"
            >
              <div className="relative flex-1">
                <Search
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, brands, series, SKU or UPC"
                  aria-label="Search products, brands, series, SKU or UPC"
                  maxLength={120}
                  className="h-13 w-full border border-border border-r-0 bg-white py-3.5 pl-11 pr-4 text-[15px] outline-none placeholder:text-muted-foreground focus:border-charcoal"
                />
              </div>
              <button type="submit" className="micro bg-sbs-red px-8 text-white hover:bg-sbs-red-deep">
                Search
              </button>
            </form>

            <div className="ml-auto flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={openDrawer}
                aria-label={`Cart, ${count} items, ${formatMoneyCAD(subtotal)}`}
                className="inline-flex items-center gap-3 border border-charcoal bg-charcoal px-4 py-3 text-white transition-colors duration-200 hover:border-sbs-red hover:bg-sbs-red lg:px-5"
              >
                <ShoppingBag size={20} aria-hidden="true" />
                <span className="hidden text-left leading-tight sm:block">
                  <span className="micro-sm block">Cart ({count})</span>
                  <span className="block text-[13px] text-white/75">
                    {formatMoneyCAD(subtotal)}
                  </span>
                </span>
                <span className="micro-sm sm:hidden">{count}</span>
              </button>
            </div>
          </div>

          {/* mobile search */}
          <form onSubmit={submit} role="search" className="container-sbs flex pb-4 md:hidden">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands, series, SKU…"
              aria-label="Search the catalogue"
              maxLength={120}
              className="h-11 w-full border border-border border-r-0 bg-white px-3 text-[15px] outline-none focus:border-charcoal"
            />
            <button type="submit" className="micro bg-sbs-red px-5 text-white">
              Go
            </button>
          </form>
        </div>

        {/* TIER 3 — primary navigation */}
        <div className="hidden border-b border-border bg-card lg:block">
          <div className="container-sbs flex h-[50px] items-center gap-6 xl:gap-7">
            <button
              type="button"
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen((v) => !v)}
              onMouseEnter={() => setMegaOpen(true)}
              className={`text-[14px] font-medium uppercase tracking-wide transition-colors duration-200 ${
                megaOpen ? "text-sbs-red" : "hover:text-sbs-red"
              }`}
            >
              Shop All
            </button>
            {CATEGORY_NAV.map((c) => (
              <Link
                key={c.slug}
                to="/shop/$category"
                params={{ category: c.slug }}
                search={{ sort: "featured" }}
                onMouseEnter={() => setMegaOpen(false)}
                className="whitespace-nowrap text-[14px] font-medium uppercase tracking-wide transition-colors duration-200 hover:text-sbs-red"
                activeProps={{ className: "text-sbs-red" }}
              >
                {c.name}
              </Link>
            ))}
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onMouseEnter={() => setMegaOpen(false)}
                className="whitespace-nowrap text-[14px] font-medium uppercase tracking-wide transition-colors duration-200 hover:text-sbs-red"
                activeProps={{ className: "text-sbs-red" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {megaOpen ? (
          <div className="hidden lg:block">
            <MegaMenu onNavigate={() => setMegaOpen(false)} />
          </div>
        ) : null}
      </header>

      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
