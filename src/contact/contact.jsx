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

const ContactForm = ({ form, onFinish, t }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-xl border border-white/20 relative overflow-hidden">
    {/* Web3 decorative elements */}
    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full -translate-x-16 -translate-y-16"></div>
    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-cyan-600/20 rounded-full translate-x-12 translate-y-12"></div>
    
    <div className="relative z-10">
      <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent mb-6">
        {t("contactInform.form.title")}
      </h3>
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} className="space-y-4">
        <Form.Item
          label={<span className="text-white/80 font-medium">{t("contactInform.form.fullName")}</span>}
          name="name"
          rules={[{ required: true, message: t("contactInform.form.validation.nameRequired") }]}
        >
          <Input 
            placeholder={t("contactInform.form.fullName")} 
            className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-white/80 font-medium">{t("contactInform.form.email")}</span>}
          name="email"
          rules={[
            { required: true, message: t("contactInform.form.validation.emailRequired") },
            { type: "email", message: t("contactInform.form.validation.emailInvalid") },
          ]}
        >
          <Input 
            placeholder={t("contactInform.form.email")} 
            className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-white/80 font-medium">{t("contactInform.form.phone")}</span>}
          name="phone_number"
          rules={[{ required: true, message: t("contactInform.form.validation.phoneRequired") }]}
        >
          <Input 
            placeholder={t("contactInform.form.phone")} 
            className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
          />
        </Form.Item>

        <Form.Item 
          label={<span className="text-white/80 font-medium">{t("contactInform.form.whatsapp")}</span>} 
          name="whatsapp_number"
        >
          <Input 
            placeholder={t("contactInform.form.whatsapp")} 
            className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-green-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-white/80 font-medium">{t("contactInform.form.inquiryType")}</span>}
          name="inquiry_type"
          rules={[{ required: true, message: t("contactInform.form.validation.inquiryRequired") }]}
        >
          <Select 
            placeholder={t("contactInform.form.inquiryType")} 
            className="rounded-xl [&_.ant-select-selector]:bg-white/5 [&_.ant-select-selector]:border-white/30 [&_.ant-select-selector]:text-white [&_.ant-select-selector]:rounded-xl [&_.ant-select-selector]:hover:bg-white/10"
            dropdownClassName="[&_.ant-select-item]:hover:bg-white/10 [&_.ant-select-item]:text-white"
          >
            <Option value="hotel">{t("contactInform.form.inquiryOptions.hotel")}</Option>
            <Option value="department">{t("contactInform.form.inquiryOptions.department")}</Option>
            <Option value="transport">{t("contactInform.form.inquiryOptions.transport")}</Option>
            <Option value="businessSetup">{t("contactInform.form.inquiryOptions.businessSetup")}</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={<span className="text-white/80 font-medium">{t("contactInform.form.message")}</span>}
          name="message"
          rules={[{ required: true, message: t("contactInform.form.validation.messageRequired") }]}
        >
          <Input.TextArea
            placeholder={t("contactInform.form.message")}
            rows={4}
            className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
          />
        </Form.Item>

        <Form.Item>
          <button 
            htmlType="submit" 
            block 
            className="bg-gradient-to-r from-blue-500 to-blue-600 w-full hover:from-blue-600 hover:to-blue-500 text-white font-semibold rounded-xl py-3 h-auto transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border-0"
          >
            <FaRocket className="inline mr-2" />
            {t("contactInform.form.submitButton")}
          </button>
        </Form.Item>
      </Form>
    </div>
  </div>
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
        onClick={() => window.open("https://web.whatsapp.com/send?phone=250726300260", "_blank")}
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
        "https://switchiify.com/bonetProject/backend/public/comments",
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