'use client'
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const galleryImages = [
  { src: "../assets/images/conv.jpg", key: 0 },
  { src: "../assets/images/k2.webp", key: 1 },
  { src: "../assets/images/memo.jpg", key: 2 },
  { src: "../assets/images/k3.jpg", key: 3 },
  { src: "../assets/images/kiv.jpg", key: 4 },
  { src: "../assets/images/vov.jpg", key: 5 },
  { src: "../assets/images/part1.jpg", key: 6 },
  { src: "../assets/images/tea.webp", key: 7 },
  { src: "../assets/images/nyu5.jpg", key: 8 },
  { src: "../assets/images/gis3.jpg", key: 9 },
  { src: "../assets/images/huye.JPG", key: 10 },
  { src: "../assets/images/muhazi.jpg", key: 11 },
];

export default function ExploreRwandaClient() {
  const { t } = useTranslation();

  const sectors = t("exploreRwanda.sectors", { returnObjects: true }) as { name: string; desc: string }[];
  const living = t("exploreRwanda.living", { returnObjects: true }) as { title: string; desc: string }[];
  const galleryTitles = t("exploreRwanda.gallery_images", { returnObjects: true }) as { title: string }[];

  const stats = [
    { value: "13M", label: t("exploreRwanda.stat_population") },
    { value: "#2", label: t("exploreRwanda.stat_safest") },
    { value: "Top 3", label: t("exploreRwanda.stat_bizease") },
    { value: "6hrs", label: t("exploreRwanda.stat_setup") },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative w-full h-[20vh] sm:h-[30vh] bg-gray-900 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{t("exploreRwanda.banner_discover")}</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">{t("exploreRwanda.banner_title")}</h1>
        </div>
      </div>

      {/* Stats */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{t("exploreRwanda.opportunity_label")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              {t("exploreRwanda.opportunity_title")}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {t("exploreRwanda.opportunity_desc")}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-14 gap-y-8">
            {stats.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#C9A84C] mb-2">{item.value}</div>
                <p className="text-gray-600 text-sm uppercase tracking-wider">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Sectors */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{t("exploreRwanda.investment_label")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              {t("exploreRwanda.investment_title")}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
              {t("exploreRwanda.investment_desc")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(sectors) && sectors.map((sector, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
                <div className="text-4xl font-bold text-[#C9A84C]/20 mb-3 leading-none">{(i + 1).toString().padStart(2, "0")}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{sector.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Living in Rwanda */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{t("exploreRwanda.lifestyle_label")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              {t("exploreRwanda.lifestyle_title")}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
              {t("exploreRwanda.lifestyle_desc")}
            </p>
          </div>
          <div className="divide-y divide-gray-200 max-w-4xl mx-auto">
            {Array.isArray(living) && living.map((item, i) => (
              <div key={i} className="grid md:grid-cols-3 gap-4 md:gap-8 py-6 md:py-8 first:pt-0">
                <div className="md:text-right">
                  <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider">0{i + 1}</p>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed md:col-span-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{t("exploreRwanda.gallery_label")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
              {t("exploreRwanda.gallery_title")}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
              {t("exploreRwanda.gallery_desc")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={Array.isArray(galleryTitles) ? galleryTitles[i]?.title : ""}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    {Array.isArray(galleryTitles) ? galleryTitles[i]?.title : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="relative w-full bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/1.jpg')", minHeight: "30vh" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative flex flex-col items-center justify-center text-center px-4 py-16 lg:py-20">
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{t("exploreRwanda.cta_label")}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {t("exploreRwanda.cta_title")}
          </h2>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
            {t("exploreRwanda.cta_desc")}
          </p>
          <Link
            href="/contact?service=consultation"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
          >
            {t("exploreRwanda.cta_button")}
          </Link>
        </div>
      </div>
    </div>
  );
}
