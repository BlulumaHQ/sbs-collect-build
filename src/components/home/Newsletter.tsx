import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Enter your email address." })
    .email({ message: "Enter a valid email address." })
    .max(254, { message: "That email address is too long." }),
});

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  return (
    <section className="bg-charcoal text-white">
      <div className="container-sbs grid gap-8 py-16 lg:grid-cols-2 lg:items-center lg:py-20">
        <div>
          <span className="block h-px w-16 bg-sbs-red" aria-hidden="true" />
          <h2 className="mt-6 font-display text-3xl md:text-4xl">
            Restocks, preorders and drop alerts.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
            One email when preorders open and when sold-out shelf pieces come back. No noise.
          </p>
        </div>

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const parsed = schema.safeParse({ email });
            if (!parsed.success) {
              setError(parsed.error.issues[0]?.message ?? "Enter a valid email address.");
              setDone(false);
              return;
            }
            setError(null);
            setDone(true);
            setEmail("");
          }}
          className="lg:justify-self-end lg:w-full lg:max-w-md"
        >
          <label htmlFor="newsletter-email" className="micro text-white/50">
            Email address
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="newsletter-email"
              type="email"
              value={email}
              maxLength={254}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "newsletter-error" : undefined}
              placeholder="you@example.com"
              className="h-12 flex-1 border border-white/25 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-sbs-red"
            />
            <button type="submit" className="micro bg-sbs-red px-7 py-4 text-white hover:bg-sbs-red-deep">
              Subscribe
            </button>
          </div>
          {error ? (
            <p id="newsletter-error" role="alert" className="mt-3 text-sm text-sbs-amber">
              {error}
            </p>
          ) : null}
          {done ? (
            <p role="status" className="mt-3 text-sm text-white/70">
              Thanks — you're on the list. (Demo form: nothing is sent.)
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
