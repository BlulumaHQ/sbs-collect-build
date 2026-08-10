import type { BadgeKind } from "@/types/commerce";
import { BADGE_LABEL } from "@/commerce/format";

const TONE: Record<BadgeKind, string> = {
  sale: "bg-sbs-red text-white",
  preorder: "bg-sbs-amber text-charcoal",
  "sold-out": "bg-charcoal text-white",
};

export function ProductStatusBadge({ badge }: { badge: BadgeKind }) {
  return (
    <span
      className={`micro inline-flex items-center px-2.5 py-1 leading-none ${TONE[badge]}`}
      data-badge={badge}
    >
      {BADGE_LABEL[badge]}
    </span>
  );
}
