"use client";
import { useState } from "react";
import { Building2, Users, Plane, X, ChevronRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const BookingCards = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const { t } = useTranslation();

  const services = [
    {
      id: "investment",
      title: t("services.list.0.title"),
      description: t("heroServices.investment_desc"),
      icon: Building2,
      route: "/investment",
    },
    {
      id: "consulting",
      title: t("service.consulting.title"),
      description: "Company registration, licensing, and RDB support for foreign investors",
      icon: Briefcase,
      route: "/business-registration",
    },
    {
      id: "hr",
      title: t("menu.hrAndAdminSupport"),
      description: t("heroServices.hr_desc"),
      icon: Users,
      route: "/hr-recruitment",
    },
    {
      id: "travel",
      title: t("menu.travelAndHospitality"),
      description: "Luxury executive travel, relocation, and VIP concierge services",
      icon: Plane,
      route: "/executive-travel",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 max-w-6xl mx-auto px-2 md:px-4">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <Link
              key={service.id}
              href={service.route}
              className="group relative bg-white rounded-xl p-4 md:p-6 border border-gray-200 hover:border-[#C9A84C] transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setSelectedService(service.id);
              }}
            >
              <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-[#C9A84C] mb-3 md:mb-4" />

              <h3 className="text-gray-900 font-bold text-sm md:text-base mb-2 line-clamp-1">
                {service.title}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
                {service.description}
              </p>

              <div className="flex items-center gap-1 text-[#C9A84C] text-xs md:text-sm font-semibold">
                <span>{t("heroServices.learn_more")}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

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
              className="bg-white rounded-xl max-w-md w-full p-6 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <IconComponent className="w-6 h-6 text-[#C9A84C]" />
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{service.description}</p>

              <div className="flex gap-3">
                <Link href={service.route} className="flex-1">
                  <button className="w-full bg-[#C9A84C] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#B8973B] transition-colors cursor-pointer">
                    {t("heroServices.learn_more")}
                  </button>
                </Link>
                <Link href="/contact" className="flex-1">
                  <button className="w-full border border-[#C9A84C] text-[#C9A84C] py-3 rounded-lg font-semibold text-sm hover:bg-[#C9A84C]/5 transition-colors cursor-pointer">
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
