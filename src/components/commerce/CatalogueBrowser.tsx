import { useState } from "react";
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
            {pageCount > 1 ? ` · page ${page} of ${pageCount}` : ""}
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
          <Pagination
            page={page}
            pageCount={pageCount}
            onPage={(p) => {
              onChange({ ...search, page: p > 1 ? p : undefined });
              if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
            }}
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
export function Pagination({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (page: number) => void;
}) {
  const pages = [...new Set([1, page - 1, page, page + 1, pageCount])]
    .filter((p) => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b);
  const cls = "micro flex h-11 min-w-11 items-center justify-center border px-3 transition-colors";
  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        className={`${cls} border-border hover:border-sbs-red disabled:opacity-40`}
        aria-label="Previous page"
      >
        ‹
      </button>
      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-2">
          {i > 0 && p - pages[i - 1]! > 1 ? (
            <span className="micro text-muted-foreground" aria-hidden="true">
              …
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => onPage(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${cls} ${
              p === page
                ? "border-sbs-red bg-sbs-red text-white"
                : "border-border hover:border-sbs-red hover:text-sbs-red"
            }`}
          >
            {p}
          </button>
        </span>
      ))}
      <button
        type="button"
        disabled={page >= pageCount}
        onClick={() => onPage(page + 1)}
        className={`${cls} border-border hover:border-sbs-red disabled:opacity-40`}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
}
