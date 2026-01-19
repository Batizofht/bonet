import React from "react";
import HomePageClient from "./pageClient";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Bonet Elite Services | Travel, Business & Investment Support in Rwanda",
  description:
    "Your trusted partner for travel, business, and investment in Rwanda. We simplify your journey with tailored hospitality, business setup, consulting, HR, and VIP executive services.",
  keywords:
    "Bonet Elite Services Rwanda, travel Rwanda, business setup Rwanda, investment in Rwanda, VIP concierge Rwanda, luxury travel Kigali, HR services Rwanda, executive services Rwanda, tourism Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://www.bonet.rw/" },
  openGraph: {
    type: "website",
    url: "https://www.bonet.rw/",
    title: "Bonet Elite Services | Travel, Business & Investment in Rwanda",
    description:
      "From hotel booking and transport to business registration, consulting, and VIP services — Bonet Elite Services is your one-stop solution in Rwanda.",
    images: ["https://www.bonet.rw/images/bonet-preview.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bonet Elite Services | Travel, Business & Investment in Rwanda",
    description:
      "Your trusted partner for seamless travel, business setup, consulting, and investment support in Rwanda.",
    images: ["https://www.bonet.rw/images/bonet-preview.jpg"],
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
    <HomePageClient />
    </div>
  );
}
