import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { STORE } from "@/config/store";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/commerce/cart";
import { fetchSiteSummary } from "@/commerce/api";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { CartDrawer } from "@/components/navigation/CartDrawer";
import { RewardsProvider } from "@/components/rewards/RewardsProvider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="max-w-md text-center">
        <p className="micro text-sbs-red">404</p>
        <h1 className="mt-4 font-display text-4xl">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This page doesn’t exist or may have moved.
        </p>
        <Link
          to="/shop"
          search={{ sort: "featured" }}
          className="micro mt-8 inline-block border border-charcoal bg-charcoal px-6 py-3 text-white transition-colors duration-200 hover:border-sbs-red hover:bg-sbs-red"
        >
          Back to shop
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="micro border border-charcoal bg-charcoal px-6 py-3 text-white hover:bg-sbs-red hover:border-sbs-red"
          >
            Try again
          </button>
          <a href="/" className="micro border border-charcoal px-6 py-3 text-charcoal">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Menu counts (categories, Gundam grades). Cached for the session; refreshed every 10 min.
  loader: () => fetchSiteSummary(),
  staleTime: 10 * 60_000,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Secret Builders Society | Figures, Model Kits & Collector Goods" },
      { property: "og:site_name", content: "Secret Builders Society" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${STORE.siteUrl}/images/og-share.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${STORE.siteUrl}/images/og-share.jpg` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RewardsProvider>
          <SiteHeader />
          <main id="main">
            <Outlet />
          </main>
          <SiteFooter />
          <CartDrawer />
        </RewardsProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
