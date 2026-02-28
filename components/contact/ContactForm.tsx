"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRipple } from "@/hooks/useRipple";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

interface FieldState {
  value: string;
  touched: boolean;
  error: string | null;
}

function getError(
  key: "name" | "email" | "message",
  value: string,
  t: (k: string) => string
): string | null {
  const v = value.trim();
  if (key === "name") return !v ? t("validationNameRequired") : null;
  if (key === "email") {
    if (!v) return t("validationEmailRequired");
    if (!EMAIL_REGEX.test(v)) return t("validationEmailInvalid");
    return null;
  }
  if (key === "message") return !v ? t("validationMessageRequired") : null;
  return null;
}

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [name, setName] = useState<FieldState>({ value: "", touched: false, error: null });
  const [email, setEmail] = useState<FieldState>({ value: "", touched: false, error: null });
  const [message, setMessage] = useState<FieldState>({ value: "", touched: false, error: null });
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const { containerRef: rippleRef, onClick: addRipple } = useRipple();

  const validateField = useCallback(
    (key: "name" | "email" | "message", value: string) => {
      return getError(key, value, t);
    },
    [t]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const nameError = validateField("name", name.value);
    const emailError = validateField("email", email.value);
    const messageError = validateField("message", message.value);

    setName((s) => ({ ...s, touched: true, error: nameError }));
    setEmail((s) => ({ ...s, touched: true, error: emailError }));
    setMessage((s) => ({ ...s, touched: true, error: messageError }));

    if (nameError || emailError || messageError) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.value.trim(),
          email: email.value.trim(),
          message: message.value.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setServerError(data.error ?? t("error"));
        return;
      }

      setStatus("success");
      setName({ value: "", touched: false, error: null });
      setEmail({ value: "", touched: false, error: null });
      setMessage({ value: "", touched: false, error: null });
    } catch {
      setStatus("error");
      setServerError(t("error"));
    }
  };

  const inputBase = cn(
    "w-full rounded-lg border bg-transparent px-3 py-2 text-sm",
    "border-gray-200 dark:border-gray-700",
    "text-slate-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-gray-500",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 dark:focus:border-blue-400",
    "focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)] dark:focus:shadow-[0_0_0_3px_rgba(96,165,250,0.2)]",
    "transition-all duration-200 ease-out"
  );
  const inputError = "border-red-500 dark:border-red-500 focus:ring-red-500";
  const labelBase = cn(
    "block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1",
    "transition-transform duration-200 ease-out origin-left",
    "group-focus-within:-translate-y-0.5 group-focus-within:scale-[0.95]"
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto text-left"
      noValidate
      aria-label={t("formLabel")}
    >
      <div className="space-y-4">
        <div className="group">
          <label htmlFor="contact-name" className={labelBase}>
            {t("name")}
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            value={name.value}
            onChange={(e) => {
              const v = e.target.value;
              setName((s) => ({
                ...s,
                value: v,
                error: s.touched ? validateField("name", v) : null,
              }));
            }}
            onBlur={() =>
              setName((s) => ({ ...s, touched: true, error: validateField("name", s.value) }))
            }
            className={cn(inputBase, name.error && inputError)}
            placeholder={t("namePlaceholder")}
            disabled={status === "submitting"}
            aria-invalid={!!name.error}
            aria-describedby={name.error ? "contact-name-error" : undefined}
          />
          {name.error && (
            <p id="contact-name-error" className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
              {name.error}
            </p>
          )}
        </div>

        <div className="group">
          <label htmlFor="contact-email" className={labelBase}>
            {t("email")}
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            value={email.value}
            onChange={(e) => {
              const v = e.target.value;
              setEmail((s) => ({
                ...s,
                value: v,
                error: s.touched ? validateField("email", v) : null,
              }));
            }}
            onBlur={() =>
              setEmail((s) => ({ ...s, touched: true, error: validateField("email", s.value) }))
            }
            className={cn(inputBase, email.error && inputError)}
            placeholder={t("emailPlaceholder")}
            disabled={status === "submitting"}
            aria-invalid={!!email.error}
            aria-describedby={email.error ? "contact-email-error" : undefined}
          />
          {email.error && (
            <p id="contact-email-error" className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
              {email.error}
            </p>
          )}
        </div>

        <div className="group">
          <label htmlFor="contact-message" className={labelBase}>
            {t("message")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            value={message.value}
            onChange={(e) => {
              const v = e.target.value;
              setMessage((s) => ({
                ...s,
                value: v,
                error: s.touched ? validateField("message", v) : null,
              }));
            }}
            onBlur={() =>
              setMessage((s) => ({ ...s, touched: true, error: validateField("message", s.value) }))
            }
            className={cn(inputBase, "resize-none", message.error && inputError)}
            placeholder={t("messagePlaceholder")}
            disabled={status === "submitting"}
            aria-invalid={!!message.error}
            aria-describedby={message.error ? "contact-message-error" : undefined}
          />
          {message.error && (
            <p id="contact-message-error" className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
              {message.error}
            </p>
          )}
        </div>

        {status === "error" && serverError && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {serverError}
          </p>
        )}

        {status === "success" && (
          <p className="text-sm text-green-600 dark:text-green-400" role="status">
            {t("success")}
          </p>
        )}

        <MagneticButton className="w-full">
          <div ref={rippleRef} className="btn-ripple w-full">
            <button
              type="submit"
              disabled={status === "submitting"}
              onClick={addRipple}
              className={cn(
                "min-h-[44px] w-full rounded-lg px-4 py-2 text-sm font-medium",
                "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
                "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                "disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              )}
              aria-busy={status === "submitting"}
            >
            {status === "submitting" ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {t("sending")}
              </span>
            ) : (
              t("submit")
            )}
            </button>
          </div>
        </MagneticButton>
      </div>
    </form>
  );
}
