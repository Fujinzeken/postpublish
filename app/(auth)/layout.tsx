import Link from "next/link";
import { Logo } from "../components/logo";
import { Tile } from "../components/tile";
import { type Network } from "../components/brand-marks";

/*
  The panel earns its half of the screen by answering the question someone has at
  this exact moment: which accounts am I about to connect. Showing the six marks is
  concrete reassurance, and it is the same object the landing page uses, so the two
  surfaces stay one product.
*/
const NETWORKS: Array<{ network: Network; tone: "dark" | "stone" | "accent" }> = [
  { network: "instagram", tone: "stone" },
  { network: "x", tone: "dark" },
  { network: "linkedin", tone: "dark" },
  { network: "facebook", tone: "accent" },
  { network: "threads", tone: "dark" },
  { network: "telegram", tone: "accent" },
];

/*
  The auth shell.

  These are Operate surfaces, not Persuade ones: someone arriving here has already
  decided, and the job is to get them through with no friction. So the marketing
  header and footer are gone, there is no nav to wander into, and the only link out
  is the wordmark.

  The form sits in a narrow column on the left and a quiet brand panel fills the
  right above lg, carrying the same warm ground and beam figure as the landing page
  so signing in does not feel like leaving the product. Below lg the panel is gone
  entirely rather than stacked, because nothing in it is worth a scroll on a phone
  when the form is the task.
*/
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-1 flex-col px-5 py-8 sm:px-8 sm:py-10">
        <Link
          href="/"
          className="inline-flex self-start rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label="PostPublish home"
        >
          <Logo />
        </Link>

        {/* The form is optically centred in the remaining height rather than
            pinned under the wordmark, which leaves it stranded at the top on a
            tall window. */}
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-[linear-gradient(196deg,#fffcfa_0%,#fdeadf_52%,#f9d6c4_100%)] lg:block">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 720 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="authBeam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#dc4a28" stopOpacity="0" />
              <stop offset="42%" stopColor="#dc4a28" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#dc4a28" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[120, 260, 400, 540, 680, 820].map((y, i) => (
            <path
              key={y}
              d={`M-40 ${y} C220 ${y - 46 + i * 10} 520 ${y + 46 - i * 10} 760 ${y}`}
              fill="none"
              stroke="url(#authBeam)"
              strokeWidth="1.5"
            />
          ))}
        </svg>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_46%_at_78%_6%,rgba(255,255,255,0.9),transparent_66%)]"
        />

        {/* Centred, not pinned to the bottom edge. Pinning left the upper two
            thirds of the panel empty, which read as unfinished rather than quiet. */}
        <div className="relative flex h-full items-center justify-center p-12 xl:p-16">
          <div className="w-full max-w-sm">
            <p className="type-sub text-[1.375rem] leading-[1.38] text-balance text-foreground xl:text-[1.5rem]">
              One queue for six networks, with the replies and the numbers in the
              same place.
            </p>

            <ul className="mt-9 grid grid-cols-3 gap-x-5 gap-y-6">
              {NETWORKS.map((item) => (
                <li key={item.network} className="flex justify-center">
                  <Tile
                    network={item.network}
                    tone={item.tone}
                    className="h-12 w-12 rounded-[0.85rem] xl:h-[52px] xl:w-[52px] xl:rounded-[0.95rem]"
                    markClassName="h-5 w-5 xl:h-[22px] xl:w-[22px]"
                  />
                </li>
              ))}
            </ul>

            <p className="mt-9 border-t border-[#eec4b1] pt-5 text-[14px] leading-6 text-[#7c4a38]">
              Every plan reaches all six, including Free.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
