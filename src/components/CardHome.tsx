"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/** Homepage service overview: four full-photo cards with rounded corners */
export default function BookingCards() {
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);

  const services = [
    { title: t("services.list.0.title"), description: t("heroServices.investment_desc"), image: "/assets/images/rdb2.jpg", alt: "Rwanda Development Board building in Kigali", route: "/investment" },
    { title: t("service.consulting.title"), description: t("home.consult_desc"), image: "/assets/images/s1.jpeg", alt: "Consulting meeting with a client team", route: "/consulting" },
    { title: t("menu.hrAndAdminSupport"), description: t("heroServices.hr_desc"), image: "/assets/images/s3.jpeg", alt: "Team training session", route: "/hr-recruitment" },
    { title: t("menu.travelAndHospitality"), description: t("home.travel_desc"), image: "/assets/images/hot.jpg", alt: "Hotel in Kigali at dusk", route: "/executive-travel" },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{L("What we do", "Ce que nous faisons", "我们的服务")}</p>
            <h2 className="h-display mt-3 text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">
              {L("Four services, one team that carries your project from start to finish", "Quatre services, une seule équipe du début à la fin", "四项服务，一个团队全程负责")}
            </h2>
          </div>
          <Link href="/services" className="link-arrow shrink-0">
            {t("home.explore_services")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.route}
              href={s.route}
              className="group relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[18px] p-7 text-white"
            >
              <Image src={s.image} alt={s.alt} fill sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw" className="-z-20 object-cover" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/5" />
              <span className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <h3 className="text-[1.3rem] font-semibold leading-snug text-white">{s.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/75 line-clamp-4">{s.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-display text-[13.5px] font-semibold text-gold-400">
                {t("heroServices.learn_more")}
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
