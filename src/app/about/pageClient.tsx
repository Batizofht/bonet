"use client";
import { useTranslation } from "react-i18next";
import SecondService from "../../services/secondservice";
import MissionVision from "../../aboutUs/mission";
import Team from "../../aboutUs/Team";
import { CtaBand, ButtonLink } from "@/components/ui/kit";

export default function AboutPageClient() {
  const { t } = useTranslation();
  return (
    <>
      <SecondService />
      <MissionVision />
      <Team />
      <CtaBand
        image="/assets/images/kiga1.jpeg"
        eyebrow={t("about.cta_label")}
        title={t("about.cta_title")}
        lead={t("about.cta_desc")}
        actions={
          <>
            <ButtonLink href="/contact" size="lg">{t("about.cta_book")}</ButtonLink>
            <ButtonLink href="/services" size="lg" variant="ghost-light" icon={false}>{t("about.cta_explore")}</ButtonLink>
          </>
        }
      />
    </>
  );
}
