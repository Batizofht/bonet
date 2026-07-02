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
    L("Saving your info","Enregistrement de vos informations","保存您的信息"),
    L("Sending verification","Envoi de la vérification","发送验证")
  ];

  const subtitles = [
    L(
      "We are saving all info you provided in previous steps for your booking process.",
      "Nous enregistrons toutes les informations que vous avez fournies lors des étapes précédentes pour votre processus de réservation.",
      "我们正在保存您在之前步骤中提供的所有信息，用于您的预订流程。"
    ),
    L(
      "We sent you a verification message on the email provided. Once checked, your booking details will be submitted to the hotel immediately.",
      "Nous vous avons envoyé un message de vérification à l'e-mail fourni. Une fois vérifié, vos détails de réservation seront immédiatement envoyés à l'hôtel.",
      "我们已向您提供的电子邮件发送了验证消息。确认后，您的预订详情将立即提交给酒店。"
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
          {isSuccess ? L("Success","Succès","成功") : titles[currentIndex]}
        </h2>
        <p className="text-gray-700 text-sm text-center mb-4">
          {isSuccess
            ? L(
                "Your information has been submitted successfully. Please check your email for the SMS confirmation to complete the booking.",
                "Vos informations ont été soumises avec succès. Veuillez vérifier votre e-mail pour la confirmation SMS afin de finaliser la réservation.",
                "您的信息已成功提交。请检查您的电子邮件以获取短信确认，以完成预订。"
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
