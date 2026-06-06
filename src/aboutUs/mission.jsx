"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';

const MissionVisionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-5">
              <p className="text-lg sm:text-xl text-gray-800 font-medium leading-relaxed">
                The team foreign investors call first when entering Rwanda.
              </p>
              <p>
                Five years, 100+ clients across 15+ countries — registration, investment advisory, HR, relocation,
                and executive travel under one roof. We help foreign investors and executives build businesses and
                lives in Rwanda from company registration and tax incentives to relocation and executive travel.
              </p>
              <p>
                We are a premier service provider dedicated to delivering exceptional experiences through innovative
                solutions and unwavering commitment to excellence.
              </p>
            </div>
            <div className="lg:text-right lg:border-l border-gray-200 lg:pl-12">
              <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-[0.15em]">About</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider mb-8">
                Our Story
              </h2>
              <div className="flex flex-wrap lg:justify-end gap-x-10 gap-y-5 pt-8 border-t border-gray-200">
                {[
                  ["5+", "Years Experience"],
                  ["100+", "Foreign Clients"],
                  ["15+", "Countries"],
                  ["24/7", "WhatsApp Support"],
                ].map(([value, label]) => (
                  <div key={label} className="text-center lg:text-right">
                    <div className="text-3xl font-bold text-[#C9A84C]">{value}</div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 lg:mb-20">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Direction</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              Vision &amp; Mission
            </h2>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

            <div className="relative pb-20">
              <div className="absolute left-1/2 top-12 w-px h-16 bg-gray-200 -translate-x-1/2" />
              <div className="absolute left-1/2 top-28 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C9A84C] border-2 border-white" />
              <div className="absolute left-1/2 top-28 w-[calc(50%-40px)] h-px bg-gray-200 -translate-x-full mr-8" />
              <div className="absolute left-1/2 top-28 w-[calc(50%-40px)] h-px bg-gray-200 ml-8" />
            </div>

            <div className="relative flex items-start">
              <div className="w-1/2 pr-16">
                <div className="bg-white rounded-xl p-8 border border-gray-200 text-right">
                  <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider mb-4">{t('vision.visionTitle')}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{t('vision.visionText')}</p>
                </div>
              </div>
              <div className="w-1/2 pl-16">
                <div className="bg-white rounded-xl p-8 border border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider mb-4">{t('vision.missionTitle')}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{t('vision.missionText')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden space-y-6">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider mb-4">{t('vision.visionTitle')}</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{t('vision.visionText')}</p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider mb-4">{t('vision.missionTitle')}</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{t('vision.missionText')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default MissionVisionComponent;
