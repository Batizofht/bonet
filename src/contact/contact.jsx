"use client"
import { openWhatsApp, BONET_WHATSAPP } from "@/lib/whatsapp";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import { apiPost } from "@/lib/api";
import { modernToast } from "@/components/ui/toast";
import { User, Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import {
  Field,
  TextInput,
  TextArea,
  Select,
  SubmitButton,
} from "@/components/ui/inputs";

const ALLOWED = ["consultation", "department", "transport", "businessSetup", "hotel"];

const emptyForm = {
  name: "",
  email: "",
  phone_number: "",
  whatsapp_number: "",
  inquiry_type: "",
  message: "",
};

const ContactForm = ({ t, L, isLoading, onFinish, initialInquiry }) => {
  const [values, setValues] = React.useState(emptyForm);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (initialInquiry && ALLOWED.includes(initialInquiry)) {
      setValues((p) => ({ ...p, inquiry_type: initialInquiry }));
    }
  }, [initialInquiry]);

  const set = (k, v) => {
    setValues((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = t("contactInform.form.validation.nameRequired");
    if (!values.email.trim()) e.email = t("contactInform.form.validation.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      e.email = t("contactInform.form.validation.emailInvalid");
    if (!values.phone_number.trim()) e.phone_number = t("contactInform.form.validation.phoneRequired");
    if (!values.inquiry_type) e.inquiry_type = t("contactInform.form.validation.inquiryRequired");
    if (!values.message.trim()) e.message = t("contactInform.form.validation.messageRequired");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onFinish(values, () => setValues(emptyForm));
  };

  return (
    <div className="card w-full p-7 shadow-[0_12px_30px_rgba(7,16,29,0.1)] md:p-10">
      <div className="mb-8">
        <p className="eyebrow">{t("contactInform.form.title")}</p>
        <h2 className="h-display mt-3 text-[1.6rem] md:text-[1.9rem]">
          {t("contactInformation.title.part1")} {t("contactInformation.title.part2")}
        </h2>
        <p className="mt-2 text-[15px] text-ink-500">
          {L("We'll get back to you within 24 hours","Nous vous répondrons dans les 24 heures","我们将在24小时内回复您")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label={t("contactInform.form.fullName")} error={errors.name} required>
          <TextInput
            icon={<User className="w-4 h-4" />}
            placeholder={t("contactInform.form.fullName")}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            error={errors.name}
          />
        </Field>

        <Field label={t("contactInform.form.email")} error={errors.email} required>
          <TextInput
            icon={<Mail className="w-4 h-4" />}
            placeholder={t("contactInform.form.email")}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            error={errors.email}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label={t("contactInform.form.phone")} error={errors.phone_number} required>
            <TextInput
              icon={<Phone className="w-4 h-4" />}
              placeholder={t("contactInform.form.phone")}
              value={values.phone_number}
              onChange={(e) => set("phone_number", e.target.value)}
              error={errors.phone_number}
            />
          </Field>

          <Field label={t("contactInform.form.whatsapp")}>
            <TextInput
              icon={<MessageCircle className="w-4 h-4" />}
              placeholder={t("contactInform.form.whatsapp")}
              value={values.whatsapp_number}
              onChange={(e) => set("whatsapp_number", e.target.value)}
            />
          </Field>
        </div>

        <Field label={t("contactInform.form.inquiryType")} error={errors.inquiry_type} required>
          <Select
            placeholder={t("contactInform.form.inquiryType")}
            value={values.inquiry_type || undefined}
            onChange={(v) => set("inquiry_type", v)}
            error={errors.inquiry_type}
            options={[
              { value: "consultation", label: L("Consultation","Consultation","咨询") },
              { value: "department", label: t("contactInform.form.inquiryOptions.department") },
              { value: "transport", label: t("contactInform.form.inquiryOptions.transport") },
              { value: "businessSetup", label: t("contactInform.form.inquiryOptions.businessSetup") },
              { value: "hotel", label: t("contactInform.form.inquiryOptions.hotel") },
              { value: "Other", label: L("Other","Autre","其他") },
            ]}
          />
        </Field>

        <Field label={t("contactInform.form.message")} error={errors.message} required>
          <TextArea
            placeholder={t("contactInform.form.message")}
            rows={4}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            error={errors.message}
          />
        </Field>

        <div className="mb-0">
          <SubmitButton loading={isLoading}>
            {isLoading ? L("Sending...","Envoi en cours...","发送中...") : t("contactInform.form.submitButton")}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

const ContactInfo = ({ t, L }) => (
  <div className="w-full rounded-[10px] bg-ink-900 p-7 text-white md:p-9">
    <p className="eyebrow eyebrow-light">{t("contactInformation.title.part1")} {t("contactInformation.title.part2")}</p>
    <p className="mt-3 font-display text-[1.3rem] font-semibold leading-snug">
      {L("Speak directly with our Kigali team", "Parlez directement à notre équipe de Kigali", "直接与我们的基加利团队沟通")}
    </p>
    <p className="mt-3 text-[15px] leading-relaxed text-white/65">{t("contactInformation.description")}</p>

    <button
      type="button"
      onClick={() => openWhatsApp({ phone: BONET_WHATSAPP })}
      className="btn mt-8 w-full bg-[#25D366] text-white hover:bg-[#1fb658]"
    >
      <MessageCircle className="h-5 w-5" />
      {t("contactInformation.chatButton")}
    </button>

    <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
      {[
        { icon: Phone, label: t("contactInformation.callWhatsApp"), value: "+250 726 300 260", href: "tel:+250726300260" },
        { icon: Mail, label: t("contactInformation.email"), value: "info@bonet.rw", href: "mailto:info@bonet.rw" },
        { icon: MapPin, label: L("Location","Adresse","地址"), value: t("contactInformation.location") },
        { icon: Clock, label: t("contactInformation.hours"), value: t("contactInformation.officeHours") },
      ].map(({ icon: Icon, label, value, href }) => (
        <li key={label} className="flex items-start gap-4 py-4">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
          <div>
            <p className="text-[12px] uppercase tracking-[0.12em] text-white/45">{label}</p>
            {href ? (
              <a href={href} className="text-[15px] font-semibold text-white hover:text-gold-300">{value}</a>
            ) : (
              <p className="text-[15px] font-semibold text-white">{value}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [initialInquiry, setInitialInquiry] = React.useState("");

  const address = t("contactInformation.location");
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2364.922861232644!2d30.196885738722248!3d-1.9949343189114284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19db57f46f8adc51%3A0xcfb8cdabf9203358!2sBonet%20Elite%20Services!5e1!3m2!1sen!2srw!4v1778120909980!5m2!1sen!2srw";

  React.useEffect(() => {
    const service = searchParams?.get("service");
    if (service && ALLOWED.includes(service)) {
      setInitialInquiry(service);
    } else {
      setInitialInquiry("");
    }
  }, [searchParams]);

  const handleSubmit = async (values, reset) => {
    setIsLoading(true);
    try {
      const data = await apiPost(
        "https://api.bonet.rw/bonetBackend/backend/public/comments",
        values
      );
      if (data && data.id) {
        modernToast.success(t("ContactMessage.success", { name: values.name }));
        reset();
      } else {
        modernToast.error(t("toast.error"));
      }
    } catch (error) {
      console.error(error);
      modernToast.error(t("toast.fail"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white pb-16 md:pb-24">
      <div className="container-x relative z-10 -mt-16 grid items-start gap-6 md:-mt-24 lg:grid-cols-[1.25fr_0.75fr]">
        <ContactForm t={t} L={L} isLoading={isLoading} onFinish={handleSubmit} initialInquiry={initialInquiry} />
        <ContactInfo t={t} L={L} />
      </div>

      <div className="container-x mt-12">
        <div className="card overflow-hidden">
          <div className="flex flex-col gap-1 border-b border-line px-7 py-6 md:flex-row md:items-center md:justify-between">
            <h3 className="text-[1.15rem] font-semibold text-ink-900">{L("Find Us","Nous trouver","找到我们")}</h3>
            <p className="text-[15px] text-ink-500">{address}</p>
          </div>
          <div className="w-full aspect-[16/10] sm:aspect-[16/7]">
            <iframe
              title="Bonet Elite Services Location"
              src={mapSrc}
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
