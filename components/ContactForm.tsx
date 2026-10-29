"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { contact } from "@/lib/content";
import { Button } from "@/components/ui/Button";

type Field = "name" | "email" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "loading" | "success" | "error";

const f = contact.form;
const v = f.validation;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX: Record<Field, number> = { name: 200, email: 320, message: 5000 };
const EMPTY: Values = { name: "", email: "", message: "" };
// The address is still a placeholder until it is replaced in lib/content.ts.
const HAS_EMAIL = contact.email.address.includes("@");

function validateField(field: Field, raw: string): string | undefined {
  const value = raw.trim();
  if (field === "name") {
    if (!value) return v.nameRequired;
  } else if (field === "email") {
    if (!value) return v.emailRequired;
    if (!EMAIL_RE.test(value)) return v.emailInvalid;
  } else {
    if (!value) return v.messageRequired;
    if (value.length < 10) return v.messageTooShort;
  }
  if (value.length > MAX[field]) return v.tooLong;
  return undefined;
}

function validateAll(values: Values): Errors {
  const errors: Errors = {};
  (Object.keys(values) as Field[]).forEach((field) => {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  });
  return errors;
}

function buildMailto(values: Values) {
  const body = `${f.nameLabel}: ${values.name}\n${f.emailLabel}: ${values.email}\n\n${values.message}`;
  return `mailto:${contact.email.address}?subject=${encodeURIComponent(f.mailtoSubject)}&body=${encodeURIComponent(body)}`;
}

const inputBase =
  "block w-full rounded-xl border bg-paper px-4 text-[15px] text-paper-fg placeholder:text-paper-muted/70 shadow-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent-ink focus:ring-4 focus:ring-accent-ink/15 disabled:opacity-60";

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failedValues, setFailedValues] = useState<Values>(EMPTY);

  const loading = status === "loading";

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = e.target.name as Field;
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    if (status === "success" || status === "error") setStatus("idle");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = (Object.keys(EMPTY) as Field[]).find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("loading");
    const payload: Values = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !data?.ok) throw new Error("Request failed");

      setStatus("success");
      setValues(EMPTY);
      setErrors({});
      setTouched({});
    } catch {
      setFailedValues(payload);
      setStatus("error");
    }
  }

  const fieldProps = (field: Field, extra: string) => {
    const error = errors[field];
    return {
      id: `contact-${field}`,
      name: field,
      value: values[field],
      onChange: handleChange,
      disabled: loading,
      maxLength: MAX[field],
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `contact-${field}-error` : undefined,
      className: `${inputBase} ${extra} ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/15" : "border-paper-line"}`,
    };
  };

  const label = (field: Field, text: string) => (
    <label htmlFor={`contact-${field}`} className="mb-2 block text-sm font-medium text-paper-fg">
      {text}
    </label>
  );

  const fieldError = (field: Field) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className="mt-2 text-sm text-red-600">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          {label("name", f.nameLabel)}
          <input type="text" autoComplete="name" placeholder={f.namePlaceholder} {...fieldProps("name", "h-12")} />
          {fieldError("name")}
        </div>
        <div>
          {label("email", f.emailLabel)}
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={f.emailPlaceholder}
            {...fieldProps("email", "h-12")}
          />
          {fieldError("email")}
        </div>
      </div>

      <div>
        {label("message", f.messageLabel)}
        <textarea
          rows={6}
          placeholder={f.messagePlaceholder}
          {...fieldProps("message", "min-h-[9rem] resize-y py-3 leading-relaxed")}
        />
        {fieldError("message")}
      </div>

      <Button type="submit" size="lg" disabled={loading} aria-busy={loading} className="w-full sm:w-auto">
        {loading ? (
          <>
            <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
            {f.submitting}
          </>
        ) : (
          f.submit
        )}
      </Button>

      {/* Always mounted so screen readers reliably announce the success message */}
      <div role="status" className="empty:hidden">
        {status === "success" ? (
          <p className="flex items-start gap-3 rounded-xl border border-emerald-600/20 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <span>{f.success}</span>
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-600/20 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <AlertCircle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div>
            <p>{f.error}</p>
            {HAS_EMAIL ? (
              <a
                href={buildMailto(failedValues)}
                className="mt-1 inline-block font-semibold text-red-800 underline underline-offset-2 hover:text-red-900"
              >
                {f.mailtoFallback}
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </form>
  );
}
