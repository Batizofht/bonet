"use client"
import { openWhatsApp, BONET_WHATSAPP } from "@/lib/whatsapp";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { apiPost } from "@/lib/api";
import { modernToast } from "@/components/ui/toast";
import { Field, TextInput, TextArea, SubmitButton } from "@/components/ui/inputs";
import {
  Phone,
  MessageCircle,
  Building,
  FileText,
  ClipboardCheck,
  Award,
  Search,
  Rocket,
  Target,
  X,
  Users
} from "lucide-react";

const investmentServices = [
  { key: "service1", image: "../assets/images/rdb.jpg", icon: Building },
  { key: "service2", image: "../assets/images/cert.jpg", icon: Award },
  { key: "service3", image: "../assets/images/rra.jpg", icon: FileText },
  { key: "service4", image: "../assets/images/rra1.jpg", icon: ClipboardCheck },
  { key: "service5", image: "../assets/images/rdb2.jpg", icon: Search },
  { key: "service6", image: "../assets/images/kg6.jpg", icon: Rocket },
];

const initialValues = {
  fullnames: "",
  email: "",
  phone_number: "",
  service_description: "",
};

export default function InvestmentBusinessSetup() {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k, v) => {
    setValues((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const handleOpenWhatsApp = () => openWhatsApp({ phone: BONET_WHATSAPP });

  const validate = () => {
    const next = {};
    if (!values.fullnames.trim())
      next.fullnames = t("investmentBusinessSetup.modal.form.fullnames.requiredMessage");
    if (!values.email.trim()) {
      next.email = t("investmentBusinessSetup.modal.form.email.requiredMessage");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = t("investmentBusinessSetup.modal.form.email.invalidMessage");
    }
    if (!values.phone_number.trim())
      next.phone_number = t("investmentBusinessSetup.modal.form.phone_number.requiredMessage");
    if (!values.service_description.trim())
      next.service_description = t("investmentBusinessSetup.modal.form.service_description.requiredMessage");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await apiPost(
        "https://api.bonet.rw/bonetBackend/backend/public/investments",
        values
      );
      modernToast.success(t("ContactMessage.success", { name: values.fullnames }));
      setValues(initialValues);
      setErrors({});
      setIsPopupOpen(false);
    } catch (err) {
      modernToast.error(t("investmentBusinessSetup.toastMessages.errorServer"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
              {L("Services","Services","服务")}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
              {L("Investment & Business Setup","Investissement et Création d'Entreprise","投资与企业设立")}
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              {t("investmentBusinessSetup.title")}
            </p>

            {/* Buttons */}
            <div className="flex justify-center mt-10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#C9A84C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8973B] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {t("investmentBusinessSetup.button.openModal")}
                </button>

                <button
                  onClick={handleOpenWhatsApp}
                  className="inline-flex items-center gap-2 border border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t("travelHospitality.page.buttons.quickContact")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid gap-10">
            {investmentServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.key}
                  className={`flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Image */}
                  <div className="lg:w-2/5 w-full">
                    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 h-80">
                      <img
                        src={service.image}
                        alt={t(`investmentBusinessSetup.services.${service.key}.title`)}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-3/5 w-full px-0 lg:px-12 py-8 lg:py-0">
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className="w-6 h-6 text-[#C9A84C] flex-shrink-0" strokeWidth={1.5} />
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                        {t(`investmentBusinessSetup.services.${service.key}.title`)}
                      </h3>
                    </div>
                    <p className="text-gray-500 font-medium text-xs uppercase tracking-wide mt-3 mb-4">
                      {t(`investmentBusinessSetup.services.${service.key}.subtitle`)}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {t(`investmentBusinessSetup.services.${service.key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popup Form Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-xl w-full max-w-md p-6 md:p-8 border border-gray-200 my-auto max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <div>
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t("investmentBusinessSetup.modal.title")}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t("investmentBusinessSetup.modal.description")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Field
                  label={t("investmentBusinessSetup.modal.form.fullnames.label")}
                  error={errors.fullnames}
                  required
                >
                  <TextInput
                    icon={<Users className="w-4 h-4" />}
                    placeholder={t("investmentBusinessSetup.modal.form.fullnames.placeholder")}
                    value={values.fullnames}
                    onChange={(e) => set("fullnames", e.target.value)}
                    error={errors.fullnames}
                  />
                </Field>

                <Field
                  label={t("investmentBusinessSetup.modal.form.email.label")}
                  error={errors.email}
                  required
                >
                  <TextInput
                    icon={<MessageCircle className="w-4 h-4" />}
                    placeholder={t("investmentBusinessSetup.modal.form.email.placeholder")}
                    type="email"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    error={errors.email}
                  />
                </Field>

                <Field
                  label={t("investmentBusinessSetup.modal.form.phone_number.label")}
                  error={errors.phone_number}
                  required
                >
                  <TextInput
                    icon={<Phone className="w-4 h-4" />}
                    placeholder={t("investmentBusinessSetup.modal.form.phone_number.placeholder")}
                    value={values.phone_number}
                    onChange={(e) => set("phone_number", e.target.value)}
                    error={errors.phone_number}
                  />
                </Field>

                <Field
                  label={t("investmentBusinessSetup.modal.form.service_description.label")}
                  error={errors.service_description}
                  required
                >
                  <TextArea
                    placeholder={t("investmentBusinessSetup.modal.form.service_description.placeholder")}
                    rows={4}
                    value={values.service_description}
                    onChange={(e) => set("service_description", e.target.value)}
                    error={errors.service_description}
                  />
                </Field>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    type="button"
                    className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-semibold"
                  >
                    {t("investmentBusinessSetup.button.cancel")}
                  </button>
                  <SubmitButton
                    loading={loading}
                    className="w-auto px-6 py-3 min-h-0 text-base rounded-lg"
                  >
                    {t("investmentBusinessSetup.button.submit")}
                  </SubmitButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
