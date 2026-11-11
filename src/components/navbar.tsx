"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronDown, ChevronRight, Mail, MapPin, Phone, X, Clock } from "lucide-react";
import i18n from "../../i18n";
import { useScrollLock } from "@/lib/useScrollLock";
import { MARKETS } from "@/content/insights/markets";

type Lang = "en" | "fr" | "ch";
const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "ch", label: "中文", short: "中文" },
];

// Pre-sized (327×128) so it loads directly, without the image optimizer
export const LOGO = "/assets/brand/bonet-logo.png";

function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    setLang(((i18n.language || "en").slice(0, 2) as Lang) || "en");
    const on = (l: string) => setLang(l.slice(0, 2) as Lang);
    i18n.on("languageChanged", on);
    return () => i18n.off("languageChanged", on);
  }, []);
  return [lang, (l) => i18n.changeLanguage(l)];
}

/** EN | FR | 中文 — plain text switch in the utility bar */
function LanguageSwitch() {
  const [lang, change] = useLang();
  return (
    <div className="flex items-center" role="group" aria-label="Language">
      {LANGS.map((l, i) => (
        <span key={l.code} className="flex items-center">
          {i > 0 && <span className="mx-2 text-white/20">|</span>}
          <button
            type="button"
            onClick={() => change(l.code)}
            aria-pressed={lang === l.code}
            className={`transition-colors ${lang === l.code ? "font-semibold text-white" : "text-white/55 hover:text-white"}`}
          >
            {l.short}
          </button>
        </span>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { t, i18n: inst } = useTranslation();
  const L = (en: string, fr: string, ch: string) => (inst.language === "fr" ? fr : inst.language === "ch" ? ch : en);
  const pathname = usePathname();
  const [menu, setMenu] = useState<null | "services" | "insights">(null);
  const [drawer, setDrawer] = useState(false);
  const [drawerView, setDrawerView] = useState<"main" | "services" | "insights">("main");
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [lang, change] = useLang();

  useScrollLock(drawer);

  useEffect(() => {
    setMenu(null);
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const close = (e: MouseEvent) => !headerRef.current?.contains(e.target as Node) && setMenu(null);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [menu]);

  useEffect(() => {
    if (drawer) return;
    const tm = setTimeout(() => setDrawerView("main"), 300);
    return () => clearTimeout(tm);
  }, [drawer]);

  const serviceGroups = [
    {
      title: t("services.list.0.title"),
      href: "/investment",
      items: [
        { href: "/business-registration", label: t("menu.companyRegistration"), description: t("menu.desc_companyReg") },
        { href: "/investment", label: t("menu.investmentCertificate"), description: t("menu.desc_investCert") },
        { href: "/investment", label: t("menu.businessPermits"), description: t("menu.desc_bizPermits") },
      ],
    },
    {
      title: t("menu.businessConsulting"),
      href: "/consulting",
      items: [
        { href: "/consulting", label: t("menu.businessPlanning"), description: t("menu.desc_bizPlanning") },
        { href: "/consulting", label: t("menu.financialAdvisory"), description: t("menu.desc_finAdvisory") },
        { href: "/consulting", label: t("menu.projectAuditing"), description: t("menu.desc_projAudit") },
      ],
    },
    {
      title: t("menu.hrAndAdminSupport"),
      href: "/hrsupport",
      items: [
        { href: "/hr-recruitment", label: t("menu.recruitment"), description: t("menu.desc_recruitment") },
        { href: "/hrsupport", label: t("menu.hrPolicyDevelopment"), description: t("menu.desc_hrPolicy") },
        { href: "/hrsupport", label: t("menu.administrativeSupport"), description: t("menu.desc_adminSupport") },
      ],
    },
    {
      title: t("menu.travelAndHospitality"),
      href: "/travel",
      items: [
        { href: "/relocation-services", label: t("menu.relocationConcierge"), description: t("menu.desc_relocation") },
        { href: "/executive-travel", label: t("menu.executiveTravel"), description: t("menu.desc_execTravel") },
        { href: "/travel", label: t("menu.hotels"), description: t("menu.desc_hotels") },
      ],
    },
  ];

  const isActive = (p: string) => (p === "/" ? pathname === "/" : pathname?.startsWith(p));
  const servicesActive = ["/services", "/investment", "/business-registration", "/consulting", "/hrsupport", "/hr-recruitment", "/relocation-services", "/executive-travel", "/travel"].some((p) => pathname?.startsWith(p));
  const insightsActive = pathname?.startsWith("/blog") || MARKETS.some((m) => pathname?.startsWith(`/${m.slug}`));

  const linkCls = (active?: boolean) =>
    `relative flex h-full items-center gap-1.5 px-3.5 font-display text-[14px] font-medium transition-colors after:absolute after:inset-x-3.5 after:bottom-[24px] after:h-[2px] after:bg-gold-500 after:transition-opacity ${
      active ? "text-white after:opacity-100" : "text-white/75 hover:text-white after:opacity-0"
    }`;

  return (
    <>
      {/* Utility bar */}
      <div className="hidden border-b border-white/[0.07] bg-ink-950 text-[13px] text-white/60 lg:block">
        <div className="container-x flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-gold-500" />Kigali, Rwanda</span>
            <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-gold-500" />{L("Mon–Fri 08:00–18:00 · WhatsApp 24/7", "Lun–Ven 08:00–18:00 · WhatsApp 24/7", "周一至周五 08:00–18:00 · WhatsApp 全天候")}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+250726300260" className="flex items-center gap-2 hover:text-white"><Phone className="h-3.5 w-3.5 text-gold-500" />+250 726 300 260</a>
            <a href="mailto:info@bonet.rw" className="flex items-center gap-2 hover:text-white"><Mail className="h-3.5 w-3.5 text-gold-500" />info@bonet.rw</a>
            <span className="h-4 w-px bg-white/15" />
            <LanguageSwitch />
          </div>
        </div>
      </div>

      <header
        ref={headerRef}
        className={`sticky top-0 z-50 border-b border-white/[0.07] bg-ink-900 transition-shadow duration-300 ${scrolled ? "shadow-[0_8px_24px_rgba(0,0,0,0.25)]" : ""}`}
      >
        <div className="container-x flex h-[78px] items-center justify-between gap-6">
          <Link href="/" aria-label="Bonet Elite Services — home" className="shrink-0">
            <img src={LOGO} alt="Bonet Elite Services" width={327} height={128} fetchPriority="high" className="h-11 w-auto md:h-12" />
          </Link>

          <nav aria-label="Main" className="hidden h-full items-center lg:flex">
            <Link href="/about" className={linkCls(isActive("/about"))}>{t("menu.aboutUs")}</Link>
            <button type="button" aria-expanded={menu === "services"} onClick={() => setMenu(menu === "services" ? null : "services")} className={linkCls(servicesActive || menu === "services")}>
              {t("menu.services")}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${menu === "services" ? "rotate-180" : ""}`} />
            </button>
            <Link href="/explore-rwanda" className={linkCls(isActive("/explore-rwanda"))}>{t("menu.whyRwanda")}</Link>
            <button type="button" aria-expanded={menu === "insights"} onClick={() => setMenu(menu === "insights" ? null : "insights")} className={linkCls(insightsActive || menu === "insights")}>
              {L("Insights", "Guides", "洞察")}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${menu === "insights" ? "rotate-180" : ""}`} />
            </button>
            <Link href="/faq" className={linkCls(isActive("/faq"))}>{t("menu.faq")}</Link>
            <Link href="/Reservations" className={linkCls(isActive("/Reservations"))}>{t("menu.bookNow")}</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn btn-gold btn-sm hidden sm:inline-flex">{t("common.contactUs")}</Link>
            <button
              type="button"
              className="group flex h-11 items-center gap-3 pl-2 font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white lg:hidden"
              onClick={() => {
                setDrawerView("main");
                setDrawer(true);
              }}
              aria-label={t("quickButtons.ariaLabels.openMenu")}
              aria-expanded={drawer}
            >
              <span className="hidden min-[350px]:inline">Menu</span>
              <span className="flex w-6 flex-col items-end gap-[6px]" aria-hidden="true">
                <span className="h-[2px] w-6 rounded-full bg-white" />
                <span className="h-[2px] w-4 rounded-full bg-gold-500 transition-[width] duration-200 group-hover:w-6" />
              </span>
            </button>
          </div>
        </div>

        {/* Services mega menu */}
        <div className={`absolute inset-x-0 top-full hidden lg:block transition-[opacity,visibility] duration-150 ${menu === "services" ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}>
          <div className="container-x pt-3">
            <div className="grid grid-cols-[260px_minmax(0,1fr)_260px] overflow-hidden rounded-[10px] bg-ink-800 shadow-[0_30px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.06]">
              <div className="flex flex-col gap-3 bg-ink-700/60 p-8">
                <p className="eyebrow eyebrow-light">{t("menu.megaHeader")}</p>
                <p className="font-display text-[1.2rem] font-semibold leading-snug text-white">{L("One team, from registration to daily operations", "Une seule équipe, de l’immatriculation aux opérations", "一个团队，从注册到日常运营")}</p>
                <p className="text-[14px] leading-relaxed text-white/60">{t("menu.megaSubtitle")}</p>
                <Link href="/services" className="mt-auto inline-flex items-center gap-2 pt-4 font-display text-[14px] font-semibold text-white hover:text-gold-400">
                  {t("menu.exploreAllServices")}<ArrowRight className="h-4 w-4 text-gold-500" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 p-8">
                {serviceGroups.map((g) => (
                  <div key={g.title}>
                    <Link href={g.href} className="block border-b border-white/10 pb-2.5 font-display text-[13px] font-semibold text-white hover:text-gold-400">{g.title}</Link>
                    <ul className="mt-2">
                      {g.items.map((it) => (
                        <li key={it.label}>
                          <Link href={it.href} className="-mx-3 block rounded-md px-3 py-2 transition-colors hover:bg-white/[0.04]">
                            <span className="block text-[14px] font-medium text-white/90">{it.label}</span>
                            <span className="mt-0.5 block text-[12.5px] leading-snug text-white/50 line-clamp-1">{it.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link href="/business-registration" className="group relative isolate flex flex-col justify-end p-6 text-white">
                <Image src="/assets/images/rdb2.jpg" alt="Rwanda Development Board, Kigali" fill sizes="260px" className="-z-20 object-cover" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/95 via-ink-950/55 to-ink-950/10" />
                <span className="eyebrow eyebrow-light">RDB</span>
                <span className="mt-2 font-display text-[1.1rem] font-semibold leading-snug">{L("Register your company in Rwanda", "Enregistrez votre société au Rwanda", "在卢旺达注册公司")}</span>
                <span className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold text-gold-400">{L("Start now", "Commencer", "立即开始")} <ArrowRight className="h-4 w-4" /></span>
              </Link>
            </div>
          </div>
        </div>

        {/* Insights mega menu */}
        <div className={`absolute inset-x-0 top-full hidden lg:block transition-[opacity,visibility] duration-150 ${menu === "insights" ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}>
          <div className="container-x pt-3">
            <div className="grid grid-cols-[260px_minmax(0,1fr)] overflow-hidden rounded-[10px] bg-ink-800 shadow-[0_30px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.06]">
              <div className="flex flex-col gap-3 bg-ink-700/60 p-8">
                <p className="eyebrow eyebrow-light">{L("Insights", "Guides", "洞察")}</p>
                <p className="font-display text-[1.2rem] font-semibold leading-snug text-white">{L("Guides for investors, by market", "Guides pour investisseurs, par marché", "按市场分类的投资指南")}</p>
                <Link href="/blogs" className="mt-auto inline-flex items-center gap-2 pt-4 font-display text-[14px] font-semibold text-white hover:text-gold-400">
                  {L("All articles", "Tous les articles", "全部文章")}<ArrowRight className="h-4 w-4 text-gold-500" />
                </Link>
              </div>
              <ul className="grid grid-cols-3 gap-x-8 gap-y-1 p-8">
                {MARKETS.map((m) => (
                  <li key={m.slug}>
                    <Link href={`/${m.slug}`} className="-mx-3 block rounded-md px-3 py-3 transition-colors hover:bg-white/[0.04]">
                      <span className="block text-[11.5px] font-semibold uppercase tracking-[0.12em] text-gold-500">{m.localName}</span>
                      <span className="mt-1 block text-[14px] font-medium text-white/90">{m.hub.eyebrow}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className="lg:hidden">
        <div className={`fixed inset-0 z-[60] bg-ink-950/60 transition-opacity duration-300 ${drawer ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setDrawer(false)} aria-hidden="true" />
        <div
          role="dialog"
          aria-modal="true"
          aria-hidden={!drawer}
          className={`fixed right-0 top-0 z-[70] flex h-[100dvh] w-[88vw] max-w-[380px] flex-col bg-ink-900 text-white shadow-2xl transition-[translate,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${drawer ? "visible translate-x-0" : "invisible translate-x-full"}`}
        >
          <div className="flex h-[78px] items-center justify-between border-b border-white/10 px-5">
            <img src={LOGO} alt="Bonet Elite" width={327} height={128} className="h-10 w-auto" />
            <button type="button" onClick={() => setDrawer(false)} className="flex h-10 items-center gap-2 font-display text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white/80 hover:text-white" aria-label="Close menu">
              Close
              <X className="h-5 w-5 text-gold-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-3">
            {drawerView === "main" && (
              <nav className="flex flex-col font-display">
                {[
                  { href: "/", label: t("quickButtons.menu.home") },
                  { href: "/about", label: t("quickButtons.menu.aboutUs") },
                ].map((i) => (
                  <Link key={i.href} href={i.href} className={`border-b border-white/10 py-4 text-[16px] font-medium ${isActive(i.href) ? "text-gold-400" : "text-white"}`}>{i.label}</Link>
                ))}
                <button type="button" onClick={() => setDrawerView("services")} className="flex items-center justify-between border-b border-white/10 py-4 text-left text-[16px] font-medium">
                  {t("quickButtons.menu.services")}
                  <ChevronRight className="h-4 w-4 text-white/50" />
                </button>
                <button type="button" onClick={() => setDrawerView("insights")} className="flex items-center justify-between border-b border-white/10 py-4 text-left text-[16px] font-medium">
                  {L("Insights", "Guides", "洞察")}
                  <ChevronRight className="h-4 w-4 text-white/50" />
                </button>
                {[
                  { href: "/explore-rwanda", label: t("menu.whyRwanda") },
                  { href: "/faq", label: t("menu.faq") },
                  { href: "/Reservations", label: t("quickButtons.menu.bookNow") },
                ].map((i) => (
                  <Link key={i.href} href={i.href} className={`border-b border-white/10 py-4 text-[16px] font-medium ${isActive(i.href) ? "text-gold-400" : "text-white"}`}>{i.label}</Link>
                ))}
              </nav>
            )}
            {drawerView === "services" && (
              <div>
                <button type="button" onClick={() => setDrawerView("main")} className="mb-2 flex items-center gap-1 py-2 text-sm text-white/60">
                  <ChevronRight className="h-4 w-4 rotate-180" />{t("common.back")}
                </button>
                <Link href="/services" className="mb-4 block font-display text-lg font-semibold">{t("menu.exploreAllServices")}</Link>
                {serviceGroups.map((g) => (
                  <div key={g.title} className="mb-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-500">{g.title}</p>
                    {g.items.map((it) => (
                      <Link key={it.label} href={it.href} className="block border-b border-white/10 py-3 text-[15px] text-white/85">{it.label}</Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {drawerView === "insights" && (
              <div>
                <button type="button" onClick={() => setDrawerView("main")} className="mb-2 flex items-center gap-1 py-2 text-sm text-white/60">
                  <ChevronRight className="h-4 w-4 rotate-180" />{t("common.back")}
                </button>
                <Link href="/blogs" className="mb-4 block font-display text-lg font-semibold">{L("All articles", "Tous les articles", "全部文章")}</Link>
                {MARKETS.map((m) => (
                  <Link key={m.slug} href={`/${m.slug}`} className="block border-b border-white/10 py-3.5">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-500">{m.localName}</span>
                    <span className="block text-[15px] text-white/85">{m.hub.eyebrow}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 px-5 py-5">
            <Link href="/contact" className="btn btn-gold w-full">{t("quickButtons.menu.contactUs")}</Link>
            <div className="mt-4 flex items-center justify-center gap-5 text-[13px]">
              {LANGS.map((l) => (
                <button key={l.code} type="button" onClick={() => change(l.code)} className={lang === l.code ? "font-semibold text-white" : "text-white/55"}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
