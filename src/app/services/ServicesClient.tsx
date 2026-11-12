"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHero, Section, SectionHeader, CtaBand, ButtonLink, WhatsAppButton } from "@/components/ui/kit";

export default function ServicesClient() {
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);

  const groups = [
    {
      title: t("services.list.0.title"),
      image: "/assets/images/rdb2.jpg",
      href: "/investment",
      items: [
        { href: "/business-registration", label: t("menu.companyRegistration"), description: t("menu.desc_companyReg") },
        { href: "/investment", label: t("menu.investmentCertificate"), description: t("menu.desc_investCert") },
        { href: "/investment", label: t("menu.businessPermits"), description: t("menu.desc_bizPermits") },
        { href: "/investment", label: t("menu.marketResearch"), description: t("menu.desc_mktResearch") },
      ],
    },
    {
      title: t("menu.businessConsulting"),
      image: "/assets/images/s1.jpeg",
      href: "/consulting",
      items: [
        { href: "/consulting", label: t("menu.businessPlanning"), description: t("menu.desc_bizPlanning") },
        { href: "/consulting", label: t("menu.financialAdvisory"), description: t("menu.desc_finAdvisory") },
        { href: "/consulting", label: t("menu.processOptimization"), description: t("menu.desc_processOpt") },
        { href: "/consulting", label: t("menu.projectAuditing"), description: t("menu.desc_projAudit") },
      ],
    },
    {
      title: t("menu.hrAndAdminSupport"),
      image: "/assets/images/s3.jpeg",
      href: "/hr-recruitment",
      items: [
        { href: "/hr-recruitment", label: t("menu.recruitment"), description: t("menu.desc_recruitment") },
        { href: "/hr-recruitment#hr-admin-support", label: t("menu.hrPolicyDevelopment"), description: t("menu.desc_hrPolicy") },
        { href: "/hr-recruitment#hr-admin-support", label: t("menu.employeeTraining"), description: t("menu.desc_empTraining") },
        { href: "/hr-recruitment#hr-admin-support", label: t("menu.administrativeSupport"), description: t("menu.desc_adminSupport") },
      ],
    },
    {
      title: t("menu.travelAndHospitality"),
      image: "/assets/images/hot.jpg",
      href: "/executive-travel",
      items: [
        { href: "/relocation-services", label: t("menu.relocationConcierge"), description: t("menu.desc_relocation") },
        { href: "/executive-travel", label: t("menu.executiveTravel"), description: t("menu.desc_execTravel") },
        { href: "/executive-travel#travel-hospitality", label: t("menu.hotels"), description: t("menu.desc_hotels") },
        { href: "/executive-travel#travel-hospitality", label: t("menu.transport"), description: t("menu.desc_transport") },
        { href: "/executive-travel#travel-hospitality", label: t("menu.tourism"), description: t("menu.desc_tourism") },
      ],
    },
  ];

  return (
    <>
      <PageHero
        image="/assets/photos/kigali-skyline.jpg"
        imageAlt="Kigali at dusk"
        eyebrow={t("servicesPage.banner_label")}
        title={t("servicesPage.banner_title")}
        lead={L("Company registration, investment advisory, HR, relocation and executive travel for foreign investors in Rwanda, delivered by one team in Kigali.", "Immatriculation, conseil en investissement, RH, relocalisation et voyages d'affaires pour les investisseurs étrangers au Rwanda, par une seule équipe à Kigali.", "为在卢旺达的外国投资者提供公司注册、投资咨询、人力资源、搬迁和高管出行服务，由基加利的一个团队全程负责。")}
        crumbs={[{ name: L("Home", "Accueil", "首页"), href: "/" }, { name: L("Services", "Services", "服务") }]}
        actions={
          <>
            <ButtonLink href="/contact" size="lg">{t("servicesPage.talk_expert")}</ButtonLink>
            <WhatsAppButton variant="ghost-light" className="btn-lg">WhatsApp</WhatsAppButton>
          </>
        }
      />

      <Section>
        <SectionHeader eyebrow={t("servicesPage.section_label")} title={t("servicesPage.section_title")} />
        <div>
          {groups.map((g, i) => (
            <div key={g.title} className={`grid items-center gap-8 border-line py-12 lg:grid-cols-2 lg:gap-14 ${i > 0 ? "border-t" : "pt-0"}`}>
              <div className={`relative aspect-[16/10] overflow-hidden rounded-[10px] bg-sand ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image src={g.image} alt={g.title} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
              </div>
              <div>
                <h3 className="h-display text-[1.5rem] md:text-[1.8rem]">{g.title}</h3>
                <ul className="mt-5 border-t border-line">
                  {g.items.map((it) => (
                    <li key={it.label}>
                      <Link href={it.href} className="group grid grid-cols-[1fr_auto] items-center gap-x-5 border-b border-line py-4 transition-colors">
                        <span className="font-display text-[15px] font-semibold text-ink-900 group-hover:text-gold-700">{it.label}</span>
                        <ArrowRight className="row-span-2 h-4 w-4 text-gold-600" />
                        <span className="text-[14px] leading-relaxed text-ink-500">{it.description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow={t("servicesPage.cta_label")}
        title={t("servicesPage.cta_title")}
        lead={t("servicesPage.cta_body")}
        actions={<ButtonLink href="/contact" size="lg">{t("servicesPage.cta_button")}</ButtonLink>}
      />
    </>
  );
}
