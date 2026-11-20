import shopifyCatalog from "@/data/shopify-products.json";
import type {
  ImageFrame,
  CommerceCategory,
  CommerceProduct,
  CommerceSeries,
  CommerceVendor,
  ProductStatus,
} from "@/types/commerce";
import { formatRelease } from "./format";
import { deriveGrade, deriveGundamSeries, deriveScale, isGundamTitle } from "./attributes";

/**
 * Commerce adapter
 *
 * Normalizes the catalogue into CommerceProduct objects. The catalogue is the
 * Shopify snapshot in src/data/shopify-products.json, written by
 * scripts/sync-shopify-catalog.mjs from the Shopify Storefront API.
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
  preorderDeadline?: string | null;
  staffPick?: string | null;
  hot?: boolean | null;
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
  createdAt?: string | null;
  /** Shopify tag `featured` — shown in the home page "Featured Picks". */
  featured?: boolean | null;
  frame?: ImageFrame | null;
  hoverFrame?: ImageFrame | null;
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

/** New arrival window: created in Shopify within 30 days of the catalogue snapshot. */
const NEW_ARRIVAL_DAYS = 30;
function isRecent(createdAt: string | null | undefined): boolean {
  if (!createdAt) return false;
  const ref = Date.parse(catalog.generatedAt ?? "") || Date.now();
  return ref - Date.parse(createdAt) <= NEW_ARRIVAL_DAYS * 86_400_000;
}

function normalize(p: RawProduct): CommerceProduct {
  const subcategory = clean(p.subcategory);
  const isGundam =
    clean(p.franchise)?.toLowerCase() === "gundam" || isGundamTitle(p.title, subcategory);
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
    newArrival: p.newArrival === true || isRecent(p.createdAt) ? true : undefined,
    createdAt: clean(p.createdAt),
    featured: p.featured === true ? true : undefined,
    series: clean(p.series),
    character: clean(p.character),
    status: p.status as ProductStatus,
    price: p.price,
    currency: p.currency,
    packPrice: p.packPrice ?? undefined,
    packSize: p.packSize ?? undefined,
    sku: clean(p.sku),
    upc: clean(p.upc),
    estimatedRelease: formatRelease(clean(p.estimatedRelease)),
    preorderDeadline: clean(p.preorderDeadline),
    staffPick: clean(p.staffPick),
    hot: p.hot === true ? true : undefined,
    compareAtPrice: p.compareAtPrice ?? undefined,
    image: p.image,
    images: p.images?.length ? p.images : [p.image],
    variantId: clean(p.variantId),
    frame: p.frame ?? undefined,
    hoverFrame: p.hoverFrame ?? undefined,
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

const products: CommerceProduct[] = catalog.products.map(normalize);

/**
 * Shopify cart permalink for checkout (https://shop/cart/variant:qty,...).
 * Returns null while the catalogue is empty or an item has no variant id.
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

/**
 * Home page "Featured Picks": always `limit` products (default 8).
 * Products tagged `featured` in Shopify come first (in stock before sold out);
 * remaining slots are filled with the newest in-stock products.
 */
export function getFeaturedProducts(limit = 8): CommerceProduct[] {
  const soldOutLast = (a: CommerceProduct, b: CommerceProduct) =>
    Number(a.status === "sold-out") - Number(b.status === "sold-out");
  const tagged = products.filter((p) => p.featured).sort(soldOutLast);
  const fill = products.filter((p) => !p.featured && p.status !== "sold-out");
  return [...tagged, ...fill].slice(0, limit);
}

/** Home "New Arrivals": newest first (tag `new-arrival` or created in the last 30 days). */
export function getNewArrivals(limit = 8): CommerceProduct[] {
  const byNewest = (a: CommerceProduct, b: CommerceProduct) =>
    (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
  const fresh = products.filter((p) => p.newArrival && p.status !== "sold-out").sort(byNewest);
  // Nothing new yet (or no createdAt in an older snapshot): newest in-stock instead.
  const pool = fresh.length
    ? fresh
    : products.filter((p) => p.status !== "sold-out").sort(byNewest);
  return pool.slice(0, limit);
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

/**
 * Hero "On Our Shelf": products tagged `hot` first, then the shop's own
 * in-stock listings (not the Plamod supplier feed), Gundam first.
 */
export function getHotProducts(limit = 3): CommerceProduct[] {
  const inStock = products.filter((p) => p.status === "available" || p.status === "last-one");
  const tagged = inStock.filter((p) => p.hot);
  const own = inStock
    .filter((p) => !p.hot && !p.handle.startsWith("plamod-"))
    .sort(
      (a, b) =>
        Number(b.franchise === "Gundam") - Number(a.franchise === "Gundam") || b.price - a.price,
    );
  return [...tagged, ...own].slice(0, limit);
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

/** Categories that currently have products — empty ones stay out of menus and the home page. */
export function getVisibleCategories(): CommerceCategory[] {
  return getCategories().filter((c) => c.count > 0);
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
    if (!p.vendor) continue;
    const list = map.get(p.vendor) ?? [];
    list.push(p);
    map.set(p.vendor, list);
  }
  return [...map.entries()]
    .map(([name, items]) => ({ name, count: items.length, image: items[0]?.image ?? "" }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getSubcategories(scope: CommerceProduct[] = products): string[] {
  return [
    ...new Set(scope.map((p) => p.subcategory).filter((v): v is string => Boolean(v))),
  ].sort();
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
    [
      p.title,
      p.vendor,
      p.category,
      p.subcategory,
      p.series,
      p.character,
      p.franchise,
      p.grade,
      p.scale,
      p.sku,
      p.upc,
    ]
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
