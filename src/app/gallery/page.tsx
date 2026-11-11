import GalleryClient from "./GalleryClient";

export const metadata = {
  title: "Visit Rwanda | Destinations & Attractions",
  description:
    "Rwanda's top destinations: Volcanoes National Park, Lake Kivu, Akagera, Nyungwe Forest and the Kigali Genocide Memorial. Plan your trip with us.",
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
        url: "https://bonet.rw/assets/images/bonet-og.png",
        width: 1200,
        height: 630,
        alt: "Rwanda Destinations Gallery",
      },
    ],
    siteName: "Bonet Elite Services",
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
