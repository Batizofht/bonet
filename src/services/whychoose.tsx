"use client";
import Image from "next/image";
import Link from "next/link";
import { Shield, Globe, Users, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhyRwandaSection = () => {
  const { i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const highlights = [
    {
      stat: "RDB",
      label: L("Company Registration", "Enregistrement d'Entreprise", "公司注册"),
      desc: L(
        "Certificate, TIN, and RSSB included. 100% foreign ownership permitted.",
        "Certificat, NIF et RSSB inclus. 100% de propriété étrangère autorisée.",
        "证书、TIN和RSSB一并办理。允许100%外资所有权。"
      ),
    },
    {
      stat: "15%",
      label: L("Tax Incentives", "Incitations Fiscales", "税收优惠"),
      desc: L(
        "15% preferential corporate tax for priority sectors. Tax holidays for very large investments.",
        "Impôt sur les sociétés préférentiel de 15 % pour les secteurs prioritaires. Exonérations pour les très grands investissements.",
        "优先行业享受15%优惠企业所得税。超大型投资可享受免税期。"
      ),
    },
    {
      stat: "Cert",
      label: L("Investment Certificate", "Certificat d'Investissement", "投资证书"),
      desc: L(
        "Fast-track RDB certification unlocks tax exemptions and investor protections.",
        "La certification RDB accélérée débloque des exonérations fiscales et des protections d'investisseurs.",
        "快速获得RDB认证，解锁税收豁免和投资者保护。"
      ),
    },
    {
      stat: "100%",
      label: L("Licensing", "Licences", "许可证"),
      desc: L(
        "All permits handled: trade licenses, sector-specific, work permits, residency.",
        "Tous les permis gérés : licences commerciales, sectorielles, permis de travail, résidence.",
        "所有许可证均办理：营业执照、行业许可、工作许可、居留许可。"
      ),
    },
    {
      stat: "1.6B+",
      label: L("Market Access", "Accès au Marché", "市场准入"),
      desc: L(
        "EAC, COMESA, EU, AfCFTA — reach 1.6+ billion consumers.",
        "EAC, COMESA, UE, ZLECAf — accès à plus de 1,6 milliard de consommateurs.",
        "东非共同体、康迈萨、欧盟、非洲自贸区——覆盖16亿+消费者。"
      ),
    },
    {
      stat: "1",
      label: L("One Team", "Une Équipe", "一站式团队"),
      desc: L(
        "Single point of contact for registration, compliance, housing, transport, operations.",
        "Point de contact unique pour l'immatriculation, la conformité, le logement, le transport, les opérations.",
        "一个联络点，负责注册、合规、住房、交通、运营。"
      ),
    },
    {
      stat: "15+",
      label: L("Built for Foreigners", "Conçu pour les Étrangers", "专为外籍人士"),
      desc: L(
        "Clients from 15+ countries. We understand the unique needs of international investors.",
        "Clients de 15+ pays. Nous comprenons les besoins uniques des investisseurs internationaux.",
        "服务来自15+国家的客户。我们深刻理解国际投资者的独特需求。"
      ),
    },
    {
      stat: L("Free", "Gratuit", "免费"),
      label: L("Consultation", "Consultation", "咨询"),
      desc: L(
        "No-obligation 30-minute call. Clear roadmap for your Rwanda market entry.",
        "Appel de 30 minutes sans engagement. Feuille de route claire pour votre entrée sur le marché rwandais.",
        "无需承诺的30分钟通话。清晰制定您的卢旺达市场进入路线图。"
      ),
    },
  ];

  const features = [
    { icon: Users, text: L("Built for foreign professionals", "Conçu pour les professionnels étrangers", "专为外籍专业人士服务") },
    { icon: Shield, text: L("Full compliance & licensing handled", "Conformité complète et licences gérées", "全面处理合规与许可证事务") },
    { icon: MapPin, text: L("Office, housing, transport — all arranged", "Bureau, logement, transport — tout organisé", "办公室、住房、交通——一应俱全") },
    { icon: Globe, text: L("Clients from 15+ countries served", "Clients de plus de 15 pays servis", "服务来自15+国家的客户") },
  ];

  return (
    <>
      {/* The opportunity */}
      <section className="border-t border-line bg-white py-16 md:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="eyebrow">{L("The Opportunity", "L'Opportunité", "投资机遇")}</p>
              <h2 className="h-display mt-3 text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">
                {L("Why Rwanda and Why With Us", "Pourquoi le Rwanda et Pourquoi Nous", "为什么选择卢旺达和我们")}
              </h2>
              <p className="lead mt-6">
                {L(
                  "Rwanda ranked second in Africa for ease of doing business in the World Bank's last Doing Business report. We turn that advantage into a working company, a team and a home for you.",
                  "Le Rwanda s'est classé 2e en Afrique dans le dernier rapport Doing Business de la Banque mondiale. Nous transformons cet avantage en une entreprise opérationnelle, une équipe et un foyer pour vous.",
                  "在世界银行最新一期《营商环境报告》中，卢旺达位列非洲第二。我们将这一优势转化为您的公司、团队与家园。"
                )}
              </p>
              <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-[10px] lg:block">
                <Image src="/assets/images/cert.jpg" alt="Kigali Convention Centre and Radisson Blu, Kigali" fill sizes="480px" className="object-cover" />
              </div>
              <Link href="/investment" className="link-arrow mt-7">
                {L("Explore Investment Services", "Explorer les services d'investissement", "探索投资服务")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="hairline-grid sm:grid-cols-2">
              {highlights.map((h, i) => (
                <div key={i} className="p-6 md:p-7">
                  <div className="font-display text-[1.5rem] font-semibold leading-none text-gold-600">{h.stat}</div>
                  <h3 className="mt-4 text-[1rem] font-semibold text-ink-900">{h.label}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-ink-900 py-16 text-white md:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
            <Image src="/assets/images/kiga1.jpeg" alt="Kigali city centre at dusk" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>

          <div>
            <p className="eyebrow eyebrow-light">{L("Your Partner", "Votre Partenaire", "您的合作伙伴")}</p>
            <h2 className="h-display mt-3 !text-white text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">
              {L("Why Do It With Us?", "Pourquoi Nous Choisir ?", "为什么选择我们？")}
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-white/70">
              {L(
                "We handle everything — from company registration to daily operations. One team. One contact. Zero bureaucracy for you.",
                "Nous gérons tout — de l'immatriculation de l'entreprise aux opérations quotidiennes. Une équipe. Un contact. Zéro bureaucratie pour vous.",
                "我们处理一切——从公司注册到日常运营。一个团队，一个联系人，零繁文缛节。"
              )}
            </p>
            <ul className="mt-8 border-t border-white/10">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-4 border-b border-white/10 py-4">
                  <f.icon className="h-5 w-5 shrink-0 text-gold-500" />
                  <span className="text-[15px] text-white/85">{f.text}</span>
                </li>
              ))}
              <li className="flex items-center gap-4 border-b border-white/10 py-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-500" />
                <span className="text-[15px] text-white/85">{L("Free 30-Min Consultation — no obligation, clear roadmap", "Consultation gratuite de 30 minutes — sans engagement", "免费30分钟咨询——无需承诺，清晰路线图")}</span>
              </li>
            </ul>
            <Link href="/consulting" className="btn btn-gold btn-lg mt-8">
              {L("Explore Consulting Services", "Explorer les services de conseil", "探索咨询服务")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyRwandaSection;
