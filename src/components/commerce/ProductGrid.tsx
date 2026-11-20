import { useState } from "react";
import type { CommerceProduct } from "@/types/commerce";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/EmptyState";

const PAGE_SIZE = 48;

export function ProductGrid({
  products,
  emptyMessage = "No products in this section yet.",
  columns = 4,
  paginate = true,
}: {
  products: CommerceProduct[];
  emptyMessage?: string;
  columns?: 3 | 4;
  /** Set false when the parent pages through server results itself. */
  paginate?: boolean;
}) {
  // Large catalogues render in pages of PAGE_SIZE so long lists stay fast on phones.
  const [pageLimit, setVisible] = useState(PAGE_SIZE);
  const visible = paginate ? pageLimit : products.length;
  if (products.length === 0) {
    return <EmptyState title={emptyMessage} />;
  }
  const lg = columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 ${lg}`}>
      {products.slice(0, visible).map((product, i) => (
        <ProductCard key={product.id} product={product} eager={i < 4} />
      ))}
      {products.length > visible ? (
        <div className="col-span-full mt-6 flex flex-col items-center gap-3">
          <p className="micro text-muted-foreground">
            Showing {visible} of {products.length}
          </p>
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="micro border border-charcoal px-8 py-3 transition-colors duration-200 hover:border-sbs-red hover:bg-sbs-red hover:text-white"
          >
            Load more
          </button>
        </div>
      ) : null}
    </div>
  );
}
