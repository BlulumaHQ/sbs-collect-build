# Domain-aware indexing verification — 2026-11-10

## Implementation
- Existing architecture: TanStack Start React SSR, Vite with Nitro's Cloudflare module target. Configured deployment entry is `dist/server/index.mjs`, with assets in `dist/client`; deployment configuration and dependencies were not changed.
- HTML and XHTML passing through `src/server.ts` receive `X-Robots-Tag: noindex` only when the actual request URL hostname is a dot-delimited subdomain of lovable.app, workers.dev, pages.dev or netlify.app. This includes nested preview hostnames, nested routes, HEAD, 404 HTML and caught/normalized 500 HTML.
- Custom-host responses are returned unchanged. No forwarding headers are trusted. No access controls or redirects were added or changed.
- Removed blanket staging robots/googlebot meta and `public/_headers`. Existing route-level product-not-found noindex was preserved, as an error-page policy rather than a global staging policy.
- Existing titles, descriptions, canonical links, structured data and `public/robots.txt` were preserved. Robots allows crawling. No sitemap exists in the source; none was invented. No custom domain is connected.
- Prerendering explicitly disabled to prevent shared static HTML from bypassing per-host headers. There are no committed public HTML documents.

## Verification
- Latest automatic harness report: `build OK` at 2026-11-10T08:41:24Z. No manual build or typecheck was run; generated deployment output was not available for inspection in this sandbox.
- `bun test src/lib/indexing-policy.test.ts`: 8 tests passed, zero failed. Covers all four suffixes, nested hosts/routes, status and body preservation, custom-host policy preservation, suffix lookalikes, spoofed forwarding, XHTML/HEAD, and non-HTML assets.
- Actual local SSR GET requests to `/`, `/faq`, `/shop/model-kits?sort=featured` returned 200 and `/missing` returned 404. Localhost receives no blanket noindex header or meta. Relative canonicals `/` and `/faq` remain unchanged.
- A temporary test exercised the actual server response wrapper with real local SSR HTML as the inner handler output and simulated platform/custom request origins. All four platform origins received noindex; the reserved custom test host did not. Caught 500 HTML was covered. This is server-boundary testing, NOT published end-to-end HTTP verification.
- Dev-server hostname overrides were rejected by Vite's existing allowed-host rules (403). Those are development-only tests, not evidence that public app access was modified.

## Public HTTP checks and limitations
- Project status tool confirms unpublished and no connected custom domains. No known workers.dev, pages.dev or netlify.app deployment exists to test.
- `https://sbs-collect-build.lovable.app`: root, FAQ, nested shop and missing routes returned platform-generated 404 HTML without X-Robots-Tag. This is not deployed SBS HTML, and the project server cannot modify these upstream responses. Do NOT claim these pages are protected.
- `https://id-preview--cae89c43-f572-4e69-a662-5d761feda79b.lovable.app`: the same routes returned platform-controlled 401 text responses carrying `X-Robots-Tag: noindex, nofollow`. This verifies only the platform's unauthorized responses, NOT publicly accessible application HTML. The app cannot remove the preview platform's sign-in requirement.
- Publishing/redeployment is required before these code changes apply to public application HTML. Recheck public GET/HEAD root, nested route, 404 and a custom-domain success page after deployment. Confirm the serving layer passes the original hostname and preserves application headers; do not assume this without HTTP evidence.
- Deployments serving static HTML directly or generating errors before invoking the project server are outside this wrapper's control. No Pages/Netlify static-host adapter or CDN rule was added. Such deployments require a serving-layer conditional rule or an SSR deployment using this handler; never substitute blanket `_headers` or client JavaScript.
- No publishing, visibility change, domain addition or access-setting change was performed.