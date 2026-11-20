import { STORE } from "@/config/store";
import { formatPrice } from "@/commerce/format";

/** "Spend $X more for free shipping" progress, shown in the cart drawer and cart page. */
export function FreeShippingBar({ subtotal, currency }: { subtotal: number; currency: string }) {
  const goal = STORE.freeShippingThreshold;
  const remaining = Math.max(0, goal - subtotal);
  const pct = Math.min(100, (subtotal / goal) * 100);
  const done = remaining === 0;

  return (
    <div>
      <p className="text-sm leading-snug">
        {done ? (
          <span className="font-medium text-sbs-red">
            You've unlocked free shipping across Canada.
          </span>
        ) : (
          <>
            Add <span className="font-medium">{formatPrice(remaining, currency)}</span> more for{" "}
            <span className="font-medium">free shipping</span>.
          </>
        )}
      </p>
      <div
        className="mt-2 h-1.5 w-full overflow-hidden bg-border"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={Math.min(subtotal, goal)}
        aria-label="Progress to free shipping"
      >
        <div
          className="h-full bg-sbs-red transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
