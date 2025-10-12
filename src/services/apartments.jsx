import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaTimes } from "react-icons/fa";

export default function BusinessConsulting() {
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const sectionTitle = t("businessConsulting.sectionTitle");
  const services = t("businessConsulting.services", { returnObjects: true });
  const buttonHelp = t("businessConsulting.buttonHelp");
  const quickContact = t("businessConsulting.quickContact");
  const formDescription = t("businessConsulting.formDescription");
  const formFullName = t("businessConsulting.formFullName");
  const formEmail = t("businessConsulting.formEmail");
  const formContact = t("businessConsulting.formContact");
  const formDescriptionPlaceholder = t("businessConsulting.formDescriptionPlaceholder");
  const formCancel = t("businessConsulting.formCancel");
  const formSubmit = t("businessConsulting.formSubmit");

  return (
    <div className="p-8 max-w-full mx-auto">
      <h2 className="text-4xl font-bold bg-[#188bff] bg-clip-text text-transparent text-center mb-8">
        {sectionTitle}
      </h2>

      <div className="grid gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              service.align === "right" ? "md:flex-row-reverse" : ""
            } bg-white p-6 rounded-2xl shadow-lg w-full mx-4`}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full md:w-2/5 h-auto object-cover rounded-lg"
            />
            <div className="flex-1 p-6">
              <h3 className="text-2xl font-semibold bg-[#188bff] bg-clip-text text-transparent">
                {service.title}
              </h3>
              <p className="text-lg text-gray-700 font-medium mt-2">{service.subtitle}</p>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-[#188bff] text-white px-6 py-3 rounded-lg shadow-md hover:opacity-80 transition flex items-center justify-center gap-2"
          >
            <FaPhoneAlt /> {buttonHelp}
          </button>
          <a
  href="https://wa.me/250726300260"
  target="_blank"
  rel="noopener noreferrer"
  className="px-6 py-3 bg-[#139320] text-white rounded-lg shadow hover:opacity-80 flex items-center"
>
            <img
              src="../assets/images/white.png"
              alt="WhatsApp"
              className="h-6 w-6 mr-2"
            />
            {quickContact}
          </a>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed mt-15 inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold bg-[#188bff] bg-clip-text text-transparent mb-4">
              {sectionTitle}
            </h2>
            <p className="text-[15px] mb-4 text-gray-500">{formDescription}</p>
            <input
              type="text"
              placeholder={formFullName}
              className="w-full p-2 border border-gray-500 rounded-md text-gray-700 placeholder-gray-400 placeholder:text-[13px] mb-3"
            />
            <input
              type="email"
              placeholder={formEmail}
              className="w-full p-2 border border-gray-500 rounded-md text-gray-700 placeholder-gray-400 placeholder:text-[13px] mb-3"
            />
            <input
              type="text"
              placeholder={formContact}
              className="w-full p-2 border border-gray-500 rounded-md text-gray-700 placeholder-gray-400 placeholder:text-[13px] mb-3"
            />
            <textarea
              placeholder={formDescriptionPlaceholder}
              className="w-full p-2 border border-gray-500 rounded-md text-gray-700 placeholder-gray-400 placeholder:text-[13px] mb-3"
              rows="4"
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                {formCancel}
              </button>
              <button className="px-4 py-2 bg-[#188bff] text-white rounded-md hover:opacity-80">
                {formSubmit}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
