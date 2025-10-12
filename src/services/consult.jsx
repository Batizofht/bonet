
"use client"
import { useState } from "react";
import { FaPhoneAlt, FaTimes } from "react-icons/fa";
import { Form, Input, Typography } from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";

const services = [
  {
    titleKey: "businessConsulting.services.businessPlan.title",
    subtitleKey: "businessConsulting.services.businessPlan.subtitle",
    descriptionKey: "businessConsulting.services.businessPlan.description",
    image: "../assets/images/dev.webp",
    align: "left",
  },
  {
    titleKey: "businessConsulting.services.projectPlanning.title",
    subtitleKey: "businessConsulting.services.projectPlanning.subtitle",
    descriptionKey: "businessConsulting.services.projectPlanning.description",
    image: "../assets/images/ff.jpg",
    align: "right",
  },
  {
    titleKey: "businessConsulting.services.financialAdvisory.title",
    subtitleKey: "businessConsulting.services.financialAdvisory.subtitle",
    descriptionKey: "businessConsulting.services.financialAdvisory.description",
    image: "../assets/images/rr.webp",
    align: "left",
  },
  {
    titleKey: "businessConsulting.services.auditing.title",
    subtitleKey: "businessConsulting.services.auditing.subtitle",
    descriptionKey: "businessConsulting.services.auditing.description",
    image: "../assets/images/audit.jpg",
    align: "right",
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
        "https://switchiify.com/bonetProject/backend/public/consulting",
        values
      );

      if (res.status === 200 || res.status === 201) {
        toast.success(t("ContactMessage.success", { name: values.name }));
        form.resetFields();
        setIsPopupOpen(false);
      } else {
        toast.error(t("businessConsulting.toast.error"));
      }
    } catch (err) {
      toast.error(t("businessConsulting.toast.serverError"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer
        position="top-right"
        toastClassName="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl"
        progressClassName="bg-gradient-to-r from-blue-400 to-purple-600"
        style={{ marginTop: "80px" }}
        autoClose={8000}
      />

      <Typography.Title
        level={2}
        className="text-center text-transparent bg-clip-text bg-[#188bff] mb-10"
        style={{
          backgroundImage: "linear-gradient(to right, #188bff, #4fc3f7)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {t("businessConsulting.title")}
      </Typography.Title>

      {/* Buttons */}
      <div className="flex justify-center mt-5 mb-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <FaPhoneAlt /> {t("businessConsulting.cta")}
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
            {t("businessConsulting.quickContact")}
          </button>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid gap-10 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              service.align === "right" ? "md:flex-row-reverse" : ""
            } bg-white p-6 rounded-2xl shadow-md`}
          >
            <img
              src={service.image}
              alt={t(service.titleKey)}
              className="w-full md:w-2/5 object-cover rounded-xl"
            />
            <div className="md:ml-6 flex-1 mt-4 md:mt-0">
              <h3 className="text-2xl font-semibold text-[#188bff]">
                {t(service.titleKey)}
              </h3>
              <p className="text-lg font-medium text-gray-700 mt-1">
                {t(service.subtitleKey)}
              </p>
              <p className="text-gray-600 mt-3">{t(service.descriptionKey)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start sm:items-center justify-center p-4 pt-8 sm:pt-0 overflow-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/20 overflow-hidden">
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-cyan-600/20 rounded-full translate-x-12 translate-y-12"></div>

            {/* Close button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-3 right-3 text-black cursor-pointer z-20"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <div className="relative z-10">
              <Typography.Title
                level={4}
                className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent mb-4"
              >
                {t("businessConsulting.title")}
              </Typography.Title>
              <p className="text-sm text-white/70 mb-6">
                {t("businessConsulting.form.instructions")}
              </p>

              <Form
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
                className="space-y-4"
              >
                <Form.Item
                  label={
                    <span className="text-white/80 font-medium">
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
                    placeholder={t(
                      "businessConsulting.form.fullnames.placeholder"
                    )}
                    className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-white/80 font-medium">
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
                    placeholder={t(
                      "businessConsulting.form.email.placeholder"
                    )}
                    className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-white/80 font-medium">
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
                    placeholder={t("businessConsulting.form.phone.placeholder")}
                    className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-white/80 font-medium">
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
                    placeholder={t(
                      "businessConsulting.form.description.placeholder"
                    )}
                    className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
                  />
                </Form.Item>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    type="button"
                    className="px-5 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                  >
                    {t("businessConsulting.form.buttons.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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

