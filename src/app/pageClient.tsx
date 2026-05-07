"use client"
import React, { Suspense, lazy, useEffect, useState } from "react";
import FirstHome from "../components/firsthome";

// Lazy load below-the-fold components
const WhyChooseBonet = lazy(() => import("../services/whychoose"));
const TrustIndicators = lazy(() => import("../components/TrustIndicators"));
const FeaturedResources = lazy(() => import("../components/resources"));
const FAQ = lazy(() => import("../components/footer"));

export default function HomePageClient() {
  const greetings = ["Muraho.", "Karibu.", "Bienvenue.", "Welcome."];
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Homepage Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Bonet Elite Services",
              "url": "https://bonet.rw",
              "logo": "https://bonet.rw/assets/images/logo.png",
              "image": "https://bonet.rw/assets/images/logo.png",
              "description": "Business setup, travel, HR and investment support in Rwanda",
              "telephone": "+250726300260",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kimironko Bus Station Area",
                "addressLocality": "Kigali",
                "addressCountry": "RW"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-1.9403",
                "longitude": "29.8739"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Rwanda"
              },
              "priceRange": "$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00",
                  "description": "Office hours - available 24/7 via WhatsApp for urgent inquiries"
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+250726300260",
                "contactType": "customer service",
                "availableLanguage": ["English", "French", "Chinese"],
                "areaServed": "Global",
                "contactOption": "WhatsApp",
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "opens": "00:00",
                  "closes": "23:59"
                }
              },
              "sameAs": [
                "https://www.facebook.com/boneteliteservices",
                "https://www.linkedin.com/company/bonet-elite-services",
                "https://twitter.com/bonetelite"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Bonet Elite Services",
              "url": "https://bonet.rw",
              "description": "Premier travel, business, and investment services in Rwanda",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://bonet.rw/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Bonet Elite Services",
                "url": "https://bonet.rw"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How long does business registration take in Rwanda?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "With Bonet Elite Services, company registration takes just 6 hours. We handle the entire process with RDB (Rwanda Development Board) including name reservation, certificate issuance, TIN assignment, and RSSB registration — all in one streamlined process."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can foreigners own 100% of a Rwandan company?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Rwanda allows 100% foreign ownership in nearly all business sectors. No local partner is required, making it one of Africa's most investor-friendly jurisdictions for international entrepreneurs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What tax incentives are available for foreign investors?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Rwanda offers significant tax incentives including: 0% corporate tax for qualifying international HQs, 15% preferential rate for strategic sectors (ICT, agriculture, tourism), 7-year tax holidays for large investments, capital gains exemptions, and VAT refunds for exporters. An RDB Investment Certificate is required to access these benefits."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the minimum capital required to start a business?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "There is no minimum capital requirement for most business types in Rwanda. The standard registration fee is free. This makes Rwanda one of the most accessible places to start a business in Africa."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I access regional and international markets from Rwanda?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Rwanda provides access to 1.6+ billion consumers through trade agreements: EAC (152M consumers, duty-free), COMESA (389M consumers), EU (450M consumers, duty-free via EPA), US/AGOA (330M consumers, 6,500+ product lines duty-free), and AfCFTA (1.3B consumers across 54 African nations)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you help with work permits and residency for foreign employees?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we handle the entire immigration workflow including work permits for foreign employees, investor visas for business owners, and dependent residency permits for families. We manage applications, documentation, and biometric registration with Rwandan immigration authorities."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What ongoing compliance support do you provide?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We provide comprehensive compliance support including: monthly tax filing with RRA, annual returns with RDB, payroll and RSSB contributions, license renewals, audit preparation, and regulatory updates. Our team ensures your business stays compliant with Rwandan law."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can you help with executive housing and relocation?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Our relocation services include: executive housing in prime Kigali neighborhoods (Kiyovu, Nyarutarama, Kimihurura), airport transfers, school enrollment for children, banking setup, vehicle leasing, and daily operational support. We make your transition to Rwanda seamless."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which sectors offer the best investment opportunities in Rwanda?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "High-growth sectors include: ICT & Digital (4G nationwide, tech hubs), Tourism (gorilla trekking, eco-tourism, luxury hospitality), Manufacturing (special economic zones with tax incentives), Agriculture (coffee, tea, horticulture exports), Energy (renewable focus), and Finance (emerging fintech ecosystem)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I get started with Bonet Elite Services?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Start with a free 30-minute consultation. We'll assess your needs, explain the process, and provide a clear roadmap. Contact us via WhatsApp at +250 726 300 260, email info@bonet.rw, or book through our website. We support English, French, and Chinese."
                  }
                }
              ]
            }
          ])
        }}
      />
      
      {/* Above the fold - load immediately */}
      <FirstHome />

      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-6 text-center">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            <span className="text-[#C9A84C] font-semibold transition-opacity duration-300">
              {greetings[greetingIndex]}
            </span>{" "}
            We are Bonet Elite Services. We help foreign investors and executives register their company, secure tax incentives, hire teams, relocate families, and travel through Rwanda — all under one roof.
          </p>
        </div>
      </div>

      {/* Homepage sections */}
     
       <Suspense fallback={<div className="h-40 bg-white" />}>
        <WhyChooseBonet />
      </Suspense>
     
      <Suspense fallback={<div className="h-40 bg-gray-50" />}>
        <TrustIndicators />
      </Suspense>

    

      <Suspense fallback={<div className="h-40 bg-white" />}>
        <FeaturedResources />
      </Suspense>

      <Suspense fallback={<div className="h-40 bg-white" />}>
        <FAQ />
      </Suspense>
    </div>
  );
}
