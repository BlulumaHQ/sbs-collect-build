import { createFileRoute, Link } from "@tanstack/react-router";
import { getPreorderProducts } from "@/commerce/adapter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { ProductGrid } from "@/components/commerce/ProductGrid";

export const Route = createFileRoute("/preorders")({
  head: () => ({
    meta: [
      { title: "Preorders | Secret Builders Society" },
      {
        name: "description",
        content: "Demo catalogue items currently listed with preorder status at Secret Builders Society.",
      },
      { property: "og:title", content: "Preorders | Secret Builders Society" },
      {
        property: "og:description",
        content: "Demo catalogue items currently listed with preorder status.",
      },
      { property: "og:url", content: "/preorders" },
    ],
    links: [{ rel: "canonical", href: "/preorders" }],
  }),
  component: PreordersPage,
});

function PreordersPage() {
  const products = getPreorderProducts();

  return (
    <div className="pt-[64px] md:pt-[78px]">
      <div className="container-sbs py-10 lg:py-14">
        <Breadcrumbs items={[{ label: "Preorders" }]} />
        <div className="mt-6">
          <SBSBuildRail index="04" label="Preorders" />
        </div>
        <h1 className="mt-5 font-display text-4xl md:text-6xl">On the Horizon</h1>
        <p className="micro mt-4 text-muted-foreground">{products.length} demo products</p>

        <div className="mt-12 lg:mt-16">
          <ProductGrid products={products} />
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            to="/shop"
            search={{ sort: "featured" }}
            className="micro border border-charcoal px-6 py-3 transition-colors duration-200 hover:bg-charcoal hover:text-white"
          >
            Back to shop
          </Link>
        </div>
      </div>
    </div>
  );
}
