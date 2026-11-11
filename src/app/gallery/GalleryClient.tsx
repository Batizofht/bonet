"use client";
import { useTranslation } from "react-i18next";
import Gallery from "../../components/visitrwanda";
import { PageHero, Section, StatStrip, CtaBand, ButtonLink } from "@/components/ui/kit";

export default function GalleryClient() {
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);

  const stats = [
    { value: "4", label: t("galleryPage.stat_parks") },
    { value: "1,000+", label: t("galleryPage.stat_hills") },
    { value: "26°C", label: t("galleryPage.stat_temp") },
    { value: "2hr", label: t("galleryPage.stat_airport") },
  ];

  return (
    <>
      <PageHero
        image="/assets/photos/nyungwe.jpg"
        imageAlt="Canopy walkway in Nyungwe Forest, Rwanda"
        eyebrow={t("galleryPage.subtitle")}
        title={t("galleryPage.title")}
        lead={t("galleryPage.tagline")}
        crumbs={[{ name: L("Home", "Accueil", "首页"), href: "/" }, { name: L("Gallery", "Galerie", "图库") }]}
      />
      <Section tone="ivory" tight>
        <StatStrip stats={stats} />
      </Section>
      <Gallery />
      <CtaBand
        title={t("galleryPage.cta_title")}
        lead={t("galleryPage.cta_desc")}
        actions={<ButtonLink href="/contact" size="lg">{t("galleryPage.cta_button")}</ButtonLink>}
      />
    </>
  );
}
