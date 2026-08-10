const METHODS = [
  { src: "/images/payments/apple-pay.svg", label: "Apple Pay" },
  { src: "/images/payments/visa.svg", label: "Visa" },
  { src: "/images/payments/mastercard.svg", label: "Mastercard" },
  { src: "/images/payments/paypal.svg", label: "PayPal" },
];

export function PaymentMethods({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex flex-wrap items-center gap-x-6 gap-y-3 lg:gap-x-8 lg:gap-y-4 ${
        dark ? "text-white/55" : "text-muted-foreground"
      }`}
    >
      <div>
        <p className={`micro-sm ${dark ? "text-white/60" : "text-muted-foreground"}`}>
          Planned payment options
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2 lg:mt-3 lg:gap-3">
          {METHODS.map((m) => (
            <img
              key={m.label}
              src={m.src}
              alt={m.label}
              width={80}
              height={48}
              loading="lazy"
              className="h-7 w-auto lg:h-9"
            />
          ))}
        </div>
      </div>
      <p className="hidden max-w-md text-xs leading-relaxed md:block">
        Payment methods shown for storefront design preview. Final availability will be determined
        by Shopify checkout configuration.
      </p>
    </div>
  );
}
