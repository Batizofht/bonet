'use client'
import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import Link from "next/link";
import i18n from "../../i18n";


const QuickButtons = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = usePathname();
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

  type SupportedLanguages = 'en' | 'fr' | 'ch';
  // Start with English explicitly, then update after i18n ready
  const [language, setLanguage] = useState<SupportedLanguages>('en');

  useEffect(() => {
    setLanguage((i18n.language || "en") as SupportedLanguages);

    const onLanguageChanged = (lng:string) => {
      setLanguage(lng as SupportedLanguages);
    };

    i18n.on("languageChanged", onLanguageChanged);

    return () => {
      i18n.off("languageChanged", onLanguageChanged);
    };
  }, [i18n]);
  const flagImages: Record<SupportedLanguages, string> = {
    en: "../assets/images/usa.png",
    fr: "../assets/images/french.png",
    ch: "../assets/images/chin.webp",
  };

  const changeLanguage = (lng:string) => {
    i18n.changeLanguage(lng);
    setMobileDropdownOpen(false);
    setDesktopDropdownOpen(false);
  };

  const getActiveClass = (path:string) =>
    location === path ? "text-blue-600 font-semibold" : "text-gray-700";

  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:flex space-x-4 items-center">
        <div className="relative">
          <button
            onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
            className="flex ml-13 items-center space-x-2 px-4 py-2 text-gray-700 font-bold text-[12px] rounded-md border border-[#188bff]"
          >
            <img
              src={flagImages[language] || flagImages.en}
              alt="Flag"
              className="w-5 h-5 max-w-5 max-h-5 object-contain"
            />
            <span>{language === "en" ? "English" : language === "fr" ? "Francais" : "China"}</span>
          </button>
          {desktopDropdownOpen && (
            <div
              style={{ borderRadius: "5px" }}
              className="absolute left-10 mt-2 w-32 bg-white border border-[#188bff] shadow-lg text-[12px] text-gray-700 z-50"
            >
              <button
                onClick={() => changeLanguage("en")}
                className="flex w-full items-center px-3 py-2 hover:bg-gray-200"
              >
                <img
                  src={flagImages.en}
                  alt="US Flag"
                  className="w-5 h-5 max-w-5 max-h-5 object-contain mr-2"
                />
                English
              </button>
              <button
                onClick={() => changeLanguage("fr")}
                className="flex w-full items-center px-3 py-2 hover:bg-gray-200"
              >
                <img
                  src={flagImages.fr}
                  alt="French Flag"
                  className="w-5 h-5 max-w-5 max-h-5 object-contain mr-2"
                />
                Français
              </button>
                <button
                onClick={() => changeLanguage("ch")}
                className="flex w-full items-center px-3 py-2 hover:bg-gray-200"
              >
                <img
                  src={flagImages.ch}
                  alt="French Flag"
                  className="w-5 h-5 max-w-5 max-h-5 object-contain mr-2"
                />
                China
              </button>
            </div>
          )}
        </div>

        <Link href="/contact">
          <button className="px-4 py-2 font-bold rounded-md text-white bg-[#188bff]">
            {t("common.contactUs")}
          </button>
        </Link>

      
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-blue-500 text-2xl"
        onClick={() => setIsOpen(true)}
        aria-label={t("quickButtons.ariaLabels.openMenu")}
      >
        <FiMenu />
      </button>
  {isOpen && (
    <div
      className="fixed inset-0 bg-black/60 bg-opacity-50 z-40 transition-opacity duration-300"
      onClick={() => setIsOpen(false)} // Close when clicking outside
    ></div>
  )}
      {/* Mobile side menu */}
      <div
        className={`fixed top-0 right-0 rounded-l-2xl h-full w-64 bg-white shadow-lg transform transition-transform  duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
        {/* Top Row: Close Icon + Language Selector */}
        <div className="flex items-center justify-between px-4 py-4">
          <button
            className="text-blue-500 text-2xl bg-gray-200/50 hover:bg-gray-200/70 rounded-full p-1"
            onClick={() => setIsOpen(false)}
            aria-label={t("quickButtons.ariaLabels.closeMenu")}
          >
            <FiX />
          </button>

          <div className="relative">
            <button
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 font-bold text-sm rounded-md border border-gray-300"
            >
              <img
                src={flagImages[language] || flagImages.en}
                alt="Flag"
                className="w-5 h-5 object-contain"
              />
            
            </button>

            {mobileDropdownOpen && (
              <div
                style={{ borderRadius: "5px" }}
                className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 shadow-lg text-sm text-gray-700 z-50"
              >
                <button
                  onClick={() => changeLanguage("en")}
                  className="flex w-full items-center px-3 py-2 hover:bg-gray-200"
                >
                  <img
                    src={flagImages.en}
                    alt="US Flag"
                    className="w-5 h-5 object-contain mr-2"
                  />
                  {t("quickButtons.languages.en")}
                </button>
                <button
                  onClick={() => changeLanguage("fr")}
                  className="flex w-full items-center px-3 py-2 hover:bg-gray-200"
                >
                  <img
                    src={flagImages.fr}
                    alt="French Flag"
                    className="w-5 h-5 object-contain mr-2"
                  />
                  {t("quickButtons.languages.fr")}
                </button>
                  <button
                  onClick={() => changeLanguage("ch")}
                  className="flex w-full items-center px-3 py-2 hover:bg-gray-200"
                >
                  <img
                    src={flagImages.ch}
                    alt="French Flag"
                    className="w-5 h-5 object-contain mr-2"
                  />
                  China
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex flex-col space-y-6 text-lg font-medium p-6 font-raleway">
          <Link
            href="/"
            className={getActiveClass("/")}
            onClick={() => setIsOpen(false)}
          >
            {t("quickButtons.menu.home")}
          </Link>
          <Link
            href="/about"
            className={getActiveClass("/about")}
            onClick={() => setIsOpen(false)}
          >
            {t("quickButtons.menu.aboutUs")}
          </Link>
          <Link
            href="/services"
            className={getActiveClass("/services")}
            onClick={() => setIsOpen(false)}
          >
            {t("quickButtons.menu.services")}
          </Link>
          <Link
            href="/bookNow"
            className={getActiveClass("/bookNow")}
            onClick={() => setIsOpen(false)}
          >
            {t("quickButtons.menu.bookNow")}
          </Link>
          <Link href="/contact">
            <button
              className="px-4 py-2 rounded-md text-white bg-[#188bff] w-full"
              onClick={() => setIsOpen(false)}
              aria-label={t("quickButtons.menu.contactUs")}
            >
              {t("quickButtons.menu.contactUs")}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default QuickButtons;
