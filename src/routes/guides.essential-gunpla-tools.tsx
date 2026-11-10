import { createFileRoute, Link } from "@tanstack/react-router";
import { GuideLayout } from "@/components/guides/GuideLayout";
import { guideHead } from "@/content/guides";

export const Route = createFileRoute("/guides/essential-gunpla-tools")({
  head: () => guideHead("essential-gunpla-tools"),
  component: ToolsGuide,
});

const TOC = [
  { id: "short-list", label: "The short list" },
  { id: "nippers", label: "Nippers" },
  { id: "hobby-knife", label: "Hobby knife & safety" },
  { id: "sanding", label: "Sanding sticks" },
  { id: "tweezers", label: "Tweezers" },
  { id: "panel-lining", label: "Panel lining basics" },
  { id: "workspace", label: "Your workspace" },
];

function ToolsGuide() {
  return (
    <GuideLayout slug="essential-gunpla-tools" index="02" toc={TOC}>
      <h2 id="short-list">The short list</h2>
      <p>
        Gunpla snaps together without glue, so you do not need a large tool kit. For a first build, these
        five things cover almost everything:
      </p>
      <ol>
        <li>A pair of hobby nippers (side cutters)</li>
        <li>A hobby knife with spare blades, plus a cutting mat</li>
        <li>Sanding sticks or files in a few grits</li>
        <li>Fine tweezers</li>
        <li>A fine-tip panel lining marker (optional, but satisfying)</li>
      </ol>
      <p>Add more only when you find a job these cannot do.</p>

      <h2 id="nippers">Nippers</h2>
      <p>
        Nippers cut parts away from the plastic frame, called the <strong>runner</strong> (or sprue). They are
        the one tool worth buying before anything else — scissors, nail clippers and twisting parts off by
        hand tend to leave white stress marks and gouges.
      </p>
      <ul>
        <li>
          <strong>Use a two-step cut.</strong> First cut a little away from the part, leaving a small stub.
          Then make a second, careful cut flush with the part. This avoids stress marks.
        </li>
        <li>
          <strong>Keep the flat side toward the part</strong> on the second cut for the cleanest surface.
        </li>
        <li>
          <strong>Plastic only.</strong> Cutting wire or metal will damage fine hobby blades. Single-blade
          “ultimate” style nippers are especially delicate.
        </li>
      </ul>

      <h2 id="hobby-knife">Hobby knife and safety</h2>
      <p>
        A sharp hobby knife shaves away the small leftover bump — the <strong>nub</strong> — after cutting.
        Used gently, it gives a smooth finish quickly. It is also the tool most likely to cause an injury, so
        build good habits from the start:
      </p>
      <ul>
        <li>Always cut or scrape <strong>away from your body</strong> and away from the hand holding the part.</li>
        <li>Work on a cutting mat, not on your lap or a table you care about.</li>
        <li>Use light scraping strokes; let the blade do the work rather than pushing hard.</li>
        <li>Replace dull blades — a dull blade slips. Dispose of old blades in a closed container.</li>
        <li>Cap or retract the blade whenever you put the knife down.</li>
        <li>Keep knives and small parts out of reach of young children and pets.</li>
      </ul>

      <h2 id="sanding">Sanding sticks</h2>
      <p>
        Sanding smooths any nub marks the knife leaves. Sanding sticks or sponge-backed pads are easier to
        control than loose paper. Grit numbers describe coarseness: lower is rougher.
      </p>
      <ul>
        <li>Start around <strong>400</strong> to level the nub.</li>
        <li>Move to <strong>600–800</strong> to remove scratches from the first pass.</li>
        <li>Finish with <strong>1000 or finer</strong> for a smooth surface.</li>
      </ul>
      <p>
        Sanding can leave a slightly dull patch on coloured plastic. Many builders accept this, or even it
        out later with a matte topcoat. Sand only where you need to, and keep sharp edges crisp.
      </p>

      <h2 id="tweezers">Tweezers</h2>
      <p>
        Fine tweezers make stickers, water-slide decals and tiny parts much easier to handle. Pointed tips
        are good for placing stickers; angled tips help with small parts. Lift stickers by one edge, align
        them, then press down with a cotton bud or the back of the tweezers.
      </p>

      <h2 id="panel-lining">Panel lining basics</h2>
      <p>
        Panel lining adds dark lines to the engraved recesses on armour, making detail stand out. It is the
        easiest upgrade for a first kit.
      </p>
      <h3>Markers — the easy start</h3>
      <p>
        Fine-tip or brush-tip panel lining markers let you trace the lines directly. Wipe away any mistakes
        with a cotton bud or a plastic-safe eraser before they dry.
      </p>
      <h3>Washes — the next step</h3>
      <p>
        Thin washes flow into recesses on their own. Some are enamel-based, and enamel thinner can make
        certain plastics brittle, especially on joints and parts under tension. Test on a spare runner first,
        use small amounts, avoid moving joints, and work with good ventilation. Always read the product’s own
        safety instructions.
      </p>
      <p>
        Colour tip: dark grey usually looks more natural than pure black on white or light parts.
      </p>

      <h2 id="workspace">Your workspace</h2>
      <ul>
        <li>Good light — a desk lamp makes small parts far easier to see.</li>
        <li>A small tray or container so parts do not roll away.</li>
        <li>A bag for runner scraps, so you can clean up quickly.</li>
      </ul>
      <p>
        Next, put these tools to work with{" "}
        <Link to="/guides/how-to-build-your-first-gundam">How to Build Your First Gundam Model Kit</Link>, or
        check which grade suits you in{" "}
        <Link to="/guides/gunpla-grades-explained">Gunpla Grades Explained</Link>. You can also browse the{" "}
        <Link to="/shop/$category" params={{ category: "hobby-supplies" }} search={{ sort: "featured" }}>
          hobby supplies
        </Link>{" "}
        listed in our catalogue.
      </p>
    </GuideLayout>
  );
}
