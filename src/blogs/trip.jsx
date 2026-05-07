import React from "react";
import { Compass, MapPin, Camera, Mountain, Palmtree, Binoculars } from "lucide-react";
import Link from "next/link";

const TravelTips = () => {
  const tips = [
    {
      icon: Compass,
      title: "Best Time to Visit",
      desc: "June to September (dry season) for gorilla trekking. December to February for general travel."
    },
    {
      icon: MapPin,
      title: "Visa Requirements",
      desc: "Visa on arrival available for most nationalities ($50). Apply online via Rwanda Immigration portal."
    },
    {
      icon: Camera,
      title: "Must-See Destinations",
      desc: "Volcanoes National Park (gorillas), Nyungwe Forest (chimps), Lake Kivu, Akagera National Park."
    },
    {
      icon: Mountain,
      title: "Gorilla Trekking Tips",
      desc: "Permits cost $1,500. Book 3-6 months in advance. Prepare for hiking at altitude."
    },
    {
      icon: Palmtree,
      title: "Cultural Etiquette",
      desc: "Greet with handshake. Dress modestly. Ask before photographing people. Umuganda (community work) is sacred."
    },
    {
      icon: Binoculars,
      title: "Wildlife Safari",
      desc: "Akagera offers Big 5 safaris. Best visited May-September. Combine with gorilla trekking."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
          Travel Guide
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
          Essential Rwanda Travel Tips
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Everything you need to know for an unforgettable journey to the Land of a Thousand Hills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#C9A84C]/40 transition-all">
            <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-xl flex items-center justify-center mb-4">
              <tip.icon className="w-6 h-6 text-[#C9A84C]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h3>
            <p className="text-gray-600 leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/Reservations"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
        >
          Book Your Rwanda Adventure
        </Link>
      </div>
    </div>
  );
};

export default TravelTips;
