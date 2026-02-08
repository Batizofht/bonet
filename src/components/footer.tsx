"use client"
import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, PhoneCall, MessageCircle, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface FAQ {
  answer: string;
  question: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const router = useRouter();
  const navigate = usePathname();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { t } = useTranslation();

  // OPTIMIZED: Only fetch when component is visible
  useEffect(() => {
    // Intersection Observer to delay API call until visible
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
        // Delay API call by 500ms to prioritize render
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
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Cute Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="w-4 h-4 bg-[#188bff] rounded-full"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <HelpCircle className="w-6 h-6 text-[#188bff]"></HelpCircle>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-4 h-4 bg-[#188bff] rounded-full"></div>
        </div>
        
      <h2 className="text-4xl font-bold text-gray-800">
          {t("faq.header").split(" ").map((word, i) => 
            i === 0 || i === 1  ? (
              <span key={i} className="bg-[#188bff] bg-clip-text text-transparent relative">
                {word}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#188bff] transform scale-x-0 hover:scale-x-100 transition-transform"></span>
                {" "}
              </span>
            ) : (
              word + " "
            )
          )}
        </h2>
        <p className="text-gray-500 text-lg">{t("Find answers to common questions")}</p>
      </div>

      {/* Cute FAQ Items */}
      <div className="space-y-4 max-w-6xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            className={`border-2 rounded-2xl p-6 bg-white cursor-pointer transition-all duration-300 ${
              openIndex === index 
                ? 'border-[#188bff] shadow-lg bg-blue-50' 
                : 'border-blue-100 hover:border-[#188bff] hover:shadow-md'
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  openIndex === index ? 'bg-[#188bff] text-white' : 'bg-blue-100 text-[#188bff]'
                }`}>
                  <MessageCircle className="w-5 h-5" />
                </div>
                <p className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </p>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index ? 'bg-[#188bff] text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
            
            {openIndex === index && (
              <p
                className="text-gray-600 mt-4 pl-14 text-base leading-relaxed border-t border-blue-100 pt-4 transition-all duration-300"
              >
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Cute Contact Section */}
      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-100 max-w-1xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-[#188bff] rounded-full flex items-center justify-center shadow-lg">
              <PhoneCall className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <p className="text-xl font-semibold text-gray-800 mb-2">
                {t("Still have questions?")}
              </p>
              <p className="text-gray-600">
                {t("We're here to help you with any questions")}
              </p>
            </div>
            
            <button
              onClick={() => router.push("/contact")}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-[#188bff] text-white text-lg font-semibold rounded-2xl hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
            >
              <PhoneCall className="w-5 h-5" />
              {t("faq.getInTouch")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}