import { Link } from "@tanstack/react-router";
import type { CommerceProduct } from "@/types/commerce";
import { formatPrice, STATUS_CTA, isPurchasable } from "@/commerce/format";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { useCart } from "@/commerce/cart";

export function ProductCard({
  product,
  eager = false,
}: {
  product: CommerceProduct;
  eager?: boolean;
}) {
  const { addItem } = useCart();
  const purchasable = isPurchasable(product.status);

  return (
    <article className="group relative flex h-full flex-col border border-border bg-card transition-colors duration-200 hover:border-charcoal/40">
      <Link
        to="/product/$handle"
        params={{ handle: product.handle }}
        className="block"
        aria-label={product.title}
      >
        <div className="relative aspect-square overflow-hidden bg-bone">
          <img
            src={product.image}
            alt={product.title}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-contain p-4 transition-transform duration-200 group-hover:scale-[1.03]"
          />
          <span className="absolute left-2 top-2 bg-card/90">
            <ProductStatusBadge status={product.status} />
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 border-t border-border p-3 md:p-4">
        <p className="micro text-muted-foreground">{product.vendor}</p>
        <Link
          to="/product/$handle"
          params={{ handle: product.handle }}
          className="clamp-2 text-sm font-medium leading-snug text-foreground transition-colors duration-200 hover:text-sbs-red"
        >
          {product.title}
        </Link>
        {product.series ? (
          <p className="micro text-muted-foreground/80">{product.series}</p>
        ) : null}
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <span className="font-display text-base tracking-tight text-foreground">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>
        <button
          type="button"
          disabled={!purchasable}
          onClick={() => purchasable && addItem(product)}
          className="micro w-full border border-charcoal/20 bg-transparent px-3 py-2 text-charcoal transition-colors duration-200 hover:border-charcoal hover:bg-charcoal hover:text-white disabled:cursor-not-allowed disabled:border-border disabled:bg-transparent disabled:text-muted-foreground disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
        >
          {STATUS_CTA[product.status]}
        </button>
      </div>
    </article>
  );
}
