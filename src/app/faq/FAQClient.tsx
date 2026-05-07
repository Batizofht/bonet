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
          "It depends on your nationality. Many travelers get a 30‑day visa on arrival (some free, some paid). If you must apply before travel, use Irembo: https://irembo.gov.rw. Always confirm current rules with DGIE: https://www.migration.gov.rw."
      },
      {
        question: "What is the difference between a visa and a residence permit?",
        answer:
          "A visa is for short stays (commonly 30–90 days). A residence permit is for long‑term stay (usually 1–2 years, renewable) tied to work, investment, study, family, or retirement. If you plan to stay or operate in Rwanda beyond 90 days, you typically need a residence permit."
      },
      {
        question: "Which residence permit do I need as an investor?",
        answer:
          "If you register a company and meet investor requirements, you may qualify for an investor permit (often up to 2 years, renewable). Thresholds and classes can change, so confirm with DGIE: https://www.migration.gov.rw and RDB: https://rdb.rw."
      },
      {
        question: "How do I get a work permit?",
        answer:
          "Your employer applies through Irembo: https://irembo.gov.rw. Common requirements include an employment contract, qualifications, a criminal record certificate, valid passport, and a photo. Processing often takes around 5–15 working days depending on the case."
      },
      {
        question: "Can I work remotely from Rwanda for a foreign company?",
        answer:
          "Yes, but you still need a legal basis to stay (visa or a residence permit). For longer stays, confirm permit options with DGIE: https://www.migration.gov.rw. If you stay more than 183 days, you may become a Rwanda tax resident—confirm with RRA: https://www.rra.gov.rw."
      },
      {
        question: "Can my spouse and children join me?",
        answer:
          "Yes. Permit holders can usually sponsor dependents (spouse and children under 18). You may need certified marriage/birth certificates (translated and apostilled/legalized), proof of means, and copies of the sponsor’s permit and passport. Check DGIE guidance: https://www.migration.gov.rw."
      },
      {
        question: "How long does it take to renew a permit?",
        answer:
          "Apply early (at least 30 days before expiry). Renewals via Irembo often take around 5–10 working days, but timelines vary. Avoid expiry because it can trigger fines and impact future applications. Portal: https://irembo.gov.rw."
      },
      {
        question: "What documents do I need to apostille or legalize before coming?",
        answer:
          "Common documents include birth/marriage certificates, highest academic certificate, professional certificates, criminal record certificate (recent), and any relevant company documents. Requirements vary by permit type—confirm with DGIE: https://www.migration.gov.rw."
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
          "Online registration via RDB can be fast once documents are ready (often within hours to a few working days). The real work is preparing correct articles, shareholder IDs, share capital declaration, and a valid address. Authority: https://rdb.rw."
      },
      {
        question: "Can a foreigner own 100% of a Rwandan company?",
        answer:
          "Yes. Rwanda generally allows 100% foreign ownership in most sectors and does not require a local partner. A few sensitive sectors have specific rules—confirm for your sector with RDB: https://rdb.rw."
      },
      {
        question: "What is the minimum capital to start a company?",
        answer:
          "There is typically no fixed statutory minimum share capital for a private limited company, but practical requirements depend on your business and banking/permit needs. For investor permit or incentives, higher investment commitments may apply—confirm with RDB: https://rdb.rw."
      },
      {
        question: "What investment incentives can I claim?",
        answer:
          "Incentives depend on sector and thresholds and may include tax holidays, accelerated depreciation, VAT/customs exemptions, and industrial park benefits. Incentives are conditional—confirm current rules with RDB: https://rdb.rw before structuring your application."
      },
      {
        question: "Do I need a physical office to register a company?",
        answer:
          "You need a registered address that is real and verifiable. It can be a virtual office, coworking address, or leased space, as long as official documents can be served there."
      },
      {
        question: "What sectors are most open to foreign investment right now?",
        answer:
          "Common active sectors include ICT, financial services (KIFC), tourism and hospitality, agro‑processing, manufacturing, mining, energy, construction, and education. Confirm incentives and sector notes with RDB: https://rdb.rw and KIFC: https://kifc.rw."
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
          "Yes. Banks commonly require a passport, residence/work permit (or non‑resident status documents), proof of address, and source‑of‑funds evidence. Requirements vary by bank and your residency status."
      },
      {
        question: "How long does it take to open a corporate account?",
        answer:
          "After incorporation and a TIN, corporate account opening often takes around 5–10 working days. Banks usually request incorporation certificate, articles, TIN, board resolution, and KYC for signatories and beneficial owners."
      },
      {
        question: "What currencies can I hold?",
        answer:
          "Many banks offer accounts in RWF, USD, EUR, and GBP. Multi‑currency accounts are common. Foreign exchange reporting rules can apply above thresholds—see BNR: https://www.bnr.rw."
      },
      {
        question: "Can I repatriate profits and capital?",
        answer:
          "Generally yes, once taxes are compliant. Banks may request a tax clearance from RRA for outward transfers. Confirm current requirements with RRA: https://www.rra.gov.rw and your bank."
      },
      {
        question: "Is mobile money widely used?",
        answer:
          "Yes. Mobile money is used widely for everyday payments and many official payments. Setting up a SIM and mobile money wallet is one of the most practical first steps after arrival."
      }
    ]
  },
  {
    id: "tax",
    title: "Tax and Compliance",
    items: [
      {
        question: "What taxes will my Rwandan company pay?",
        answer:
          "Common taxes include Corporate Income Tax, VAT (if registered), PAYE on salaries, RSSB social security contributions, and withholding taxes on certain payments. Rates and rules can change—confirm with RRA: https://www.rra.gov.rw and RSSB: https://www.rssb.rw."
      },
      {
        question: "When am I a tax resident in Rwanda?",
        answer:
          "You may become a tax resident if you stay more than 183 days in a 12‑month period or meet other residency tests. Tax residents may be taxed on worldwide income. Confirm with RRA: https://www.rra.gov.rw."
      },
      {
        question: "Do I need to file taxes if my company has no revenue yet?",
        answer:
          "Often yes. Dormant companies may still need filings (e.g., annual returns and certain monthly returns if registered). Missing filings can trigger penalties even with zero revenue. Confirm obligations with RRA: https://www.rra.gov.rw."
      },
      {
        question: "What is a TIN and how do I get one?",
        answer:
          "A TIN (Taxpayer Identification Number) is required for many formal activities. Companies typically receive a TIN at incorporation; individuals apply via RRA’s portal. Authority: https://www.rra.gov.rw."
      },
      {
        question: "Does Rwanda have double-taxation treaties?",
        answer:
          "Yes, Rwanda has DTAs with multiple countries and the list changes over time. DTAs can reduce withholding tax rates if claimed properly. Confirm the current list and process with RRA: https://www.rra.gov.rw."
      }
    ]
  },
  {
    id: "employment",
    title: "Employment and Human Resources",
    items: [
      {
        question: "What are the basic labour rules I need to know?",
        answer:
          "Key rules cover working hours, annual leave, termination notice, and due process for dismissal. Compliance matters because disputes can lead to damages for procedural errors. For official guidance, consult MINALOC/Labour or a qualified advisor."
      },
      {
        question: "Can I hire foreign staff?",
        answer:
          "Yes, but each foreign hire generally needs a work permit, and you may need to justify specialized skills or knowledge‑transfer needs. Work permits are managed through Irembo: https://irembo.gov.rw and DGIE: https://www.migration.gov.rw."
      },
      {
        question: "What is the minimum wage?",
        answer:
          "Rwanda does not always have a single universal minimum wage across all sectors; practical market rates vary. Always document payments and ensure PAYE and RSSB compliance where applicable. Check with RRA: https://www.rra.gov.rw and RSSB: https://www.rssb.rw."
      },
      {
        question: "Are employment contracts mandatory?",
        answer:
          "For longer employment relationships, written contracts are strongly recommended and often required in practice. Contracts should be compliant and available for inspection. Bonet can draft compliant bilingual contracts and onboarding documents."
      }
    ]
  },
  {
    id: "housing",
    title: "Housing, Real Estate and Land",
    items: [
      {
        question: "Can foreigners buy property in Rwanda?",
        answer:
          "Foreigners can typically hold long‑term land rights via leases (often up to 99 years, renewable) and can own buildings on that land. Rules can vary by structure—confirm via the National Land Authority: https://www.lands.rw."
      },
      {
        question: "How much should I budget for rent in Kigali?",
        answer:
          "Rent varies widely by neighborhood, size, and furnishing. For current market ranges, consult local agents and verify what is included (utilities, security, generator/water tank)."
      },
      {
        question: "Are leases negotiable?",
        answer:
          "Yes. Typical terms are 12 months with upfront payment and a deposit. Always insist on a written contract, inventory list, and clarity on maintenance responsibilities."
      },
      {
        question: "How safe are the residential neighborhoods?",
        answer:
          "Kigali is widely considered one of the safer capital cities in the region. Popular expat areas are generally secure, but always do a site visit, confirm security arrangements, and choose a location that fits your routine."
      }
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare and Insurance",
    items: [
      {
        question: "Is the healthcare system foreigner-friendly?",
        answer:
          "Kigali has reliable private healthcare and pharmacies, with referral options for complex cases. If you need specialized treatment, many residents also travel abroad depending on the situation and insurance coverage."
      },
      {
        question: "Do I need health insurance?",
        answer:
          "Strongly recommended. Options include international cover (for regional/global treatment) and local private plans. Coverage requirements depend on your employer and immigration status, so confirm your best option before arrival."
      },
      {
        question: "What vaccinations and health prep do I need?",
        answer:
          "Yellow fever proof may be required depending on your travel history. Common recommendations include Hep A/B, typhoid, tetanus, and routine boosters. For current entry requirements, verify with your airline and Rwanda border/health guidance."
      }
    ]
  },
  {
    id: "education",
    title: "Education and Schools",
    items: [
      {
        question: "What international schools operate in Kigali?",
        answer:
          "Kigali has several international curriculum options (IB, American, French and others). Availability changes, so shortlist early and contact schools directly to confirm admissions windows and fees."
      },
      {
        question: "Is enrollment competitive?",
        answer:
          "Yes for top schools. Apply well in advance and prepare transcripts, recommendations, interviews, and assessments as required by the school."
      }
    ]
  },
  {
    id: "transport",
    title: "Transportation and Driving",
    items: [
      {
        question: "Can I drive with my foreign licence?",
        answer:
          "You may be able to drive using an international driving permit (IDP) for a limited period, then convert to a Rwandan licence. For current conversion rules, confirm with Rwanda National Police: https://www.police.gov.rw."
      },
      {
        question: "Should I buy or rent a car?",
        answer:
          "If you’ll stay long‑term, buying can make sense, but import duties and landed costs must be calculated carefully. Short‑term stays often work best with rentals or driver‑included services."
      },
      {
        question: "Are taxis and ride-hailing available?",
        answer:
          "Yes. Kigali has taxi and ride services, and moto taxis are widely used. For safer, metered rides, use established platforms where available."
      },
      {
        question: "How is public transport?",
        answer:
          "City buses cover many routes at low cost and use stored‑value cards. Inter‑city coaches are available for major towns. Availability and routes evolve, so check current operator schedules."
      }
    ]
  },
  {
    id: "utilities",
    title: "Utilities, Internet and Mobile",
    items: [
      {
        question: "How do I get a SIM card?",
        answer:
          "Bring your passport. SIMs are available at the airport and operator shops. Registration usually requires biometric capture. Activate mobile money if you will make everyday payments quickly."
      },
      {
        question: "How fast and reliable is internet?",
        answer:
          "Kigali has fibre coverage in many areas and 4G/5G mobile data. Reliability is generally good, but outages happen—many residents keep a mobile data backup."
      },
      {
        question: "How do I set up electricity and water?",
        answer:
          "Many rentals use prepaid meters. Top‑ups can be done via mobile money. New connections for new builds take longer and require documentation and inspections depending on the provider."
      }
    ]
  },
  {
    id: "customs",
    title: "Customs, Imports and Relocation",
    items: [
      {
        question: "Can I import my household goods duty-free?",
        answer:
          "In some cases, yes, depending on your immigration status and timing. Customs rules change, so confirm eligibility and documentation requirements with RRA: https://www.rra.gov.rw and use a licensed clearing agent."
      },
      {
        question: "What can I not bring in?",
        answer:
          "Plastic bags are banned. Some items (e.g., drones) may require clearance, and restricted goods exist. Always check RRA customs guidance before shipping: https://www.rra.gov.rw."
      },
      {
        question: "How do I ship a container to Rwanda?",
        answer:
          "Most shipments route via regional ports and then move inland by road/rail. Lead times vary by origin and forwarder. Use a reputable forwarder with Rwanda-based agents and budget extra time for clearance."
      }
    ]
  },
  {
    id: "culture",
    title: "Culture, Language and Daily Life",
    items: [
      {
        question: "What languages do people speak?",
        answer:
          "Rwanda’s official languages include Kinyarwanda, English, French and Swahili. English is widely used in government and business, but basic Kinyarwanda greetings help a lot in daily life."
      },
      {
        question: "Is Kigali safe for women, families and LGBTQ+ travelers?",
        answer:
          "Kigali is generally very safe with low street crime. Rwanda is socially conservative—public displays of affection are uncommon. Use normal travel precautions and follow local norms."
      },
      {
        question: "What is Umuganda?",
        answer:
          "Umuganda is monthly community service held on the last Saturday of the month (typically morning). Many shops close and traffic is restricted. Foreigners are welcome to participate in their neighborhood."
      },
      {
        question: "Are there cultural rules I should know?",
        answer:
          "Yes. Be respectful when discussing sensitive history, dress neatly for business settings, and follow local etiquette. When unsure, ask a local colleague or guide—Rwandans are generally helpful and direct."
      },
      {
        question: "What is the cost of living for a single professional?",
        answer:
          "Costs vary by rent and lifestyle. Imported groceries and international schooling are the biggest drivers; local transport and local food can be affordable. Create a budget based on your neighborhood and requirements."
      }
    ]
  },
  {
    id: "safety",
    title: "Safety, Emergencies and Legal Matters",
    items: [
      {
        question: "What are the emergency numbers?",
        answer:
          "Common numbers used in Rwanda include Police 112, Ambulance 912, Fire 111 and Traffic Accident 113. Save them on day one and confirm locally, as hotlines can change."
      },
      {
        question: "Where do I register with my embassy?",
        answer:
          "Use your embassy’s online consular registration (if offered) to register your presence. Kigali has many resident missions; check your embassy website for the correct registration process and emergency contacts."
      },
      {
        question: "What if I have a legal dispute?",
        answer:
          "Commercial disputes can go through Rwanda’s courts or arbitration. If you have a dispute, document everything and get professional legal advice early. Arbitration information: https://kiac.org.rw."
      },
      {
        question: "Is bribery a problem?",
        answer:
          "Rwanda has a strong anti‑corruption stance. Do not offer informal payments—this is illegal and risky for your status. If you face issues, follow formal complaint/reporting channels."
      }
    ]
  }
];

const bonetHelp = {
  title: "How Bonet Helps",
  description:
    "Bonet Elite Services Ltd is Kigali-based and helps foreigners make Rwanda work—end-to-end, in English, French and Chinese.",
  services: [
    "Visa, work permit and residence permit applications and renewals",
    "Company registration with RDB and TIN setup with RRA",
    "Investment certificate and incentive applications",
    "Bank account opening (corporate and personal)",
    "Tax registration, monthly compliance and accounting",
    "HR, payroll, recruitment and contract drafting",
    "Office and home search, lease negotiation, utilities setup",
    "Driver’s licence conversion and car purchase support",
    "School search and enrollment for accompanying children",
    "Executive travel, airport pickup, and concierge support"
  ],
};

const officialLinks = [
  { label: "Irembo (one-stop government services)", href: "https://irembo.gov.rw" },
  { label: "Rwanda Development Board (RDB)", href: "https://rdb.rw" },
  { label: "Directorate General of Immigration & Emigration (DGIE)", href: "https://www.migration.gov.rw" },
  { label: "Rwanda Revenue Authority (RRA)", href: "https://www.rra.gov.rw" },
  { label: "National Bank of Rwanda (BNR)", href: "https://www.bnr.rw" },
  { label: "Rwanda Social Security Board (RSSB)", href: "https://www.rssb.rw" },
  { label: "National Land Authority (NLA)", href: "https://www.lands.rw" },
  { label: "Kigali International Financial Centre (KIFC)", href: "https://kifc.rw" },
  { label: "Rwanda National Police", href: "https://www.police.gov.rw" },
  { label: "Rwanda Investigation Bureau (RIB)", href: "https://www.rib.gov.rw" },
  { label: "Kigali International Arbitration Centre (KIAC)", href: "https://kiac.org.rw" },
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
    <div id="top" className="min-h-screen bg-gray-50">
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
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{bonetHelp.title}</h2>
          <p className="text-gray-600 leading-relaxed mb-5">{bonetHelp.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bonetHelp.services.map((service) => (
              <div key={service} className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 text-[#C9A84C] flex-shrink-0" />
                <span className="text-sm text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Official Government Links</h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            For fees, processing times, and the latest requirements, always confirm directly with the official authorities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {officialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-gray-800 hover:text-[#C9A84C] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
  <div className="w-full">
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
