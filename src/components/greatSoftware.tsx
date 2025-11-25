import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, Globe, Zap } from "lucide-react";

const AiSolutions = () => {
  const { t } = useTranslation();

  const aiFeatures = [
    {
      image: "../assets/images/rdb3.jfif",
      title: t("aisolutions.feature1.title"),
      description: t("aisolutions.feature1.description"),
      highlight: t("aisolutions.feature1.highlight"),
      link: "/contact",
      icon: Target,
      color: "from-blue-500 to-cyan-400"
    },
    {
      image: "../assets/images/luxury.jpg",
      title: t("aisolutions.feature2.title"),
      description: t("aisolutions.feature2.description"),
      highlight: t("aisolutions.feature2.highlight"),
      link: "/blog-travel-tips",
      icon: Globe,
      color: "from-green-500 to-emerald-400"
    },
    {
      image: "../assets/images/vision.jpg",
      title: t("aisolutions.feature3.title"),
      description: t("aisolutions.feature3.description"),
      highlight: t("aisolutions.feature3.highlight"),
      link: "/blog-investment",
      icon: Zap,
      color: "from-orange-500 to-amber-400"
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <Sparkles className="w-5 h-5 text-[#188bff] animate-pulse" />
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
        </div>
        
<h2 className="text-4xl font-bold text-gray-800 mb-4">
  {t("aisolutions.title").split(" ").map((word, i, arr) => 
    i > 1 ? (
      <span key={i}>
        <span className="bg-[#188bff] bg-clip-text text-transparent relative inline-block">
          {word}
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#188bff] to-cyan-400 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
        </span>
        {i < arr.length - 1 ? ' ' : ''}
      </span>
    ) : (
      <span key={i}>
        {word}
        {i < arr.length - 1 ? ' ' : ''}
      </span>
    )
  )}
</h2>
        <p className="text-gray-500 text-lg">{t("Innovative solutions for modern businesses")}</p>
      </div>

      {/* Features */}
      <div className="space-y-12">
        {aiFeatures.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-8 group ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="lg:w-1/2 w-full">
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-64 lg:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 w-full text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-md`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Highlight Quote */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-l-4 border-[#188bff] mb-6">
                  <p className="text-[#188bff] italic font-medium text-sm leading-relaxed">
                    "{feature.highlight}"
                  </p>
                </div>

                {/* Learn More Button */}
                <motion.div 
                  className="flex justify-center lg:justify-start"
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={feature.link}
                    className="inline-flex items-center gap-2 bg-white border-2 border-[#188bff] text-[#188bff] px-6 py-3 rounded-xl hover:bg-[#188bff] hover:text-white transition-all duration-300 font-semibold group/btn shadow-sm hover:shadow-md"
                  >
                    {t("aisolutions.learnMore")}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AiSolutions;