"use client";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { MapPin, Building2, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhyChooseBonet = () => {
  const { t } = useTranslation();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // OPTIMIZED: Memoize cardData to prevent recreating on every render
  const cardData = useMemo(() => [
    {
      icon: MapPin,
      title: t("whyBonet.cards.0.title"),
      shortDesc: t("whyBonet.cards.0.shortDesc"),
      longDesc: t("whyBonet.cards.0.longDesc"),
    },
    {
      icon: Building2,
      title: t("whyBonet.cards.1.title"),
      shortDesc: t("whyBonet.cards.1.shortDesc"),
      longDesc: t("whyBonet.cards.1.longDesc"),
    },
    {
      icon: Users,
      title: t("whyBonet.cards.2.title"),
      shortDesc: t("whyBonet.cards.2.shortDesc"),
      longDesc: t("whyBonet.cards.2.longDesc"),
    },
  ], [t]);

  // OPTIMIZED: Memoize toggle function
  const toggleExpand = useMemo(() => (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  }, [expandedCard]);

  // OPTIMIZED: Memoize animation variants to prevent recalculation
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  }), []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse" />
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent" />
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse" />
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800">
          {t("whyBonet.title").split(" ").map((word, i) => 
            i === 0 || i === 1 ? (
              <span key={i} className="bg-[#188bff] bg-clip-text text-transparent relative">
                {word}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#188bff] transform scale-x-0 hover:scale-x-100 transition-transform" />
                {" "}
              </span>
            ) : (
              word + " "
            )
          )}
        </h2>
      </div>

      {/* OPTIMIZED: Use motion.div with variants instead of individual initial props */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {cardData.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-6 bg-white rounded-2xl border border-blue-100 cursor-pointer transition-all duration-300 ${
                expandedCard === index 
                  ? 'border-[#188bff] shadow-lg ring-2 ring-blue-50' 
                  : 'hover:border-[#188bff] hover:translate-y-[-2px]'
              }`}
              onClick={() => toggleExpand(index)}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-[#188bff]" />
                </div>
                
                <h3 className="text-xl font-bold bg-[#188bff] bg-clip-text text-transparent">
                  {card.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {expandedCard === index ? card.longDesc : card.shortDesc}
                </p>

                <div className="flex items-center gap-1 text-[#188bff] text-sm mt-2">
                  <span>{expandedCard === index ? t("read_less") : t("read_more")}</span>
                  <motion.span
                    animate={{ rotate: expandedCard === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ↓
                  </motion.span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default WhyChooseBonet;