"use client";
import { useState } from "react";
import { Building, Handshake, Briefcase, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

interface Service {
  title: string;
  description: string;
  details: string;
  route: string;
  buttonText: string;
}

const icons = [Building, Handshake, Briefcase];

function Services() {
  const { t } = useTranslation();
  const navigate = useRouter();
  const [selectedService, setSelectedService] = useState<number | null>(0);
  const servicesRaw = t("services.list", { returnObjects: true });
  const services: Service[] = Array.isArray(servicesRaw) ? servicesRaw : [];

  return (
    <div className="w-full flex flex-col items-center p-8 min-h-[500px] bg-gradient-to-b from-white to-blue-50/30">
      {/* Header with unique styling */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800">
          {t("services.title", "Our Services").split(" ").map((word, i) => 
            i === 1 ? (
              <span key={i} className="bg-[#188bff] bg-clip-text text-transparent relative">
                {word}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#188bff] transform scale-x-0 hover:scale-x-100 transition-transform"></span>
                {" "}
              </span>
            ) : (
              word + " "
            )
          )}
        </h2>
      </div>

      {/* Cards with unique layout */}
      <div className="flex flex-col gap-4 w-full max-w-6xl">
        {services.map((service, index) => {
          const IconComponent = icons[index] || Building;
          const isSelected = selectedService === index;

          return (
            <div
              key={index}
              className={`bg-white rounded-2xl p-1 transition-all duration-500 cursor-pointer group ${
                isSelected 
                  ? "shadow-2xl ring-2 ring-[#188bff] ring-opacity-20" 
                  : "shadow-lg hover:shadow-xl"
              }`}
              onClick={() => setSelectedService(isSelected ? null : index)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      isSelected 
                        ? "bg-[#188bff] text-white transform rotate-12" 
                        : "bg-blue-100 text-[#188bff] group-hover:bg-blue-200"
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-gray-800">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`transition-transform duration-300 ${
                    isSelected ? "rotate-180" : ""
                  }`}>
                    {isSelected ? (
                      <ChevronUp className="w-5 h-5 text-[#188bff]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#188bff]" />
                    )}
                  </div>
                </div>

                {/* Expandable content */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  isSelected ? "max-h-96 mt-6" : "max-h-0"
                }`}>
                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-gray-700 text-sm leading-relaxed mb-6">
                      {service.details}
                    </p>
                    <div className="flex justify-center items-center">
                        <button
                      className="flex items-center gap-3 bg-[#188bff] text-white px-8 py-4 rounded-2xl hover:bg-blue-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl cursor-pointer group/btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate.push(service.route);
                      }}
                    >
                      {service.buttonText}
                         <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button> 
                    </div>
                 
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Services;