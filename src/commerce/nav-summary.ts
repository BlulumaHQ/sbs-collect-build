import { getRouteApi } from "@tanstack/react-router";
import type { NavSummary } from "./catalog-api";

const rootApi = getRouteApi("__root__");

/** Catalogue counts for menus and the home page, loaded once by the root route. */
export function useNavSummary(): NavSummary {
  return rootApi.useLoaderData() as NavSummary;
}
