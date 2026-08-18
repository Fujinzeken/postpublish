import Link from "next/link";
import { AppAuthLink } from "./app-auth-link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

/*
  The closing section.

  Centred, which is the one place on this page that earns it: a single message with
  a single action, where the message is the design. Every other section is
  asymmetric, so this reads as a stop rather than more of the same.

  Full bleed rather than a contained panel, which is what separates it from the
  queue section's tinted stage. Same warm ground, different structure.

  It is also the page's second typographic peak. The hero opens at display scale
  and nothing since has gone above section scale, so closing at display scale
  bookends the page instead of trailing off.
*/
export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(178deg,#fffcfa_0%,#fdeadf_58%,#fadbcb_100%)]">
      {/* A faint echo of the hero's beams, static and low. The page opened with
          one post fanning outward; it closes on the same figure. */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="ctaBeam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#dc4a28" stopOpacity="0" />
            <stop offset="45%" stopColor="#dc4a28" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#dc4a28" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[70, 170, 270, 370, 470].map((y, i) => (
          <path
            key={y}
            d={`M-40 ${y} C420 ${y - 40 + i * 8} 1020 ${y + 40 - i * 8} 1480 ${y}`}
            fill="none"
            stroke="url(#ctaBeam)"
            strokeWidth="1.25"
          />
        ))}
      </svg>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(52%_62%_at_50%_0%,rgba(255,255,255,0.92),transparent_68%)]"
      />

      <div className="container-wide relative py-24 sm:py-28 lg:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="type-display text-foreground">
            Get the week off your plate.
          </h2>
          <p className="type-body mx-auto mt-6 max-w-lg text-base leading-7 text-[#7c4a38] sm:text-[17px] sm:leading-8">
            Connect your accounts, fill one queue, and let PostPublish handle the
            publishing and the replies.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <AppAuthLink
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent-strong px-7 text-[15px] font-medium whitespace-nowrap text-white shadow-[0_1px_2px_rgba(88,40,24,0.3),0_10px_28px_-10px_rgba(220,74,40,0.6)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-accent-hover hover:shadow-[0_1px_2px_rgba(88,40,24,0.32),0_14px_34px_-10px_rgba(220,74,40,0.65)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
            >
              Start free trial
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </AppAuthLink>
            <Link
              href="/#pricing"
              className="inline-flex h-12 w-full items-center justify-center rounded-md border border-[#eabfae] bg-white/70 px-7 text-[15px] font-medium whitespace-nowrap text-foreground backdrop-blur-sm transition-[background-color,border-color,transform] duration-200 ease-out hover:border-[#e0a993] hover:bg-white active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
            >
              See pricing
            </Link>
          </div>

          <p className="mt-6 text-[13.5px] text-[#9a6a55]">
            Free plan available. No card needed to start.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
