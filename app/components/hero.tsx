import Link from "next/link";
import { AppAuthLink } from "./app-auth-link";
import { DispatchFan } from "./dispatch-fan";
import { ArrowRight } from "lucide-react";

/*
  Asymmetric hero. The copy holds the left of a 72rem measure; the visual is not
  boxed into a grid column but positioned absolutely and allowed to run off the
  right edge of the section, which is what gives it scale. The section clips it.
*/
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Two washes rather than one: a warm bloom behind the visual, and a much
          wider, fainter one to keep the left half from reading as bare white. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(58%_48%_at_76%_40%,#fdf0eb,transparent_72%)]"
      />
      {/* Warm, not grey. A neutral wash here reads as a dirty screen. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(85%_65%_at_18%_12%,#fefaf8,transparent_68%)]"
      />

      <div className="container-wide relative pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="relative z-10 lg:max-w-[48%]">
          {/*
            Optical sizing is pinned near the display end of Bricolage's opsz
            axis: left to itself the browser interpolates off the computed font
            size, which differs across breakpoints and makes the headline drift in
            character. Each line rises out of its own mask.
          */}
          <h1 className="type-display text-foreground">
            <span className="line-mask">
              <span className="line-rise">
                Publish once<span className="text-accent">.</span>
              </span>
            </span>
            <span className="line-mask">
              <span className="line-rise rise-1">
                Reply everywhere<span className="text-accent">.</span>
              </span>
            </span>
          </h1>

          {/* max-w-md, not the full column, so the copy clears the hub. */}
          <p className="rise rise-2 type-body mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-[17px] sm:leading-8">
            PostPublish schedules your posts, answers comments and DMs in your
            voice, and shows you which ones actually convert.
          </p>

          <div className="rise rise-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <AppAuthLink
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent-strong px-6 text-[15px] font-medium whitespace-nowrap text-white shadow-[0_1px_2px_rgba(88,40,24,0.28),0_8px_24px_-8px_rgba(220,74,40,0.55)] transition-[background-color,box-shadow,transform] hover:bg-accent-hover hover:shadow-[0_1px_2px_rgba(88,40,24,0.3),0_12px_30px_-8px_rgba(220,74,40,0.6)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
            >
              Start free trial
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </AppAuthLink>
            <Link
              href="/#how-it-works"
              className="inline-flex h-12 w-full items-center justify-center rounded-md border border-border bg-background/70 px-6 text-[15px] font-medium whitespace-nowrap text-foreground backdrop-blur-sm transition-colors hover:border-stone-300 hover:bg-surface-subtle active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
            >
              See how it works
            </Link>
          </div>
        </div>

        {/* Static and contained on mobile, full-bleed and overflowing on desktop. */}
        <div
          aria-hidden="true"
          className="rise rise-4 pointer-events-none mt-14 lg:absolute lg:top-1/2 lg:right-0 lg:mt-0 lg:w-[72%] lg:-translate-y-1/2 lg:translate-x-[24%]"
        >
          <div className="aspect-[900/620]">
            <DispatchFan />
          </div>
        </div>
      </div>
    </section>
  );
}
