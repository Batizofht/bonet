"use client"
import React from "react";
import { useTranslation } from "react-i18next";

const BusinessRegistration = () => {
  const { t } = useTranslation();

  // Get the steps as an array of objects
  const steps = t("businessRegistration.steps", { returnObjects: true });

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-center text-3xl max-w-[30pc] md:ml-[24pc] ml-0 font-bold bg-[#188bff] bg-clip-text text-transparent mb-12">
        {t("businessRegistration.title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="card bg-white text-gray-600 shadow-lg rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold bg-[#188bff] bg-clip-text text-transparent mb-4">
              {step.title}
            </h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessRegistration;
