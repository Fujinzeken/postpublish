"use client";

import { useState } from "react";
import { Field, FormNotice, SubmitButton, TextField } from "./field";

/*
  Contact form.

  Four fields, one of them optional. Every field a contact form asks for costs
  replies, so this asks for the two things needed to answer (who and where) plus the
  question itself, and nothing that would only be used for routing or reporting.

  As with auth, there is no endpoint yet: validation and states are real, submission
  stops at a notice.

  TO WIRE UP: replace submit() with the real call, and add the destination address
  to the page beside the form so people who would rather use their own mail client
  are not forced through this.
*/

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function submit() {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return {
    ok: false as const,
    message:
      "This form is not connected yet, so nothing was sent. It is built and validating, and needs an endpoint.",
  };
}

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const found: Record<string, string> = {};
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!email) found.email = "Enter an email address so we can reply.";
    else if (!EMAIL.test(email))
      found.email = "That does not look like an email address.";

    if (!message) found.message = "Tell us what you need.";
    else if (message.trim().length < 10)
      found.message = "A little more detail will get you a better answer.";

    setErrors(found);
    setNotice(null);
    if (Object.keys(found).length > 0) return;

    setPending(true);
    const result = await submit();
    setPending(false);
    if (!result.ok) setNotice(result.message);
  }

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
        name="name"
        label="Name"
        autoComplete="name"
        error={errors.name}
      />
      <TextField
        name="message"
        label="How can we help?"
        required
        rows={6}
        helper="If it is about a specific account or plan, mention which."
        error={errors.message}
      />

      <SubmitButton pending={pending}>
        {pending ? "Sending" : "Send message"}
      </SubmitButton>
    </form>
  );
}
