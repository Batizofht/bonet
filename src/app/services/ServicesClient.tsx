'use client'
import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ServicesClient() {
  const { t } = useTranslation();

  const serviceGroups = [
    {
      title: t("services.list.0.title"),
      items: [
        { href: "/business-registration", label: t("menu.companyRegistration"), description: t("menu.desc_companyReg") },
        { href: "/investment", label: t("menu.investmentCertificate"), description: t("menu.desc_investCert") },
        { href: "/investment", label: t("menu.businessPermits"), description: t("menu.desc_bizPermits") },
        { href: "/investment", label: t("menu.marketResearch"), description: t("menu.desc_mktResearch") },
      ],
    },
    {
      title: t("menu.businessConsulting"),
      items: [
        { href: "/consulting", label: t("menu.businessPlanning"), description: t("menu.desc_bizPlanning") },
        { href: "/consulting", label: t("menu.financialAdvisory"), description: t("menu.desc_finAdvisory") },
        { href: "/consulting", label: t("menu.processOptimization"), description: t("menu.desc_processOpt") },
        { href: "/consulting", label: t("menu.projectAuditing"), description: t("menu.desc_projAudit") },
      ],
    },
    {
      title: t("menu.hrAndAdminSupport"),
      items: [
        { href: "/hr-recruitment", label: t("menu.recruitment"), description: t("menu.desc_recruitment") },
        { href: "/hrsupport", label: t("menu.hrPolicyDevelopment"), description: t("menu.desc_hrPolicy") },
        { href: "/hrsupport", label: t("menu.employeeTraining"), description: t("menu.desc_empTraining") },
        { href: "/hrsupport", label: t("menu.administrativeSupport"), description: t("menu.desc_adminSupport") },
      ],
    },
    {
      title: t("menu.travelAndHospitality"),
      items: [
        { href: "/relocation-services", label: t("menu.relocationConcierge"), description: t("menu.desc_relocation") },
        { href: "/executive-travel", label: t("menu.executiveTravel"), description: t("menu.desc_execTravel") },
        { href: "/travel", label: t("menu.hotels"), description: t("menu.desc_hotels") },
        { href: "/travel", label: t("menu.transport"), description: t("menu.desc_transport") },
        { href: "/travel", label: t("menu.tourism"), description: t("menu.desc_tourism") },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div
        className="relative w-full h-[20vh] sm:h-[30vh] bg-gray-900 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/8.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{t("servicesPage.banner_label")}</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">{t("servicesPage.banner_title")}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
        <div className="mb-12 lg:mb-16">
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{t("servicesPage.section_label")}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
            {t("servicesPage.section_title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {serviceGroups.map((group) => (
            <div key={group.title} className="rounded-xl border border-gray-200 p-6 lg:p-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 pb-4 border-b border-gray-200">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item, ii) => (
                  <Link
                    key={ii}
                    href={item.href}
                    className="group flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#C9A84C] transition-colors flex-shrink-0 ml-4" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
          >
            {t("servicesPage.talk_expert")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="p-8 md:p-12 border-b border-gray-100">
              <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{t("servicesPage.article_label")}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider mb-4">
                {t("servicesPage.article_title")}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-sm">{t("servicesPage.article_author")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-sm">{t("servicesPage.article_date")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-sm">{t("servicesPage.article_read")}</span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {t("servicesPage.article_intro")}
                </p>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {t("servicesPage.article_h3")}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {t("servicesPage.article_body")}
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-200 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {t("servicesPage.help_h3")}
                  </h3>
                  <p className="text-gray-500 text-sm mb-5">
                    {t("servicesPage.help_body")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/business-registration" className="inline-flex items-center justify-center px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm">
                      {t("servicesPage.help_primary")}
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors text-sm">
                      {t("servicesPage.help_secondary")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="relative w-full bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/1.jpg')", minHeight: "30vh" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative flex flex-col items-center justify-center text-center px-4 py-16 lg:py-20">
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{t("servicesPage.cta_label")}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {t("servicesPage.cta_title")}
          </h2>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
            {t("servicesPage.cta_body")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
          >
            {t("servicesPage.cta_button")}
          </Link>
        </div>
      </div>
    </div>
  );
}
