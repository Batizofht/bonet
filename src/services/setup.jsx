"use client"
import { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { modernToast } from "@/components/ModernToast";
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

export default function InvestmentBusinessSetup() {
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [form] = Form.useForm();

  const openWhatsApp = () => {
    const phoneNumber = "250726300260";
    const webUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
    setTimeout(() => {
      window.open(webUrl, "_blank");
    }, 1500);
  };

  const handleSubmit = async (values) => {
    try {
      const res = await fetch(
        "https://api.bonet.rw:8443/bonetBackend/backend/public/investments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (res.ok) {
        modernToast.success(t("ContactMessage.success", { name: values.name }));
        form.resetFields();
        setIsPopupOpen(false);
      } else {
        modernToast.error(t("investmentBusinessSetup.toastMessages.errorSubmission"));
      }
    } catch (err) {
      modernToast.error(t("investmentBusinessSetup.toastMessages.errorServer"));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
          Services
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
          Investment & <span className="text-[#C9A84C]">Business Setup</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          {t("investmentBusinessSetup.title")}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mb-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="flex items-center gap-3 bg-[#C9A84C] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#B8973B] transition-colors duration-300"
          >
            <Phone className="w-5 h-5" />
            {t("investmentBusinessSetup.button.openModal")}
          </button>

          <button
            onClick={openWhatsApp}
            className="flex items-center gap-3 border border-gray-300 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            {t("travelHospitality.page.buttons.quickContact")}
          </button>
        </div>
      </div>

      {/* Service Cards */}
      <div className="space-y-8">
        {investmentServices.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.key}
              className={`flex flex-col lg:flex-row items-center overflow-hidden ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
            >
              {/* Image */}
              <div className="lg:w-2/5 w-full relative">
                <div className="relative overflow-hidden h-80">
                  <img
                    src={service.image}
                    alt={t(`investmentBusinessSetup.services.${service.key}.title`)}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-3/5 w-full p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className="w-7 h-7 text-[#C9A84C] flex-shrink-0" strokeWidth={1.5} />
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {t(`investmentBusinessSetup.services.${service.key}.title`)}
                  </h3>
                </div>
                <p className="text-gray-500 font-medium text-sm uppercase tracking-wide mb-6">
                  Professional business setup services
                </p>

                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  {t(`investmentBusinessSetup.services.${service.key}.description`)}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-4">
                  {["Expert Service", "24/7 Support", "Trusted Partner"].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup Form Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 border border-gray-200 my-auto max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <div>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#C9A84C] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("investmentBusinessSetup.modal.title")}
                </h3>
                <p className="text-gray-500">
                  {t("investmentBusinessSetup.modal.description")}
                </p>
              </div>

              <Form layout="vertical" form={form} onFinish={handleSubmit} className="space-y-4">
                <Form.Item
                  label={<span className="text-gray-700 font-semibold">{t("investmentBusinessSetup.modal.form.fullnames.label")}</span>}
                  name="fullnames"
                  rules={[{ required: true, message: t("investmentBusinessSetup.modal.form.fullnames.requiredMessage") }]}
                >
                  <Input
                    prefix={<Users className="w-4 h-4 text-gray-400" />}
                    placeholder={t("investmentBusinessSetup.modal.form.fullnames.placeholder")}
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-gray-700 font-semibold">{t("investmentBusinessSetup.modal.form.email.label")}</span>}
                  name="email"
                  rules={[
                    { required: true, message: t("investmentBusinessSetup.modal.form.email.requiredMessage") },
                    { type: "email", message: t("investmentBusinessSetup.modal.form.email.invalidMessage") },
                  ]}
                >
                  <Input
                    prefix={<MessageCircle className="w-4 h-4 text-gray-400" />}
                    placeholder={t("investmentBusinessSetup.modal.form.email.placeholder")}
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-gray-700 font-semibold">{t("investmentBusinessSetup.modal.form.phone_number.label")}</span>}
                  name="phone_number"
                  rules={[{ required: true, message: t("investmentBusinessSetup.modal.form.phone_number.requiredMessage") }]}
                >
                  <Input
                    prefix={<Phone className="w-4 h-4 text-gray-400" />}
                    placeholder={t("investmentBusinessSetup.modal.form.phone_number.placeholder")}
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-gray-700 font-semibold">{t("investmentBusinessSetup.modal.form.service_description.label")}</span>}
                  name="service_description"
                  rules={[{ required: true, message: t("investmentBusinessSetup.modal.form.service_description.requiredMessage") }]}
                >
                  <Input.TextArea
                    placeholder={t("investmentBusinessSetup.modal.form.service_description.placeholder")}
                    rows={4}
                  />
                </Form.Item>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    type="button"
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-semibold"
                  >
                    {t("investmentBusinessSetup.button.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#C9A84C] text-white font-semibold hover:bg-[#B8973B] transition-colors"
                  >
                    {t("investmentBusinessSetup.button.submit")}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}