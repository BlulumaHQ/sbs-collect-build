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

        <ul className="mt-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
          {vendors.map((vendor) => (
            <li key={vendor.name}>
              <Link
                to="/shop"
                search={{ sort: "featured", vendor: vendor.name }}
                className="group flex h-32 flex-col items-center justify-center gap-2 bg-white px-4 text-center transition-colors duration-200 hover:bg-bone"
              >
                <span className="font-display text-sm uppercase tracking-[0.18em] text-charcoal/75 transition-colors duration-200 group-hover:text-sbs-red">
                  {vendor.name}
                </span>
                <span className="micro text-muted-foreground">
                  {vendor.count} {vendor.count === 1 ? "product" : "products"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="micro mt-6 text-muted-foreground/70">
          Maker logotypes are trademarked and were not supplied; typographic lockups are shown.
        </p>
      </div>
    </div>
  );
}
