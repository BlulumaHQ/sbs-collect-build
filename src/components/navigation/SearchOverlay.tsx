import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { searchProducts } from "@/commerce/adapter";
import { formatPrice } from "@/commerce/format";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery("");
      const id = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => searchProducts(query).slice(0, 6), [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Search products">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-charcoal/70"
      />
      <div className="relative mx-auto w-full max-w-3xl border border-border bg-card p-5 md:mt-24 md:p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/search", search: { q: query } });
            onClose();
          }}
        >
          <label className="micro text-muted-foreground" htmlFor="sbs-search-input">
            Search the catalogue
          </label>
          <input
            id="sbs-search-input"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Title, maker, series, SKU"
            className="mt-2 w-full border-b border-charcoal/30 bg-transparent py-3 font-display text-xl text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-sbs-red"
          />
        </form>

        <div className="mt-6 max-h-[50vh] overflow-y-auto">
          {query.trim() === "" ? (
            <p className="micro text-muted-foreground">Type to search 28 demo products.</p>
          ) : results.length === 0 ? (
            <p className="micro text-muted-foreground">No products found.</p>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    to="/product/$handle"
                    params={{ handle: product.handle }}
                    onClick={onClose}
                    className="flex items-center gap-4 py-3 transition-colors duration-200 hover:bg-bone"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="h-14 w-14 shrink-0 border border-border bg-bone object-contain p-1"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="micro block text-muted-foreground">{product.vendor}</span>
                      <span className="block truncate text-sm text-foreground">{product.title}</span>
                    </span>
                    <span className="micro shrink-0 text-foreground">
                      {formatPrice(product.price, product.currency)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button type="button" onClick={onClose} className="micro text-muted-foreground hover:text-sbs-red">
            Close
          </button>
          <Link
            to="/search"
            search={{ q: query }}
            onClick={onClose}
            className="micro border border-charcoal bg-charcoal px-5 py-3 text-white transition-colors duration-200 hover:border-sbs-red hover:bg-sbs-red"
          >
            View all results
          </Link>
        </div>
      </div>
    </div>
  );
}
