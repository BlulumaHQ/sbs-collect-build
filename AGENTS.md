<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Apply platform-domain noindex only to HTML at the server response boundary using the incoming URL hostname; preserve custom-host and route-specific SEO because shared global rules would block production search indexing.
- Keep HTML prerendering disabled while indexing depends on hostname; static documents bypass per-request server headers and can be shared across hosts.
- Keep indexing-policy regression tests dependency-free with node:test, run by Bun, because Node type definitions and Bun are already available in this project.
- Derive product grade/scale/Gundam series only in `src/commerce/attributes.ts` from explicit fields or unambiguous title tokens, never descriptions, so Shopify metafields can replace them without UI changes.
- Filtered catalogue views (e.g. `/gundam?grade=`) keep one canonical per base route to avoid thin indexable pages.
- The live catalogue is a build-time snapshot in `src/data/shopify-products.json`, written by `scripts/sync-shopify-catalog.mjs` from the Shopify Storefront API (tags `sbs-category:`, `sbs-subcategory:`, `franchise:`, `grade:`, `gundam-series:`, `series:`); when it is empty the adapter falls back to `demo-products.json`, so keep the adapter surface identical for both.
