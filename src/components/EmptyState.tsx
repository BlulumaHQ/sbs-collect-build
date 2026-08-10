import { Link } from "@tanstack/react-router";

export function EmptyState({
  title,
  ctaLabel,
  ctaTo,
}: {
  title: string;
  ctaLabel?: string;
  ctaTo?: string;
}) {
  return (
    <div className="border border-border bg-card px-6 py-20 text-center">
      <p className="font-display text-xl text-foreground">{title}</p>
      {ctaLabel && ctaTo ? (
        <Link
          to={ctaTo}
          className="micro mt-6 inline-block border border-charcoal bg-charcoal px-6 py-3 text-white transition-colors duration-200 hover:bg-sbs-red hover:border-sbs-red"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
