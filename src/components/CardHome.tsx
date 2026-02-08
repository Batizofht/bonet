"use client";
import React, { useState } from "react";
import { Building, Home, Car, Users, X, Star } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const BookingCards = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const { t } = useTranslation();

  const services = [
    {
      id: "hotel",
      title: t("hotel_title"),
      description: t("hotel_desc"),
      icon: Building,
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: "apartments",
      title: t("apartments_title"),
      description: t("apartments_desc"),
      icon: Home,
      color: "from-green-500 to-emerald-400",
    },
    {
      id: "transport",
      title: t("transport_title"),
      description: t("transport_desc"),
      icon: Car,
      color: "from-orange-500 to-amber-400",
    },
    {
      id: "tourism",
      title: t("tourism_title"),
      description: t("tourism_desc"),
      icon: Users,
      color: "from-purple-500 to-pink-400",
    }
  ];

  return (
    <>
      {/* Cards Section */}
      <div 
        className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto px-4"
      >
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 cursor-pointer group hover:bg-white/20 transition-all duration-300"
              onClick={() => setSelectedService(service.id)}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 mx-auto`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-white font-semibold text-center text-sm mb-1">
                {service.title}
              </h3>
              <p className="text-gray-200 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedService && (() => {
        const service = services.find(s => s.id === selectedService);
        if (!service) return null;
        const IconComponent = service.icon;

        return (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedService(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-sm w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{service.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              
              <div className="space-y-2 mb-6">
                <h4 className="font-semibold text-gray-800 text-sm">{t("features")}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>{t("premium_quality")}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>{t("best_price")}</span>
                </div>
              </div>
              <Link href={`/bookNow#${selectedService}`}>
                <button className="w-full bg-[#188bff] text-white py-2 rounded-xl font-semibold text-sm hover:bg-blue-600 transition-colors">
                  {t("book_now")}
                </button>
              </Link>
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default BookingCards;