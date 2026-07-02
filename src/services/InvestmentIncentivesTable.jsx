"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { TrendingUp, Percent, Clock, Shield, CheckCircle } from "lucide-react";

const InvestmentIncentivesTable = () => {
  const { i18n } = useTranslation();
  const L = (en, fr, ch) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const incentives = [
    {
      incentive: L("0% Corporate Tax", "0% Impôt sur les Sociétés", "0%企业所得税"),
      details: L(
        "Zero corporate tax for international HQ/regional offices relocating to Rwanda",
        "Zéro impôt sur les sociétés pour les sièges sociaux internationaux/bureaux régionaux qui s'installent au Rwanda",
        "迁入卢旺达的国际总部/地区办事处零企业所得税"
      ),
      eligibility: L(
        "USD 10M+ investment in tangible/intangible assets",
        "Investissement de 10M USD+ en actifs corporels/incorporels",
        "有形/无形资产投资1000万美元以上"
      ),
      icon: Percent
    },
    {
      incentive: L("3% Corporate Tax", "3% Impôt sur les Sociétés", "3%企业所得税"),
      details: L(
        "Preferential rate for holding companies, SPVs, collective investment schemes",
        "Taux préférentiel pour les sociétés holding, les SPV, les organismes de placement collectif",
        "适用于控股公司、特殊目的载体、集合投资计划的优惠税率"
      ),
      eligibility: L(
        "30% Rwandan professional staff, 2+ Rwandan board members",
        "30% de personnel professionnel rwandais, 2+ membres rwandais du conseil",
        "30%卢旺达专业员工，2名以上卢旺达董事会成员"
      ),
      icon: Percent
    },
    {
      incentive: L("15% Preferential Rate", "Taux Préférentiel de 15%", "15%优惠税率"),
      details: L(
        "Reduced rate for strategic sectors: energy, transport, ICT, affordable housing",
        "Taux réduit pour les secteurs stratégiques : énergie, transport, TIC, logement abordable",
        "适用于能源、交通、信息通信技术、经济适用房等战略性行业的降低税率"
      ),
      eligibility: L(
        "Registered investor in qualifying sector",
        "Investisseur enregistré dans un secteur éligible",
        "在符合条件行业注册的投资者"
      ),
      icon: TrendingUp
    },
    {
      incentive: L("7-Year Tax Holiday", "Exonération Fiscale de 7 Ans", "7年免税期"),
      details: L(
        "Complete CIT exemption for up to 7 years",
        "Exonération complète de l'impôt sur les sociétés jusqu'à 7 ans",
        "最长7年完全免征企业所得税"
      ),
      eligibility: L(
        "USD 50M+ investment (30% equity) in manufacturing, tourism, health, exports, energy, ICT",
        "Investissement de 50M USD+ (30% de fonds propres) dans l'industrie, le tourisme, la santé, les exportations, l'énergie, les TIC",
        "制造业、旅游业、医疗、出口、能源、ICT领域投资5000万美元以上（30%股权）"
      ),
      icon: Clock
    },
    {
      incentive: L("Capital Gains Exemption", "Exonération des Plus-Values", "资本利得豁免"),
      details: L(
        "No capital gains tax on disposal of assets (excluding commercial property)",
        "Pas d'impôt sur les plus-values lors de la cession d'actifs (hors immobilier commercial)",
        "处置资产时无需缴纳资本利得税（商业地产除外）"
      ),
      eligibility: L("All registered investors", "Tous les investisseurs enregistrés", "所有已注册投资者"),
      icon: Shield
    },
    {
      incentive: L("50% Accelerated Depreciation", "Amortissement Accéléré de 50%", "50%加速折旧"),
      details: L(
        "First-year depreciation of 50% on new or used assets",
        "Amortissement de première année de 50% sur les actifs neufs ou d'occasion",
        "新旧资产第一年折旧50%"
      ),
      eligibility: L(
        "Registered investors in priority sectors",
        "Investisseurs enregistrés dans des secteurs prioritaires",
        "优先行业的注册投资者"
      ),
      icon: TrendingUp
    },
    {
      incentive: L("VAT Refund (15 days)", "Remboursement TVA (15 jours)", "增值税退税（15天）"),
      details: L(
        "VAT paid on imports refunded within 15 days",
        "TVA payée sur les importations remboursée dans les 15 jours",
        "进口支付的增值税在15天内退还"
      ),
      eligibility: L(
        "All registered investors with approved materials list",
        "Tous les investisseurs enregistrés avec une liste de matériaux approuvée",
        "所有拥有已批准物料清单的注册投资者"
      ),
      icon: CheckCircle
    },
    {
      incentive: L("Export Duty Exemption", "Exonération des Droits d'Exportation", "出口关税豁免"),
      details: L(
        "Customs tax exemption for products in Export Processing Zones",
        "Exonération de taxe douanière pour les produits dans les zones de traitement des exportations",
        "出口加工区产品免征海关税"
      ),
      eligibility: L("EPZ-registered investors", "Investisseurs enregistrés en ZPE", "出口加工区注册投资者"),
      icon: CheckCircle
    },
    {
      incentive: L("Immigration Support", "Soutien à l'Immigration", "移民支持"),
      details: L(
        "Residence permits for investor + dependents. Hire 3 foreign staff without labor market test",
        "Permis de résidence pour l'investisseur + personnes à charge. Embauche de 3 employés étrangers sans test du marché du travail",
        "投资者及家属居留许可。无需劳动力市场测试即可雇用3名外籍员工"
      ),
      eligibility: L("USD 250K+ investment", "Investissement de 250K USD+", "投资25万美元以上"),
      icon: Shield
    },
    {
      incentive: L("Loss Carry Forward", "Report des Pertes", "亏损结转"),
      details: L(
        "Carry forward losses for up to 10 years (vs. standard 5)",
        "Reporter les pertes jusqu'à 10 ans (contre 5 en standard)",
        "亏损可结转最长10年（标准为5年）"
      ),
      eligibility: L(
        "Registered investors with valid exploration licence",
        "Investisseurs enregistrés avec une licence d'exploration valide",
        "持有有效勘探许可证的注册投资者"
      ),
      icon: Clock
    },
    {
      incentive: L("Angel Investor Incentive", "Incitation pour les Investisseurs Providentiels", "天使投资人激励"),
      details: L(
        "CGT exemption + WHT exemption on first 5 dividend issuances",
        "Exonération de la taxe sur les plus-values + exonération de la retenue à la source sur les 5 premières distributions de dividendes",
        "资本利得税豁免+前5次分红免征预扣税"
      ),
      eligibility: L(
        "USD 500K+ investment in startups",
        "Investissement de 500K USD+ dans des startups",
        "在初创企业投资50万美元以上"
      ),
      icon: Percent
    }
  ];

  return (
    <section className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            {L("Tax Benefits", "Avantages Fiscaux", "税收优惠")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
            {L("Rwanda Investment Incentives", "Incitations à l'Investissement au Rwanda", "卢旺达投资激励措施")}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {L(
              "Industry-leading tax advantages designed to accelerate your return on investment",
              "Des avantages fiscaux de premier plan conçus pour accélérer votre retour sur investissement",
              "业界领先的税收优惠，旨在加速您的投资回报"
            )}
          </p>
        </div>

        {/* Table - Desktop */}
        <div className="hidden md:block border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    {L("Incentive", "Incitation", "激励措施")}
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    {L("Details", "Détails", "详情")}
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    {L("Eligibility", "Éligibilité", "资格条件")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {incentives.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                        <span className="font-semibold text-gray-900">{item.incentive}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.details}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-[#C9A84C]/10 text-[#C9A84C]">
                        {item.eligibility}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cards - Mobile */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {incentives.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <item.icon className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                <h3 className="font-semibold text-gray-900">{item.incentive}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">{item.details}</p>
              <span className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-[#C9A84C]/10 text-[#C9A84C]">
                {item.eligibility}
              </span>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-gray-500 text-sm">
            {L(
              "All incentives require RDB Investment Certificate. We handle the entire application process.",
              "Toutes les incitations nécessitent un certificat d'investissement RDB. Nous gérons l'ensemble du processus de demande.",
              "所有激励措施均需要RDB投资证书。我们处理整个申请流程。"
            )}
          </p>
          <p className="text-gray-400 text-xs">
            {L(
              "Incentives are subject to eligibility criteria and government approval. Contact us for a personalized assessment. Last updated: January 2026.",
              "Les incitations sont soumises à des critères d'éligibilité et à l'approbation du gouvernement. Contactez-nous pour une évaluation personnalisée. Dernière mise à jour : janvier 2026.",
              "激励措施须满足资格标准并获得政府批准。请联系我们进行个性化评估。最后更新：2026年1月。"
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvestmentIncentivesTable;
