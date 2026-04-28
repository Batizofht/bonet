'use client'
import { useState } from "react";
import { modernToast } from "@/components/ModernToast";
import axios from "axios";
import {
  Form,
  Input,
} from "antd";
import { useTranslation } from "react-i18next";
import { 
  Phone, 
  MessageCircle, 
  X, 
  Users, 
  FileText, 
  GraduationCap, 
  CreditCard,
  UserPlus,
  Shield,
  Target,
  Mail,
  FileEdit
} from "lucide-react";

const hrServices = [
  {
    image: "../assets/images/talent.jpg",
    titleKey: "hrServices.recruitment.title",
    subtitleKey: "hrServices.recruitment.subtitle",
    descriptionKey: "hrServices.recruitment.description",
    icon: UserPlus,
  },
  {
    image: "https://site-media.citationcanada.com/app/uploads/2024/09/07203528/Blog-15-Essential-HR-Policies-Every-Employee-Handbook-Needs-Feature.png",
    titleKey: "hrServices.compliance.title",
    subtitleKey: "hrServices.compliance.subtitle",
    descriptionKey: "hrServices.compliance.description",
    icon: Shield,
  },
  {
    image: "../assets/images/tra.jpeg",
    titleKey: "hrServices.training.title",
    subtitleKey: "hrServices.training.subtitle",
    descriptionKey: "hrServices.training.description",
    icon: GraduationCap,
  },
  {
    image: "../assets/images/pay.png",
    titleKey: "hrServices.payroll.title",
    subtitleKey: "hrServices.payroll.subtitle",
    descriptionKey: "hrServices.payroll.description",
    icon: CreditCard,
  },
];

export default function HRAdminSupport() {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const openWhatsApp = () => {
    const phoneNumber = "250726300260";
    const appUrl = `whatsapp://send?phone=${phoneNumber}`;
    const webUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    window.location.href = appUrl;
    setTimeout(() => {
      window.open(webUrl, "_blank");
    }, 1500);
  };

  const onFinish = async (values:any) => {
    try {
      const response = await axios.post(
        "https://api.bonet.rw:8443/bonetBackend/backend/public/hrsupport",
        values
      );

      if (response.status === 200 || response.status === 201) {
        modernToast.success(t("ContactMessage.success", { name: values.name }));
        form.resetFields();
        closeModal();
      } else {
        modernToast.error(t("hrModal.toast.error"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      modernToast.error(t("hrModal.toast.error"));
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
          HR & <span className="text-[#C9A84C]">Admin Support</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          {t("hrServices.title")}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mb-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={openModal}
            className="flex items-center gap-3 bg-[#C9A84C] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#B8973B] transition-colors duration-300"
          >
            <Users className="w-5 h-5" />
            {t("hrServices.ctaContact")}
          </button>

          <button
            onClick={openWhatsApp}
            className="flex items-center gap-3 border border-gray-300 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            {t("hrServices.ctaWhatsApp")}
          </button>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hrServices.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div
              key={index}
              className="overflow-hidden h-full"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Image */}
                <div className="md:w-2/5 w-full relative">
                  <div className="relative overflow-hidden h-48 md:h-full">
                    <img
                      src={service.image}
                      alt={t(service.titleKey)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-3/5 w-full p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className="w-6 h-6 text-[#C9A84C] flex-shrink-0" strokeWidth={1.5} />
                      <h4 className="text-lg font-bold text-gray-900">
                        {t(service.titleKey)}
                      </h4>
                    </div>
                    <p className="text-gray-500 font-medium text-xs uppercase tracking-wide mb-4">
                      {t(service.subtitleKey)}
                    </p>

                    <p className="text-gray-600 leading-relaxed mb-4">
                      {t(service.descriptionKey)}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-3">
                    {["Expert Service", "24/7 Support", "Trusted Partner"].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full"></div>
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 border border-gray-200 my-auto max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <div>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#C9A84C] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("hrModal.title")}
                </h3>
                <p className="text-gray-500">
                  {t("hrModal.instructions")}
                </p>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
              >
                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold">
                      {t("hrModal.form.fullnames.label")}
                    </span>
                  }
                  name="fullnames"
                  rules={[
                    {
                      required: true,
                      message: t("hrModal.form.fullnames.error"),
                    },
                  ]}
                >
                  <Input
                    prefix={<Users className="w-4 h-4 text-gray-400" />}
                    placeholder={t("hrModal.form.fullnames.placeholder")}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold">
                      {t("hrModal.form.email.label")}
                    </span>
                  }
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: t("hrModal.form.email.required"),
                    },
                    { type: "email", message: t("hrModal.form.email.invalid") },
                  ]}
                >
                  <Input
                    prefix={<Mail className="w-4 h-4 text-gray-400" />}
                    placeholder={t("hrModal.form.email.placeholder")}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold">
                      {t("hrModal.form.phone.label")}
                    </span>
                  }
                  name="phone_number"
                  rules={[
                    {
                      required: true,
                      message: t("hrModal.form.phone.error"),
                    },
                  ]}
                >
                  <Input
                    prefix={<Phone className="w-4 h-4 text-gray-400" />}
                    placeholder={t("hrModal.form.phone.placeholder")}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-semibold">
                      {t("hrModal.form.description.label")}
                    </span>
                  }
                  name="service_description"
                  rules={[
                    {
                      required: true,
                      message: t("hrModal.form.description.error"),
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder={t("hrModal.form.description.placeholder")}
                    rows={4}
                  />
                </Form.Item>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-semibold"
                  >
                    {t("hrModal.form.buttons.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#C9A84C] text-white font-semibold hover:bg-[#B8973B] transition-colors"
                  >
                    {t("hrModal.form.buttons.submit")}
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