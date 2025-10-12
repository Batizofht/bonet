"use client"
import React from "react";
import { useTranslation } from "react-i18next";

const GoogleMapEmbed = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-[500px] mb-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-5 mt-10">
          {t("locationSection.title").split(" ")[0]}{" "}
          <span className="bg-[#188bff] bg-clip-text text-transparent">
            {t("locationSection.title").split(" ")[1]}
          </span>
        </h1>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3078.896987330303!2d30.12271957358988!3d-1.9494688367076565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca76e7bf4e2d3%3A0xa45692b805f13796!2sKimironko%20Bus%20Station!5e1!3m2!1sen!2srw!4v1742228259950!5m2!1sen!2srw"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full rounded-lg"
      ></iframe>
    </div>
  );
};

export default GoogleMapEmbed;
