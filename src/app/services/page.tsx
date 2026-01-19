// app/services/page.tsx
import React from "react";
import FirstService from "../../services/firstservice";
import BusinessRegistration from "../../blogs/busreg";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Premium Services | Bonet Elite Services",
  description: "Hotel Reservations: Luxury stays with premium amenities. Apartment Booking: Comfortable homes away from home. Transport Service: Safe and reliable transportation. Tourism Guides: Explore with expert local guides.",
  keywords: "Bonet Elite Services, premium services Rwanda, hotel reservations, apartment booking, transport service, tourism guides, luxury stays, comfortable homes, reliable transportation, expert guides",
  authors: [{ name: "Bonet Elite Services" }],
  openGraph: {
    type: "website",
    url: "https://www.bonet.rw/services",
    title: "Premium Services | Bonet Elite Services",
    description: "Hotel Reservations: Luxury stays with premium amenities. Apartment Booking: Comfortable homes away from home. Transport Service: Safe and reliable transportation. Tourism Guides: Explore with expert local guides.",
    images: [
      {
        url: "https://www.bonet.rw/images/premium-services-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Bonet Elite Premium Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "Premium Services | Bonet Elite Services",
    description: "Hotel Reservations: Luxury stays. Apartment Booking: Comfortable homes. Transport Service: Safe transportation. Tourism Guides: Expert local guides.",
    images: ["https://www.bonet.rw/images/premium-services-preview.jpg"],
  },
  metadataBase: new URL("https://www.bonet.rw"),
  robots: "index, follow",
  alternates: {
    canonical: "https://www.bonet.rw/services"
  }
};

export default function PremiumServicesPage() {
  return (
    <div className="min-h-screen">
      <FirstService />
      <BusinessRegistration />
    </div>
  );
}