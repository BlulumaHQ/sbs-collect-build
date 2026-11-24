import { Link } from "@tanstack/react-router";
import {
  useDirectCategories,
  FIGURE_SUBCATEGORIES,
  HOBBY_SUPPLY_SUBCATEGORIES,
  MODEL_KIT_SUBCATEGORIES,
  SubcategoryLink,
} from "./taxonomy";
import { categorySlug } from "@/commerce/adapter";
import { useSiteSummary } from "@/commerce/site-summary";

export function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const DIRECT_CATEGORIES = useDirectCategories();
  const newArrivals = useSiteSummary().newArrivals;
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
          {newArrivals > 0 ? (
            <Link
              to="/shop"
              search={{ sort: "featured", new: true }}
              onClick={onNavigate}
              className="flex items-baseline justify-between gap-3 text-sm font-medium text-sbs-red hover:underline"
            >
              New Arrivals <span className="micro-sm text-muted-foreground">{newArrivals}</span>
            </Link>
          ) : null}
          <Link
            to="/preorders"
            search={{ sort: "featured" }}
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
            to="/gundam"
            search={{ sort: "featured" }}
            onClick={onNavigate}
            className="text-sm text-charcoal/80 hover:text-sbs-red"
          >
            Gundam
          </Link>
          <Link
            to="/guides"
            onClick={onNavigate}
            className="text-sm text-charcoal/80 hover:text-sbs-red"
          >
            Guides
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
          <Link
            to="/gundam"
            search={{ sort: "featured" }}
            onClick={onNavigate}
            className="group mt-4 block border border-border bg-white"
          >
            <img
              src="/images/menu/rx-78-2-gundam.webp"
              alt="RX-78-2 Gundam model kit"
              loading="lazy"
              className="aspect-square w-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.04]"
            />
            <span className="micro-sm block border-t border-border px-3 py-2 text-charcoal group-hover:text-sbs-red">
              Shop Gundam →
            </span>
          </Link>
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
