"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

const MarketAccessTable = () => {
  const { i18n } = useTranslation();
  const L = (en, fr, ch) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const markets = [
    {
      tradeBloc: "East African Community (EAC)",
      countries: L("8 countries", "8 pays", "8个国家"),
      population: "300M+ " + L("consumers", "consommateurs", "消费者"),
      keyBenefit: L("Duty-free trade, common market access", "Commerce en franchise de droits, accès au marché commun", "免关税贸易，进入共同市场"),
    },
    {
      tradeBloc: "COMESA",
      countries: L("21 countries", "21 pays", "21个国家"),
      population: "389M+ " + L("consumers", "consommateurs", "消费者"),
      keyBenefit: L("Free trade zone, reduced tariffs", "Zone de libre-échange, droits de douane réduits", "自由贸易区，降低关税"),
    },
    {
      tradeBloc: L("European Union (EBA)", "Union Européenne (TSA)", "欧盟（除武器外全部免税）"),
      countries: L("27 countries", "27 pays", "27个国家"),
      population: "450M+ " + L("consumers", "consommateurs", "消费者"),
      keyBenefit: L("Duty-free, quota-free market access", "Accès au marché en franchise de droits et de contingents", "免关税、免配额市场准入"),
    },
    {
      tradeBloc: L("United States (AGOA)", "États-Unis (AGOA)", "美国（非洲增长与机遇法）"),
      countries: "USA",
      population: "330M+ " + L("consumers", "consommateurs", "消费者"),
      keyBenefit: L("Preferential access for eligible products (subject to programme status)", "Accès préférentiel pour les produits éligibles (selon le statut du programme)", "符合条件产品享优惠准入（视项目状态而定）"),
    },
    {
      tradeBloc: "AfCFTA",
      countries: L("54 African nations", "54 nations africaines", "54个非洲国家"),
      population: "1.3B+ " + L("consumers", "consommateurs", "消费者"),
      keyBenefit: L("Largest free trade area by countries", "Plus grande zone de libre-échange par nombre de pays", "按国家数量计的最大自由贸易区"),
    },
  ];

  return (
    <section className="bg-ink-900 text-white">
      <div className="container-x py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-light">{L("Market Reach", "Portée du Marché", "市场覆盖")}</p>
            <h2 className="h-display mt-3 !text-white text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">
              {L("Access to Global Markets", "Accès aux Marchés Mondiaux", "进入全球市场")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              {L(
                "Rwanda's strategic trade agreements give your business unprecedented access across continents",
                "Les accords commerciaux stratégiques du Rwanda donnent à votre entreprise un accès sans précédent à travers les continents",
                "卢旺达的战略性贸易协定为您的企业提供跨大陆的无与伦比的准入机会"
              )}
            </p>
            <div className="mt-8 border-l-2 border-gold-500 pl-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-400">{L("Total Market Access", "Accès Total au Marché", "市场准入总量")}</p>
              <p className="mt-2 font-display text-[2.2rem] font-semibold leading-none">1.6B+</p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                {L(
                  "From Rwanda, reach over 1.6 billion consumers across Africa, Europe, and the United States with preferential trade terms",
                  "Depuis le Rwanda, atteignez plus de 1,6 milliard de consommateurs en Afrique, en Europe et aux États-Unis avec des conditions commerciales préférentielles",
                  "从卢旺达出发，以优惠贸易条件覆盖非洲、欧洲和美国超过16亿消费者"
                )}
              </p>
            </div>
            <Link href="/contact" className="btn btn-gold mt-8">
              {L("Discuss Export Strategy", "Discuter de la Stratégie d'Exportation", "探讨出口战略")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="divide-y divide-white/10 border-y border-white/10">
            {markets.map((m) => (
              <li key={m.tradeBloc} className="grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                <div>
                  <p className="font-display text-[1.1rem] font-semibold leading-snug">{m.tradeBloc}</p>
                  <p className="mt-1.5 text-[15px] text-white/60">{m.keyBenefit}</p>
                </div>
                <div className="sm:text-right">
                  <p className="font-display text-[1.1rem] font-semibold text-gold-400">{m.population}</p>
                  <p className="text-[13px] uppercase tracking-[0.12em] text-white/45">{m.countries}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MarketAccessTable;
