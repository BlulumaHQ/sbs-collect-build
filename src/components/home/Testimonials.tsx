import { useState } from "react";

const REVIEWS = [
  {
    quote:
      "Finding figures and model kits by category feels much easier than digging through a huge catalogue.",
    name: "Demo Builder 01",
  },
  {
    quote:
      "The brand and series browsing makes it easy to jump straight to the things I actually collect.",
    name: "Demo Builder 02",
  },
  {
    quote:
      "I like that hobby tools sit beside the kits instead of feeling like a completely separate store.",
    name: "Demo Builder 03",
  },
  {
    quote: "The layout feels made for collectors rather than a generic toy shop.",
    name: "Demo Builder 04",
  },
  {
    quote:
      "Preorders, model kits and figures are easy to scan without the site feeling overloaded.",
    name: "Demo Builder 05",
  },
  {
    quote:
      "The shared tattoo and hobby-shop concept gives the store a personality you do not see everywhere.",
    name: "Demo Builder 06",
  },
];

export function Testimonials() {
  const [slide, setSlide] = useState(0);
  const slides = [REVIEWS.slice(0, 3), REVIEWS.slice(3, 6)];

  return (
    <section className="section-y border-b border-border bg-bone-deep">
      <div className="container-sbs">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[32px] lg:text-[38px]">What Builders Say</h2>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show reviews slide ${i + 1}`}
                  aria-current={i === slide}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 w-8 transition-colors duration-200 ${
                    i === slide ? "bg-sbs-red" : "bg-charcoal/20 hover:bg-charcoal/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous reviews"
                onClick={() => setSlide((s) => (s + slides.length - 1) % slides.length)}
                className="flex h-10 w-10 items-center justify-center border border-charcoal/25 text-lg hover:bg-charcoal hover:text-white"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next reviews"
                onClick={() => setSlide((s) => (s + 1) % slides.length)}
                className="flex h-10 w-10 items-center justify-center border border-charcoal/25 text-lg hover:bg-charcoal hover:text-white"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {slides[slide]!.map((review, i) => (
            <figure
              key={review.name}
              className={`card-retail m-0 flex h-full flex-col p-7 ${
                i === 2 ? "md:hidden lg:flex" : ""
              } ${i === 1 ? "hidden md:flex" : "flex"}`}
            >
              <span className="micro-sm text-sbs-red">Demo review</span>
              <blockquote className="mt-4 flex-1 text-[16px] leading-relaxed text-foreground">
                “{review.quote}”
              </blockquote>
              <figcaption className="micro mt-6 text-muted-foreground">{review.name}</figcaption>
            </figure>
          ))}
        </div>

        <p className="micro-sm mt-6 text-muted-foreground">
          Demo content shown for design review — verified customer reviews will replace these.
        </p>
      </div>
    </section>
  );
}
