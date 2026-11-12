"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Home, Car, GraduationCap, Landmark, MapPin, Briefcase, Shield, Clock, Users } from "lucide-react";
import { PageHero, Section, SectionHeader, StatStrip, FeatureCard, CtaBand, ButtonLink, WhatsAppButton } from "@/components/ui/kit";

export default function RelocationServicesClient() {
  const { i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const services = [
    { icon: Home, title: L("Executive Housing", "Logement pour cadres", "高管住房"), description: L("Premium apartments and villas in Kigali's best neighborhoods", "Appartements et villas haut de gamme dans les meilleurs quartiers de Kigali", "基加利最佳社区的高端公寓和别墅") },
    { icon: GraduationCap, title: L("School Search", "Recherche d'école", "学校搜索"), description: L("International school placement for your children", "Placement dans des écoles internationales pour vos enfants", "为您的孩子在国际学校安排入学") },
    { icon: Landmark, title: L("Banking Setup", "Mise en place bancaire", "银行开户"), description: L("Corporate and personal bank account opening", "Ouverture de comptes bancaires professionnels et personnels", "企业和个人银行账户开设") },
    { icon: Car, title: L("Transport & Logistics", "Transport et logistique", "交通与物流"), description: L("Vehicle purchase, leasing, and driver services", "Achat, location de véhicules et services de chauffeur", "车辆购买、租赁及司机服务") },
  ];

  const neighborhoods = [
    { name: "Kacyiru", type: L("Government District", "Quartier administratif", "行政区"), price: "RWF 1.5M–3M/mo", image: "/assets/photos/kacyiru.jpg" },
    { name: "Kimihurura", type: L("Expat Hub", "Quartier des expatriés", "外籍人士聚居地"), price: "RWF 800K–1.5M/mo", image: "/image/amazing.jpg" },
    { name: "Nyarutarama", type: L("Residential", "Résidentiel", "住宅区"), price: "RWF 3M–8M/mo", image: "/assets/photos/kigali-golf.jpg" },
    { name: "Kimironko", type: L("Family-Friendly", "Adapté aux familles", "适合家庭"), price: "RWF 600K–1.2M/mo", image: "/assets/photos/kigali-street.jpg" },
  ];

  const steps = [
    { title: L("Pre-Arrival", "Pré-arrivée", "抵达前"), desc: L("Virtual property tours and documentation prep", "Visites virtuelles de propriétés et préparation des documents", "线上房产参观和文件准备") },
    { title: L("Arrival", "Arrivée", "抵达"), desc: L("Airport pickup and temporary accommodation", "Transfert aéroport et hébergement temporaire", "机场接机和临时住宿") },
    { title: L("Settlement", "Installation", "安置"), desc: L("Housing, banking, and school registration", "Logement, banque et inscription scolaire", "住房、银行及学校注册") },
    { title: L("Integration", "Intégration", "融入"), desc: L("Local orientation and ongoing support", "Orientation locale et soutien continu", "本地定向和持续支持") },
  ];

  const why = [
    { icon: Shield, title: L("Trusted Partners", "Partenaires de confiance", "值得信赖的合作伙伴"), desc: L("Exclusive network of vetted service providers", "Réseau exclusif de prestataires vérifiés", "经过筛选的服务提供商专属网络") },
    { icon: Clock, title: L("Fast Setup", "Installation rapide", "快速安置"), desc: L("Most clients fully settled within 2 weeks", "La plupart des clients sont installés en 2 semaines", "大多数客户在2周内完成安置") },
    { icon: Briefcase, title: L("Corporate Focus", "Orientation entreprise", "企业导向"), desc: L("Designed for executives and business needs", "Conçu pour les cadres et les besoins professionnels", "专为高管和商业需求而设计") },
    { icon: Users, title: L("Family Support", "Soutien à la famille", "家庭支持"), desc: L("Spouse and children relocation assistance", "Aide à la relocalisation du conjoint et des enfants", "配偶和子女搬迁协助") },
  ];

  return (
    <>
      <PageHero
        image="/assets/photos/kigali-golf.jpg"
        imageAlt="Green residential hills around Kigali Golf Club, Nyarutarama"
        eyebrow={L("Executive Concierge", "Service de conciergerie exécutif", "高管礼宾服务")}
        title={L("Relocate to Rwanda Stress-Free", "Déménagez au Rwanda sans stress", "无忧搬迁至卢旺达")}
        lead={L("Premium relocation services for executives and families moving to Rwanda", "Services de relocalisation haut de gamme pour les cadres et les familles qui s'installent au Rwanda", "为搬迁至卢旺达的高管和家庭提供高端搬迁服务")}
        crumbs={[
          { name: L("Home", "Accueil", "首页"), href: "/" },
          { name: L("Services", "Services", "服务"), href: "/services" },
          { name: L("Relocation", "Relocalisation", "搬迁") },
        ]}
        actions={
          <>
            <ButtonLink href="/contact" size="lg">{L("Start Your Relocation", "Commencer votre relocalisation", "开始您的搬迁")}</ButtonLink>
            <WhatsAppButton variant="ghost-light" className="btn-lg">WhatsApp</WhatsAppButton>
          </>
        }
      />

      <Section tone="ivory" tight>
        <StatStrip
          stats={[
            { value: "500+", label: L("Families Relocated", "Familles relogées", "已搬迁家庭") },
            { value: "2", label: L("Weeks Average Setup", "Semaines d'installation", "平均安置周数") },
            { value: "98%", label: L("Client Satisfaction", "Satisfaction client", "客户满意度") },
            { value: "24/7", label: L("Support Available", "Assistance disponible", "全天候支持") },
          ]}
        />
      </Section>

      <Section>
        <SectionHeader
          eyebrow={L("Services", "Services", "服务")}
          title={L("Our Relocation Services", "Nos services de relocalisation", "我们的搬迁服务")}
          lead={L("Everything you need for a smooth transition", "Tout ce qu'il vous faut pour une transition en douceur", "顺畅过渡所需的一切")}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <FeatureCard key={i} icon={<s.icon className="h-5 w-5" />} title={s.title}>{s.description}</FeatureCard>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <SectionHeader
          light
          eyebrow={L("Process", "Processus", "流程")}
          title={L("Your Relocation Journey", "Votre parcours de relocalisation", "您的搬迁历程")}
          lead={L("A seamless 4-step process designed for busy executives", "Un processus en 4 étapes conçu pour les cadres occupés", "专为繁忙高管设计的4步无缝流程")}
        />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map((s, i) => (
            <li key={i} className="lg:pr-7 [&+li]:lg:border-l [&+li]:lg:border-white/10 [&+li]:lg:pl-7">
              <span className="flex items-center gap-3 font-display text-[14px] font-semibold text-gold-500">
                {String(i + 1).padStart(2, "0")}
                <span className="h-px flex-1 bg-white/15" />
              </span>
              <h3 className="mt-5 text-[1.05rem] font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">{s.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeader
          eyebrow={L("Locations", "Emplacements", "地段")}
          title={L("Popular Neighborhoods", "Quartiers populaires", "热门社区")}
          lead={L("Kigali's finest residential areas for expats", "Les meilleurs quartiers résidentiels de Kigali pour les expatriés", "基加利为外籍人士提供的最佳住宅区")}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {neighborhoods.map((n) => (
            <div key={n.name} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-sand">
                <Image src={n.image} alt={`Residential property in Kigali — ${n.name} area`} fill sizes="(min-width: 1024px) 290px, 50vw" className="object-cover" />
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-gold-700"><MapPin className="h-3.5 w-3.5" />{n.type}</p>
              <h3 className="mt-1 text-[1.1rem] font-semibold text-ink-900">{n.name}</h3>
              <p className="text-[14px] font-medium text-gold-700">{n.price}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <SectionHeader
          eyebrow={L("Why Us", "Pourquoi nous", "为什么选择我们")}
          title={L("Why Choose Bonet Elite", "Pourquoi choisir Bonet Elite", "为什么选择Bonet Elite")}
          lead={L("What makes us the preferred relocation partner", "Ce qui fait de nous le partenaire de relocalisation préféré", "是什么让我们成为首选的搬迁合作伙伴")}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (
            <FeatureCard key={i} icon={<w.icon className="h-5 w-5" />} title={w.title}>{w.desc}</FeatureCard>
          ))}
        </div>
      </Section>

      <CtaBand
        image="/image/5.jpg"
        eyebrow={L("Get Started", "Commencez", "开始")}
        title={L("Moving to Rwanda?", "Vous déménagez au Rwanda ?", "要搬迁到卢旺达？")}
        lead={L("Let us handle the logistics while you focus on your business.", "Laissez-nous gérer la logistique pendant que vous vous concentrez sur votre activité.", "让我们处理物流，您专注于您的业务。")}
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
