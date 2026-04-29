'use client'
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import ServicesMegaMenu from "./ServicesMegaMenu";

export default function MenuBars() {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = usePathname();

  // Close dropdown on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
  }, [location]);

  const openServicesMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const closeServicesMenuWithDelay = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
      closeTimerRef.current = null;
    }, 180);
  };

  function getActiveClass(path: string) {
    return location === path
      ? "text-[#C9A84C] font-semibold relative"
      : "font-semibold text-gray-700 hover:text-[#C9A84C] transition-colors duration-200";
  }

  const { t } = useTranslation();

  const primaryMenuItems = [
    { path: "/", label: t('menu.home') },
    { path: "/about", label: t('menu.aboutUs') },
  ];

  const secondaryMenuItems = [
    { path: "/explore-rwanda", label: "Explore Rwanda" },
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
          <div className="py-2 hover:-translate-y-0.5 transition-transform duration-200">
            {item.label}
          </div>
        </Link>
      ))}

      {/* Services Dropdown */}
      <div
        className="relative"
        onMouseEnter={openServicesMenu}
        onMouseLeave={closeServicesMenuWithDelay}
      >
        <Link
          href="/services"
          className={getActiveClass("/services")}
          onClick={() => setServicesDropdownOpen(false)}
        >
          <div className="flex items-center gap-1 py-2 hover:-translate-y-0.5 transition-transform duration-200">
            {t('menu.services')}
            <div className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </Link>

        {servicesDropdownOpen && (
          <div onMouseEnter={openServicesMenu} onMouseLeave={closeServicesMenuWithDelay}>
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
          <div className="py-2 hover:-translate-y-0.5 transition-transform duration-200">
            {item.label}
          </div>
        </Link>
      ))}

      {/* Book Now */}
      <Link href="/bookNow" className={getActiveClass("/bookNow")}>
        <div className="py-2 hover:-translate-y-0.5 transition-transform duration-200">
          {t('menu.bookNow')}
        </div>
      </Link>

    </div>
  );
}