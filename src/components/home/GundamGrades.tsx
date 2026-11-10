import { Link } from "@tanstack/react-router";
import { getGundamProducts } from "@/commerce/adapter";
import { GUNPLA_GRADES } from "@/commerce/attributes";
import { SBSBuildRail } from "@/components/SBSBuildRail";

const SCALE: Record<string, string> = { EG: "1/144", HG: "1/144", RG: "1/144", MG: "1/100", PG: "1/60", SD: "No fixed scale" };
const BLURB: Record<string, string> = {
  EG: "Simplest first build",
  HG: "The classic starting point",
  RG: "1/144 with high detail",
  MG: "Larger, with inner frame",
  PG: "The ultimate centrepiece",
  SD: "Compact & stylised",
};

export function GundamGrades({ index }: { index: string }) {
  const scope = getGundamProducts();
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
          <Link to="/gundam" search={{ sort: "featured" }} className="micro text-sbs-red hover:underline">
            All Gundam
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {grades.map((g) => {
            const n = scope.filter((p) => p.grade === g.code).length;
            const inner = (
              <>
                <span className="font-display text-[44px] leading-none tracking-tight transition-colors duration-200 group-hover:text-sbs-red lg:text-[52px]">
                  {g.code}
                </span>
                <span className="micro-sm mt-3 block text-foreground">{g.name}</span>
                <span className="mt-1 block text-[13px] text-muted-foreground">
                  {SCALE[g.code]} · {BLURB[g.code]}
                </span>
                <span className="micro-sm mt-5 block text-sbs-red">
                  {n > 0 ? `Shop ${n} ${n === 1 ? "kit" : "kits"} →` : "Learn about this grade →"}
                </span>
              </>
            );
            return n > 0 ? (
              <Link key={g.code} to="/gundam" search={{ sort: "featured", grade: g.code }} className="group bg-white p-6 transition-colors hover:bg-bone">
                {inner}
              </Link>
            ) : (
              <Link
                key={g.code}
                to="/guides/gunpla-grades-explained"
                hash={`grade-${g.code.toLowerCase()}`}
                className="group bg-white p-6 transition-colors hover:bg-bone"
              >
                {inner}
              </Link>
            );
          })}
        </div>
        {scope.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Gundam kits aren’t in the demo catalogue yet, so each grade links to our guide for now.
          </p>
        ) : null}
      </div>
    </section>
  );
}
