"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { MapPin, ArrowRight } from "lucide-react";

const images = [
  { src: "/assets/photos/kcc-aerial.jpg", key: "conv" },
  { src: "/assets/images/k2.webp", key: "k2" },
  { src: "/assets/images/memo.jpg", key: "memo" },
  { src: "/assets/photos/akagera.jpg", key: "k3" },
  { src: "/assets/photos/kivu-hill.jpg", key: "kiv" },
  { src: "/assets/photos/gorilla.jpg", key: "vov" },
  { src: "/assets/images/part1.jpg", key: "part1" },
  { src: "/assets/photos/tea-sorwathe.jpg", key: "tea" },
  { src: "/assets/photos/nyungwe.jpg", key: "nyu5" },
  { src: "/assets/images/gis3.jpg", key: "gis3" },
  { src: "/assets/images/huye.JPG", key: "huye" },
  { src: "/assets/images/muhazi.jpg", key: "muhazi" },
];

/** Destination gallery (used on /gallery) */
const Gallery = () => {
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);

  return (
    <section className="border-t border-line bg-white py-16 md:py-24">
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{L("Destinations", "Destinations", "目的地")}</p>
            <h2 className="h-display mt-3 text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">{t("gallery.title")}</h2>
            <p className="lead mt-4">{L("Explore beautiful destinations in Rwanda", "Explorez de magnifiques destinations au Rwanda", "探索卢旺达美丽的目的地")}</p>
          </div>
          <Link href="/explore-rwanda" className="link-arrow shrink-0">
            {t("gallery.button")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img) => (
            <figure key={img.key} className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-sand">
              <Image src={img.src} alt={t(`gallery.places.${img.key}`)} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-ink-950/85 to-transparent p-4 pt-12 text-[14px] font-medium text-white">
                <MapPin className="h-4 w-4 shrink-0 text-gold-400" />
                <span className="truncate">{t(`gallery.places.${img.key}`)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
