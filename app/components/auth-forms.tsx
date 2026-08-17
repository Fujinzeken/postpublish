"use client";

import { useState } from "react";
import { Field, FormNotice, SubmitButton } from "./field";

/*
  Sign in and sign up.

  There is no auth backend yet, so submission stops at a form-level notice instead
  of pretending to succeed. Validation, focus handling, per-field errors, the
  pending state and the disabled state are all real and reachable, which is the
  part that has to be designed; the request itself is one function away.

  TO WIRE UP: replace submit() with the real call. Map field-level failures from
  the response onto setErrors, and anything else onto setNotice.
*/

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Stand-in for the network call, so the pending state is observable. */
async function submit() {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return {
    ok: false as const,
    message:
      "Accounts are not connected yet. This form is built and validating, but it has nothing to submit to.",
  };
}

type Errors = Record<string, string>;

function useAuthSubmit(validate: (data: FormData) => Errors) {
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const found = validate(data);
    setErrors(found);
    setNotice(null);
    if (Object.keys(found).length > 0) return;

    setPending(true);
    const result = await submit();
    setPending(false);
    if (!result.ok) setNotice(result.message);
  }

  return { errors, pending, notice, onSubmit };
}

export function SignUpForm() {
  const { errors, pending, notice, onSubmit } = useAuthSubmit((data) => {
    const found: Errors = {};
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!email) found.email = "Enter your email address.";
    else if (!EMAIL.test(email)) found.email = "That does not look like an email address.";

    // Stated as a requirement up front in helper text, not sprung on submit.
    if (!password) found.password = "Choose a password.";
    else if (password.length < 8)
      found.password = "Use at least 8 characters.";

    return found;
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {notice && <FormNotice tone="error">{notice}</FormNotice>}

      <Field
        name="email"
        label="Work email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        error={errors.email}
      />
      <Field
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        required
        helper="At least 8 characters."
        error={errors.password}
      />

      <SubmitButton pending={pending}>
        {pending ? "Creating account" : "Create account"}
      </SubmitButton>
    </form>
  );
}

export function SignInForm() {
  const { errors, pending, notice, onSubmit } = useAuthSubmit((data) => {
    const found: Errors = {};
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!email) found.email = "Enter your email address.";
    else if (!EMAIL.test(email)) found.email = "That does not look like an email address.";
    if (!password) found.password = "Enter your password.";

    return found;
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {notice && <FormNotice tone="error">{notice}</FormNotice>}

      <Field
        name="email"
        label="Email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        error={errors.email}
      />
      <Field
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        error={errors.password}
      />

      <SubmitButton pending={pending}>
        {pending ? "Signing in" : "Sign in"}
      </SubmitButton>
    </form>
  );
}
