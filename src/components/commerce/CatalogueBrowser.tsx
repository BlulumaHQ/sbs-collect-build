import { useMemo, useState } from "react";
import type { CommerceProduct } from "@/types/commerce";
import type { ShopSearch } from "@/commerce/search-schema";
import { ProductGrid } from "./ProductGrid";
import { SortControl } from "./SortControl";
import { ProductFilters } from "./ProductFilters";

export function sortProducts(products: CommerceProduct[], sort: ShopSearch["sort"]) {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "name-asc":
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return list.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return list;
  }
}

export function filterProducts(products: CommerceProduct[], search: ShopSearch) {
  return products.filter((p) => {
    if (search.category && p.categorySlug !== search.category) return false;
    if (search.subcategory && p.subcategory !== search.subcategory) return false;
    if (search.status && p.status !== search.status) return false;
    if (search.vendor && p.vendor !== search.vendor) return false;
    if (search.series && p.series !== search.series) return false;
    if (search.minPrice !== undefined && p.price < search.minPrice) return false;
    if (search.maxPrice !== undefined && p.price > search.maxPrice) return false;
    return true;
  });
}

export function CatalogueBrowser({
  scope,
  search,
  onChange,
  showCategoryFilter = false,
}: {
  scope: CommerceProduct[];
  search: ShopSearch;
  onChange: (next: ShopSearch) => void;
  showCategoryFilter?: boolean;
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const results = useMemo(
    () => sortProducts(filterProducts(scope, search), search.sort),
    [scope, search],
  );

  const filters = (
    <ProductFilters
      scope={scope}
      search={search}
      onChange={onChange}
      showCategoryFilter={showCategoryFilter}
    />
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">{filters}</aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <p className="micro text-muted-foreground">
            {results.length} {results.length === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="micro border border-border px-4 py-2 lg:hidden"
            >
              Filter
            </button>
            <SortControl value={search.sort} onChange={(sort) => onChange({ ...search, sort })} />
          </div>
        </div>

        <ProductGrid products={results} />
      </div>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-[75] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 h-full w-full bg-charcoal/70"
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto border-t border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="micro">Filters</span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="micro text-muted-foreground hover:text-sbs-red"
              >
                Done
              </button>
            </div>
            {filters}
          </div>
        </div>
      ) : null}
    </div>
  );
}
