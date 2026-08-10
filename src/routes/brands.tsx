import { createFileRoute, Link } from "@tanstack/react-router";
import { getVendors } from "@/commerce/adapter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Brands | Secret Builders Society" },
      {
        name: "description",
        content: "Makers represented in the Secret Builders Society demo catalogue.",
      },
      { property: "og:title", content: "Brands | Secret Builders Society" },
      {
        property: "og:description",
        content: "Makers represented in the Secret Builders Society demo catalogue.",
      },
      { property: "og:url", content: "/brands" },
    ],
    links: [{ rel: "canonical", href: "/brands" }],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  const vendors = getVendors();

  return (
    <div>
      <div className="container-sbs py-10 lg:py-14">
        <Breadcrumbs items={[{ label: "Brands" }]} />
        <div className="mt-6">
          <SBSBuildRail index="06" label="Maker Index" />
        </div>
        <h1 className="mt-5 font-display text-4xl md:text-6xl">Brands</h1>
        <p className="micro mt-4 text-muted-foreground">{vendors.length} makers in the demo catalogue</p>

        <ul className="mt-12 border-t border-charcoal/20">
          {vendors.map((vendor) => (
            <li key={vendor.name} className="border-b border-border">
              <Link
                to="/shop"
                search={{ sort: "featured", vendor: vendor.name }}
                className="group flex items-center justify-between gap-6 py-6 transition-colors duration-200 hover:text-sbs-red"
              >
                <span className="font-display text-2xl md:text-4xl">{vendor.name}</span>
                <span className="micro shrink-0 text-muted-foreground">
                  {vendor.count} {vendor.count === 1 ? "product" : "products"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
