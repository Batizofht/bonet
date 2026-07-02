'use client'
import React from "react";
import { useTranslation } from "react-i18next";

const FirstService = ({
  image = '/image/2.jpg',
  subtitle, title, description,
  subtitleKey, titleKey, descriptionKey
}) => {
  const { t } = useTranslation();

  const resolvedSubtitle = subtitleKey ? t(subtitleKey) : subtitle;
  const resolvedTitle = titleKey ? t(titleKey) : title;
  const resolvedDesc = descriptionKey ? t(descriptionKey) : description;

  return (
    <div
      className="relative w-full h-[20vh] sm:h-[30vh] bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/90" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
        {resolvedSubtitle && (
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-[0.15em]">
            {resolvedSubtitle}
          </p>
        )}
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">
          {resolvedTitle || 'Our Services'}
        </h1>
        {resolvedDesc && (
          <p className="text-white/75 max-w-2xl mt-2 text-xs sm:text-sm leading-relaxed">
            {resolvedDesc}
          </p>
        )}
      </div>
    </div>
  );
};

export default FirstService;
