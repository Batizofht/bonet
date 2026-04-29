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
        { href: "/investment", label: t("menu.companyRegistration"), description: "Company formation and legal setup" },
        { href: "/investment", label: t("menu.investmentCertificate"), description: "RDB investment certification support" },
        { href: "/investment", label: t("menu.businessPermits"), description: "Permits, compliance, and approvals" },
        { href: "/investment", label: t("menu.marketResearch"), description: "Market validation and opportunity mapping" },
      ],
    },
    {
      title: t("menu.businessConsulting"),
      items: [
        { href: "/consulting", label: t("menu.businessPlanning"), description: "Growth strategy and execution planning" },
        { href: "/consulting", label: t("menu.financialAdvisory"), description: "Financial structuring and advisory" },
        { href: "/consulting", label: t("menu.processOptimization"), description: "Operational efficiency and process design" },
        { href: "/consulting", label: t("menu.projectAuditing"), description: "Project audit and implementation review" },
      ],
    },
    {
      title: t("menu.hrAndAdminSupport"),
      items: [
        { href: "/hrsupport", label: t("menu.recruitment"), description: "Talent sourcing and onboarding" },
        { href: "/hrsupport", label: t("menu.hrPolicyDevelopment"), description: "HR policy and compliance framework" },
        { href: "/hrsupport", label: t("menu.employeeTraining"), description: "Workforce training and capability building" },
        { href: "/hrsupport", label: t("menu.administrativeSupport"), description: "Back-office and admin operations" },
      ],
    },
    {
        title: t("menu.travelAndHospitality"),
      items: [
        { href: "/travel", label: t("menu.hotels"), description: "Hotel and premium stay coordination" },
        { href: "/travel", label: t("menu.apartments"), description: "Executive apartment sourcing and setup" },
        { href: "/travel", label: t("menu.transport"), description: "Airport transfers and private transport" },
        { href: "/travel", label: t("menu.tourism"), description: "Curated tourism and local experiences" },
      ],
    }
  ];

  return (
    <div className="fixed left-1/2 top-[72px] z-50 w-[min(96vw,1120px)] -translate-x-1/2 rounded-2xl border border-gray-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.18)] max-h-[calc(100vh-96px)] overflow-y-auto">
      <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">Business Services</p>
          <p className="text-sm font-medium text-gray-600">Choose the right track for your company growth.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors"
          >
            Talk to an Expert
          </Link>
          <Link
            href="/services"
            onClick={onClose}
            className="inline-flex items-center gap-1 rounded-xl bg-[#C9A84C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#B8973B] transition-colors"
          >
            Explore All Services
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
