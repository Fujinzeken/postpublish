import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "../../components/auth-forms";

export const metadata: Metadata = {
  title: "Sign in to PostPublish",
  description: "Sign in to your PostPublish workspace.",
};

export default function SignInPage() {
  return (
    <div>
      <h1 className="type-sub text-[1.75rem] text-foreground sm:text-[2rem]">
        Sign in
      </h1>
      <p className="type-body mt-3 text-[15px] leading-6 text-muted-foreground">
        Pick up where your queue left off.
      </p>

      <div className="mt-8">
        <SignInForm />
      </div>

      {/* Recovery sits after the form, not beside the password label: on a phone a
          link next to the label competes with the field it belongs to. */}
      <p className="mt-5 text-[14px] text-muted-foreground">
        <Link
          href="/reset-password"
          className="text-foreground transition-colors duration-200 ease-out hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Forgot your password?
        </Link>
      </p>

      <p className="mt-8 border-t border-border pt-6 text-[14.5px] text-muted-foreground">
        New to PostPublish?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-foreground transition-colors duration-200 ease-out hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
