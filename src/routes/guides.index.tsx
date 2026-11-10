import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { GUIDES } from "@/content/guides";

const TITLE = "Gunpla & Model Kit Guides for Beginners | Secret Builders Society";
const DESCRIPTION =
  "Beginner-friendly Gunpla guides from Secret Builders Society in Vancouver: grades explained, the essential tools, and how to build your first Gundam model kit.";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/guides" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/guides" }],
  }),
  component: GuidesIndex,
});

function GuidesIndex() {
  return (
    <div className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Guides" }]} />
      <div className="mt-6">
        <SBSBuildRail index="01" label="Build & Learn" />
      </div>
      <h1 className="mt-5 font-display text-4xl md:text-6xl">Guides</h1>
      <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
        Plain-English guides for people starting out with Gunpla and plastic model kits. They cover the
        hobby in general — for what we currently list, browse the shop.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {GUIDES.map((g, i) => (
          <Link key={g.slug} to={g.path} className="card-retail group flex flex-col p-6">
            <span className="micro text-sbs-red">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="mt-4 font-display text-2xl leading-tight group-hover:text-sbs-red">{g.title}</h2>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{g.excerpt}</p>
            <span className="micro-sm mt-6 text-muted-foreground">
              {g.level} · {g.readingMinutes} min read
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link to="/gundam" search={{ sort: "featured" }} className="btn-primary-sbs">
          Shop Gundam
        </Link>
        <Link to="/contact" className="btn-ghost-sbs">
          Ask the shop a question
        </Link>
      </div>
    </div>
  );
}
