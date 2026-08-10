import { useState } from "react";

export function Newsletter() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setDone(true);
  };

  return (
    <section className="bg-charcoal py-16 text-white lg:py-20">
      <div className="container-sbs grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <h2 className="font-display text-[32px] text-white lg:text-[40px]">Join the Society.</h2>
          <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-white/70">
            Get updates on new arrivals, preorders, collector releases and store news.
          </p>
        </div>

        {done ? (
          <p className="font-display text-2xl text-white">Thanks for joining the Society.</p>
        ) : (
          <form onSubmit={submit} noValidate className="w-full">
            <div className="grid gap-3 sm:grid-cols-[1fr_1.4fr_auto]">
              <label className="sr-only" htmlFor="nl-first">
                First name
              </label>
              <input
                id="nl-first"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                maxLength={60}
                className="h-13 border border-white/20 bg-white/5 px-4 py-3.5 text-[15px] text-white outline-none placeholder:text-white/45 focus:border-sbs-red"
              />
              <label className="sr-only" htmlFor="nl-email">
                Email address
              </label>
              <input
                id="nl-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                maxLength={120}
                className="h-13 border border-white/20 bg-white/5 px-4 py-3.5 text-[15px] text-white outline-none placeholder:text-white/45 focus:border-sbs-red"
              />
              <button type="submit" className="btn-primary-sbs">
                Sign me up
              </button>
            </div>
            {error ? <p className="mt-3 text-sm text-white/80">{error}</p> : null}
          </form>
        )}
      </div>
    </section>
  );
}
