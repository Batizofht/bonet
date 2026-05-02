import React from "react";
import { TrendingUp, Building2, Trees, Cpu, Hotel, Sprout } from "lucide-react";
import Link from "next/link";

const InvestmentOpportunities = () => {
  const sectors = [
    {
      icon: Building2,
      title: "Real Estate & Construction",
      desc: "High demand for residential, commercial, and hospitality properties in Kigali and emerging cities.",
      highlight: "ROI: 15-25% annually"
    },
    {
      icon: Trees,
      title: "Tourism & Hospitality",
      desc: "Gorilla trekking, eco-tourism, and luxury hospitality are booming sectors.",
      highlight: "Growth: 15% yearly"
    },
    {
      icon: Cpu,
      title: "ICT & Technology",
      desc: "Rwanda is Africa's emerging tech hub with 4G coverage and digital innovation incentives.",
      highlight: "Tax holidays available"
    },
    {
      icon: Sprout,
      title: "Agriculture",
      desc: "Coffee, tea, horticulture exports. Government provides land and infrastructure support.",
      highlight: "Export incentives up to 7%"
    },
    {
      icon: Hotel,
      title: "Manufacturing",
      desc: "Special Economic Zones offer tax exemptions, duty-free imports, and streamlined setup.",
      highlight: "10-year tax holiday"
    },
    {
      icon: TrendingUp,
      title: "Energy",
      desc: "Renewable energy investments in solar, hydro, and methane extraction from Lake Kivu.",
      highlight: "Feed-in tariffs guaranteed"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
          Investment Opportunities
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
          High-Return Sectors in Rwanda
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Discover profitable investment opportunities with strong government support and growing markets
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
          Ready to Invest in Rwanda?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Get personalized investment guidance, company registration support, and RDB certification assistance.
        </p>
        <Link
          href="/consulting"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
        >
          Schedule Investment Consultation
        </Link>
      </div>
    </div>
  );
};

export default InvestmentOpportunities;
