/**
 * Client-safe catalogue constants and helpers.
 *
 * Nothing in this file may import the product snapshot
 * (src/data/shopify-products.json): that file is server-only and is read
 * through the server functions in ./catalog-api.ts, so browsers never
 * download the whole catalogue.
 */

export const SHOP_DOMAIN = "2zzz0q-zy.myshopify.com";

/** Shopify customer accounts (order history, tracking) — passwordless sign-in. */
export const CUSTOMER_ACCOUNT_URL = "https://shopify.com/100625940760/account";

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

/**
 * Shopify cart permalink for checkout (https://shop/cart/variant:qty,...).
 * Returns null when an item has no variant id.
 */
export function getCheckoutUrl(
  items: { variantId?: string | undefined; quantity: number }[],
): string | null {
  if (!SHOP_DOMAIN || items.length === 0) return null;
  if (items.some((i) => !i.variantId)) return null;
  const lines = items.map((i) => `${i.variantId}:${i.quantity}`).join(",");
  return `https://${SHOP_DOMAIN}/cart/${lines}`;
}
