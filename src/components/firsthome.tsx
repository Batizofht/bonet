"use client"
import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import BookingCards from "./CardHome";
import { Clock, Users, Globe, Award, ArrowRight } from "lucide-react";

const FirstHome = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [imageLoaded, setImageLoaded] = useState(false);

  const trustStats = useMemo(() => [
    { icon: Award, value: "5+", label: "Years Experience" },
    { icon: Users, value: "100+", label: "Foreign Clients" },
    { icon: Globe, value: "15+", label: "Countries" },
    { icon: Clock, value: "24/7", label: "WhatsApp Support" },
  ], []);

  useEffect(() => {
    const img = new Image();
    img.src = '/image/1.jpg';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div
      className="relative w-full min-h-screen bg-gray-900 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: imageLoaded ? "url('/image/1.jpg')" : "none" }}
    >
      <div className="absolute inset-0 bg-black/90 z-10" />

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="w-full max-w-4xl mx-auto">

          <p className="text-white/60 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] mb-4 sm:mb-5">
            Rwanda Investment Experts
          </p>

          <h1 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase tracking-[0.05em] leading-[1.1] max-w-5xl mx-auto mb-6">
            Invest in Rwanda
            <span className="block text-[#C9A84C] mt-2">With Confidence</span>
          </h1>

          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
            Zero minimum capital. 6-hour company registration. 0% corporate tax for qualifying investments.
          </p>

          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto mb-10">
            Full-service support from legal setup to daily operations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-900 bg-white rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => router.push("/contact")}
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/30 rounded-lg hover:border-white/50 transition-colors cursor-pointer"
              onClick={() => router.push("/services")}
            >
              Explore Services
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
            {trustStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 md:gap-3 border border-white/10 rounded-lg px-3 py-2 md:px-4 md:py-2.5">
                <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-[#C9A84C]" />
                <div className="text-left">
                  <div className="font-bold text-white text-sm md:text-base leading-none">{stat.value}</div>
                  <div className="text-white/50 text-[10px] md:text-xs uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-10 w-full max-w-6xl mx-auto">
            <BookingCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstHome;
