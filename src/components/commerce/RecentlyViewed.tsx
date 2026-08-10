import { SBSBuildRail } from "@/components/SBSBuildRail";
import { ProductCard } from "@/components/commerce/ProductCard";
import { useRecentlyViewed } from "@/commerce/recently-viewed";

export function RecentlyViewed({
  excludeId,
  index = "08",
  limit = 4,
}: {
  excludeId?: string;
  index?: string;
  limit?: number;
}) {
  const products = useRecentlyViewed(excludeId).slice(0, limit);
  if (products.length === 0) return null;

  return (
    <section className="section-y border-b border-border">
      <div className="container-sbs">
        <SBSBuildRail index={index} label="Recently Viewed" />
        <h2 className="mt-5 font-display text-2xl md:text-3xl">Picked Back Up</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
