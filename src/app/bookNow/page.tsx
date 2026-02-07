
// app/book/page.tsx
import React from "react";
import ContainerWithButtons from "../../book/container";
import Gallery from "../../components/visitrwanda";
export const metadata = {
  title: "Book Hotels & Services in Rwanda | Bonet Elite Services",
  description:
    "Easily book hotels, apartments, transport, and concierge services with Bonet Elite Services. Secure and reliable bookings across Rwanda.",
  keywords:
    "book hotels Rwanda, Rwanda concierge services, apartment booking Kigali, Rwanda transport booking, Bonet Elite Services",
  authors: [{ name: "Bonet Elite Services" }],
  openGraph: {
    type: "website",
    url: "https://www.bonet.rw/book",
    title: "Book Hotels & Services in Rwanda | Bonet Elite Services",
    description:
      "Book hotels, apartments, transport, and concierge services in Rwanda with Bonet Elite Services. Fast, easy, and secure reservations.",
    images: [
      {
        url: "https://www.bonet.rw/images/book-preview.jpg",
        width: 800,
        height: 600,
        alt: "Book Hotels & Services in Rwanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "Book Hotels & Services in Rwanda | Bonet Elite Services",
    description:
      "Securely book hotels, apartments, transport, and concierge services in Rwanda with Bonet Elite Services.",
    images: ["https://www.bonet.rw/images/book-preview.jpg"],
  },
  metadataBase: new URL("https://www.bonet.rw"),
};

export default function BookPage() {
  return (
    <div className="min-h-screen">
  
      <ContainerWithButtons />
      <Gallery />
    </div>
  );
}
