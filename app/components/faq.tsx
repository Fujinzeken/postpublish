import { Plus } from "lucide-react";
import { Reveal } from "./reveal";

/*
  Section six: FAQ.

  Placed after pricing, because the questions people actually have at this point are
  about the price and the terms they just read.

  Built on native details and summary. That gives disclosure, keyboard operation,
  screen reader semantics and browser find-in-page for free, all of which a
  div-and-state accordion has to reimplement and usually gets wrong. The height
  transition lives in globals.css.

  A single column at reading measure, which is a layout family this page has not
  used: every other section is a split, a grid or a staged centrepiece.
*/

/*
  Every answer here restates something the page already claims: the six networks,
  the free plan, managed channels, replies held for review, add-ons for overages.
  Nothing invents policy.

  The two worth checking against the real product before launch are the trial
  length and the downgrade behaviour, since those are commercial terms rather than
  product facts.
*/
const FAQS = [
  {
    q: "Which networks can PostPublish publish to?",
    a: "Instagram, X, LinkedIn, Facebook, Threads and Telegram. Every plan reaches all six, including Free.",
  },
  {
    q: "Do I need a card to start?",
    a: "No. The Free plan stays free, and you can move to a paid plan whenever you need more channels or seats.",
  },
  {
    q: "What is a managed channel?",
    a: "It hands one connected account to a teammate as its dedicated manager, so they own that channel without getting access to the rest. Free includes none, Starter includes one, Pro five and Agency twenty five.",
  },
  {
    q: "Do the drafted replies send themselves?",
    a: "No. PostPublish writes the draft from how you have replied before and leaves it for you, and anything it reads as sensitive is held for review rather than queued.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrade, downgrade or cancel from your settings at any time.",
  },
  {
    q: "What happens if I outgrow a limit?",
    a: "Extra managed channels, seats and posts are available as add-ons on every paid plan, so you can scale one axis without moving up a whole tier.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="border-b border-border bg-surface-subtle py-20 sm:py-24 lg:py-28"
    >
      <div className="container-wide">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="type-section text-foreground">
            Questions worth asking first.
          </h2>
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={0.03 * i}>
              {/*
                One rule per item, on the top edge only. A border above and below
                every row is the pattern that makes a list look like a spec sheet;
                the group gets a closing rule at the end instead.
              */}
              <details className="group border-t border-border">
                <summary
                  className={
                    "flex items-start justify-between gap-6 py-5 " +
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  }
                >
                  <h3 className="type-sub text-[1.0625rem] text-foreground sm:text-[1.125rem]">
                    {item.q}
                  </h3>
                  {/* Rotates to a minus when open, so the control states what it
                      will do next rather than what it already did. */}
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[0.5rem] bg-surface-muted text-muted-foreground transition-[transform,background-color,color] duration-300 ease-out group-hover:bg-accent-tint group-hover:text-accent group-open:rotate-45"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                  </span>
                </summary>
                <p className="type-body max-w-[60ch] pr-10 pb-6 text-[15px] leading-7 text-muted-foreground">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
