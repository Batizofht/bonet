'use client'
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function WelcomeMessageAI() {
  const { i18n } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const message =
  i18n.language === "fr"
        ? "Bienvenue chez Bonet Elite Services. Comment pouvons-nous vous aider ?"
        : "Welcome to Bonet Elite Services. How can we help you today?"
    
  return (
    <div className="flex flex-col space-y-3">
      {show && (
        <>
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Bonet Support</p>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-md bg-white text-gray-800 border border-gray-100 text-sm leading-relaxed">
              {message}
            </div>
          </div>
        </>
      )}
    </div>
  );
}