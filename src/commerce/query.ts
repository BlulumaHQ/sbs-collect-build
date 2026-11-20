import type { CommerceProduct } from "@/types/commerce";
import type { ShopSearch } from "@/commerce/search-schema";
import { CATEGORY_ORDER } from "@/commerce/adapter";
import { GUNPLA_GRADES, GUNDAM_SERIES } from "@/commerce/attributes";

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
      // "Featured": products tagged `featured` in Shopify first, then the rest in catalogue order.
      return list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }
}

export function filterProducts(products: CommerceProduct[], search: ShopSearch) {
  return products.filter((p) => {
    if (search.category && p.categorySlug !== search.category) return false;
    if (search.subcategory && p.subcategory !== search.subcategory) return false;
    if (search.status && p.status !== search.status) return false;
    if (search.vendor && p.vendor !== search.vendor) return false;
    if (search.series && p.series !== search.series) return false;
    if (search.grade && p.grade !== search.grade) return false;
    if (search.scale && p.scale !== search.scale) return false;
    if (search.gseries && p.gundamSeries !== search.gseries) return false;
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
  const results = sortProducts(filterProducts(scope, search), search.sort);
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
