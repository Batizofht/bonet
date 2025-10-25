import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function WelcomeMessage() {
  const { i18n } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay before bubble appears
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const message =
    status === "OFF"
      ? i18n.language === "fr"
        ? "Merci d'avoir visité Bonet Elite Services. Notre équipe est actuellement hors ligne, mais nous serions ravis de vous aider bientôt. Veuillez partager votre nom, vos coordonnées et votre message, nous vous répondrons sous peu."
        : "Thank you for visiting Bonet Elite Services. Our team is currently offline, but we’d love to assist you soon. Please share your name, contact info, and message and we’ll get back to you shortly."
      : i18n.language === "fr"
      ? "👋 Bonjour et bienvenue chez Bonet Elite Services ! Nous sommes là pour vous offrir un support personnalisé et un service exceptionnel. Puis-je connaître votre nom afin de mieux vous aider ?"
      : "👋 Hello and Welcome to Bonet Elite Services! We're here to provide you with tailored support and exceptional service. May I know your name so we can assist you better?";

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
    