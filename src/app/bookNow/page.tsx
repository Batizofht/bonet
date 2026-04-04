
// app/book/page.tsx
import React from "react";
import ContainerWithButtons from "../../book/container";
import Gallery from "../../components/visitrwanda";
export const metadata = {
  title: "Book Hotels & Services Rwanda | Bonet Elite",
  description:
    "Book hotels, apartments, transport and concierge services in Rwanda. Fast and secure reservations by Bonet Elite Services in Kigali.",
  keywords:
    "book hotels Rwanda, Rwanda concierge services, apartment booking Kigali, Rwanda transport booking, Bonet Elite Services",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/bookNow" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/bookNow",
    title: "Book Hotels & Services Rwanda | Bonet Elite",
    description:
      "Book hotels, apartments, transport and concierge services in Rwanda. Fast and secure reservations by Bonet Elite Services in Kigali.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Book Hotels and Services in Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "Book Hotels & Services Rwanda | Bonet Elite",
    description:
      "Book hotels, apartments, transport and concierge services in Rwanda. Fast and secure reservations by Bonet Elite Services.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
  metadataBase: new URL("https://bonet.rw"),
};

export default function BookPage() {
  return (
    <div className="min-h-screen">
  
      <ContainerWithButtons />
      <Gallery />
    </div>
  );
}
