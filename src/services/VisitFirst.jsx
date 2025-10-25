'use client'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const VisitFirst = () => {
  const { t } = useTranslation();
  const fullText = t("home.welcomeText");
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 80;
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
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && index === 0) {
      setTimeout(() => setIsDeleting(false), 500);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, fullText]);

  return (
    <div
      className="relative w-full h-[70vh] bg-cover bg-center overflow-hidden"
      style={{ 
        backgroundImage: "url('https://res.cloudinary.com/take-memories/images/f_auto,dpr_auto,q_auto,w_2000,c_fill,h_1200/gm/hbb8oblj5tozmimydbaz/rwanda-sehenswurdigkeiten')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}
    >
      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-900/30 to-purple-900/40 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
     
        
        {/* Modern Typing Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative"
        >
          <h1 className="font-sans text-5xl sm:text-7xl lg:text-8xl font-black text-white max-w-[400px] sm:max-w-[800px] leading-tight tracking-tight">
            {t("Invest In Rwanda")}
            <span className="inline-block w-0.5 h-16 bg-[#188bff] ml-1 animate-pulse"></span>
          </h1>
        </motion.div>

        {/* Modern Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xl text-white/80 mt-8 max-w-[600px] font-light tracking-normal leading-relaxed backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
        >
          {t("Bonet Elite Services Guides You On Which Bussiness Opportunities To Invest In ")}
        </motion.p>

    
      </div>
    </div>
  );
};

export default VisitFirst;