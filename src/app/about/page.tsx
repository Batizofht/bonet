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

export default function AboutPage() {
  return (
    <div className="min-h-screen">
   <AboutPageClient />

    </div>
  );
}
