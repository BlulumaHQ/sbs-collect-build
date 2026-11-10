import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProductByHandle, getRelatedProducts } from "@/commerce/adapter";
import type { CommerceProduct } from "@/types/commerce";
import { formatPrice, STATUS_CTA, getBadge, isPurchasable, discountPercent } from "@/commerce/format";
import { useCart } from "@/commerce/cart";
import { useTrackRecentlyViewed } from "@/commerce/recently-viewed";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { ProductStatusBadge } from "@/components/commerce/ProductStatusBadge";
import { ProductCard } from "@/components/commerce/ProductCard";
import { RecentlyViewed } from "@/components/commerce/RecentlyViewed";
import { STORE } from "@/config/store";
import { gradeName, gundamSeriesName } from "@/commerce/attributes";

/** Factual one-line summary built only from verified catalogue attributes. */
function productSummary(p: CommerceProduct): string {
  const parts = [p.grade && p.grade !== "OTHER" ? `${gradeName(p.grade)} (${p.grade})` : null, p.scale ? `${p.scale} scale` : null]
    .filter(Boolean)
    .join(", ");
  const kind = p.subcategory ?? p.category;
  const from = p.series ? ` from ${p.series}` : "";
  return `${p.title} by ${p.vendor}${parts ? ` — ${parts}` : ""}. ${kind}${from}, priced in ${p.currency}. Local pickup in ${STORE.city}, ${STORE.region}.`;
}

export const Route = createFileRoute("/product/$handle")({
  loader: ({ params }) => {
    const product = getProductByHandle(params.handle);
    if (!product) throw notFound();
    return { product: product satisfies CommerceProduct };
  },
  head: ({ loaderData, params }) => {
    const product = loaderData?.product;
    if (!product) {
      return {
        meta: [
          { title: "Product not found | Secret Builders Society" },
          { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" },
        ],
      };
    }
    const title = `${product.title} | Secret Builders Society`;
    const description = productSummary(product);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.handle}` },
      ],
      links: [{ rel: "canonical", href: `/product/${params.handle}` }],
      // Product schema is intentionally omitted: demo pricing/availability are not verified offers.
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Shop", item: "/shop" },
              { "@type": "ListItem", position: 3, name: product.category, item: `/shop/${product.categorySlug}` },
              { "@type": "ListItem", position: 4, name: product.title },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductDetailPage,
});

function ProductNotFound() {
  return (
    <div className="container-sbs py-24 text-center">
      <p className="micro text-sbs-red">Not found</p>
      <h1 className="mt-4 font-display text-4xl">This product isn’t in the catalogue.</h1>
      <Link to="/shop" search={{ sort: "featured" }} className="btn-primary-sbs mt-8">
        Back to shop
      </Link>
    </div>
  );
}

function ProductDetailPage() {
  const { handle } = Route.useParams();
  const product = getProductByHandle(handle) as CommerceProduct;
  const { addItem } = useCart();
  const related = getRelatedProducts(product);
  const purchasable = isPurchasable(product.status);
  const badge = getBadge(product);
  const off = discountPercent(product);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  useTrackRecentlyViewed(product.id);

  const gallery = product.images.length > 0 ? product.images : [product.image];

  const metadata: { label: string; value: string }[] = [
    { label: "Brand", value: product.vendor },
    { label: "Category", value: product.category },
    ...(product.franchise ? [{ label: "Franchise", value: product.franchise }] : []),
    ...(product.grade ? [{ label: "Grade", value: product.grade === "OTHER" ? gradeName(product.grade) : `${product.grade} · ${gradeName(product.grade)}` }] : []),
    ...(product.scale ? [{ label: "Scale", value: product.scale }] : []),
    ...(product.gundamSeries ? [{ label: "Gundam Series", value: gundamSeriesName(product.gundamSeries) }] : []),
    ...(product.subcategory ? [{ label: "Subcategory", value: product.subcategory }] : []),
    ...(product.series ? [{ label: "Series", value: product.series }] : []),
    ...(product.character ? [{ label: "Character", value: product.character }] : []),
    ...(product.sku ? [{ label: "SKU", value: product.sku }] : []),
    ...(product.upc ? [{ label: "UPC", value: product.upc }] : []),
    ...(product.estimatedRelease
      ? [{ label: "Estimated Release", value: product.estimatedRelease }]
      : []),
    ...(product.packSize ? [{ label: "Pack Size", value: String(product.packSize) }] : []),
    ...(product.packPrice
      ? [{ label: "Pack Price", value: formatPrice(product.packPrice, product.currency) }]
      : []),
  ];

  return (
    <>
      <div className="container-sbs py-8 lg:py-12">
        <Breadcrumbs
          items={[
            { label: "Shop", to: "/shop" },
            { label: product.category, to: `/shop/${product.categorySlug}` },
            { label: product.title },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* GALLERY */}
          <div>
            <div
              className="relative aspect-square w-full overflow-hidden border border-border bg-white"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
            >
              <img
                src={gallery[active] ?? product.image}
                alt={product.title}
                width={1200}
                height={1200}
                className={`h-full w-full object-cover object-center transition-transform duration-500 ease-out ${
                  zoom ? "scale-[1.12]" : "scale-100"
                }`}
              />
              {badge ? (
                <span className="absolute left-0 top-4">
                  <ProductStatusBadge badge={badge} />
                </span>
              ) : null}
            </div>

            {gallery.length > 1 ? (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-current={i === active}
                    className={`aspect-square overflow-hidden border bg-white ${
                      i === active ? "border-sbs-red" : "border-border hover:border-charcoal/40"
                    }`}
                  >
                    <img src={src} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* BUY BOX */}
          <div>
            <SBSBuildRail index="01" label="Product Detail" />
            <p className="micro mt-6 text-muted-foreground">{product.vendor}</p>
            <h1 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{product.title}</h1>
            {product.series ? (
              <p className="mt-3 text-sm text-muted-foreground">{product.series}</p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span
                className={`font-display text-3xl ${off ? "text-sbs-red" : "text-foreground"}`}
              >
                {formatPrice(product.price, product.currency)}
              </span>
              {off ? (
                <>
                  <span className="text-base text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice!, product.currency)}
                  </span>
                  <span className="micro bg-sbs-red px-2 py-1 text-white">Save {off}%</span>
                </>
              ) : null}
            </div>
            <p className="micro mt-2 text-muted-foreground">Priced in {STORE.currency}.</p>

            <button
              type="button"
              disabled={!purchasable}
              onClick={() => purchasable && addItem(product)}
              className="micro mt-7 w-full border border-sbs-red bg-sbs-red px-6 py-4 text-white transition-colors duration-200 hover:border-sbs-red-deep hover:bg-sbs-red-deep disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground"
            >
              {STATUS_CTA[product.status]}
            </button>

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>
                Local pickup only at {STORE.addressLine}, {STORE.city}, {STORE.region}. No shipping or
                delivery.
              </li>
              <li>Online ordering isn’t live yet — this cart is a storefront preview.</li>
              {product.status === "preorder" ? (
                <li>Release dates are estimates. Preorder payment and pickup details are still to be confirmed.</li>
              ) : null}
              <li>
                <Link to="/pickup-information" className="text-sbs-red hover:underline">
                  Pickup information
                </Link>
              </li>
            </ul>

            <p className="mt-8 text-[15px] leading-relaxed text-muted-foreground">{productSummary(product)}</p>

            <dl className="mt-6 border-t border-border">
              {metadata.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-3"
                >
                  <dt className="micro text-muted-foreground">{row.label}</dt>
                  <dd className="text-right text-sm">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-20 border-t border-border pt-12">
            <SBSBuildRail index="02" label="Related" />
            <h2 className="mt-5 font-display text-2xl md:text-3xl">You May Also Like</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <RecentlyViewed excludeId={product.id} index="03" />

      {/* STICKY MOBILE CTA */}
      <div className="h-[78px] lg:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-[55] border-t border-border bg-card/95 backdrop-blur lg:hidden">
        <div className="container-sbs flex items-center gap-3 py-3">
          <div className="min-w-0 flex-1">
            <p className="clamp-1 text-xs text-muted-foreground">{product.title}</p>
            <p className={`font-display text-lg ${off ? "text-sbs-red" : ""}`}>
              {formatPrice(product.price, product.currency)}
            </p>
          </div>
          <button
            type="button"
            disabled={!purchasable}
            onClick={() => purchasable && addItem(product)}
            className="micro shrink-0 border border-sbs-red bg-sbs-red px-6 py-3.5 text-white disabled:border-border disabled:bg-muted disabled:text-muted-foreground"
          >
            {STATUS_CTA[product.status]}
          </button>
        </div>
      </div>
    </>
  );
}
