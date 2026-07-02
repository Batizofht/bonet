"use client";

import { useTranslation } from "react-i18next";
import {
  Users,
  UserPlus,
  Shield,
  CreditCard,
  FileText,
  ArrowRight,
  Phone,
} from "lucide-react";

export default function HRRecruitmentClient() {
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const services = [
    {
      icon: UserPlus,
      title: L("Talent Sourcing","Sourcing de Talents","人才招募"),
      description: L("Local and international recruitment for all skill levels","Recrutement local et international pour tous les niveaux de compétences","适合所有技能水平的本地和国际招聘")
    },
    {
      icon: Shield,
      title: L("HR Compliance","Conformité RH","人力资源合规"),
      description: L("Rwanda labor law compliance and policy development","Conformité au droit du travail rwandais et développement des politiques","卢旺达劳动法合规与政策制定")
    },
    {
      icon: CreditCard,
      title: L("Payroll Management","Gestion de la Paie","薪酬管理"),
      description: L("End-to-end payroll processing and RSSB compliance","Traitement complet de la paie et conformité RSSB","端到端薪酬处理及RSSB合规")
    },
    {
      icon: FileText,
      title: L("Work Permits","Permis de Travail","工作许可证"),
      description: L("Processing for foreign staff in 5-10 business days","Traitement pour le personnel étranger en 5-10 jours ouvrables","外籍员工办理时间为5-10个工作日")
    }
  ];

  const stats = [
    { value: "500+", label: L("Candidates Placed","Candidats Placés","已安置候选人") },
    { value: "50+", label: L("Corporate Clients","Clients Entreprises","企业客户") },
    { value: "98%", label: L("Retention Rate","Taux de Rétention","留存率") },
    { value: "48h", label: L("Avg. Placement Time","Temps de Placement Moy.","平均安置时间") }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div
        className="relative w-full h-[25vh] sm:h-[30vh] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/4.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("HR Solutions","Solutions RH","人力资源解决方案")}</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">
            {L("Build Your Dream Team in Rwanda","Construisez votre équipe idéale au Rwanda","在卢旺达组建您的理想团队")}
          </h1>
          <p className="text-white/75 max-w-2xl mt-2 text-xs sm:text-sm leading-relaxed">
            {L("End-to-end recruitment, payroll, and HR compliance for foreign companies","Recrutement, paie et conformité RH de bout en bout pour les entreprises étrangères","为外资企业提供端到端招聘、工资和人力资源合规服务")}
          </p>
          <a
            href="/contact?service=department"
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-xs"
          >
            {L("Get Recruitment Support","Obtenir un soutien RH","获取招聘支持")}
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#C9A84C] mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
            {L("Our HR Services","Nos services RH","我们的人力资源服务")}
          </h2>
          <p className="text-gray-600">{L("Complete workforce solutions for your business","Solutions complètes de main-d'œuvre pour votre entreprise","为您的企业提供完整的人力资源解决方案")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 flex gap-4"
            >
              <service.icon className="w-6 h-6 text-[#C9A84C] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Link to Full HR Services */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">{L("Need Full HR Support?","Besoin d'un soutien RH complet ?","需要全面的人力资源支持？")}</h3>
            <p className="text-gray-600 text-sm">{L("Explore our complete HR and administrative services","Découvrez nos services RH et administratifs complets","探索我们完整的人力资源和行政服务")}</p>
          </div>
          <a
            href="/hrsupport"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-[#C9A84C] hover:text-white transition-colors text-sm"
          >
            {L("View All HR Services","Voir tous les services RH","查看所有人力资源服务")}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* CTA */}
      <div
        className="relative w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/image/4.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative pt-16 pb-24 lg:pt-20 lg:pb-28">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("Get Started","Commencez","开始")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {L("Need Talent in Rwanda?","Besoin de talents au Rwanda ?","需要在卢旺达招募人才？")}
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              {L("From sourcing to onboarding, we handle every step of your hiring process.","Du sourcing à l'intégration, nous gérons chaque étape de votre processus de recrutement.","从招募到入职，我们处理招聘流程的每个步骤。")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/hrsupport"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
              >
                <Users className="w-4 h-4" />
                {L("Get Recruitment Support","Obtenir un soutien RH","获取招聘支持")}
              </a>
              <a
                href="https://wa.me/250726300260"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                {L("WhatsApp Us","Écrivez-nous sur WhatsApp","WhatsApp联系")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
