import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { MegaMenu } from "./MegaMenu";
import { MobileNavigation } from "./MobileNavigation";
import { useCart } from "@/commerce/cart";
import { formatMoneyCAD } from "@/commerce/format";
import { PRIMARY_CATEGORIES } from "./taxonomy";
import { SHIPPING_LINE, STORE } from "@/config/store";

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
            <p className="micro hidden truncate text-white/70 sm:block">{SHIPPING_LINE}</p>
            <p className="micro truncate text-white/70 sm:hidden">Free shipping over $150</p>
            <div className="flex items-center gap-5">
              <span className="micro hidden text-white/55 md:inline">
                {STORE.city}, {STORE.region}
              </span>
              <Link to="/account" className="micro text-white/80 hover:text-white">
                Account
              </Link>
              <button
                type="button"
                onClick={openDrawer}
                className="micro text-white/80 hover:text-white"
              >
                Cart {count} · {formatMoneyCAD(subtotal)}
              </button>
            </div>
          </div>
        </div>

        {/* TIER 2 — brand + search */}
        <div className="border-b border-border bg-card">
          <div className="container-sbs flex items-center gap-6 py-4 md:py-6">
            <Link to="/" aria-label="Secret Builders Society — home" className="shrink-0">
              <img
                src="/images/brand/sbs-horizontal-light-bg.svg"
                alt="Secret Builders Society"
                width={320}
                height={90}
                className="h-10 w-auto md:h-16 lg:h-[68px]"
              />
            </Link>

            <form
              onSubmit={submit}
              role="search"
              className="hidden flex-1 items-stretch md:flex"
              aria-label="Search the catalogue"
            >
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, series, maker, SKU or UPC"
                aria-label="Search by title, series, maker, SKU or UPC"
                maxLength={120}
                className="h-12 w-full border border-border border-r-0 bg-white px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-charcoal"
              />
              <button type="submit" className="micro bg-sbs-red px-7 text-white hover:bg-sbs-red-deep">
                Search
              </button>
            </form>

            <div className="ml-auto flex items-center gap-3 md:ml-0">
              <Link
                to="/account"
                className="micro hidden border border-border px-4 py-3 text-charcoal hover:border-charcoal lg:inline-flex"
              >
                Account
              </Link>
              <button
                type="button"
                onClick={openDrawer}
                aria-label={`Cart, ${count} items, ${formatMoneyCAD(subtotal)}`}
                className="micro inline-flex items-center gap-2 border border-charcoal bg-charcoal px-4 py-3 text-white transition-colors duration-200 hover:border-sbs-red hover:bg-sbs-red"
              >
                <span>Cart ({count})</span>
                <span className="hidden text-white/70 sm:inline">{formatMoneyCAD(subtotal)}</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="micro border border-border px-4 py-3 lg:hidden"
              >
                Menu
              </button>
            </div>
          </div>

          {/* mobile search */}
          <form onSubmit={submit} role="search" className="container-sbs flex pb-4 md:hidden">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, series, SKU…"
              aria-label="Search the catalogue"
              maxLength={120}
              className="h-11 w-full border border-border border-r-0 bg-white px-3 text-sm outline-none focus:border-charcoal"
            />
            <button type="submit" className="micro bg-sbs-red px-5 text-white">
              Go
            </button>
          </form>
        </div>

        {/* TIER 3 — primary navigation */}
        <div className="hidden border-b border-border bg-card lg:block">
          <div className="container-sbs flex items-center gap-7">
            <button
              type="button"
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen((v) => !v)}
              onMouseEnter={() => setMegaOpen(true)}
              className={`micro border-b-2 py-4 transition-colors duration-200 ${
                megaOpen ? "border-sbs-red text-sbs-red" : "border-transparent hover:text-sbs-red"
              }`}
            >
              Shop All
            </button>
            {PRIMARY_CATEGORIES.slice(0, 4).map((c) => (
              <Link
                key={c.slug}
                to="/shop/$category"
                params={{ category: c.slug }}
                search={{ sort: "featured" }}
                onMouseEnter={() => setMegaOpen(false)}
                className="micro border-b-2 border-transparent py-4 transition-colors duration-200 hover:text-sbs-red"
                activeProps={{ className: "micro border-b-2 border-sbs-red py-4 text-sbs-red" }}
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
                className="micro border-b-2 border-transparent py-4 transition-colors duration-200 hover:text-sbs-red"
                activeProps={{ className: "micro border-b-2 border-sbs-red py-4 text-sbs-red" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/shop"
              search={{ sort: "featured" }}
              onMouseEnter={() => setMegaOpen(false)}
              className="micro ml-auto py-4 text-sbs-red"
            >
              Sale & Clearance
            </Link>
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
