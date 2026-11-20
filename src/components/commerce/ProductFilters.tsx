import { useState } from "react";
import type { Facets } from "@/commerce/listing";
import { PRICE_BANDS } from "@/commerce/listing";
import type { ShopSearch } from "@/commerce/search-schema";
import { formatPrice } from "@/commerce/format";

const FILTER_STATUS_LABEL: Record<string, string> = {
  available: "IN STOCK",
  "last-one": "LAST ONE",
  preorder: "PREORDER",
  "sold-out": "SOLD OUT",
};
import { categorySlug } from "@/commerce/constants";
import { GUNPLA_GRADES, GUNDAM_SERIES } from "@/commerce/attributes";

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-5">
      <h3 className="micro mb-3 text-muted-foreground">{title}</h3>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function Option({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-h-10 items-center justify-between gap-2 text-left text-sm lg:min-h-0 transition-colors duration-200 ${
        active ? "text-sbs-red" : "text-charcoal/80 hover:text-sbs-red"
      }`}
    >
      <span className="truncate">{label}</span>
      {count !== undefined ? <span className="micro text-muted-foreground">{count}</span> : null}
    </button>
  );
}

/** Shows the 12 largest options first; "Show all" reveals the rest (alphabetical). */
function LongList({
  items,
  active,
  render,
}: {
  items: [string, number][];
  active: string | undefined;
  render: (item: [string, number]) => React.ReactNode;
}) {
  const [all, setAll] = useState(false);
  const LIMIT = 12;
  if (items.length <= LIMIT || all) {
    return (
      <>
        {items.map(render)}
        {items.length > LIMIT ? (
          <button type="button" onClick={() => setAll(false)} className="micro mt-1 text-left text-sbs-red">
            Show less
          </button>
        ) : null}
      </>
    );
  }
  const top = [...items].sort((a, b) => b[1] - a[1]).slice(0, LIMIT);
  if (active && !top.some(([v]) => v === active)) {
    const hit = items.find(([v]) => v === active);
    if (hit) top.push(hit);
  }
  top.sort((a, b) => a[0].localeCompare(b[0]));
  return (
    <>
      {top.map(render)}
      <button type="button" onClick={() => setAll(true)} className="micro mt-1 text-left text-sbs-red">
        Show all {items.length}
      </button>
    </>
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

  const subcategories = facets.subcategories;
  const statuses = facets.statuses;
  const vendors = facets.vendors;
  const seriesList = facets.series;
  const grades = GUNPLA_GRADES.filter((g) => facets.grades[g.code]);
  const scales = facets.scales;
  const gundamSeries = GUNDAM_SERIES.filter((s) => facets.gundamSeries[s.code]);
  const min = facets.minPrice;
  const max = facets.maxPrice;

  const bandLabels = [
    `Under ${formatPrice(25)}`,
    `${formatPrice(25)} – ${formatPrice(50)}`,
    `${formatPrice(50)} – ${formatPrice(100)}`,
    `${formatPrice(100)}+`,
  ];
  const priceBands = PRICE_BANDS.map((band, i) => ({ ...band, label: bandLabels[i]!, count: facets.priceBands[i] ?? 0 })).filter(
    (band) => band.count > 0,
  );

  const hasActive =
    Boolean(
      search.subcategory || search.status || search.vendor || search.series || search.category ||
        search.grade || search.scale || search.gseries || search.sale || search.new,
    ) ||
    search.minPrice !== undefined ||
    search.maxPrice !== undefined;

  const categoriesInScope = facets.categories;

  return (
    <div>
      <div className="flex items-center justify-between border-b border-charcoal/25 pb-3">
        <h2 className="micro text-foreground">Filters</h2>
        {hasActive ? (
          <button
            type="button"
            onClick={() => onChange({ sort: search.sort })}
            className="micro text-sbs-red"
          >
            Clear
          </button>
        ) : null}
      </div>

      {showCategoryFilter && categoriesInScope.length > 1 ? (
        <FilterGroup title="Category">
          {categoriesInScope.map(([name, n]) => (
            <Option
              key={name}
              label={name}
              count={n}
              active={search.category === categorySlug(name)}
              onClick={() => toggle("category", categorySlug(name))}
            />
          ))}
        </FilterGroup>
      ) : null}

      {grades.length > 0 ? (
        <FilterGroup title="Grade">
          {grades.map((g) => (
            <Option
              key={g.code}
              label={g.code === "OTHER" ? g.name : `${g.code} · ${g.name}`}
              count={facets.grades[g.code] ?? 0}
              active={search.grade === g.code}
              onClick={() => toggle("grade", g.code)}
            />
          ))}
        </FilterGroup>
      ) : null}

      {gundamSeries.length > 0 ? (
        <FilterGroup title="Gundam Series">
          {gundamSeries.map((s) => (
            <Option
              key={s.code}
              label={s.name}
              count={facets.gundamSeries[s.code] ?? 0}
              active={search.gseries === s.code}
              onClick={() => toggle("gseries", s.code)}
            />
          ))}
        </FilterGroup>
      ) : null}

      {scales.length > 0 ? (
        <FilterGroup title="Scale">
          {scales.map(([scale, n]) => (
            <Option
              key={scale}
              label={scale}
              count={n}
              active={search.scale === scale}
              onClick={() => toggle("scale", scale)}
            />
          ))}
        </FilterGroup>
      ) : null}

      {subcategories.length > 0 ? (
        <FilterGroup title="Subcategory">
          {subcategories.map(([sub, n]) => (
            <Option
              key={sub}
              label={sub}
              count={n}
              active={search.subcategory === sub}
              onClick={() => toggle("subcategory", sub)}
            />
          ))}
        </FilterGroup>
      ) : null}

      {statuses.length > 1 ? (
        <FilterGroup title="Availability">
          {statuses.map(([status, n]) => (
            <Option
              key={status}
              label={FILTER_STATUS_LABEL[status] ?? status}
              count={n}
              active={search.status === status}
              onClick={() => toggle("status", status)}
            />
          ))}
        </FilterGroup>
      ) : null}

      {vendors.length > 1 ? (
        <FilterGroup title="Maker">
          <LongList
            items={vendors}
            active={search.vendor}
            render={([vendor, n]) => (
              <Option
                key={vendor}
                label={vendor}
                count={n}
                active={search.vendor === vendor}
                onClick={() => toggle("vendor", vendor)}
              />
            )}
          />
        </FilterGroup>
      ) : null}

      {seriesList.length > 1 ? (
        <FilterGroup title="Series">
          <LongList
            items={seriesList}
            active={search.series}
            render={([series, n]) => (
              <Option
                key={series}
                label={series}
                count={n}
                active={search.series === series}
                onClick={() => toggle("series", series)}
              />
            )}
          />
        </FilterGroup>
      ) : null}

      {priceBands.length > 1 && max > min ? (
        <FilterGroup title="Price">
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
