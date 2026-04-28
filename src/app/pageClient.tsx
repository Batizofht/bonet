"use client"
import React, { Suspense, lazy } from "react";
import FirstHome from "../components/firsthome";

// Lazy load below-the-fold components
const WhyChooseBonet = lazy(() => import("../services/whychoose"));
const TrustIndicators = lazy(() => import("../components/TrustIndicators"));
const FeaturedResources = lazy(() => import("../components/resources"));
const FAQ = lazy(() => import("../components/footer"));

export default function HomePageClient() {
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
                "streetAddress": "Dubai Port Road, Masaka",
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
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+250726300260",
                "contactType": "customer service",
                "availableLanguage": ["English", "French", "Chinese"]
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
                  "name": "What services does Bonet Elite Services offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Bonet Elite Services offers comprehensive travel planning, business registration, investment consulting, VIP concierge services, HR support, hotel reservations, transport services, and tourism guides in Rwanda."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I start a business in Rwanda?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We provide complete business registration support including company registration, tax compliance, licensing, and ongoing business advisory services to help you establish and grow your business in Rwanda."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer investment opportunities in Rwanda?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we offer investment consulting services, market analysis, opportunity identification, and connection with local partners to help investors make informed decisions in Rwanda's growing economy."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What travel services do you provide?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We provide luxury hotel reservations, airport transfers, private transport, experienced tour guides, customized itineraries, and VIP handling services for travelers visiting Rwanda."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I contact Bonet Elite Services?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can contact us through our website at www.bonet.rw, call us at +250 726 300 260, or visit our office in Kigali. We offer support in English, French, and Chinese."
                  }
                }
              ]
            }
          ])
        }}
      />
      
      {/* Above the fold - load immediately */}
      <FirstHome />

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
