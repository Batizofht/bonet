"use client";
import { useTranslation } from "react-i18next";
import { PageHero, ButtonLink, WhatsAppButton } from "@/components/ui/kit";

/** Shared hero for service and guide pages */
const FirstService = ({
  image = "/image/2.jpg",
  subtitle,
  title,
  description,
  subtitleKey,
  titleKey,
  descriptionKey,
  imageAlt,
  position,
  showActions = true,
  section,
}) => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);

  const eyebrow = subtitleKey ? t(subtitleKey) : subtitle;
  const h1 = (titleKey ? t(titleKey) : title) || "Our Services";
  const lead = descriptionKey ? t(descriptionKey) : description;

  return (
    <PageHero
      image={image}
      imageAlt={imageAlt || h1}
      position={position}
      eyebrow={eyebrow}
      title={h1}
      lead={lead}
      crumbs={[
        { name: L("Home", "Accueil", "首页"), href: "/" },
        section === "blog" ? { name: "Blog", href: "/blogs" } : { name: L("Services", "Services", "服务"), href: "/services" },
        { name: eyebrow || h1 },
      ]}
      actions={
        showActions ? (
          <>
            <ButtonLink href="/contact" size="lg">{L("Book a free consultation", "Consultation gratuite", "预约免费咨询")}</ButtonLink>
            <WhatsAppButton variant="ghost-light" className="btn-lg">WhatsApp</WhatsAppButton>
          </>
        ) : null
      }
    />
  );
};

export default FirstService;
