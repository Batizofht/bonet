'use client'
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Briefcase,
  Calendar,
  Building,
  Car,
  MapPin,
  FileText,
  Award,
  ClipboardCheck,
  Search,
  Rocket,
  Handshake,
  TrendingUp,
  DollarSign,
  Settings,
  ClipboardList,
  UserPlus,
  FileEdit,
  GraduationCap,
  CreditCard,
  UserCog,
  ChevronRight,
  Sparkles
} from "lucide-react";

export default function MenuBars() {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const location = usePathname();

  function getActiveClass(path: string) {
    return location === path
      ? "text-[#188bff] font-semibold relative"
      : "font-semibold text-gray-700 hover:text-[#188bff] transition-colors duration-200";
  }

  const { t } = useTranslation();

  const menuItems = [
    { path: "/", label: t('menu.home'), icon: Home },
    { path: "/about", label: t('menu.aboutUs'), icon: Users },
  ];

  const servicesData = [
    {
      id: "travel",
      label: t('menu.travelAndHospitality'),
      icon: Building,
      color: "from-blue-500 to-cyan-400",
      items: [
        { href: "#", icon: Building, label: t('menu.hotels') },
        { href: "#", icon: Home, label: t('menu.apartments') },
        { href: "#", icon: Car, label: t('menu.transport') },
        { href: "/bookNow#tourism", icon: MapPin, label: t('menu.tourism') },
      ]
    },
    {
      id: "investment",
      label: t('menu.investmentAndBusinessSetup'),
      icon: Briefcase,
      color: "from-green-500 to-emerald-400",
      items: [
        { href: "#", icon: FileText, label: t('menu.companyRegistration') },
        { href: "#", icon: Award, label: t('menu.investmentCertificate') },
        { href: "#", icon: ClipboardCheck, label: t('menu.businessPermits') },
        { href: "#", icon: Search, label: t('menu.marketResearch') },
        { href: "#", icon: Rocket, label: t('menu.operationalSetup') },
      ]
    },
    {
      id: "consulting",
      label: t('menu.businessConsulting'),
      icon: Handshake,
      color: "from-purple-500 to-pink-400",
      items: [
        { href: "#", icon: TrendingUp, label: t('menu.businessPlanning') },
        { href: "#", icon: DollarSign, label: t('menu.financialAdvisory') },
        { href: "#", icon: Settings, label: t('menu.processOptimization') },
        { href: "#", icon: ClipboardList, label: t('menu.projectAuditing') },
      ]
    },
    {
      id: "hrsupport",
      label: t('menu.hrAndAdminSupport'),
      icon: Users,
      color: "from-orange-500 to-amber-400",
      items: [
        { href: "#", icon: UserPlus, label: t('menu.recruitment') },
        { href: "#", icon: FileEdit, label: t('menu.hrPolicyDevelopment') },
        { href: "#", icon: GraduationCap, label: t('menu.employeeTraining') },
        { href: "#", icon: CreditCard, label: t('menu.payrollCompensation') },
        { href: "#", icon: UserCog, label: t('menu.administrativeSupport') },
      ]
    }
  ];

  return (
    <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
      {/* Regular Menu Items */}
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link 
            key={item.path} 
            href={item.path} 
            className={getActiveClass(item.path)}
          >
            <div
              className="flex items-center gap-2 py-2 hover:-translate-y-0.5 transition-transform duration-200"
            >
              <IconComponent className="w-4 h-4" />
              {item.label}
            </div>
          </Link>
        );
      })}

      {/* Services Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setServicesDropdownOpen(true)}
        onMouseLeave={() => {
          setServicesDropdownOpen(false);
          setActiveSubmenu(null);
        }}
      >
        <Link href="/services" className={getActiveClass("/services")}>
          <div
            className="flex items-center gap-2 py-2 hover:-translate-y-0.5 transition-transform duration-200"
          >
            <Briefcase className="w-4 h-4" />
            {t('menu.services')}
            <div
              className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`}
            >
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </Link>

        {servicesDropdownOpen && (
          <div
            className="absolute left-0 top-full w-80 bg-white border border-blue-100 shadow-2xl rounded-2xl z-50 overflow-hidden opacity-100 scale-100 transition-all duration-200"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#188bff] to-cyan-500 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-5 h-5" />
                  <div>
                    <h3 className="font-bold text-lg">{t("Our Services")}</h3>
                    <p className="text-white/80 text-sm">{t("Professional solutions for your business")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services List */}
            <div className="p-2">
              {servicesData.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="relative"
                    onMouseEnter={() => setActiveSubmenu(service.id)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    <div
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        activeSubmenu === service.id 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div 
                        onClick={()=>{
                          window.location.href=`/${service.id}`
                        }} 
                        className="flex items-center gap-3"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-800 text-sm">
                          {service.label}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>

                    {/* Submenu */}
                    {activeSubmenu === service.id && (
                      <div
                        className="fixed top-0 left-0 ml-60 bg-white border border-blue-100 shadow-2xl rounded-2xl w-55 overflow-hidden opacity-100 transition-all duration-200"
                        style={{ 
                          zIndex: 9999,
                          top: 50,
                          left: 'auto',
                        }}
                      >
                        <div className="p-4 bg-gradient-to-r from-[#188bff] to-cyan-500 text-white">
                          <h4 className="font-bold text-sm">{service.label}</h4>
                        </div>
                        <div className="p-2">
                          {service.items.map((item, index) => {
                            const ItemIcon = item.icon;
                            return (
                              <div
                                key={index}
                                className="transition-all duration-200"
                              >
                                <Link
                                  href={item.href}
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 group"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <ItemIcon className="w-4 h-4 text-gray-600 group-hover:text-[#188bff]" />
                                  </div>
                                  <span className="text-sm text-gray-700 font-medium">
                                    {item.label}
                                  </span>
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <Link href="/services">
                <button
                  className="w-full flex items-center justify-center gap-2 py-2 bg-[#188bff] text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors hover:scale-105 transition-transform duration-200"
                >
                  <Sparkles className="w-4 h-4" />
                  {t("View All Services")}
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Book Now */}
      <Link href="/bookNow" className={getActiveClass("/bookNow")}>
        <div
          className="flex items-center gap-2 py-2 hover:-translate-y-0.5 transition-transform duration-200"
        >
          <Calendar className="w-4 h-4" />
          {t('menu.bookNow')}
        </div>
      </Link>
    </div>
  );
}