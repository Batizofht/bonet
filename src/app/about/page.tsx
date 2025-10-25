// src/app/about/page.tsx
import React from "react";
import AboutPageClient from "./pageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us | Bonet Elite Services Rwanda",
  description:
    "Learn about Bonet Elite Services, your trusted partner for travel, business, and investment in Rwanda. Discover our mission, vision, expertise, and commitment to excellence.",
  keywords:
    "About Bonet Elite Services, Rwanda concierge, business consulting Rwanda, VIP services Rwanda, luxury travel Rwanda, investment support Rwanda, mission vision Bonet Elite",
  openGraph: {
    title: "About Us | Bonet Elite Services Rwanda",
    description:
      "Bonet Elite Services is dedicated to simplifying travel, business setup, and investment in Rwanda. Learn more about our vision, expertise, and tailored services.",
    url: "https://www.bonet.rw/about",
    images: [
      {
        url: "https://www.bonet.rw/assets/images/logo.png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Bonet Elite Services Rwanda",
    description:
      "Discover Bonet Elite Services’ mission and values. We provide trusted concierge, business, and VIP services for investors and travelers in Rwanda.",
    images: ["https://www.bonet.rw/assets/images/logo.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen text-center text-white">
   <AboutPageClient />

    </div>
  );
}
