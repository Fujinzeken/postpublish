import { Reveal } from "./reveal";

/*
  Section four: proof.

  Placed before pricing on purpose. Proof is what makes someone willing to look at
  a number, so it belongs on the approach to the price rather than after it.

  Structurally it is a lead quote plus a supporting pair, not a row of three equal
  quote cards. One quote is set large enough to be a typographic moment and carries
  the strongest claim; the other two sit underneath at body scale behind hairlines.
  No boxes at all, which is what keeps this from reading as another card grid.
*/

/*
  PLACEHOLDER TESTIMONIALS. THESE MUST NOT SHIP.

  Every name, role and company below is invented, and so is every quote. Unlike the
  prices, which came from the live plan table, there is no honest source for these:
  a named person endorsing a product they have never used is fabricated social
  proof, and it is the one thing on this page that would be a real problem rather
  than a rough edge.

  Replace with real quotes and real attribution, or delete this section and drop
  <Testimonials /> from app/page.tsx. A page with no testimonials is fine. A page
  with invented ones is not.

  Keep the shape when replacing: lead quote no more than three lines, supporting
  quotes no more than two, attribution as name plus role plus company.
*/
const LEAD = {
  quote:
    "We were running four tabs and a spreadsheet every Monday. Now the whole week goes in at once and I only open PostPublish to answer people.",
  name: "Marta Kowalczyk",
  role: "Head of Social",
  company: "Volanta",
};

const SUPPORTING = [
  {
    quote:
      "The drafted replies actually sound like us. I edit maybe one in five before it goes out.",
    name: "Dilnoza Rahimova",
    role: "Marketing Lead",
    company: "Studio Karavan",
  },
  {
    quote:
      "Approvals were what sold my client. Nothing reaches their audience they have not seen first.",
    name: "Tom Vandenberg",
    role: "Founder",
    company: "Bright Harbour",
  },
];

function Attribution({
  name,
  role,
  company,
}: {
  name: string;
  role: string;
  company: string;
}) {
  return (
    <footer className="mt-5 text-[14px] leading-6">
      <span className="font-medium text-foreground">{name}</span>
      <span className="text-muted-foreground">
        {", "}
        {role}, {company}
      </span>
    </footer>
  );
}

export function Testimonials() {
  return (
    <section className="border-b border-border bg-background py-20 sm:py-24 lg:py-28">
      <div className="container-wide">
        <Reveal className="max-w-2xl">
          <h2 className="type-section text-foreground">
            Teams that stopped juggling tabs.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          {/* The lead quote is set at sub scale rather than body scale, so the
              section has one thing in it that carries weight on its own. */}
          <blockquote className="mt-12 max-w-3xl sm:mt-14">
            {/* Kept at the display weight type-sub carries. A lighter setting was
                tried and lost the contrast against the muted pair below it. */}
            <p className="type-sub text-[1.375rem] leading-[1.45] tracking-[-0.014em] text-balance text-foreground sm:text-[1.625rem] sm:leading-[1.42]">
              &ldquo;{LEAD.quote}&rdquo;
            </p>
            <Attribution
              name={LEAD.name}
              role={LEAD.role}
              company={LEAD.company}
            />
          </blockquote>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 sm:mt-16 sm:grid-cols-2">
          {SUPPORTING.map((item, i) => (
            <Reveal key={item.name} delay={0.05 * i}>
              <blockquote className="border-t border-border pt-6">
                <p className="type-body text-[15px] leading-7 text-muted-foreground sm:text-base">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <Attribution
                  name={item.name}
                  role={item.role}
                  company={item.company}
                />
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
