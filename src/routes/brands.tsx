import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchVendors } from "@/commerce/api";
import { brandLogo, brandLogoSized } from "@/commerce/artwork";

/** Brands with fewer products than this stay off the directory. */
const MIN_PRODUCTS = 5;
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/brands")({
  loader: () => fetchVendors(),
  head: () => ({
    meta: [
      { title: "Brands | Secret Builders Society" },
      {
        name: "description",
        content:
          "Browse collector brands stocked by Secret Builders Society — Bandai, Good Smile Company, Square Enix, MegaHouse, GSI Creos and more.",
      },
      { property: "og:title", content: "Brands | Secret Builders Society" },
      {
        property: "og:description",
        content: "Shop by maker across the Secret Builders Society catalogue.",
      },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  const vendors = Route.useLoaderData().filter(
    (v) => v.count >= MIN_PRODUCTS && v.name.toLowerCase() !== "others",
  );

  return (
    <>
      <section className="border-b border-border bg-white py-12 lg:py-16">
        <div className="container-sbs">
          <Breadcrumbs items={[{ label: "Brands" }]} />
          <SBSBuildRail index="01" label="Brand Directory" />
          <h1 className="mt-5 font-display text-[38px] lg:text-[50px]">Brands</h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground lg:text-[17px]">
            Shop by maker across {vendors.length} manufacturers represented in the catalogue.
          </p>
        </div>
      </section>

      <section className="section-y bg-bone">
        <div className="container-sbs">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {vendors.map((vendor) => {
              const sized = brandLogoSized(vendor.name);
              const logo = sized?.src ?? brandLogo(vendor.name);
              return (
                <Link
                  key={vendor.name}
                  to="/shop"
                  search={{ sort: "featured", vendor: vendor.name }}
                  className="card-retail group flex flex-col"
                >
                  <div className="flex h-[140px] items-center justify-center bg-white px-6">
                    {logo ? (
                      <img
                        src={logo}
                        alt={vendor.name}
                        loading="lazy"
                        width={sized?.w}
                        height={sized?.h}
                        style={sized ? { width: sized.w, height: "auto" } : undefined}
                        className="max-h-[100px] max-w-[88%] object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <span className="text-center font-display text-xl">{vendor.name}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between border-t border-border px-4 py-4">
                    <span className="micro-sm text-muted-foreground">
                      {vendor.count} {vendor.count === 1 ? "product" : "products"}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-lg text-charcoal/40 transition-colors duration-200 group-hover:text-sbs-red"
                    >
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
