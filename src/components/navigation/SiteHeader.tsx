import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { MegaMenu } from "./MegaMenu";
import { MobileNavigation } from "./MobileNavigation";
import { SearchOverlay } from "./SearchOverlay";
import { useCart } from "@/commerce/cart";

const NAV = [
  { label: "PREORDERS", to: "/preorders" as const },
  { label: "COLLECTIONS", to: "/collections" as const },
  { label: "BRANDS", to: "/brands" as const },
  { label: "ABOUT", to: "/about" as const },
];

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, openDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const dark = isHome && !scrolled && !megaOpen;
  const logo = dark
    ? "/images/brand/sbs-horizontal-dark-bg.svg"
    : "/images/brand/sbs-horizontal-light-bg.svg";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-200 ${
          dark ? "bg-transparent" : "border-b border-border bg-card"
        }`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="container-sbs flex h-[64px] items-center justify-between gap-6 md:h-[78px]">
          <Link to="/" className="flex items-center" aria-label="Secret Builders Society — home">
            <img
              src={logo}
              alt="Secret Builders Society"
              className="h-7 w-auto md:h-9"
              width={240}
              height={68}
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            <button
              type="button"
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen((v) => !v)}
              onMouseEnter={() => setMegaOpen(true)}
              className={`micro transition-colors duration-200 hover:text-sbs-red ${
                dark ? "text-white" : "text-foreground"
              }`}
            >
              Shop
            </button>
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onMouseEnter={() => setMegaOpen(false)}
                className={`micro transition-colors duration-200 hover:text-sbs-red ${
                  dark ? "text-white" : "text-foreground"
                }`}
                activeProps={{ className: "micro text-sbs-red" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={`micro transition-colors duration-200 hover:text-sbs-red ${
                dark ? "text-white" : "text-foreground"
              }`}
            >
              Search
            </button>
            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Cart, ${count} items`}
              className={`micro transition-colors duration-200 hover:text-sbs-red ${
                dark ? "text-white" : "text-foreground"
              }`}
            >
              Cart ({count})
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={`micro lg:hidden ${dark ? "text-white" : "text-foreground"}`}
            >
              Menu
            </button>
          </div>
        </div>

        {megaOpen ? (
          <div className="hidden lg:block">
            <MegaMenu onNavigate={() => setMegaOpen(false)} />
          </div>
        ) : null}
      </header>

      <MobileNavigation
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSearch={() => {
          setMobileOpen(false);
          setSearchOpen(true);
        }}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
