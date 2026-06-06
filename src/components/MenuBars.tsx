'use client'
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import ServicesMegaMenu from "./ServicesMegaMenu";

export default function MenuBars() {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = usePathname();

  // Close dropdown on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!servicesDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [servicesDropdownOpen]);

  const toggleServicesMenu = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
  };

  function getActiveClass(path: string) {
    return location === path
      ? "text-[#C9A84C] font-semibold relative py-2"
      : "font-semibold text-gray-700 hover:text-[#C9A84C] transition-colors duration-200 py-2";
  }

  const { t } = useTranslation();

  const primaryMenuItems = [
    { path: "/", label: t('menu.home') },
    { path: "/about", label: t('menu.aboutUs') },
  ];

  const secondaryMenuItems = [
    { path: "/explore-rwanda", label: "Why Rwanda" },
    {path: "/faq", label: "FAQ"},
  ];

  return (
    <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
      {/* Regular Menu Items */}
      {primaryMenuItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={getActiveClass(item.path)}
        >
          {item.label}
        </Link>
      ))}

      {/* Services Dropdown */}
      <div className="relative" ref={servicesRef}>
        <button
          className={getActiveClass("/services")}
          onClick={toggleServicesMenu}
        >
          <div className="flex items-center gap-1 py-2">
            {t('menu.services')}
            <div className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </button>

        {servicesDropdownOpen && (
          <div>
            <ServicesMegaMenu t={t} onClose={() => setServicesDropdownOpen(false)} />
          </div>
        )}
      </div>

      {/* Secondary Menu Items */}
      {secondaryMenuItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={getActiveClass(item.path)}
        >
          {item.label}
        </Link>
      ))}

      {/* Reservations */}
      <Link href="/Reservations" className={getActiveClass("/Reservations")}>
        {t('menu.bookNow')}
      </Link>

    </div>
  );
}