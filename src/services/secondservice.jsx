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
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/60 via-blue-600/40 to-cyan-500/70 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-2xl">
          
          {/* Decorative icon */}
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
            <div className="w-12 h-12 bg-gradient-to-br from-white to-white/70 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌟</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
            About Bonet
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Where dreams meet exceptional service and unforgettable moments come to life
          </p>

          {/* Decorative divider */}
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="w-8 h-1 bg-white/50 rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-8 h-1 bg-white/50 rounded-full"></div>
          </div>

          {/* CTA badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <span className="text-sm font-semibold">✨ Your Journey Starts Here</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondService;