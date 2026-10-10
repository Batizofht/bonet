"use client"
import { openWhatsApp, BONET_WHATSAPP } from "@/lib/whatsapp";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import { apiPost } from "@/lib/api";
import { modernToast } from "@/components/ui/toast";
import { User, Mail, Phone, MessageCircle, MapPin } from "lucide-react";
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
    <div className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-xl">
      <div className="mb-8">
        <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider">
          {t("contactInform.form.title")}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-2">
          {t("contactInformation.title.part1")} {t("contactInformation.title.part2")}
        </h2>
        <p className="text-gray-500 text-sm">
          {L("We'll get back to you within 24 hours","Nous vous répondrons dans les 24 heures","我们将在24小时内回复您")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label={t("contactInform.form.fullName")} error={errors.name} required>
          <TextInput
            icon={<User className="w-4 h-4 text-gray-400" />}
            placeholder={t("contactInform.form.fullName")}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            error={errors.name}
          />
        </Field>

        <Field label={t("contactInform.form.email")} error={errors.email} required>
          <TextInput
            icon={<Mail className="w-4 h-4 text-gray-400" />}
            placeholder={t("contactInform.form.email")}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            error={errors.email}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label={t("contactInform.form.phone")} error={errors.phone_number} required>
            <TextInput
              icon={<Phone className="w-4 h-4 text-gray-400" />}
              placeholder={t("contactInform.form.phone")}
              value={values.phone_number}
              onChange={(e) => set("phone_number", e.target.value)}
              error={errors.phone_number}
            />
          </Field>

          <Field label={t("contactInform.form.whatsapp")}>
            <TextInput
              icon={<MessageCircle className="w-4 h-4 text-gray-400" />}
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
          <SubmitButton loading={isLoading} className="rounded-lg text-base">
            {isLoading ? L("Sending...","Envoi en cours...","发送中...") : t("contactInform.form.submitButton")}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

const ContactInfo = ({ t, L }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-xl">
    <div className="mb-8">
      <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider">
        {t("contactInformation.title.part1")}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-3">
        {t("contactInformation.title.part2")}
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed">
        {t("contactInformation.description")}
      </p>
    </div>

    <button
      onClick={() => openWhatsApp({ phone: BONET_WHATSAPP })}
      className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold rounded-lg px-6 py-3 transition-colors duration-200 border-0 mb-8"
    >
      <MessageCircle className="w-5 h-5" />
      {t("contactInformation.chatButton")}
    </button>

    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <Phone className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
        <div>
          <p className="text-xs text-gray-500 mb-0.5">{t("contactInformation.callWhatsApp")}</p>
          <a href="tel:+250726300260" className="font-semibold text-gray-900 hover:text-[#C9A84C] transition-colors text-sm">
            +250 726 300 260
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Mail className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
        <div>
          <p className="text-xs text-gray-500 mb-0.5">{t("contactInformation.email")}</p>
          <a href="mailto:info@bonet.rw" className="font-semibold text-gray-900 hover:text-[#C9A84C] transition-colors text-sm">
            info@bonet.rw
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <MapPin className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
        <div>
          <p className="text-xs text-gray-500 mb-0.5">{L("Location","Adresse","地址")}</p>
          <p className="font-semibold text-gray-900 text-sm">{t("contactInformation.location")}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Phone className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
        <div>
          <p className="text-xs text-gray-500 mb-0.5">{t("contactInformation.hours")}</p>
          <p className="font-semibold text-gray-900 text-sm">{t("contactInformation.officeHours")}</p>
        </div>
      </div>
    </div>
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
    <div className="min-h-screen bg-white pb-16">
      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
        <ContactForm t={t} L={L} isLoading={isLoading} onFinish={handleSubmit} initialInquiry={initialInquiry} />
        <ContactInfo t={t} L={L} />
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">{L("Find Us","Nous trouver","找到我们")}</h3>
            <p className="text-sm text-gray-600 mt-1">{address}</p>
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
