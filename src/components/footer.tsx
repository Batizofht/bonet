"use client"
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { t } = useTranslation();

  // OPTIMIZED: Only fetch when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch only when visible
  useEffect(() => {
    if (!isVisible) return;

    let isMounted = true;

    const fetchFAQs = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!isMounted) return;

        const response = await axios.get(
          "https://api.bonet.rw:8443/bonetBackend/backend/public/faqs"
        );
        setFaqs(response.data);
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
  }, [isVisible]);

  return (
    <div ref={sectionRef}>
      <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-3">Support</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Essential information for foreign investors considering Rwanda
          </p>
          <p className="text-gray-500 text-lg">{t("Find answers to common questions")}</p>
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
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Get in Touch</p>
            <p className="text-2xl md:text-3xl font-bold text-white mb-4">
              Still have questions?
            </p>
            <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Book a free consultation and we will outline your exact process, timeline, and costs.
            </p>
            <button
              onClick={() => router.push("/contact")}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm cursor-pointer"
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}