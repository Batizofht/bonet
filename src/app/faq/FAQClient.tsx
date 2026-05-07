"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  ChevronDown,
  Search,
  MessageCircle,
  ArrowRight
} from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  title: string;
  items: FAQItem[];
};

const categories: FAQCategory[] = [
  {
    id: "visas",
    title: "Visas, Permits and Immigration",
    items: [
      {
        question: "Do I need a visa to enter Rwanda?",
        answer:
          "It depends on your nationality. Many travelers can get a 30-day visa on arrival. Rules and fees change, so confirm the latest list with DGIE before booking your flight: https://www.migration.gov.rw and Irembo: https://irembo.gov.rw."
      },
      {
        question: "What is the difference between a visa and a residence permit?",
        answer:
          "A visa is short-term entry (typically 30–90 days). A residence permit allows long-term stay (often 1–2 years, renewable) tied to work, investment, study, or family. If you plan to stay beyond 90 days, you usually need a permit."
      },
      {
        question: "How do I get a work permit?",
        answer:
          "Your employer typically applies via Irembo (https://irembo.gov.rw). You generally need an employment contract, qualifications, a clean criminal record, passport, and a photo. Processing can take around 5–15 working days depending on your case."
      }
    ]
  },
  {
    id: "business",
    title: "Business Registration and Investment",
    items: [
      {
        question: "How long does it take to register a company in Rwanda?",
        answer:
          "Online registration via RDB can take from 6 hours to a couple of working days once documents are ready. The main delay is preparing correct filings (shareholders, address, articles). We help clients prepare the file so it is accepted the first time."
      },
      {
        question: "Can a foreigner own 100% of a Rwandan company?",
        answer:
          "Yes. Rwanda allows 100% foreign ownership in almost every sector and there is generally no requirement for a local partner. A few sensitive sectors have special rules, but most commerce and services are fully open."
      },
      {
        question: "What investment incentives can I claim?",
        answer:
          "Incentives depend on your sector and thresholds. They may include tax holidays, accelerated depreciation, VAT/customs exemptions, and industrial park benefits. Always confirm current rules with RDB (https://rdb.rw) and structure your application carefully."
      }
    ]
  },
  {
    id: "banking",
    title: "Banking and Finance",
    items: [
      {
        question: "Can a foreigner open a bank account in Rwanda?",
        answer:
          "Yes. Banks typically require a valid passport, proof of address, and (often) a residence/work permit. Corporate accounts usually require incorporation documents and a TIN. Requirements vary by bank and your status (resident vs non-resident)."
      },
      {
        question: "Can I repatriate profits and capital?",
        answer:
          "Generally yes, subject to tax compliance. Banks may request a tax clearance from RRA before outward transfers. Confirm the latest requirements with RRA (https://www.rra.gov.rw) and your bank."
      }
    ]
  },
  {
    id: "tax",
    title: "Tax and Compliance",
    items: [
      {
        question: "Do I need to file taxes if my company has no revenue yet?",
        answer:
          "Often yes. Dormant companies may still need nil returns and other periodic filings depending on registration status. Missing filings can trigger automatic penalties. Confirm obligations with RRA: https://www.rra.gov.rw."
      },
      {
        question: "What is a TIN and how do I get one?",
        answer:
          "A TIN is a Taxpayer Identification Number. Companies usually receive one during incorporation; individuals apply through RRA’s eTax portal. Without a TIN, many formal transactions (invoicing, payroll, leases) become difficult."
      }
    ]
  },
  {
    id: "hr",
    title: "Employment and Human Resources",
    items: [
      {
        question: "Are employment contracts mandatory?",
        answer:
          "Yes for longer-term employment relationships. Contracts should be written and compliant with Rwandan labor law, and you should keep them ready for inspection. We help draft compliant contracts and set up HR frameworks for foreign-led companies."
      },
      {
        question: "Can I hire foreign staff?",
        answer:
          "Yes, but each foreign hire typically requires a work permit and justification. Authorities often expect the role to require specialized skills or be part of a knowledge-transfer plan."
      }
    ]
  }
];

export default function FAQClient() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const allItems = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.items.map((item) => ({ ...item, categoryId: cat.id, categoryTitle: cat.title }))
    );
  }, []);

  const filteredItems = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q)
    );
  }, [allItems, searchTerm]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: allItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

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

      {/* Category anchors */}
      <div className="max-w-3xl mx-auto px-4 pt-10">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-sm font-semibold text-gray-900 mb-3">Browse by category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors"
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {searchTerm.trim() ? (
          <div className="space-y-4">
            {filteredItems.map((faq, index) => (
              <div key={`${faq.categoryId}-${index}`} className="bg-white rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="pr-4">
                    <div className="text-xs font-semibold text-[#C9A84C] mb-1">{faq.categoryTitle}</div>
                    <div className="font-semibold text-gray-900">{faq.question}</div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C9A84C] flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</div>
                )}
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No questions found matching your search.
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((cat) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-24">
                <div className="flex items-end justify-between gap-4 mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">{cat.title}</h2>
                  <a href="#top" className="text-sm text-gray-500 hover:text-gray-900">Back to top</a>
                </div>

                <div className="space-y-4">
                  {cat.items.map((faq, index) => {
                    const globalIndex = allItems.findIndex(
                      (x) => x.categoryId === cat.id && x.question === faq.question
                    );

                    return (
                      <div key={index} className="bg-white rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-[#C9A84C] flex-shrink-0 transition-transform ${
                              openIndex === globalIndex ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openIndex === globalIndex && (
                          <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</div>
                        )}
                      </div>
                    );
                  })}
                </div>

               
              </section>
            ))}
          </div>
        )}
      </div>
            {/* CTA */}
  <div className="f-wull">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800  p-8 md:p-12 text-center">
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
