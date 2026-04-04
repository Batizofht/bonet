// app/services/page.tsx
import React, { lazy, Suspense } from "react";
import FirstService from "../../services/firstservice";

// Lazy load BusinessRegistration since it's heavy
const LazyBusinessRegistration = lazy(() => import("../../blogs/busreg"));

export const metadata = {
  title: "Travel, HR & Business Services Rwanda | Bonet Elite",
  description: "Travel, HR, business setup and investment services in Rwanda. Hotel booking, company registration, consulting and transport in Kigali.",
  keywords: "Bonet Elite Services, premium services Rwanda, hotel reservations, apartment booking, transport service, tourism guides, luxury stays, comfortable homes, reliable transportation, expert guides",
  authors: [{ name: "Bonet Elite Services" }],
  openGraph: {
    type: "website",
    url: "https://bonet.rw/services",
    title: "Travel, HR & Business Services Rwanda | Bonet Elite",
    description: "Travel, HR, business setup and investment services in Rwanda. Hotel booking, company registration, consulting and transport in Kigali.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Bonet Elite Services - Travel, HR and Business Services in Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "Travel, HR & Business Services Rwanda | Bonet Elite",
    description: "Travel, HR, business setup and investment services in Rwanda. Hotel booking, company registration, consulting and transport in Kigali.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
  metadataBase: new URL("https://bonet.rw"),
  robots: "index, follow",
  alternates: {
    canonical: "https://bonet.rw/services"
  }
};

export default function PremiumServicesPage() {
  return (
    <div className="min-h-screen">
      <FirstService />
      <Suspense fallback={<div className="text-center py-8">Loading services...</div>}>
        <LazyBusinessRegistration />
      </Suspense>
    </div>
  );
}