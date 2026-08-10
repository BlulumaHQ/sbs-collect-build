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
}
