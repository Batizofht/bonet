"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const KeyFactsTable = () => {
  const { i18n } = useTranslation();
  const L = (en, fr, ch) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const facts = [
    {
      label: L("Company Registration", "Enregistrement d'Entreprise", "公司注册"),
      value: L("Fully Managed", "Géré de A à Z", "全程托管"),
      description: L("Complete RDB registration including TIN and RSSB, handled end to end", "Enregistrement RDB complet incluant NIF et RSSB, géré de bout en bout", "完整的RDB注册，包括TIN和RSSB，全程为您办理"),
    },
    {
      label: L("Foreign Ownership", "Propriété Étrangère", "外资所有权"),
      value: "100%",
      description: L("No local partner required. Full foreign ownership permitted in all sectors", "Aucun partenaire local requis. Propriété étrangère totale autorisée dans tous les secteurs", "无需本地合伙人。所有行业均允许100%外资所有权"),
    },
    {
      label: L("Minimum Capital", "Capital Minimum", "最低资本"),
      value: "RWF 0",
      description: L("No minimum capital requirement for most business types", "Aucune exigence de capital minimum pour la plupart des types d'entreprises", "大多数企业类型无最低资本要求"),
    },
    {
      label: L("Registration Fee", "Frais d'Enregistrement", "注册费用"),
      value: L("Free", "Gratuit", "免费"),
      description: L("Free always", "Toujours gratuit", "永远免费"),
    },
    {
      label: L("Business Ranking", "Classement des Affaires", "营商排名"),
      value: L("Top 3 Africa", "Top 3 Afrique", "非洲前三"),
      description: L("Rwanda ranks among Africa's easiest places to do business (World Bank)", "Le Rwanda figure parmi les endroits les plus faciles pour faire des affaires en Afrique (Banque Mondiale)", "卢旺达跻身非洲最易经商国家前列（世界银行）"),
    },
    {
      label: L("Tax Incentives", "Incitations Fiscales", "税收优惠"),
      value: "0% – 15%",
      description: L("Corporate tax rates from 0% for HQ to 15% for strategic sectors", "Taux d'imposition sur les sociétés de 0% pour les sièges sociaux à 15% pour les secteurs stratégiques", "企业所得税税率从总部0%到战略性行业15%不等"),
    },
  ];

  return (
    <section className="border-t border-line bg-white">
      <div className="container-x py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{L("Quick Facts", "Faits Rapides", "快速事实")}</p>
            <h2 className="h-display mt-3 text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">
              {L("Key Facts for Foreign Investors", "Faits Clés pour les Investisseurs Étrangers", "外国投资者关键事实")}
            </h2>
            <p className="lead mt-5">
              {L("Everything you need to know about starting a business in Rwanda", "Tout ce que vous devez savoir pour créer une entreprise au Rwanda", "在卢旺达创业所需了解的一切")}
            </p>
          </div>
        </div>

        <div className="hairline-grid sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f, i) => (
            <div key={i} className="p-7 md:p-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-500">{f.label}</p>
              <p className="mt-3 font-display text-[1.75rem] font-semibold leading-none text-ink-900">{f.value}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-600">{f.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-5 rounded-[10px] border border-line p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-[1.15rem] font-semibold text-ink-900">{L("Ready to Start?", "Prêt à Commencer ?", "准备好开始了吗？")}</p>
            <p className="mt-1 text-[15px] text-ink-600">{L("We handle everything from registration to launch", "Nous gérons tout, de l'enregistrement au lancement", "从注册到启动，我们全程负责")}</p>
          </div>
          <Link href="/contact" className="btn btn-ink">
            {L("Book Free Consultation", "Réserver une Consultation Gratuite", "预约免费咨询")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KeyFactsTable;
