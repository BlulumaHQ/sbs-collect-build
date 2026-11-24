import { Children, isValidElement, useState } from "react";
import type { Facets } from "@/commerce/query";
import type { ShopSearch } from "@/commerce/search-schema";
import { formatPrice } from "@/commerce/format";

const FILTER_STATUS_LABEL: Record<string, string> = {
  available: "IN STOCK",
  "last-one": "LAST ONE",
  preorder: "PREORDER",
  "sold-out": "SOLD OUT",
};
import { categorySlug } from "@/commerce/adapter";
import { hasValue, toggleValue } from "@/commerce/multi";
import { GUNPLA_GRADES, GUNDAM_SERIES } from "@/commerce/attributes";

const VISIBLE_OPTIONS = 8;

function FilterGroup({
  title,
  children,
  onReset,
}: {
  title: string;
  children: React.ReactNode;
  /** Shown when this group has a selection: clears just this group. */
  onReset?: (() => void) | undefined;
}) {
  const items = Children.toArray(children);
  const [expanded, setExpanded] = useState(false);
  // Keep the list open if the chosen option sits below the fold.
  const activeHidden = items
    .slice(VISIBLE_OPTIONS)
    .some((c) => isValidElement<{ active?: boolean }>(c) && c.props.active);
  const showAll = expanded || activeHidden || items.length <= VISIBLE_OPTIONS + 2;
  return (
    <div className="border-b border-border py-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="micro text-muted-foreground">{title}</h3>
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="micro min-h-9 px-1 text-sbs-red hover:underline"
            aria-label={`Reset ${title}`}
          >
            Reset
          </button>
        ) : null}
      </div>
      <div className="flex flex-col">{showAll ? items : items.slice(0, VISIBLE_OPTIONS)}</div>
      {items.length > VISIBLE_OPTIONS + 2 && !activeHidden ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="micro mt-1 min-h-11 text-left text-sbs-red hover:underline lg:min-h-9"
        >
          {expanded ? "Show less" : `Show all ${items.length}`}
        </button>
      ) : null}
    </div>
  );
}

function Option({
  label,
  active,
  count,
  onClick,
  multi = false,
}: {
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
  /** Several options in this group can be on at once: show a tick box. */
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`-mx-2 flex min-h-11 w-[calc(100%+1rem)] items-center justify-between gap-2 px-2 text-left text-[15px] transition-colors duration-200 lg:min-h-9 ${
        active
          ? "bg-sbs-red/10 font-medium text-sbs-red"
          : "text-charcoal/85 hover:bg-charcoal/5 hover:text-sbs-red"
      }`}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        {multi ? (
          <span
            aria-hidden
            className={`flex size-4 shrink-0 items-center justify-center border transition-colors duration-200 ${
              active ? "border-sbs-red bg-sbs-red text-white" : "border-charcoal/40 bg-white"
            }`}
          >
            {active ? (
              <svg
                viewBox="0 0 12 12"
                className="size-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2.5 6.2 5 8.5l4.5-5" />
              </svg>
            ) : null}
          </span>
        ) : null}
        <span className="truncate">{label}</span>
      </span>
      {count !== undefined ? <span className="micro text-muted-foreground">{count}</span> : null}
    </button>
  );
}

export function ProductFilters({
  facets,
  search,
  onChange,
  showCategoryFilter,
}: {
  facets: Facets;
  search: ShopSearch;
  onChange: (next: ShopSearch) => void;
  showCategoryFilter: boolean;
}) {
  const toggle = <K extends keyof ShopSearch>(key: K, value: ShopSearch[K]) => {
    const next: ShopSearch = { ...search };
    if (search[key] === value) delete next[key];
    else next[key] = value;
    onChange(next);
  };

  type MultiKey = "grade" | "gseries" | "scale" | "subcategory" | "status" | "vendor" | "series";
  const toggleMulti = (key: MultiKey, value: string) => {
    const next: ShopSearch = { ...search };
    const v = toggleValue(search[key], value);
    if (v) next[key] = v;
    else delete next[key];
    onChange(next);
  };

  const resetKeys = (...keys: (keyof ShopSearch)[]) => {
    if (!keys.some((k) => search[k] !== undefined)) return undefined;
    return () => {
      const next: ShopSearch = { ...search };
      for (const k of keys) delete next[k];
      onChange(next);
    };
  };

  const label = <T extends { code: string; name: string }>(list: readonly T[], code: string) =>
    list.find((x) => x.code === code);
  const grades = facets.grades;
  const gundamSeries = facets.gundamSeries;
  const scales = facets.scales;
  const subcategories = facets.subcategories;
  const statuses = facets.statuses;
  const vendors = facets.vendors;
  const seriesList = facets.series;
  const priceBands = facets.priceBands.map((b) => ({
    ...b,
    label:
      b.max >= 100000
        ? `${formatPrice(b.min)}+`
        : b.min === 0
          ? `Under ${formatPrice(b.max)}`
          : `${formatPrice(b.min)} – ${formatPrice(b.max)}`,
  }));

  const hasActive =
    Boolean(
      search.subcategory ||
      search.status ||
      search.vendor ||
      search.series ||
      search.category ||
      search.grade ||
      search.scale ||
      search.gseries ||
      search.sale ||
      search.new,
    ) ||
    search.minPrice !== undefined ||
    search.maxPrice !== undefined;

  const categoriesInScope = facets.categories;

  return (
    <div>
      <div className="flex items-center justify-between border-b border-charcoal/25 pb-3">
        <h2 className="micro text-foreground">Filters</h2>
        <button
          type="button"
          disabled={!hasActive}
          onClick={() => onChange({ sort: search.sort })}
          className="micro min-h-9 border border-charcoal px-3 text-charcoal transition-colors duration-200 hover:border-sbs-red hover:bg-sbs-red hover:text-white disabled:cursor-default disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent"
        >
          Reset all
        </button>
      </div>

      {showCategoryFilter && categoriesInScope.length > 1 ? (
        <FilterGroup title="Category" onReset={resetKeys("category")}>
          {categoriesInScope.map(({ value: name, count }) => (
            <Option
              key={name}
              label={name}
              count={count}
              active={search.category === categorySlug(name)}
              onClick={() => toggle("category", categorySlug(name))}
            />
          ))}
        </FilterGroup>
      ) : null}

      {grades.length > 0 ? (
        <FilterGroup title="Grade" onReset={resetKeys("grade")}>
          {grades.map(({ value: code, count }) => (
            <Option
              key={code}
              label={
                code === "OTHER"
                  ? (label(GUNPLA_GRADES, code)?.name ?? code)
                  : `${code} · ${label(GUNPLA_GRADES, code)?.name ?? ""}`
              }
              count={count}
              active={hasValue(search.grade, code)}
              onClick={() => toggleMulti("grade", code)}
              multi
            />
          ))}
        </FilterGroup>
      ) : null}

      {gundamSeries.length > 0 ? (
        <FilterGroup title="Gundam Series" onReset={resetKeys("gseries")}>
          {gundamSeries.map(({ value: code, count }) => (
            <Option
              key={code}
              label={label(GUNDAM_SERIES, code)?.name ?? code}
              count={count}
              active={hasValue(search.gseries, code)}
              onClick={() => toggleMulti("gseries", code)}
              multi
            />
          ))}
        </FilterGroup>
      ) : null}

      {scales.length > 0 ? (
        <FilterGroup title="Scale" onReset={resetKeys("scale")}>
          {scales.map(({ value: scale, count }) => (
            <Option
              key={scale}
              label={scale}
              count={count}
              active={hasValue(search.scale, scale)}
              onClick={() => toggleMulti("scale", scale)}
              multi
            />
          ))}
        </FilterGroup>
      ) : null}

      {subcategories.length > 0 ? (
        <FilterGroup title="Subcategory" onReset={resetKeys("subcategory")}>
          {subcategories.map(({ value: sub, count }) => (
            <Option
              key={sub}
              label={sub}
              count={count}
              active={hasValue(search.subcategory, sub)}
              onClick={() => toggleMulti("subcategory", sub)}
              multi
            />
          ))}
        </FilterGroup>
      ) : null}

      {statuses.length > 1 || facets.newArrivals > 0 ? (
        <FilterGroup title="Availability" onReset={resetKeys("status", "new")}>
          {facets.newArrivals > 0 || search.new ? (
            <Option
              label="NEW ARRIVALS"
              count={facets.newArrivals}
              active={Boolean(search.new)}
              onClick={() => toggle("new", true)}
            />
          ) : null}
          {statuses.map(({ value: status, count }) => (
            <Option
              key={status}
              label={FILTER_STATUS_LABEL[status] ?? status}
              count={count}
              active={hasValue(search.status, status)}
              onClick={() => toggleMulti("status", status)}
              multi
            />
          ))}
        </FilterGroup>
      ) : null}

      {vendors.length > 1 ? (
        <FilterGroup title="Maker" onReset={resetKeys("vendor")}>
          {vendors.map(({ value: vendor, count }) => (
            <Option
              key={vendor}
              label={vendor}
              count={count}
              active={hasValue(search.vendor, vendor)}
              onClick={() => toggleMulti("vendor", vendor)}
              multi
            />
          ))}
        </FilterGroup>
      ) : null}

      {seriesList.length > 1 ? (
        <FilterGroup title="Series" onReset={resetKeys("series")}>
          {seriesList.map(({ value: series, count }) => (
            <Option
              key={series}
              label={series}
              count={count}
              active={hasValue(search.series, series)}
              onClick={() => toggleMulti("series", series)}
              multi
            />
          ))}
        </FilterGroup>
      ) : null}

      {priceBands.length > 1 ? (
        <FilterGroup title="Price" onReset={resetKeys("minPrice", "maxPrice")}>
          {priceBands.map((band) => {
            const active = search.minPrice === band.min && search.maxPrice === band.max;
            return (
              <Option
                key={band.label}
                label={band.label}
                count={band.count}
                active={active}
                onClick={() => {
                  const next: ShopSearch = { ...search };
                  if (active) {
                    delete next.minPrice;
                    delete next.maxPrice;
                  } else {
                    next.minPrice = band.min;
                    next.maxPrice = band.max;
                  }
                  onChange(next);
                }}
              />
            );
          })}
        </FilterGroup>
      ) : null}
    </div>
  );
}
