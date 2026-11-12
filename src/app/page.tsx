import React from "react";
import HomePageClient from "./pageClient";
export const metadata = {
  title: { absolute: "Invest in Rwanda With Confidence | Bonet Elite Services" },
  description:
    "Register your company in Rwanda online with zero minimum capital. Tax incentives, HR, relocation and executive travel support from one Kigali team.",
  keywords:
    "invest Rwanda, business setup Rwanda, company registration Rwanda, foreign investment Rwanda, Bonet Elite Services, Rwanda tax incentives",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/",
    title: "Invest in Rwanda With Confidence | Bonet Elite Services",
    description:
      "Zero minimum capital. Fast, fully online company registration. 15% preferential corporate tax for priority sectors. Business, HR, relocation and executive travel support in Rwanda.",
    images: ["https://bonet.rw/assets/images/bonet-og.png"],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invest in Rwanda With Confidence | Bonet Elite Services",
    description:
      "Zero minimum capital. Fast, fully online company registration. 15% preferential corporate tax for priority sectors. Business, HR, relocation and executive travel support in Rwanda.",
    images: ["https://bonet.rw/assets/images/bonet-og.png"],
  },
  
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
    <HomePageClient />
    </div>
  );
}
