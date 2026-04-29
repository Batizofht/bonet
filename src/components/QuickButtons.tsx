'use client'
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import Link from "next/link";
import i18n from "../../i18n";  
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Newspaper
} from "lucide-react";

const QuickButtons = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"main" | "services">("main");
  const location = usePathname();
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

  // Refs for dropdown containers
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const desktopButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!isOpen) {
      setMobileView("main");
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setDesktopDropdownOpen(false);
  }, [location]);

  const flagImages: Record<SupportedLanguages, string> = {
    en: "/assets/images/usa.png",
    fr: "/assets/images/french.png",
    ch: "/assets/images/chin.webp",
  };

  const languageNames = {
    en: "English",
    fr: "Français",
    ch: "Chinese"
  };

  const getActiveClass = (path: string) =>
    location === path ? "text-[#C9A84C] font-semibold" : "text-gray-700";

  const menuItems = [
    { path: "/", label: t("quickButtons.menu.home") },
    { path: "/about", label: t("quickButtons.menu.aboutUs") },
    { path: "/explore-rwanda", label: "Explore Rwanda" },
    { path: "/bookNow", label: t("quickButtons.menu.bookNow") },
    { path: "/blogs", label: t("blog.blogs") },
  ];

  const servicesGroups = [
    {
      title: t("menu.travelAndHospitality"),
      items: [
        { href: "/travel", label: t("menu.hotels") },
        { href: "/travel", label: t("menu.apartments") },
        { href: "/travel", label: t("menu.transport") },
        { href: "/travel", label: t("menu.tourism") },
      ],
    },
    {
      title: t("menu.investmentAndBusinessSetup"),
      items: [
        { href: "/investment", label: t("menu.companyRegistration") },
        { href: "/investment", label: t("menu.investmentCertificate") },
        { href: "/investment", label: t("menu.businessPermits") },
        { href: "/investment", label: t("menu.marketResearch") },
      ],
    },
    {
      title: t("menu.businessConsulting"),
      items: [
        { href: "/consulting", label: t("menu.businessPlanning") },
        { href: "/consulting", label: t("menu.financialAdvisory") },
        { href: "/consulting", label: t("menu.processOptimization") },
        { href: "/consulting", label: t("menu.projectAuditing") },
      ],
    },
    {
      title: t("menu.hrAndAdminSupport"),
      items: [
        { href: "/hrsupport", label: t("menu.recruitment") },
        { href: "/hrsupport", label: t("menu.hrPolicyDevelopment") },
        { href: "/hrsupport", label: t("menu.employeeTraining") },
        { href: "/hrsupport", label: t("menu.administrativeSupport") },
      ],
    },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setDesktopDropdownOpen(false);
  };

  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:flex space-x-3 items-center">
        {/* Blog */}
        <Link href="/blogs" className={getActiveClass("/blogs")}>
          <div className="flex items-center gap-2 py-2 hover:text-[#C9A84C] transition-colors">
            <Newspaper className="w-4 h-4" />
            {t('blog.blogs')}
          </div>
        </Link>
        
        {/* Language Selector */}
        <div className="relative">
          <button
            ref={desktopButtonRef}
            onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
            className="flex h-11 items-center space-x-2 rounded-xl border border-gray-300/70 bg-white px-4 text-sm font-semibold text-gray-700 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors duration-200"
          >
            <img
              src={flagImages[language] || flagImages.en}
              alt="Flag"
              className="w-5 h-5 rounded object-cover"
            />
            <span className="min-w-[60px] text-left">{languageNames[language] || languageNames.en}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${desktopDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {desktopDropdownOpen && (
            <div
              ref={desktopDropdownRef}
              className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
            >
              {Object.entries(flagImages).map(([lng, flag]) => (
                <button
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  className={`flex w-full items-center px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${
                    language === lng ? 'bg-gray-50 text-[#C9A84C]' : 'text-gray-700'
                  }`}
                >
                  <img
                    src={flag}
                    alt={`${lng} flag`}
                    className="w-5 h-5 rounded object-cover mr-3"
                  />
                  <span className="flex-1 text-left">{languageNames[lng as SupportedLanguages]}</span>
                  {language === lng && (
                    <div className="w-2 h-2 bg-[#C9A84C] rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Contact Button */}
        <Link href="/contact">
          <button className="flex h-11 items-center gap-2 rounded-xl bg-[#C9A84C] px-6 text-sm font-semibold text-white hover:bg-[#B8973B] transition-colors duration-200">
            <MessageCircle className="w-4 h-4" />
            {t("common.contactUs")}
          </button>
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2"
        onClick={() => {
          setMobileView("main");
          setIsOpen(true);
        }}
        aria-label={t("quickButtons.ariaLabels.openMenu")}
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <>
          {/* Black overlay */}
          <div
            className="fixed inset-0 z-40 h-[100vh] bg-black/45 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile side menu */}
          <div
            style={{zIndex:9999}}
            className="fixed top-0 right-0 h-[100dvh] w-[80vw] max-w-[320px] bg-white shadow-2xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-900">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto">
                {mobileView === "main" ? (
                  <nav className="py-2">
                    {menuItems.slice(0, 2).map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-5 py-3.5 text-[15px] font-medium border-b border-gray-50 ${
                          location === item.path
                            ? 'text-[#C9A84C]'
                            : 'text-gray-700'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}

                    <button
                      onClick={() => setMobileView("services")}
                      className="flex w-full items-center justify-between px-5 py-3.5 text-left text-[15px] font-medium text-gray-700 border-b border-gray-50"
                    >
                      <span>{t("quickButtons.menu.services")}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>

                    {menuItems.slice(2).map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-5 py-3.5 text-[15px] font-medium border-b border-gray-50 ${
                          location === item.path
                            ? 'text-[#C9A84C]'
                            : 'text-gray-700'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                ) : (
                  <div className="py-2">
                    <button
                      onClick={() => setMobileView("main")}
                      className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-gray-500 border-b border-gray-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </button>
                    <div className="py-2">
                      {servicesGroups.map((group) => (
                        <div key={group.title}>
                          <p className="px-5 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {group.title}
                          </p>
                          {group.items.map((item) => (
                            <Link
                              key={`${group.title}-${item.label}`}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-5 py-3 text-sm text-gray-600 border-b border-gray-50"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 px-5 py-4">
                <Link 
                  href="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 w-full items-center justify-center gap-2 bg-[#C9A84C] text-sm font-medium text-white rounded-lg"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t("quickButtons.menu.contactUs")}
                </Link>
                
                {/* Language */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  {(Object.keys(flagImages) as SupportedLanguages[]).map((lng) => (
                    <button
                      key={lng}
                      onClick={() => changeLanguage(lng)}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                        language === lng 
                          ? 'bg-[#C9A84C]/10 text-[#C9A84C]' 
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      <img src={flagImages[lng]} alt={`${lng}`} className="h-4 w-4 rounded-sm object-cover" />
                      <span style={{marginRight:5}}>{languageNames[lng]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QuickButtons;