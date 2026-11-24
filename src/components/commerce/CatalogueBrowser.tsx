import { useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import type { ShopSearch } from "@/commerce/search-schema";
import type { CatalogPage } from "@/commerce/query";
import { ProductGrid } from "./ProductGrid";
import { SortControl } from "./SortControl";
import { ProductFilters } from "./ProductFilters";
import { ActiveFilters, activeChips } from "./ActiveFilters";
import { useDialog } from "@/lib/use-dialog";

export function CatalogueBrowser({
  data,
  search,
  onChange,
  showCategoryFilter = false,
  emptyState,
}: {
  emptyState?: React.ReactNode;
  /** One server-computed page of results (see fetchCatalogPage). */
  data: CatalogPage;
  search: ShopSearch;
  onChange: (next: ShopSearch) => void;
  showCategoryFilter?: boolean;
}) {
  const navigate = useNavigate();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filterDialogRef = useDialog<HTMLDivElement>(mobileFiltersOpen, () =>
    setMobileFiltersOpen(false),
  );

  const { items, total, page, pageCount, facets } = data;

  const filters = (
    <ProductFilters
      facets={facets}
      search={search}
      onChange={(next) => onChange({ ...next, page: undefined })}
      showCategoryFilter={showCategoryFilter}
    />
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">{filters}</aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <p className="micro text-muted-foreground">
            {total} {total === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="micro min-h-11 border border-border px-5 py-2 lg:hidden"
            >
              Filter
              {activeChips(search).length ? ` (${activeChips(search).length})` : ""}
            </button>
            <SortControl
              value={search.sort}
              onChange={(sort) => onChange({ ...search, sort, page: undefined })}
            />
          </div>
        </div>

        <ActiveFilters search={search} onChange={onChange} />

        {total === 0 && emptyState ? (
          emptyState
        ) : (
          <ProductGrid products={items} hideNewBadge={Boolean(search.new)} />
        )}
        {pageCount > 1 ? (
          <LoadMore
            shown={items.length}
            total={total}
            page={page}
            pageCount={pageCount}
            onMore={(p) =>
              navigate({ to: ".", search: { ...search, page: p } as never, resetScroll: false })
            }
          />
        ) : null}
      </div>

      {mobileFiltersOpen ? (
        <div
          ref={filterDialogRef}
          className="fixed inset-0 z-[75] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <button
            type="button"
            aria-label="Close filters"
            tabIndex={-1}
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 h-full w-full bg-charcoal/70"
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto border-t border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="micro">Filters</span>
              <button
                type="button"
                data-autofocus
                onClick={() => setMobileFiltersOpen(false)}
                className="micro inline-flex min-h-11 min-w-11 items-center justify-center px-3 -mr-3 text-muted-foreground hover:text-sbs-red"
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

/** Numbered pages with first/last and neighbours, e.g. ‹ 1 … 4 5 6 … 20 ›. */
/**
 * "Load More" (Baymard: browses more products than numbered pages). Shows progress
 * ("48 of 3,821") and keeps the scroll position; the page number stays in the URL.
 */
export function LoadMore({
  shown,
  total,
  page,
  pageCount,
  onMore,
}: {
  shown: number;
  total: number;
  page: number;
  pageCount: number;
  onMore: (page: number) => void;
}) {
  const loading = useRouterState({ select: (s) => s.status === "pending" });
  if (total <= 0) return null;
  const pct = Math.min(100, Math.round((shown / total) * 100));
  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <p className="micro text-muted-foreground">
        Showing {shown.toLocaleString()} of {total.toLocaleString()}
      </p>
      <div className="h-[3px] w-48 bg-border" aria-hidden>
        <div
          className="h-full bg-sbs-red transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {page < pageCount ? (
        <button
          type="button"
          disabled={loading}
          onClick={() => onMore(page + 1)}
          className="micro min-h-12 min-w-56 border border-charcoal bg-white px-8 text-charcoal transition-colors duration-200 hover:border-sbs-red hover:bg-sbs-red hover:text-white disabled:opacity-60"
        >
          {loading ? "Loading…" : "Load more"}
        </button>
      ) : null}
    </div>
  );
}
