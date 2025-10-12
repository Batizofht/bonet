"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';

const WhyInvest = () => {
  const { t } = useTranslation();

  // Read all texts from translation JSON
  const title = t('whyinvest.title');
  const subtitle = t('whyinvest.subtitle');
  const card = t('whyinvest.card', { returnObjects: true });

  return (
    <div className="bg-white p-6 md:p-12 max-w-7xl mx-auto">
      {/* Title with gradient */}
      <h1 className="text-4xl font-bold bg-[#188bff] bg-clip-text text-transparent mb-4">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-gray-600 mb-10">
        {subtitle}
      </p>

      {/* Card */}
      <div className="bg-gray-100 rounded-2xl shadow-md flex flex-col md:flex-row items-center overflow-hidden">
        {/* Image on the left */}
        <div className="w-full md:w-1/2 h-64 md:h-[600px]">
          <img
            src={card.image}
            alt={card.heading}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text content on the right */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <h2 className="text-2xl font-semibold bg-[#188bff] bg-clip-text text-transparent mb-4">
            {card.heading}
          </h2>
          <h3 className="font-medium text-gray-700 mb-2">
            {card.subheading}
          </h3>

          {card.paragraphs.map((para, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed mt-4">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyInvest;
