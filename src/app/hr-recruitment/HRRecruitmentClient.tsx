"use client";

import { useTranslation } from "react-i18next";
import { UserPlus, Shield, CreditCard, FileText } from "lucide-react";
import { PageHero, Section, SectionHeader, StatStrip, FeatureCard, CtaBand, ButtonLink, WhatsAppButton } from "@/components/ui/kit";
import HRAdminSupport from "@/services/hr";

export default function HRRecruitmentClient() {
  const { i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const services = [
    {
      icon: UserPlus,
      title: L("Talent Sourcing", "Sourcing de Talents", "人才招募"),
      description: L("Local and international recruitment for all skill levels", "Recrutement local et international pour tous les niveaux de compétences", "适合所有技能水平的本地和国际招聘"),
    },
    {
      icon: Shield,
      title: L("HR Compliance", "Conformité RH", "人力资源合规"),
      description: L("Rwanda labor law compliance and policy development", "Conformité au droit du travail rwandais et développement des politiques", "卢旺达劳动法合规与政策制定"),
    },
    {
      icon: CreditCard,
      title: L("Payroll Management", "Gestion de la Paie", "薪酬管理"),
      description: L("End-to-end payroll processing and RSSB compliance", "Traitement complet de la paie et conformité RSSB", "端到端薪酬处理及RSSB合规"),
    },
    {
      icon: FileText,
      title: L("Work Permits", "Permis de Travail", "工作许可证"),
      description: L("Processing for foreign staff in 5-10 business days", "Traitement pour le personnel étranger en 5-10 jours ouvrables", "外籍员工办理时间为5-10个工作日"),
    },
  ];

  const stats = [
    { value: "500+", label: L("Candidates Placed", "Candidats Placés", "已安置候选人") },
    { value: "50+", label: L("Corporate Clients", "Clients Entreprises", "企业客户") },
    { value: "98%", label: L("Retention Rate", "Taux de Rétention", "留存率") },
    { value: L("Vetted", "Vérifiés", "严格筛选"), label: L("Candidate Pool", "Vivier de Candidats", "候选人才库") },
  ];

  return (
    <>
      <PageHero
        image="/assets/photos/kigali-cbd-2.jpg"
        imageAlt="Office towers in central Kigali"
        eyebrow={L("HR Solutions", "Solutions RH", "人力资源解决方案")}
        title={L("Build Your Dream Team in Rwanda", "Construisez votre équipe idéale au Rwanda", "在卢旺达组建您的理想团队")}
        lead={L("End-to-end recruitment, payroll, and HR compliance for foreign companies", "Recrutement, paie et conformité RH de bout en bout pour les entreprises étrangères", "为外资企业提供端到端招聘、工资和人力资源合规服务")}
        crumbs={[
          { name: L("Home", "Accueil", "首页"), href: "/" },
          { name: L("Services", "Services", "服务"), href: "/services" },
          { name: L("Recruitment", "Recrutement", "招聘") },
        ]}
        actions={
          <>
            <ButtonLink href="/contact?service=department" size="lg">{L("Get Recruitment Support", "Obtenir un soutien RH", "获取招聘支持")}</ButtonLink>
            <WhatsAppButton variant="ghost-light" className="btn-lg">{L("WhatsApp Us", "Écrivez-nous sur WhatsApp", "WhatsApp联系")}</WhatsAppButton>
          </>
        }
      />

      <Section tone="ivory" tight>
        <StatStrip stats={stats} />
      </Section>

      <Section>
        <SectionHeader
          eyebrow={L("Services", "Services", "服务")}
          title={L("Our HR Services", "Nos services RH", "我们的人力资源服务")}
          lead={L("Complete workforce solutions for your business", "Solutions complètes de main-d'œuvre pour votre entreprise", "为您的企业提供完整的人力资源解决方案")}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <FeatureCard key={i} index={i} icon={<s.icon className="h-5 w-5" />} title={s.title}>
              {s.description}
            </FeatureCard>
          ))}
        </div>
      </Section>

      {/* Full HR & admin support (formerly the separate /hrsupport page) */}
      <HRAdminSupport />

      <CtaBand
        image="/image/4.jpg"
        eyebrow={L("Get Started", "Commencez", "开始")}
        title={L("Need Talent in Rwanda?", "Besoin de talents au Rwanda ?", "需要在卢旺达招募人才？")}
        lead={L("From sourcing to onboarding, we handle every step of your hiring process.", "Du sourcing à l'intégration, nous gérons chaque étape de votre processus de recrutement.", "从招募到入职，我们处理招聘流程的每个步骤。")}
        actions={
          <>
            <ButtonLink href="/contact?service=department" size="lg">{L("Get Recruitment Support", "Obtenir un soutien RH", "获取招聘支持")}</ButtonLink>
            <WhatsAppButton variant="ghost-light" className="btn-lg">WhatsApp</WhatsAppButton>
          </>
        }
      />
    </>
  );
}
