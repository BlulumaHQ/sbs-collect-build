import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProductByHandle, getRelatedProducts } from "@/commerce/adapter";
import type { CommerceProduct } from "@/types/commerce";
import { formatPrice, STATUS_CTA, isPurchasable } from "@/commerce/format";
import { useCart } from "@/commerce/cart";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { ProductStatusBadge } from "@/components/commerce/ProductStatusBadge";
import { ProductCard } from "@/components/commerce/ProductCard";

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
    const description = `${product.title} by ${product.vendor} in the Secret Builders Society demo catalogue.`;
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
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductDetailPage,
});

function ProductNotFound() {
  return (
    <div className="pt-[64px] md:pt-[78px]">
      <div className="container-sbs py-24 text-center">
        <p className="micro text-sbs-red">Not found</p>
        <h1 className="mt-4 font-display text-4xl">This product isn’t in the demo catalogue.</h1>
        <Link
          to="/shop"
          search={{ sort: "featured" }}
          className="micro mt-8 inline-block border border-charcoal bg-charcoal px-6 py-3 text-white transition-colors duration-200 hover:border-sbs-red hover:bg-sbs-red"
        >
          Back to shop
        </Link>
      </div>
    </div>
  );
}

function ProductDetailPage() {
  const { handle } = Route.useParams();
  const product = getProductByHandle(handle) as CommerceProduct;
  const { addItem } = useCart();
  const related = getRelatedProducts(product);
  const purchasable = isPurchasable(product.status);

  const metadata: { label: string; value: string }[] = [
    { label: "Category", value: product.category },
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
    <div className="pt-[64px] md:pt-[78px]">
      <div className="container-sbs py-10 lg:py-14">
        <Breadcrumbs
          items={[
            { label: "Shop", to: "/shop" },
            { label: product.category },
            { label: product.title },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="border border-border bg-card">
            <img
              src={product.image}
              alt={product.title}
              width={900}
              height={900}
              className="aspect-square w-full object-contain p-6 md:p-12"
            />
          </div>

          <div>
            <SBSBuildRail index="09" label="Product Detail" />
            <div className="mt-6">
              <ProductStatusBadge status={product.status} />
            </div>
            <p className="micro mt-4 text-muted-foreground">{product.vendor}</p>
            <h1 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{product.title}</h1>
            {product.series ? (
              <p className="mt-3 text-sm text-muted-foreground">{product.series}</p>
            ) : null}
            <p className="mt-6 font-display text-3xl">
              {formatPrice(product.price, product.currency)}
            </p>

            <button
              type="button"
              disabled={!purchasable}
              onClick={() => purchasable && addItem(product)}
              className="micro mt-7 w-full border border-charcoal bg-charcoal px-6 py-4 text-white transition-colors duration-200 hover:border-sbs-red hover:bg-sbs-red disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground"
            >
              {STATUS_CTA[product.status]}
            </button>

            <dl className="mt-10 border-t border-border">
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
            <SBSBuildRail index="10" label="Related" />
            <h2 className="mt-5 font-display text-2xl md:text-3xl">Related Products</h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
