import rawProducts from "@/data/demo-products.json";
import type {
  CommerceCategory,
  CommerceProduct,
  CommerceSeries,
  CommerceVendor,
  ProductStatus,
} from "@/types/commerce";

/**
 * DemoCommerceAdapter
 *
 * Normalizes the local demo catalogue into CommerceProduct objects.
 * A future ShopifyCommerceAdapter will expose the same surface so the
 * UI layer does not change when Shopify Storefront API is connected.
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
  image: string;
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

const products: CommerceProduct[] = (rawProducts as RawProduct[]).map((p) => ({
  id: p.id,
  handle: p.handle,
  title: p.title,
  vendor: p.vendor,
  category: p.category,
  categorySlug: categorySlug(p.category),
  subcategory: clean(p.subcategory),
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
  image: p.image,
}));

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

export function getPreorderProducts(): CommerceProduct[] {
  return products.filter((p) => p.status === "preorder");
}

export function searchProducts(query: string): CommerceProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.title, p.vendor, p.category, p.subcategory, p.series, p.character, p.sku, p.upc]
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
