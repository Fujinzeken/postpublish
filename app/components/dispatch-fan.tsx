"use client";

import { useEffect } from "react";
import {
  motion,
  useTime,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  type MotionValue,
} from "motion/react";
import { BRAND_MARKS, type Network } from "./brand-marks";

/*
  The hero visual: "Publish once. Reply everywhere." drawn literally.

  One post sits at the origin. Beams fan out from it, cross the right edge and
  never terminate, because "everywhere" has no endpoint worth drawing. Post cards
  ride outward along those beams and grow as they go; smaller replies travel back
  inward along the same paths.

  Three things carry the quality here:

  - Cards come in real post formats (square feed, portrait story, landscape link
    preview) so the traffic reads as different content going to different kinds of
    network, rather than as anonymous squares.
  - Depth is genuine. Cards scale with distance, and a depth-of-field blur keeps
    the far ones soft, so the fan has a focal plane instead of being flat.
  - The whole scene answers the pointer, in four layers moving at different rates.

  Everything is driven by motion values, so none of it re-renders React. Positions
  are evaluated directly on the cubic beziers rather than through CSS offset-path,
  which keeps SVG support predictable.
*/

const VW = 900;
const VH = 620;
const HUB = { x: 104, y: 310 };

type Bezier = {
  c1: [number, number];
  c2: [number, number];
  end: [number, number];
};

/*
  The paths leave the hub in a tight, almost horizontal bundle and only splay once
  clear of it. Keeping c1 near the hub's own y and pushing c2 past the endpoint is
  what makes each path bow and settle: control points spread evenly from the start
  give straight rays instead of curves. The outer paths end beyond the canvas so
  the fan bleeds off the top and bottom too.
*/
const PATHS: Bezier[] = [
  { c1: [300, 304], c2: [650, -96], end: [VW, -40] },
  { c1: [306, 306], c2: [664, 38], end: [VW, 104] },
  { c1: [312, 308], c2: [672, 202], end: [VW, 248] },
  { c1: [312, 312], c2: [672, 424], end: [VW, 398] },
  { c1: [306, 314], c2: [664, 596], end: [VW, 540] },
  { c1: [300, 316], c2: [650, 736], end: [VW, 676] },
];

function pathD(b: Bezier) {
  return `M${HUB.x} ${HUB.y} C${b.c1[0]} ${b.c1[1]} ${b.c2[0]} ${b.c2[1]} ${b.end[0]} ${b.end[1]}`;
}

/** Half-width of a beam at the hub, each control point, and the far end. */
const BEAM_W = [3, 11, 32, 54] as const;

/**
 * A beam is the dispatch path given area: the same bezier offset above and below
 * by a width that grows as it travels, then closed into one shape. Hairlines at
 * this scale read as scratches and the curvature never registers.
 */
function beamD(b: Bezier) {
  const [w0, w1, w2, w3] = BEAM_W;
  return [
    `M${HUB.x} ${HUB.y - w0}`,
    `C${b.c1[0]} ${b.c1[1] - w1} ${b.c2[0]} ${b.c2[1] - w2} ${b.end[0]} ${b.end[1] - w3}`,
    `L${b.end[0]} ${b.end[1] + w3}`,
    `C${b.c2[0]} ${b.c2[1] + w2} ${b.c1[0]} ${b.c1[1] + w1} ${HUB.x} ${HUB.y + w0}`,
    "Z",
  ].join(" ");
}

function cubic(p0: number, p1: number, p2: number, p3: number, t: number) {
  const mt = 1 - t;
  return (
    mt * mt * mt * p0 +
    3 * mt * mt * t * p1 +
    3 * mt * t * t * p2 +
    t * t * t * p3
  );
}

type Family = "accent" | "accentSoft" | "dark" | "stone";

type Spec = {
  path: number;
  family: Family;
  /** Which network's mark the tile carries. Omitted on replies. */
  network?: Network;
  /** Edge length in user units. */
  size: number;
  /** Degrees of resting tilt, so the traffic is not all axis-aligned. */
  tilt: number;
  /** Milliseconds for one full traversal. */
  period: number;
  /** 0..1 offset so cards do not leave the hub in lockstep. */
  phase: number;
  direction: "out" | "in";
};

/*
  One outbound tile per supported network, and with six networks that is now exactly
  one per path. No path doubles up, so the phases no longer have to be kept apart to
  stop two tiles overlapping on the same curve.

  Bodies stay inside the page palette rather than taking each brand's own colour:
  six brand colours at once reads as a logo soup and breaks the single-accent rule.
  The mark identifies the network; the tile stays PostPublish's.
*/
const CARDS: Spec[] = [
  { path: 0, family: "stone", network: "instagram", size: 46, tilt: -5, period: 15000, phase: 0.1, direction: "out" },
  { path: 1, family: "dark", network: "linkedin", size: 50, tilt: 4, period: 17000, phase: 0.55, direction: "out" },
  { path: 2, family: "dark", network: "x", size: 44, tilt: -3, period: 14000, phase: 0.3, direction: "out" },
  { path: 3, family: "accent", network: "telegram", size: 48, tilt: 6, period: 16000, phase: 0.72, direction: "out" },
  { path: 4, family: "accent", network: "facebook", size: 46, tilt: -6, period: 18000, phase: 0.18, direction: "out" },
  { path: 5, family: "dark", network: "threads", size: 44, tilt: 3, period: 15500, phase: 0.62, direction: "out" },
  // Replies coming back. Small and unbranded: a mark is illegible at this size,
  // and a reply is not itself a post.
  { path: 1, family: "stone", size: 22, tilt: -8, period: 19000, phase: 0.25, direction: "in" },
  { path: 3, family: "accentSoft", size: 20, tilt: 5, period: 21000, phase: 0.68, direction: "in" },
  { path: 5, family: "stone", size: 18, tilt: -4, period: 20000, phase: 0.42, direction: "in" },
];

const DOTS: Array<[number, number, number, string]> = [
  [196, 120, 3, "#dc4a28"],
  [272, 66, 2, "#a8a29e"],
  [424, 38, 2.5, "#dc4a28"],
  [616, 114, 2, "#d6d3d1"],
  [746, 56, 2.5, "#a8a29e"],
  [162, 476, 2.5, "#dc4a28"],
  [252, 556, 2, "#d6d3d1"],
  [456, 598, 2.5, "#a8a29e"],
  [668, 516, 2, "#dc4a28"],
  [808, 584, 2.5, "#d6d3d1"],
  [62, 188, 2, "#d6d3d1"],
  [76, 452, 2.5, "#a8a29e"],
];

/** Mark colour per body tone, so every logo keeps contrast against its tile. */
const MARK_INK: Record<Family, { color: string; opacity: number }> = {
  accent: { color: "#ffffff", opacity: 0.96 },
  accentSoft: { color: "#7c2d12", opacity: 0.86 },
  dark: { color: "#ffffff", opacity: 0.92 },
  // Near-black rather than mid-grey: on a pale tile a #44403c mark at this size
  // reads as a smudge instead of a logo.
  stone: { color: "#292524", opacity: 0.88 },
};

/*
  The rim is a white inner stroke, which is the right edge treatment on the dark
  and saturated bodies but turns into a visible outline on the pale ones, where it
  reads as a stray dashed rectangle rather than as a lit edge.
*/
const RIM_STRENGTH: Record<Family, number> = {
  accent: 1,
  dark: 1,
  accentSoft: 0.5,
  stone: 0.32,
};

/**
 * A rounded tile lit from the top left: gradient body, the network's mark,
 * specular sheen over the upper half, rim light, and a warm-tinted shadow.
 * Layering those is what reads as a physical object rather than a coloured
 * rectangle.
 */
function Card({
  size,
  family,
  network,
}: {
  size: number;
  family: Family;
  network?: Network;
}) {
  const half = size / 2;
  const r = size * 0.27;
  const ink = MARK_INK[family];

  const mark = network ? BRAND_MARKS[network] : undefined;
  // Fit the mark inside the tile on its longer axis, then centre it. 0.56 is the
  // usual app-icon proportion; much below that and the logo floats in the tile.
  const markScale = mark ? (size * 0.56) / Math.max(mark.w, mark.h) : 0;

  return (
    <g filter="url(#cardShadow)">
      <rect
        x={-half}
        y={-half}
        width={size}
        height={size}
        rx={r}
        fill={`url(#body-${family})`}
        // A warm hairline so every tile keeps a defined silhouette against the
        // near-white page, whatever its body tone.
        stroke="#57534e"
        strokeOpacity="0.13"
        strokeWidth={Math.max(0.6, size * 0.016)}
      />

      {mark && (
        <g
          transform={`translate(${(-mark.w * markScale) / 2} ${(-mark.h * markScale) / 2}) scale(${markScale})`}
        >
          <path d={mark.d} fill={ink.color} opacity={ink.opacity} />
        </g>
      )}

      <rect
        x={-half}
        y={-half}
        width={size}
        height={size * 0.56}
        rx={r}
        fill="url(#sheen)"
      />
      <rect
        x={-half + 0.75}
        y={-half + 0.75}
        width={size - 1.5}
        height={size - 1.5}
        rx={r - 0.75}
        fill="none"
        stroke="url(#rim)"
        // Scaled with the tile: a flat 1.5px is proportionally enormous on the
        // small reply tiles and outlines them.
        strokeWidth={Math.max(0.7, size * 0.022)}
        opacity={RIM_STRENGTH[family]}
      />
    </g>
  );
}

function Travelling({ spec, still }: { spec: Spec; still: boolean }) {
  const b = PATHS[spec.path];
  const time = useTime();

  const t = useTransform(time, (ms) => {
    const raw = still ? spec.phase : (ms / spec.period + spec.phase) % 1;
    return spec.direction === "out" ? raw : 1 - raw;
  });

  const x = useTransform(t, (v) => cubic(HUB.x, b.c1[0], b.c2[0], b.end[0], v));
  const y = useTransform(t, (v) => cubic(HUB.y, b.c1[1], b.c2[1], b.end[1], v));
  // Travelling outward reads as moving toward the viewer.
  const scale = useTransform(t, (v) => 0.5 + 0.64 * v);
  // Fade in leaving the hub, and dissolve well before the edge so no card is
  // ever caught half-clipped by the section's overflow.
  const opacity = useTransform(
    t,
    (v) => Math.min(1, v / 0.14) * Math.min(1, (1 - v) / 0.3),
  );
  // Depth of field: only the first stretch out of the hub sits outside the focal
  // plane, and gently. Blurring across the whole journey turns the distant cards
  // into smudges that read as dirt on the screen rather than as depth.
  const blurPx = useTransform(t, (v) => Math.max(0, 0.5 - v) * 2.6);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <motion.g
      style={{
        x,
        y,
        scale,
        rotate: spec.tilt,
        opacity,
        filter,
        transformBox: "fill-box",
        transformOrigin: "center",
      }}
    >
      <Card size={spec.size} family={spec.family} network={spec.network} />
    </motion.g>
  );
}

/** Depth layer: further-back things answer the pointer less. */
function ParallaxLayer({
  px,
  py,
  depth,
  children,
}: {
  px: MotionValue<number>;
  py: MotionValue<number>;
  depth: number;
  children: React.ReactNode;
}) {
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth * 0.6);
  return <motion.g style={{ x, y }}>{children}</motion.g>;
}

export function DispatchFan() {
  const reduce = useReducedMotion();
  const still = reduce ?? false;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 55, damping: 18, mass: 0.7 };
  const px = useSpring(pointerX, spring);
  const py = useSpring(pointerY, spring);

  useEffect(() => {
    if (still) return;
    // Pointer-driven depth is a hover affordance; skip it on touch entirely.
    if (!window.matchMedia("(hover: hover)").matches) return;

    const onMove = (e: PointerEvent) => {
      pointerX.set((e.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [still, pointerX, pointerY]);

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="body-accent" x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#f58963" />
          <stop offset="52%" stopColor="#e0512c" />
          <stop offset="100%" stopColor="#b8381b" />
        </linearGradient>
        <linearGradient id="body-accentSoft" x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#fdddd1" />
          <stop offset="100%" stopColor="#ee9878" />
        </linearGradient>
        <linearGradient id="body-dark" x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#605a55" />
          <stop offset="55%" stopColor="#332e2b" />
          <stop offset="100%" stopColor="#1c1917" />
        </linearGradient>
        {/* The light stop has to stay clearly off-white. At #fdfdfc the top-left
            of a pale card matched the page and the silhouette broke up, leaving
            what looked like a stray dashed outline. */}
        <linearGradient id="body-stone" x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#efedea" />
          <stop offset="100%" stopColor="#a8a29e" />
        </linearGradient>

        {/* The sheen sits over the mark, as a surface reflection should, so it has
            to stay light enough not to wash the logo out. */}
        <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18" />
        </linearGradient>

        {/* Shadows tinted warm. Never pure black on a warm white. */}
        <filter id="cardShadow" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow
            dx="0"
            dy="7"
            stdDeviation="9"
            floodColor="#44322c"
            floodOpacity="0.2"
          />
        </filter>
        <filter id="hubShadow" x="-80%" y="-80%" width="260%" height="260%">
          <feDropShadow
            dx="0"
            dy="16"
            stdDeviation="20"
            floodColor="#5c2a18"
            floodOpacity="0.3"
          />
        </filter>

        {/* Beams and traces read strongest just clear of the origin, then
            dissolve toward the edge so nothing terminates visibly. */}
        <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dc4a28" stopOpacity="0.03" />
          <stop offset="14%" stopColor="#dc4a28" stopOpacity="0.12" />
          <stop offset="45%" stopColor="#dc4a28" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#dc4a28" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="trace" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dc4a28" stopOpacity="0.05" />
          <stop offset="16%" stopColor="#dc4a28" stopOpacity="0.34" />
          <stop offset="60%" stopColor="#dc4a28" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#dc4a28" stopOpacity="0" />
        </linearGradient>

        {/* Focal bloom: a warm halo plus a white core, so the origin reads as the
            brightest point in the scene and the eye lands there first. */}
        <radialGradient id="hubHalo">
          <stop offset="0%" stopColor="#dc4a28" stopOpacity="0.2" />
          <stop offset="55%" stopColor="#dc4a28" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#dc4a28" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hubCore">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient particles are the only thing free to move at its own rate. */}
      <ParallaxLayer px={px} py={py} depth={20}>
        {DOTS.map(([cx, cy, r, fill], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={fill} opacity="0.5" />
        ))}
      </ParallaxLayer>

      {/*
        Beams, traces, tiles and the hub all share ONE layer and one depth. They
        are geometrically locked together: a tile is riding its beam, so if the
        layers move at different rates the tiles slide off the lines as soon as
        the pointer moves. Depth separation is only safe for elements that are not
        on a path.
      */}
      <ParallaxLayer px={px} py={py} depth={10}>
        {PATHS.map((b, i) => (
          <path key={`beam${i}`} d={beamD(b)} fill="url(#beam)" />
        ))}
        {PATHS.map((b, i) => (
          <path
            key={`trace${i}`}
            d={pathD(b)}
            fill="none"
            stroke="url(#trace)"
            strokeWidth="1"
          />
        ))}

        {CARDS.map((spec, i) => (
          <Travelling key={i} spec={spec} still={still} />
        ))}

        {/* The one post everything originates from, drawn last so it sits on top.
            It repeats the mark's offset-stack rather than inventing a new device. */}
        <circle cx={HUB.x} cy={HUB.y} r={168} fill="url(#hubHalo)" />
        <circle cx={HUB.x} cy={HUB.y} r={78} fill="url(#hubCore)" />
        <g transform={`translate(${HUB.x} ${HUB.y})`} filter="url(#hubShadow)">
          <rect x="-52" y="-52" width="104" height="104" rx="29" fill="url(#body-dark)" />
          <rect x="-52" y="-52" width="104" height="58" rx="29" fill="url(#sheen)" />
          <rect
            x="-51"
            y="-51"
            width="102"
            height="102"
            rx="28"
            fill="none"
            stroke="url(#rim)"
            strokeWidth="1.75"
          />
          <rect
            x="-22"
            y="-3"
            width="44"
            height="32"
            rx="9"
            fill="#ffffff"
            opacity="0.28"
          />
          <rect x="-6" y="-28" width="44" height="32" rx="9" fill="url(#body-accent)" />
        </g>
      </ParallaxLayer>
    </svg>
  );
}
