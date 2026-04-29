// app/gallery/page.tsx - Visit Rwanda Gallery Page
import React from "react";
import { redirect } from "next/navigation";
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
  redirect("/explore-rwanda");
}
