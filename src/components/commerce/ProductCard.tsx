import { Link } from "@tanstack/react-router";
import type { CommerceProduct } from "@/types/commerce";
import { formatPrice, STATUS_CTA, getBadge, isPurchasable } from "@/commerce/format";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { useCart } from "@/commerce/cart";

/**
 * Retail product card.
 * Fixed image box (1:1, white, object-cover) + fixed-height text block so every
 * card in a row lines up regardless of title length.
 */
export function ProductCard({
  product,
  eager = false,
}: {
  product: CommerceProduct;
  eager?: boolean;
}) {
  const { addItem } = useCart();
  const purchasable = isPurchasable(product.status);
  const badge = getBadge(product);
  const hover = product.images[1];
  const onSale = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);

  return (
    <article className="card-retail group relative flex h-full flex-col">
      <Link
        to="/product/$handle"
        params={{ handle: product.handle }}
        className="block"
        aria-label={product.title}
      >
        <div className="relative aspect-square w-full overflow-hidden bg-white">
          <img
            src={product.image}
            alt={product.title}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-[transform,opacity] duration-500 ease-out ${
              hover ? "group-hover:opacity-0" : "group-hover:scale-[1.06]"
            }`}
          />
          {hover ? (
            <img
              src={hover}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            />
          ) : null}

          {badge ? (
            <span className="absolute left-0 top-3">
              <ProductStatusBadge badge={badge} />
            </span>
          ) : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <p className="micro clamp-1 text-muted-foreground">{product.vendor}</p>
        <Link
          to="/product/$handle"
          params={{ handle: product.handle }}
          className="clamp-2 mt-2 h-[2.6rem] text-sm font-medium leading-snug text-foreground transition-colors duration-200 hover:text-sbs-red"
        >
          {product.title}
        </Link>

        <div className="mt-3 flex min-h-[26px] items-baseline gap-2">
          <span
            className={`font-display text-base tracking-tight ${onSale ? "text-sbs-red" : "text-foreground"}`}
          >
            {formatPrice(product.price, product.currency)}
          </span>
          {onSale ? (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice!, product.currency)}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          disabled={!purchasable}
          onClick={() => purchasable && addItem(product)}
          className="micro mt-4 w-full border border-charcoal/25 px-3 py-2.5 text-charcoal transition-colors duration-200 hover:border-sbs-red hover:bg-sbs-red hover:text-white disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
        >
          {STATUS_CTA[product.status]}
        </button>
      </div>
    </article>
  );
}
