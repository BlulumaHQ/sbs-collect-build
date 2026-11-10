import { createFileRoute, Link } from "@tanstack/react-router";
import { GuideLayout } from "@/components/guides/GuideLayout";
import { guideHead } from "@/content/guides";

export const Route = createFileRoute("/guides/gunpla-grades-explained")({
  head: () => guideHead("gunpla-grades-explained"),
  component: GradesGuide,
});

const TOC = [
  { id: "what-is-a-grade", label: "What a grade means" },
  { id: "grade-eg", label: "EG — Entry Grade" },
  { id: "grade-hg", label: "HG — High Grade" },
  { id: "grade-rg", label: "RG — Real Grade" },
  { id: "grade-mg", label: "MG — Master Grade" },
  { id: "grade-pg", label: "PG — Perfect Grade" },
  { id: "grade-sd", label: "SD — Super Deformed" },
  { id: "grade-other", label: "Other lines" },
  { id: "comparison", label: "Quick comparison" },
  { id: "choosing", label: "Which should you choose?" },
];

const ROWS = [
  ["EG", "1/144", "Easiest", "First-ever build, younger builders with help"],
  ["HG", "1/144", "Easy–moderate", "Most beginners; the widest range of designs"],
  ["RG", "1/144", "Moderate–hard", "Detail lovers comfortable with small parts"],
  ["MG", "1/100", "Moderate–hard", "A bigger, more involved build with an inner frame"],
  ["PG", "1/60", "Hard / long", "Experienced builders wanting a centrepiece"],
  ["SD", "No fixed scale", "Easy", "Compact, stylised builds and quick sessions"],
];

function GradesGuide() {
  return (
    <GuideLayout slug="gunpla-grades-explained" index="01" toc={TOC}>
      <h2 id="what-is-a-grade">What a grade means</h2>
      <p>
        Gunpla — Gundam plastic models — are sold in product lines called <strong>grades</strong>. The grade
        printed on the box tells you roughly how big the finished model will be, how much detail it has and
        how long it will take to build. It does not tell you which kit is “better”: a well-designed High
        Grade can be more enjoyable than an older, more complex kit.
      </p>
      <p>
        Most grades sit at a fixed <strong>scale</strong>, written as a ratio such as 1/144. The bigger the
        second number, the smaller the model. Grade and scale are related but separate: two 1/144 kits from
        different grades can feel very different to build.
      </p>
      <p>
        Treat everything below as a general guide. Kits released years apart within the same grade can
        differ a lot in engineering, part count and articulation, and special versions (for example “Ver.”
        releases or re-issues) may change the design further.
      </p>

      <h2 id="grade-eg">EG — Entry Grade</h2>
      <p>
        Entry Grade kits are designed to be the simplest way into the hobby. They are usually 1/144 scale,
        have relatively few parts and use colour-moulded plastic so the model looks finished without paint.
        Many are designed so parts can be removed from the frame by hand, although a pair of hobby nippers
        still gives a cleaner result.
      </p>
      <p>
        <strong>Good for:</strong> a first build, a quick evening project, or building alongside a child
        (EG kits contain small parts, so adult supervision matters).
      </p>

      <h2 id="grade-hg">HG — High Grade</h2>
      <p>
        High Grade is the largest and most varied line, and the most common starting point. Kits are 1/144
        scale and cover designs from almost every Gundam series. You will often see sub-labels on the box,
        such as HGUC (Universal Century designs) or HGCE (Cosmic Era / SEED designs) — these describe the
        series a kit belongs to, not a different difficulty.
      </p>
      <p>
        <strong>Good for:</strong> almost everyone. Pick a design you love and an HG is a safe first or
        second kit.
      </p>

      <h2 id="grade-rg">RG — Real Grade</h2>
      <p>
        Real Grade kits stay at 1/144 but aim for much higher detail — closer to what you would expect from a
        larger kit. That usually means many more, smaller parts, finer colour separation and more complex
        joints. Some RG kits include a pre-assembled or detailed inner frame.
      </p>
      <p>
        <strong>Good for:</strong> builders who already have a kit or two finished and enjoy patient,
        detailed work. Small parts reward a steady hand and good tweezers.
      </p>

      <h2 id="grade-mg">MG — Master Grade</h2>
      <p>
        Master Grade kits are 1/100 scale, so the finished model is noticeably larger than a 1/144 kit. Most
        modern MG kits are built around an internal frame that the outer armour attaches to, which gives a
        satisfying, mechanical build. You may also see MGEX, a premium variation of the line.
      </p>
      <p>
        <strong>Good for:</strong> a confident beginner ready for a longer project, or anyone who wants more
        presence on the shelf. Expect a build spread over several sessions.
      </p>

      <h2 id="grade-pg">PG — Perfect Grade</h2>
      <p>
        Perfect Grade kits are 1/60 scale — the largest regular grade — with extensive internal detail and
        a high part count. They are released less often and generally cost more. Some releases support
        optional lighting units, sold separately. Newer kits may be labelled PG Unleashed.
      </p>
      <p>
        <strong>Good for:</strong> experienced builders looking for a centrepiece project. It is not
        usually recommended as a first kit.
      </p>

      <h2 id="grade-sd">SD — Super Deformed</h2>
      <p>
        SD kits present mobile suits in a cute, compact style with big heads and short bodies. SD is a
        <em> style </em>rather than a scale, so there is no fixed ratio. Several SD lines exist — such as
        SD Gundam Cross Silhouette and SD Gundam EX-Standard — and they vary from very simple to quite
        involved.
      </p>
      <p>
        <strong>Good for:</strong> quick builds, desk displays and anyone who prefers a playful look.
      </p>

      <h2 id="grade-other">Full Mechanics and other lines</h2>
      <p>
        Not every kit fits the main grades. <strong>Full Mechanics</strong> kits are 1/100 scale and focus on
        exterior detail without a full inner frame. <strong>RE/100</strong> is another 1/100 line, often
        featuring designs that have not received a Master Grade. There are also non-grade releases and
        series-specific kits. Check the box for the scale and read the parts preview to judge difficulty.
      </p>

      <h2 id="comparison">Quick comparison</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-charcoal">
              <th className="py-2 pr-4 font-display">Grade</th>
              <th className="py-2 pr-4 font-display">Usual scale</th>
              <th className="py-2 pr-4 font-display">Typical difficulty</th>
              <th className="py-2 font-display">Best for</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([g, s, d, b]) => (
              <tr key={g} className="border-b border-border text-muted-foreground">
                <td className="py-2.5 pr-4 font-semibold text-foreground">{g}</td>
                <td className="py-2.5 pr-4">{s}</td>
                <td className="py-2.5 pr-4">{d}</td>
                <td className="py-2.5">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Difficulty is a general tendency only — individual kits vary.</p>

      <h2 id="choosing">Which grade should you choose?</h2>
      <ul>
        <li>
          <strong>Never built a model kit?</strong> Start with an EG or an HG of a design you like.
        </li>
        <li>
          <strong>Finished one or two HGs?</strong> Try an RG for detail or an MG for size.
        </li>
        <li>
          <strong>Want a long, rewarding project?</strong> A PG is a big step — build a few MGs first.
        </li>
        <li>
          <strong>Short on time or space?</strong> SD kits are quick and compact.
        </li>
      </ul>
      <p>
        Whatever you choose, a few basic tools make a big difference — see{" "}
        <Link to="/guides/essential-gunpla-tools">Essential Tools for Your First Gunpla Build</Link>, then
        follow <Link to="/guides/how-to-build-your-first-gundam">How to Build Your First Gundam Model Kit</Link>.
        When you are ready, browse the <Link to="/gundam" search={{ sort: "featured" }}>Gundam kits</Link>{" "}
        currently listed in our catalogue.
      </p>
    </GuideLayout>
  );
}
