"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/*
  The form field, defined once.

  Rules this enforces so no individual form has to remember them:

  - The label sits above the input and is always a real <label>. Placeholders are
    never the label; where a field needs explanation it gets helper text, which
    stays in the markup rather than appearing only on error.
  - Helper text is wired through aria-describedby, and an error replaces it in that
    same relationship so a screen reader hears the problem on focus.
  - Errors read below the input, where the eye already is after leaving the field.
  - Password fields get a reveal toggle. It is a button, not a div, so it is
    reachable by keyboard, and it is excluded from the tab order of the form's happy
    path by sitting after the input.
*/

export function Field({
  name,
  label,
  type = "text",
  helper,
  error,
  required,
  autoComplete,
  inputMode,
  placeholder,
}: {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  helper?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email";
  placeholder?: string;
}) {
  const id = useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const [revealed, setRevealed] = useState(false);

  const isPassword = type === "password";
  const resolvedType = isPassword && revealed ? "text" : type;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-medium text-foreground">
        {label}
        {!required && (
          <span className="ml-1.5 font-normal text-muted-foreground">
            optional
          </span>
        )}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={resolvedType}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : helper ? helperId : undefined}
          className={`h-11 w-full rounded-md border bg-background px-3.5 text-[15px] text-foreground transition-[border-color,box-shadow] duration-200 ease-out placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
            isPassword ? "pr-11" : ""
          } ${
            error
              ? "border-destructive"
              : "border-input hover:border-stone-300"
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? "Hide password" : "Show password"}
            aria-pressed={revealed}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {revealed ? (
              <EyeOff className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {error ? (
        <p id={errorId} className="text-[13px] leading-5 text-destructive">
          {error}
        </p>
      ) : helper ? (
        <p id={helperId} className="text-[13px] leading-5 text-muted-foreground">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

/** Textarea sibling of Field, same label and error contract. */
export function TextField({
  name,
  label,
  helper,
  error,
  required,
  rows = 5,
}: {
  name: string;
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
  rows?: number;
}) {
  const id = useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-medium text-foreground">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : helper ? helperId : undefined}
        className={`w-full resize-y rounded-md border bg-background px-3.5 py-3 text-[15px] leading-6 text-foreground transition-[border-color] duration-200 ease-out placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
          error ? "border-destructive" : "border-input hover:border-stone-300"
        }`}
      />
      {error ? (
        <p id={errorId} className="text-[13px] leading-5 text-destructive">
          {error}
        </p>
      ) : helper ? (
        <p id={helperId} className="text-[13px] leading-5 text-muted-foreground">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

/** The one submit button style, with its pending state built in. */
export function SubmitButton({
  children,
  pending,
}: {
  children: React.ReactNode;
  pending?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-accent-strong px-5 text-[15px] font-medium text-white shadow-[0_1px_2px_rgba(88,40,24,0.28),0_8px_22px_-10px_rgba(220,74,40,0.55)] transition-[background-color,box-shadow,transform,opacity] duration-200 ease-out hover:bg-accent-hover active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-70"
    >
      {pending && (
        /* A ring rather than a generic dotted spinner, sized to the label. */
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
        />
      )}
      {children}
    </button>
  );
}

/** Inline notice used for form-level outcomes, not per-field errors. */
export function FormNotice({
  tone,
  children,
}: {
  tone: "error" | "info";
  children: React.ReactNode;
}) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-md border px-3.5 py-3 text-[13.5px] leading-5 ${
        tone === "error"
          ? "border-[#f0c4b6] bg-accent-tint text-[#8a2d12]"
          : "border-border bg-surface-subtle text-muted-foreground"
      }`}
    >
      {children}
    </p>
  );
}
