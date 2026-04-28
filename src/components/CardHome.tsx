"use client";
import React, { useState } from "react";
import { Building2, Users, MapPin, Plane, X, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const BookingCards = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const { t } = useTranslation();

  const services = [
    {
      id: "investment",
      title: t("heroServices.investment_title"),
      description: t("heroServices.investment_desc"),
      icon: Building2,
      route: "/investment",
    },
    {
      id: "hr",
      title: t("heroServices.hr_title"),
      description: t("heroServices.hr_desc"),
      icon: Users,
      route: "/hrsupport",
    },
    {
      id: "relocation",
      title: t("heroServices.relocation_title"),
      description: t("heroServices.relocation_desc"),
      icon: MapPin,
      route: "/contact",
    },
    {
      id: "travel",
      title: t("heroServices.travel_title"),
      description: t("heroServices.travel_desc"),
      icon: Plane,
      route: "/travel",
    }
  ];

  return (
    <>
      {/* Quick Service Cards - Elevated Design */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 max-w-6xl mx-auto px-2 md:px-4">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <Link
              key={service.id}
              href={service.route}
              className="group relative bg-white rounded-xl md:rounded-2xl p-4 md:p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1 border border-gray-100 hover:border-[#C9A84C]/20 overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Number indicator */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-200 font-bold text-lg md:text-xl group-hover:text-[#C9A84C]/30 transition-colors">
                0{index + 1}
              </div>

              <div className="relative">
                {/* Icon with enhanced styling */}
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-[#C9A84C] transition-all duration-300 shadow-sm group-hover:shadow-md">
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-[#C9A84C] group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-gray-900 font-bold text-sm md:text-base mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-1">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Refined link styling */}
                <div className="flex items-center gap-1 text-[#C9A84C] text-xs md:text-sm font-semibold group/link">
                  <span className="group-hover/link:mr-1 transition-all">{t("heroServices.learn_more")}</span>
                  <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Modal - Redesigned */}
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
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C] flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{service.description}</p>

              <div className="flex gap-3">
                <Link href={service.route} className="flex-1">
                  <button className="w-full bg-[#C9A84C] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#B8973B] transition-colors">
                    {t("heroServices.learn_more")}
                  </button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <button className="w-full border-2 border-[#C9A84C] text-[#C9A84C] py-3 rounded-xl font-semibold text-sm hover:bg-[#C9A84C]/10 transition-colors">
                    {t("heroServices.book_consultation")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default BookingCards;