import { BRAND_MARKS, type Network } from "./brand-marks";

/*
  The canonical app-icon tile.

  The hero, the week surface and the step diagrams all draw the same object, so it
  is defined once here rather than restyled per section. That single source is what
  keeps the page reading as one world: a tile is always a rounded square lit from
  the top left, with a warm shadow, a hairline ring and a specular sheen over its
  upper half.

  Bodies stay in the page palette instead of each brand's own colour. Six brand
  colours at once is logo soup and breaks the single-accent rule; the mark carries
  the identification on its own.
*/

export type Tone = "dark" | "stone" | "accent";

const BODY: Record<Tone, string> = {
  dark: "bg-gradient-to-br from-stone-600 to-stone-900 ring-black/25",
  stone: "bg-gradient-to-br from-white to-stone-300 ring-stone-900/15",
  accent: "bg-gradient-to-br from-[#f58963] to-[#b8381b] ring-[#7c2d12]/35",
};

const INK: Record<Tone, string> = {
  dark: "fill-white/90",
  // Near-black, not mid-grey: a lighter mark on a pale tile reads as a smudge.
  stone: "fill-stone-800/85",
  accent: "fill-white/95",
};

export function Tile({
  network,
  tone = "dark",
  className = "h-12 w-12 rounded-[0.85rem]",
  markClassName = "h-5 w-5",
}: {
  network: Network;
  tone?: Tone;
  /** Size and radius, so each surface can scale the same object. */
  className?: string;
  markClassName?: string;
}) {
  const mark = BRAND_MARKS[network];

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ring-1 ring-inset shadow-[0_5px_14px_rgba(74,50,41,0.2)] ${BODY[tone]} ${className}`}
    >
      <svg
        viewBox={`0 0 ${mark.w} ${mark.h}`}
        className={`${markClassName} ${INK[tone]}`}
        aria-hidden="true"
        focusable="false"
      >
        <path d={mark.d} />
      </svg>
      <span className="sr-only">{mark.label}</span>
    </span>
  );
}
