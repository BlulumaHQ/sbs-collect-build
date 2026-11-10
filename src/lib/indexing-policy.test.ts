import { describe, expect, test } from "bun:test";
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
            expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
            expect(response.headers.get("x-existing")).toBe("preserved");
            expect(response.status).toBe(status);
            expect(await response.text()).toBe("<html>public</html>");
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
        expect(result).toBe(original);
        expect(result.headers.get("X-Robots-Tag")).toBe(robots ?? null);
      }
    }
  });

  test("hostname is case-insensitive, trailing-dot safe and ignores spoofed forwarding", () => {
    expect(isPlatformHostname("SBS.LOVABLE.APP.")).toBe(true);
    const request = new Request("https://sbs.lovable.app/", { headers: { "x-forwarded-host": "store.invalid" } });
    const response = withDomainNoindex(request, new Response("public", { headers: { "content-type": "text/html" } }));
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
  });

  test("non-HTML assets and crawler discovery remain untouched", () => {
    for (const type of ["text/plain", "application/xml", "application/json", "image/webp"]) {
      const original = new Response("asset", { headers: { "content-type": type } });
      expect(withDomainNoindex(new Request("https://sbs.pages.dev/robots.txt"), original)).toBe(original);
    }
  });

  test("XHTML and HEAD HTML receive noindex without replacing existing directives", () => {
    const response = withDomainNoindex(new Request("https://sbs.workers.dev/faq", { method: "HEAD" }),
      new Response(null, { headers: { "content-type": "application/xhtml+xml", "X-Robots-Tag": "nofollow" } }));
    expect(response.headers.get("X-Robots-Tag")).toBe("nofollow, noindex");
    expect(response.body).toBeNull();
  });
});