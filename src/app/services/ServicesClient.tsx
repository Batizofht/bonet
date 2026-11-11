"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar, Clock, User } from "lucide-react";
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
      href: "/hrsupport",
      items: [
        { href: "/hr-recruitment", label: t("menu.recruitment"), description: t("menu.desc_recruitment") },
        { href: "/hrsupport", label: t("menu.hrPolicyDevelopment"), description: t("menu.desc_hrPolicy") },
        { href: "/hrsupport", label: t("menu.employeeTraining"), description: t("menu.desc_empTraining") },
        { href: "/hrsupport", label: t("menu.administrativeSupport"), description: t("menu.desc_adminSupport") },
      ],
    },
    {
      title: t("menu.travelAndHospitality"),
      image: "/assets/images/hot.jpg",
      href: "/travel",
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
    <>
      <PageHero
        image="/assets/photos/kigali-skyline.jpg"
        imageAlt="Kigali at dusk"
        eyebrow={t("servicesPage.banner_label")}
        title={t("servicesPage.banner_title")}
        lead={t("servicesPage.article_intro")}
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

      <Section tone="ivory">
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow">{t("servicesPage.article_label")}</p>
          <h2 className="h-display mt-3 text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">{t("servicesPage.article_title")}</h2>
          <div className="mt-6 flex flex-wrap gap-5 text-[13.5px] text-ink-500">
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{t("servicesPage.article_author")}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{t("servicesPage.article_date")}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{t("servicesPage.article_read")}</span>
          </div>
          <div className="prose-bonet mt-10">
            <p>{t("servicesPage.article_intro")}</p>
            <h3>{t("servicesPage.article_h3")}</h3>
            <p>{t("servicesPage.article_body")}</p>
          </div>
          <div className="mt-12 rounded-[10px] border border-line bg-white p-8">
            <h3 className="text-[1.2rem] font-semibold text-ink-900">{t("servicesPage.help_h3")}</h3>
            <p className="mt-2 text-[15px] text-ink-600">{t("servicesPage.help_body")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/business-registration" className="btn btn-ink">{t("servicesPage.help_primary")}<ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="btn btn-outline">{t("servicesPage.help_secondary")}</Link>
            </div>
          </div>
        </article>
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
