"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Binoculars, Palmtree, Crown, MapPin, Calendar, ArrowRight } from "lucide-react";
import { PageHero, Section, SectionHeader, CtaBand, ButtonLink, WhatsAppButton } from "@/components/ui/kit";
import HotelHospitality from "@/services/hotel";

export default function ExecutiveTravelClient() {
  const { i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const experiences = [
    { icon: Binoculars, image: "/assets/photos/gorilla.jpg", title: L("Gorilla Trekking", "Trekking des gorilles", "大猩猩徒步"), description: L("Exclusive mountain gorilla encounters in Volcanoes National Park", "Rencontres exclusives avec les gorilles de montagne dans le Parc des Volcans", "火山国家公园独家山地大猩猩邂逅") },
    { icon: Palmtree, image: "/assets/photos/kivu.jpg", title: L("Lake Kivu Retreat", "Retraite au Lac Kivu", "基伍湖度假"), description: L("Private beachfront resorts and water sports", "Stations balnéaires privées et sports nautiques", "私人海滨度假村和水上运动") },
    { icon: Crown, image: "/assets/photos/akagera.jpg", title: L("Private Safari", "Safari privé", "私人狩猎"), description: L("Big Five game drives in Akagera National Park", "Safaris des Big Five dans le Parc national de l'Akagera", "阿卡盖拉国家公园五大猎物游猎") },
    { icon: MapPin, image: "/assets/images/kiga1.jpeg", title: L("Kigali City Tour", "Visite de Kigali", "基加利城市游"), description: L("Cultural experiences and premium dining", "Expériences culturelles et gastronomie haut de gamme", "文化体验与高端餐饮") },
  ];

  const hotels = [
    { name: "Radisson Blu", location: L("Kigali Convention Centre", "Centre de conférences de Kigali", "基加利会议中心"), tier: "5-Star" },
    { name: "Kigali Marriott", location: L("City Center", "Centre-ville", "市中心"), tier: "5-Star" },
    { name: "One&Only Gorilla's Nest", location: L("Volcanoes NP", "Parc des Volcans", "火山国家公园"), tier: "Ultra-Luxury" },
    { name: "Singita Kwitonda", location: L("Volcanoes NP", "Parc des Volcans", "火山国家公园"), tier: "Ultra-Luxury" },
  ];

  const itineraries = [
    {
      title: L("3-Day Business + Gorilla Trek", "3 jours : Affaires + Trekking", "3天商务+大猩猩徒步"),
      duration: L("3 Days", "3 jours", "3天"),
      description: L("Perfect for executives combining business meetings with Rwanda's signature wildlife experience.", "Idéal pour les cadres combinant réunions d'affaires et expérience animalière emblématique du Rwanda.", "适合将商务会议与卢旺达标志性野生动物体验相结合的高管。"),
      highlights: [L("VIP airport transfer", "Transfert aéroport VIP", "VIP机场接送"), L("Business meeting facilities", "Salles de réunion professionnelles", "商务会议设施"), L("Gorilla trekking permit", "Permis de trekking des gorilles", "大猩猩徒步许可"), L("Luxury lodge accommodation", "Hébergement en lodge de luxe", "豪华住所")],
    },
    {
      title: L("5-Day Rwanda Explorer", "5 jours : Exploration du Rwanda", "5天卢旺达探索"),
      duration: L("5 Days", "5 jours", "5天"),
      description: L("Comprehensive Rwanda experience covering Kigali, Lake Kivu, and Nyungwe Forest.", "Expérience complète du Rwanda couvrant Kigali, le Lac Kivu et la Forêt de Nyungwe.", "覆盖基加利、基伍湖和尼永圭森林的全面卢旺达体验。"),
      highlights: [L("Kigali city orientation", "Orientation dans la ville de Kigali", "基加利城市导览"), L("Lake Kivu lakeside retreat", "Retraite au bord du Lac Kivu", "基伍湖畔度假"), L("Nyungwe canopy walk", "Promenade dans la canopée de Nyungwe", "尼永圭树冠步道"), L("Chimpanzee tracking", "Pistage des chimpanzés", "黑猩猩追踪")],
    },
    {
      title: L("Weekend Conference + Safari", "Week-end : Conférence + Safari", "周末会议+狩猎"),
      duration: L("3 Days", "3 jours", "3天"),
      description: L("Combine your conference attendance with an unforgettable Akagera safari.", "Combinez votre participation à une conférence avec un inoubliable safari à l'Akagera.", "将会议出席与难忘的阿卡盖拉狩猎相结合。"),
      highlights: [L("Conference logistics support", "Soutien logistique pour la conférence", "会议物流支持"), L("Akagera National Park safari", "Safari dans le Parc national de l'Akagera", "阿卡盖拉国家公园狩猎"), L("Big Five game drives", "Safaris des Big Five", "五大猎物游猎"), L("Sunset boat cruise", "Croisière au coucher du soleil", "日落游船")],
    },
  ];

  return (
    <>
      <PageHero
        image="/assets/photos/kivu-hill.jpg"
        imageAlt="Lake Kivu seen from the hills, Rwanda"
        eyebrow={L("VIP Concierge", "Service VIP", "VIP礼宾服务")}
        title={L("Executive Travel Rwanda", "Voyages d'affaires au Rwanda", "卢旺达高管旅行")}
        lead={L("Luxury travel experiences for discerning travelers and corporate retreats", "Expériences de voyage de luxe pour les voyageurs exigeants et les séminaires d'entreprise", "为挑剔旅行者和企业团建提供豪华旅行体验")}
        crumbs={[
          { name: L("Home", "Accueil", "首页"), href: "/" },
          { name: L("Services", "Services", "服务"), href: "/services" },
          { name: L("Executive Travel", "Voyages d'affaires", "高管出行") },
        ]}
        actions={
          <>
            <ButtonLink href="/contact" size="lg">{L("Plan Your Journey", "Planifier votre voyage", "规划您的旅程")}</ButtonLink>
            <WhatsAppButton variant="ghost-light" className="btn-lg">WhatsApp</WhatsAppButton>
          </>
        }
      />

      <Section>
        <SectionHeader
          eyebrow={L("Curated Experiences", "Expériences sur mesure", "精选体验")}
          title={L("Signature Experiences", "Expériences phares", "标志性体验")}
          lead={L("Unforgettable journeys crafted for executives", "Des voyages inoubliables conçus pour les cadres", "专为高管打造的难忘旅程")}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((e) => (
            <article key={e.title} className="card flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] bg-sand">
                <Image src={e.image} alt={e.title} fill sizes="(min-width: 1024px) 290px, 50vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="flex items-center gap-2.5 text-[1.05rem] font-semibold text-ink-900"><e.icon className="h-5 w-5 text-gold-600" />{e.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{e.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Hotels, transfers, guides and VIP services (formerly the separate /travel page) */}
      <HotelHospitality />

      <Section tone="ivory">
        <SectionHeader
          eyebrow={L("Curated Journeys", "Voyages sur mesure", "精选行程")}
          title={L("Sample Itineraries", "Exemples d'itinéraires", "行程示例")}
          lead={L("Pre-designed experiences you can customize to your schedule", "Des expériences prédéfinies que vous pouvez adapter à votre emploi du temps", "可根据您的日程定制的预设体验")}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {itineraries.map((it) => (
            <div key={it.title} className="card flex flex-col p-8">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-gold-700">
                  <Calendar className="h-3.5 w-3.5" />{it.duration}
                </span>
                <span className="text-[12px] text-ink-400">{L("Contact for pricing", "Contactez-nous pour les tarifs", "联系我们了解价格")}</span>
              </div>
              <h3 className="mt-4 text-[1.2rem] font-semibold leading-snug text-ink-900">{it.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{it.description}</p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                {it.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[15px] text-ink-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500" />{h}
                  </li>
                ))}
              </ul>
              <Link href="/Reservations?tab=tourism" className="btn btn-ink mt-8 w-full">
                {L("Customize This Trip", "Personnaliser ce voyage", "定制此行程")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow={L("Accommodations", "Hébergements", "住宿")} title={L("Luxury Accommodations", "Hébergements de luxe", "豪华住宿")} />
        <div className="hairline-grid sm:grid-cols-2 lg:grid-cols-4">
          {hotels.map((h) => (
            <div key={h.name} className="p-7">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-700">{h.tier}</p>
              <p className="mt-2 text-[1.08rem] font-semibold text-ink-900">{h.name}</p>
              <p className="mt-1 text-[14px] text-ink-500">{h.location}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        image="/image/kivumarina.png"
        eyebrow={L("Get Started", "Commencez", "开始")}
        title={L("Ready to Experience Rwanda?", "Prêt à découvrir le Rwanda ?", "准备好体验卢旺达了吗？")}
        lead={L("From gorilla trekking to luxury retreats, we create extraordinary journeys.", "Du trekking des gorilles aux retraites de luxe, nous créons des voyages extraordinaires.", "从大猩猩徒步到豪华度假，我们打造非凡旅程。")}
        actions={
          <>
            <ButtonLink href="/contact" size="lg">{L("Book Free Consultation", "Réserver une consultation gratuite", "预约免费咨询")}</ButtonLink>
            <WhatsAppButton variant="ghost-light" className="btn-lg">WhatsApp</WhatsAppButton>
          </>
        }
      />
    </>
  );
}
