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

export default function ExecutiveTravelClient() {
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const experiences = [
    {
      icon: Binoculars,
      title: L("Gorilla Trekking","Trekking des gorilles","大猩猩徒步"),
      description: L("Exclusive mountain gorilla encounters in Volcanoes National Park","Rencontres exclusives avec les gorilles de montagne dans le Parc des Volcans","火山国家公园独家山地大猩猩邂逅")
    },
    {
      icon: Palmtree,
      title: L("Lake Kivu Retreat","Retraite au Lac Kivu","基伍湖度假"),
      description: L("Private beachfront resorts and water sports","Stations balnéaires privées et sports nautiques","私人海滨度假村和水上运动")
    },
    {
      icon: Crown,
      title: L("Private Safari","Safari privé","私人狩猎"),
      description: L("Big Five game drives in Akagera National Park","Safaris des Big Five dans le Parc national de l'Akagera","阿卡盖拉国家公园五大猎物游猎")
    },
    {
      icon: MapPin,
      title: L("Kigali City Tour","Visite de Kigali","基加利城市游"),
      description: L("Cultural experiences and premium dining","Expériences culturelles et gastronomie haut de gamme","文化体验与高端餐饮")
    }
  ];

  const hotels = [
    { name: "Radisson Blu", location: L("Kigali Convention Centre","Centre de conférences de Kigali","基加利会议中心"), tier: "5-Star" },
    { name: "Kigali Marriott", location: L("City Center","Centre-ville","市中心"), tier: "5-Star" },
    { name: "One&Only Gorilla's Nest", location: L("Volcanoes NP","Parc des Volcans","火山国家公园"), tier: "Ultra-Luxury" },
    { name: "Singita Kwitonda", location: L("Volcanoes NP","Parc des Volcans","火山国家公园"), tier: "Ultra-Luxury" }
  ];

  const itineraries = [
    {
      title: L("3-Day Business + Gorilla Trek","3 jours : Affaires + Trekking","3天商务+大猩猩徒步"),
      duration: L("3 Days","3 jours","3天"),
      description: L("Perfect for executives combining business meetings with Rwanda's signature wildlife experience.","Idéal pour les cadres combinant réunions d'affaires et expérience animalière emblématique du Rwanda.","适合将商务会议与卢旺达标志性野生动物体验相结合的高管。"),
      highlights: [
        L("VIP airport transfer","Transfert aéroport VIP","VIP机场接送"),
        L("Business meeting facilities","Salles de réunion professionnelles","商务会议设施"),
        L("Gorilla trekking permit","Permis de trekking des gorilles","大猩猩徒步许可"),
        L("Luxury lodge accommodation","Hébergement en lodge de luxe","豪华住所")
      ]
    },
    {
      title: L("5-Day Rwanda Explorer","5 jours : Exploration du Rwanda","5天卢旺达探索"),
      duration: L("5 Days","5 jours","5天"),
      description: L("Comprehensive Rwanda experience covering Kigali, Lake Kivu, and Nyungwe Forest.","Expérience complète du Rwanda couvrant Kigali, le Lac Kivu et la Forêt de Nyungwe.","覆盖基加利、基伍湖和尼永圭森林的全面卢旺达体验。"),
      highlights: [
        L("Kigali city orientation","Orientation dans la ville de Kigali","基加利城市导览"),
        L("Lake Kivu lakeside retreat","Retraite au bord du Lac Kivu","基伍湖畔度假"),
        L("Nyungwe canopy walk","Promenade dans la canopée de Nyungwe","尼永圭树冠步道"),
        L("Chimpanzee tracking","Pistage des chimpanzés","黑猩猩追踪")
      ]
    },
    {
      title: L("Weekend Conference + Safari","Week-end : Conférence + Safari","周末会议+狩猎"),
      duration: L("3 Days","3 jours","3天"),
      description: L("Combine your conference attendance with an unforgettable Akagera safari.","Combinez votre participation à une conférence avec un inoubliable safari à l'Akagera.","将会议出席与难忘的阿卡盖拉狩猎相结合。"),
      highlights: [
        L("Conference logistics support","Soutien logistique pour la conférence","会议物流支持"),
        L("Akagera National Park safari","Safari dans le Parc national de l'Akagera","阿卡盖拉国家公园狩猎"),
        L("Big Five game drives","Safaris des Big Five","五大猎物游猎"),
        L("Sunset boat cruise","Croisière au coucher du soleil","日落游船")
      ]
    }
  ];

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
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("VIP Concierge","Service VIP","VIP礼宾服务")}</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">
            {L("Executive Travel Rwanda","Voyages d'affaires au Rwanda","卢旺达高管旅行")}
          </h1>
          <p className="text-white/75 max-w-2xl mt-2 text-xs sm:text-sm leading-relaxed">
            {L("Luxury travel experiences for discerning travelers and corporate retreats","Expériences de voyage de luxe pour les voyageurs exigeants et les séminaires d'entreprise","为挑剔旅行者和企业团建提供豪华旅行体验")}
          </p>
          <a
            href="/contact"
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-xs"
          >
            {L("Plan Your Journey","Planifier votre voyage","规划您的旅程")}
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Experiences */}
      <div className="bg-white py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("Curated Experiences","Expériences sur mesure","精选体验")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">{L("Signature Experiences","Expériences phares","标志性体验")}</h2>
            <p className="text-gray-500 text-sm mt-2">{L("Unforgettable journeys crafted for executives","Des voyages inoubliables conçus pour les cadres","专为高管打造的难忘旅程")}</p>
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
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("Accommodations","Hébergements","住宿")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">{L("Luxury Accommodations","Hébergements de luxe","豪华住宿")}</h2>
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
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("Curated Journeys","Voyages sur mesure","精选行程")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">{L("Sample Itineraries","Exemples d'itinéraires","行程示例")}</h2>
            <p className="text-gray-500 text-sm mt-2">{L("Pre-designed experiences you can customize to your schedule","Des expériences prédéfinies que vous pouvez adapter à votre emploi du temps","可根据您的日程定制的预设体验")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {itineraries.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C9A84C]" />
                    <span className="text-sm font-medium text-gray-600">{item.duration}</span>
                  </div>
                  <span className="text-xs text-gray-400">{L("Contact for pricing","Contactez-nous pour les tarifs","联系我们了解价格")}</span>
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
                  {L("Customize This Trip","Personnaliser ce voyage","定制此行程")}
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
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("Get Started","Commencez","开始")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {L("Ready to Experience Rwanda?","Prêt à découvrir le Rwanda ?","准备好体验卢旺达了吗？")}
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              {L("From gorilla trekking to luxury retreats, we create extraordinary journeys.","Du trekking des gorilles aux retraites de luxe, nous créons des voyages extraordinaires.","从大猩猩徒步到豪华度假，我们打造非凡旅程。")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
              >
                <Plane className="w-4 h-4" />
                {L("Book Free Consultation","Réserver une consultation gratuite","预约免费咨询")}
              </a>
              <a
                href="https://wa.me/250726300260"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                {L("WhatsApp Us","Écrivez-nous sur WhatsApp","WhatsApp联系")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
