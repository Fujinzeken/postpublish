import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "./reveal";

/*
  Section four: pricing.

  Two things drive this structure.

  Rows are label plus value, not a list of ticks. A tick list makes four plans read
  as four undifferentiated lists; what a buyer actually scans for is where the plans
  differ, so every row names its axis and gives this plan's number on it. The same
  axes appear in the same order down every column, which is what makes the columns
  comparable by eye without a separate comparison table.

  Pro breaks out of the shared frame instead of being tinted inside it. Elevation
  and a taller box do the recommending, so the tint can stay quiet and the other
  three plans never have to be greyed down to make one look chosen.

  No billing toggle: the real price list is monthly only, and inventing an annual
  column would have meant inventing numbers.
*/

/*
  Prices and limits are the client's own, taken from the live Aether plan table.
  The two badges are the client's own claims as well, which is why "Most popular"
  is used here where an invented one would not be.
*/
type Row = { label: string; value: string };

type Plan = {
  name: string;
  tagline: string;
  price: number;
  badge?: string;
  rows: Row[];
  extras?: string[];
  cta: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    tagline: "Try the workflow with light limits.",
    price: 0,
    cta: "Get started",
    rows: [
      { label: "User seats", value: "1" },
      { label: "Connected channels", value: "3" },
      { label: "Managed channels", value: "None" },
      { label: "Scheduled posts", value: "10 / month" },
      { label: "Asset library", value: "25 images" },
      { label: "Analytics", value: "Basic" },
      { label: "Tracking links", value: "5" },
    ],
  },
  {
    name: "Starter",
    tagline: "Minimal package for solo operators.",
    price: 15,
    badge: "Best for 1 user",
    cta: "Start free trial",
    rows: [
      { label: "User seats", value: "1" },
      { label: "Connected channels", value: "5" },
      { label: "Managed channels", value: "1" },
      { label: "Scheduled posts", value: "Unlimited" },
      { label: "Asset library", value: "150 + search" },
      { label: "Reply drafts", value: "500 / month" },
      { label: "Tracking links", value: "25" },
    ],
  },
  {
    name: "Pro",
    tagline: "For small teams shipping every week.",
    price: 45,
    badge: "Most popular",
    featured: true,
    cta: "Start free trial",
    rows: [
      { label: "User seats", value: "3" },
      { label: "Connected channels", value: "Unlimited" },
      { label: "Managed channels", value: "5" },
      { label: "Scheduled posts", value: "Unlimited" },
      { label: "Asset library", value: "2,000" },
      { label: "Reply drafts", value: "5,000 / month" },
      { label: "Tracking links", value: "Unlimited" },
    ],
    extras: ["CRM and campaign analytics", "14 day free trial"],
  },
  {
    name: "Agency",
    tagline: "Multi-client workspaces and reporting.",
    price: 129,
    cta: "Start free trial",
    rows: [
      { label: "User seats", value: "10" },
      { label: "Connected channels", value: "Unlimited" },
      { label: "Managed channels", value: "25" },
      { label: "Scheduled posts", value: "Unlimited" },
      { label: "Asset library", value: "Unlimited" },
      { label: "Client accounts", value: "Up to 50" },
      { label: "Tracking links", value: "Unlimited" },
    ],
    extras: ["White label reports", "Team approvals", "API access", "Priority support"],
  },
];

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function PlanColumn({ plan }: { plan: Plan }) {
  const featured = plan.featured;

  return (
    <article
      className={
        featured
          ? "relative z-10 flex flex-col rounded-[1.35rem] border border-[#f0c4b6] bg-[linear-gradient(168deg,#fffaf8_0%,#fdeae1_100%)] p-7 shadow-[0_28px_64px_-30px_rgba(120,50,28,0.45)] xl:-mt-5 xl:pb-9"
          : "relative flex flex-col rounded-[1.35rem] border border-border bg-background p-7"
      }
    >
      <div className="flex min-h-7 items-center gap-2.5">
        <h3 className="type-sub text-[1.125rem] text-foreground">{plan.name}</h3>
        {plan.badge && (
          <span
            className={`rounded-[0.6rem] px-2 py-0.5 text-[11.5px] font-medium ${
              featured
                ? "bg-white/85 text-[#9a3412] ring-1 ring-white ring-inset"
                : "bg-surface-muted text-muted-foreground"
            }`}
          >
            {plan.badge}
          </span>
        )}
      </div>

      <p
        className={`type-body mt-2 text-[13.5px] leading-5 ${featured ? "text-[#7c4a38]" : "text-muted-foreground"}`}
      >
        {plan.tagline}
      </p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="tabular font-display text-[2.75rem] leading-none font-semibold tracking-[-0.036em] text-foreground">
          ${plan.price}
        </span>
        <span
          className={`text-[14px] ${featured ? "text-[#9a6a55]" : "text-muted-foreground"}`}
        >
          /mo
        </span>
      </div>

      <Link
        href="/sign-up"
        className={
          featured
            ? `${FOCUS} mt-6 inline-flex h-11 items-center justify-center rounded-md bg-accent-strong px-5 text-[14.5px] font-medium text-white shadow-[0_1px_2px_rgba(88,40,24,0.3),0_10px_26px_-10px_rgba(220,74,40,0.6)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-accent-hover active:scale-[0.97]`
            : `${FOCUS} mt-6 inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-5 text-[14.5px] font-medium text-foreground transition-[background-color,border-color,transform] duration-200 ease-out hover:border-stone-300 hover:bg-surface-subtle active:scale-[0.97]`
        }
      >
        {plan.cta}
      </Link>

      {/*
        The axes, in the same order in every column. No rule under each row: a
        hairline per row is the laziest possible spec sheet and it fights the
        column dividers this grid already has.
      */}
      <dl className="mt-7 flex flex-col gap-2.5">
        {plan.rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-3">
            <dt
              className={`text-[13px] ${featured ? "text-[#8a5a46]" : "text-muted-foreground"}`}
            >
              {row.label}
            </dt>
            <dd className="tabular text-right text-[13px] font-medium text-foreground">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {plan.extras && (
        <ul className="mt-5 flex flex-col gap-2">
          {plan.extras.map((extra) => (
            <li key={extra} className="flex gap-2">
              <Check
                className="mt-[3px] h-3.5 w-3.5 shrink-0 text-accent"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              <span className="text-[13px] leading-5 text-foreground">
                {extra}
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="border-b border-border bg-surface-subtle py-20 sm:py-24 lg:py-28"
    >
      <div className="container-wide">
        <Reveal className="max-w-2xl">
          <h2 className="type-section text-foreground">
            Four plans, no surprises.
          </h2>
          <p className="type-body mt-5 text-base leading-7 text-muted-foreground sm:text-[17px]">
            Every plan reaches all eight networks. Upgrade, downgrade or cancel
            from your settings.
          </p>
        </Reveal>
      </div>

      {/* Wider than the page measure, the way the week surface is: four columns
          need the room, and the bleed is already part of this page's rhythm. */}
      <div className="mx-auto mt-12 w-full max-w-[84rem] px-5 sm:mt-14 sm:px-8">
        {/* items-start so the featured column's negative margin lifts it clear of
            the row instead of stretching its neighbours to match. */}
        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan) => (
            <PlanColumn key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/*
            One sentence replaces the four repeated explanation boxes the current
            plan table carries. It is the same information, said once, where it
            applies to all four columns.
          */}
          <p className="type-body max-w-2xl text-[13.5px] leading-6 text-muted-foreground">
            A managed channel hands one connected account to a teammate as its
            dedicated manager. Extra managed channels, seats and posts are
            available as add-ons on every paid plan.
          </p>
          <Link
            href="/pricing"
            className={`group inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-foreground transition-colors duration-200 ease-out hover:text-accent ${FOCUS}`}
          >
            Compare every limit
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
