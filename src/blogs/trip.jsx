"use client";
import React from "react";
import { Compass, MapPin, Camera, Mountain, Palmtree, Binoculars } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const TravelTips = () => {
  const { i18n } = useTranslation();
  const L = (en, fr, ch) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const tips = [
    {
      icon: Compass,
      title: L("Best Time to Visit", "Meilleure Période pour Visiter", "最佳参观时间"),
      desc: L(
        "June to September (dry season) for gorilla trekking. December to February for general travel.",
        "Juin à septembre (saison sèche) pour le trekking des gorilles. Décembre à février pour les voyages généraux.",
        "6月至9月（旱季）适合大猩猩徒步旅行，12月至2月适合一般旅行。"
      )
    },
    {
      icon: MapPin,
      title: L("Visa Requirements", "Conditions de Visa", "签证要求"),
      desc: L(
        "Visa on arrival available for most nationalities ($50). Apply online via Rwanda Immigration portal.",
        "Visa à l'arrivée disponible pour la plupart des nationalités (50$). Faites une demande en ligne via le portail d'immigration du Rwanda.",
        "大多数国籍可落地签证（50美元）。可通过卢旺达移民门户网站在线申请。"
      )
    },
    {
      icon: Camera,
      title: L("Must-See Destinations", "Destinations Incontournables", "必游目的地"),
      desc: L(
        "Volcanoes National Park (gorillas), Nyungwe Forest (chimps), Lake Kivu, Akagera National Park.",
        "Parc National des Volcans (gorilles), Forêt de Nyungwe (chimpanzés), Lac Kivu, Parc National d'Akagera.",
        "火山国家公园（大猩猩）、纽恩维森林（黑猩猩）、基伍湖、阿卡盖拉国家公园。"
      )
    },
    {
      icon: Mountain,
      title: L("Gorilla Trekking Tips", "Conseils pour le Trekking des Gorilles", "大猩猩徒步贴士"),
      desc: L(
        "Permits cost $1,500. Book 3-6 months in advance. Prepare for hiking at altitude.",
        "Les permis coûtent 1 500$. Réservez 3 à 6 mois à l'avance. Préparez-vous à une randonnée en altitude.",
        "许可证费用1500美元。提前3-6个月预订。做好高海拔徒步的准备。"
      )
    },
    {
      icon: Palmtree,
      title: L("Cultural Etiquette", "Étiquette Culturelle", "文化礼仪"),
      desc: L(
        "Greet with handshake. Dress modestly. Ask before photographing people. Umuganda (community work) is sacred.",
        "Saluez avec une poignée de main. Habillez-vous modestement. Demandez avant de photographier des personnes. L'Umuganda (travail communautaire) est sacré.",
        "握手致意，着装得体，拍照前需征得同意。乌姆甘达（社区劳动日）是神圣的。"
      )
    },
    {
      icon: Binoculars,
      title: L("Wildlife Safari", "Safari Animalier", "野生动物园"),
      desc: L(
        "Akagera offers Big 5 safaris. Best visited May-September. Combine with gorilla trekking.",
        "Akagera propose des safaris Big 5. La meilleure période est mai-septembre. Combinez avec le trekking des gorilles.",
        "阿卡盖拉提供非洲五大动物园之旅，最佳参观时间为5月至9月，可与大猩猩徒步结合。"
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
          {L("Travel Guide", "Guide de Voyage", "旅行指南")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
          {L("Essential Rwanda Travel Tips", "Conseils Essentiels pour Voyager au Rwanda", "卢旺达旅行必备贴士")}
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          {L(
            "Everything you need to know for an unforgettable journey to the Land of a Thousand Hills",
            "Tout ce que vous devez savoir pour un voyage inoubliable au Pays des Mille Collines",
            "前往千丘之国的难忘旅程，您需要了解的一切"
          )}
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
          {L("Book Your Rwanda Adventure", "Réservez Votre Aventure au Rwanda", "预订您的卢旺达冒险之旅")}
        </Link>
      </div>
    </div>
  );
};

export default TravelTips;
