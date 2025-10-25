'use client'
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function WelcomeMessageAI() {
  const { i18n } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay before bubble appears
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const message =
  i18n.language === "fr"
        ? "🤖 Bienvenue chez Bonet Elite Services ! Nous sommes ravis de vous offrir un support personnalisé et un service de qualité supérieure."
        : "🤖 Welcome to Bonet Elite Services! We’re excited to offer you personalized support and top-notch service."
    
  return (
    <div className="flex flex-col space-y-2">
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`relative min-w-[2%] max-w-[80%] px-3 py-3 rounded-2xl shadow-md break-words text-sm
          mr-auto bg-white text-gray-800 rounded-bl-none`}
        >
          <p className="text-left">{message}</p>
        </motion.div>
      )}
    </div>
  );
}
    