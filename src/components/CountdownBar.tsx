import { useState, useEffect } from "react";

interface Props {
  /** ISO date string the countdown runs to, e.g. "2026-07-31T23:59:59". */
  targetDate: string;
  label?: string;
}

function remaining(target: string) {
  const ms = new Date(target).getTime() - Date.now();
  const clamped = Math.max(0, ms);
  return {
    done: ms <= 0,
    days: Math.floor(clamped / 86_400_000),
    hours: Math.floor((clamped / 3_600_000) % 24),
    minutes: Math.floor((clamped / 60_000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

function Unit({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex flex-col items-center leading-none">
      <span className="text-base font-bold tabular-nums">{String(n).padStart(2, "0")}</span>
      <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide opacity-70">
        {label}
      </span>
    </div>
  );
}

export default function CountdownBar({ targetDate, label = "Offer ends in" }: Props) {
  const [t, setT] = useState(() => remaining(targetDate));

  useEffect(() => {
    const id = setInterval(() => setT(remaining(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (t.done) return null;

  return (
    <div className="bg-brand-500 text-brand-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
        <div className="flex items-center gap-3">
          <Unit n={t.days} label="days" />
          <Unit n={t.hours} label="hrs" />
          <Unit n={t.minutes} label="min" />
          <Unit n={t.seconds} label="sec" />
        </div>
      </div>
    </div>
  );
}
