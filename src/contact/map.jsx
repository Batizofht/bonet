"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const GoogleMapEmbed = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      className="py-16 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      {/* EXACT SAME HEADER AS BLOG SECTION */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <MapPin className="w-6 h-6 text-[#188bff] animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          <span className="text-gray-600">{t("locationSection.title").split(" ")[0]}</span>{" "}
          <span className="bg-[#188bff] bg-clip-text text-transparent">
            {t("locationSection.title").split(" ")[1]}
          </span>
        </h2>
        <p className="text-gray-500 text-lg">
        { "Find us easily at our convenient location!"}
        </p>
      </div>

      {/* Map Container */}
      <motion.div 
        className="bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
        whileHover={{ y: -5, scale: 1.01 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="w-full h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3078.896987330303!2d30.12271957358988!3d-1.9494688367076565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca76e7bf4e2d3%3A0xa45692b805f13796!2sKimironko%20Bus%20Station!5e1!3m2!1sen!2srw!4v1742228259950!5m2!1sen!2srw"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Location Info */}
        <div className="p-6 border-t border-blue-100">
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#188bff] transition-colors">
            Our Main Office
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Kimironko Bus Station Area, Kigali, Rwanda
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Easy to find</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Open 24/7</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default GoogleMapEmbed;