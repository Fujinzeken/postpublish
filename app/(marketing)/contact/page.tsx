import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../../components/contact-form";

export const metadata: Metadata = {
  title: "Contact PostPublish",
  description:
    "Questions about plans, managed channels or getting your accounts connected.",
};

/*
  Contact.

  An asymmetric split: the form is the task and takes the wider column, while the
  left column answers the two questions that would otherwise arrive as messages.
  Most contact pages are a lone form floating in the middle of a page, which sends
  every routine question through a queue that a sentence could have answered.

  The self-serve answers deliberately come first in the reading order.
*/
export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-wide">
        <div className="max-w-2xl">
          <h1 className="type-section text-foreground">Talk to us.</h1>
          <p className="type-body mt-5 text-base leading-7 text-muted-foreground sm:text-[17px]">
            Questions about plans, managed channels, or getting your accounts
            connected.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 sm:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="type-sub text-[1.0625rem] text-foreground">
              Quicker than a message
            </h2>
            <ul className="mt-5 flex flex-col gap-5">
              <li className="border-t border-border pt-5">
                <p className="text-[15px] leading-6 text-foreground">
                  Plan limits, managed channels and add-ons
                </p>
                <Link
                  href="/#faq"
                  className="mt-1.5 inline-flex text-[14px] font-medium text-accent transition-colors duration-200 ease-out hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Read the FAQ
                </Link>
              </li>
              <li className="border-t border-border pt-5">
                <p className="text-[15px] leading-6 text-foreground">
                  What each plan includes, side by side
                </p>
                <Link
                  href="/#pricing"
                  className="mt-1.5 inline-flex text-[14px] font-medium text-accent transition-colors duration-200 ease-out hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Compare plans
                </Link>
              </li>
            </ul>

            {/*
              A real address belongs here. Inventing one would send mail nowhere, so
              the slot is left named rather than filled.
            */}
            <p className="mt-8 border-t border-border pt-5 text-[13.5px] leading-6 text-muted-foreground">
              Prefer your own mail client? A support address goes here once one is
              set up.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
