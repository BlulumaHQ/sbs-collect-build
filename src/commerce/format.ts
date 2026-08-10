import type { ProductStatus } from "@/types/commerce";

export function formatPrice(amount: number, currency = "CAD"): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(amount);
}

export const STATUS_LABEL: Record<ProductStatus, string> = {
  available: "IN STOCK",
  "last-one": "LAST ONE",
  preorder: "PREORDER",
  "sold-out": "SOLD OUT",
};

export const STATUS_CTA: Record<ProductStatus, string> = {
  available: "ADD TO CART",
  "last-one": "ADD TO CART",
  preorder: "PREORDER",
  "sold-out": "SOLD OUT",
};

export function isPurchasable(status: ProductStatus): boolean {
  return status !== "sold-out";
}
