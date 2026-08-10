import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/commerce/cart";
import { formatPrice } from "@/commerce/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { ProductStatusBadge } from "@/components/commerce/ProductStatusBadge";
import { EmptyState } from "@/components/EmptyState";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart | Secret Builders Society" },
      {
        name: "description",
        content: "Local demo cart for the Secret Builders Society storefront prototype.",
      },
      { property: "og:title", content: "Cart | Secret Builders Society" },
      { property: "og:description", content: "Local demo cart for the storefront prototype." },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, currency, setQuantity, removeItem, clearCart } = useCart();

  return (
    <div className="pt-[64px] md:pt-[78px]">
      <div className="container-sbs py-10 lg:py-14">
        <Breadcrumbs items={[{ label: "Cart" }]} />
        <div className="mt-6">
          <SBSBuildRail index="08" label="Cart" />
        </div>
        <h1 className="mt-5 font-display text-4xl md:text-6xl">Cart</h1>

        {items.length === 0 ? (
          <div className="mt-10">
            <EmptyState title="Your cart is empty." ctaLabel="Browse the catalogue" ctaTo="/shop" />
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <ul className="divide-y divide-border border-y border-border">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 py-5">
                    <Link
                      to="/product/$handle"
                      params={{ handle: item.handle }}
                      className="shrink-0 border border-border bg-bone"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-24 w-24 object-contain p-2 md:h-28 md:w-28"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="micro text-muted-foreground">{item.vendor}</p>
                      <Link
                        to="/product/$handle"
                        params={{ handle: item.handle }}
                        className="clamp-2 text-sm font-medium hover:text-sbs-red"
                      >
                        {item.title}
                      </Link>
                      <div className="mt-2">
                        {item.status === "preorder" ? <ProductStatusBadge badge="preorder" /> : null}
                      </div>
                      <p className="micro mt-2 text-muted-foreground">
                        {formatPrice(item.price, item.currency)} each
                      </p>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.title}`}
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1.5 hover:text-sbs-red"
                          >
                            −
                          </button>
                          <span className="micro w-8 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${item.title}`}
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1.5 hover:text-sbs-red"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-display text-lg">
                          {formatPrice(item.price * item.quantity, item.currency)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="micro mt-3 text-muted-foreground hover:text-sbs-red"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={clearCart}
                className="micro mt-5 border border-border px-5 py-3 hover:border-sbs-red hover:text-sbs-red"
              >
                Clear cart
              </button>
            </div>

            <aside className="h-fit border border-border bg-card p-6">
              <h2 className="micro text-muted-foreground">Summary</h2>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
                <span className="micro">Subtotal</span>
                <span className="font-display text-2xl">{formatPrice(subtotal, currency)}</span>
              </div>
              <button
                type="button"
                disabled
                className="micro mt-6 w-full cursor-not-allowed border border-border bg-muted px-5 py-4 text-muted-foreground"
              >
                Checkout available at Shopify launch
              </button>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                This prototype uses a local demo cart. Shopify checkout will be connected before launch.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
