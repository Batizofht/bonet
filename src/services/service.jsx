import { useState } from "react";
import { motion } from "framer-motion";
import { FaHotel, FaBriefcase, FaHandshake, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const services = [
    {
      icon: <FaHotel size={30} />,
      title: t("service.travel.title"),
      description: t("service.travel.description"),
      details: t("service.travel.details"),
      route: "/travel",
    },
    {
      icon: <FaBriefcase size={30} />,
      title: t("service.investment.title"),
      description: t("service.investment.description"),
      details: t("service.investment.details"),
      route: "/investment",
    },
    {
      icon: <FaHandshake size={30} />,
      title: t("service.consulting.title"),
      description: t("service.consulting.description"),
      details: t("service.consulting.details"),
      route: "/consulting",
    },
    {
      icon: <FaUsers size={30} />,
      title: t("service.hr.title"),
      description: t("service.hr.description"),
      details: t("service.hr.details"),
      route: "/hrsupport",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center p-10 min-h-[600px]">
      <h2 className="text-gray-700 text-3xl font-bold text-center mb-8">
        {t("service.heading1")}{" "}
        <span className="bg-[#188bff] bg-clip-text text-transparent">
          {t("service.heading2")}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`border p-4 rounded-lg shadow-lg transition-all duration-300 cursor-pointer w-full ${
              selectedService === index
                ? "border-blue-500 scale-105"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedService(index)}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-[#188bff] text-white mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>

              {selectedService === index && (
                <div className="mt-3 w-full flex flex-col items-center">
                  <p className="text-gray-700 text-sm border-t pt-3 font-Inder">
                    {service.details}
                  </p>

                  <button
                    className="mt-4 bg-[#188bff] text-white font-semibold text-Boogaloo cursor-pointer rounded-lg w-30 h-10"
                    onClick={() => navigate(service.route)}
                  >
                    {t("service.more")}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
