export type ProductStatus = "available" | "last-one" | "preorder" | "sold-out";

export type BadgeKind = "sale" | "preorder" | "sold-out";

export interface CommerceProduct {
  id: string;
  handle: string;
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
  image: string;
  /** Ordered gallery. Always contains at least `image`. */
  images: string[];
  /** Shopify variant id (live catalogue only). */
  variantId?: string | undefined;
}

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
