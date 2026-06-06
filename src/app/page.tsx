import React from "react";
import HomePageClient from "./pageClient";
export const metadata = {
  title: "Invest in Rwanda With Confidence | Bonet Elite Services",
  description:
    "Zero minimum capital. 6-hour company registration. 0% corporate tax for qualifying investments. Full-service business, HR, relocation and executive travel support in Rwanda.",
  keywords:
    "invest Rwanda, business setup Rwanda, company registration Rwanda, foreign investment Rwanda, Bonet Elite Services, Rwanda tax incentives",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/",
    title: "Invest in Rwanda With Confidence | Bonet Elite Services",
    description:
      "Zero minimum capital. 6-hour company registration. 0% corporate tax. Full-service business, HR, relocation and executive travel support in Rwanda.",
    images: ["https://bonet.rw/assets/images/logo.png"],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invest in Rwanda With Confidence | Bonet Elite Services",
    description:
      "Zero minimum capital. 6-hour company registration. 0% corporate tax. Full-service business, HR, relocation and executive travel support in Rwanda.",
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
