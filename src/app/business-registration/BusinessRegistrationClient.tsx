"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Building2, 
  FileCheck, 
  Clock, 
  Globe, 
  Coins,
  CheckCircle,
  ArrowRight,
  Phone
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "6-Hour Registration",
    description: "RDB processes applications same day"
  },
  {
    icon: Globe,
    title: "100% Foreign Ownership",
    description: "No local partner required"
  },
  {
    icon: Coins,
    title: "RWF 7,000 Fee",
    description: "Only government fee required"
  },
  {
    icon: Building2,
    title: "No Minimum Capital",
    description: "Start with any investment amount"
  }
];

const steps = [
  "Name reservation",
  "Document preparation",
  "RDB submission",
  "TIN registration",
  "RSSB registration",
  "License application"
];

export default function BusinessRegistrationClient() {
  const { t } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div 
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/image/city.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center px-4">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-4">
            Rwanda Business Setup
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
            Register Your Company in <span className="text-[#C9A84C]">6 Hours</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mb-8">
            100% foreign ownership. No minimum capital. Just RWF 7,000 government fee.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
          >
            Start Your Registration
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center"
            >
              <div className="w-14 h-14 bg-[#C9A84C]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-[#C9A84C]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Steps */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            6-Step <span className="text-[#C9A84C]">Registration Process</span>
          </h2>
          <p className="text-gray-600">Complete company setup in one day</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white rounded-xl p-4"
            >
              <div className="w-10 h-10 bg-[#C9A84C] text-white rounded-lg flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <span className="font-medium text-gray-900">{step}</span>
              <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Register Your Company?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join hundreds of foreign investors who started their Rwanda business journey with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
            >
              <FileCheck className="w-5 h-5" />
              Book Free Consultation
            </a>
            <a
              href="https://wa.me/250726300260"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
