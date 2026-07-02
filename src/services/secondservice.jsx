"use client"
import React from "react";
import { useTranslation } from "react-i18next";

const SecondService = () => {
  const { i18n } = useTranslation();
  const L = (en, fr, ch) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  return (
    <div className="relative w-full h-[20vh] sm:h-[30vh] bg-gray-900 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/image/7.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/90" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
        <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-[0.15em]">
          {L("About Us","À Propos","关于我们")}
        </p>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">
          {L("About Bonet","À Propos de Bonet","关于Bonet")}
        </h1>
      </div>
    </div>
  );
};
export default SecondService;
