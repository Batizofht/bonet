"use client";
import React from "react";
import { TrendingUp, Building2, Trees, Cpu, Hotel, Sprout } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const InvestmentOpportunities = () => {
  const { i18n } = useTranslation();
  const L = (en, fr, ch) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const sectors = [
    {
      icon: Building2,
      title: L("Real Estate & Construction", "Immobilier et Construction", "房地产与建筑"),
      desc: L(
        "High demand for residential, commercial, and hospitality properties in Kigali and emerging cities.",
        "Forte demande de propriétés résidentielles, commerciales et hôtelières à Kigali et dans les villes émergentes.",
        "吉佳利及新兴城市对住宅、商业和酒店物业需求旺盛。"
      ),
      highlight: L("ROI: 15-25% annually", "ROI : 15-25% par an", "年回报率：15-25%")
    },
    {
      icon: Trees,
      title: L("Tourism & Hospitality", "Tourisme et Hôtellerie", "旅游与酒店"),
      desc: L(
        "Gorilla trekking, eco-tourism, and luxury hospitality are booming sectors.",
        "Le trekking des gorilles, l'écotourisme et l'hôtellerie de luxe sont des secteurs en plein essor.",
        "大猩猩徒步旅行、生态旅游和豪华酒店业蓬勃发展。"
      ),
      highlight: L("Growth: 15% yearly", "Croissance : 15% par an", "年增长率：15%")
    },
    {
      icon: Cpu,
      title: L("ICT & Technology", "TIC et Technologie", "信息通信技术"),
      desc: L(
        "Rwanda is Africa's emerging tech hub with 4G coverage and digital innovation incentives.",
        "Le Rwanda est le hub technologique émergent de l'Afrique avec une couverture 4G et des incitations à l'innovation numérique.",
        "卢旺达是非洲新兴技术中心，拥有4G覆盖和数字创新激励措施。"
      ),
      highlight: L("Tax holidays available", "Exonérations fiscales disponibles", "可享受税收假期")
    },
    {
      icon: Sprout,
      title: L("Agriculture", "Agriculture", "农业"),
      desc: L(
        "Coffee, tea, horticulture exports. Government provides land and infrastructure support.",
        "Exportations de café, thé et horticulture. Le gouvernement fournit un soutien foncier et infrastructurel.",
        "咖啡、茶叶、园艺出口。政府提供土地和基础设施支持。"
      ),
      highlight: L("Export incentives up to 7%", "Incitations à l'exportation jusqu'à 7%", "出口激励高达7%")
    },
    {
      icon: Hotel,
      title: L("Manufacturing", "Industrie Manufacturière", "制造业"),
      desc: L(
        "Special Economic Zones offer tax exemptions, duty-free imports, and streamlined setup.",
        "Les zones économiques spéciales offrent des exonérations fiscales, des importations en franchise de droits et une création simplifiée.",
        "经济特区提供税收豁免、免关税进口和简化的企业设立流程。"
      ),
      highlight: L("10-year tax holiday", "Exonération fiscale de 10 ans", "10年税收假期")
    },
    {
      icon: TrendingUp,
      title: L("Energy", "Énergie", "能源"),
      desc: L(
        "Renewable energy investments in solar, hydro, and methane extraction from Lake Kivu.",
        "Investissements dans les énergies renouvelables : solaire, hydraulique et extraction de méthane du lac Kivu.",
        "可再生能源投资：太阳能、水电及基伍湖甲烷开采。"
      ),
      highlight: L("Feed-in tariffs guaranteed", "Tarifs d'achat garantis", "上网电价有保障")
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
          {L("Investment Opportunities", "Opportunités d'Investissement", "投资机会")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
          {L("High-Return Sectors in Rwanda", "Secteurs à Haut Rendement au Rwanda", "卢旺达高回报行业")}
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          {L(
            "Discover profitable investment opportunities with strong government support and growing markets",
            "Découvrez des opportunités d'investissement rentables avec un fort soutien gouvernemental et des marchés en croissance",
            "探索拥有强力政府支持和不断增长市场的盈利投资机会"
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#C9A84C]/40 transition-all">
            <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-xl flex items-center justify-center mb-4">
              <sector.icon className="w-6 h-6 text-[#C9A84C]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{sector.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{sector.desc}</p>
            <div className="text-[#C9A84C] font-semibold text-sm">{sector.highlight}</div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {L("Ready to Invest in Rwanda?", "Prêt à Investir au Rwanda ?", "准备好在卢旺达投资了吗？")}
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {L(
            "Get personalized investment guidance, company registration support, and RDB certification assistance.",
            "Obtenez des conseils d'investissement personnalisés, un soutien à l'enregistrement d'entreprise et une assistance pour la certification RDB.",
            "获取个性化投资指导、公司注册支持和RDB认证协助。"
          )}
        </p>
        <Link
          href="/consulting"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
        >
          {L("Schedule Investment Consultation", "Planifier une Consultation d'Investissement", "安排投资咨询")}
        </Link>
      </div>
    </div>
  );
};

export default InvestmentOpportunities;
