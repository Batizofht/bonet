"use client"
import { useState } from "react";
import { Form, Input, Typography } from "antd";
import { modernToast } from "@/components/ModernToast";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { 
  Phone, 
  MessageCircle, 
  X, 
  TrendingUp, 
  BarChart3, 
  DollarSign, 
  ClipboardCheck,
  Target,
  Users,
  Mail,
  FileText,
  Lightbulb
} from "lucide-react";

const services = [
  {
    titleKey: "businessConsulting.services.businessPlan.title",
    subtitleKey: "businessConsulting.services.businessPlan.subtitle",
    descriptionKey: "businessConsulting.services.businessPlan.description",
    image: "../assets/images/dev.webp",
    align: "left",
    icon: Target,
  },
  {
    titleKey: "businessConsulting.services.projectPlanning.title",
    subtitleKey: "businessConsulting.services.projectPlanning.subtitle",
    descriptionKey: "businessConsulting.services.projectPlanning.description",
    image: "../assets/images/ff.jpg",
    align: "right",
    icon: BarChart3,
  },
  {
    titleKey: "businessConsulting.services.financialAdvisory.title",
    subtitleKey: "businessConsulting.services.financialAdvisory.subtitle",
    descriptionKey: "businessConsulting.services.financialAdvisory.description",
    image: "../assets/images/rr.webp",
    align: "left",
    icon: DollarSign,
  },
  {
    titleKey: "businessConsulting.services.auditing.title",
    subtitleKey: "businessConsulting.services.auditing.subtitle",
    descriptionKey: "businessConsulting.services.auditing.description",
    image: "../assets/images/audit.jpg",
    align: "right",
    icon: ClipboardCheck,
  },
];

export default function BusinessConsulting() {
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [form] = Form.useForm();

  const openWhatsApp = () => {
    const phoneNumber = "250726300260";
    const appUrl = `whatsapp://send?phone=${phoneNumber}`;
    const webUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    window.location.href = appUrl;
    setTimeout(() => {
      window.open(webUrl, "_blank");
    }, 1500);
  };

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(
        "https://api.bonet.rw:8443/bonetBackend/backend/public/consulting",
        values
      );

      if (res.status === 200 || res.status === 201) {
        modernToast.success(t("ContactMessage.success", { name: values.name }));
        form.resetFields();
        setIsPopupOpen(false);
      } else {
        modernToast.error(t("businessConsulting.toast.error"));
      }
    } catch (err) {
      modernToast.error(t("businessConsulting.toast.serverError"));
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
          Business <span className="text-[#C9A84C]">Consulting</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          {t("businessConsulting.title")}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mb-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="flex items-center gap-3 bg-[#C9A84C] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#B8973B] transition-colors duration-300"
          >
            <Lightbulb className="w-5 h-5" />
            {t("businessConsulting.cta")}
          </button>

          <button
            onClick={openWhatsApp}
            className="flex items-center gap-3 border border-gray-300 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            {t("businessConsulting.quickContact")}
          </button>
        </div>
      </div>

      {/* Service Cards */}
      <div className="space-y-12">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center overflow-hidden ${
                service.align === "right" ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="lg:w-2/5 w-full relative">
                <div className="relative overflow-hidden h-80 lg:h-96">
                  <img
                    src={service.image}
                    alt={t(service.titleKey)}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-3/5 w-full p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className="w-7 h-7 text-[#C9A84C] flex-shrink-0" strokeWidth={1.5} />
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {t(service.titleKey)}
                  </h3>
                </div>
                <p className="text-gray-500 font-medium text-sm uppercase tracking-wide mb-6">
                  {t(service.subtitleKey)}
                </p>

                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  {t(service.descriptionKey)}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-4">
                  {["Strategic Planning", "Expert Guidance", "Proven Results"].map((feature, i) => (
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

      {/* Popup Modal */}
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
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("businessConsulting.title")}
                </h3>
                <p className="text-gray-500">
                  {t("businessConsulting.form.instructions")}
                </p>
              </div>

              <Form
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
                className="space-y-4"
              >
                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold">
                      {t("businessConsulting.form.fullnames.label")}
                    </span>
                  }
                  name="fullnames"
                  rules={[
                    {
                      required: true,
                      message: t("businessConsulting.form.fullnames.error"),
                    },
                  ]}
                >
                  <Input
                    prefix={<Users className="w-4 h-4 text-gray-400" />}
                    placeholder={t("businessConsulting.form.fullnames.placeholder")}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold">
                      {t("businessConsulting.form.email.label")}
                    </span>
                  }
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: t("businessConsulting.form.email.required"),
                    },
                    {
                      type: "email",
                      message: t("businessConsulting.form.email.invalid"),
                    },
                  ]}
                >
                  <Input
                    prefix={<Mail className="w-4 h-4 text-gray-400" />}
                    placeholder={t("businessConsulting.form.email.placeholder")}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold">
                      {t("businessConsulting.form.phone.label")}
                    </span>
                  }
                  name="phone_number"
                  rules={[
                    {
                      required: true,
                      message: t("businessConsulting.form.phone.error"),
                    },
                  ]}
                >
                  <Input
                    prefix={<Phone className="w-4 h-4 text-gray-400" />}
                    placeholder={t("businessConsulting.form.phone.placeholder")}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold">
                      {t("businessConsulting.form.description.label")}
                    </span>
                  }
                  name="service_description"
                  rules={[
                    {
                      required: true,
                      message: t("businessConsulting.form.description.error"),
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder={t("businessConsulting.form.description.placeholder")}
                  />
                </Form.Item>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    type="button"
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-semibold"
                  >
                    {t("businessConsulting.form.buttons.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#C9A84C] text-white font-semibold hover:bg-[#B8973B] transition-colors"
                  >
                    {t("businessConsulting.form.buttons.submit")}
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