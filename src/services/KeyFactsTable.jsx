"use client";
import React from "react";
import { CheckCircle, Clock, DollarSign, Globe, Building, FileText } from "lucide-react";

const KeyFactsTable = () => {
  const facts = [
    {
      icon: Clock,
      label: "Company Registration",
      value: "6 Hours",
      description: "Complete RDB registration including TIN and RSSB in a single day"
    },
    {
      icon: Globe,
      label: "Foreign Ownership",
      value: "100%",
      description: "No local partner required. Full foreign ownership permitted in all sectors"
    },
    {
      icon: DollarSign,
      label: "Minimum Capital",
      value: "RWF 0",
      description: "No minimum capital requirement for most business types"
    },
    {
      icon: FileText,
      label: "Registration Fee",
      value: "Free",
      description: "Free always"
    },
    {
      icon: Building,
      label: "Business Ranking",
      value: "Top 3 Africa",
      description: "Rwanda ranks among Africa's easiest places to do business (World Bank)"
    },
    {
      icon: CheckCircle,
      label: "Tax Incentives",
      value: "0% - 15%",
      description: "Corporate tax rates from 0% for HQ to 15% for strategic sectors"
    }
  ];

  return (
    <section className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            Quick Facts
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Key Facts for <span className="text-[#C9A84C]">Foreign Investors</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Everything you need to know about starting a business in Rwanda
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map((fact, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                  <fact.icon className="w-6 h-6 text-[#C9A84C]" />
                </div>
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
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Ready to Start?</p>
                <p className="text-gray-600 text-sm">Most of our clients are operational within 48 hours</p>
              </div>
            </div>
            <a 
              href="/consulting"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFactsTable;
