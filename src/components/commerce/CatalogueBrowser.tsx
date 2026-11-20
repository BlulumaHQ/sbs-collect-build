import { useEffect, useState } from "react";
import type { CommerceProduct } from "@/types/commerce";
import type { ShopSearch } from "@/commerce/search-schema";
import type { Listing } from "@/commerce/listing";
import { LISTING_PAGE_SIZE } from "@/commerce/listing";
import { fetchListing, type CatalogueScope } from "@/commerce/catalog-api";
import { ProductGrid } from "./ProductGrid";
import { SortControl } from "./SortControl";
import { ProductFilters } from "./ProductFilters";

/**
 * Catalogue page body. The route loader supplies the first page (filtered and
 * sorted on the server); "Load more" fetches the next page for the same scope.
 */
export function CatalogueBrowser({
  scope,
  listing,
  search,
  onChange,
  showCategoryFilter = false,
  showFilters = true,
  emptyState,
}: {
  emptyState?: React.ReactNode;
  scope: CatalogueScope;
  listing: Listing;
  search: ShopSearch;
  onChange: (next: ShopSearch) => void;
  showCategoryFilter?: boolean;
  showFilters?: boolean;
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [items, setItems] = useState<CommerceProduct[]>(listing.items);
  const [loading, setLoading] = useState(false);

  // A new first page arrives whenever filters, sort or scope change.
  useEffect(() => {
    setItems(listing.items);
  }, [listing]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const next = await fetchListing({
        data: { scope, search, offset: items.length, limit: LISTING_PAGE_SIZE },
      });
      setItems((current) => [...current, ...next.items]);
    } finally {
      setLoading(false);
    }
  };

  const filters = showFilters ? (
    <ProductFilters
      facets={listing.facets}
      search={search}
      onChange={onChange}
      showCategoryFilter={showCategoryFilter}
    />
  ) : null;

  return (
    <div className={showFilters ? "grid gap-8 lg:grid-cols-[240px_1fr]" : ""}>
      {showFilters ? <aside className="hidden lg:block">{filters}</aside> : null}

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <p className="micro text-muted-foreground">
            {listing.total} {listing.total === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-3">
            {showFilters ? (
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="micro border border-border px-4 py-2 lg:hidden"
              >
                Filter
              </button>
            ) : null}
            <SortControl value={search.sort} onChange={(sort) => onChange({ ...search, sort })} />
          </div>
        </div>

        {listing.total === 0 && emptyState ? emptyState : <ProductGrid products={items} paginate={false} />}

        {items.length < listing.total ? (
          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="micro text-muted-foreground">
              Showing {items.length} of {listing.total}
            </p>
            <button
              type="button"
              onClick={loadMore}
              disabled={loading}
              className="micro border border-charcoal px-8 py-3 transition-colors duration-200 hover:border-sbs-red hover:bg-sbs-red hover:text-white disabled:opacity-50"
            >
              {loading ? "Loading…" : "Load more"}
            </button>
          </div>
        ) : null}
      </div>

      {showFilters && mobileFiltersOpen ? (
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
