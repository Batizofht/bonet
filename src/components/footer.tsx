"use client"
import { useState, useEffect, useRef } from "react";
import { ChevronDown, PhoneCall, ArrowRight } from "lucide-react";
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
      try {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!isMounted) return;

        const response = await axios.get(
          "https://api.bonet.rw:8443/bonetBackend/backend/public/faqs"
        );
        setFaqs(response.data);
      } catch (error) {
        // Silent fail
      }
    };

    fetchFAQs();

    return () => {
      isMounted = false;
    };
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
          Support
        </span>
        <h2 className="text-4xl font-bold text-gray-900">
          Frequently Asked <span className="text-[#C9A84C]">Questions</span>
        </h2>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Essential information for foreign investors considering Rwanda
        </p>
        <p className="text-gray-500 text-lg">{t("Find answers to common questions")}</p>
      </div>

      {/* FAQ Items from API */}
      <div className="space-y-3 max-w-6xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`group rounded-2xl bg-white cursor-pointer transition-all duration-300 overflow-hidden ${
              openIndex === index
                ? 'border border-[#C9A84C]/35 shadow-lg shadow-[#C9A84C]/10'
                : 'border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-lg hover:shadow-gray-200/50'
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="p-5 md:p-6">
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-[#C9A84C] text-white shadow-md' 
                      : 'bg-gray-50 text-gray-500 group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C]'
                  }`}>
                    <span className="font-bold text-sm">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <p className={`font-semibold transition-colors ${
                    openIndex === index ? 'text-[#C9A84C]' : 'text-gray-900'
                  }`}>
                    {faq.question}
                  </p>
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-[#C9A84C] text-white rotate-180' 
                      : 'bg-gray-100 text-gray-500 group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C]'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>

              {openIndex === index && (
                <div className="mt-4 pl-14 border-t border-gray-100 pt-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="text-center mt-16">
        <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-10 border border-gray-100 max-w-6xl mx-auto shadow-xl shadow-gray-200/50 overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-[#C9A84C] rounded-2xl flex items-center justify-center shadow-lg shadow-[#C9A84C]/20 rotate-3">
              <PhoneCall className="w-8 h-8 text-white" />
            </div>

            <div>
              <p className="text-xl font-bold text-gray-900 mb-2">
                Still have questions?
              </p>
              <p className="text-gray-500">
                Book a free consultation — we will outline your exact process, timeline, and costs.
              </p>
            </div>

            <button
              onClick={() => router.push("/contact")}
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] shadow-lg shadow-[#C9A84C]/20 hover:shadow-xl hover:shadow-[#C9A84C]/30 transition-all duration-300 cursor-pointer"
            >
              Contact Our Team
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}