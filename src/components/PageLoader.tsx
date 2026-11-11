import React from "react";

// Branded activity indicator — used for route Suspense fallbacks.
export default function PageLoader({ compact = false, label }: { compact?: boolean; label?: string }) {
  return (
    <div
      className={"flex flex-col items-center justify-center gap-5 bg-ivory " + (compact ? "min-h-[320px]" : "min-h-[70vh]")}
      role="status"
      aria-label="Loading"
    >
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-[2px] border-line" />
        <div className="absolute inset-0 animate-spin rounded-full border-[2px] border-transparent border-t-gold-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="h-2 w-2 rotate-45 bg-gold-500" />
        </div>
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ink-400">{label || "Bonet Elite Services"}</p>
    </div>
  );
}
