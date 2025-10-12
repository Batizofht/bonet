"use client"
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faMoneyBillWave,
  faGlobeAfrica,
  faShieldAlt,
  faMicrochip,
  faLeaf
} from '@fortawesome/free-solid-svg-icons';


const iconList = [
  faBolt,
  faMoneyBillWave,
  faGlobeAfrica,
  faShieldAlt,
  faMicrochip,
  faLeaf
];

const VisitRwanda = () => {
  const { t } = useTranslation();

  const [expandedIndex, setExpandedIndex] = useState(null);

  // Get benefits array safely, default to []
  const benefits = t('visitrwanda.benefits', { returnObjects: true }) || [];

  const handleToggle = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      {/* Title & Subtitle */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold max-w-[35pc] ml-0 md:ml-[20pc] bg-[#188bff] bg-clip-text text-transparent">
          {t('visitrwanda.title')}
        </h2>
        <p className="text-gray-600 mt-2 text-[15px]">{t('visitrwanda.subtitle')}</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            onClick={() => handleToggle(index)}
            className={`bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer ${
              expandedIndex === index ? 'ring-2 ' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <FontAwesomeIcon icon={iconList[index]} className="text-xl text-blue-500" />
              <h3 className="text-lg font-semibold bg-[#188bff] bg-clip-text text-transparent">
                {benefit.title}
              </h3>
            </div>
            <p className="text-gray-600 text-sm">{benefit.description}</p>
            {expandedIndex === index && (
              <p className="text-gray-700 text-sm mt-3">{benefit.moreDescription}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitRwanda;
