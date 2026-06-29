import { useState, type FormEvent } from "react";
import { site } from "../config";
import { FlowButton } from "./FlowButton";

interface Props {
  /** Kit (ConvertKit) form id. Defaults to the one in config.ts. */
  formId?: string;
  submitLabel?: string;
  placeholder?: string;
  /** Message shown after a successful signup. */
  successMessage?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function EmailForm({
  formId = site.kitFormId,
  submitLabel = "Get instant access",
  placeholder = "you@email.com",
  successMessage = "You're in. Check your inbox for the download.",
}: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!firstName || !email || status === "loading") return;
    setStatus("loading");
    try {
      // Kit static form subscribe - no API key needed on the client.
      const res = await fetch(`https://app.kit.com/forms/${formId}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email_address: email, first_name: firstName }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-control border border-line bg-surface-2 px-5 py-4 text-base text-ink"
      >
        {successMessage}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate>
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="lead-firstname"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            First name <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-firstname"
            name="first_name"
            type="text"
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            placeholder="Your first name"
            className="w-full rounded-control border border-line bg-card px-4 py-3.5 text-base text-ink placeholder:text-ink-muted outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
          />
        </div>

        <div>
          <label
            htmlFor="lead-email"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder={placeholder}
            className="w-full rounded-control border border-line bg-card px-4 py-3.5 text-base text-ink placeholder:text-ink-muted outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
          />
        </div>

        {/* Desktop: animated flow button. mt-6 matches the field-to-field box
            spacing (gap + the label height the button doesn't have). */}
        <div className="mt-6 hidden lg:block">
          <FlowButton
            text={status === "loading" ? "Sending..." : submitLabel}
            type="submit"
            disabled={status === "loading"}
          />
        </div>

        {/* Mobile: solid button (flow button's hover animation is pointless on touch) */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-6 w-full rounded-control bg-brand-500 px-6 py-4 text-base font-semibold text-brand-ink transition hover:bg-brand-600 active:translate-y-px disabled:opacity-70 lg:hidden"
        >
          {status === "loading" ? "Sending..." : submitLabel}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
