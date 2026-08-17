import Link from "next/link";
import { Logo } from "./logo";

/*
  Footer.

  Deliberately without the things that read as filler on a marketing footer: no
  build or version string, no locale and time strip, no social icon row standing in
  for links that do not exist yet. Just the brand, the routes, and the notice.

  The link set is intentionally short. Every entry here is a route someone has to
  build; padding the columns with plausible-sounding pages would only manufacture
  more dead ends.
*/

/*
  No changelog and no blog. A changelog is a developer artifact and belongs with
  API docs, not on a page whose job is to convert; the blog was a column entry with
  nothing behind it.

  Legal still points at routes that do not exist yet, on purpose: those pages are
  waiting on real legal copy, and a footer without them looks more incomplete than
  one whose links are pending.
*/
const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    heading: "Company",
    links: [{ label: "Contact", href: "/contact" }],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const LINK =
  "rounded-md text-[14.5px] text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-subtle">
      <div className="container-wide py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-12">
          <div className="col-span-2 sm:col-span-3 lg:col-span-5">
            <Link
              href="/"
              className="inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              aria-label="PostPublish home"
            >
              <Logo />
            </Link>
            <p className="type-body mt-4 max-w-xs text-[14.5px] leading-6 text-muted-foreground">
              One queue for eight networks, with the replies and the numbers in
              the same place.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="lg:col-span-2"
            >
              <h2 className="text-[13px] font-semibold text-foreground">
                {column.heading}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13.5px] text-muted-foreground">
            &copy; 2026 PostPublish. All rights reserved.
          </p>
          <p className="text-[13.5px] text-muted-foreground">
            Network names and marks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
