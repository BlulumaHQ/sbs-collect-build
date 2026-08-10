import { Link } from "@tanstack/react-router";
import { CATEGORY_ORDER, categorySlug } from "@/commerce/adapter";

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

export const DIRECT_CATEGORIES = ["Plush", "Blind Boxes", "Character Goods", "Apparel"];

export const PRIMARY_CATEGORIES = CATEGORY_ORDER.map((name) => ({
  name,
  slug: categorySlug(name),
}));

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
