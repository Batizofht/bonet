"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { FileText, Users, CheckCircle, Building, ClipboardList, Award } from "lucide-react";



const BusinessRegistration = () => {
  const { t } = useTranslation();
  const steps = t("businessRegistration.steps", { returnObjects: true }) ;

  // More icons to cover all possible steps
  const icons = [FileText, Users, CheckCircle, Building, ClipboardList, Award];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-center text-3xl font-bold bg-[#188bff] bg-clip-text text-transparent mb-12">
        {t("businessRegistration.title")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const IconComponent = icons[index] || FileText; // Fallback icon
          return (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white border border-blue-100 hover:border-[#188bff] transition-all duration-300 hover:translate-y-[-4px]"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconComponent className="w-8 h-8 text-[#188bff]" />
              </div>
              <h3 className="text-lg font-semibold bg-[#188bff] bg-clip-text text-transparent mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BusinessRegistration;