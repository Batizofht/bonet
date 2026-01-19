'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modernToast } from "@/components/ModernToast";
import axios from "axios";
import {
  Form,
  Input,
  Typography,
  Row,
  Col,
  Image,
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
  Sparkles,
  UserPlus,
  Shield,
  Target,
  Mail,
  FileEdit
} from "lucide-react";

const { Title, Paragraph } = Typography;

const hrServices = [
  {
    image: "../assets/images/talent.jpg",
    titleKey: "hrServices.recruitment.title",
    subtitleKey: "hrServices.recruitment.subtitle",
    descriptionKey: "hrServices.recruitment.description",
    icon: UserPlus,
    color: "from-blue-500 to-cyan-400"
  },
  {
    image: "https://site-media.citationcanada.com/app/uploads/2024/09/07203528/Blog-15-Essential-HR-Policies-Every-Employee-Handbook-Needs-Feature.png",
    titleKey: "hrServices.compliance.title",
    subtitleKey: "hrServices.compliance.subtitle",
    descriptionKey: "hrServices.compliance.description",
    icon: Shield,
    color: "from-green-500 to-emerald-400"
  },
  {
    image: "../assets/images/tra.jpeg",
    titleKey: "hrServices.training.title",
    subtitleKey: "hrServices.training.subtitle",
    descriptionKey: "hrServices.training.description",
    icon: GraduationCap,
    color: "from-purple-500 to-pink-400"
  },
  {
    image: "../assets/images/pay.png",
    titleKey: "hrServices.payroll.title",
    subtitleKey: "hrServices.payroll.subtitle",
    descriptionKey: "hrServices.payroll.description",
    icon: CreditCard,
    color: "from-orange-500 to-amber-400"
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
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <Users className="w-6 h-6 text-[#188bff] animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          HR & <span className="bg-[#188bff] bg-clip-text text-transparent">Admin Support</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          {t("hrServices.title")}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mb-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gradient-to-r from-[#188bff] to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Users className="w-5 h-5" />
            {t("hrServices.ctaContact")}
          </motion.button>

          <motion.button
            onClick={openWhatsApp}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            {t("hrServices.ctaWhatsApp")}
          </motion.button>
        </div>
      </div>

      {/* Service Cards */}
      <Row gutter={[24, 24]} className="w-full">
        {hrServices.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <Col xs={24} md={12} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image */}
                  <div className="md:w-2/5 w-full relative">
                    <div className="relative overflow-hidden h-48 md:h-full">
                      <Image
                        src={service.image}
                        alt={t(service.titleKey)}
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover" }}
                        preview={false}
                        className="transform hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-3/5 w-full p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <Title level={4} className="mb-1 text-gray-800 font-bold">
                            {t(service.titleKey)}
                          </Title>
                          <Paragraph strong className="text-gray-600 text-sm mb-0">
                            {t(service.subtitleKey)}
                          </Paragraph>
                        </div>
                      </div>

                      <Paragraph className="text-gray-600 leading-relaxed mb-4">
                        {t(service.descriptionKey)}
                      </Paragraph>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                     {["Expert Service","24/7 DAYS Support", "Trusted "].map((_, i) => (
                        <div key={i} className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
                          <Sparkles className="w-3 h-3 text-[#188bff]" />
                          <span className="text-xs text-gray-700 font-medium">Expert Service</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Col>
          );
        })}
      </Row>

      {/* Popup Modal */}
      <AnimatePresence>
        {isModalVisible && (
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
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#188bff] to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
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
                      className="rounded-xl border-gray-300 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 transition-all"
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
                      className="rounded-xl border-gray-300 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 transition-all"
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
                      className="rounded-xl border-gray-300 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 transition-all"
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
                      className="rounded-xl border-gray-300 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </Form.Item>

                  <div className="flex justify-end gap-3 pt-4">
                    <motion.button
                      onClick={closeModal}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 font-semibold"
                    >
                      {t("hrModal.form.buttons.cancel")}
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#188bff] to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {t("hrModal.form.buttons.submit")}
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