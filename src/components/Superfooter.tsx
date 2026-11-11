"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin, Clock } from "lucide-react";
import { MARKETS } from "@/content/insights/markets";

const socials = [
  { Icon: Facebook, label: "Facebook", url: "https://www.facebook.com/profile.php?id=61579396603309&mibextid=ZbWKwL" },
  { Icon: Instagram, label: "Instagram", url: "https://www.instagram.com/bonet_elite_services_ltd/" },
  { Icon: Twitter, label: "X (Twitter)", url: "https://x.com/BonetPJ?t=O_74Kuk2Z0Aja2Dqbj7lEA&s=09" },
  { Icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/company/108662677/" },
];

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="relative mb-5 pb-3 font-display text-[12.5px] font-semibold uppercase tracking-[0.12em] text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-6 after:bg-gold-500">
      {children}
    </p>
  );
}

export default function SuperFooter() {
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);

  const services = [
    { href: "/business-registration", label: L("Business Registration", "Enregistrement d'Entreprise", "企业注册") },
    { href: "/investment", label: L("Investment", "Investissement", "投资") },
    { href: "/consulting", label: L("Consulting", "Conseil", "咨询") },
    { href: "/hr-recruitment", label: L("HR Recruitment", "Recrutement RH", "人力资源招聘") },
    { href: "/hrsupport", label: L("HR & Admin Support", "Soutien RH et Administratif", "人力资源与行政支持") },
    { href: "/relocation-services", label: L("Relocation Services", "Services de Relocalisation", "搬迁服务") },
    { href: "/executive-travel", label: L("Executive Travel", "Voyage d'Affaires", "高管出行") },
    { href: "/travel", label: L("Travel & Hospitality", "Voyage et Hôtellerie", "旅游与酒店") },
  ];

  const company = [
    { href: "/about", label: t("footer.about") },
    { href: "/explore-rwanda", label: t("menu.whyRwanda") },
    { href: "/blogs", label: t("blog.blogs") },
    { href: "/gallery", label: L("Gallery", "Galerie", "图库") },
    { href: "/faq", label: t("menu.faq") },
    { href: "/Reservations", label: t("footer.bookNow") },
    { href: "/contact", label: t("footer.contactUs") },
  ];

  return (
    <footer className="bg-ink-950 text-[14.5px] text-white/65" role="contentinfo">
      <div className="container-x grid gap-12 pb-12 pt-16 md:grid-cols-2 md:pt-20 lg:grid-cols-[1.35fr_1fr_1fr_1fr_1.25fr] lg:gap-10">
        <div>
          <img src="/assets/brand/bonet-logo.png" alt="Bonet Elite Services" width={327} height={128} loading="lazy" className="h-14 w-auto" />
          <p className="mt-6 max-w-xs leading-relaxed">{t("footer.description")}</p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ Icon, label, url }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-gold-500 hover:text-gold-400">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <ColTitle>{t("footer.services")}</ColTitle>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s.href}><Link href={s.href} className="transition-colors hover:text-white">{s.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <ColTitle>{t("footer.company") || "Company"}</ColTitle>
          <ul className="space-y-2.5">
            {company.map((s) => (
              <li key={s.href}><Link href={s.href} className="transition-colors hover:text-white">{s.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <ColTitle>{L("Investor guides", "Guides investisseurs", "投资者指南")}</ColTitle>
          <ul className="space-y-2.5">
            {MARKETS.map((m) => (
              <li key={m.slug}><Link href={`/${m.slug}`} className="transition-colors hover:text-white">{m.hub.eyebrow}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <ColTitle>{t("footer.contactUs")}</ColTitle>
          <ul className="space-y-3.5">
            <li className="grid grid-cols-[20px_1fr] gap-2.5">
              <Phone className="mt-1 h-4 w-4 text-gold-500" />
              <a href="tel:+250726300260" className="hover:text-white">+250 726 300 260<span className="block text-[12.5px] text-white/40">{t("footer.whatsappCall")}</span></a>
            </li>
            <li className="grid grid-cols-[20px_1fr] gap-2.5">
              <Mail className="mt-1 h-4 w-4 text-gold-500" />
              <a href="mailto:info@bonet.rw" className="hover:text-white">info@bonet.rw</a>
            </li>
            <li className="grid grid-cols-[20px_1fr] gap-2.5">
              <MapPin className="mt-1 h-4 w-4 text-gold-500" />
              <span>Masaka, Dubai Port Road<br />Kigali, Rwanda</span>
            </li>
            <li className="grid grid-cols-[20px_1fr] gap-2.5">
              <Clock className="mt-1 h-4 w-4 text-gold-500" />
              <span>{L("Mon–Fri 08:00–18:00", "Lun–Ven 08:00–18:00", "周一至周五 08:00–18:00")}<span className="block text-[12.5px] text-white/40">{L("WhatsApp 24/7", "WhatsApp 24h/24", "WhatsApp 全天候")}</span></span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="container-x flex flex-col gap-3 py-6 text-[13px] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Bonet Elite Services Ltd. {t("footer.copyright")}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/about" className="hover:text-white">{t("footer.about")}</Link></li>
            <li><Link href="/faq" className="hover:text-white">{t("menu.faq")}</Link></li>
            <li><Link href="/contact" className="hover:text-white">{t("footer.contactUs")}</Link></li>
            <li><Link href="/photo-credits" className="hover:text-white">{L("Photo credits", "Crédits photo", "图片来源")}</Link></li>
            <li>
              <button
                type="button"
                className="hover:text-white"
                onClick={() => {
                  try { localStorage.removeItem("bonet_cookie_consent"); } catch {}
                  window.location.reload();
                }}
              >
                {L("Cookie settings", "Paramètres des cookies", "Cookie 设置")}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
