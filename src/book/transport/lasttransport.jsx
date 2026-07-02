import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const BookingOverlay = () => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useRouter();

  const titles = [
    L("Saving your transport details","Enregistrement de vos détails de transport","保存您的交通详情"),
    L("Sending verification","Envoi de la vérification","发送验证")
  ];

  const subtitles = [
    L(
      "We are saving all the transport details you provided to ensure your booking is processed.",
      "Nous enregistrons tous les détails de transport que vous avez fournis pour garantir le traitement de votre réservation.",
      "我们正在保存您提供的所有交通详情，以确保您的预订得到处理。"
    ),
    L(
      "We sent a verification message to your email. Please check it to confirm and finalize your transport booking.",
      "Nous vous avons envoyé un message de vérification à votre e-mail. Veuillez le vérifier pour confirmer et finaliser votre réservation de transport.",
      "我们已向您的电子邮件发送了验证消息。请检查以确认并完成您的交通预订。"
    )
  ];

  useEffect(() => {
    if (currentIndex < titles.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      const successTimer = setTimeout(() => {
        setIsSuccess(true);
      }, 3000);
      return () => clearTimeout(successTimer);
    }
  }, [currentIndex]);

  const handleClose = () => {
    setIsOpen(false);
    navigate('/');
  };

  const handleContinue = () => {
    setIsOpen(false);
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-center text-[#C9A84C] mb-4">
          {isSuccess ? L("Booking Successful","Réservation réussie","预订成功") : titles[currentIndex]}
        </h2>
        <p className="text-gray-700 text-sm text-center mb-4">
          {isSuccess
            ? L(
                "Your transport booking has been confirmed. Please check your email for the confirmation details.",
                "Votre réservation de transport a été confirmée. Veuillez vérifier votre e-mail pour les détails de confirmation.",
                "您的交通预订已确认。请检查您的电子邮件以获取确认详情。"
              )
            : subtitles[currentIndex]}
        </p>

        {!isSuccess && (
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-[#C9A84C] w-8 h-8"></div>
          </div>
        )}

        {isSuccess && (
          <div className="flex justify-center mb-4">
            <div className="bg-[#C9A84C] text-white p-2 rounded-full">
              <FaCheckCircle size={24} />
            </div>
          </div>
        )}

        {isSuccess && (
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="bg-[#C9A84C] text-white font-bold px-6 py-2 rounded mt-4"
            >
              {L("Continue","Continuer","继续")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingOverlay;
