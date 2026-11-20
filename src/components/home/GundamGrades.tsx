import { Link } from "@tanstack/react-router";
import { useSiteSummary } from "@/commerce/site-summary";
import { GUNPLA_GRADES } from "@/commerce/attributes";
import { SBSBuildRail } from "@/components/SBSBuildRail";

const SCALE: Record<string, string> = {
  EG: "1/144",
  HG: "1/144",
  RG: "1/144",
  MG: "1/100",
  PG: "1/60",
  SD: "No fixed scale",
};
const BLURB: Record<string, string> = {
  EG: "Simplest first build",
  HG: "The classic starting point",
  RG: "High detail, small parts",
  MG: "Larger, with inner frame",
  PG: "The ultimate centrepiece",
  SD: "Compact & stylised",
};

export function GundamGrades({ index }: { index: string }) {
  const counts = useSiteSummary().gundam.grades;
  const grades = GUNPLA_GRADES.filter((g) => g.code !== "OTHER");

  return (
    <section className="section-y border-b border-border bg-white" aria-labelledby="gundam-grades">
      <div className="container-sbs">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SBSBuildRail index={index} label="Gunpla Index" />
            <h2 id="gundam-grades" className="mt-5 font-display text-[32px] lg:text-[38px]">
              Shop Gundam by Grade
            </h2>
          </div>
          <Link
            to="/gundam"
            search={{ sort: "featured" }}
            className="micro text-sbs-red hover:underline"
          >
            All Gundam
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {grades.map((g) => {
            const n = counts[g.code] ?? 0;
            const inner = (
              <>
                <span className="flex h-[76px] items-center lg:h-[88px]">
                  <img
                    src={`/images/grades/${g.code.toLowerCase()}.webp`}
                    alt={`${g.name} (${g.code}) logo`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain object-left transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </span>
                <span className="micro-sm mt-4 block text-foreground transition-colors group-hover:text-sbs-red">{g.name}</span>
                <span className="mt-1 block text-[13px] text-muted-foreground">
                  {SCALE[g.code]} · {BLURB[g.code]}
                </span>
                <span className="micro-sm mt-5 block text-sbs-red">
                  {n > 0 ? `Shop ${n} ${n === 1 ? "kit" : "kits"} →` : `Shop ${g.code} →`}
                </span>
              </>
            );
            return (
              <Link
                key={g.code}
                to="/gundam"
                search={{ sort: "featured", grade: g.code }}
                className="group bg-white p-6 transition-colors hover:bg-bone"
              >
                {inner}
              </Link>
            );
          })}
        </div>
        {Object.keys(counts).length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Gundam kits aren’t in stock right now. New to Gunpla?{" "}
            <Link to="/guides/gunpla-grades-explained" className="text-sbs-red underline">
              Learn about grades
            </Link>
            .
          </p>
        ) : null}
      </div>
    </section>
  );
}
