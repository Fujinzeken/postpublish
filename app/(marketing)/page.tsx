import { Hero } from "../components/hero";
import { Features } from "../components/features";
import { HowItWorks } from "../components/how-it-works";
import { Testimonials } from "../components/testimonials";
import { Pricing } from "../components/pricing";
import { AddOns } from "../components/add-ons";
import { Faq } from "../components/faq";
import { ClosingCta } from "../components/closing-cta";

/*
  Funnel order, not arbitrary order.

  What it does (hero) and why it is worth it (queue, how it works), then proof
  before the price, then the price, then the objections the price raises, then the
  ask. Testimonials after pricing would be arguing a case already lost, and an FAQ
  before pricing would be answering questions nobody has yet.

  The header and footer come from the group layout.
*/
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <AddOns />
      <Faq />
      <ClosingCta />
    </>
  );
}
