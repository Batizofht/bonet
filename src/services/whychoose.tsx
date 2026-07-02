"use client";
import { useRouter } from "next/navigation";
import { Shield, Globe, Users, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhyRwandaSection = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const highlights = [
    {
      stat: "6hrs",
      label: L("Company Registration", "Enregistrement d'Entreprise", "公司注册"),
      desc: L(
        "Certificate, TIN, and RSSB — all in one day. 100% foreign ownership permitted.",
        "Certificat, NIF et RSSB — tout en une journée. 100% de propriété étrangère autorisée.",
        "证书、TIN和RSSB——均在一天内完成。允许100%外资所有权。"
      )
    },
    {
      stat: "0%",
      label: L("Tax Incentives", "Incitations Fiscales", "税收优惠"),
      desc: L(
        "Corporate tax holidays for qualifying investments. 15% preferential rates for strategic sectors.",
        "Exonérations fiscales pour les investissements qualifiés. Taux préférentiels de 15% pour les secteurs stratégiques.",
        "符合条件的投资可享受企业所得税假期。战略性行业享有15%优惠税率。"
      )
    },
    {
      stat: "Cert",
      label: L("Investment Certificate", "Certificat d'Investissement", "投资证书"),
      desc: L(
        "Fast-track RDB certification unlocks tax exemptions and investor protections.",
        "La certification RDB accélérée débloque des exonérations fiscales et des protections d'investisseurs.",
        "快速获得RDB认证，解锁税收豁免和投资者保护。"
      )
    },
    {
      stat: "100%",
      label: L("Licensing", "Licences", "许可证"),
      desc: L(
        "All permits handled: trade licenses, sector-specific, work permits, residency.",
        "Tous les permis gérés : licences commerciales, sectorielles, permis de travail, résidence.",
        "所有许可证均办理：营业执照、行业许可、工作许可、居留许可。"
      )
    },
    {
      stat: "400M+",
      label: L("Market Access", "Accès au Marché", "市场准入"),
      desc: L(
        "EAC, COMESA, EU, US/AGOA, AfCFTA — reach 1.6+ billion consumers.",
        "EAC, COMESA, UE, US/AGOA, AfCFTA — accès à plus de 1,6 milliard de consommateurs.",
        "东非共同体、康迈萨、欧盟、美国/AGOA、非洲自贸区——覆盖16亿+消费者。"
      )
    },
    {
      stat: "1",
      label: L("One Team", "Une Équipe", "一站式团队"),
      desc: L(
        "Single point of contact for registration, compliance, housing, transport, operations.",
        "Point de contact unique pour l'immatriculation, la conformité, le logement, le transport, les opérations.",
        "一个联络点，负责注册、合规、住房、交通、运营。"
      )
    },
    {
      stat: "15+",
      label: L("Built for Foreigners", "Conçu pour les Étrangers", "专为外籍人士"),
      desc: L(
        "Clients from 15+ countries. We understand the unique needs of international investors.",
        "Clients de 15+ pays. Nous comprenons les besoins uniques des investisseurs internationaux.",
        "服务来自15+国家的客户。我们深刻理解国际投资者的独特需求。"
      )
    },
    {
      stat: L("Free", "Gratuit", "免费"),
      label: L("Consultation", "Consultation", "咨询"),
      desc: L(
        "No-obligation 30-minute call. Clear roadmap for your Rwanda market entry.",
        "Appel de 30 minutes sans engagement. Feuille de route claire pour votre entrée sur le marché rwandais.",
        "无需承诺的30分钟通话。清晰制定您的卢旺达市场进入路线图。"
      )
    }
  ];

  const features = [
    { icon: Users, text: L("Built for foreign professionals", "Conçu pour les professionnels étrangers", "专为外籍专业人士服务") },
    { icon: Shield, text: L("Full compliance & licensing handled", "Conformité complète et licences gérées", "全面处理合规与许可证事务") },
    { icon: MapPin, text: L("Office, housing, transport — all arranged", "Bureau, logement, transport — tout organisé", "办公室、住房、交通——一应俱全") },
    { icon: Globe, text: L("Clients from 15+ countries served", "Clients de plus de 15 pays servis", "服务来自15+国家的客户") }
  ];

  return (
    <section>
      {/* PART 1: Rwanda Highlights - Card Grid */}
      <div className="bg-white py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 lg:mb-14">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              {L("The Opportunity", "L'Opportunité", "投资机遇")}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              {L("Why Rwanda and Why With Us", "Pourquoi le Rwanda et Pourquoi Nous", "为什么选择卢旺达和我们")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {highlights.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 lg:p-8">
                <div className="text-xs text-[#C9A84C] font-bold uppercase tracking-wider mb-3">{item.stat}</div>
                <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-2">{item.label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={() => router.push("/investment")}
              className="text-[#C9A84C] font-semibold hover:text-[#B8973B] transition-colors text-sm"
            >
              {L("Explore Investment Services", "Explorer les services d'investissement", "探索投资服务")} &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* PART 2: Why Bonet - Split Layout */}
      <div className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                {L("Your Partner", "Votre Partenaire", "您的合作伙伴")}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider mb-6 leading-tight">
                {L("Why Do It With Us?", "Pourquoi Nous Choisir ?", "为什么选择我们？")}
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                {L(
                  "We handle everything — from company registration to daily operations. One team. One contact. Zero bureaucracy for you.",
                  "Nous gérons tout — de l'immatriculation de l'entreprise aux opérations quotidiennes. Une équipe. Un contact. Zéro bureaucratie pour vous.",
                  "我们处理一切——从公司注册到日常运营。一个团队，一个联系人，零繁文缛节。"
                )}
              </p>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <feature.icon className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push("/consulting")}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors text-sm"
              >
                {L("Explore Consulting Services", "Explorer les services de conseil", "探索咨询服务")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src="/image/1.jpg"
                  alt="Kigali Business District"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white p-6 lg:p-8 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#C9A84C] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">
                      {L("Free 30-Min Consultation", "Consultation gratuite de 30 minutes", "免费30分钟咨询")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {L("No obligation. Clear roadmap.", "Sans engagement. Feuille de route claire.", "无需承诺，清晰路线图。")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRwandaSection;
