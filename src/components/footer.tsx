
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

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
 const router = useRouter()
  const navigate = usePathname();
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { t } = useTranslation()

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out", once: true });
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await axios.get(
        "https://switchiify.com/bonetProject/backend/public/faqs"
      );
      setFaqs(response.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="w-20 h-1 bg-[#188bff] mx-auto mt-2 mb-5"></div>
      <h2 className="text-3xl font-bold mb-4 text-center bg-[#188bff] bg-clip-text text-transparent">
        {t("faq.header")}
      </h2>

      {/* FAQ Items */}
      <div className="space-y-4 max-w-5xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-blue-100 rounded-xl p-4 bg-white shadow-sm transition-all duration-300 cursor-pointer hover:shadow-md"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <p className=" text-lg font-medium text-gray-800">
                {faq.question}
              </p>
              {openIndex === index ? (
                <ChevronUp className="text-blue-600" />
              ) : (
                <ChevronDown className="text-blue-600" />
              )}
            </div>
            {openIndex === index && (
              <p className="text-gray-600 mt-3 font-[Open_Sans] text-base leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="text-center mt-10" data-aos="fade-up">
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-semibold text-gray-700">
            {t("faq.contactPrompt")}
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="flex items-center justify-center gap-2 px-6 py-2 text-blue-600 text-lg font-semibold rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white shadow-md transition duration-300 cursor-pointer"
          >
            <PhoneCall
              className="text-blue-600 hover:text-white transition duration-300"
              size={20}
            />
            {t("faq.getInTouch")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
