import type { CommerceProduct } from "@/types/commerce";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/EmptyState";

export function ProductGrid({
  products,
  emptyMessage = "No demo products in this section yet.",
  columns = 4,
}: {
  products: CommerceProduct[];
  emptyMessage?: string;
  columns?: 3 | 4;
}) {
  if (products.length === 0) {
    return <EmptyState title={emptyMessage} />;
  }
  const lg = columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 ${lg}`}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} eager={i < 4} />
      ))}
    </div>
  );
}
