"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Target, Eye, Users, Sparkles, Rocket, Globe } from 'lucide-react';

const AIEnhancedBusinessComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full "></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <Users className="w-6 h-6 text-[#188bff] " />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full "></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Who We <span className="bg-[#188bff] bg-clip-text text-transparent">Are</span>
        </h2>
        <p className="text-gray-500 text-lg">Driving excellence through innovation and commitment</p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Vision Card */}
        <div
          className="group relative bg-white rounded-2xl p-8 border-2 border-blue-100 hover:border-[#188bff] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
        >
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Eye className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold bg-[#188bff] bg-clip-text text-transparent mb-4">
            {t('vision.visionTitle')}
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t('vision.visionText')}
          </p>
        </div>

        {/* Mission Card */}
        <div
          className="group relative bg-white rounded-2xl p-8 border-2 border-green-100 hover:border-green-400 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
        >
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Rocket className="w-6 h-6 text-green-400" />
          </div>
          
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Target className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent mb-4">
            {t('vision.missionTitle')}
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t('vision.missionText')}
          </p>
        </div>
      </div>

      {/* Optional About Section */}
      <div
        className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-100"
      >
        <div className="text-center max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-[#188bff] to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Globe className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            About <span className="bg-[#188bff] bg-clip-text text-transparent">Bonet Elite</span>
          </h3>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            We are a premier service provider dedicated to delivering exceptional experiences 
            through innovative solutions and unwavering commitment to excellence. Our team 
            combines expertise with passion to help you achieve your goals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#188bff] rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">5+</span>
              </div>
              <p className="font-semibold text-gray-800">Years Experience</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#188bff] rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">100+</span>
              </div>
              <p className="font-semibold text-gray-800">Happy Clients</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-[#188bff] rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">24/7</span>
              </div>
              <p className="font-semibold text-gray-800">Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEnhancedBusinessComponent;