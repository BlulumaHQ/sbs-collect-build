import type { ProductStatus } from "@/types/commerce";
import { STATUS_LABEL } from "@/commerce/format";

const TONE: Record<ProductStatus, string> = {
  available: "border-charcoal/25 text-charcoal",
  "last-one": "border-sbs-red text-sbs-red",
  preorder: "border-sbs-red text-sbs-red",
  "sold-out": "border-muted-foreground/40 text-muted-foreground",
};

export function ProductStatusBadge({
  status,
  onDark = false,
}: {
  status: ProductStatus;
  onDark?: boolean;
}) {
  const tone = onDark
    ? status === "sold-out"
      ? "border-white/25 text-white/55"
      : status === "available"
        ? "border-white/35 text-white/80"
        : "border-sbs-red text-white"
    : TONE[status];
  return (
    <span className={`micro inline-block border px-2 py-1 leading-none ${tone}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}
