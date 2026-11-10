import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { getCategoryBySlug, getProductsByCategorySlug } from "@/commerce/adapter";
import { validateShopSearch, type ShopSearch } from "@/commerce/search-schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { CatalogueBrowser } from "@/components/commerce/CatalogueBrowser";
import { CATEGORY_COPY } from "@/content/categories";

export const Route = createFileRoute("/shop/$category")({
  validateSearch: validateShopSearch,
  loader: ({ params }) => {
    const category = getCategoryBySlug(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData, params }) => {
    const name = loaderData?.category.name;
    if (!name) {
      return { meta: [{ title: "Shop | Secret Builders Society" }] };
    }
    const title = `${name} | Secret Builders Society`;
    const description =
      CATEGORY_COPY[params.category]?.description ??
      `${name} at Secret Builders Society, Vancouver. Prices in CAD, local pickup only.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:url", content: `/shop/${params.category}` },
      ],
      links: [{ rel: "canonical", href: `/shop/${params.category}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const search = Route.useSearch();
  const params = Route.useParams();
  const navigate = useNavigate({ from: "/shop/$category" });

  const onChange = (next: ShopSearch) => {
    navigate({ to: ".", params, search: next });
  };

  return (
    <div>
      <div className="container-sbs py-10 lg:py-14">
        <Breadcrumbs items={[{ label: "Shop", to: "/shop" }, { label: category.name }]} />
        <div className="mt-6">
          <SBSBuildRail index="01" label={`${category.name} Index`} />
        </div>
        <h1 className="mt-5 font-display text-4xl md:text-6xl">{category.name}</h1>
        {CATEGORY_COPY[category.slug] ? (
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
            {CATEGORY_COPY[category.slug]!.intro}
          </p>
        ) : null}
        <p className="micro mt-4 text-muted-foreground">
          {category.count} {category.count === 1 ? "product" : "products"} listed
        </p>
        {category.slug === "model-kits" ? (
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/gundam" search={{ sort: "featured" }} className="micro text-sbs-red hover:underline">
              Shop Gundam by grade →
            </Link>
            <Link to="/guides" className="micro text-sbs-red hover:underline">
              Beginner guides →
            </Link>
          </div>
        ) : null}

        <div className="mt-10">
          <CatalogueBrowser
            scope={getProductsByCategorySlug(category.slug)}
            search={search}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
