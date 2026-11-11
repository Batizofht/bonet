"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { PageHero, Section, SectionHeader, StatStrip, CtaBand, ButtonLink } from "@/components/ui/kit";

// Order matches exploreRwanda.gallery_images titles in the translations
const galleryImages = [
  "/assets/photos/kcc-aerial.jpg",
  "/assets/photos/kigali-cbd-3.jpg",
  "/assets/images/memo.jpg",
  "/assets/photos/kigali-skyline.jpg",
  "/assets/photos/kivu-hill.jpg",
  "/assets/photos/gorilla.jpg",
  "/assets/images/part1.jpg",
  "/assets/photos/tea-harvest.jpg",
  "/assets/photos/nyungwe.jpg",
  "/assets/images/gis3.jpg",
  "/assets/images/huye.JPG",
  "/assets/images/muhazi.jpg",
];

export default function ExploreRwandaClient() {
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);

  const sectorsRaw = t("exploreRwanda.sectors", { returnObjects: true });
  const livingRaw = t("exploreRwanda.living", { returnObjects: true });
  const titlesRaw = t("exploreRwanda.gallery_images", { returnObjects: true });
  const sectors = (Array.isArray(sectorsRaw) ? sectorsRaw : []) as { name: string; desc: string }[];
  const living = (Array.isArray(livingRaw) ? livingRaw : []) as { title: string; desc: string }[];
  const titles = (Array.isArray(titlesRaw) ? titlesRaw : []) as { title: string }[];

  const stats = [
    { value: "13M", label: t("exploreRwanda.stat_population") },
    { value: "#2", label: t("exploreRwanda.stat_safest") },
    { value: "Top 3", label: t("exploreRwanda.stat_bizease") },
    { value: "Online", label: t("exploreRwanda.stat_setup") },
  ];

  return (
    <>
      <PageHero
        image="/assets/images/kiga1.jpeg"
        imageAlt="Kigali skyline with the Kigali Convention Centre at dusk"
        eyebrow={t("exploreRwanda.banner_discover")}
        title={t("exploreRwanda.banner_title")}
        lead={t("exploreRwanda.opportunity_desc")}
        crumbs={[{ name: L("Home", "Accueil", "首页"), href: "/" }, { name: t("menu.whyRwanda") }]}
        actions={<ButtonLink href="/contact?service=consultation" size="lg">{t("exploreRwanda.cta_button")}</ButtonLink>}
      />

      <Section tone="ivory" tight>
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">{t("exploreRwanda.opportunity_label")}</p>
          <h2 className="h-display mt-3 text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">{t("exploreRwanda.opportunity_title")}</h2>
        </div>
        <StatStrip stats={stats} />
      </Section>

      <Section>
        <SectionHeader eyebrow={t("exploreRwanda.investment_label")} title={t("exploreRwanda.investment_title")} lead={t("exploreRwanda.investment_desc")} />
        <div className="hairline-grid sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <div key={i} className="p-7 md:p-8">
              <h3 className="text-[1.05rem] font-semibold text-ink-900">{s.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow eyebrow-light">{t("exploreRwanda.lifestyle_label")}</p>
            <h2 className="h-display mt-3 !text-white text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">{t("exploreRwanda.lifestyle_title")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">{t("exploreRwanda.lifestyle_desc")}</p>
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {living.map((item, i) => (
              <li key={i} className="py-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="ivory">
        <SectionHeader eyebrow={t("exploreRwanda.gallery_label")} title={t("exploreRwanda.gallery_title")} lead={t("exploreRwanda.gallery_desc")} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((src, i) => (
            <figure key={src} className="relative overflow-hidden rounded-[8px] bg-sand">
              <div className="relative aspect-[4/3]">
                <Image src={src} alt={titles[i]?.title || "Rwanda"} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/85 to-transparent p-4 pt-10 text-[13px] font-medium text-white">
                {titles[i]?.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow={t("exploreRwanda.cta_label")}
        title={t("exploreRwanda.cta_title")}
        lead={t("exploreRwanda.cta_desc")}
        actions={<ButtonLink href="/contact?service=consultation" size="lg">{t("exploreRwanda.cta_button")}</ButtonLink>}
      />
    </>
  );
}
