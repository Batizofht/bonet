"use client"
import { useState } from "react";
import { FaPhoneAlt, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Form, Input, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";

const investmentServices = [
{ key: "service1", image: "../assets/images/rdb.jpg" },
{ key: "service2", image: "../assets/images/cert.jpg" },
{ key: "service3", image: "../assets/images/rra.jpg" },
{ key: "service4", image: "../assets/images/rra1.jpg" },
{ key: "service5", image: "../assets/images/rdb2.jpg" },
{ key: "service6", image: "../assets/images/kg6.jpg" },
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
        "https://switchiify.com/bonetProject/backend/public/investments",
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


return ( <div className="p-6 max-w-full mx-auto bg-gray-50 min-h-screen relative">
<ToastContainer
position="top-right"
toastClassName="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl"
progressClassName="bg-gradient-to-r from-blue-400 to-purple-600"
style={{ marginTop: "80px" }}
autoClose={8000}
/>


  <Typography.Title
    level={2}
    className="text-center text-transparent bg-clip-text mb-8"
    style={{
      backgroundImage: "linear-gradient(to right, #188bff, #4fc3f7)",
      WebkitBackgroundClip: "text",
      color: "transparent",
    }}
  >
    {t("investmentBusinessSetup.title")}
  </Typography.Title>

  {/* Buttons */}
  <div className="flex justify-center mt-5 mb-10">
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <button
        onClick={() => setIsPopupOpen(true)}
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
      >
        <FaPhoneAlt /> {t("investmentBusinessSetup.button.openModal")}
      </button>
      <button
        onClick={openWhatsApp}
        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
      >
        <img src="../assets/images/white.png" alt="WhatsApp" className="h-6 w-6 mr-2" />
        {t("travelHospitality.page.buttons.quickContact")}
      </button>
    </div>
  </div>

  {/* Service Cards */}
  <div className="space-y-6 max-w-7xl mx-auto">
    {investmentServices.map((service, index) => (
      <div
        key={service.key}
        className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row w-full"
      >
        {index % 2 === 0 ? (
          <>
            <img
              src={service.image}
              alt={t(`investmentBusinessSetup.services.${service.key}.title`)}
              className="w-full md:w-1/3 h-60 object-cover rounded-md"
            />
            <div className="md:ml-6 mt-4 md:mt-0 flex-1">
              <h3 className="text-2xl font-semibold text-[#188bff]">
                {t(`investmentBusinessSetup.services.${service.key}.title`)}
              </h3>
              <p className="text-gray-700 mt-2">
                {t(`investmentBusinessSetup.services.${service.key}.description`)}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="md:mr-6 mt-4 md:mt-0 flex-1">
              <h3 className="text-2xl font-semibold text-[#188bff]">
                {t(`investmentBusinessSetup.services.${service.key}.title`)}
              </h3>
              <p className="text-gray-700 mt-2">
                {t(`investmentBusinessSetup.services.${service.key}.description`)}
              </p>
            </div>
            <img
              src={service.image}
              alt={t(`investmentBusinessSetup.services.${service.key}.title`)}
              className="w-full md:w-1/3 h-60 object-cover rounded-md"
            />
          </>
        )}
      </div>
    ))}
  </div>

  {/* Popup Form Modal */}
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
            {t("investmentBusinessSetup.modal.title")}
          </Typography.Title>
          <p className="text-sm text-white/70 mb-6">
            {t("investmentBusinessSetup.modal.description")}
          </p>

          <Form layout="vertical" form={form} onFinish={handleSubmit} className="space-y-4">
            <Form.Item
              label={<span className="text-white/80 font-medium">{t("investmentBusinessSetup.modal.form.fullnames.label")}</span>}
              name="fullnames"
              rules={[{ required: true, message: t("investmentBusinessSetup.modal.form.fullnames.requiredMessage") }]}
            >
              <Input
                placeholder={t("investmentBusinessSetup.modal.form.fullnames.placeholder")}
                className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white/80 font-medium">{t("investmentBusinessSetup.modal.form.email.label")}</span>}
              name="email"
              rules={[
                { required: true, message: t("investmentBusinessSetup.modal.form.email.requiredMessage") },
                { type: "email", message: t("investmentBusinessSetup.modal.form.email.invalidMessage") },
              ]}
            >
              <Input
                placeholder={t("investmentBusinessSetup.modal.form.email.placeholder")}
                className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white/80 font-medium">{t("investmentBusinessSetup.modal.form.phone_number.label")}</span>}
              name="phone_number"
              rules={[{ required: true, message: t("investmentBusinessSetup.modal.form.phone_number.requiredMessage") }]}
            >
              <Input
                placeholder={t("investmentBusinessSetup.modal.form.phone_number.placeholder")}
                className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white/80 font-medium">{t("investmentBusinessSetup.modal.form.service_description.label")}</span>}
              name="service_description"
              rules={[{ required: true, message: t("investmentBusinessSetup.modal.form.service_description.requiredMessage") }]}
            >
              <Input.TextArea
                placeholder={t("investmentBusinessSetup.modal.form.service_description.placeholder")}
                rows={4}
                className="rounded-xl border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/10 transition-all duration-300"
              />
            </Form.Item>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsPopupOpen(false)}
                type="button"
                className="px-5 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
              >
                {t("investmentBusinessSetup.button.cancel")}
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("investmentBusinessSetup.button.submit")}
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
