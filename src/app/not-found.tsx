"use client";
import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <section className="bg-ink-pattern text-white">
      <div className="container-x flex min-h-[72vh] flex-col justify-center py-24">
        <p className="eyebrow eyebrow-light">Error 404</p>
        <p className="mt-6 font-display text-[7rem] font-semibold leading-none text-gold-400 md:text-[10rem]">404</p>
        <h1 className="h-display mt-4 max-w-2xl !text-white text-[2.2rem] md:text-[3rem]">{t("notFound.title")}</h1>
        <p className="mt-5 max-w-xl text-lg text-white/70">{t("notFound.message")}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-gold btn-lg">
            <Home className="h-4 w-4" />
            {t("notFound.goHome")}
          </Link>
          <Link href="/contact" className="btn btn-ghost-light btn-lg">
            <MessageCircle className="h-4 w-4" />
            {t("notFound.contactUs")}
          </Link>
        </div>
        <p className="mt-10 text-sm text-white/50">
          {t("notFound.helpText")}{" "}
          <Link href="/contact" className="text-gold-300 underline-offset-4 hover:underline">{t("notFound.reachOut")}</Link>
        </p>
      </div>
    </section>
  );
}
