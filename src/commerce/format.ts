import type { BadgeKind, CommerceProduct, ProductStatus } from "@/types/commerce";

export function formatPrice(amount: number, currency = "CAD"): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(amount);
}

/** Cart / utility-bar money always shows the currency code for clarity. */
export function formatMoneyCAD(amount: number): string {
  return `$${amount.toFixed(2)} CAD`;
}

export const STATUS_CTA: Record<ProductStatus, string> = {
  available: "ADD TO CART",
  "last-one": "ADD TO CART",
  preorder: "PREORDER",
  "sold-out": "SOLD OUT",
};

export function isPurchasable(status: ProductStatus): boolean {
  return status !== "sold-out";
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2027-02" → "Feb 2027"; anything else is shown as written. */
export function formatRelease(value: string | undefined): string | undefined {
  const m = value?.match(/^(\d{4})-(\d{1,2})$/);
  if (!m) return value;
  const month = MONTHS[Number(m[2]) - 1];
  return month ? `${month} ${m[1]}` : value;
}

/** "2026-12-15" → "Dec 15, 2026". */
export function formatDeadline(value: string): string {
  const m = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!m) return value;
  return `${MONTHS[Number(m[2]) - 1] ?? m[2]} ${Number(m[3])}, ${m[1]}`;
}

/** True once a pre-order's deadline day (Vancouver time) has passed. */
export function preorderClosed(product: CommerceProduct, now = new Date()): boolean {
  if (product.status !== "preorder" || !product.preorderDeadline) return false;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver" }).format(now);
  return today > product.preorderDeadline;
}

/** Can this product be added to the cart right now? */
export function canBuy(product: CommerceProduct): boolean {
  return isPurchasable(product.status) && !preorderClosed(product);
}

/** Button label, including closed pre-orders. */
export function ctaLabel(product: CommerceProduct): string {
  return preorderClosed(product) ? "PREORDER CLOSED" : STATUS_CTA[product.status];
}

/**
 * Badge policy (retail refinement):
 *  SALE     — red      — discounted item
 *  PREORDER — amber    — not yet released
 *  SOLD OUT — charcoal — unavailable
 *  Everything else renders no badge at all.
 */
export function getBadge(product: CommerceProduct): BadgeKind | null {
  if (product.status === "sold-out") return "sold-out";
  if (product.status === "preorder") return "preorder";
  if (product.compareAtPrice && product.compareAtPrice > product.price) return "sale";
  return null;
}

export const BADGE_LABEL: Record<BadgeKind, string> = {
  sale: "SALE",
  preorder: "PREORDER",
  "sold-out": "SOLD OUT",
};

export function discountPercent(product: CommerceProduct): number | null {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) return null;
  return Math.round((1 - product.price / product.compareAtPrice) * 100);
}
