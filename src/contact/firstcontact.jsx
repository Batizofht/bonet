'use client'
import React from "react";
import { useTranslation } from "react-i18next";

const FirstContact = () => {
  const { t } = useTranslation();

  return (
    <div
      className="relative w-full h-[50vh] bg-cover bg-center overflow-hidden"
      style={{ 
        backgroundImage: "url('/image/2.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}
    >
      {/* Simple Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#188bff]/40 to-red-500/30 flex flex-col justify-center items-center text-center px-4">
        
        {/* Cute Badge */}
        <div className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
          {t("footer.contactUs")}
        </div>
        
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
          {t("Contact Bonet Elite Team ")}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-white/90 max-w-2xl bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          {t("Subtitle.intro2")}
        </p>
      </div>
    </div>
  );
};

export default FirstContact;