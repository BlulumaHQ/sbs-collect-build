import { Gift } from "lucide-react";
import { useRewards } from "@/components/rewards/RewardsProvider";

export function RewardsTeaser() {
  const { openRewards } = useRewards();

  return (
    <section className="border-b border-border bg-sbs-red py-14 text-white lg:py-16">
      <div className="container-sbs flex flex-wrap items-center justify-between gap-8">
        <div className="flex items-start gap-5">
          <Gift size={34} aria-hidden="true" className="mt-1 shrink-0 text-white/85" />
          <div>
            <h2 className="font-display text-[30px] text-white lg:text-[36px]">SBS Rewards</h2>
            <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-white/80">
              Earn points on builds, reviews and referrals. A prototype preview of the rewards
              programme planned for launch.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={openRewards}
          className="micro border border-white bg-white px-7 py-4 text-sbs-red transition-colors duration-200 hover:bg-transparent hover:text-white"
        >
          Preview rewards
        </button>
      </div>
    </section>
  );
}
