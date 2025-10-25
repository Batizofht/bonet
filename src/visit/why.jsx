"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles, Target, TrendingUp, Users, Shield, Globe } from 'lucide-react';

const WhyInvest = () => {
  const { t } = useTranslation();

  // Read all texts from translation JSON
  const title = t('whyinvest.title');
  const subtitle = t('whyinvest.subtitle');
  const card = t('whyinvest.card', { returnObjects: true });

  const features = [
    { icon: <TrendingUp className="w-5 h-5" />, text: "Growing Economy" },
    { icon: <Shield className="w-5 h-5" />, text: "Political Stability" },
    { icon: <Users className="w-5 h-5" />, text: "Young Population" },
    { icon: <Globe className="w-5 h-5" />, text: "Strategic Location" },
    { icon: <Target className="w-5 h-5" />, text: "Investment Opportunities" },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50/50 to-cyan-50/30 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Cute Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
            <Sparkles className="w-6 h-6 text-[#188bff] animate-pulse" />
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
            <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <span className="text-gray-600">{title.split(' ')[0]}</span>{" "}
            <span className="bg-[#188bff] bg-clip-text text-transparent">
              {title.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="text-[#188bff]">
                {feature.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {feature.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Card */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/2 relative overflow-hidden group">
              <img
                src={card.image}
                alt={card.heading}
                className="w-full h-64 lg:h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-[#188bff] rounded-full animate-pulse"></div>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#188bff] to-cyan-500 bg-clip-text text-transparent">
                  {card.heading}
                </h2>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-700 mb-6 leading-relaxed">
                {card.subheading}
              </h3>

              <div className="space-y-4">
                {card.paragraphs.map((para, idx) => (
                  <motion.p 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                    viewport={{ once: true }}
                    className="text-gray-600 leading-relaxed text-lg border-l-4 border-[#188bff]/20 pl-4 py-1 hover:border-[#188bff]/40 transition-all duration-300"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="flex gap-2 mt-8">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-gradient-to-br from-[#188bff] to-cyan-400 rounded-full opacity-60"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-[#188bff] rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyInvest;