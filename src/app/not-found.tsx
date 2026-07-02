'use client'
import React from "react";
import Link from "next/link";
import { Home, MessageCircle, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4 py-16">
      <div className="w-24 h-24 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mb-8">
        <Search className="w-12 h-12 text-[#C9A84C]" />
      </div>

      <h1 className="text-7xl font-bold mb-4 text-gray-900">404</h1>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        {t("notFound.title")}
      </h2>

      <p className="text-lg text-gray-600 mb-8 max-w-md">
        {t("notFound.message")}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
        >
          <Home className="w-5 h-5" />
          {t("notFound.goHome")}
        </Link>

        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-gray-800 font-semibold rounded-xl border-2 border-gray-200 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          {t("notFound.contactUs")}
        </Link>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        {t("notFound.helpText")}{" "}
        <Link href="/contact" className="text-[#C9A84C] hover:underline">
          {t("notFound.reachOut")}
        </Link>
      </p>
    </div>
  );
}
