"use client"
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const SecondService = () => {
  const { t } = useTranslation();
  const fullText = t("home.welcomeText");
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = 150;
    const deletingSpeed = 100;
    let timer;

    if (!isDeleting && index < fullText.length) {
      timer = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (isDeleting && index > 0) {
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }, deletingSpeed);
    } else if (!isDeleting && index === fullText.length) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && index === 0) {
      timer = setTimeout(() => setIsDeleting(false), 1000);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, fullText]);

  return (
    <div
   
      className="relative w-full min-h-[70vh] sm:min-h-[80vh] bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/image/7.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 border-2 border-[#188bff] text-white px-6 py-1 rounded-full text-sm sm:text-base font-semibold shadow-lg">
          {t("footer.aboutUs")}
        </div>

        {/* Typing heading */}
        <h1 className="font-lobster text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-full sm:max-w-2xl font-bold bg-[#188bff] bg-clip-text text-transparent leading-tight">
          {text}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-200 mt-4 max-w-md sm:max-w-lg">
          {t("Subtitle.intro1")}
        </p>
      </div>
    </div>
  );
};

export default SecondService;
