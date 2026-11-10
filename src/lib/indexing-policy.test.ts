import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { isPlatformHostname, withDomainNoindex } from "./indexing-policy";

describe("domain-aware HTML indexing", () => {
  for (const suffix of ["lovable.app", "workers.dev", "pages.dev", "netlify.app"]) {
    test(`${suffix} covers published, preview, nested hosts and every HTML route/status`, async () => {
      for (const prefix of ["sbs-collect-build", "preview-123--sbs", "preview.sbs"]) {
        for (const path of ["/", "/faq", "/product/example?variant=1", "/missing"]) {
          for (const status of [200, 404, 500]) {
            const request = new Request(`https://${prefix}.${suffix}${path}`);
            const response = withDomainNoindex(request, new Response("<html>public</html>", {
              status, headers: { "content-type": "text/html; charset=utf-8", "x-existing": "preserved" },
            }));
            assert.equal(response.headers.get("X-Robots-Tag"), "noindex");
            assert.equal(response.headers.get("x-existing"), "preserved");
            assert.equal(response.status, status);
            assert.equal(await response.text(), "<html>public</html>");
          }
        }
      }
    });
  }

  test("custom domains keep existing indexing policies; suffix lookalikes do not match", () => {
    // .invalid is a test fixture, NOT a configured or invented production domain.
    for (const host of ["store.invalid", "www.store.invalid", "notlovable.app", "sbs.lovable.app.invalid", "localhost"]) {
      for (const robots of [undefined, "index, follow", "noindex"]) {
        const headers = new Headers({ "content-type": "text/html" });
        if (robots) headers.set("X-Robots-Tag", robots);
        const original = new Response("custom", { headers });
        const result = withDomainNoindex(new Request(`https://${host}/shop`), original);
        assert.equal(result, original);
        assert.equal(result.headers.get("X-Robots-Tag"), robots ?? null);
      }
    }
  });

  test("hostname is case-insensitive, trailing-dot safe and ignores spoofed forwarding", () => {
    assert.equal(isPlatformHostname("SBS.LOVABLE.APP."), true);
    const request = new Request("https://sbs.lovable.app/", { headers: { "x-forwarded-host": "store.invalid" } });
    const response = withDomainNoindex(request, new Response("public", { headers: { "content-type": "text/html" } }));
    assert.equal(response.headers.get("X-Robots-Tag"), "noindex");
  });

  test("non-HTML assets and crawler discovery remain untouched", () => {
    for (const type of ["text/plain", "application/xml", "application/json", "image/webp"]) {
      const original = new Response("asset", { headers: { "content-type": type } });
      assert.equal(withDomainNoindex(new Request("https://sbs.pages.dev/robots.txt"), original), original);
    }
  });

  test("XHTML and HEAD HTML receive noindex without replacing existing directives", () => {
    const response = withDomainNoindex(new Request("https://sbs.workers.dev/faq", { method: "HEAD" }),
      new Response(null, { headers: { "content-type": "application/xhtml+xml", "X-Robots-Tag": "nofollow" } }));
    assert.equal(response.headers.get("X-Robots-Tag"), "nofollow, noindex");
    assert.equal(response.body, null);
  });
});