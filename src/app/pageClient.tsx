"use client";
import FirstHome from "../components/firsthome";
import WhyChooseBonet from "../services/whychoose";
import TrustIndicators from "../components/TrustIndicators";
import FeaturedResources from "../components/resources";
import FAQ from "../components/footer";

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://bonet.rw/#website",
    name: "Bonet Elite Services",
    url: "https://bonet.rw",
    inLanguage: ["en", "fr", "zh"],
    publisher: { "@id": "https://bonet.rw/#organization" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ["How long does business registration take in Rwanda?", "With Bonet Elite Services, company registration is fast and fully managed. We handle the entire process with RDB (Rwanda Development Board) including name reservation, certificate issuance, TIN assignment, and RSSB registration — all in one streamlined process."],
      ["Can foreigners own 100% of a Rwandan company?", "Yes, Rwanda allows 100% foreign ownership in nearly all business sectors. No local partner is required, making it one of Africa's most investor-friendly jurisdictions for international entrepreneurs."],
      ["What tax incentives are available for foreign investors?", "Rwanda offers significant tax incentives including: 0% corporate tax for qualifying international HQs, 15% preferential rate for strategic sectors (ICT, agriculture, tourism), 7-year tax holidays for large investments, capital gains exemptions, and VAT refunds for exporters. An RDB Investment Certificate is required to access these benefits."],
      ["What is the minimum capital required to start a business?", "There is no minimum capital requirement for most business types in Rwanda. The standard registration fee is free. This makes Rwanda one of the most accessible places to start a business in Africa."],
      ["Do you help with work permits and residency for foreign employees?", "Yes, we handle the entire immigration workflow including work permits for foreign employees, investor visas for business owners, and dependent residency permits for families."],
      ["Can you help with executive housing and relocation?", "Yes. Our relocation services include executive housing in prime Kigali neighbourhoods (Kiyovu, Nyarutarama, Kimihurura), airport transfers, school enrolment, banking setup, vehicle leasing, and daily operational support."],
      ["How do I get started with Bonet Elite Services?", "Start with a free 30-minute consultation. Contact us via WhatsApp at +250 726 300 260, email info@bonet.rw, or book through our website. We support English, French, and Chinese."],
    ].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
];

export default function HomePageClient() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <FirstHome />
      <WhyChooseBonet />
      <TrustIndicators />
      <FeaturedResources />
      <FAQ />
    </>
  );
}
