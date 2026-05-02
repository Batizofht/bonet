"use client";
import React from "react";
import { Globe, Users, ArrowRight } from "lucide-react";

const MarketAccessTable = () => {
  const markets = [
    {
      tradeBloc: "East African Community (EAC)",
      countries: "7 countries",
      population: "152M+ consumers",
      keyBenefit: "Duty-free trade, common market access",
      flag: "EAC"
    },
    {
      tradeBloc: "COMESA",
      countries: "21 countries",
      population: "389M+ consumers",
      keyBenefit: "Free trade zone, reduced tariffs",
      flag: "COMESA"
    },
    {
      tradeBloc: "European Union (EPA)",
      countries: "27 countries",
      population: "450M+ consumers",
      keyBenefit: "Duty-free, quota-free market access",
      flag: "EU"
    },
    {
      tradeBloc: "United States (AGOA)",
      countries: "USA",
      population: "330M+ consumers",
      keyBenefit: "6,500+ product lines duty-free",
      flag: "US"
    },
    {
      tradeBloc: "AfCFTA",
      countries: "54 African nations",
      population: "1.3B+ consumers",
      keyBenefit: "Largest free trade area by countries",
      flag: "AfCFTA"
    }
  ];

  const totalReach = "1.6B+";

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            Market Reach
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Access to <span className="text-[#C9A84C]">Global Markets</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Rwanda&apos;s strategic trade agreements give your business unprecedented access across continents
          </p>
        </div>

        {/* Total Market Card */}
        <div className="bg-gradient-to-r from-[#C9A84C]/10 to-[#C9A84C]/5 rounded-2xl p-8 mb-12 border border-[#C9A84C]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#C9A84C] flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Total Market Access</p>
                <p className="text-4xl font-bold text-gray-900">{totalReach} Consumers</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600 text-sm max-w-md">
                From Rwanda, reach over 1.6 billion consumers across Africa, Europe, and the United States with preferential trade terms
              </p>
            </div>
          </div>
        </div>

        {/* Table - Desktop */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Trade Agreement
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Coverage
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Market Size
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Key Advantage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {markets.map((market, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-[#C9A84C]" />
                        </div>
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
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <h3 className="font-semibold text-gray-900">{market.tradeBloc}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600"><span className="font-medium">Coverage:</span> {market.countries}</p>
                <p className="text-[#C9A84C] font-semibold">{market.population}</p>
                <p className="text-gray-600"><span className="font-medium">Benefit:</span> {market.keyBenefit}</p>
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
            Discuss Export Strategy
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MarketAccessTable;
