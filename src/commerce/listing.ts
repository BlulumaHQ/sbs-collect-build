/**
 * Catalogue filtering, sorting and facet counts.
 *
 * Pure functions shared by the server (catalog-api.ts runs them against the
 * full snapshot) and the client (types only). Filters keep their counts based
 * on the whole scope, not the filtered result, exactly as before.
 */
import type { CommerceProduct, ProductStatus } from "@/types/commerce";
import type { ShopSearch } from "./search-schema";
import { CATEGORY_ORDER } from "./constants";

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

export const PRICE_BANDS = [
  { min: 0, max: 25 },
  { min: 25, max: 50 },
  { min: 50, max: 100 },
  { min: 100, max: 100000 },
] as const;

/** Value → product count, in display order. */
export type FacetList = [string, number][];

export interface Facets {
  categories: FacetList;
  grades: Record<string, number>;
  gundamSeries: Record<string, number>;
  scales: FacetList;
  subcategories: FacetList;
  statuses: [ProductStatus, number][];
  vendors: FacetList;
  series: FacetList;
  /** Count per PRICE_BANDS entry (same order). */
  priceBands: number[];
  minPrice: number;
  maxPrice: number;
}

function tally(list: CommerceProduct[], key: (p: CommerceProduct) => string | undefined) {
  const map = new Map<string, number>();
  for (const p of list) {
    const k = key(p);
    if (k) map.set(k, (map.get(k) ?? 0) + 1);
  }
  return map;
}

const alpha = (map: Map<string, number>): FacetList => [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));

export function computeFacets(scope: CommerceProduct[]): Facets {
  const cats = tally(scope, (p) => p.category);
  const prices = scope.map((p) => p.price);
  return {
    categories: CATEGORY_ORDER.filter((c) => cats.has(c)).map((c) => [c, cats.get(c) ?? 0]),
    grades: Object.fromEntries(tally(scope, (p) => p.grade)),
    gundamSeries: Object.fromEntries(tally(scope, (p) => p.gundamSeries)),
    scales: alpha(tally(scope, (p) => p.scale)),
    subcategories: alpha(tally(scope, (p) => p.subcategory)),
    statuses: [...tally(scope, (p) => p.status).entries()] as [ProductStatus, number][],
    vendors: alpha(tally(scope, (p) => p.vendor)),
    series: alpha(tally(scope, (p) => p.series)),
    priceBands: PRICE_BANDS.map((b) => scope.filter((p) => p.price >= b.min && p.price <= b.max).length),
    minPrice: Math.floor(Math.min(...prices, 0)),
    maxPrice: Math.ceil(Math.max(...prices, 0)),
  };
}

export interface Listing {
  items: CommerceProduct[];
  /** Products matching the active filters. */
  total: number;
  /** Products in the whole scope (before filters). */
  scopeTotal: number;
  facets: Facets;
}

export const LISTING_PAGE_SIZE = 48;
