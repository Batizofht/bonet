'use client'
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Gallery from "../../components/visitrwanda";

export default function GalleryClient() {
  const { t } = useTranslation();

  const stats = [
    { value: "4", label: t("galleryPage.stat_parks") },
    { value: "1,000+", label: t("galleryPage.stat_hills") },
    { value: "26°C", label: t("galleryPage.stat_temp") },
    { value: "2hr", label: t("galleryPage.stat_airport") },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div
        className="relative w-full h-[20vh] sm:h-[30vh] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">
            {t("galleryPage.subtitle")}
          </p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">
            {t("galleryPage.title")}
          </h1>
          <p className="text-white/75 max-w-2xl mt-2 text-xs sm:text-sm leading-relaxed">
            {t("galleryPage.tagline")}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-[#C9A84C] mb-2">{item.value}</div>
                <p className="text-gray-700 font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Gallery */}
      <Gallery />

      {/* CTA */}
      <div
        className="relative w-full h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/image/1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative flex flex-col justify-center items-center text-center px-4 h-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t("galleryPage.cta_title")}
          </h2>
          <p className="text-gray-300 mb-6 max-w-xl">
            {t("galleryPage.cta_desc")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
          >
            {t("galleryPage.cta_button")}
          </Link>
        </div>
      </div>
    </div>
  );
}
