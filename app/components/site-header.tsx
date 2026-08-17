"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const NAV = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
] as const;

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link
          href="/"
          className={`flex items-center rounded-md ${focus}`}
          aria-label="PostPublish home"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md text-[15px] text-muted-foreground transition-colors hover:text-foreground ${focus}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/sign-in"
            className={`rounded-md text-[15px] text-muted-foreground transition-colors hover:text-foreground ${focus}`}
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className={`inline-flex h-9 items-center justify-center rounded-md bg-accent-strong px-4 text-[15px] font-medium text-white transition-[background-color,transform] duration-200 ease-out hover:bg-accent-hover active:scale-[0.97] ${focus}`}
          >
            Start free trial
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          // 44px square. A 20px icon with p-2 came to 36px, which is under the
          // comfortable tap target and this is the only control in the header on a
          // phone.
          className={`-mr-2.5 inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground md:hidden ${focus}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? (
            <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-border bg-background md:hidden"
        >
          <nav
            className="container-wide flex flex-col py-2"
            aria-label="Mobile"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md py-3 text-[15px] text-muted-foreground transition-colors hover:text-foreground ${focus}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 mb-4 flex flex-col gap-2.5 border-t border-border pt-4">
              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className={`inline-flex h-11 items-center justify-center rounded-md bg-accent-strong px-5 text-[15px] font-medium text-white transition-[background-color,transform] duration-200 ease-out hover:bg-accent-hover active:scale-[0.97] ${focus}`}
              >
                Start free trial
              </Link>
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className={`inline-flex h-11 items-center justify-center rounded-md border border-border px-5 text-[15px] font-medium text-foreground transition-colors hover:bg-surface-subtle ${focus}`}
              >
                Log in
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
