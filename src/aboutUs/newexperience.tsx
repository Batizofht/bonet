"use client";
import { Building2, User, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export default function NewExperience() {
  const { t } = useTranslation();

  // OPTIMIZED: Memoize features array to prevent recreation on every render
  const features = useMemo(() => [
    {
      title: t("experience.card1.title"),
      description: t("experience.card1.description"),
      icon: Building2,
    },
    {
      title: t("experience.card2.title"),
      description: t("experience.card2.description"),
      icon: User,
    },
    {
      title: t("experience.card3.title"),
      description: t("experience.card3.description"),
      icon: Rocket,
    }
  ], [t]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
   

  <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800">
          {t("experience.title", "Our Services").split(" ").map((word, i) => 
            i !== 0 && i !== 1 ? (
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-blue-100 hover:border-[#188bff] hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                  <IconComponent className="w-6 h-6 text-[#188bff]" />
                </div>
                <h3 className="text-lg font-semibold bg-[#188bff] bg-clip-text text-transparent">
                  {feature.title}
                </h3>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}