import { useState, useRef, useEffect } from "react";
import NumberFlow from "@number-flow/react";

interface Plan {
  amount: number; // 49
  suffix: string; // "/mo"
  href: string;
}

interface Props {
  monthly: Plan;
  annual: Plan;
  annualNote?: string; // "2 months free"
  ctaLabel?: string;
}

// Membership pricing: content-sized monthly/annual toggle with a pill that
// glides + resizes between options, plus a counting price animation.
export default function PricingToggle({
  monthly,
  annual,
  annualNote = "2 months free",
  ctaLabel = "Get instant access",
}: Props) {
  const [plan, setPlan] = useState<"monthly" | "annual">("annual");
  const monthlyRef = useRef<HTMLButtonElement>(null);
  const annualRef = useRef<HTMLButtonElement>(null);
  const [pill, setPill] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const [animate, setAnimate] = useState(false);
  const current = plan === "annual" ? annual : monthly;

  useEffect(() => {
    const measure = () => {
      const el = plan === "annual" ? annualRef.current : monthlyRef.current;
      if (el) {
        setPill({
          left: el.offsetLeft,
          top: el.offsetTop,
          width: el.offsetWidth,
          height: el.offsetHeight,
        });
      }
    };
    measure();
    // Enable the slide only after the first positioning (so it doesn't slide in on load).
    const id = requestAnimationFrame(() => setAnimate(true));
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, [plan]);

  return (
    <div>
      {/* Sliding toggle (buttons size to content) */}
      <div className="relative mx-auto flex w-fit items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1">
        {pill && (
          <div
            className={`absolute z-0 rounded-full bg-brand-500 ${
              animate ? "transition-all duration-300 ease-in-out" : ""
            }`}
            style={{ left: pill.left, top: pill.top, width: pill.width, height: pill.height }}
            aria-hidden="true"
          />
        )}
        <button
          ref={monthlyRef}
          type="button"
          onClick={() => setPlan("monthly")}
          className={`relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
            plan === "monthly" ? "text-brand-ink" : "text-ink-dark/70"
          }`}
        >
          Monthly
        </button>
        <button
          ref={annualRef}
          type="button"
          onClick={() => setPlan("annual")}
          className={`relative z-10 flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
            plan === "annual" ? "text-brand-ink" : "text-ink-dark/70"
          }`}
        >
          Annual
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide transition-colors duration-300 ${
              plan === "annual" ? "bg-brand-ink/15 text-brand-ink" : "bg-brand-500/20 text-brand-400"
            }`}
          >
            {annualNote}
          </span>
        </button>
      </div>

      {/* Counting price */}
      <div className="mt-7 text-center">
        <div className="inline-flex items-baseline justify-center">
          <NumberFlow
            value={current.amount}
            format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
            className="text-5xl font-extrabold leading-none text-brand-400"
            transformTiming={{ duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }}
          />
          <span className="ml-1 text-xl font-bold text-ink-dark/60">{current.suffix}</span>
        </div>
        <p className="mt-2 text-xs text-ink-dark/50">
          {plan === "annual"
            ? "Billed yearly. Cancel anytime."
            : "Billed monthly. Cancel anytime."}
        </p>
      </div>

      {/* CTA */}
      <a
        href={current.href}
        className="mt-6 block rounded-control bg-brand-500 px-6 py-4 text-center text-base font-bold text-brand-ink transition hover:bg-brand-600 active:translate-y-px"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
