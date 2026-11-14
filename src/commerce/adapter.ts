import demoProducts from "@/data/demo-products.json";
import shopifyCatalog from "@/data/shopify-products.json";
import type {
  CommerceCategory,
  CommerceProduct,
  CommerceSeries,
  CommerceVendor,
  ProductStatus,
} from "@/types/commerce";
import { deriveGrade, deriveGundamSeries, deriveScale, isGundamTitle } from "./attributes";

/**
 * Commerce adapter
 *
 * Normalizes the catalogue into CommerceProduct objects. When
 * src/data/shopify-products.json holds products (written by
 * scripts/sync-shopify-catalog.mjs from the Shopify Storefront API), that
 * snapshot is the catalogue; otherwise the local demo catalogue is used.
 * The exported surface is identical either way, so the UI does not change.
 */

interface RawProduct {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  category: string;
  subcategory?: string | null;
  series?: string | null;
  character?: string | null;
  status: string;
  price: number;
  currency: string;
  packPrice?: number | null;
  packSize?: number | null;
  sku?: string | null;
  upc?: string | null;
  estimatedRelease?: string | null;
  compareAtPrice?: number | null;
  image: string;
  images?: string[] | null;
  /** Shopify variant id — present for the live catalogue, drives checkout. */
  variantId?: string | null;
  /** Optional explicit attributes — a Shopify adapter maps metafields here. */
  franchise?: string | null;
  grade?: string | null;
  scale?: string | null;
  gundamSeries?: string | null;
  newArrival?: boolean | null;
}

export const CATEGORY_ORDER = [
  "Figures",
  "Model Kits",
  "Plush",
  "Blind Boxes",
  "Hobby Supplies",
  "Character Goods",
  "Apparel",
] as const;

export function categorySlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function clean(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalize(p: RawProduct): CommerceProduct {
  const subcategory = clean(p.subcategory);
  const isGundam = clean(p.franchise)?.toLowerCase() === "gundam" || isGundamTitle(p.title, subcategory);
  return {
  id: p.id,
  handle: p.handle,
  title: p.title,
  vendor: p.vendor,
  category: p.category,
  categorySlug: categorySlug(p.category),
  subcategory,
  franchise: clean(p.franchise) ?? (isGundam ? "Gundam" : undefined),
  grade: deriveGrade({ grade: p.grade, title: p.title, category: p.category, subcategory }),
  scale: deriveScale({ scale: p.scale, title: p.title }),
  gundamSeries: deriveGundamSeries({ gundamSeries: p.gundamSeries, title: p.title, isGundam }),
  newArrival: p.newArrival === true ? true : undefined,
  series: clean(p.series),
  character: clean(p.character),
  status: p.status as ProductStatus,
  price: p.price,
  currency: p.currency,
  packPrice: p.packPrice ?? undefined,
  packSize: p.packSize ?? undefined,
  sku: clean(p.sku),
  upc: clean(p.upc),
  estimatedRelease: clean(p.estimatedRelease),
  compareAtPrice: p.compareAtPrice ?? undefined,
  image: p.image,
  images: p.images?.length ? p.images : [p.image],
  variantId: clean(p.variantId),
  };
}

interface ShopifyCatalog {
  shopDomain: string;
  generatedAt: string | null;
  products: RawProduct[];
}

const catalog = shopifyCatalog as unknown as ShopifyCatalog;

/** True when the storefront is serving the Shopify catalogue snapshot. */
export const IS_SHOPIFY_CATALOG = catalog.products.length > 0;

const products: CommerceProduct[] = (
  IS_SHOPIFY_CATALOG ? catalog.products : (demoProducts as RawProduct[])
).map(normalize);

/**
 * Shopify cart permalink for checkout (https://shop/cart/variant:qty,...).
 * Returns null while the demo catalogue is active or an item has no variant id.
 */
export function getCheckoutUrl(
  items: { variantId?: string | undefined; quantity: number }[],
): string | null {
  if (!IS_SHOPIFY_CATALOG || !catalog.shopDomain || items.length === 0) return null;
  if (items.some((i) => !i.variantId)) return null;
  const lines = items.map((i) => `${i.variantId}:${i.quantity}`).join(",");
  return `https://${catalog.shopDomain}/cart/${lines}`;
}

/** Curated brand rail for the storefront. */
export const POPULAR_BRANDS = [
  "BANDAI",
  "GOOD SMILE COMPANY",
  "GSI Creos",
  "SQUARE ENIX",
  "MegaHouse",
  "52TOYS",
  "BellFine",
  "CAPCOM",
] as const;

export function getSaleProducts(): CommerceProduct[] {
  return products.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
}

export function getNewArrivals(limit = 8): CommerceProduct[] {
  return products.filter((p) => p.status !== "sold-out").slice(0, limit);
}

export function getAllProducts(): CommerceProduct[] {
  return products;
}

export function getProductByHandle(handle: string): CommerceProduct | undefined {
  return products.find((p) => p.handle === handle);
}

export function getProductsByIds(ids: string[]): CommerceProduct[] {
  return ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is CommerceProduct => Boolean(p));
}

export function getCategories(): CommerceCategory[] {
  return CATEGORY_ORDER.map((name) => {
    const items = products.filter((p) => p.category === name);
    return {
      name,
      slug: categorySlug(name),
      count: items.length,
      image: items[0]?.image ?? "",
    };
  });
}

export function getCategoryBySlug(slug: string): CommerceCategory | undefined {
  return getCategories().find((c) => c.slug === slug);
}

export function getProductsByCategorySlug(slug: string): CommerceProduct[] {
  return products.filter((p) => p.categorySlug === slug);
}

export function getSeries(): CommerceSeries[] {
  const map = new Map<string, CommerceProduct[]>();
  for (const p of products) {
    if (!p.series) continue;
    const list = map.get(p.series) ?? [];
    list.push(p);
    map.set(p.series, list);
  }
  return [...map.entries()]
    .map(([name, items]) => ({ name, count: items.length, image: items[0]?.image ?? "" }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getVendors(): CommerceVendor[] {
  const map = new Map<string, CommerceProduct[]>();
  for (const p of products) {
    const list = map.get(p.vendor) ?? [];
    list.push(p);
    map.set(p.vendor, list);
  }
  return [...map.entries()]
    .map(([name, items]) => ({ name, count: items.length, image: items[0]?.image ?? "" }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getSubcategories(scope: CommerceProduct[] = products): string[] {
  return [...new Set(scope.map((p) => p.subcategory).filter((v): v is string => Boolean(v)))].sort();
}

export function getGundamProducts(): CommerceProduct[] {
  return products.filter((p) => p.franchise === "Gundam");
}

export function getPreorderProducts(): CommerceProduct[] {
  return products.filter((p) => p.status === "preorder");
}

export function searchProducts(query: string): CommerceProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.title, p.vendor, p.category, p.subcategory, p.series, p.character, p.franchise, p.grade, p.scale, p.sku, p.upc]
      .filter(Boolean)
      .some((field) => String(field).toLowerCase().includes(q)),
  );
}

export function getRelatedProducts(product: CommerceProduct, limit = 4): CommerceProduct[] {
  const pool = products.filter((p) => p.id !== product.id);
  const score = (p: CommerceProduct) => {
    if (product.series && p.series === product.series) return 3;
    if (p.category === product.category) return 2;
    if (p.vendor === product.vendor) return 1;
    return 0;
  };
  return pool
    .map((p) => ({ p, s: score(p) }))
    .filter((entry) => entry.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((entry) => entry.p);
}
