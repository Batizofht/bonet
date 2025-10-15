'use client'
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import Link from "next/link";
import i18n from "../../i18n";
import { 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  Home, 
  Users, 
  Briefcase, 
  Calendar,
  MessageCircle,
  Sparkles
} from "lucide-react";

const QuickButtons = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = usePathname();
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

  // Refs for dropdown containers
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const desktopButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  type SupportedLanguages = 'en' | 'fr' | 'ch';
  const [language, setLanguage] = useState<SupportedLanguages>('en');

  useEffect(() => {
    setLanguage((i18n.language || "en") as SupportedLanguages);

    const onLanguageChanged = (lng: string) => {
      setLanguage(lng as SupportedLanguages);
    };

    i18n.on("languageChanged", onLanguageChanged);

    return () => {
      i18n.off("languageChanged", onLanguageChanged);
    };
  }, [i18n]);

  // Click outside handler for desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Desktop dropdown
      if (
        desktopDropdownOpen &&
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node) &&
        desktopButtonRef.current &&
        !desktopButtonRef.current.contains(event.target as Node)
      ) {
        setDesktopDropdownOpen(false);
      }

      // Mobile dropdown
      if (
        mobileDropdownOpen &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target as Node)
      ) {
        setMobileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [desktopDropdownOpen, mobileDropdownOpen]);

  const flagImages: Record<SupportedLanguages, string> = {
    en: "../assets/images/usa.png",
    fr: "../assets/images/french.png",
    ch: "../assets/images/chin.webp",
  };

  const languageNames = {
    en: "English",
    fr: "Français", 
    ch: "中文"
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setMobileDropdownOpen(false);
    setDesktopDropdownOpen(false);
  };

  const getActiveClass = (path: string) =>
    location === path ? "text-[#188bff] font-semibold" : "text-gray-700";

  const menuItems = [
    { path: "/", icon: Home, label: t("quickButtons.menu.home") },
    { path: "/about", icon: Users, label: t("quickButtons.menu.aboutUs") },
    { path: "/services", icon: Briefcase, label: t("quickButtons.menu.services") },
    { path: "/bookNow", icon: Calendar, label: t("quickButtons.menu.bookNow") },
  ];

  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:flex space-x-3 items-center">
        {/* Language Selector */}
        <div className="relative">
          <motion.button
            ref={desktopButtonRef}
            onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 font-semibold text-sm rounded-xl border-2 border-blue-100 bg-white hover:border-[#188bff] transition-all duration-200 shadow-sm"
          >
            {/* <Globe className="w-4 h-4 text-[#188bff]" /> */}
            <img
              src={flagImages[language] || flagImages.en}
              alt="Flag"
              className="w-5 h-5 rounded object-cover"
            />
            <span className="min-w-[60px] text-left">{languageNames[language]}</span>
            <motion.div
              animate={{ rotate: desktopDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {desktopDropdownOpen && (
              <motion.div
                ref={desktopDropdownRef}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute left-0 mt-2 w-48 bg-white border border-blue-200 rounded-xl shadow-lg z-50 overflow-hidden"
              >
                {Object.entries(flagImages).map(([lng, flag]) => (
                  <motion.button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    whileHover={{ backgroundColor: "#f8fafc" }}
                    className={`flex w-full items-center px-4 py-3 text-sm transition-colors ${
                      language === lng ? 'bg-blue-50 text-[#188bff]' : 'text-gray-700'
                    }`}
                  >
                    <img
                      src={flag}
                      alt={`${lng} flag`}
                      className="w-5 h-5 rounded object-cover mr-3"
                    />
                    <span className="flex-1 text-left">{languageNames[lng as SupportedLanguages]}</span>
                    {language === lng && (
                      <div className="w-2 h-2 bg-[#188bff] rounded-full"></div>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact Button */}
        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-2 font-semibold rounded-xl text-white bg-gradient-to-r from-[#188bff] to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-4 h-4" />
            {t("common.contactUs")}
          </motion.button>
        </Link>
      </div>

      {/* Mobile menu button */}
      <motion.button
        className="md:hidden p-2 bg-gradient-to-r from-[#188bff] to-cyan-500 text-white rounded-xl shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        aria-label={t("quickButtons.ariaLabels.openMenu")}
      >
        <Menu className="w-6 h-6" />
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile side menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#188bff] to-cyan-500 text-white">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Bonet</h3>
                    <p className="text-white/80 text-sm">Elite Services</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Language Selector */}
              <div className="relative">
                <motion.button
                  ref={mobileButtonRef}
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-between w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
                >
                  <div className="flex items-center gap-3">
                    {/* <Globe className="w-4 h-4" /> */}
                    <img
                      src={flagImages[language] || flagImages.en}
                      alt="Flag"
                      className="w-6 h-6 rounded object-cover"
                    />
                    <span className="font-semibold">{languageNames[language]}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: mobileDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {mobileDropdownOpen && (
                    <motion.div
                      ref={mobileDropdownRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-xl border border-white/30 shadow-lg overflow-hidden"
                    >
                      {Object.entries(flagImages).map(([lng, flag]) => (
                        <motion.button
                          key={lng}
                          onClick={() => changeLanguage(lng)}
                          whileHover={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                          className={`flex w-full items-center px-4 py-3 text-gray-800 ${
                            language === lng ? 'bg-white/60' : ''
                          }`}
                        >
                          <img
                            src={flag}
                            alt={`${lng} flag`}
                            className="w-5 h-5 rounded object-cover mr-3"
                          />
                          <span className="flex-1 text-left font-medium">
                            {languageNames[lng as SupportedLanguages]}
                          </span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                        location === item.path
                          ? 'bg-blue-50 text-[#188bff] border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Contact Button */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-gradient-to-r from-[#188bff] to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t("quickButtons.menu.contactUs")}
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuickButtons;