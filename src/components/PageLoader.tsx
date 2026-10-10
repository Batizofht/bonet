import React from "react";

// Cool centered activity indicator — used for route Suspense fallbacks
// instead of ugly top-left "Loading..." text.
export default function PageLoader({ compact = false, label }: { compact?: boolean; label?: string }) {
  return (
    <div
      className={
        "flex flex-col items-center justify-center gap-5 bg-white " +
        (compact ? "min-h-[320px]" : "min-h-[70vh]")
      }
      role="status"
      aria-label="Loading"
    >
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-[3px] border-gray-200" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#C9A84C] animate-spin" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-b-[#C9A84C]/50 animate-spin [animation-duration:1.6s] [animation-direction:reverse]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-[#C9A84C] animate-pulse" />
        </div>
      </div>
      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">
        {label || "Bonet Elite Services"}
      </p>
    </div>
  );
}
