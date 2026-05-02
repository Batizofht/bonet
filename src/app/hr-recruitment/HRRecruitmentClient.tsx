"use client";

import { useTranslation } from "react-i18next";
import { 
  Users, 
  UserPlus, 
  Shield, 
  CreditCard,
  FileText,
  ArrowRight,
  Phone,
  CheckCircle
} from "lucide-react";

const services = [
  {
    icon: UserPlus,
    title: "Talent Sourcing",
    description: "Local and international recruitment for all skill levels"
  },
  {
    icon: Shield,
    title: "HR Compliance",
    description: "Rwanda labor law compliance and policy development"
  },
  {
    icon: CreditCard,
    title: "Payroll Management",
    description: "End-to-end payroll processing and RSSB compliance"
  },
  {
    icon: FileText,
    title: "Work Permits",
    description: "Processing for foreign staff in 5-10 business days"
  }
];

const stats = [
  { value: "500+", label: "Candidates Placed" },
  { value: "50+", label: "Corporate Clients" },
  { value: "98%", label: "Retention Rate" },
  { value: "48h", label: "Avg. Placement Time" }
];

export default function HRRecruitmentClient() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div 
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/image/4.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center px-4">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-4">
            HR Solutions
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
            Build Your <span className="text-[#C9A84C]">Dream Team</span> in Rwanda
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mb-8">
            End-to-end recruitment, payroll, and HR compliance for foreign companies
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
          >
            Get Recruitment Support
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#C9A84C] mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#C9A84C]">HR Services</span>
          </h2>
          <p className="text-gray-600">Complete workforce solutions for your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 flex gap-4"
            >
              <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <service.icon className="w-6 h-6 text-[#C9A84C]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Link to Full HR Services */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Need Full HR Support?</h3>
            <p className="text-gray-600 text-sm">Explore our complete HR and administrative services</p>
          </div>
          <a
            href="/hrsupport"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-[#C9A84C] hover:text-white transition-colors"
          >
            View All HR Services
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Talent in Rwanda?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            From sourcing to onboarding, we handle every step of your hiring process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/hrsupport"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
            >
              <Users className="w-5 h-5" />
              Get Recruitment Support
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
