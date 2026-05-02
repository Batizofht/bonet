"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  ChevronDown,
  Search,
  MessageCircle,
  ArrowRight
} from "lucide-react";

const faqs = [
  {
    question: "How long does company registration take in Rwanda?",
    answer: "RDB processes company registration in 6 hours for standard applications. With our assistance, most clients have their company operational within 24-48 hours including TIN, RSSB, and banking setup."
  },
  {
    question: "Can foreigners own 100% of a Rwandan company?",
    answer: "Yes. Rwanda allows 100% foreign ownership of companies in most sectors. No local partner is required, and there are no restrictions on repatriation of profits."
  },
  {
    question: "What is the minimum capital requirement?",
    answer: "There is no minimum capital requirement for most business types in Rwanda. You can register a company with as little as RWF 7,000 (approximately $6 USD) in government fees."
  },
  {
    question: "How do I get a work permit for Rwanda?",
    answer: "Work permits (Class C) for foreign employees are processed through the Rwanda Development Board (RDB). With complete documentation, permits are issued within 5-10 business days."
  },
  {
    question: "What tax incentives are available for investors?",
    answer: "Key incentives include: 7-year corporate income tax holiday for strategic sectors, 0% import duty on machinery, 15% preferential CIT rate for exports, and VAT exemptions on tourism services."
  },
  {
    question: "Is Rwanda safe for foreign investors?",
    answer: "Rwanda is consistently ranked as one of the safest countries in Africa with low corruption, political stability, and strong rule of law. It ranked 2nd in Africa on the 2023 Corruption Perceptions Index."
  },
  {
    question: "What documents do I need for company registration?",
    answer: "Required documents include: passport copies of shareholders and directors, proof of address, company name reservation, and memorandum of association. We handle all document preparation."
  },
  {
    question: "Can I open a bank account as a foreigner?",
    answer: "Yes. Foreigners can open both personal and corporate bank accounts in Rwanda. Requirements include valid passport, company registration documents (for corporate accounts), and proof of address."
  },
  {
    question: "What is the corporate tax rate in Rwanda?",
    answer: "The standard corporate income tax rate is 30%. However, reduced rates apply to: newly listed companies (20%), exports (15%), and companies in Free Trade Zones (0% for 10 years)."
  },
  {
    question: "How can I contact Bonet Elite for support?",
    answer: "You can reach us via WhatsApp at +250 726 300 260 (available 24/7), email at info@bonet.rw, or book a consultation through our website. Our office hours are Monday-Friday, 8AM-6PM CAT."
  }
];

export default function FAQClient() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div 
        className="relative w-full h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/image/3.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center px-4">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest mb-4">
            Help Center
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight">
            Frequently Asked <span className="text-[#C9A84C]">Questions</span>
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-xl p-4 flex items-center gap-3 border border-gray-300 hover:border-gray-400 focus-within:border-[#C9A84C] focus-within:ring-2 focus-within:ring-[#C9A84C]/20 transition-colors duration-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            className="flex-1 outline-none text-gray-800 bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#C9A84C] flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No questions found matching your search.
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-white/80 mb-6">
            Our team is ready to help with your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Us
            </a>
            <a
              href="https://wa.me/250726300260"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
