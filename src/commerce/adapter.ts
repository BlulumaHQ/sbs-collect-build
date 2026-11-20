/**
 * Client-safe catalogue helpers (no product data). Product queries live in
 * catalog.server.ts and are reached through the server functions in api.ts.
 */
import { STORE } from "@/config/store";

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

/**
 * Shopify cart permalink for checkout (https://shop/cart/variant:qty,...).
 * Returns null while the catalogue is empty or an item has no variant id.
 */
export function getCheckoutUrl(
  items: { variantId?: string | undefined; quantity: number }[],
): string | null {
  if (items.length === 0) return null;
  if (items.some((i) => !i.variantId)) return null;
  const lines = items.map((i) => `${i.variantId}:${i.quantity}`).join(",");
  return `https://${STORE.shopifyDomain}/cart/${lines}`;
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
