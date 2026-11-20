import { useRouterState } from "@tanstack/react-router";
import type { SiteSummary } from "@/commerce/api";

const EMPTY: SiteSummary = {
  categories: [],
  gundam: {
    total: 0,
    grades: {},
    gundamSeries: {},
    available: 0,
    newArrivals: 0,
    preorder: 0,
    sale: 0,
  },
};

/** Catalogue counts for menus, loaded once by the root route (see __root.tsx). */
export function useSiteSummary(): SiteSummary {
  // The root route is always the first match.
  const data = useRouterState({ select: (s) => s.matches[0]?.loaderData }) as
    SiteSummary | undefined;
  return data ?? EMPTY;
}

/** Categories that currently have products — empty ones stay out of menus. */
export function useVisibleCategories() {
  return useSiteSummary().categories.filter((c) => c.count > 0);
}
