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

export default function RelocationServicesClient() {
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const services = [
    {
      icon: Home,
      title: L("Executive Housing","Logement pour cadres","高管住房"),
      description: L("Premium apartments and villas in Kigali's best neighborhoods","Appartements et villas haut de gamme dans les meilleurs quartiers de Kigali","基加利最佳社区的高端公寓和别墅")
    },
    {
      icon: GraduationCap,
      title: L("School Search","Recherche d'école","学校搜索"),
      description: L("International school placement for your children","Placement dans des écoles internationales pour vos enfants","为您的孩子在国际学校安排入学")
    },
    {
      icon: Landmark,
      title: L("Banking Setup","Mise en place bancaire","银行开户"),
      description: L("Corporate and personal bank account opening","Ouverture de comptes bancaires professionnels et personnels","企业和个人银行账户开设")
    },
    {
      icon: Car,
      title: L("Transport & Logistics","Transport et logistique","交通与物流"),
      description: L("Vehicle purchase, leasing, and driver services","Achat, location de véhicules et services de chauffeur","车辆购买、租赁及司机服务")
    }
  ];

  const neighborhoods = [
    { name: "Kacyiru", type: L("Diplomatic Zone","Zone diplomatique","外交区"), price: "RWF 1.5M-3M/mo" },
    { name: "Kimihurura", type: L("Expat Hub","Quartier des expatriés","外籍人士聚居地"), price: "RWF 800K-1.5M/mo" },
    { name: "Nyarutarama", type: L("Residential","Résidentiel","住宅区"), price: "RWF 3M-8M/mo" },
    { name: "Kimironko", type: L("Family-Friendly","Adapté aux familles","适合家庭"), price: "RWF 600K-1.2M/mo" }
  ];

  const relocationSteps = [
    { step: "1", title: L("Pre-Arrival","Pré-arrivée","抵达前"), desc: L("Virtual property tours and documentation prep","Visites virtuelles de propriétés et préparation des documents","线上房产参观和文件准备") },
    { step: "2", title: L("Arrival","Arrivée","抵达"), desc: L("Airport pickup and temporary accommodation","Transfert aéroport et hébergement temporaire","机场接机和临时住宿") },
    { step: "3", title: L("Settlement","Installation","安置"), desc: L("Housing, banking, and school registration","Logement, banque et inscription scolaire","住房、银行及学校注册") },
    { step: "4", title: L("Integration","Intégration","融入"), desc: L("Local orientation and ongoing support","Orientation locale et soutien continu","本地定向和持续支持") }
  ];

  const whyChooseUs = [
    { icon: Shield, title: L("Trusted Partners","Partenaires de confiance","值得信赖的合作伙伴"), desc: L("Exclusive network of vetted service providers","Réseau exclusif de prestataires vérifiés","经过筛选的服务提供商专属网络") },
    { icon: Clock, title: L("Fast Setup","Installation rapide","快速安置"), desc: L("Most clients fully settled within 2 weeks","La plupart des clients sont installés en 2 semaines","大多数客户在2周内完成安置") },
    { icon: Briefcase, title: L("Corporate Focus","Orientation entreprise","企业导向"), desc: L("Designed for executives and business needs","Conçu pour les cadres et les besoins professionnels","专为高管和商业需求而设计") },
    { icon: Users, title: L("Family Support","Soutien à la famille","家庭支持"), desc: L("Spouse and children relocation assistance","Aide à la relocalisation du conjoint et des enfants","配偶和子女搬迁协助") }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div
        className="relative w-full h-[25vh] sm:h-[30vh] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/5.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("Executive Concierge","Service de conciergerie exécutif","高管礼宾服务")}</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">
            {L("Relocate to Rwanda Stress-Free","Déménagez au Rwanda sans stress","无忧搬迁至卢旺达")}
          </h1>
          <p className="text-white/75 max-w-2xl mt-2 text-xs sm:text-sm leading-relaxed">
            {L("Premium relocation services for executives and families moving to Rwanda","Services de relocalisation haut de gamme pour les cadres et les familles qui s'installent au Rwanda","为搬迁至卢旺达的高管和家庭提供高端搬迁服务")}
          </p>
          <a
            href="/contact"
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-xs"
          >
            {L("Start Your Relocation","Commencer votre relocalisation","开始您的搬迁")}
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: L("Families Relocated","Familles relogées","已搬迁家庭") },
            { value: "2", label: L("Weeks Average Setup","Semaines d'installation","平均安置周数") },
            { value: "98%", label: L("Client Satisfaction","Satisfaction client","客户满意度") },
            { value: "24/7", label: L("Support Available","Assistance disponible","全天候支持") }
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
            {L("Services","Services","服务")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
            {L("Our Relocation Services","Nos services de relocalisation","我们的搬迁服务")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{L("Everything you need for a smooth transition","Tout ce qu'il vous faut pour une transition en douceur","顺畅过渡所需的一切")}</p>
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
              {L("Process","Processus","流程")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              {L("Your Relocation Journey","Votre parcours de relocalisation","您的搬迁历程")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{L("A seamless 4-step process designed for busy executives","Un processus en 4 étapes conçu pour les cadres occupés","专为繁忙高管设计的4步无缝流程")}</p>
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
              {L("Why Us","Pourquoi nous","为什么选择我们")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              {L("Why Choose Bonet Elite","Pourquoi choisir Bonet Elite","为什么选择Bonet Elite")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{L("What makes us the preferred relocation partner","Ce qui fait de nous le partenaire de relocalisation préféré","是什么让我们成为首选的搬迁合作伙伴")}</p>
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
              {L("Locations","Emplacements","地段")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              {L("Popular Neighborhoods","Quartiers populaires","热门社区")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{L("Kigali's finest residential areas for expats","Les meilleurs quartiers résidentiels de Kigali pour les expatriés","基加利为外籍人士提供的最佳住宅区")}</p>
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
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("Get Started","Commencez","开始")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {L("Moving to Rwanda?","Vous déménagez au Rwanda ?","要搬迁到卢旺达？")}
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              {L("Let us handle the logistics while you focus on your business.","Laissez-nous gérer la logistique pendant que vous vous concentrez sur votre activité.","让我们处理物流，您专注于您的业务。")}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
            >
              {L("Book Free Consultation","Réserver une consultation gratuite","预约免费咨询")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
