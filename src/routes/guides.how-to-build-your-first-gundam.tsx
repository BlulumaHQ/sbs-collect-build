import { createFileRoute, Link } from "@tanstack/react-router";
import { GuideLayout } from "@/components/guides/GuideLayout";
import { guideHead } from "@/content/guides";

export const Route = createFileRoute("/guides/how-to-build-your-first-gundam")({
  head: () => guideHead("how-to-build-your-first-gundam"),
  component: FirstBuildGuide,
});

const TOC = [
  { id: "before-you-start", label: "Before you start" },
  { id: "manual", label: "1. Read the manual" },
  { id: "runners", label: "2. Find parts on the runners" },
  { id: "clipping", label: "3. Clip parts cleanly" },
  { id: "cleanup", label: "4. Clean up nubs" },
  { id: "assembly", label: "5. Assemble step by step" },
  { id: "stickers", label: "6. Stickers and decals" },
  { id: "finishing", label: "7. Simple finishing" },
  { id: "troubleshooting", label: "Common problems" },
];

function FirstBuildGuide() {
  return (
    <GuideLayout slug="how-to-build-your-first-gundam" index="03" toc={TOC}>
      <h2 id="before-you-start">Before you start</h2>
      <p>
        A first build is about learning the process, not perfection. Choose a kit you are excited about — an
        Entry Grade or High Grade is ideal (see <Link to="/guides/gunpla-grades-explained">Gunpla Grades
        Explained</Link>) — and set up a clear, well-lit table. You will want nippers, a hobby knife and a
        cutting mat at minimum; the <Link to="/guides/essential-gunpla-tools">tools guide</Link> explains each.
      </p>
      <p>Plan for more than one session. Stopping between body sections keeps the build relaxed.</p>

      <h2 id="manual">1. Read the manual</h2>
      <p>
        Open the instruction manual before cutting anything. Gunpla manuals are mostly pictures, so learn the
        symbols on the first pages: they show actions such as cutting, which side faces out, parts to keep
        as spares and where stickers go. Each step shows the parts you need using a code like{" "}
        <strong>A1-12</strong>, meaning runner A1, part 12.
      </p>
      <p>
        Every kit is different. If anything in this guide disagrees with your kit’s own manual, follow the
        manual.
      </p>

      <h2 id="runners">2. Find parts on the runners</h2>
      <p>
        Parts come attached to plastic frames called <strong>runners</strong>. Each runner has a letter
        (and sometimes a number) moulded onto a tag, and each part has a small number next to it. Lay the
        runners out and match their letters against the parts list at the start of the manual.
      </p>
      <ul>
        <li>Only cut parts for the step you are on — loose parts are easy to mix up or lose.</li>
        <li>Mirrored left and right parts often look alike; check the number twice.</li>
      </ul>

      <h2 id="clipping">3. Clip parts cleanly</h2>
      <p>
        Use the <strong>two-step cut</strong>: cut a little away from the part first, then trim the remaining
        stub close to the surface with a second cut. Cutting directly against the part in one go can leave
        white stress marks or a dent.
      </p>

      <h2 id="cleanup">4. Clean up nubs</h2>
      <p>
        A small bump, or <strong>nub</strong>, usually remains where the part was attached. Shave it level
        with light strokes of a hobby knife, always cutting away from yourself, then smooth it with sanding
        sticks if you want a cleaner finish. Many builders tidy only the nubs that will be visible.
      </p>

      <h2 id="assembly">5. Assemble step by step</h2>
      <ul>
        <li>
          <strong>Follow the manual’s order.</strong> Later steps often depend on earlier parts being in place.
        </li>
        <li>
          <strong>Test-fit before pressing hard.</strong> Line up pegs with holes and press evenly. If a part
          will not close, check its orientation rather than forcing it.
        </li>
        <li>
          <strong>Watch the small details.</strong> Some steps ask you to insert a part before closing two
          halves, or to fit a joint in a specific direction.
        </li>
        <li>
          <strong>Separating parts:</strong> if you need to undo a mistake, gently lever along the seam with a
          dedicated part separator or a flat plastic tool rather than a knife.
        </li>
      </ul>
      <p>
        Most kits build in sections — head, torso, arms, legs, then weapons and accessories — before
        bringing everything together.
      </p>

      <h2 id="stickers">6. Stickers and decals</h2>
      <p>
        Many kits include stickers (sometimes called seals) for small colour details or eyes. Lift them with
        tweezers, line them up and press down from the centre outward. Water-slide decals, where included,
        need water and more patience; follow the kit’s instructions.
      </p>

      <h2 id="finishing">7. Simple finishing</h2>
      <p>You do not need paint for a great-looking first kit. Two easy upgrades:</p>
      <ul>
        <li>
          <strong>Panel lining</strong> with a fine marker makes engraved detail stand out (see the{" "}
          <Link to="/guides/essential-gunpla-tools">tools guide</Link>).
        </li>
        <li>
          <strong>A topcoat</strong> — usually a matte spray — evens out sanding marks and hides sticker
          edges. Spray in a well-ventilated area, follow the can’s safety directions and apply light coats.
        </li>
      </ul>

      <h2 id="troubleshooting">Common first-build problems</h2>
      <ul>
        <li>
          <strong>White marks on plastic:</strong> usually from cutting too close in one go — use the two-step
          cut next time. Light sanding and a topcoat can reduce them.
        </li>
        <li>
          <strong>A loose joint:</strong> check the part is fully seated and facing the right way.
        </li>
        <li>
          <strong>A missing part:</strong> check the runner again and the floor around your desk. If it is
          truly missing or broken, the kit’s manufacturer may offer a parts service — see the manual.
        </li>
      </ul>
      <p>
        Finished? Browse the <Link to="/gundam" search={{ sort: "featured" }}>Gundam kits</Link> listed in our
        catalogue for your next build, or <Link to="/contact">contact the shop</Link> with questions.
      </p>
    </GuideLayout>
  );
}
