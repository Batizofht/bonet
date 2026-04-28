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

  const flagImages: Record<SupportedLanguages, string> = {
    en: "/assets/images/usa.png",
    fr: "/assets/images/french.png",
    ch: "/assets/images/chin.webp",
  };

  const languageNames = {
    en: "English",
    fr: "Français",
    ch: "中文"
  };

  const getActiveClass = (path: string) =>
    location === path ? "text-[#C9A84C] font-semibold" : "text-gray-700";

  const menuItems = [
    { path: "/", label: t("quickButtons.menu.home") },
    { path: "/about", label: t("quickButtons.menu.aboutUs") },
    { path: "/gallery", label: "Gallery" },
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
        className="md:hidden p-2 rounded-xl"
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
            className="fixed top-0 right-0 h-[100dvh] w-[88vw] max-w-[390px] bg-white shadow-[0_24px_70px_rgba(2,6,23,0.35)]"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="border-b border-gray-100 bg-white px-5 pb-4 pt-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/assets/images/logo.png" alt="Bonet Elite Services Logo" className="h-10 w-10 rounded-xl border border-[#C9A84C]/35 bg-white p-1" loading="lazy" />
                    <div>
                      <h3 className="text-base font-bold leading-tight text-gray-900">Bonet Elite</h3>
                      <p className="text-xs text-gray-500">Premium Business Services</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-colors hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C9A84C]">Language</p>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(flagImages) as SupportedLanguages[]).map((lng) => (
                    <button
                      key={lng}
                      onClick={() => changeLanguage(lng)}
                      className={`flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs font-semibold transition-colors ${
                        language === lng
                          ? 'border-transparent bg-[#C9A84C]/12 text-[#7A5A00]'
                          : 'border-transparent bg-gray-100 text-gray-600 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]'
                      }`}
                    >
                      <img src={flagImages[lng]} alt={`${lng} flag`} className="h-4 w-4 rounded object-cover" />
                      <span>{lng.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto px-5 py-5">
                {mobileView === "main" ? (
                  <>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Navigation</p>
                    <div className="mt-3 space-y-2">
                      {menuItems.slice(0, 2).map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`block w-full rounded-xl px-4 py-3 text-left text-[15px] font-medium transition-all duration-200 ${
                            location === item.path
                              ? 'bg-[#C9A84C]/10 text-[#7A5A00]'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-[#C9A84C]'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}

                      <button
                        onClick={() => setMobileView("services")}
                        className="flex w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-left text-[15px] font-semibold text-gray-800 transition-all duration-200 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]"
                      >
                        <span>{t("quickButtons.menu.services")}</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      {menuItems.slice(2).map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`block w-full rounded-xl px-4 py-3 text-left text-[15px] font-medium transition-all duration-200 ${
                            location === item.path
                              ? 'bg-[#C9A84C]/10 text-[#7A5A00]'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-[#C9A84C]'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setMobileView("main")}
                      className="mb-3 inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600 transition-colors hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      Go Back
                    </button>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C9A84C]">Services</p>
                    <div className="mt-3 space-y-4 pb-2">
                      {servicesGroups.map((group) => (
                        <div key={group.title} className="rounded-xl bg-gray-50 p-3">
                          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">
                            {group.title}
                          </p>
                          <div className="space-y-1">
                            {group.items.map((item) => (
                              <Link
                                key={`${group.title}-${item.label}`}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between rounded-lg px-2 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-[#C9A84C]/8 hover:text-[#C9A84C]"
                              >
                                <span>{item.label}</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Contact Button */}
              <div className="border-t border-gray-100 bg-white px-5 py-4">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#C9A84C] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#B8973B]">
                    <MessageCircle className="h-4 w-4" />
                    {t("quickButtons.menu.contactUs")}
                  </button>
                </Link>
                <p className="mt-2 text-center text-xs text-gray-500">Fast response via WhatsApp & email</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QuickButtons;