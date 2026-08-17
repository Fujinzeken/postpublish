import type { Metadata } from "next";
import Link from "next/link";
import { SignUpForm } from "../../components/auth-forms";

export const metadata: Metadata = {
  title: "Create your PostPublish account",
  description:
    "Start on the free plan. One queue for six networks, with replies and tracking in the same place.",
};

export default function SignUpPage() {
  return (
    <div>
      <h1 className="type-sub text-[1.75rem] text-foreground sm:text-[2rem]">
        Create your account
      </h1>
      <p className="type-body mt-3 text-[15px] leading-6 text-muted-foreground">
        Start on the free plan. No card needed.
      </p>

      <div className="mt-8">
        <SignUpForm />
      </div>

      {/*
        The legal line sits under the button, where consent belongs, rather than as
        a checkbox nobody reads. Both routes are still pending real copy.
      */}
      <p className="mt-5 text-[13px] leading-5 text-muted-foreground">
        By creating an account you agree to our{" "}
        <Link
          href="/terms"
          className="text-foreground underline decoration-stone-300 transition-colors duration-200 ease-out hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-foreground underline decoration-stone-300 transition-colors duration-200 ease-out hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <p className="mt-8 border-t border-border pt-6 text-[14.5px] text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-foreground transition-colors duration-200 ease-out hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
