"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Tile } from "./tile";
import { type Network } from "./brand-marks";

/*
  Three purpose-built diagrams, one per step, drawn in the page's own material
  language instead of photography.

  The previous version of this section used stock photography, and no amount of
  treatment fixed it: a teacup cannot show an account being connected. These are
  the actual subjects the product deals in, which is what a visual in this slot is
  for. They also reuse the hero's tile, so the section stops reading as a different
  website.

  Each diagram states its step as a shape:
    connect  eight accounts resolve to a connected set
    adapt    one draft becomes three native formats
    reply    many inbound threads converge on one inbox
*/

const EASE = [0.23, 1, 0.32, 1] as const;

const VIEWPORT = { once: true, amount: 0.4 } as const;

/** Every diagram sits on the same quiet stage, so the trio reads as a set. */
const STAGE =
  "relative overflow-hidden rounded-2xl border border-border bg-[linear-gradient(160deg,#ffffff_0%,#fbf9f8_58%,#f7f3f1_100%)]";

function useStill() {
  const reduce = useReducedMotion();
  return reduce ?? false;
}

/* 1. Connect: the eight supported accounts, each resolving to connected. */

const ACCOUNTS: Array<{ network: Network; tone: "dark" | "stone" | "accent" }> = [
  { network: "instagram", tone: "stone" },
  { network: "x", tone: "dark" },
  { network: "linkedin", tone: "dark" },
  { network: "facebook", tone: "accent" },
  { network: "tiktok", tone: "stone" },
  { network: "threads", tone: "dark" },
  { network: "telegram", tone: "accent" },
  { network: "reddit", tone: "stone" },
];

export function ConnectDiagram() {
  const still = useStill();

  return (
    <div className={`${STAGE} px-6 py-10 sm:px-10 sm:py-12`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(220,74,40,0.07),transparent_70%)]"
      />
      <ul className="relative mx-auto grid max-w-md grid-cols-4 gap-x-5 gap-y-6 sm:gap-x-7">
        {ACCOUNTS.map((account, i) => (
          <motion.li
            key={account.network}
            className="relative flex justify-center"
            initial={still ? false : { opacity: 0, scale: 0.86 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, delay: i * 0.055, ease: EASE }}
          >
            <Tile
              network={account.network}
              tone={account.tone}
              className="h-12 w-12 rounded-[0.85rem] sm:h-14 sm:w-14 sm:rounded-[1rem]"
              markClassName="h-5 w-5 sm:h-6 sm:w-6"
            />
            {/* The badge is the whole point of the diagram, so it lands after the
                tile it belongs to rather than with it. */}
            <motion.span
              aria-hidden="true"
              className="absolute -right-1.5 -bottom-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-strong ring-2 ring-white sm:h-[22px] sm:w-[22px]"
              initial={still ? false : { opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{
                duration: 0.4,
                delay: 0.28 + i * 0.055,
                ease: EASE,
              }}
            >
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </motion.span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* 2. Adapt: one draft, three native formats. */

/*
  Each format sits in a row of the same fixed height, so the beam endpoints below
  can be pinned to those row centres. The shapes differ; the rows do not. Without
  that the beams float free of the cards they are supposed to be pointing at.
*/
const ROW = 72;

const FORMATS: Array<{
  network: Network;
  tone: "dark" | "stone" | "accent";
  /** The proportions each network actually wants. */
  box: string;
  label: string;
}> = [
  { network: "instagram", tone: "stone", box: "h-16 w-16", label: "Square" },
  { network: "tiktok", tone: "dark", box: "h-[68px] w-10", label: "Vertical" },
  { network: "linkedin", tone: "accent", box: "h-11 w-[76px]", label: "Wide" },
];

export function AdaptDiagram() {
  const still = useStill();

  return (
    <div className={`${STAGE} px-6 py-10 sm:px-10 sm:py-12`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_70%_at_78%_10%,rgba(220,74,40,0.08),transparent_70%)]"
      />

      <div className="relative flex items-center justify-center gap-3 sm:gap-6">
        {/* The draft. Bars, not lorem text: this is a diagram of a post, and
            setting fake copy in it would make it a mock screenshot instead. */}
        <motion.div
          className="w-[104px] shrink-0 rounded-[0.9rem] border border-stone-900/10 bg-gradient-to-br from-stone-700 to-stone-900 p-3 shadow-[0_10px_26px_rgba(74,50,41,0.26)] sm:w-[124px] sm:p-3.5"
          initial={still ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="aspect-[4/3] rounded-[0.5rem] bg-white/16" />
          <div className="mt-2.5 h-1.5 w-[86%] rounded-full bg-white/26" />
          <div className="mt-1.5 h-1.5 w-[62%] rounded-full bg-white/16" />
          <div className="mt-3 h-1.5 w-9 rounded-full bg-accent" />
        </motion.div>

        {/* Diverging, the mirror of the reply diagram. The viewBox height is three
            rows exactly, so each beam ends on the centre of the card it feeds. */}
        <svg
          viewBox={`0 0 72 ${ROW * 3}`}
          className="h-[216px] w-9 shrink-0 sm:w-[72px]"
          aria-hidden="true"
          focusable="false"
        >
          {[0, 1, 2].map((row, i) => {
            const y = ROW * row + ROW / 2;
            return (
              <motion.path
                key={row}
                d={`M0 ${ROW * 1.5} C32 ${ROW * 1.5} 40 ${y} 70 ${y}`}
                fill="none"
                stroke="#dc4a28"
                strokeWidth="1.25"
                strokeOpacity="0.34"
                initial={still ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: EASE }}
              />
            );
          })}
        </svg>

        <div className="shrink-0">
          {FORMATS.map((format, i) => (
            <motion.div
              key={format.network}
              className="flex items-center gap-3"
              style={{ height: ROW }}
              initial={still ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: 0.34 + i * 0.09, ease: EASE }}
            >
              <Tile
                network={format.network}
                tone={format.tone}
                className={`${format.box} rounded-[0.75rem]`}
                markClassName="h-[18px] w-[18px]"
              />
              <span className="hidden text-[12.5px] font-medium text-muted-foreground sm:block">
                {format.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 3. Reply: many inbound threads, one inbox. */

const INBOUND: Array<{ network: Network; tone: "dark" | "stone" | "accent" }> = [
  { network: "instagram", tone: "stone" },
  { network: "x", tone: "dark" },
  { network: "telegram", tone: "accent" },
  { network: "reddit", tone: "stone" },
];

export function ReplyDiagram() {
  const still = useStill();

  return (
    <div className={`${STAGE} px-6 py-10 sm:px-10 sm:py-12`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_70%_at_22%_12%,rgba(220,74,40,0.08),transparent_70%)]"
      />

      <div className="relative flex items-center justify-center gap-4 sm:gap-8">
        <div className="flex flex-col gap-3.5">
          {INBOUND.map((thread, i) => (
            <motion.div
              key={thread.network}
              initial={still ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
            >
              <Tile
                network={thread.network}
                tone={thread.tone}
                className="h-10 w-10 rounded-[0.7rem] sm:h-11 sm:w-11 sm:rounded-[0.8rem]"
                markClassName="h-4 w-4 sm:h-[18px] sm:w-[18px]"
              />
            </motion.div>
          ))}
        </div>

        <svg
          viewBox="0 0 72 190"
          className="h-[190px] w-12 shrink-0 sm:w-[72px]"
          aria-hidden="true"
          focusable="false"
        >
          {/* Converging, the reverse of the hero's fan. */}
          {[20, 74, 122, 176].map((y, i) => (
            <motion.path
              key={y}
              d={`M0 ${y} C32 ${y} 40 95 70 95`}
              fill="none"
              stroke="#dc4a28"
              strokeWidth="1.25"
              strokeOpacity="0.34"
              initial={still ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.65, delay: 0.16 + i * 0.07, ease: EASE }}
            />
          ))}
        </svg>

        {/* The one inbox. Each row is a thread with a drafted answer waiting. */}
        <motion.div
          className="w-[168px] shrink-0 rounded-[0.9rem] border border-border bg-background p-3.5 shadow-[0_12px_30px_-12px_rgba(74,50,41,0.3)] sm:w-[196px]"
          initial={still ? false : { opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        >
          {[0, 1, 2].map((row) => (
            <div
              key={row}
              className={row === 0 ? "" : "mt-3 border-t border-border pt-3"}
            >
              <div className="h-1.5 w-[78%] rounded-full bg-stone-300" />
              <div className="mt-2 flex items-center gap-1.5">
                <span className="h-1.5 w-10 rounded-full bg-accent" />
                <span className="text-[10.5px] font-medium text-accent">
                  Draft ready
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
