import type { CommerceProduct } from "@/types/commerce";
import type { ShopSearch } from "@/commerce/search-schema";
import { formatPrice } from "@/commerce/format";

const FILTER_STATUS_LABEL: Record<string, string> = {
  available: "IN STOCK",
  "last-one": "LAST ONE",
  preorder: "PREORDER",
  "sold-out": "SOLD OUT",
};
import { CATEGORY_ORDER, categorySlug } from "@/commerce/adapter";
import { GUNPLA_GRADES, GUNDAM_SERIES } from "@/commerce/attributes";
import type { ProductStatus } from "@/types/commerce";

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
      className={`flex items-center justify-between gap-2 text-left text-sm transition-colors duration-200 ${
        active ? "text-sbs-red" : "text-charcoal/80 hover:text-sbs-red"
      }`}
    >
      <span className="truncate">{label}</span>
      {count !== undefined ? <span className="micro text-muted-foreground">{count}</span> : null}
    </button>
  );
}

export function ProductFilters({
  scope,
  search,
  onChange,
  showCategoryFilter,
}: {
  scope: CommerceProduct[];
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

  const countBy = (predicate: (p: CommerceProduct) => boolean) => scope.filter(predicate).length;

  const subcategories = [...new Set(scope.map((p) => p.subcategory).filter(Boolean))].sort() as string[];
  const statuses = [...new Set(scope.map((p) => p.status))] as ProductStatus[];
  const vendors = [...new Set(scope.map((p) => p.vendor))].sort();
  const seriesList = [...new Set(scope.map((p) => p.series).filter(Boolean))].sort() as string[];
  const grades = GUNPLA_GRADES.filter((g) => scope.some((p) => p.grade === g.code));
  const scales = [...new Set(scope.map((p) => p.scale).filter(Boolean))].sort() as string[];
  const gundamSeries = GUNDAM_SERIES.filter((s) => scope.some((p) => p.gundamSeries === s.code));
  const prices = scope.map((p) => p.price);
  const min = Math.floor(Math.min(...prices, 0));
  const max = Math.ceil(Math.max(...prices, 0));

  const priceBands = [
    { label: `Under ${formatPrice(25)}`, min: 0, max: 25 },
    { label: `${formatPrice(25)} – ${formatPrice(50)}`, min: 25, max: 50 },
    { label: `${formatPrice(50)} – ${formatPrice(100)}`, min: 50, max: 100 },
    { label: `${formatPrice(100)}+`, min: 100, max: 100000 },
  ].filter((band) => scope.some((p) => p.price >= band.min && p.price <= band.max));

  const hasActive =
    Boolean(
      search.subcategory || search.status || search.vendor || search.series || search.category ||
        search.grade || search.scale || search.gseries || search.sale || search.new,
    ) ||
    search.minPrice !== undefined ||
    search.maxPrice !== undefined;

  const categoriesInScope = CATEGORY_ORDER.filter((name) => scope.some((p) => p.category === name));

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
          {categoriesInScope.map((name) => (
            <Option
              key={name}
              label={name}
              count={countBy((p) => p.category === name)}
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
              count={countBy((p) => p.grade === g.code)}
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
              count={countBy((p) => p.gundamSeries === s.code)}
              active={search.gseries === s.code}
              onClick={() => toggle("gseries", s.code)}
            />
          ))}
        </FilterGroup>
      ) : null}

      {scales.length > 0 ? (
        <FilterGroup title="Scale">
          {scales.map((scale) => (
            <Option
              key={scale}
              label={scale}
              count={countBy((p) => p.scale === scale)}
              active={search.scale === scale}
              onClick={() => toggle("scale", scale)}
            />
          ))}
        </FilterGroup>
      ) : null}

      {subcategories.length > 0 ? (
        <FilterGroup title="Subcategory">
          {subcategories.map((sub) => (
            <Option
              key={sub}
              label={sub}
              count={countBy((p) => p.subcategory === sub)}
              active={search.subcategory === sub}
              onClick={() => toggle("subcategory", sub)}
            />
          ))}
        </FilterGroup>
      ) : null}

      {statuses.length > 1 ? (
        <FilterGroup title="Availability">
          {statuses.map((status) => (
            <Option
              key={status}
              label={FILTER_STATUS_LABEL[status] ?? status}
              count={countBy((p) => p.status === status)}
              active={search.status === status}
              onClick={() => toggle("status", status)}
            />
          ))}
        </FilterGroup>
      ) : null}

      {vendors.length > 1 ? (
        <FilterGroup title="Maker">
          {vendors.map((vendor) => (
            <Option
              key={vendor}
              label={vendor}
              count={countBy((p) => p.vendor === vendor)}
              active={search.vendor === vendor}
              onClick={() => toggle("vendor", vendor)}
            />
          ))}
        </FilterGroup>
      ) : null}

      {seriesList.length > 1 ? (
        <FilterGroup title="Series">
          {seriesList.map((series) => (
            <Option
              key={series}
              label={series}
              count={countBy((p) => p.series === series)}
              active={search.series === series}
              onClick={() => toggle("series", series)}
            />
          ))}
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
                count={countBy((p) => p.price >= band.min && p.price <= band.max)}
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
