import { ArrowRight } from "lucide-react";

interface Props {
  text: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

// Animated CTA button (sliding arrows + expanding fill + corner morph).
// Adapted from a 21st.dev component to use our design tokens instead of
// hardcoded colours, so it themes with the rest of the kit.
export function FlowButton({ text, type = "button", disabled, className = "" }: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`group relative flex w-full items-center justify-center gap-1 overflow-hidden rounded-control border border-line bg-transparent px-8 py-4 text-base [font-weight:var(--btn-weight)] [text-transform:var(--btn-transform)] text-ink transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white active:scale-[0.97] disabled:opacity-70 ${className}`}
    >
      {/* Left arrow (slides in on hover) */}
      <ArrowRight className="absolute left-[-25%] z-[9] h-4 w-4 fill-none stroke-ink transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:left-4 group-hover:stroke-white" />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 transition-all duration-[800ms] ease-out group-hover:translate-x-3">
        {text}
      </span>

      {/* Expanding fill */}
      <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500 opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:h-[520px] group-hover:w-[520px] group-hover:opacity-100"></span>

      {/* Right arrow (slides out on hover) */}
      <ArrowRight className="absolute right-4 z-[9] h-4 w-4 fill-none stroke-ink transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:right-[-25%] group-hover:stroke-white" />
    </button>
  );
}
