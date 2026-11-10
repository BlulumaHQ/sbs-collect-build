import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SBSBuildRail } from "@/components/SBSBuildRail";
import { GUIDES, getGuide, type GuideMeta } from "@/content/guides";

export function GuideLayout({
  slug,
  index,
  toc,
  children,
}: {
  slug: GuideMeta["slug"];
  index: string;
  toc: { id: string; label: string }[];
  children: ReactNode;
}) {
  const guide = getGuide(slug);
  const others = GUIDES.filter((g) => g.slug !== slug);

  return (
    <article className="container-sbs py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Guides", to: "/guides" }, { label: guide.title }]} />
      <div className="mt-6">
        <SBSBuildRail index={index} label="Build & Learn" />
      </div>
      <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight md:text-5xl">{guide.title}</h1>
      <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">{guide.excerpt}</p>
      <p className="micro mt-5 text-muted-foreground">
        {guide.level} · {guide.readingMinutes} min read
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
        <div>
          <aside className="border-l-2 border-sbs-red bg-bone px-5 py-4 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">General hobby information.</strong> This guide describes Gunpla
            in general and is not a list of what Secret Builders Society has in stock. Kits differ between
            releases — always follow the instructions included with your own kit. Secret Builders Society is
            an independent shop and is not affiliated with Bandai or Sunrise.
          </aside>
          <div className="guide-prose">{children}</div>
        </div>

        <aside className="h-fit lg:sticky lg:top-[200px]">
          <nav aria-label="On this page" className="border-t border-border pt-4">
            <p className="micro text-muted-foreground">On this page</p>
            <ul className="mt-3 space-y-2 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-charcoal/80 hover:text-sbs-red">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="card-retail mt-8 p-5">
            <p className="micro text-sbs-red">Ready to browse?</p>
            <p className="mt-2 text-sm text-muted-foreground">
              See which Gundam kits and hobby supplies are currently listed in our catalogue.
            </p>
            <Link to="/gundam" search={{ sort: "featured" }} className="btn-primary-sbs mt-4 w-full">
              Shop Gundam
            </Link>
            <Link
              to="/shop/$category"
              params={{ category: "hobby-supplies" }}
              search={{ sort: "featured" }}
              className="btn-ghost-sbs mt-3 w-full"
            >
              Hobby supplies
            </Link>
          </div>
        </aside>
      </div>

      <section className="mt-20 border-t border-border pt-10" aria-labelledby="more-guides">
        <h2 id="more-guides" className="font-display text-2xl">
          Keep learning
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {others.map((g) => (
            <Link key={g.slug} to={g.path} className="card-retail group block p-6">
              <p className="micro-sm text-sbs-red">{g.level} guide</p>
              <h3 className="mt-2 font-display text-xl group-hover:text-sbs-red">{g.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{g.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
