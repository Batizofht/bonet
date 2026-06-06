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
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div 
        className="relative w-full h-[20vh] sm:h-[30vh] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/5.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Executive Concierge</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">
            Relocate to Rwanda Stress-Free
          </h1>
          <p className="text-white/75 max-w-2xl mt-2 text-xs sm:text-sm leading-relaxed">
            Premium relocation services for executives and families moving to Rwanda
          </p>
          <a
            href="/contact"
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-xs"
          >
            Start Your Relocation
            <ArrowRight className="w-3 h-3" />
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
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
            Services
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
            Our Relocation Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Everything you need for a smooth transition</p>
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

      {/* Relocation Process */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              Your Relocation Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A seamless 4-step process designed for busy executives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relocationSteps.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 text-center bg-white">
                <div className="text-xs text-[#C9A84C] font-bold mb-3">{item.step}</div>
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
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              Why Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              Why Choose Bonet Elite
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">What makes us the preferred relocation partner</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <item.icon className="w-7 h-7 text-[#C9A84C] mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              Popular Neighborhoods
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Kigali's finest residential areas for expats</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {neighborhoods.map((area, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 text-center bg-white">
                <MapPin className="w-5 h-5 text-[#C9A84C] mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 text-lg">{area.name}</h3>
                <p className="text-gray-500 text-sm">{area.type}</p>
                <p className="text-[#C9A84C] text-sm font-medium mt-2">{area.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div
        className="relative w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/image/5.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative pt-16 pb-24 lg:pt-20 lg:pb-28">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Get Started</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Moving to Rwanda?
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Let us handle the logistics while you focus on your business.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
