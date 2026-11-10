export interface GuideMeta {
  slug: "gunpla-grades-explained" | "essential-gunpla-tools" | "how-to-build-your-first-gundam";
  path:
    | "/guides/gunpla-grades-explained"
    | "/guides/essential-gunpla-tools"
    | "/guides/how-to-build-your-first-gundam";
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  readingMinutes: number;
  level: string;
}

export const GUIDES: GuideMeta[] = [
  {
    slug: "gunpla-grades-explained",
    path: "/guides/gunpla-grades-explained",
    title: "Gunpla Grades Explained: EG vs HG vs RG vs MG vs PG",
    seoTitle: "Gunpla Grades Explained: EG, HG, RG, MG, PG & SD | SBS Guides",
    description:
      "A plain-English guide to Gunpla grades — Entry Grade, High Grade, Real Grade, Master Grade, Perfect Grade and SD — with scale, difficulty and who each one suits.",
    excerpt: "What the letters on the box mean, and how to pick the right grade for your first or next kit.",
    readingMinutes: 8,
    level: "Beginner",
  },
  {
    slug: "essential-gunpla-tools",
    path: "/guides/essential-gunpla-tools",
    title: "Essential Tools for Your First Gunpla Build",
    seoTitle: "Essential Gunpla Tools for Beginners: Nippers, Sanding & Panel Lining | SBS Guides",
    description:
      "The short list of tools you actually need for a first Gunpla build — nippers, a hobby knife used safely, sanding sticks, tweezers and panel lining basics.",
    excerpt: "Nippers, a hobby knife, sanding sticks, tweezers and a panel liner — what each does and how to use it safely.",
    readingMinutes: 7,
    level: "Beginner",
  },
  {
    slug: "how-to-build-your-first-gundam",
    path: "/guides/how-to-build-your-first-gundam",
    title: "How to Build Your First Gundam Model Kit",
    seoTitle: "How to Build Your First Gundam Model Kit: Step-by-Step | SBS Guides",
    description:
      "A step-by-step walkthrough of a first Gunpla build: reading the manual, finding parts on runners, clean clipping, nub cleanup, assembly and simple finishing.",
    excerpt: "From opening the box to a clean, finished kit on your shelf — a calm, step-by-step first build.",
    readingMinutes: 9,
    level: "Beginner",
  },
];

export function getGuide(slug: GuideMeta["slug"]): GuideMeta {
  return GUIDES.find((g) => g.slug === slug)!;
}

/** Shared head() for guide pages: unique title/description, canonical, Article + BreadcrumbList JSON-LD. */
export function guideHead(slug: GuideMeta["slug"]) {
  const guide = getGuide(slug);
  return {
    meta: [
      { title: guide.seoTitle },
      { name: "description", content: guide.description },
      { property: "og:title", content: guide.seoTitle },
      { property: "og:description", content: guide.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: guide.path },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: guide.path }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          inLanguage: "en-CA",
          author: { "@type": "Organization", name: "Secret Builders Society" },
          publisher: { "@type": "Organization", name: "Secret Builders Society" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Guides", item: "/guides" },
            { "@type": "ListItem", position: 3, name: guide.title },
          ],
        }),
      },
    ],
  };
}
