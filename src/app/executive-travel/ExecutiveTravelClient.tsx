"use client";

import { useTranslation } from "react-i18next";
import { 
  Plane, 
  Crown, 
  MapPin, 
  Star,
  ArrowRight,
  Phone,
  Palmtree,
  Binoculars,
  Calendar,
  Clock
} from "lucide-react";

const experiences = [
  {
    icon: Binoculars,
    title: "Gorilla Trekking",
    description: "Exclusive mountain gorilla encounters in Volcanoes National Park"
  },
  {
    icon: Palmtree,
    title: "Lake Kivu Retreat",
    description: "Private beachfront resorts and water sports"
  },
  {
    icon: Crown,
    title: "Private Safari",
    description: "Big Five game drives in Akagera National Park"
  },
  {
    icon: MapPin,
    title: "Kigali City Tour",
    description: "Cultural experiences and premium dining"
  }
];

const hotels = [
  { name: "Radisson Blu", location: "Kigali Convention Centre", tier: "5-Star" },
  { name: "Kigali Marriott", location: "City Center", tier: "5-Star" },
  { name: "One&Only Gorilla's Nest", location: "Volcanoes NP", tier: "Ultra-Luxury" },
  { name: "Singita Kwitonda", location: "Volcanoes NP", tier: "Ultra-Luxury" }
];

const itineraries = [
  {
    title: "3-Day Business + Gorilla Trek",
    duration: "3 Days",
    description: "Perfect for executives combining business meetings with Rwanda's signature wildlife experience.",
    highlights: ["VIP airport transfer", "Business meeting facilities", "Gorilla trekking permit", "Luxury lodge accommodation"]
  },
  {
    title: "5-Day Rwanda Explorer",
    duration: "5 Days",
    description: "Comprehensive Rwanda experience covering Kigali, Lake Kivu, and Nyungwe Forest.",
    highlights: ["Kigali city orientation", "Lake Kivu lakeside retreat", "Nyungwe canopy walk", "Chimpanzee tracking"]
  },
  {
    title: "Weekend Conference + Safari",
    duration: "3 Days",
    description: "Combine your conference attendance with an unforgettable Akagera safari.",
    highlights: ["Conference logistics support", "Akagera National Park safari", "Big Five game drives", "Sunset boat cruise"]
  }
];

export default function ExecutiveTravelClient() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div 
        className="relative w-full h-[25vh] sm:h-[30vh] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/kivumarina.png')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">VIP Concierge</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">
            Executive Travel Rwanda
          </h1>
          <p className="text-white/75 max-w-2xl mt-2 text-xs sm:text-sm leading-relaxed">
            Luxury travel experiences for discerning travelers and corporate retreats
          </p>
          <a
            href="/contact"
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-xs"
          >
            Plan Your Journey
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Experiences */}
      <div className="bg-white py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Curated Experiences</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">Signature Experiences</h2>
            <p className="text-gray-500 text-sm mt-2">Unforgettable journeys crafted for executives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 flex gap-4"
              >
                <exp.icon className="w-6 h-6 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{exp.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hotels */}
      <div className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Accommodations</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">Luxury Accommodations</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hotels.map((hotel, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <Star className="w-5 h-5 text-[#C9A84C] mx-auto mb-2" />
                <h3 className="font-bold text-gray-900 text-sm">{hotel.name}</h3>
                <p className="text-gray-500 text-xs">{hotel.location}</p>
                <p className="text-[#C9A84C] text-xs font-medium mt-1">{hotel.tier}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sample Itineraries */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Curated Journeys</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">Sample Itineraries</h2>
            <p className="text-gray-500 text-sm mt-2">Pre-designed experiences you can customize to your schedule</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {itineraries.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C9A84C]" />
                    <span className="text-sm font-medium text-gray-600">{item.duration}</span>
                  </div>
                  <span className="text-xs text-gray-400">Contact for pricing</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>
                <ul className="space-y-2 mb-6">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-[#C9A84C]" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <a
                  href="/Reservations?tab=tourism"
                  className="block w-full text-center py-3 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors text-sm"
                >
                  Customize This Trip
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div
        className="relative w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/image/kivumarina.png')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative pt-16 pb-24 lg:pt-20 lg:pb-28">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Get Started</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Experience Rwanda?
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              From gorilla trekking to luxury retreats, we create extraordinary journeys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
              >
                <Plane className="w-4 h-4" />
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
