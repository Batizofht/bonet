"use client"
import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaRocket, FaShieldAlt, FaGlobe } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Form, Input, Select, Button } from "antd";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;

import { Rocket, User, Mail, Phone, MessageCircle, MessageSquare } from "lucide-react";

const ContactForm = ({ form, onFinish, t }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl border-2 border-blue-100 relative overflow-hidden"
  >
    {/* Decorative gradient elements */}
    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full -translate-x-16 -translate-y-16"></div>
    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-green-400/10 to-emerald-500/10 rounded-full translate-x-12 translate-y-12"></div>
    <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400/10 rounded-full"></div>
    
    <div className="relative z-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#188bff] to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          {t("contactInform.form.title")}
        </h3>
        <p className="text-gray-500">
          Get in touch with our team
        </p>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} className="space-y-6">
        {/* Full Name */}
        <Form.Item
          label={<span className="text-gray-700 font-semibold">{t("contactInform.form.fullName")}</span>}
          name="name"
          rules={[{ required: true, message: t("contactInform.form.validation.nameRequired") }]}
        >
          <Input 
            prefix={<User className="w-4 h-4 text-gray-400" />}
            placeholder={t("contactInform.form.fullName")} 
            className="rounded-xl border-gray-300 bg-white text-gray-800 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 hover:border-gray-400 transition-all duration-300 h-12"
          />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label={<span className="text-gray-700 font-semibold">{t("contactInform.form.email")}</span>}
          name="email"
          rules={[
            { required: true, message: t("contactInform.form.validation.emailRequired") },
            { type: "email", message: t("contactInform.form.validation.emailInvalid") },
          ]}
        >
          <Input 
            prefix={<Mail className="w-4 h-4 text-gray-400" />}
            placeholder={t("contactInform.form.email")} 
            className="rounded-xl border-gray-300 bg-white text-gray-800 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 hover:border-gray-400 transition-all duration-300 h-12"
          />
        </Form.Item>

        {/* Phone & WhatsApp Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label={<span className="text-gray-700 font-semibold">{t("contactInform.form.phone")}</span>}
            name="phone_number"
            rules={[{ required: true, message: t("contactInform.form.validation.phoneRequired") }]}
          >
            <Input 
              prefix={<Phone className="w-4 h-4 text-gray-400" />}
              placeholder={t("contactInform.form.phone")} 
              className="rounded-xl border-gray-300 bg-white text-gray-800 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 hover:border-gray-400 transition-all duration-300 h-12"
            />
          </Form.Item>

          <Form.Item 
            label={<span className="text-gray-700 font-semibold">{t("contactInform.form.whatsapp")}</span>} 
            name="whatsapp_number"
          >
            <Input 
              prefix={<MessageCircle className="w-4 h-4 text-gray-400" />}
              placeholder={t("contactInform.form.whatsapp")} 
              className="rounded-xl border-gray-300 bg-white text-gray-800 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 hover:border-gray-400 transition-all duration-300 h-12"
            />
          </Form.Item>
        </div>

        {/* Inquiry Type */}
        <Form.Item
          label={<span className="text-gray-700 font-semibold">{t("contactInform.form.inquiryType")}</span>}
          name="inquiry_type"
          rules={[{ required: true, message: t("contactInform.form.validation.inquiryRequired") }]}
        >
      <Select 
  placeholder={
    <div className="flex items-center gap-2">
      <MessageSquare className="w-4 my-2 h-4 text-gray-400" />
      {t("contactInform.form.inquiryType")}
    </div>
  } 
  className="[&_.ant-select-selector]:h-20 [&_.ant-select-selector]:flex [&_.ant-select-selector]:items-center [&_.ant-select-selector]:text-lg rounded-xl"
>
  <Option value="hotel" className="flex items-center gap-2">
    🏨 {t("contactInform.form.inquiryOptions.hotel")}
  </Option>
  <Option value="department" className="flex items-center gap-2">
    🏢 {t("contactInform.form.inquiryOptions.department")}
  </Option>
  <Option value="transport" className="flex items-center gap-2">
    🚗 {t("contactInform.form.inquiryOptions.transport")}
  </Option>
  <Option value="businessSetup" className="flex items-center gap-2">
    💼 {t("contactInform.form.inquiryOptions.businessSetup")}
  </Option>
</Select>
        </Form.Item>

        {/* Message */}
        <Form.Item
          label={<span className="text-gray-700 font-semibold">{t("contactInform.form.message")}</span>}
          name="message"
          rules={[{ required: true, message: t("contactInform.form.validation.messageRequired") }]}
        >
          <Input.TextArea
            placeholder={t("contactInform.form.message")}
            rows={4}
            className="rounded-xl border-gray-300 bg-white text-gray-800 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 hover:border-gray-400 transition-all duration-300 resize-none"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className="mb-0">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#188bff] to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl py-4 h-auto transition-all duration-300 shadow-lg hover:shadow-xl border-0 text-lg"
          >
            <Rocket className="w-5 h-5" />
            {t("contactInform.form.submitButton")}
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>
        </Form.Item>
      </Form>

      {/* Footer Note */}
      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">
          We'll get back to you within 24 hours 
        </p>
      </div>
    </div>
  </motion.div>
);

const ContactInfo = ({ t }) => (
  <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-900 rounded-3xl shadow-2xl p-8 lg:p-12 w-full max-w-xl relative overflow-hidden border border-white/10">
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-500/5 rounded-full blur-2xl"></div>
    </div>

    <div className="relative z-10 text-center space-y-8">
      {/* Unified title section */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          {t("contactInformation.title.part1")}{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {t("contactInformation.title.part2")}
          </span>
        </h2>
        <div className="flex justify-center items-center gap-4 text-white/60">
          <div className="flex items-center gap-2">
          <FaShieldAlt className="text-green-400" /> 
            <span className="text-sm">Secure</span>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="flex items-center gap-2">
            <FaGlobe className="text-white" />
            <span className="text-sm text-white">Global</span>
          </div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="flex items-center gap-2">
            <FaRocket className="text-purple-400" />
            <span className="text-sm">Fast</span>
          </div>
        </div>
      </div>

      <p className="text-white/70 text-lg leading-relaxed max-w-md mx-auto">
        {t("contactInformation.description")}
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
onClick={() => {
  const phone = "250726300260";
  const url = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    ? `https://wa.me/${phone}`   // mobile-friendly
    : `https://web.whatsapp.com/send?phone=${phone}`; // desktop
  window.open(url, "_blank");
}}
        className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl border-0"
      >
        <div className="relative">
          <img src="../assets/images/whatsapp.png" alt="Chat" className="w-6 h-6 filter brightness-0 invert" />
          <div className="absolute inset-0 animate-ping opacity-20">
            <img src="../assets/images/whatsapp.png" alt="Chat" className="w-6 h-6 filter brightness-0 invert" />
          </div>
        </div>
        {t("contactInformation.chatButton")}
      </motion.button>

      <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
        <div className="text-white space-y-4 text-sm">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FaPhoneAlt className="text-white-400 text-lg" />
            </div>
            <span className="text-left">
              {t("contactInformation.callWhatsApp")}:{" "}
              <a href="tel:+250726300260" className="font-semibold text-blue-300 hover:text-blue-200 transition-colors">
                +250726 300 260
              </a>
            </span>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <FaEnvelope className="text-purple-400 text-lg" />
            </div>
            <span className="text-left">
              {t("contactInformation.email")}:{" "}
              <a href="mailto:info@bonet.rw" className="font-semibold text-purple-300 hover:text-purple-200 transition-colors">
                info@bonet.rw
              </a>
            </span>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <FaMapMarkerAlt className="text-cyan-400 text-lg" />
            </div>
            <span className="text-white/80">{t("contactInformation.location")}</span>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);

const ContactUs = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://api.bonet.rw:8443/bonetBackend/backend/public/comments",
        values
      );
      if (response.data.id) {
        toast.success(t("ContactMessage.success", { name: values.name }));
        form.resetFields();
      } else {
        toast.error(t("toast.error"));
      }
    } catch (error) {
      console.error(error);
      toast.error(t("toast.fail"));
    }
  };

  return (
  <div className="min-h-screen relative overflow-hidden">
    {/* Background animation */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen py-12 gap-8 lg:gap-12 px-4"
    >
      <ContactForm form={form} onFinish={handleSubmit} t={t} />
      <ContactInfo t={t} />
    </motion.div>

    {/* Toasts container should be outside */}
    <ToastContainer
      position="top-right"
      toastClassName="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl"
      progressClassName="bg-gradient-to-r from-blue-400 to-purple-600"
      style={{ marginTop: "80px" }}   // 👈 margin from top
      autoClose={8000}
    />
  </div>
);

};

export default ContactUs;
