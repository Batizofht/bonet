// src/app/about/page.tsx
import React from "react";
import AboutPageClient from "./pageClient";

export const metadata = {
  title: "About Bonet Elite Services | Rwanda Business Experts",
  description:
    "Rwanda's trusted partner for travel, business setup and investment since 2019. Expert consulting, HR and VIP services in Kigali.",
  keywords:
    "About Bonet Elite Services, Rwanda concierge, business consulting Rwanda, VIP services Rwanda, luxury travel Rwanda, investment support Rwanda, mission vision Bonet Elite",
  alternates: { canonical: "https://bonet.rw/about" },
  openGraph: {
    title: "About Bonet Elite Services | Rwanda Business Experts",
    description:
      "Rwanda's trusted partner for travel, business setup and investment since 2019. Expert consulting, HR and VIP services in Kigali.",
    url: "https://bonet.rw/about",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
      },
    ],
    type: "website",
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Bonet Elite Services | Rwanda Business Experts",
    description:
      "Rwanda's trusted partner for travel, business setup and investment since 2019. Expert consulting, HR and VIP services in Kigali.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

const teamJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Prince Bonfils Bimenyimana",
    jobTitle: "Founder & Executive Chairman",
    worksFor: {
      "@type": "Organization",
      name: "Bonet Elite Services",
      url: "https://bonet.rw",
    },
    description:
      "A seasoned business strategist with over six years of executive leadership in finance, operations, and technology across Rwanda's private sector. Founded Bonet Elite Services to offer investors, entrepreneurs, and travelers a seamless premium experience from market entry to establishment.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jean Luc Shema",
    jobTitle: "Chief Financial Officer",
    worksFor: {
      "@type": "Organization",
      name: "Bonet Elite Services",
      url: "https://bonet.rw",
    },
    description:
      "Certified Public Accountant registered with ICPAR. Deep expertise in IFRS reporting, tax compliance, BNR regulatory frameworks, and financial management for regulated institutions.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Emmanuel Cubahiro",
    jobTitle: "Chief Legal Officer & Authorized Notary",
    worksFor: {
      "@type": "Organization",
      name: "Bonet Elite Services",
      url: "https://bonet.rw",
    },
    description:
      "Practicing lawyer registered with the Rwanda Bar Association and East Africa Law Society. Over a decade of experience in corporate law, contract drafting, and dispute resolution.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Diane Nyirabahire",
    jobTitle: "Senior Financial Advisor & Project Management Specialist",
    worksFor: {
      "@type": "Organization",
      name: "Bonet Elite Services",
      url: "https://bonet.rw",
    },
    description:
      "Over 7 years in financial reporting, tax compliance, and business process improvement. MBA in Project Management and Bachelor's in Accounting from the University of Rwanda.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ronald Mutabazi",
    jobTitle: "Director of Human Capital & Organizational Development",
    worksFor: {
      "@type": "Organization",
      name: "Bonet Elite Services",
      url: "https://bonet.rw",
    },
    description:
      "Over 12 years in human capital management covering talent acquisition, organizational development, and labor law compliance. Managing Director of Emet Hand Supply and Services Ltd.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />
      <AboutPageClient />
    </div>
  );
}
