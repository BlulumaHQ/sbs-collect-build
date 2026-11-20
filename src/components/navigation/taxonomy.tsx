import { Link } from "@tanstack/react-router";
import { useVisibleCategories } from "@/commerce/site-summary";

export const FIGURE_SUBCATEGORIES = [
  "Scale Figures",
  "Non-Scale Figures",
  "Chibi Figures",
  "Action Figures",
  "Prize Figures",
  "Statues",
  "Figure Accessories",
];

export const MODEL_KIT_SUBCATEGORIES = [
  "Gunpla",
  "Character Kits",
  "Mech Kits",
  "Scale Kits",
  "Original Series",
  "Sci-Fi",
  "Kit Accessories",
];

export const HOBBY_SUPPLY_SUBCATEGORIES = [
  "Paints",
  "Airbrushes",
  "Compressors",
  "Tools",
  "Finishing",
  "Brushes & Markers",
  "Display Cases & Storage",
];

const DIRECT = ["Plush", "Blind Boxes", "Character Goods", "Apparel"];

/** Top-level categories with products, in catalogue order. */
export function usePrimaryCategories() {
  return useVisibleCategories().map(({ name, slug }) => ({ name, slug }));
}

/** Smaller categories listed directly in the mega menu (empty ones hidden). */
export function useDirectCategories() {
  const visible = useVisibleCategories();
  return DIRECT.filter((name) => visible.some((c) => c.name === name));
}

export function SubcategoryLink({
  categoryPath,
  subcategory,
  onNavigate,
}: {
  categoryPath: string;
  subcategory: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      to="/shop/$category"
      params={{ category: categoryPath }}
      search={{ subcategory, sort: "featured" }}
      onClick={onNavigate}
      className="block py-1 text-sm text-charcoal/80 transition-colors duration-200 hover:text-sbs-red"
    >
      {subcategory}
    </Link>
  );
}
