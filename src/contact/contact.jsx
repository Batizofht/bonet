"use client"
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Form, Input, Select } from "antd";
import { modernToast } from "@/components/ModernToast";
import { User, Mail, Phone, MessageCircle, MessageSquare } from "lucide-react";

const { Option } = Select;

const ContactForm = ({ form, onFinish, t, isLoading }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-xl">
    <div className="mb-8">
      <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
        {t("contactInform.form.title")}
      </span>
      <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-2">
        Get in Touch
      </h2>
      <p className="text-gray-500 text-sm">
        We'll get back to you within 24 hours
      </p>
    </div>

    <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} className="space-y-5">
      <Form.Item
        label={<span className="text-gray-700 font-medium text-sm">{t("contactInform.form.fullName")}</span>}
        name="name"
        rules={[{ required: true, message: t("contactInform.form.validation.nameRequired") }]}
      >
        <Input 
          prefix={<User className="w-4 h-4 text-gray-400" />}
          placeholder={t("contactInform.form.fullName")} 
          className="rounded-lg border-gray-300 bg-white text-gray-800 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 hover:border-gray-400 transition-colors duration-200 h-11"
        />
      </Form.Item>

      <Form.Item
        label={<span className="text-gray-700 font-medium text-sm">{t("contactInform.form.email")}</span>}
        name="email"
        rules={[
          { required: true, message: t("contactInform.form.validation.emailRequired") },
          { type: "email", message: t("contactInform.form.validation.emailInvalid") },
        ]}
      >
        <Input 
          prefix={<Mail className="w-4 h-4 text-gray-400" />}
          placeholder={t("contactInform.form.email")} 
          className="rounded-lg border-gray-300 bg-white text-gray-800 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 hover:border-gray-400 transition-colors duration-200 h-11"
        />
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label={<span className="text-gray-700 font-medium text-sm">{t("contactInform.form.phone")}</span>}
          name="phone_number"
          rules={[{ required: true, message: t("contactInform.form.validation.phoneRequired") }]}
        >
          <Input 
            prefix={<Phone className="w-4 h-4 text-gray-400" />}
            placeholder={t("contactInform.form.phone")} 
            className="rounded-lg border-gray-300 bg-white text-gray-800 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 hover:border-gray-400 transition-colors duration-200 h-11"
          />
        </Form.Item>

        <Form.Item 
          label={<span className="text-gray-700 font-medium text-sm">{t("contactInform.form.whatsapp")}</span>} 
          name="whatsapp_number"
        >
          <Input 
            prefix={<MessageCircle className="w-4 h-4 text-gray-400" />}
            placeholder={t("contactInform.form.whatsapp")} 
            className="rounded-lg border-gray-300 bg-white text-gray-800 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 hover:border-gray-400 transition-colors duration-200 h-11"
          />
        </Form.Item>
      </div>

      <Form.Item
        label={<span className="text-gray-700 font-medium text-sm">{t("contactInform.form.inquiryType")}</span>}
        name="inquiry_type"
        rules={[{ required: true, message: t("contactInform.form.validation.inquiryRequired") }]}
      >
        <Select 
          placeholder={t("contactInform.form.inquiryType")}
          className="[&_.ant-select-selector]:h-11 [&_.ant-select-selector]:flex [&_.ant-select-selector]:items-center [&_.ant-select-selector]:rounded-lg [&_.ant-select-selector]:border-gray-300 [&_.ant-select-selector]:hover:border-gray-400"
        >
          <Option value="hotel">{t("contactInform.form.inquiryOptions.hotel")}</Option>
          <Option value="department">{t("contactInform.form.inquiryOptions.department")}</Option>
          <Option value="transport">{t("contactInform.form.inquiryOptions.transport")}</Option>
          <Option value="businessSetup">{t("contactInform.form.inquiryOptions.businessSetup")}</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={<span className="text-gray-700 font-medium text-sm">{t("contactInform.form.message")}</span>}
        name="message"
        rules={[{ required: true, message: t("contactInform.form.validation.messageRequired") }]}
      >
        <Input.TextArea
          placeholder={t("contactInform.form.message")}
          rows={4}
          className="rounded-lg border-gray-300 bg-white text-gray-800 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 hover:border-gray-400 transition-colors duration-200 resize-none"
        />
      </Form.Item>

      <Form.Item className="mb-0">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#C9A84C] hover:bg-[#B8973B] text-white font-semibold rounded-lg py-3 h-auto transition-colors duration-200 border-0 text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            t("contactInform.form.submitButton")
          )}
        </button>
      </Form.Item>
    </Form>
  </div>
);

const ContactInfo = ({ t }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-xl">
    <div className="mb-8">
      <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
        {t("contactInformation.title.part1")}
      </span>
      <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-3">
        {t("contactInformation.title.part2")}
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed">
        {t("contactInformation.description")}
      </p>
    </div>

    <button
      onClick={() => {
        const phone = "250726300260";
        const url = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
          ? `https://wa.me/${phone}`
          : `https://web.whatsapp.com/send?phone=${phone}`;
        window.open(url, "_blank");
      }}
      className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold rounded-lg px-6 py-3 transition-colors duration-200 border-0 mb-8"
    >
      <FaWhatsapp className="w-5 h-5" />
      {t("contactInformation.chatButton")}
    </button>

    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#C9A84C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <FaPhoneAlt className="text-[#C9A84C]" />
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">{t("contactInformation.callWhatsApp")}</p>
          <a href="tel:+250726300260" className="font-semibold text-gray-900 hover:text-[#C9A84C] transition-colors text-sm">
            +250 726 300 260
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#C9A84C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <FaEnvelope className="text-[#C9A84C]" />
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">{t("contactInformation.email")}</p>
          <a href="mailto:info@bonet.rw" className="font-semibold text-gray-900 hover:text-[#C9A84C] transition-colors text-sm">
            info@bonet.rw
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#C9A84C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <FaMapMarkerAlt className="text-[#C9A84C]" />
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Location</p>
          <p className="font-semibold text-gray-900 text-sm">{t("contactInformation.location")}</p>
        </div>
      </div>
    </div>
  </div>
);

const ContactUs = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.bonet.rw:8443/bonetBackend/backend/public/comments",
        values
      );
      if (response.data.id) {
        modernToast.success(t("ContactMessage.success", { name: values.name }));
        form.resetFields();
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
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
        <ContactForm form={form} onFinish={handleSubmit} t={t} isLoading={isLoading} />
        <ContactInfo t={t} />
      </div>
    </div>
  );
};

export default ContactUs;
