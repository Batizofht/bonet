"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';

const AIEnhancedBusinessComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center py-12 px-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {/* Vision Card */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-8 w-full md:w-3/5 cursor-pointer transition-all duration-300 hover:bg-gray-100">
          <h2 className="text-2xl font-semibold bg-[#188bff] bg-clip-text text-transparent mb-4 text-center">
            {t('vision.visionTitle')}
          </h2>
          <p className="text-gray-600 text-center">
            {t('vision.visionText')}
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-8 w-full md:w-3/5 cursor-pointer transition-all duration-300 hover:bg-gray-100">
          <h2 className="text-2xl font-semibold bg-[#188bff] bg-clip-text text-transparent mb-4 text-center">
            {t('vision.missionTitle')}
          </h2>
          <p className="text-gray-600 text-center">
            {t('vision.missionText')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIEnhancedBusinessComponent;
