"use client"
import React from "react";
import { useTranslation } from "react-i18next";

const SecondService = () => {
  const { t } = useTranslation();

  return (
    <div 
      className="relative w-full min-h-[60vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image/7.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-3xl">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            About Us
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-6 leading-[1.1] tracking-tight">
            About <span className="text-[#C9A84C]">Bonet</span>
          </h1>

          <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mx-auto">
            Where dreams meet exceptional service and unforgettable moments come to life
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondService;