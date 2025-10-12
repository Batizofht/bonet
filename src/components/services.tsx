
import { useState } from "react";
import { FaHotel, FaBriefcase, FaHandshake, FaUsers } from "react-icons/fa";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

interface Service {
  title: string;
  description: string;
  details: string;
  route: string;
  buttonText: string;
}

const icons = [
  <FaHotel size={24} color="#62b1ff" />,
  <FaHandshake size={24} color="#62b1ff" />,
  <FaBriefcase size={24} color="#62b1ff" />,
 
];

function Services() {
  const { t } = useTranslation();
  const navigate = useRouter();
  const [selectedService, setSelectedService] = useState<number | null>(null);
const servicesRaw = t("services.list", { returnObjects: true });
const services: Service[] = Array.isArray(servicesRaw) ? servicesRaw : [];

  return (
    <div className="w-full flex flex-col items-center p-8 min-h-[500px] font-roboto">
      <div className="w-20 h-1 bg-[#188bff] mx-auto mt-2 mb-5" />
      
      <h2 className="text-gray-700 text-3xl font-bold text-center mb-6 font-raleway">
        {t("services.title", "Our Services").split(" ").map((word, i) => 
          i === 1 ? (
            <span key={i} className="bg-[#188bff] bg-clip-text text-transparent">
              {word}{" "}
            </span>
          ) : (
            word + " "
          )
        )}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[250px] mb-5">
        {services.map((service, index) => (
          <div
            key={index}
            className={`border p-6 rounded-lg shadow-md w-72 h-auto border-gray-300 transition-all duration-300 cursor-pointer ${
              selectedService === index ? "border-blue-500 scale-105" : ""
            }`}
            onClick={() => setSelectedService(selectedService === index ? null : index)}
          >
            <div className="flex flex-col items-start">
              <div className="p-1 rounded-full bg-[#188bff]">
                <div className="bg-white p-2 rounded-full flex items-center justify-center">
                  {icons[index]}
                </div>
              </div>

              <h3 className="bg-[#188bff] bg-clip-text text-transparent font-bold mt-3 font-raleway">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                {service.description}
              </p>

              {selectedService === index && (
                <>
                  <p className="text-gray-700 text-sm mt-3 border-t pt-3">
                    {service.details}
                  </p>
                  <div className="flex justify-center w-full mt-3">
                    <button
                      className="text-bold mt-3 bg-[#188bff] text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition-all font-raleway"
                      onClick={() => navigate.push(service.route)}
                    >
                      {service.buttonText}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
