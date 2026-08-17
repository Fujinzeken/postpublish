"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { type Network } from "./brand-marks";
import { Tile, type Tone } from "./tile";

/*
  The scheduled week as a physical object.

  The hero shows space: one post distributed outward across networks. This shows
  the other axis, time. The week is a surface in perspective and each day carries
  its scheduled posts as a stack standing up off it.

  The composition argues the copy rather than decorating it. Wednesday is four
  deep, which is the pile-up. Thursday is bare, which is the gap. Both are visible
  at a glance without a caption pointing at them, which is the whole claim the
  section makes.

  Built with CSS 3D rather than an isometric SVG: the cards are real elements in a
  preserve-3d surface, so their height, their contact shadows and the pointer
  parallax are all one composited transform and animate on the GPU.
*/

type Day = {
  label: string;
  /**
   * Scheduled posts for the day. `t` is time of day, 0..1, which places the card
   * down its own column exactly as a week view does. Stacking these in height
   * instead would overlap them: at this tilt, height reads as up-screen, so a
   * stack collapses into its top card.
   *
   * An empty day is a deliberate gap.
   */
  posts: Array<{ network: Network; tone: Tone; t: number }>;
};

const WEEK: Day[] = [
  {
    label: "Mon",
    posts: [
      { network: "x", tone: "dark", t: 0.18 },
      { network: "instagram", tone: "stone", t: 0.64 },
    ],
  },
  { label: "Tue", posts: [{ network: "linkedin", tone: "dark", t: 0.44 }] },
  {
    // Still four deep, which is the pile-up the copy points at. Networks repeat
    // across the week because a real queue posts to the same place more than once.
    label: "Wed",
    posts: [
      { network: "linkedin", tone: "dark", t: 0.1 },
      { network: "threads", tone: "dark", t: 0.35 },
      { network: "facebook", tone: "accent", t: 0.58 },
      { network: "x", tone: "dark", t: 0.83 },
    ],
  },
  { label: "Thu", posts: [] },
  {
    label: "Fri",
    posts: [
      { network: "telegram", tone: "accent", t: 0.22 },
      { network: "instagram", tone: "stone", t: 0.76 },
    ],
  },
  { label: "Sat", posts: [{ network: "linkedin", tone: "dark", t: 0.36 }] },
  {
    label: "Sun",
    posts: [
      { network: "facebook", tone: "accent", t: 0.26 },
      { network: "telegram", tone: "accent", t: 0.68 },
    ],
  },
];

/*
  Card size is a CSS variable set per breakpoint on the root, not a constant. A
  fixed 66px card is proportionally enormous on a 390px surface and the columns
  collide; the positions are percentages so only the size needs to scale.
*/
const CARD_W = "var(--card)";
const CARD_SHADOW_W = "calc(var(--card) + 16px)";
const CARD_SHADOW_H = "calc(var(--card) * 0.72)";

/** How far every card floats above the surface. */
const LIFT = 20;

/** Map time of day to a position down the column. */
const topFor = (t: number) => 12 + t * 70;

/*
  Tone styling is not duplicated here. The tile is defined once in tile.tsx and
  every surface draws that same object, which is what keeps the hero, this surface
  and the step diagrams reading as one world.
*/

export function WeekPlane() {
  const reduce = useReducedMotion();
  const still = reduce ?? false;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 50, damping: 20, mass: 0.8 };
  const px = useSpring(pointerX, spring);
  const py = useSpring(pointerY, spring);

  // Resting attitude. The pointer only nudges it, so the composition never leaves
  // the frame or flattens out.
  const rotateX = useTransform(py, (v) => 58 - v * 4);
  const rotateZ = useTransform(px, (v) => -14 + v * 3);

  useEffect(() => {
    if (still) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const onMove = (e: PointerEvent) => {
      pointerX.set((e.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [still, pointerX, pointerY]);

  let cardIndex = 0;

  return (
    <div
      className="relative w-full [--card:38px] [perspective:1500px] [perspective-origin:50%_45%] sm:[--card:54px] lg:[--card:66px]"
      aria-hidden="true"
    >
      <div className="relative aspect-[16/9] sm:aspect-[16/7]">
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ rotateX, rotateZ }}
        >
          {/* The week surface. White rules on the warm stage rather than grey
              ones: on a tinted ground white reads as a clean ruled surface, where
              grey just muddies it. Day columns are stronger than time rows because
              the columns are what the load is judged against. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(to right, rgba(255,255,255,0.85) 0, rgba(255,255,255,0.85) 1.5px, transparent 1.5px, transparent calc(100% / 7)),
                repeating-linear-gradient(to bottom, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1.5px, transparent 1.5px, transparent 25%)
              `,
              maskImage:
                "radial-gradient(92% 96% at 50% 46%, #000 66%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(92% 96% at 50% 46%, #000 66%, transparent 100%)",
            }}
          />

          {WEEK.map((day, i) => {
            const cx = (i + 0.5) * (100 / 7);

            return (
              <div key={day.label}>
                {/*
                  No day placards. A label parented to the surface inherits its
                  tilt and skews flat, and counter-rotating it back to face the
                  viewer only works while the surface is perfectly still, which it
                  is not once the pointer nudges it. Seven columns plus the
                  headline already read as a week.
                */}
                {day.posts.map((post, j) => {
                  const top = topFor(post.t);
                  const delay = 0.1 + cardIndex * 0.05;
                  cardIndex += 1;

                  return (
                    <div key={`${day.label}-${j}`}>
                      {/* Contact shadow left on the surface. This is what sells
                          the float; a shadow attached to the card alone reads
                          flat. */}
                      <motion.div
                        className="absolute rounded-full bg-[#4a3229]"
                        style={{
                          left: `${cx}%`,
                          top: `${top}%`,
                          width: CARD_SHADOW_W,
                          height: CARD_SHADOW_H,
                          x: "-50%",
                          y: "-50%",
                          filter: "blur(9px)",
                          translateZ: 1,
                        }}
                        initial={still ? false : { opacity: 0 }}
                        whileInView={{ opacity: 0.16 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay }}
                      />

                      <motion.div
                        className="absolute"
                        style={{
                          left: `${cx}%`,
                          top: `${top}%`,
                          x: "-50%",
                          y: "-50%",
                        }}
                        initial={
                          still
                            ? false
                            : { opacity: 0, translateZ: 0, scale: 0.88 }
                        }
                        whileInView={{ opacity: 1, translateZ: LIFT, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.9,
                          delay,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        {/* Sized off the --card variable the root sets per
                            breakpoint, so the tile scales with the surface. */}
                        <Tile
                          network={post.network}
                          tone={post.tone}
                          className="h-[var(--card)] w-[var(--card)] rounded-[0.85rem]"
                          markClassName="h-4 w-4 sm:h-[21px] sm:w-[21px] lg:h-[26px] lg:w-[26px]"
                        />
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
