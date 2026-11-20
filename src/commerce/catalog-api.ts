/**
 * Catalogue server functions.
 *
 * The full Shopify snapshot (src/data/shopify-products.json, thousands of
 * products) is read only inside these handlers, which run on the Cloudflare
 * Worker. Pages receive just the products they show, trimmed to the fields
 * the storefront renders, so browsers never download the whole catalogue.
 */
import { createServerFn } from "@tanstack/react-start";
import type { CommerceCategory, CommerceProduct, CommerceSeries, CommerceVendor } from "@/types/commerce";
import { computeFacets, filterProducts, LISTING_PAGE_SIZE, sortProducts, type Listing } from "./listing";
import type { ShopSearch } from "./search-schema";

/** Fields a product card, filter or cart line needs — everything else stays on the server. */
function lite(p: CommerceProduct): CommerceProduct {
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    vendor: p.vendor,
    category: p.category,
    categorySlug: p.categorySlug,
    subcategory: p.subcategory,
    series: p.series,
    franchise: p.franchise,
    grade: p.grade,
    scale: p.scale,
    gundamSeries: p.gundamSeries,
    newArrival: p.newArrival,
    featured: p.featured,
    status: p.status,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    currency: p.currency,
    image: p.image,
    // Cards show the first image and swap to the second on hover.
    images: p.images.slice(0, 2),
    variantId: p.variantId,
  };
}

const liteAll = (list: CommerceProduct[]) => list.map(lite);

export interface NavSummary {
  total: number;
  categories: CommerceCategory[];
  gundam: {
    total: number;
    grades: Record<string, number>;
    series: Record<string, number>;
    available: number;
    newArrivals: number;
    preorder: number;
    sale: number;
  };
  /** Product shown in the shop mega menu's accent tile. */
  menuAccent: CommerceProduct | null;
}

const countBy = (list: CommerceProduct[], key: (p: CommerceProduct) => string | undefined) => {
  const out: Record<string, number> = {};
  for (const p of list) {
    const k = key(p);
    if (k) out[k] = (out[k] ?? 0) + 1;
  }
  return out;
};

/** Small summary used by the header, mega menus and home page — loaded once by the root route. */
export const fetchNavSummary = createServerFn({ method: "GET" }).handler(async (): Promise<NavSummary> => {
  const A = await import("./adapter");
  const gundam = A.getGundamProducts();
  const accent = A.getProductsByCategorySlug("model-kits")[1] ?? null;
  return {
    total: A.getAllProducts().length,
    categories: A.getCategories(),
    gundam: {
      total: gundam.length,
      grades: countBy(gundam, (p) => p.grade),
      series: countBy(gundam, (p) => p.gundamSeries),
      available: gundam.filter((p) => p.status === "available").length,
      newArrivals: gundam.filter((p) => p.newArrival).length,
      preorder: gundam.filter((p) => p.status === "preorder").length,
      sale: gundam.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price).length,
    },
    menuAccent: accent ? lite(accent) : null,
  };
});

export type CatalogueScope =
  | { kind: "all" }
  | { kind: "category"; slug: string }
  | { kind: "gundam" }
  | { kind: "preorder" }
  | { kind: "search"; q: string };

async function scopeProducts(scope: CatalogueScope): Promise<CommerceProduct[]> {
  const A = await import("./adapter");
  switch (scope.kind) {
    case "all":
      return A.getAllProducts();
    case "category":
      return A.getProductsByCategorySlug(scope.slug);
    case "gundam":
      return A.getGundamProducts();
    case "preorder":
      return A.getPreorderProducts();
    case "search":
      return A.searchProducts(scope.q);
    default:
      return [];
  }
}

export interface ListingRequest {
  scope: CatalogueScope;
  search: ShopSearch;
  offset?: number;
  limit?: number;
}

/**
 * One page of a catalogue scope with the active filters and sort applied on the
 * server, plus facet counts for the filter sidebar.
 */
export const fetchListing = createServerFn({ method: "GET" })
  .validator((req: ListingRequest) => req)
  .handler(async ({ data }): Promise<Listing> => {
    const scope = await scopeProducts(data.scope);
    const matched = sortProducts(filterProducts(scope, data.search), data.search.sort);
    const offset = Math.max(0, data.offset ?? 0);
    const limit = Math.min(Math.max(1, data.limit ?? LISTING_PAGE_SIZE), 96);
    return {
      items: liteAll(matched.slice(offset, offset + limit)),
      total: matched.length,
      scopeTotal: scope.length,
      facets: computeFacets(scope),
    };
  });

export const fetchCategory = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data }): Promise<CommerceCategory | null> => (await import("./adapter")).getCategoryBySlug(data) ?? null);

/** Quick search suggestions for the header search overlay. */
export const fetchSearchSuggestions = createServerFn({ method: "GET" })
  .validator((q: string) => q.slice(0, 100))
  .handler(async ({ data }): Promise<CommerceProduct[]> => {
    const A = await import("./adapter");
    return liteAll(A.searchProducts(data).slice(0, 6));
  });

export const fetchProductPage = createServerFn({ method: "GET" })
  .validator((handle: string) => handle)
  .handler(async ({ data }): Promise<{ product: CommerceProduct; related: CommerceProduct[] } | null> => {
    const A = await import("./adapter");
    const product = A.getProductByHandle(data);
    if (!product) return null;
    return { product, related: liteAll(A.getRelatedProducts(product)) };
  });

export const fetchProductsByIds = createServerFn({ method: "GET" })
  .validator((ids: string[]) => ids.slice(0, 24))
  .handler(async ({ data }): Promise<CommerceProduct[]> => {
    const A = await import("./adapter");
    return liteAll(A.getProductsByIds(data));
  });

export interface HomeSeriesInput {
  series: string;
  keys: string[];
}

export const fetchHome = createServerFn({ method: "GET" })
  .validator((series: HomeSeriesInput[]) => series)
  .handler(async ({ data }) => {
    const A = await import("./adapter");
    const all = A.getAllProducts();
    const series = data.map((entry) => {
      const matches = all.filter((p) =>
        entry.keys.some((k) => `${p.series ?? ""} ${p.title}`.toLowerCase().includes(k)),
      );
      return { series: entry.series, count: matches.length, image: matches.find((p) => p.image)?.image ?? null };
    });
    return {
      featured: liteAll(A.getFeaturedProducts()),
      preorders: liteAll(A.getPreorderProducts().slice(0, 4)),
      onSale: liteAll(A.getSaleProducts().slice(0, 4)),
      series,
    };
  });

export const fetchVendors = createServerFn({ method: "GET" }).handler(
  async (): Promise<CommerceVendor[]> => (await import("./adapter")).getVendors(),
);

export const fetchSeries = createServerFn({ method: "GET" }).handler(
  async (): Promise<CommerceSeries[]> => (await import("./adapter")).getSeries(),
);
