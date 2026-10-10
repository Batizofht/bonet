"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Check, Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "./cn";

/* ---------- shared ---------- */
export const inputBase =
  "w-full min-h-[52px] rounded-xl border border-gray-200 bg-white px-4 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 hover:border-[#C9A84C]/50 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 disabled:opacity-60 disabled:bg-gray-50";

export function Field({
  label,
  error,
  children,
  required,
  className,
}: {
  label?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-[#C9A84C]">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-red-600 leading-snug mt-0.5">{error}</p>}
    </div>
  );
}

export function SectionTitle({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
      <span className="text-[#C9A84C] inline-flex">{icon}</span>
      {children}
    </h3>
  );
}

/* ---------- text inputs ---------- */
export function TextInput({
  icon,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode; error?: string }) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none inline-flex">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={cn(inputBase, icon && "pl-11", error && "border-red-400 focus:border-red-500 focus:ring-red-100", className)}
      />
    </div>
  );
}

export function TextArea({
  error,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return (
    <textarea
      {...props}
      className={cn(
        inputBase,
        "min-h-[112px] py-3 resize-y leading-relaxed",
        error && "border-red-400",
        className
      )}
    />
  );
}

export function NumberInput({
  icon,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode; error?: string }) {
  return (
    <TextInput icon={icon} error={error} type="number" inputMode="numeric" className={cn("[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none", className)} {...props} />
  );
}

/* ---------- Select ---------- */
export type Option = { value: string; label: React.ReactNode; search?: string };

function useClickOutside(ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [ref, onClose]);
}

export function Select({
  value,
  onChange,
  options,
  placeholder,
  error,
  multiple,
  disabled,
}: {
  value: string | string[] | undefined;
  onChange: (v: any) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  multiple?: boolean;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const filtered = useMemo(() => {
    if (!q) return options;
    const s = q.toLowerCase();
    return options.filter((o) => (o.search ?? String(o.label)).toLowerCase().includes(s));
  }, [q, options]);

  const label = useMemo(() => {
    if (multiple) {
      const arr = (value as string[]) ?? [];
      if (!arr.length) return null;
      return options.filter((o) => arr.includes(o.value)).map((o) => String(o.label)).join(", ");
    }
    return options.find((o) => o.value === value)?.label ?? null;
  }, [value, options, multiple]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          inputBase,
          "flex items-center justify-between gap-2 text-left pr-10",
          !label && "text-gray-400",
          error && "border-red-400",
          open && "border-[#C9A84C] ring-2 ring-[#C9A84C]/20"
        )}
      >
        <span className="truncate">{label || placeholder || "Select..."}</span>
        <ChevronDown className={cn("w-4 h-4 shrink-0 text-gray-400 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute z-40 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5 overflow-hidden">
          {options.length > 6 && (
            <div className="p-2 border-b border-gray-100">
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#C9A84C]"
              />
            </div>
          )}
          <ul className="max-h-60 overflow-auto p-1.5">
            {filtered.map((o) => {
              const active = multiple ? (value as string[] ?? []).includes(o.value) : value === o.value;
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    onClick={() => {
                      if (multiple) {
                        const arr = new Set((value as string[]) ?? []);
                        if (arr.has(o.value)) arr.delete(o.value);
                        else arr.add(o.value);
                        onChange([...arr]);
                      } else {
                        onChange(o.value);
                        setOpen(false);
                      }
                    }}
                    className={cn(
                      "w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm text-left transition-colors",
                      active ? "bg-[#C9A84C]/10 text-[#8a7326] font-semibold" : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <span className="truncate">{o.label}</span>
                    {active && <Check className="w-4 h-4 shrink-0" />}
                  </button>
                </li>
              );
            })}
            {!filtered.length && <li className="px-3 py-4 text-sm text-gray-400 text-center">No options</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------- Calendar core (no deps) ---------- */
function toISO(d: Date) {
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}
function parseISO(s?: string): Date | null {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}
export function formatISODate(iso?: string, locale = "en-GB") {
  const d = parseISO(iso);
  if (!d) return "";
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

function CalendarGrid({
  cursor,
  setCursor,
  start,
  end,
  single,
  onPick,
  minDate,
}: {
  cursor: Date;
  setCursor: (d: Date) => void;
  start?: string;
  end?: string;
  single?: string;
  onPick: (iso: string) => void;
  minDate?: string;
}) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  // Monday-first grid
  const lead = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const min = parseISO(minDate)?.getTime();
  const sT = parseISO(start)?.getTime();
  const eT = parseISO(end)?.getTime();

  return (
    <div className="p-3 w-[300px]">
      <div className="flex items-center justify-between mb-2">
        <button type="button" className="rounded-lg px-2.5 py-1.5 text-sm hover:bg-gray-100" onClick={() => setCursor(new Date(year, month - 1, 1))} aria-label="Prev month">‹</button>
        <p className="text-sm font-bold text-gray-900">
          {cursor.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
        </p>
        <button type="button" className="rounded-lg px-2.5 py-1.5 text-sm hover:bg-gray-100" onClick={() => setCursor(new Date(year, month + 1, 1))} aria-label="Next month">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-gray-400 mb-1">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => <span key={d} className="py-1">{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const iso = toISO(d);
          const t = d.getTime();
          const disabled = min != null && t < min;
          const isSingle = single === iso;
          const inRange = sT != null && eT != null && t >= Math.min(sT, eT) && t <= Math.max(sT, eT);
          const isEdge = start === iso || end === iso;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onPick(iso)}
              className={cn(
                "h-9 rounded-lg text-[13px] transition-colors",
                disabled && "text-gray-300 cursor-not-allowed",
                !disabled && !isSingle && !isEdge && !inRange && "text-gray-700 hover:bg-gray-100",
                !disabled && inRange && !isEdge && "bg-[#C9A84C]/15 text-gray-900",
                (isSingle || isEdge) && "bg-[#C9A84C] text-white font-bold hover:bg-[#B8973B]"
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- DatePicker (single) ---------- */
export function DatePicker({
  value,
  onChange,
  placeholder,
  error,
  minDate,
}: {
  value?: string; // YYYY-MM-DD
  onChange: (iso: string) => void;
  placeholder?: string;
  error?: string;
  minDate?: string;
}) {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => parseISO(value) ?? new Date());
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));
  useEffect(() => { if (value) { const d = parseISO(value); if (d) setCursor(d); } }, [value]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(inputBase, "flex items-center gap-3 text-left", !value && "text-gray-400", error && "border-red-400", open && "border-[#C9A84C] ring-2 ring-[#C9A84C]/20")}
      >
        <CalendarIcon className="w-4 h-4 text-gray-400 shrink-0" />
        <span className={value ? "text-gray-900" : ""}>{value ? formatISODate(value) : placeholder || "Select date"}</span>
      </button>
      {open && (
        <div className="absolute z-40 mt-2 rounded-xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10 overflow-hidden">
          <CalendarGrid cursor={cursor} setCursor={setCursor} single={value} minDate={minDate} onPick={(iso) => { onChange(iso); setOpen(false); }} />
        </div>
      )}
    </div>
  );
}

/* ---------- DateRangePicker ---------- */
export function DateRangePicker({
  value,
  onChange,
  error,
  startPlaceholder,
  endPlaceholder,
}: {
  value?: [string | undefined, string | undefined];
  onChange: (v: [string, string] | [undefined, undefined]) => void;
  error?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => parseISO(value?.[0]) ?? new Date());
  const [start, end] = value ?? [undefined, undefined];
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const pick = (iso: string) => {
    if (!start || (start && end)) onChange([iso, undefined as any]);
    else if (start && !end) {
      const a = parseISO(start)!.getTime();
      const b = parseISO(iso)!.getTime();
      onChange(a <= b ? [start, iso] : [iso, start]);
      if (a <= b) setOpen(false);
    }
  };

  const label = start && end ? `${formatISODate(start)} → ${formatISODate(end)}` : start ? `${formatISODate(start)} → …` : null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(inputBase, "flex items-center gap-3 text-left", !label && "text-gray-400", error && "border-red-400", open && "border-[#C9A84C] ring-2 ring-[#C9A84C]/20")}
      >
        <CalendarIcon className="w-4 h-4 text-gray-400 shrink-0" />
        <span className={label ? "text-gray-900" : ""}>{label || `${startPlaceholder || "Check-in"}  →  ${endPlaceholder || "Check-out"}`}</span>
        {(start || end) && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onChange([undefined, undefined]); }}
            onKeyDown={(e) => { if (e.key === "Enter") onChange([undefined, undefined]); }}
            className="ml-auto text-gray-400 hover:text-gray-600 text-lg leading-none px-1"
            aria-label="Clear dates"
          >
            ×
          </span>
        )}
      </button>
      {open && (
        <div className="absolute z-40 mt-2 rounded-xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10 overflow-hidden">
          <CalendarGrid cursor={cursor} setCursor={setCursor} start={start} end={end} minDate={toISO(new Date())} onPick={pick} />
          <p className="px-3 pb-3 text-xs text-gray-400">{!start ? "Select check-in" : !end ? "Select check-out" : "Done"}</p>
        </div>
      )}
    </div>
  );
}

/* ---------- TimePicker ---------- */
const SLOTS = Array.from({ length: 48 }, (_, i) => {
  const h = `${Math.floor(i / 2)}`.padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

export function TimePicker({
  value,
  onChange,
  placeholder,
  error,
}: {
  value?: string; // HH:mm
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(inputBase, "flex items-center gap-3 text-left", !value && "text-gray-400", error && "border-red-400", open && "border-[#C9A84C] ring-2 ring-[#C9A84C]/20")}
      >
        <Clock className="w-4 h-4 text-gray-400 shrink-0" />
        <span className={value ? "text-gray-900" : ""}>{value || placeholder || "Select time"}</span>
      </button>
      {open && (
        <ul className="absolute z-40 mt-2 w-full max-h-60 overflow-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl shadow-gray-900/10">
          {SLOTS.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => { onChange(s); setOpen(false); }}
                className={cn("w-full rounded-lg px-3 py-2 text-sm text-left", value === s ? "bg-[#C9A84C]/10 font-bold text-[#8a7326]" : "text-gray-700 hover:bg-gray-50")}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- Radio / Switch / Submit ---------- */
export function RadioGroup({
  value,
  onChange,
  options,
}: {
  value?: string;
  onChange: (v: string) => void;
  options: { value: string; label: React.ReactNode }[];
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={cn(
            "rounded-xl border px-4 py-3 text-sm font-medium transition-all",
            value === o.value
              ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#8a7326] ring-2 ring-[#C9A84C]/20"
              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="inline-flex items-center gap-3">
      <span className={cn("relative h-7 w-12 rounded-full transition-colors", checked ? "bg-[#C9A84C]" : "bg-gray-300")}>
        <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all", checked ? "left-6" : "left-1")} />
      </span>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </button>
  );
}

export function SubmitButton({ loading, children, className }: { loading?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(
        "w-full min-h-[56px] rounded-xl text-lg font-semibold bg-[#C9A84C] hover:bg-[#B8973B] text-white transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 px-6",
        className
      )}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
