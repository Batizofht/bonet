"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { TrendingUp, Percent, Clock, Shield, CheckCircle } from "lucide-react";

const InvestmentIncentivesTable = () => {
  const { t } = useTranslation();

  const incentives = [
    {
      incentive: "0% Corporate Tax",
      details: "Zero corporate tax for international HQ/regional offices relocating to Rwanda",
      eligibility: "USD 10M+ investment in tangible/intangible assets",
      icon: Percent
    },
    {
      incentive: "3% Corporate Tax",
      details: "Preferential rate for holding companies, SPVs, collective investment schemes",
      eligibility: "30% Rwandan professional staff, 2+ Rwandan board members",
      icon: Percent
    },
    {
      incentive: "15% Preferential Rate",
      details: "Reduced rate for strategic sectors: energy, transport, ICT, affordable housing",
      eligibility: "Registered investor in qualifying sector",
      icon: TrendingUp
    },
    {
      incentive: "7-Year Tax Holiday",
      details: "Complete CIT exemption for up to 7 years",
      eligibility: "USD 50M+ investment (30% equity) in manufacturing, tourism, health, exports, energy, ICT",
      icon: Clock
    },
    {
      incentive: "Capital Gains Exemption",
      details: "No capital gains tax on disposal of assets (excluding commercial property)",
      eligibility: "All registered investors",
      icon: Shield
    },
    {
      incentive: "50% Accelerated Depreciation",
      details: "First-year depreciation of 50% on new or used assets",
      eligibility: "Registered investors in priority sectors",
      icon: TrendingUp
    },
    {
      incentive: "VAT Refund (15 days)",
      details: "VAT paid on imports refunded within 15 days",
      eligibility: "All registered investors with approved materials list",
      icon: CheckCircle
    },
    {
      incentive: "Export Duty Exemption",
      details: "Customs tax exemption for products in Export Processing Zones",
      eligibility: "EPZ-registered investors",
      icon: CheckCircle
    },
    {
      incentive: "Immigration Support",
      details: "Residence permits for investor + dependents. Hire 3 foreign staff without labor market test",
      eligibility: "USD 250K+ investment",
      icon: Shield
    },
    {
      incentive: "Loss Carry Forward",
      details: "Carry forward losses for up to 10 years (vs. standard 5)",
      eligibility: "Registered investors with valid exploration licence",
      icon: Clock
    },
    {
      incentive: "Angel Investor Incentive",
      details: "CGT exemption + WHT exemption on first 5 dividend issuances",
      eligibility: "USD 500K+ investment in startups",
      icon: Percent
    }
  ];

  return (
    <section className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            Tax Benefits
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
            Rwanda Investment Incentives
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Industry-leading tax advantages designed to accelerate your return on investment
          </p>
        </div>

        {/* Table - Desktop */}
        <div className="hidden md:block border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Incentive
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Eligibility
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
            All incentives require RDB Investment Certificate. We handle the entire application process.
          </p>
          <p className="text-gray-400 text-xs">
            Incentives are subject to eligibility criteria and government approval. Contact us for a personalized assessment. Last updated: January 2026.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvestmentIncentivesTable;
