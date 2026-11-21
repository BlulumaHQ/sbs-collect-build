export type ProductStatus = "available" | "last-one" | "preorder" | "sold-out";

export type BadgeKind = "sale" | "preorder" | "sold-out";

export interface CommerceProduct {
  id: string;
  /** URL slug used on this site (readable, from the title for supplier-coded Shopify handles). */
  handle: string;
  /** The Shopify handle, when it differs from `handle` — old links redirect to the readable one. */
  shopifyHandle?: string | undefined;
  /** Imported from the Plamod supplier feed (not the shop's own listings). */
  supplierFeed?: boolean | undefined;
  title: string;
  vendor: string;
  category: string;
  categorySlug: string;
  subcategory?: string | undefined;
  series?: string | undefined;
  character?: string | undefined;
  /** Franchise line, e.g. "Gundam". Only set when explicit or unambiguous. */
  franchise?: string | undefined;
  /** Gunpla grade code (EG/HG/RG/MG/PG/SD/OTHER). Never inferred from descriptions. */
  grade?: string | undefined;
  /** Model scale such as "1/144". */
  scale?: string | undefined;
  /** Gundam timeline/series code (uc/seed/00/ibo/wfm/other). */
  gundamSeries?: string | undefined;
  /** True only when the source explicitly flags the item as a new arrival. */
  newArrival?: boolean | undefined;
  /** When the product was created in Shopify (ISO). */
  createdAt?: string | undefined;
  /** Plain-text description from Shopify. */
  description?: string | undefined;
  /** True when tagged `featured` in Shopify (home page Featured Picks). */
  featured?: boolean | undefined;
  status: ProductStatus;
  price: number;
  /** Original price when the item is discounted — drives the SALE badge. */
  compareAtPrice?: number | undefined;
  currency: string;
  packPrice?: number | undefined;
  packSize?: number | undefined;
  sku?: string | undefined;
  upc?: string | undefined;
  estimatedRelease?: string | undefined;
  /** Last day pre-orders are accepted (YYYY-MM-DD). */
  preorderDeadline?: string | undefined;
  /** Store manager note (Shopify metafield custom.staff_pick). */
  staffPick?: string | undefined;
  /** Shopify tag `hot` — shown in the home hero "On Our Shelf" slide. */
  hot?: true | undefined;
  /** Shopify tag `confirm-stock` — supplier stock is low; we confirm the order before charging. */
  confirmStock?: true | undefined;
  image: string;
  /** Ordered gallery. Always contains at least `image`. */
  images: string[];
  /** Shopify variant id (live catalogue only). */
  variantId?: string | undefined;
  /** Card framing for `image` / `images[1]` (scripts/image-framing.mjs). */
  frame?: ImageFrame | undefined;
  hoverFrame?: ImageFrame | undefined;
}

/**
 * How a photo sits in a square card.
 * b = solid background: trimmed + centred (w/h/l/t are % of the card, bg fills it)
 * c = busy photo: object-cover at object-position x% y%
 * f = whole photo, contained
 */
export type ImageFrame =
  | { m: "b"; bg: string; w: number; h: number; l: number; t: number; rw: number }
  | { m: "c"; x: number; y: number; rw: number }
  | { m: "f" };

export interface CommerceCategory {
  name: string;
  slug: string;
  count: number;
  image: string;
}

export interface CommerceVendor {
  name: string;
  count: number;
  image: string;
}

export interface CommerceSeries {
  name: string;
  count: number;
  image: string;
}

export interface CommerceCartItem {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  image: string;
  price: number;
  currency: string;
  status: ProductStatus;
  quantity: number;
  variantId?: string | undefined;
}
