import { AppAuthLink } from "./app-auth-link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import {
  AdaptDiagram,
  ConnectDiagram,
  ReplyDiagram,
} from "./step-diagrams";

/*
  Section three: how it works.

  Split-screen scroll. The left column is a sticky anchor carrying the section's
  message and the one signup CTA; the right column scrolls three panels past it.
  That is a third layout family, after the hero's asymmetric split and the queue
  section's single staged centrepiece.

  Each panel is a diagram built from the page's own tile, not photography. The
  three shapes read as a sequence on their own: accounts resolve to connected, one
  draft becomes three native formats, many threads converge on one inbox.

  No numbers and no "Step 1" labels. The verb headings are the labels and the order
  on the page is the sequence.
*/

const STEPS = [
  {
    title: "Connect your accounts",
    body: "Sign in to each network once. PostPublish keeps the tokens fresh, so you are not reconnecting every few weeks.",
    diagram: <ConnectDiagram />,
  },
  {
    title: "Fill the queue once",
    body: "Draft in one editor and pick the networks. PostPublish rebuilds the post in each one's native format and picks the timing.",
    diagram: <AdaptDiagram />,
  },
  {
    title: "Reply from one inbox",
    body: "Comments and DMs from every network arrive in one list, each with a drafted answer ready to send or edit.",
    diagram: <ReplyDiagram />,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-b border-border bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky anchor. Stacks above the panels on small screens, where sticky
              would otherwise pin a full-height block over the content. */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h2 className="type-section text-foreground">
                  Set it up once, then it runs.
                </h2>
                <p className="type-body mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-[17px]">
                  Connect your accounts, fill the queue, and handle everything
                  that comes back from one place.
                </p>
                <AppAuthLink
                  className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent-strong px-6 text-[15px] font-medium whitespace-nowrap text-white shadow-[0_1px_2px_rgba(88,40,24,0.28),0_8px_24px_-8px_rgba(220,74,40,0.55)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-accent-hover hover:shadow-[0_1px_2px_rgba(88,40,24,0.3),0_12px_30px_-8px_rgba(220,74,40,0.6)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Start free trial
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </AppAuthLink>
              </Reveal>
            </div>
          </div>

          <div className="flex flex-col gap-14 sm:gap-16 lg:col-span-7">
            {STEPS.map((step) => (
              <article key={step.title}>
                {step.diagram}
                <h3 className="type-sub mt-6 text-foreground">{step.title}</h3>
                <p className="type-body mt-2.5 max-w-lg text-[15px] leading-7 text-muted-foreground sm:text-base">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
