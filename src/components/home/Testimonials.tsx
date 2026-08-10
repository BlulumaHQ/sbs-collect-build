import { SBSBuildRail } from "@/components/SBSBuildRail";

const REVIEWS = [
  {
    quote:
      "Preordered a scale kit and it arrived double-boxed with the sleeve intact. First shop that treats the packaging like part of the product.",
    name: "Daniel R.",
    detail: "Model kits · Toronto",
  },
  {
    quote:
      "The staff actually build. I asked about thinner ratios for an airbrush and got a straight answer instead of a shrug.",
    name: "Priya S.",
    detail: "Hobby supplies · Mississauga",
  },
  {
    quote:
      "Blind box pulls, plush, and a full paint wall in one place. My shelf has never been in more danger.",
    name: "Marcus L.",
    detail: "Blind boxes · Scarborough",
  },
];

export function Testimonials() {
  return (
    <section className="section-y border-b border-border">
      <div className="container-sbs">
        <SBSBuildRail index="06" label="From the Community" />
        <h2 className="mt-5 font-display text-3xl md:text-4xl">What Builders Say</h2>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <li key={review.name} className="card-retail flex h-full flex-col p-6">
              <div className="flex gap-1 text-sbs-red" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} aria-hidden="true" className="text-sm leading-none">
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                “{review.quote}”
              </blockquote>
              <footer className="mt-6 border-t border-border pt-4">
                <p className="font-display text-sm">{review.name}</p>
                <p className="micro mt-1 text-muted-foreground">{review.detail}</p>
              </footer>
            </li>
          ))}
        </ul>
        <p className="micro mt-6 text-muted-foreground/70">
          Demo reviews shown for layout purposes.
        </p>
      </div>
    </section>
  );
}
