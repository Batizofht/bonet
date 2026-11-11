"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "@/components/ui/kit";

const FirstContact = () => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <Image src="/assets/images/kiga1.jpeg" alt="Kigali skyline at dusk" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/95 via-ink-950/80 to-ink-950/40" />
      <div className="container-x pb-36 pt-16 md:pb-44 md:pt-24">
        <Breadcrumbs light items={[{ name: L("Home", "Accueil", "首页"), href: "/" }, { name: t("footer.contactUs") }]} />
        <p className="eyebrow eyebrow-light mt-7">{t("footer.contactUs")}</p>
        <h1 className="h-display mt-3 max-w-3xl !text-white text-[2.1rem] sm:text-[2.6rem] md:text-[3.1rem]">
          {L("Contact Bonet Elite Team", "Contacter l'équipe Bonet Elite", "联系Bonet Elite团队")}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/70">
          {L("A free 30-minute consultation, in English, French or Chinese.", "Une consultation gratuite de 30 minutes, en anglais, français ou chinois.", "免费30分钟咨询，支持英语、法语或中文。")}
        </p>
      </div>
    </section>
  );
};

export default FirstContact;
