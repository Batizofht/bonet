import React from "react";
import HomePageClient from "./pageClient";
export const metadata = {
  title: "Business Setup & Travel Services Rwanda | Bonet Elite",
  description:
    "Business setup, travel, HR and investment support in Rwanda. Hotel booking, company registration, consulting and VIP services in Kigali.",
  keywords:
    "Bonet Elite Services Rwanda, travel Rwanda, business setup Rwanda, investment in Rwanda, VIP concierge Rwanda, luxury travel Kigali, HR services Rwanda, executive services Rwanda, tourism Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/",
    title: "Business Setup & Travel Services Rwanda | Bonet Elite",
    description:
      "Business setup, travel, HR and investment support in Rwanda. Hotel booking, company registration, consulting and VIP services in Kigali.",
    images: ["https://bonet.rw/assets/images/logo.png"],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Setup & Travel Services Rwanda | Bonet Elite",
    description:
      "Business setup, travel, HR and investment support in Rwanda. Hotel booking, company registration, consulting and VIP services in Kigali.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
  
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
    <HomePageClient />
    </div>
  );
}
