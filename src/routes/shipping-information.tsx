import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL — the store is local pickup only. Permanently redirect old links. */
export const Route = createFileRoute("/shipping-information")({
  beforeLoad: () => {
    throw redirect({ to: "/pickup-information", statusCode: 301 });
  },
});
