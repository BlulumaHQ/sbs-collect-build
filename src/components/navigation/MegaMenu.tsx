import { Link } from "@tanstack/react-router";
import {
  DIRECT_CATEGORIES,
  FIGURE_SUBCATEGORIES,
  HOBBY_SUPPLY_SUBCATEGORIES,
  MODEL_KIT_SUBCATEGORIES,
  SubcategoryLink,
} from "./taxonomy";
import { categorySlug, getProductsByCategorySlug } from "@/commerce/adapter";

const accent = getProductsByCategorySlug("model-kits")[1];

export function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="border-t border-border bg-card">
      <div className="container-sbs grid gap-8 py-10 lg:grid-cols-[200px_1fr_1fr_1fr_240px]">
        <div className="flex flex-col gap-3 border-r border-border pr-6">
          <span className="micro text-muted-foreground">Index</span>
          <Link
            to="/shop"
            search={{ sort: "featured" }}
            onClick={onNavigate}
            className="font-display text-lg text-foreground hover:text-sbs-red"
          >
            Shop All
          </Link>
          <Link
            to="/preorders"
            onClick={onNavigate}
            className="text-sm text-charcoal/80 hover:text-sbs-red"
          >
            Preorders
          </Link>
          <Link
            to="/collections"
            onClick={onNavigate}
            className="text-sm text-charcoal/80 hover:text-sbs-red"
          >
            Collections
          </Link>
          <Link
            to="/brands"
            onClick={onNavigate}
            className="text-sm text-charcoal/80 hover:text-sbs-red"
          >
            Brands
          </Link>
        </div>

        <MenuColumn
          title="Figures"
          slug="figures"
          items={FIGURE_SUBCATEGORIES}
          onNavigate={onNavigate}
        />
        <MenuColumn
          title="Model Kits"
          slug="model-kits"
          items={MODEL_KIT_SUBCATEGORIES}
          onNavigate={onNavigate}
        />
        <MenuColumn
          title="Hobby Supplies"
          slug="hobby-supplies"
          items={HOBBY_SUPPLY_SUBCATEGORIES}
          onNavigate={onNavigate}
        />

        <div className="flex flex-col gap-3 border-l border-border pl-6">
          <span className="micro text-muted-foreground">More Categories</span>
          {DIRECT_CATEGORIES.map((name) => (
            <Link
              key={name}
              to="/shop/$category"
              params={{ category: categorySlug(name) }}
              search={{ sort: "featured" }}
              onClick={onNavigate}
              className="text-sm text-charcoal/80 hover:text-sbs-red"
            >
              {name}
            </Link>
          ))}
          {accent ? (
            <Link
              to="/product/$handle"
              params={{ handle: accent.handle }}
              onClick={onNavigate}
              className="mt-4 block border border-border bg-bone"
            >
              <img
                src={accent.image}
                alt={accent.title}
                loading="lazy"
                className="aspect-square w-full object-contain p-4"
              />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MenuColumn({
  title,
  slug,
  items,
  onNavigate,
}: {
  title: string;
  slug: string;
  items: string[];
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Link
        to="/shop/$category"
        params={{ category: slug }}
        search={{ sort: "featured" }}
        onClick={onNavigate}
        className="micro mb-1 text-sbs-red"
      >
        {title}
      </Link>
      {items.map((item) => (
        <SubcategoryLink
          key={item}
          categoryPath={slug}
          subcategory={item}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
