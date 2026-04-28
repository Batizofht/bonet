"use client";
import { useRouter } from "next/navigation";
import { Clock, Shield, Globe, Users, ArrowRight, MapPin, CheckCircle } from "lucide-react";

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
      label: "Corporate Tax",
      desc: "For qualifying international HQs. Plus 15% preferential rates for strategic sectors."
    },
    {
      stat: "400M+",
      label: "Market Access",
      desc: "EAC and COMESA membership opens doors to over 400 million consumers."
    }
  ];

  return (
    <section className="bg-white">
      {/* PART 1: Rwanda Highlights - Clean Stat Layout */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">The Opportunity</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Why Rwanda?
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Africa's easiest place to do business. Most investors never discover these advantages.
          </p>
        </div>

        {/* Big Stats - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {highlights.map((item, index) => (
            <div key={index} className="text-center group">
              <div className="text-6xl md:text-7xl font-bold text-[#C9A84C] mb-3 group-hover:scale-105 transition-transform">
                {item.stat}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.label}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Link */}
        <div className="text-center mt-12">
          <button 
            onClick={() => router.push("/investment")}
            className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold hover:gap-3 transition-all"
          >
            Explore Investment Services
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* PART 2: Why Bonet - Split Layout with Image */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">Your Partner</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6 leading-tight">
                Why Do It <br/><span className="text-[#C9A84C]">With Us?</span>
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                We handle everything — from company registration to daily operations. 
                One team. One contact. Zero bureaucracy for you.
              </p>

              {/* Feature List */}
              <div className="space-y-4 mb-8">
                {[
                  { icon: Users, text: "Built for foreign professionals" },
                  { icon: Shield, text: "Full compliance & licensing handled" },
                  { icon: MapPin, text: "Office, housing, transport — all arranged" },
                  { icon: Globe, text: "Clients from 15+ countries served" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Primary CTA */}
              <button 
                onClick={() => router.push("/consulting")}
                className="group flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] shadow-lg shadow-[#C9A84C]/20 transition-all"
              >
                Explore Consulting Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right: Visual/Placeholder for Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
                <img 
                  src="/image/1.jpg" 
                  alt="Kigali Business District" 
                  className="w-full h-full object-cover"
                />
                {/* Overlay card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#C9A84C] flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Free 30-Min Consultation</p>
                      <p className="text-sm text-gray-500">No obligation. Clear roadmap.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#C9A84C]/10 rounded-full -z-10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#C9A84C]/10 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRwandaSection;