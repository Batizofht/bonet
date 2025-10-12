import { useState } from "react";
import { FaPhoneAlt, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  Input,
  Typography,
  Row,
  Col,
  Image,
} from "antd";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

const hrServices = [
  {
    image: "../assets/images/talent.jpg",
    titleKey: "hrServices.recruitment.title",
    subtitleKey: "hrServices.recruitment.subtitle",
    descriptionKey: "hrServices.recruitment.description",
  },
  {
    image: "../assets/images/compliance.png",
    titleKey: "hrServices.compliance.title",
    subtitleKey: "hrServices.compliance.subtitle",
    descriptionKey: "hrServices.compliance.description",
  },
  {
    image: "../assets/images/tra.jpeg",
    titleKey: "hrServices.training.title",
    subtitleKey: "hrServices.training.subtitle",
    descriptionKey: "hrServices.training.description",
  },
  {
    image: "../assets/images/pay.png",
    titleKey: "hrServices.payroll.title",
    subtitleKey: "hrServices.payroll.subtitle",
    descriptionKey: "hrServices.payroll.description",
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

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "https://switchiify.com/bonetProject/backend/public/hrsupport",
        values
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(t("ContactMessage.success", { name: values.name }));
        form.resetFields();
        closeModal();
      } else {
        toast.error(t("hrModal.toast.error"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(t("hrModal.toast.error"));
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-16 py-10 bg-white flex flex-col items-center w-full max-w-7xl mx-auto">
      <ToastContainer
        position="top-right"
        toastClassName="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl"
        progressClassName="bg-gradient-to-r from-blue-400 to-purple-600"
        style={{ marginTop: "80px" }}
        autoClose={8000}
      />

      <Title
        level={1}
        style={{
          background: "linear-gradient(to right, #188bff, #4fc3f7)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {t("hrServices.title")}
      </Title>

      <div className="flex justify-center mt-5 mb-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={openModal}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <FaPhoneAlt /> {t("hrServices.ctaContact")}
          </button>
          <button
            onClick={openWhatsApp}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
          >
            <img
              src="../assets/images/white.png"
              alt="WhatsApp"
              className="h-6 w-6 mr-2"
            />
            {t("hrServices.ctaWhatsApp")}
          </button>
        </div>
      </div>

      <Row gutter={[24, 24]} className="w-full">
        {hrServices.map((service, index) => (
          <Col xs={24} md={12} key={index}>
            <div
              className={`bg-white shadow-xl rounded-lg p-6 flex flex-col md:flex-row items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
              style={{ minHeight: 180 }}
            >
              <Image
                src={service.image}
                alt={t(service.titleKey)}
                width={160}
                height={120}
                style={{ objectFit: "cover", borderRadius: 8 }}
                preview={false}
              />
              <div className="md:mx-6 mt-4 md:mt-0 flex-1">
                <Title level={4} style={{ color: "#188bff", marginBottom: 8 }}>
                  {t(service.titleKey)}
                </Title>
                <Paragraph strong style={{ marginBottom: 6 }}>
                  {t(service.subtitleKey)}
                </Paragraph>
                <Paragraph style={{ lineHeight: 1.5 }}>
                  {t(service.descriptionKey)}
                </Paragraph>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Glassy Gradient Form Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start sm:items-center justify-center p-4 pt-8 sm:pt-0 overflow-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/20 overflow-hidden">
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-cyan-600/20 rounded-full translate-x-12 translate-y-12"></div>

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-black cursor-pointer z-20"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <div className="relative z-10">
              <Title
                level={4}
                className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent mb-4"
              >
                {t("hrModal.title")}
              </Title>
              <p className="text-sm text-white/70 mb-6">
                {t("hrModal.instructions")}
              </p>

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
              >
                <Form.Item
                  label={
                    <span className="text-white/80 font-medium">
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
                    placeholder={t("hrModal.form.fullnames.placeholder")}
                    className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-white/80 font-medium">
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
                    placeholder={t("hrModal.form.email.placeholder")}
                    className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-white/80 font-medium">
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
                    placeholder={t("hrModal.form.phone.placeholder")}
                    className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-white/80 font-medium">
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
                    className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
                  />
                </Form.Item>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="px-5 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                  >
                    {t("hrModal.form.buttons.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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

