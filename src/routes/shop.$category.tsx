import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { getCategoryBySlug, getProductsByCategorySlug } from "@/commerce/adapter";
import { validateShopSearch, type ShopSearch } from "@/commerce/search-schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { CatalogueBrowser } from "@/components/commerce/CatalogueBrowser";

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
    const description = `Browse ${name.toLowerCase()} in the Secret Builders Society demo catalogue.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
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
    <div className="pt-[64px] md:pt-[78px]">
      <div className="container-sbs py-10 lg:py-14">
        <Breadcrumbs items={[{ label: "Shop", to: "/shop" }, { label: category.name }]} />
        <div className="mt-6">
          <SBSBuildRail index="01" label={`${category.name} Index`} />
        </div>
        <h1 className="mt-5 font-display text-4xl md:text-6xl">{category.name}</h1>
        <p className="micro mt-4 text-muted-foreground">{category.count} demo products</p>

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
