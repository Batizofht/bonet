"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const CONSENT_KEY = "bonet_cookie_consent";

type Consent = { v: 1; analytics: boolean; marketing: boolean; at: string };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function apply(c: Consent) {
  window.gtag?.("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
  });
  window.fbq?.("consent", c.marketing ? "grant" : "revoke");
}

/**
 * Cookie notice. Analytics and the Meta Pixel start in "denied" mode
 * (see the consent bootstrap in layout.tsx) and only switch on after
 * the visitor accepts. The choice is remembered in localStorage.
 */
export default function CookieBanner() {
  const { i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
      if (!saved || saved.v !== 1) {
        const tm = setTimeout(() => setOpen(true), 800);
        return () => clearTimeout(tm);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const decide = (accept: boolean) => {
    const c: Consent = { v: 1, analytics: accept, marketing: accept, at: new Date().toISOString() };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
    } catch {}
    apply(c);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={L("Cookie preferences", "Préférences de cookies", "Cookie 偏好")}
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-[1180px] rounded-[10px] border border-line bg-white p-5 shadow-[0_20px_50px_rgba(7,16,29,0.22)] animate-fade-in md:inset-x-6 md:bottom-6 md:p-6"
      data-no-reveal
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="max-w-3xl">
          <p className="font-display text-[15px] font-semibold text-ink-900">{L("We value your privacy", "Nous respectons votre vie privée", "我们重视您的隐私")}</p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-ink-500">
            {L(
              "We use cookies to understand how visitors use our site (Google Analytics) and to measure our advertising (Meta). Essential features work without them. You can accept or decline.",
              "Nous utilisons des cookies pour comprendre l’utilisation du site (Google Analytics) et mesurer nos publicités (Meta). Les fonctions essentielles fonctionnent sans eux. Vous pouvez accepter ou refuser.",
              "我们使用 Cookie 来了解访客如何使用本网站（Google Analytics）并衡量广告效果（Meta）。基本功能无需 Cookie 即可使用。您可以选择接受或拒绝。"
            )}
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => decide(false)} className="btn btn-outline">
            {L("Decline", "Refuser", "拒绝")}
          </button>
          <button type="button" onClick={() => decide(true)} className="btn btn-ink">
            {L("Accept cookies", "Accepter", "接受")}
          </button>
        </div>
      </div>
    </div>
  );
}
