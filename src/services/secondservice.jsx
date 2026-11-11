"use client";
import { useTranslation } from "react-i18next";
import { PageHero, ButtonLink } from "@/components/ui/kit";

/** About page hero */
const SecondService = () => {
  const { i18n } = useTranslation();
  const L = (en, fr, ch) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);

  return (
    <PageHero
      image="/assets/photos/kigali-skyline.jpg"
      imageAlt="Kigali at dusk"
      eyebrow={L("About Us", "À Propos", "关于我们")}
      title={L("About Bonet", "À Propos de Bonet", "关于Bonet")}
      lead={L(
        "The team foreign investors call first when entering Rwanda.",
        "L'équipe que les investisseurs étrangers appellent en premier lorsqu'ils entrent au Rwanda.",
        "外国投资者进入卢旺达时首先联系的团队。"
      )}
      crumbs={[{ name: L("Home", "Accueil", "首页"), href: "/" }, { name: L("About Us", "À Propos", "关于我们") }]}
      actions={<ButtonLink href="/contact" size="lg">{L("Book a free consultation", "Consultation gratuite", "预约免费咨询")}</ButtonLink>}
    />
  );
};
export default SecondService;
