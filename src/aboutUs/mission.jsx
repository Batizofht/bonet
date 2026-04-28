"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';

const AIEnhancedBusinessComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
              Company
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Vision & <span className="text-[#C9A84C]">Mission</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Driving excellence through innovation and commitment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('vision.visionTitle')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('vision.visionText')}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('vision.missionTitle')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('vision.missionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
              Overview
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
              About <span className="text-[#C9A84C]">Bonet Elite</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto">
              We are a premier service provider dedicated to delivering exceptional experiences through innovative solutions and unwavering commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="text-6xl font-bold text-[#C9A84C] mb-3">5+</div>
              <p className="text-gray-900 font-semibold">Years Experience</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="text-6xl font-bold text-[#C9A84C] mb-3">100+</div>
              <p className="text-gray-900 font-semibold">Happy Clients</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="text-6xl font-bold text-[#C9A84C] mb-3">24/7</div>
              <p className="text-gray-900 font-semibold">Support</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AIEnhancedBusinessComponent;