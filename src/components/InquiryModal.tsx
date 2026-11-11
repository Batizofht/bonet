"use client";
import { useEffect, useState } from "react";
import { X, Users, Mail, Phone } from "lucide-react";
import { apiPost } from "@/lib/api";
import { modernToast } from "@/components/ui/toast";
import { Field, TextInput, TextArea, SubmitButton } from "@/components/ui/inputs";
import { useScrollLock } from "@/lib/useScrollLock";

export type InquiryLabels = {
  title: string;
  description: string;
  name: { label: string; placeholder: string; error: string };
  email: { label: string; placeholder: string; required: string; invalid: string };
  phone: { label: string; placeholder: string; error: string };
  message: { label: string; placeholder: string; error: string };
  cancel: string;
  submit: string;
  success: (name: string) => string;
  serverError: string;
};

const empty = { fullnames: "", email: "", phone_number: "", service_description: "" };
type Values = typeof empty;

/** One inquiry form for every service page — same fields, same API shape */
export default function InquiryModal({
  open,
  onClose,
  endpoint,
  labels,
}: {
  open: boolean;
  onClose: () => void;
  endpoint: string;
  labels: InquiryLabels;
}) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [loading, setLoading] = useState(false);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, onClose]);

  const set = (k: keyof Values, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = () => {
    const n: Partial<Record<keyof Values, string>> = {};
    if (!values.fullnames.trim()) n.fullnames = labels.name.error;
    if (!values.email.trim()) n.email = labels.email.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) n.email = labels.email.invalid;
    if (!values.phone_number.trim()) n.phone_number = labels.phone.error;
    if (!values.service_description.trim()) n.service_description = labels.message.error;
    setErrors(n);
    return Object.keys(n).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await apiPost(endpoint, values);
      modernToast.success(labels.success(values.fullnames));
      setValues(empty);
      setErrors({});
      onClose();
    } catch {
      modernToast.error(labels.serverError);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-ink-950/60 p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-[10px] bg-white shadow-2xl animate-modalIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-ink-pattern px-7 pb-7 pt-8 text-white md:px-9">
          <button type="button" onClick={onClose} aria-label="Close" className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/10">
            <X className="h-4 w-4" />
          </button>
          <p className="eyebrow eyebrow-light">Bonet Elite</p>
          <h3 id="inquiry-title" className="mt-2 pr-10 text-[1.35rem] font-semibold leading-snug text-white">{labels.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">{labels.description}</p>
        </div>
        <form onSubmit={submit} className="max-h-[70vh] space-y-4 overflow-y-auto px-7 py-7 md:px-9">
          <Field label={labels.name.label} error={errors.fullnames} required>
            <TextInput icon={<Users className="h-4 w-4" />} placeholder={labels.name.placeholder} value={values.fullnames} onChange={(e) => set("fullnames", e.target.value)} error={errors.fullnames} autoComplete="name" />
          </Field>
          <Field label={labels.email.label} error={errors.email} required>
            <TextInput icon={<Mail className="h-4 w-4" />} type="email" placeholder={labels.email.placeholder} value={values.email} onChange={(e) => set("email", e.target.value)} error={errors.email} autoComplete="email" />
          </Field>
          <Field label={labels.phone.label} error={errors.phone_number} required>
            <TextInput icon={<Phone className="h-4 w-4" />} type="tel" placeholder={labels.phone.placeholder} value={values.phone_number} onChange={(e) => set("phone_number", e.target.value)} error={errors.phone_number} autoComplete="tel" />
          </Field>
          <Field label={labels.message.label} error={errors.service_description} required>
            <TextArea rows={4} placeholder={labels.message.placeholder} value={values.service_description} onChange={(e) => set("service_description", e.target.value)} error={errors.service_description} />
          </Field>
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="btn btn-outline">{labels.cancel}</button>
            <SubmitButton loading={loading} className="w-auto min-h-[2.875rem] rounded-md px-6 text-[0.875rem]">{labels.submit}</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
