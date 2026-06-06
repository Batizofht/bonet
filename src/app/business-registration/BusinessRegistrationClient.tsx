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
  Phone,
  Shield,
  Users,
  BarChart3,
  Landmark
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "6-Hour Registration",
    description: "RDB processes applications same day — no waiting weeks for approval."
  },
  {
    icon: Globe,
    title: "100% Foreign Ownership",
    description: "No local partner required. You retain full control of your company."
  },
  {
    icon: Coins,
    title: "Free Government Registration",
    description: "No government fee is required to register your company in Rwanda."
  },
  {
    icon: Building2,
    title: "No Minimum Capital",
    description: "Start with any investment amount. Zero capital requirement."
  }
];

const benefits = [
  {
    icon: Shield,
    title: "Legal & Regulatory Compliance",
    description: "We ensure your company meets all RDB, RSSB, and RRA requirements from day one, avoiding penalties and delays."
  },
  {
    icon: Users,
    title: "Dedicated Account Manager",
    description: "A single point of contact guides you through every step — from name reservation to tax registration and beyond."
  },
  {
    icon: BarChart3,
    title: "Post-Registration Support",
    description: "Beyond registration, we help with bank account opening, work permits, tax filings, and operational setup."
  },
  {
    icon: Landmark,
    title: "Government Liaison",
    description: "Our team maintains direct relationships with RDB, Rwanda Revenue Authority, and RSSB to fast-track your applications."
  }
];

const steps = [
  {
    number: "01",
    title: "Company Name Reservation",
    description: "We reserve your preferred company name with RDB and verify availability within hours."
  },
  {
    number: "02",
    title: "Document Preparation",
    description: "Our team prepares all incorporation documents — articles of association, shareholder details, and board resolutions."
  },
  {
    number: "03",
    title: "RDB Submission",
    description: "We submit your complete application to the Rwanda Development Board for processing and approval."
  },
  {
    number: "04",
    title: "TIN Registration",
    description: "Once incorporated, we register your company for a Tax Identification Number with RRA."
  },
  {
    number: "05",
    title: "RSSB Registration",
    description: "We enroll your company and employees with the Rwanda Social Security Board for compliance."
  },
  {
    number: "06",
    title: "Business License & Permits",
    description: "We handle all sector-specific licenses and permits so you can operate legally from day one."
  }
];

const faqs = [
  {
    q: "How long does company registration take in Rwanda?",
    a: "The Rwanda Development Board (RDB) typically processes company registrations within 6 hours for standard applications. Our end-to-end service, including document preparation and post-registration steps, is completed within 24-48 hours."
  },
  {
    q: "Can a foreigner own 100% of a company in Rwanda?",
    a: "Yes. Rwanda allows 100% foreign ownership for most business sectors. There is no requirement for a local partner or shareholder."
  },
  {
    q: "How much does it cost to register a company?",
    a: "RDB charges no government fee for company registration. Our service fees vary based on the complexity of your business structure and the additional services required (TIN, RSSB, licenses)."
  },
  {
    q: "What documents do I need to register?",
    a: "You need a valid passport or national ID for each shareholder and director, a proposed company name, proof of business address, and details of the company's share structure. We guide you through the full list."
  },
  {
    q: "What type of company should I register?",
    a: "Most foreign investors register a Private Limited Company (PLC) — the most common and flexible structure. We also handle branches of foreign companies, public companies, and non-profit organizations."
  },
  {
    q: "Do I need to be in Rwanda to register?",
    a: "No. We handle the entire registration process remotely. You only need to provide scanned copies of your documents. However, certain post-registration steps (like bank account opening) may require your presence or a power of attorney."
  }
];

export default function BusinessRegistrationClient() {
  const { t } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div 
        className="relative w-full h-[25vh] sm:h-[30vh] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/city.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Rwanda Business Setup</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">
            Register Your Company in 6 Hours
          </h1>
          <p className="text-white/75 max-w-2xl mt-2 text-xs sm:text-sm leading-relaxed">
            Just one team that handles every step from application to operations.
          </p>
          <a
            href="/contact"
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-xs"
          >
            Start Your Registration
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Companies Registered" },
              { value: "6", label: "Hours Average Time" },
              { value: "0", label: "Government Fee" },
              { value: "98%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#C9A84C] mb-1">{stat.value}</div>
                <div className="text-gray-500 text-xs uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Why Choose Us</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">Everything You Need to Start</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">
              Rwanda offers the fastest, most straightforward company registration process in Africa. Here is why investors choose us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 lg:p-8 text-center">
                <feature.icon className="w-8 h-8 text-[#C9A84C] mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Register in Rwanda */}
      <div className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Why Rwanda</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">Africa's Easiest Place to Do Business</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">
              Ranked 2nd in Africa for ease of doing business, Rwanda offers a stable, transparent, and investor-friendly environment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Second easiest place to do business in Africa (World Bank)",
              "Stable political environment with strong governance",
              "English, French, and Kinyarwanda speaking business community",
              "Strategic location — access to COMESA, EAC, and AfCFTA markets",
              "Modern digital infrastructure for online business operations",
              "Competitive corporate tax rates and investment incentives"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 border border-gray-200 rounded-xl p-4 bg-white">
                <CheckCircle className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Process</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">Complete Setup in 6 Steps</h2>
            <p className="text-gray-500 text-sm mt-2">From name reservation to business license — we handle it all.</p>
          </div>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-5 border border-gray-200 rounded-xl p-5 bg-white">
                <span className="text-[#C9A84C] font-bold text-lg w-8 flex-shrink-0">{step.number}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">What You Get</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">Beyond Just Registration</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">
              We do not stop at incorporation. Our team supports your business through every stage of setup and operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white flex gap-4">
                <benefit.icon className="w-6 h-6 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 text-sm pr-4">{faq.q}</span>
                  <span className={`text-[#C9A84C] text-lg transition-transform flex-shrink-0 ${openFAQ === index ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-5 pb-4 bg-white border-t border-gray-100">
                    <p className="text-gray-600 text-sm leading-relaxed pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className="relative w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/image/city.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative pt-16 pb-24 lg:pt-20 lg:pb-28">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Get Started Today</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Register Your Company in Rwanda?
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Join hundreds of foreign investors who trusted us with their Rwanda business setup. Free consultation included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
              >
                <FileCheck className="w-4 h-4" />
                Book Free Consultation
              </a>
              <a
                href="https://wa.me/250726300260"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
