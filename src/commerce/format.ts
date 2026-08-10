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
