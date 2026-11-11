"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import BookingCards from "./CardHome";

export default function FirstHome() {
  const { t } = useTranslation();

  const stats = [
    { value: "5+", label: t("home.stat_years") },
    { value: "100+", label: t("home.stat_clients") },
    { value: "15+", label: t("home.stat_countries") },
    { value: "24/7", label: t("home.stat_support") },
  ];

  return (
    <>
      <section className="relative isolate flex min-h-[600px] items-center overflow-hidden bg-ink-950 text-white md:min-h-[660px]">
        <Image
          src="/assets/photos/kcc-aerial.jpg"
          alt="Kigali Convention Centre and the Kigali skyline, Rwanda"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={75}
          className="-z-20 object-cover object-[65%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,16,29,0.96)_0%,rgba(7,16,29,0.86)_40%,rgba(7,16,29,0.4)_75%,rgba(7,16,29,0.25)_100%)]" />

        <div className="container-x py-20">
          <div className="max-w-[680px]">
            <p className="eyebrow eyebrow-light">{t("home.hero_tagline")}</p>
            <h1 className="h-display mt-4 !text-white text-[2.3rem] sm:text-[2.9rem] lg:text-[3.4rem]">
              {t("home.hero_title")} {t("home.hero_title_accent")}
            </h1>
            <p className="mt-6 text-[1.08rem] leading-relaxed text-white/80 md:text-[1.15rem]">{t("home.hero_desc1")}</p>
            <p className="mt-2 text-[15px] text-white/60">{t("home.hero_desc2")}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-gold btn-lg">
                {t("get_started")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="btn btn-ghost-light btn-lg">{t("home.explore_services")}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Facts strip */}
      <div className="border-b border-white/[0.06] bg-ink-900">
        <div className="container-x grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className={`py-6 md:py-7 ${i > 0 ? "md:border-l md:border-white/10 md:pl-8" : ""} ${i % 2 === 1 ? "border-l border-white/10 pl-6" : ""} ${i >= 2 ? "border-t border-white/10 md:border-t-0" : ""}`}>
              <div className="font-display text-[1.75rem] font-semibold leading-none text-white">{s.value}</div>
              <div className="mt-2 text-[12px] font-medium uppercase tracking-[0.12em] text-white/55">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <BookingCards />
    </>
  );
}
