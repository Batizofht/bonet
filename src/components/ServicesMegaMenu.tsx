'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";

type TFunction = (key: string) => any;

interface ServicesMegaMenuProps {
  t: TFunction;
  onClose?: () => void;
}

interface ServiceItem {
  href: string;
  label: string;
  description: string;
}

interface ServiceGroup {
  title: string;
  items: ServiceItem[];
}

export default function ServicesMegaMenu({ t, onClose }: ServicesMegaMenuProps) {
  const serviceGroups: ServiceGroup[] = [

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
    }
  ];

  return (
    <div className="fixed left-1/2 top-[72px] z-50 w-[min(96vw,1120px)] -translate-x-1/2 rounded-xl border border-gray-200 bg-white shadow-lg max-h-[calc(100vh-96px)] overflow-y-auto">
      <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">{t("menu.megaHeader")}</p>
          <p className="text-sm font-medium text-gray-600">{t("menu.megaSubtitle")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors"
          >
            {t("menu.talkToExpert")}
          </Link>
          <Link
            href="/services"
            onClick={onClose}
            className="inline-flex items-center gap-1 rounded-xl bg-[#C9A84C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#B8973B] transition-colors"
          >
            {t("menu.exploreAllServices")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 px-4 py-5 md:grid-cols-2 md:gap-6 md:px-5 xl:grid-cols-4">
        {serviceGroups.map((group) => (
          <section key={group.title}>
            <h3 className="mb-3 border-b border-gray-200 pb-2 text-xs font-bold uppercase tracking-widest text-gray-700">
              {group.title}
            </h3>
            <div className="space-y-2">
              {group.items.map((item) => (
                <Link
                  key={`${group.title}-${item.label}`}
                  href={item.href}
                  onClick={onClose}
                  className="group block rounded-lg px-2 py-2 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-[#C9A84C]">{item.label}</p>
                    <ArrowRight className="h-3.5 w-3.5 text-gray-300 transition-colors group-hover:text-[#C9A84C]" />
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
