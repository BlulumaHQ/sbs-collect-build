import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Gift } from "lucide-react";
import { useRewards } from "./RewardsProvider";

const REDEEM = [
  { points: "500 points", value: "$5 off" },
  { points: "1000 points", value: "$12 off" },
  { points: "2000 points", value: "$30 off" },
];

const EARN = [
  { title: "Create an Account", value: "+100 points" },
  { title: "Make a Purchase", value: "1 point per $1 spent" },
  { title: "Write a Product Review", value: "+50 points" },
  { title: "Refer a Friend", value: "+200 points" },
];

export function RewardsLauncher() {
  const { openRewards } = useRewards();
  return (
    <button
      type="button"
      onClick={openRewards}
      className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 bg-sbs-red px-5 py-3.5 text-white shadow-[0_12px_30px_-12px_rgba(0,0,0,0.7)] transition-colors duration-200 hover:bg-sbs-red-deep max-lg:bottom-24"
      aria-haspopup="dialog"
    >
      <Gift size={18} aria-hidden="true" />
      <span className="micro-sm">Rewards</span>
    </button>
  );
}

export function RewardsModal() {
  const { open, closeRewards } = useRewards();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRewards();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeRewards]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="SBS Rewards"
    >
      <button
        type="button"
        aria-label="Close rewards"
        onClick={closeRewards}
        className="absolute inset-0 h-full w-full bg-charcoal/75"
      />
      <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto bg-card">
        <header className="flex items-start justify-between gap-4 border-b border-border bg-charcoal px-7 py-6 text-white">
          <div>
            <h2 className="font-display text-2xl text-white">SBS Rewards</h2>
            <p className="micro-sm mt-2 text-white/60">Prototype Rewards Preview</p>
          </div>
          <button
            type="button"
            onClick={closeRewards}
            className="micro-sm text-white/70 hover:text-white"
          >
            Close
          </button>
        </header>

        <div className="px-7 py-7">
          <p className="text-[16px] leading-relaxed text-muted-foreground">
            A preview of how Secret Builders Society rewards could work when customer accounts and
            Shopify are connected.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/account" onClick={closeRewards} className="btn-primary-sbs">
              Log in
            </Link>
            <Link to="/account" onClick={closeRewards} className="btn-ghost-sbs">
              Create account
            </Link>
          </div>

          <h3 className="micro mt-10 text-muted-foreground">Redeem points</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {REDEEM.map((r) => (
              <div key={r.points} className="card-retail p-5 text-center">
                <p className="micro-sm text-sbs-red">{r.points}</p>
                <p className="mt-2 font-display text-2xl">{r.value}</p>
              </div>
            ))}
          </div>

          <h3 className="micro mt-10 text-muted-foreground">Ways to earn</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {EARN.map((e) => (
              <div key={e.title} className="card-retail p-5">
                <p className="text-[16px] font-medium">{e.title}</p>
                <p className="mt-1.5 text-[15px] text-sbs-red">{e.value}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 border-t border-border pt-6 text-[14px] leading-relaxed text-muted-foreground">
            Prototype rewards structure for design review only. Final points, redemption values and
            eligibility rules may change before launch.
          </p>
        </div>
      </div>
    </div>
  );
}
