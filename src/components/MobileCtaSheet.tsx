import { useState } from "react";
import { X } from "lucide-react";
import EmailForm from "./EmailForm";

interface Props {
  ctaLabel?: string;
  submitLabel?: string;
  sheetTitle?: string;
  sheetBody?: string;
}

// Mobile-only: a sticky bottom button that slides up a form sheet.
// Hidden on desktop (the sticky sidebar card handles signups there).
export default function MobileCtaSheet({
  ctaLabel = "Get instant access",
  submitLabel = "Get instant access",
  sheetTitle = "Get instant access",
  sheetBody = "Enter your details and we'll send it straight to your inbox.",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full rounded-control bg-brand-500 px-6 py-4 text-base font-semibold text-brand-ink transition active:translate-y-px"
        >
          {ctaLabel}
        </button>
      </div>

      {/* Sheet overlay + panel */}
      <div
        className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-line bg-surface p-5 shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Header: title inline with the close X (no drag handle) */}
          <div className="flex items-start justify-between gap-4">
            <p className="text-xl font-bold text-ink">{sheetTitle}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="-mr-1 -mt-1 shrink-0 p-1 text-ink-muted transition hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mb-4 mt-1.5 text-sm text-ink-muted">{sheetBody}</p>
          <EmailForm submitLabel={submitLabel} />
          <p className="mt-3 text-center text-xs text-ink-muted">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
