"use client"
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { apiGet } from "@/lib/api";
import { useRouter } from "next/navigation";

interface FAQ {
  answer: string;
  question: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Fetch FAQs immediately on mount — no scroll-gating, no artificial delay
  useEffect(() => {
    let isMounted = true;

    const fetchFAQs = async () => {
      setLoading(true);
      try {
        const data = await apiGet<FAQ[]>(
          "https://api.bonet.rw/bonetBackend/backend/public/faqs"
        );
        if (isMounted) setFaqs(data);
      } catch (error) {
        // Silent fail
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFAQs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-3">{t("faqPage.support_label")}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
            {t("faqPage.title")}
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {L("Essential information for foreign investors considering Rwanda","Informations essentielles pour les investisseurs étrangers envisageant le Rwanda","供考虑卢旺达的外国投资者参考的基本信息")}
          </p>
        </div>

        {/* FAQ Items from API */}
        <div className="space-y-3 max-w-6xl mx-auto">
          {loading && (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="rounded-lg bg-white border border-gray-200 overflow-hidden"
                >
                  <div className="p-5 md:p-6">
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-5 w-64 bg-gray-100 rounded animate-pulse" />
                      </div>
                      <div className="w-8 h-8 rounded bg-gray-100 animate-pulse flex-shrink-0" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {!loading && faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-lg border bg-white cursor-pointer transition-colors duration-200 overflow-hidden ${
                openIndex === index
                  ? 'border-[#C9A84C]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="p-5 md:p-6">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-[#C9A84C] flex-shrink-0">{String(index + 1).padStart(2, "0")}</span>
                    <p className={`font-semibold text-sm transition-colors ${
                      openIndex === index ? 'text-[#C9A84C]' : 'text-gray-900'
                    }`}>
                      {faq.question}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-all duration-200 ${
                    openIndex === index ? 'rotate-180 text-[#C9A84C]' : ''
                  }`} />
                  </div>

                {openIndex === index && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/image/7.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative max-w-4xl mx-auto px-4 pt-16 pb-24 lg:pt-20 lg:pb-28">
          <div className="flex flex-col items-center text-center">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("Get in Touch","Nous Contacter","联系我们")}</p>
            <p className="text-2xl md:text-3xl font-bold text-white mb-4">
              {L("Still have questions?","Vous avez encore des questions ?","还有疑问？")}
            </p>
            <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {L("Book a free consultation and we will outline your exact process, timeline, and costs.","Réservez une consultation gratuite et nous vous expliquerons votre processus exact, votre calendrier et vos coûts.","预约免费咨询，我们将为您说明具体流程、时间表和费用。")}
            </p>
            <button
              onClick={() => router.push("/contact")}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm cursor-pointer"
            >
              {L("Contact Our Team","Contacter Notre Équipe","联系我们的团队")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}