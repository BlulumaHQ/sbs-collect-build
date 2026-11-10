import type { SortKey } from "@/components/commerce/SortControl";

export interface ShopSearch {
  sort: SortKey;
  subcategory?: string | undefined;
  status?: string | undefined;
  vendor?: string | undefined;
  series?: string | undefined;
  category?: string | undefined;
  grade?: string | undefined;
  scale?: string | undefined;
  /** Gundam series code — distinct from the general `series` (franchise title) field. */
  gseries?: string | undefined;
  sale?: boolean | undefined;
  new?: boolean | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
}

const SORT_KEYS: SortKey[] = ["featured", "price-asc", "price-desc", "name-asc", "name-desc"];

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function num(value: unknown): number | undefined {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function flag(value: unknown): boolean {
  return value === true || value === 1 || value === "1" || value === "true";
}

export function validateShopSearch(search: Record<string, unknown>): ShopSearch {
  const sort = SORT_KEYS.includes(search['sort'] as SortKey) ? (search['sort'] as SortKey) : "featured";
  const result: ShopSearch = { sort };
  const subcategory = str(search['subcategory']);
  if (subcategory) result.subcategory = subcategory;
  const status = str(search['status']);
  if (status) result.status = status;
  const vendor = str(search['vendor']);
  if (vendor) result.vendor = vendor;
  const series = str(search['series']);
  if (series) result.series = series;
  const category = str(search['category']);
  if (category) result.category = category;
  for (const key of ["grade", "scale", "gseries"] as const) {
    const value = str(search[key]);
    if (value) result[key] = value;
  }
  if (flag(search['sale'])) result.sale = true;
  if (flag(search['new'])) result.new = true;
  const minPrice = num(search['minPrice']);
  if (minPrice !== undefined) result.minPrice = minPrice;
  const maxPrice = num(search['maxPrice']);
  if (maxPrice !== undefined) result.maxPrice = maxPrice;
  return result;
}
