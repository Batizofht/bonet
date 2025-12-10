"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { Form, Input, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import { 
  Phone, 
  MessageCircle, 
  X, 
  Building, 
  FileText, 
  Award, 
  ClipboardCheck, 
  Search, 
  Rocket,
  Sparkles,
  Target,
  Users,
  Globe
} from "lucide-react";

const investmentServices = [
  { key: "service1", image: "../assets/images/rdb.jpg", icon: Building, color: "from-blue-500 to-cyan-400" },
  { key: "service2", image: "../assets/images/cert.jpg", icon: Award, color: "from-green-500 to-emerald-400" },
  { key: "service3", image: "../assets/images/rra.jpg", icon: FileText, color: "from-purple-500 to-pink-400" },
  { key: "service4", image: "../assets/images/rra1.jpg", icon: ClipboardCheck, color: "from-orange-500 to-amber-400" },
  { key: "service5", image: "../assets/images/rdb2.jpg", icon: Search, color: "from-red-500 to-rose-400" },
  { key: "service6", image: "../assets/images/kg6.jpg", icon: Rocket, color: "from-indigo-500 to-purple-400" },
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
        "https://api.bonet.rw/bonetBackend/backend/public/investments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (res.ok) {
        toast.success(t("ContactMessage.success", { name: values.name }));
        form.resetFields();
        setIsPopupOpen(false);
      } else {
        toast.error(t("investmentBusinessSetup.toastMessages.errorSubmission"));
      }
    } catch (err) {
      toast.error(t("investmentBusinessSetup.toastMessages.errorServer"));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <ToastContainer
        position="top-right"
        toastClassName="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl"
        progressClassName="bg-gradient-to-r from-blue-400 to-purple-600"
        style={{ marginTop: "80px" }}
        autoClose={8000}
      />

      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <Target className="w-6 h-6 text-[#188bff] animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Investment & <span className="bg-[#188bff] bg-clip-text text-transparent">Business Setup</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          {t("investmentBusinessSetup.title")}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mb-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={() => setIsPopupOpen(true)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gradient-to-r from-[#188bff] to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            {t("investmentBusinessSetup.button.openModal")}
          </motion.button>

          <motion.button
            onClick={openWhatsApp}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            {t("travelHospitality.page.buttons.quickContact")}
          </motion.button>
        </div>
      </div>

      {/* Service Cards */}
      <div className="space-y-8">
        {investmentServices.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col lg:flex-row items-center bg-white rounded-3xl border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Image */}
              <div className="lg:w-2/5 w-full relative">
                <div className="relative overflow-hidden h-80">
                  <img
                    src={service.image}
                    alt={t(`investmentBusinessSetup.services.${service.key}.title`)}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-3/5 w-full p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#188bff] to-cyan-500 bg-clip-text text-transparent">
                      {t(`investmentBusinessSetup.services.${service.key}.title`)}
                    </h3>
                    <p className="text-gray-600 font-semibold mt-1">
                      Professional business setup services
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  {t(`investmentBusinessSetup.services.${service.key}.description`)}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-3">
                  {["Expert Service","24/7 DAYS Support", "Trusted "].map((_, i) => (
                    <div key={i} className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl">
                      <Sparkles className="w-3 h-3 text-[#188bff]" />
                      <span className="text-sm text-gray-700 font-medium">{_}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Popup Form Modal */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 border border-blue-100 overflow-hidden"
            >
              {/* Background decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-green-400/10 to-emerald-500/10 rounded-full translate-x-12 translate-y-12"></div>

              {/* Close button */}
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#188bff] to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
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
                      className="rounded-xl border-gray-300 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 transition-all"
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
                      className="rounded-xl border-gray-300 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 transition-all"
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
                      className="rounded-xl border-gray-300 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 transition-all"
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
                      className="rounded-xl border-gray-300 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </Form.Item>

                  <div className="flex justify-end gap-3 pt-4">
                    <motion.button
                      onClick={() => setIsPopupOpen(false)}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 font-semibold"
                    >
                      {t("investmentBusinessSetup.button.cancel")}
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#188bff] to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {t("investmentBusinessSetup.button.submit")}
                    </motion.button>
                  </div>
                </Form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}