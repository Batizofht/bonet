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
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div 
        className="relative w-full h-[20vh] sm:h-[30vh] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/4.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">HR Solutions</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">
            Build Your Dream Team in Rwanda
          </h1>
          <p className="text-white/75 max-w-2xl mt-2 text-xs sm:text-sm leading-relaxed">
            End-to-end recruitment, payroll, and HR compliance for foreign companies
          </p>
          <a
            href="/contact?service=department"
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-xs"
          >
            Get Recruitment Support
            <ArrowRight className="w-3 h-3" />
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
            Our HR Services
          </h2>
          <p className="text-gray-600">Complete workforce solutions for your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 flex gap-4"
              >
                <service.icon className="w-6 h-6 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
          ))}
        </div>
      </div>

      {/* Link to Full HR Services */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Need Full HR Support?</h3>
            <p className="text-gray-600 text-sm">Explore our complete HR and administrative services</p>
          </div>
          <a
            href="/hrsupport"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-[#C9A84C] hover:text-white transition-colors text-sm"
          >
            View All HR Services
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* CTA */}
      <div
        className="relative w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/image/4.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative pt-16 pb-24 lg:pt-20 lg:pb-28">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Get Started</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Need Talent in Rwanda?
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              From sourcing to onboarding, we handle every step of your hiring process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/hrsupport"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
              >
                <Users className="w-4 h-4" />
                Get Recruitment Support
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
