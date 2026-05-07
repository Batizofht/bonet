'use client'
import React from "react";
import { useTranslation } from "react-i18next";

const FirstService = ({ image = '/image/2.jpg', subtitle, title, description }) => {
  const { t } = useTranslation();

  return (
    <div
      className="relative w-full h-[50vh] bg-cover bg-center overflow-hidden"
      style={{ 
        backgroundImage: `url('${image}')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center px-4">
        <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
          {subtitle || t("services.title")}
        </span>

        <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6 max-w-4xl leading-[1.1] tracking-tight">
        Services for Foreign Investors in Rwanda
        </h1>

        <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
         Five integrated services — Business Registration, Investment Advisory, HR & Recruitment, Relocation, and Executive Travel — delivered by one team. Built for international entrepreneurs and corporates entering East Africa.
        </p>
      </div>
    </div>
  );
};

export default FirstService;