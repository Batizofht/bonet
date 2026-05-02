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
    price: "From $2,500",
    description: "Perfect for executives combining business meetings with Rwanda's signature wildlife experience.",
    highlights: ["VIP airport transfer", "Business meeting facilities", "Gorilla trekking permit", "Luxury lodge accommodation"]
  },
  {
    title: "5-Day Rwanda Explorer",
    duration: "5 Days",
    price: "From $4,200",
    description: "Comprehensive Rwanda experience covering Kigali, Lake Kivu, and Nyungwe Forest.",
    highlights: ["Kigali city orientation", "Lake Kivu lakeside retreat", "Nyungwe canopy walk", "Chimpanzee tracking"]
  },
  {
    title: "Weekend Conference + Safari",
    duration: "3 Days",
    price: "From $1,800",
    description: "Combine your conference attendance with an unforgettable Akagera safari.",
    highlights: ["Conference logistics support", "Akagera National Park safari", "Big Five game drives", "Sunset boat cruise"]
  }
];

export default function ExecutiveTravelClient() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div 
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/image/kivumarina.png')" }}
      >
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center px-4">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-4">
            VIP Concierge
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
            Executive <span className="text-[#C9A84C]">Travel</span> Rwanda
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mb-8">
            Luxury travel experiences for discerning travelers and corporate retreats
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
          >
            Plan Your Journey
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Experiences */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Signature <span className="text-[#C9A84C]">Experiences</span>
          </h2>
          <p className="text-gray-600">Unforgettable journeys crafted for executives</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 flex gap-4"
            >
              <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <exp.icon className="w-6 h-6 text-[#C9A84C]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{exp.title}</h3>
                <p className="text-gray-600 text-sm">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hotels */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Luxury <span className="text-[#C9A84C]">Accommodations</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hotels.map((hotel, index) => (
            <div key={index} className="bg-white rounded-xl p-4 text-center">
              <Star className="w-6 h-6 text-[#C9A84C] mx-auto mb-2" />
              <h3 className="font-bold text-gray-900 text-sm">{hotel.name}</h3>
              <p className="text-gray-500 text-xs">{hotel.location}</p>
              <p className="text-[#C9A84C] text-xs font-medium mt-1">{hotel.tier}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Itineraries */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
              Curated Journeys
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              Sample <span className="text-[#C9A84C]">Itineraries</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pre-designed experiences you can customize to your schedule
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {itineraries.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-[#C9A84C]" />
                  <span className="text-sm font-medium text-gray-600">{item.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-[#C9A84C] font-semibold mb-4">{item.price}</p>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <ul className="space-y-2 mb-6">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-[#C9A84C]" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="block w-full text-center py-3 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
                >
                  Customize This Trip
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Rwanda?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            From gorilla trekking to luxury retreats, we create extraordinary journeys.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
            >
              <Plane className="w-5 h-5" />
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
