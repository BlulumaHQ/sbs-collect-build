import type { ShopSearch } from "@/commerce/search-schema";
import { gradeName, gundamSeriesName } from "@/commerce/attributes";
import { formatPrice } from "@/commerce/format";
import { toggleValue, values } from "@/commerce/multi";

const STATUS_LABEL: Record<string, string> = {
  available: "In stock",
  "last-one": "Last one",
  preorder: "Preorder",
  "sold-out": "Sold out",
};

type Chip = { key: string; label: string; remove: () => ShopSearch };

const MULTI: {
  key: "grade" | "gseries" | "scale" | "subcategory" | "status" | "vendor" | "series";
  label: (v: string) => string;
}[] = [
  { key: "grade", label: gradeName },
  { key: "gseries", label: gundamSeriesName },
  { key: "scale", label: (v) => v },
  { key: "subcategory", label: (v) => v },
  { key: "status", label: (v) => STATUS_LABEL[v] ?? v },
  { key: "vendor", label: (v) => v },
  { key: "series", label: (v) => v },
];

/** What the shopper has filtered by, as removable chips above the products. */
export function activeChips(search: ShopSearch): Chip[] {
  const chips: Chip[] = [];
  const without = (...keys: (keyof ShopSearch)[]) => {
    const next = { ...search, page: undefined };
    for (const k of keys) delete next[k];
    return next;
  };
  if (search.new) chips.push({ key: "new", label: "New arrivals", remove: () => without("new") });
  if (search.sale) chips.push({ key: "sale", label: "On sale", remove: () => without("sale") });
  for (const { key, label } of MULTI) {
    for (const v of values(search[key])) {
      chips.push({
        key: `${key}:${v}`,
        label: label(v),
        remove: () => {
          const next = without();
          const rest = toggleValue(search[key], v);
          if (rest) next[key] = rest;
          else delete next[key];
          return next;
        },
      });
    }
  }
  if (search.minPrice !== undefined || search.maxPrice !== undefined) {
    const min = search.minPrice ?? 0;
    const max = search.maxPrice;
    chips.push({
      key: "price",
      label:
        max === undefined || max >= 100000
          ? `${formatPrice(min)}+`
          : min === 0
            ? `Under ${formatPrice(max)}`
            : `${formatPrice(min)} – ${formatPrice(max)}`,
      remove: () => without("minPrice", "maxPrice"),
    });
  }
  return chips;
}

export function ActiveFilters({
  search,
  onChange,
}: {
  search: ShopSearch;
  onChange: (next: ShopSearch) => void;
}) {
  const chips = activeChips(search);
  if (chips.length === 0) return null;
  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => onChange(chip.remove())}
          aria-label={`Remove filter: ${chip.label}`}
          className="group inline-flex min-h-9 items-center gap-2 border border-charcoal bg-white px-3 text-[13px] text-charcoal transition-colors duration-200 hover:border-sbs-red hover:text-sbs-red"
        >
          {chip.label}
          <span
            aria-hidden
            className="text-base leading-none text-muted-foreground group-hover:text-sbs-red"
          >
            ×
          </span>
        </button>
      ))}
      {chips.length > 1 ? (
        <button
          type="button"
          onClick={() =>
            onChange({
              sort: search.sort,
              ...(search.category ? { category: search.category } : {}),
            })
          }
          className="micro min-h-9 px-2 text-sbs-red hover:underline"
        >
          Clear all
        </button>
      ) : null}
    </div>
  );
}
