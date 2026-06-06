import React from "react";
import Image from "next/image";
import Link from "next/link";
import Gallery from "../../components/visitrwanda";

export const metadata = {
  title: "Visit Rwanda | Destinations & Attractions",
  description:
    "Explore Rwanda's top destinations: Volcanoes National Park, Lake Kivu, Akagera, Nyungwe Forest, Kigali Genocide Memorial, and more. Plan your trip with Bonet Elite.",
  keywords:
    "Rwanda destinations, Volcanoes National Park, Lake Kivu, gorilla trekking Rwanda, Akagera safari, Nyungwe Forest, Kigali attractions, Rwanda tourism",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/gallery" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/gallery",
    title: "Visit Rwanda | Destinations & Attractions",
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
      {/* Hero */}
      <div
        className="relative w-full h-[20vh] sm:h-[30vh] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <span className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">
            Discover Rwanda
          </span>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">
            Destinations & Experiences
          </h1>
          <p className="text-white/75 max-w-2xl mt-2 text-xs sm:text-sm leading-relaxed">
            A visual journey through the Land of a Thousand Hills
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "4", label: "National Parks" },
              { value: "1,000+", label: "Rolling Hills" },
              { value: "26°C", label: "Avg Temperature" },
              { value: "2hr", label: "Kigali Airport" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-[#C9A84C] mb-2">{item.value}</div>
                <p className="text-gray-700 font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Gallery from existing component */}
      <Gallery />

      {/* CTA */}
      <div
        className="relative w-full h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/image/1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative flex flex-col justify-center items-center text-center px-4 h-full">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Plan Your Rwanda Journey
          </h2>
          <p className="text-gray-300 mb-6 max-w-xl">
            From gorilla trekking to luxury stays — let us craft your perfect itinerary.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
          >
            Start Planning
          </Link>
        </div>
      </div>
    </div>
  );
}
