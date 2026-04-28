// app/gallery/page.tsx - Visit Rwanda Gallery Page
import React from "react";
import Gallery from "../../components/visitrwanda";

export const metadata = {
  title: "Visit Rwanda | Destinations & Attractions | Bonet Elite",
  description:
    "Explore Rwanda's top destinations: Volcanoes National Park, Lake Kivu, Akagera, Nyungwe Forest, Kigali Genocide Memorial, and more. Plan your trip with Bonet Elite.",
  keywords:
    "Rwanda destinations, Volcanoes National Park, Lake Kivu, gorilla trekking Rwanda, Akagera safari, Nyungwe Forest, Kigali attractions, Rwanda tourism",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/gallery" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/gallery",
    title: "Visit Rwanda | Destinations & Attractions | Bonet Elite",
    description:
      "Explore Rwanda's top destinations: Volcanoes National Park, Lake Kivu, Akagera, Nyungwe Forest, and more.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Rwanda Destinations Gallery",
      },
    ],
    siteName: "Bonet Elite Services",
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-900 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Visit <span className="text-[#C9A84C]">Rwanda</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover the Land of a Thousand Hills — from mountain gorillas to pristine lakes, 
            vibrant cities to ancient forests.
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <Gallery />

      {/* CTA Section */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Plan Your Rwanda Experience
          </h2>
          <p className="text-gray-600 mb-6">
            From luxury accommodation to curated itineraries — we handle every detail of your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/travel"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
            >
              Executive Travel Services
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#C9A84C] text-[#C9A84C] font-semibold rounded-xl hover:bg-[#C9A84C]/10 transition-colors"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
