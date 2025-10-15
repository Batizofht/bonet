"use client";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, DollarSign, Globe, Shield, Cpu, Leaf } from 'lucide-react';

const VisitRwanda = () => {
  const { t } = useTranslation();

  const [expandedIndex, setExpandedIndex] = useState(null);

  const benefits = t('visitrwanda.benefits', { returnObjects: true }) || [];

  const icons = [Zap, DollarSign, Globe, Shield, Cpu, Leaf];

  const handleToggle = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Title & Subtitle */}
      <div className="text-center mb-12">
           <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
           
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
            <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          </div>
          
        
          
             <h2 className="text-4xl font-bold text-gray-800">
          {t("visitrwanda.title").split(" ").map((word, i) => 
            i === 0 || i === 1 || i === 2 ? (
              <span key={i} className="bg-[#188bff] bg-clip-text text-transparent relative">
                {word}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#188bff] transform scale-x-0 hover:scale-x-100 transition-transform"></span>
                {" "}
              </span>
            ) : (
              word + " "
            )
          )}
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => {
          const IconComponent = icons[index] || Globe;
          return (
            <div
              key={index}
              onClick={() => handleToggle(index)}
              className={`bg-white p-6 rounded-2xl border border-blue-100 cursor-pointer transition-all duration-300 ${
                expandedIndex === index 
                  ? 'border-[#188bff] shadow-lg ring-2 ring-blue-50' 
                  : 'hover:border-[#188bff] hover:translate-y-[-2px]'
              }`}
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-[#188bff]" />
                </div>
                <h3 className="text-lg font-semibold bg-[#188bff] bg-clip-text text-transparent">
                  {benefit.title}
                </h3>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">
                {benefit.description}
              </p>
              
              {expandedIndex === index && (
                <div className="animate-fadeIn">
                  <div className="w-8 h-1 bg-blue-100 rounded-full mb-3"></div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {benefit.moreDescription}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VisitRwanda;