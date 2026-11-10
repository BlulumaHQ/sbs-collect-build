import { Link } from "@tanstack/react-router";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { GUIDES } from "@/content/guides";

export function BeginnersCorner({ index }: { index: string }) {
  return (
    <section className="section-y border-b border-border bg-bone" aria-labelledby="beginners-corner">
      <div className="container-sbs">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SBSBuildRail index={index} label="Build & Learn" />
            <h2 id="beginners-corner" className="mt-5 font-display text-[32px] lg:text-[38px]">
              Beginner’s Corner
            </h2>
            <p className="mt-3 max-w-xl text-[16px] text-muted-foreground">
              New to model kits? Three short guides to get your first build right.
            </p>
          </div>
          <Link to="/guides" className="micro text-sbs-red hover:underline">
            All guides
          </Link>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {GUIDES.map((g, i) => (
            <Link key={g.slug} to={g.path} className="card-retail group flex flex-col p-6">
              <span className="micro text-sbs-red">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-xl leading-snug group-hover:text-sbs-red">{g.title}</h3>
              <p className="mt-2 flex-1 text-[15px] text-muted-foreground">{g.excerpt}</p>
              <span className="micro-sm mt-5 text-muted-foreground">{g.readingMinutes} min read</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
