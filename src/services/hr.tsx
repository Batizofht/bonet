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
    <div>
      {/* Header */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
              Services
            </span>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 uppercase tracking-wider">
              HR & Admin Support
            </h1>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {t("hrServices.title")}
            </p>

            {/* Buttons */}
            <div className="flex justify-center mt-10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <button
                  onClick={openModal}
                  className="inline-flex items-center gap-2 bg-[#C9A84C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8973B] transition-colors"
                >
                  <Users className="w-4 h-4" />
                  {t("hrServices.ctaContact")}
                </button>

                <button
                  onClick={openWhatsApp}
                  className="inline-flex items-center gap-2 border border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t("hrServices.ctaWhatsApp")}
                </button>
              </div>
            </div>

            {/* Link to Recruitment */}
            <div className="mt-6">
              <a
                href="/hr-recruitment"
                className="inline-flex items-center gap-1.5 text-[#C9A84C] font-semibold text-sm hover:underline"
              >
                Looking for recruitment services? View our talent solutions
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hrServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row rounded-xl border border-gray-200 bg-white overflow-hidden"
                >
                  {/* Image */}
                  <div className="md:w-2/5 w-full">
                    <div className="relative h-48 md:h-full overflow-hidden bg-gray-100">
                      <img
                        src={service.image}
                        alt={t(service.titleKey)}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-3/5 w-full p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="w-5 h-5 text-[#C9A84C] flex-shrink-0" strokeWidth={1.5} />
                        <h4 className="text-base font-bold text-gray-900">
                          {t(service.titleKey)}
                        </h4>
                      </div>
                      <p className="text-gray-500 font-medium text-xs uppercase tracking-wide mb-3">
                        {t(service.subtitleKey)}
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {t(service.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-xl w-full max-w-md p-6 md:p-8 border border-gray-200 my-auto max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <div>
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t("hrModal.title")}
                </h3>
                <p className="text-gray-500 text-sm">
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
                    className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-semibold"
                  >
                    {t("hrModal.form.buttons.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-[#C9A84C] text-white font-semibold hover:bg-[#B8973B] transition-colors"
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