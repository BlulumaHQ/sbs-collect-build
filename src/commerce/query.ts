import type { CommerceProduct } from "@/types/commerce";
import type { ShopSearch } from "@/commerce/search-schema";
import { CATEGORY_ORDER } from "@/commerce/adapter";
import { GUNPLA_GRADES, GUNDAM_SERIES } from "@/commerce/attributes";
import { matches } from "@/commerce/multi";

export function sortProducts(
  products: CommerceProduct[],
  sort: ShopSearch["sort"],
  newestFirst = false,
) {
  const list = [...products];
  if (sort === "featured" && newestFirst) {
    // New Arrivals view: most recently listed first.
    return list.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  }
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "name-asc":
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return list.sort((a, b) => b.title.localeCompare(a.title));
    case "newest":
      // New arrivals first, then most recently created in Shopify.
      return list.sort(
        (a, b) =>
          Number(Boolean(b.newArrival)) - Number(Boolean(a.newArrival)) ||
          (b.createdAt ?? "").localeCompare(a.createdAt ?? ""),
      );
    default:
      // "Featured": products tagged `featured` in Shopify first, then the rest in catalogue order.
      return list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }
}

export function filterProducts(products: CommerceProduct[], search: ShopSearch) {
  return products.filter((p) => {
    if (search.category && p.categorySlug !== search.category) return false;
    // Multi-select groups: any chosen value matches (OR within a group, AND across groups).
    if (!matches(search.subcategory, p.subcategory)) return false;
    if (!matches(search.status, p.status)) return false;
    if (!matches(search.vendor, p.vendor)) return false;
    if (!matches(search.series, p.series)) return false;
    if (!matches(search.grade, p.grade)) return false;
    if (!matches(search.scale, p.scale)) return false;
    if (!matches(search.gseries, p.gundamSeries)) return false;
    if (search.sale && !(p.compareAtPrice && p.compareAtPrice > p.price)) return false;
    if (search.new && !p.newArrival) return false;
    if (search.minPrice !== undefined && p.price < search.minPrice) return false;
    if (search.maxPrice !== undefined && p.price > search.maxPrice) return false;
    return true;
  });
}

export interface FacetOption {
  value: string;
  count: number;
}

/** Filter options + counts for a product scope (computed on the server). */
export interface Facets {
  categories: FacetOption[];
  grades: FacetOption[];
  gundamSeries: FacetOption[];
  scales: FacetOption[];
  subcategories: FacetOption[];
  statuses: FacetOption[];
  /** Products tagged new-arrival, counted against every other active filter. */
  newArrivals: number;
  vendors: FacetOption[];
  series: FacetOption[];
  priceBands: { min: number; max: number; count: number }[];
}

function tally(values: (string | undefined | null)[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const v of values) if (v) m.set(v, (m.get(v) ?? 0) + 1);
  return m;
}
const sorted = (m: Map<string, number>): FacetOption[] =>
  [...m.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([value, count]) => ({ value, count }));
const ordered = (m: Map<string, number>, order: readonly string[]): FacetOption[] =>
  order.filter((v) => m.has(v)).map((value) => ({ value, count: m.get(value)! }));

const PRICE_BANDS = [
  { min: 0, max: 25 },
  { min: 25, max: 50 },
  { min: 50, max: 100 },
  { min: 100, max: 100000 },
];

/**
 * Filter options for a scope, faceted: each group's options are counted against the products
 * that match every OTHER active filter, so any option shown leads to at least one product
 * (no more "No products" after combining category + scale + brand).
 */
export function computeFacets(scope: CommerceProduct[], search: Partial<ShopSearch> = {}): Facets {
  const without = (...keys: (keyof ShopSearch)[]) => {
    const rest = { ...search } as Record<string, unknown>;
    for (const k of keys) delete rest[k];
    return filterProducts(scope, rest as unknown as ShopSearch);
  };
  const forCategory = without("category", "subcategory");
  const forGrade = without("grade");
  const forGseries = without("gseries");
  const forScale = without("scale");
  const forSub = without("subcategory");
  const forStatus = without("status");
  const forNew = without("new");
  const forVendor = without("vendor");
  const forSeries = without("series");
  const forPrice = without("minPrice", "maxPrice");
  return {
    categories: ordered(tally(forCategory.map((p) => p.category)), CATEGORY_ORDER),
    grades: ordered(
      tally(forGrade.map((p) => p.grade)),
      GUNPLA_GRADES.map((g) => g.code),
    ),
    gundamSeries: ordered(
      tally(forGseries.map((p) => p.gundamSeries)),
      GUNDAM_SERIES.map((s) => s.code),
    ),
    scales: sorted(tally(forScale.map((p) => p.scale))),
    subcategories: sorted(tally(forSub.map((p) => p.subcategory))),
    statuses: [...tally(forStatus.map((p) => p.status)).entries()].map(([value, count]) => ({
      value,
      count,
    })),
    newArrivals: forNew.filter((p) => p.newArrival).length,
    vendors: sorted(tally(forVendor.map((p) => p.vendor))),
    series: sorted(tally(forSeries.map((p) => p.series))),
    priceBands: PRICE_BANDS.map((b) => ({
      ...b,
      count: forPrice.filter((p) => p.price >= b.min && p.price <= b.max).length,
    })).filter((b) => b.count > 0),
  };
}

export const PAGE_SIZE = 48;

/** One page of a catalogue view: what the browser actually receives. */
export interface CatalogPage {
  items: CommerceProduct[];
  total: number;
  page: number;
  pageCount: number;
  facets: Facets;
}

export function paginate(scope: CommerceProduct[], search: ShopSearch): CatalogPage {
  const results = sortProducts(filterProducts(scope, search), search.sort, Boolean(search.new));
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, search.page ?? 1), pageCount);
  return {
    items: results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    total: results.length,
    page,
    pageCount,
    facets: computeFacets(scope, search),
  };
}
