"use client";

import { useTranslation } from "react-i18next";
import { 
  Home, 
  Car, 
  GraduationCap, 
  Landmark,
  ArrowRight,
  Phone,
  MapPin,
  Briefcase,
  Shield,
  Clock,
  Users,
  CheckCircle
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Executive Housing",
    description: "Premium apartments and villas in Kigali's best neighborhoods"
  },
  {
    icon: GraduationCap,
    title: "School Search",
    description: "International school placement for your children"
  },
  {
    icon: Landmark,
    title: "Banking Setup",
    description: "Corporate and personal bank account opening"
  },
  {
    icon: Car,
    title: "Transport & Logistics",
    description: "Vehicle purchase, leasing, and driver services"
  }
];

const neighborhoods = [
  { name: "Kacyiru", type: "Diplomatic Zone", price: "RWF 1.5M-3M/mo" },
  { name: "Kimihurura", type: "Expat Hub", price: "RWF 800K-1.5M/mo" },
  { name: "Nyarutarama", type: "Residential", price: "RWF 3M-8M/mo" },
  { name: "Kimironko", type: "Family-Friendly", price: "RWF 600K-1.2M/mo" }
];

const relocationSteps = [
  { step: "1", title: "Pre-Arrival", desc: "Virtual property tours and documentation prep" },
  { step: "2", title: "Arrival", desc: "Airport pickup and temporary accommodation" },
  { step: "3", title: "Settlement", desc: "Housing, banking, and school registration" },
  { step: "4", title: "Integration", desc: "Local orientation and ongoing support" }
];

const whyChooseUs = [
  { icon: Shield, title: "Trusted Partners", desc: "Exclusive network of vetted service providers" },
  { icon: Clock, title: "Fast Setup", desc: "Most clients fully settled within 2 weeks" },
  { icon: Briefcase, title: "Corporate Focus", desc: "Designed for executives and business needs" },
  { icon: Users, title: "Family Support", desc: "Spouse and children relocation assistance" }
];

export default function RelocationServicesClient() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div 
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/image/5.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center px-4">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-4">
            Executive Concierge
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
            Relocate to Rwanda <span className="text-[#C9A84C]">Stress-Free</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mb-8">
            Premium relocation services for executives and families moving to Rwanda
          </p>
          <a
            href="/travel"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
          >
            Start Your Relocation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Families Relocated" },
            { value: "2", label: "Weeks Average Setup" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "24/7", label: "Support Available" }
          ].map((stat, index) => (
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
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Our <span className="text-[#C9A84C]">Relocation Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Everything you need for a smooth transition</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 flex gap-4 hover:shadow-lg transition-shadow"
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

      {/* Relocation Process */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
              Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              Your <span className="text-[#C9A84C]">Relocation Journey</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A seamless 4-step process designed for busy executives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relocationSteps.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-[#C9A84C] text-white rounded-xl flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
              Why Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              Why Choose <span className="text-[#C9A84C]">Bonet Elite</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">What makes us the preferred relocation partner</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-[#C9A84C]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-[#C9A84C]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
              Locations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              Popular <span className="text-[#C9A84C]">Neighborhoods</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Kigali's finest residential areas for expats</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {neighborhoods.map((area, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center">
                <MapPin className="w-8 h-8 text-[#C9A84C] mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 text-lg">{area.name}</h3>
                <p className="text-gray-500 text-sm">{area.type}</p>
                <p className="text-[#C9A84C] text-sm font-medium mt-2">{area.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Same style as explore-rwanda */}
      <div
        className="relative w-full h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/image/1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative flex flex-col justify-center items-center text-center px-4 h-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Moving to Rwanda?
          </h2>
          <p className="text-gray-300 mb-6 max-w-xl">
            Let us handle the logistics while you focus on your business.
          </p>
          <a
            href="/travel"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
          >
            Book Free Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
