"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

type Kind = "success" | "error" | "warning" | "info";
type Toast = { id: number; kind: Kind; message: string };

const Ctx = createContext<{ push: (kind: Kind, message: string) => void }>({ push: () => {} });

let id = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((kind: Kind, message: string) => {
    const t = { id: ++id, kind, message };
    setToasts((p) => [...p.slice(-3), t]);
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== t.id)), 5000);
  }, []);
  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div className="fixed top-20 right-4 z-[99999] flex flex-col gap-2 w-[min(92vw,380px)]" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              "flex items-center gap-3 rounded-xl px-4 py-3.5 text-white text-sm font-medium shadow-xl " +
              (t.kind === "success"
                ? "bg-gradient-to-br from-emerald-500 to-emerald-700"
                : t.kind === "error"
                ? "bg-gradient-to-br from-red-500 to-red-700"
                : t.kind === "warning"
                ? "bg-gradient-to-br from-amber-500 to-amber-700"
                : "bg-gradient-to-br from-blue-500 to-blue-700")
            }
          >
            {t.kind === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : t.kind === "error" ? <XCircle className="w-5 h-5 shrink-0" /> : t.kind === "warning" ? <AlertTriangle className="w-5 h-5 shrink-0" /> : <Info className="w-5 h-5 shrink-0" />}
            <span className="flex-1">{t.message}</span>
            <button onClick={() => setToasts((p) => p.filter((x) => x.id !== t.id))} aria-label="Dismiss" className="opacity-80 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

function usePusher() {
  return useContext(Ctx).push;
}

// Drop-in replacement for the old react-toastify based API.
export const modernToast = {
  success: (m: string) => window.dispatchEvent(new CustomEvent("bonet-toast", { detail: { kind: "success", message: m } })),
  error: (m: string) => window.dispatchEvent(new CustomEvent("bonet-toast", { detail: { kind: "error", message: m } })),
  warning: (m: string) => window.dispatchEvent(new CustomEvent("bonet-toast", { detail: { kind: "warning", message: m } })),
  info: (m: string) => window.dispatchEvent(new CustomEvent("bonet-toast", { detail: { kind: "info", message: m } })),
};

export function ToastBridge() {
  const push = usePusher();
  React.useEffect(() => {
    const fn = (e: Event) => {
      const d = (e as CustomEvent).detail as { kind: Kind; message: string };
      push(d.kind, d.message);
    };
    window.addEventListener("bonet-toast", fn);
    return () => window.removeEventListener("bonet-toast", fn);
  }, [push]);
  return null;
}

export const ModernToastContainer = () => null;
export default modernToast;
