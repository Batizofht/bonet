"use client";
import { useTranslation } from "react-i18next";

export default function WelcomeMessageAI() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const message =
    lang === "fr"
      ? "Bienvenue chez Bonet Elite Services. Comment pouvons-nous vous aider ?"
      : lang === "ch"
      ? "欢迎来到 Bonet Elite Services。今天我们如何为您提供帮助？"
      : "Welcome to Bonet Elite Services. How can we help you today?";

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-lg bg-sand px-3.5 py-2.5 text-[14px] leading-relaxed text-ink-800">{message}</div>
    </div>
  );
}
