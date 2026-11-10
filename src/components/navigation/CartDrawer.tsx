import { Link } from "@tanstack/react-router";
import { useCart } from "@/commerce/cart";
import { formatPrice } from "@/commerce/format";
import { ProductStatusBadge } from "@/components/commerce/ProductStatusBadge";

export function CartDrawer() {
  const { items, subtotal, currency, drawerOpen, closeDrawer, setQuantity, removeItem } = useCart();

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeDrawer}
        className="absolute inset-0 h-full w-full bg-charcoal/70"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="micro text-foreground">Cart / {items.length} items</h2>
          <button type="button" onClick={closeDrawer} className="micro text-muted-foreground hover:text-sbs-red">
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <p className="py-16 text-center font-display text-lg">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 shrink-0 border border-border bg-bone object-contain p-1"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="micro text-muted-foreground">{item.vendor}</p>
                    <p className="clamp-2 text-sm text-foreground">{item.title}</p>
                    <div className="mt-1">
                      {item.status === "preorder" ? <ProductStatusBadge badge="preorder" /> : null}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.title}`}
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-sm hover:text-sbs-red"
                        >
                          −
                        </button>
                        <span className="micro w-8 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.title}`}
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-sm hover:text-sbs-red"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm">{formatPrice(item.price * item.quantity, item.currency)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="micro mt-2 text-muted-foreground hover:text-sbs-red"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-border px-5 py-5">
          <div className="flex items-center justify-between">
            <span className="micro text-muted-foreground">Subtotal</span>
            <span className="font-display text-lg">{formatPrice(subtotal, currency)}</span>
          </div>
          <Link
            to="/cart"
            onClick={closeDrawer}
            className="micro mt-4 block border border-charcoal px-5 py-3 text-center text-charcoal transition-colors duration-200 hover:bg-charcoal hover:text-white"
          >
            View cart
          </Link>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Storefront preview — no order is placed. Local pickup only in Vancouver.
          </p>
        </footer>
      </aside>
    </div>
  );
}
