"use client";
import { useRouter } from "next/navigation";
import { Shield, Globe, Users, MapPin, CheckCircle, ArrowRight } from "lucide-react";

const WhyRwandaSection = () => {
  const router = useRouter();

  const highlights = [
    {
      stat: "6hrs",
      label: "Company Registration",
      desc: "Certificate, TIN, and RSSB — all in one day. 100% foreign ownership permitted."
    },
    {
      stat: "0%",
      label: "Tax Incentives",
      desc: "Corporate tax holidays for qualifying investments. 15% preferential rates for strategic sectors."
    },
    {
      stat: "Cert",
      label: "Investment Certificate",
      desc: "Fast-track RDB certification unlocks tax exemptions and investor protections."
    },
    {
      stat: "100%",
      label: "Licensing",
      desc: "All permits handled: trade licenses, sector-specific, work permits, residency."
    },
    {
      stat: "400M+",
      label: "Market Access",
      desc: "EAC, COMESA, EU, US/AGOA, AfCFTA — reach 1.6+ billion consumers."
    },
    {
      stat: "1",
      label: "One Team",
      desc: "Single point of contact for registration, compliance, housing, transport, operations."
    },
    {
      stat: "15+",
      label: "Built for Foreigners",
      desc: "Clients from 15+ countries. We understand the unique needs of international investors."
    },
    {
      stat: "Free",
      label: "Consultation",
      desc: "No-obligation 30-minute call. Clear roadmap for your Rwanda market entry."
    }
  ];

  return (
    <section>
      {/* PART 1: Rwanda Highlights - Card Grid */}
      <div className="bg-white py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 lg:mb-14">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-3">The Opportunity</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              Why Rwanda and Why With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {highlights.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 lg:p-8">
                <div className="text-xs text-[#C9A84C] font-bold uppercase tracking-wider mb-3">{item.stat}</div>
                <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-2">{item.label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button 
              onClick={() => router.push("/investment")}
              className="text-[#C9A84C] font-semibold hover:text-[#B8973B] transition-colors text-sm"
            >
              Explore Investment Services &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* PART 2: Why Bonet - Split Layout */}
      <div className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.2em] mb-4">Your Partner</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider mb-6 leading-tight">
                Why Do It With Us?
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                We handle everything — from company registration to daily operations. 
                One team. One contact. Zero bureaucracy for you.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Users, text: "Built for foreign professionals" },
                  { icon: Shield, text: "Full compliance & licensing handled" },
                  { icon: MapPin, text: "Office, housing, transport — all arranged" },
                  { icon: Globe, text: "Clients from 15+ countries served" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <feature.icon className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => router.push("/consulting")}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors text-sm"
              >
                Explore Consulting Services
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img 
                  src="/image/1.jpg" 
                  alt="Kigali Business District" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white p-6 lg:p-8 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#C9A84C] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">Free 30-Min Consultation</p>
                    <p className="text-sm text-gray-500">No obligation. Clear roadmap.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRwandaSection;