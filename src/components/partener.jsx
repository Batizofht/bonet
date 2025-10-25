import React from "react";
import { useTranslation } from "react-i18next";

const partners = [
  { src: "../assets/images/part1.jpg", name: "Serena Hotel" },
  { src: "../assets/images/part3.jpg", name: "Radisson Blu Hotel" },
  { src: "../assets/images/part2.jpg", name: "Marriott Hotel" },
  { src: "../assets/images/part5.jpg", name: "Four Points" },
  { src: "../assets/images/part4.jpg", name: "Five To Five" },
  { src: "../assets/images/part6.jpg", name: "Hotel Des Mille Collines" },
];

const PartnerLogos = () => {
  const { t } = useTranslation("partnerLogos");

  return (
    <div
      className="py-6 text-center"
      style={{
        backgroundColor: "#F7F7FA",
        borderWidth: "1px",
        borderColor: "#E7DAED",
      }}
    >
      <div className="w-20 h-1 bg-[#188bff] mx-auto mt-2 mb-5"></div>
      <h1 className="text-gray-700 text-3xl mb-7 font-bold">
        {t("title.part1")}
        <span className="bg-[#188bff] bg-clip-text text-transparent">
          {t("title.part2")}
        </span>
      </h1>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <img
                src={partner.src}
                alt={partner.name}
                className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover border-2 border-gray-300"
              />
              <span className="text-gray-700 font-medium">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerLogos;
