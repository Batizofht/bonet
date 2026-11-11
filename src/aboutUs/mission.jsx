"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Compass, Target } from "lucide-react";
import { StatStrip } from "@/components/ui/kit";

const MissionVisionComponent = () => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);

  const stats = [
    { value: "5+", label: L("Years Experience", "Années d'Expérience", "年经验") },
    { value: "100+", label: L("Foreign Clients", "Clients Étrangers", "外国客户") },
    { value: "15+", label: L("Countries", "Pays", "国家") },
    { value: "24/7", label: L("WhatsApp Support", "Support WhatsApp", "WhatsApp支持") },
  ];

  return (
    <>
      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow">{L("Our Story", "Notre Histoire", "我们的故事")}</p>
            <h2 className="h-display mt-3 text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">
              {L(
                "The team foreign investors call first when entering Rwanda.",
                "L'équipe que les investisseurs étrangers appellent en premier lorsqu'ils entrent au Rwanda.",
                "外国投资者进入卢旺达时首先联系的团队。"
              )}
            </h2>
            <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-ink-600">
              <p>
                {L(
                  "Five years, 100+ clients across 15+ countries — registration, investment advisory, HR, relocation, and executive travel under one roof. We help foreign investors and executives build businesses and lives in Rwanda from company registration and tax incentives to relocation and executive travel.",
                  "Cinq ans, plus de 100 clients dans plus de 15 pays — enregistrement, conseil en investissement, RH, relocalisation et voyages d'affaires sous un même toit. Nous aidons les investisseurs étrangers et les cadres à construire des entreprises et des vies au Rwanda, de l'enregistrement des sociétés et des incitations fiscales à la relocalisation et aux voyages d'affaires.",
                  "五年来，服务来自15个以上国家的100多位客户——注册、投资咨询、人力资源、搬迁和高管出行，一站式服务。我们帮助外国投资者和高管在卢旺达建立企业和生活，从公司注册、税收优惠到搬迁和高管差旅。"
                )}
              </p>
              <p>
                {L(
                  "We are a premier service provider dedicated to delivering exceptional experiences through innovative solutions and unwavering commitment to excellence.",
                  "Nous sommes un prestataire de services de premier plan dédié à offrir des expériences exceptionnelles grâce à des solutions innovantes et un engagement indéfectible envers l'excellence.",
                  "我们是一流的服务提供商，致力于通过创新解决方案和对卓越的坚定承诺提供出色的体验。"
                )}
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] lg:aspect-auto">
            <Image src="/assets/images/cert.jpg" alt="Kigali Convention Centre, Rwanda" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="container-x mt-20">
          <StatStrip stats={stats} />
        </div>
      </section>

      <section className="bg-ink-pattern py-20 text-white md:py-28">
        <div className="container-x">
          <div className="mb-12 max-w-3xl md:mb-16">
            <p className="eyebrow eyebrow-light">{L("Direction", "Direction", "方向")}</p>
            <h2 className="h-display mt-3 !text-white text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">{L("Vision & Mission", "Vision et Mission", "愿景与使命")}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { icon: Compass, title: t("vision.visionTitle"), text: t("vision.visionText") },
              { icon: Target, title: t("vision.missionTitle"), text: t("vision.missionText") },
            ].map((b) => (
              <div key={b.title} className="rounded-[10px] border border-white/10 p-8 md:p-9">
                <b.icon className="h-6 w-6 text-gold-500" />
                <h3 className="mt-5 text-[1.3rem] font-semibold text-white">{b.title}</h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-white/70">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default MissionVisionComponent;
