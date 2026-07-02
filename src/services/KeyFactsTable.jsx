"use client";
import React from "react";
import { CheckCircle, Clock, DollarSign, Globe, Building, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

const KeyFactsTable = () => {
  const { i18n } = useTranslation();
  const L = (en, fr, ch) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const facts = [
    {
      icon: Clock,
      label: L("Company Registration", "Enregistrement d'Entreprise", "公司注册"),
      value: "6 Hours",
      description: L(
        "Complete RDB registration including TIN and RSSB in a single day",
        "Enregistrement RDB complet incluant NIF et RSSB en une seule journée",
        "完整的RDB注册，包括TIN和RSSB，当天完成"
      )
    },
    {
      icon: Globe,
      label: L("Foreign Ownership", "Propriété Étrangère", "外资所有权"),
      value: "100%",
      description: L(
        "No local partner required. Full foreign ownership permitted in all sectors",
        "Aucun partenaire local requis. Propriété étrangère totale autorisée dans tous les secteurs",
        "无需本地合伙人。所有行业均允许100%外资所有权"
      )
    },
    {
      icon: DollarSign,
      label: L("Minimum Capital", "Capital Minimum", "最低资本"),
      value: "RWF 0",
      description: L(
        "No minimum capital requirement for most business types",
        "Aucune exigence de capital minimum pour la plupart des types d'entreprises",
        "大多数企业类型无最低资本要求"
      )
    },
    {
      icon: FileText,
      label: L("Registration Fee", "Frais d'Enregistrement", "注册费用"),
      value: L("Free", "Gratuit", "免费"),
      description: L("Free always", "Toujours gratuit", "永远免费")
    },
    {
      icon: Building,
      label: L("Business Ranking", "Classement des Affaires", "营商排名"),
      value: L("Top 3 Africa", "Top 3 Afrique", "非洲前三"),
      description: L(
        "Rwanda ranks among Africa's easiest places to do business (World Bank)",
        "Le Rwanda figure parmi les endroits les plus faciles pour faire des affaires en Afrique (Banque Mondiale)",
        "卢旺达跻身非洲最易经商国家前列（世界银行）"
      )
    },
    {
      icon: CheckCircle,
      label: L("Tax Incentives", "Incitations Fiscales", "税收优惠"),
      value: "0% - 15%",
      description: L(
        "Corporate tax rates from 0% for HQ to 15% for strategic sectors",
        "Taux d'imposition sur les sociétés de 0% pour les sièges sociaux à 15% pour les secteurs stratégiques",
        "企业所得税税率从总部0%到战略性行业15%不等"
      )
    }
  ];

  return (
    <section className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            {L("Quick Facts", "Faits Rapides", "快速事实")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
            {L("Key Facts for Foreign Investors", "Faits Clés pour les Investisseurs Étrangers", "外国投资者关键事实")}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {L(
              "Everything you need to know about starting a business in Rwanda",
              "Tout ce que vous devez savoir pour créer une entreprise au Rwanda",
              "在卢旺达创业所需了解的一切"
            )}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-8"
            >
              <div className="flex items-start gap-4">
                <fact.icon className="w-6 h-6 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">{fact.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{fact.value}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{fact.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 border border-gray-200 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-6 h-6 text-[#C9A84C] flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">
                  {L("Ready to Start?", "Prêt à Commencer ?", "准备好开始了吗？")}
                </p>
                <p className="text-gray-600 text-sm">
                  {L(
                    "Most of our clients are operational within 48 hours",
                    "La plupart de nos clients sont opérationnels dans les 48 heures",
                    "我们大多数客户在48小时内投入运营"
                  )}
                </p>
              </div>
            </div>
            <a
              href="/consulting"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
            >
              {L("Book Free Consultation", "Réserver une Consultation Gratuite", "预约免费咨询")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFactsTable;
