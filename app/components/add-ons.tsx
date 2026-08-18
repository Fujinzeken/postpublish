"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AppAuthLink } from "./app-auth-link";
import { Reveal } from "./reveal";

/*
  Add-ons, directly under pricing.

  A configurator rather than another grid of cards. The plan pills re-price every
  add-on at once, the steppers build a basket, and the line underneath resolves to a
  number. That is the whole argument of the section: the rate for an extra seat
  depends on the package you are already on, which is invisible in a static price
  list and obvious the moment you switch plans with a quantity set.

  Rows, not cards. Each add-on is a label, a rate, a control and a line total, which
  is the same label-plus-value shape the plan columns above already use, and it
  keeps four items readable instead of four boxes competing for attention.

  The total does not animate. Steppers get pressed repeatedly, and a number that
  slides on every press turns a fast interaction into a slow one. Tabular figures
  stop it jittering instead, which is the part that actually bothered the eye.
*/

const PLANS = ["Free", "Starter", "Pro", "Agency"] as const;
type PlanKey = (typeof PLANS)[number];

/** Base prices, matching the plan columns above. */
const PLAN_PRICE: Record<PlanKey, number> = {
  Free: 0,
  Starter: 15,
  Pro: 45,
  Agency: 129,
};

/*
  Rates are the client's own, from the live add-on table. They fall as the base
  package rises, which is why the selected plan drives every figure on screen.
*/
type AddOn = {
  id: string;
  name: string;
  description: string;
  rates: Record<PlanKey, number>;
};

const ADD_ONS: AddOn[] = [
  {
    id: "seat",
    name: "Extra user seat",
    description: "Add one teammate beyond your package seat limit.",
    rates: { Free: 18, Starter: 15, Pro: 12, Agency: 9 },
  },
  {
    id: "posts-50",
    name: "50 extra posts / month",
    description: "Raise the monthly post allowance by 50.",
    rates: { Free: 14, Starter: 11, Pro: 9, Agency: 7 },
  },
  {
    id: "posts-200",
    name: "200 extra posts / month",
    description: "Raise the monthly post allowance by 200 for high volume teams.",
    rates: { Free: 36, Starter: 30, Pro: 25, Agency: 18 },
  },
  {
    id: "channel",
    name: "Extra managed channel",
    description:
      "Assign a teammate as manager for one more connected social account.",
    rates: { Free: 12, Starter: 10, Pro: 8, Agency: 6 },
  },
];

/** Guard so a held-down stepper cannot turn the estimate into nonsense. */
const MAX_QTY = 50;

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function Stepper({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
}) {
  /*
    44px on a phone, 36px from sm up. These are the most pressed controls on the
    page and a 36px square is under the comfortable tap target; on a pointer device
    that same size is fine and keeps the row compact.
  */
  const base =
    "flex h-11 w-11 items-center justify-center rounded-[0.55rem] border border-border bg-background text-foreground transition-[background-color,border-color,transform,opacity] duration-200 ease-out active:scale-[0.94] disabled:pointer-events-none disabled:opacity-35 sm:h-9 sm:w-9";

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value === 0}
        aria-label={`Remove one ${label}`}
        className={`${base} hover:border-stone-300 hover:bg-surface-subtle ${FOCUS}`}
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
      </button>

      {/*
        An output, not a div: it is a calculated value, and aria-live announces the
        new quantity without moving focus off the button being pressed.
      */}
      <output
        aria-live="polite"
        aria-label={`${label} quantity`}
        className="tabular w-8 text-center text-[15px] font-medium text-foreground"
      >
        {value}
      </output>

      <button
        type="button"
        onClick={() => onChange(Math.min(MAX_QTY, value + 1))}
        disabled={value === MAX_QTY}
        aria-label={`Add one ${label}`}
        className={`${base} hover:border-stone-300 hover:bg-surface-subtle ${FOCUS}`}
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
      </button>
    </div>
  );
}

export function AddOns() {
  const [plan, setPlan] = useState<PlanKey>("Pro");
  const [qty, setQty] = useState<Record<string, number>>({});

  const base = PLAN_PRICE[plan];
  const addOnTotal = ADD_ONS.reduce(
    (sum, item) => sum + (qty[item.id] ?? 0) * item.rates[plan],
    0,
  );
  const total = base + addOnTotal;
  const hasAddOns = addOnTotal > 0;

  return (
    <section
      id="add-ons"
      className="border-b border-border bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="container-wide">
        <Reveal>
          {/* The header splits because the right side carries a real control, not
              a second paragraph. */}
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="type-section text-foreground">
                Scale any plan with add-ons.
              </h2>
              <p className="type-body mt-5 text-base leading-7 text-muted-foreground sm:text-[17px]">
                Unit rates drop as your base package goes up. Pick a plan to see
                its rates, then add what you need.
              </p>
            </div>

            <div
              role="group"
              aria-label="Base plan"
              className="flex flex-wrap gap-2"
            >
              {PLANS.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setPlan(name)}
                  aria-pressed={plan === name}
                  className={`inline-flex h-10 items-center justify-center rounded-md px-4 text-[14px] font-medium transition-[background-color,color,border-color] duration-200 ease-out sm:h-9 ${FOCUS} ${
                    plan === name
                      ? "bg-foreground text-white"
                      : "border border-border bg-background text-muted-foreground hover:border-stone-300 hover:text-foreground"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="mt-10 sm:mt-12">
            {ADD_ONS.map((item) => {
              const count = qty[item.id] ?? 0;
              const rate = item.rates[plan];

              return (
                <li
                  key={item.id}
                  className="flex flex-col gap-4 border-t border-border py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                >
                  <div className="sm:max-w-md">
                    <h3 className="type-sub text-[1.0625rem] text-foreground">
                      {item.name}
                    </h3>
                    <p className="type-body mt-1 text-[14px] leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-5 sm:gap-7">
                    <p className="tabular w-[6.5rem] shrink-0 text-[15px] text-muted-foreground">
                      <span className="font-medium text-foreground">
                        ${rate}
                      </span>{" "}
                      /mo each
                    </p>

                    <Stepper
                      label={item.name}
                      value={count}
                      onChange={(next) =>
                        setQty((prev) => ({ ...prev, [item.id]: next }))
                      }
                    />

                    {/* Width reserved so a line total appearing never shifts the
                        row it belongs to. */}
                    <p
                      className={`tabular w-14 shrink-0 text-right text-[15px] font-medium ${
                        count > 0 ? "text-foreground" : "text-transparent"
                      }`}
                      aria-hidden={count === 0}
                    >
                      ${count * rate}
                    </p>
                  </div>
                </li>
              );
            })}
            <li className="border-t border-border" aria-hidden="true" />
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p
              aria-live="polite"
              className="tabular text-[15px] leading-7 text-muted-foreground"
            >
              {hasAddOns ? (
                <>
                  {plan} ${base}/mo plus add-ons ${addOnTotal}/mo.{" "}
                  <span className="font-medium text-foreground">
                    Estimated ${total}/mo
                  </span>
                </>
              ) : (
                <>
                  {plan} ${base}/mo. Add what you need to estimate your total.
                </>
              )}
            </p>

            <AppAuthLink
              className={`inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-accent-strong px-6 text-[15px] font-medium whitespace-nowrap text-white shadow-[0_1px_2px_rgba(88,40,24,0.28),0_8px_22px_-10px_rgba(220,74,40,0.55)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-accent-hover active:scale-[0.97] ${FOCUS}`}
            >
              {plan === "Free" ? "Get started" : "Start free trial"}
            </AppAuthLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
