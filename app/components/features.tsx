import { Reveal } from "./reveal";
import { WeekPlane } from "./week-plane";

/*
  Section two: the queue.

  Deliberately not a bento of equal cards. There is one moment here, the week as a
  physical surface, and it gets a stage of its own: a warm accent panel that is the
  only saturated ground on the page. The page is otherwise near-white throughout,
  so the cards had nothing to sit against and the whole section read pale on pale.
  The panel gives them a ground, lets their shadows register, and gives the page a
  single point of colour without leaving the light palette the brief asked for.

  The three supporting capabilities sit underneath as plain hairline-divided text
  with no card boxes, because they are support and should not compete with the
  centrepiece. That also keeps this section a different layout family from the
  hero's asymmetric split.
*/

const SUPPORT = [
  {
    title: "Replies that sound like you",
    body: "Drafts answers to comments and DMs from how you have replied before, and holds anything sensitive for review.",
  },
  {
    title: "Approvals before anything ships",
    body: "Send posts to a client or a teammate. Nothing goes live until someone signs off.",
  },
  {
    title: "Proof that it worked",
    body: "Every link is tracked, so you see signups by post and by network instead of guessing from likes.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="border-b border-border bg-surface-subtle py-20 sm:py-24 lg:py-28"
    >
      <div className="container-wide">
        <Reveal>
          {/* The stage. Cropped at the bottom so the surface runs out of frame
              rather than terminating inside the panel. */}
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(158deg,#fff7f4_0%,#fdeae1_46%,#f9d3c3_100%)] px-6 pt-12 sm:rounded-[2rem] sm:px-10 sm:pt-14 lg:px-14 lg:pt-16">
            {/* Soft light from the top right, so the panel is lit rather than a
                flat wash of colour. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(48%_58%_at_82%_6%,rgba(255,255,255,0.85),transparent_68%)]"
            />

            <div className="relative max-w-2xl">
              <h2 className="type-section text-foreground">
                See the whole week at once.
              </h2>
              <p className="type-body mt-5 text-base leading-7 text-[#7c4a38] sm:text-[17px]">
                Every scheduled post across every account on one timeline, so you
                catch gaps and pile-ups before they publish.
              </p>
            </div>

            {/* Pulled up into the header's space and wider than the panel, so the
                surface reads as bigger than its frame. The negative bottom crops
                the near field, which the surface mask has already faded to
                nothing, so the panel does not end on a band of empty colour. */}
            <div className="relative -mx-4 -mt-2 -mb-8 sm:-mx-16 sm:-mt-10 sm:-mb-28 lg:-mx-24 lg:-mt-16 lg:-mb-36">
              <WeekPlane />
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 sm:mt-16 sm:grid-cols-3">
          {SUPPORT.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i}>
              {/* The rule above each item thickens and warms as the group is
                  approached, which is the whole hover treatment these need: they
                  are text, not controls, so nothing should lift or scale. */}
              <div className="group border-t border-border pt-5 transition-colors duration-300 ease-out hover:border-[#e8b9a8]">
                <h3 className="type-sub text-[1.0625rem] text-foreground">
                  {item.title}
                </h3>
                <p className="type-body mt-2 text-[15px] leading-7 text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
