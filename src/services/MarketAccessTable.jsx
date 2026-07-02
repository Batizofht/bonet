"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { Globe, Users, ArrowRight } from "lucide-react";

const MarketAccessTable = () => {
  const { i18n } = useTranslation();
  const L = (en, fr, ch) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const markets = [
    {
      tradeBloc: "East African Community (EAC)",
      countries: L("7 countries", "7 pays", "7个国家"),
      population: "152M+ " + L("consumers", "consommateurs", "消费者"),
      keyBenefit: L("Duty-free trade, common market access", "Commerce en franchise de droits, accès au marché commun", "免关税贸易，进入共同市场")
    },
    {
      tradeBloc: "COMESA",
      countries: L("21 countries", "21 pays", "21个国家"),
      population: "389M+ " + L("consumers", "consommateurs", "消费者"),
      keyBenefit: L("Free trade zone, reduced tariffs", "Zone de libre-échange, droits de douane réduits", "自由贸易区，降低关税")
    },
    {
      tradeBloc: L("European Union (EPA)", "Union Européenne (APE)", "欧盟（经济伙伴协定）"),
      countries: L("27 countries", "27 pays", "27个国家"),
      population: "450M+ " + L("consumers", "consommateurs", "消费者"),
      keyBenefit: L("Duty-free, quota-free market access", "Accès au marché en franchise de droits et de contingents", "免关税、免配额市场准入")
    },
    {
      tradeBloc: L("United States (AGOA)", "États-Unis (AGOA)", "美国（非洲增长与机遇法）"),
      countries: "USA",
      population: "330M+ " + L("consumers", "consommateurs", "消费者"),
      keyBenefit: L("6,500+ product lines duty-free", "Plus de 6 500 lignes de produits en franchise de droits", "6500+产品线免关税")
    },
    {
      tradeBloc: "AfCFTA",
      countries: L("54 African nations", "54 nations africaines", "54个非洲国家"),
      population: "1.3B+ " + L("consumers", "consommateurs", "消费者"),
      keyBenefit: L("Largest free trade area by countries", "Plus grande zone de libre-échange par nombre de pays", "按国家数量计的最大自由贸易区")
    }
  ];

  const totalReach = "1.6B+";

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            {L("Market Reach", "Portée du Marché", "市场覆盖")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
            {L("Access to Global Markets", "Accès aux Marchés Mondiaux", "进入全球市场")}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {L(
              "Rwanda's strategic trade agreements give your business unprecedented access across continents",
              "Les accords commerciaux stratégiques du Rwanda donnent à votre entreprise un accès sans précédent à travers les continents",
              "卢旺达的战略性贸易协定为您的企业提供跨大陆的无与伦比的准入机会"
            )}
          </p>
        </div>

        {/* Total Market Card */}
        <div className="border border-gray-200 rounded-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Globe className="w-8 h-8 text-[#C9A84C] flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                  {L("Total Market Access", "Accès Total au Marché", "市场准入总量")}
                </p>
                <p className="text-4xl font-bold text-gray-900">{totalReach} {L("Consumers", "Consommateurs", "消费者")}</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600 text-sm max-w-md">
                {L(
                  "From Rwanda, reach over 1.6 billion consumers across Africa, Europe, and the United States with preferential trade terms",
                  "Depuis le Rwanda, atteignez plus de 1,6 milliard de consommateurs en Afrique, en Europe et aux États-Unis avec des conditions commerciales préférentielles",
                  "从卢旺达出发，以优惠贸易条件覆盖非洲、欧洲和美国超过16亿消费者"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Table - Desktop */}
        <div className="hidden md:block border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    {L("Trade Agreement", "Accord Commercial", "贸易协定")}
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    {L("Coverage", "Couverture", "覆盖范围")}
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    {L("Market Size", "Taille du Marché", "市场规模")}
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    {L("Key Advantage", "Avantage Clé", "主要优势")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {markets.map((market, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                        <span className="font-semibold text-gray-900">{market.tradeBloc}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{market.countries}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-[#C9A84C]">{market.population}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{market.keyBenefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cards - Mobile */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {markets.map((market, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                <h3 className="font-semibold text-gray-900">{market.tradeBloc}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  <span className="font-medium">{L("Coverage", "Couverture", "覆盖范围")}:</span> {market.countries}
                </p>
                <p className="text-[#C9A84C] font-semibold">{market.population}</p>
                <p className="text-gray-600">
                  <span className="font-medium">{L("Benefit", "Avantage", "优势")}:</span> {market.keyBenefit}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold hover:gap-3 transition-all"
          >
            {L("Discuss Export Strategy", "Discuter de la Stratégie d'Exportation", "探讨出口战略")}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MarketAccessTable;
