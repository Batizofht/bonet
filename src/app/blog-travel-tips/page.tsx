
import FirstService from "../../services/firstservice";
import TravelTips from "../../blogs/trip";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Travel Tips for Rwanda | Bonet Elite Services Blog",
  description:
    "Essential travel tips for visiting Rwanda: visa requirements, cultural etiquette, top destinations, safety insights, and the best times to visit.",
  keywords:
    "Rwanda travel tips, visit Rwanda guide, Rwanda tourism, Rwanda visa requirements, Kigali travel, Rwanda culture, Bonet Elite Services blog",
  authors: [{ name: "Bonet Elite Services" }],
  openGraph: {
    type: "article",
    url: "https://www.bonet.rw/blog/travel-tips",
    title: "Travel Tips for Rwanda | Bonet Elite Services Blog",
    description:
      "Learn everything you need for a smooth trip to Rwanda — from cultural etiquette and safety to must-visit destinations and travel essentials.",
    images: [
      {
        url: "https://www.bonet.rw/images/blog-travel-preview.jpg",
        width: 800,
        height: 600,
        alt: "Travel Tips for Rwanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Tips for Rwanda | Bonet Elite Services Blog",
    description:
      "Discover travel essentials and pro tips for Rwanda with Bonet Elite Services: visas, safety, culture, and tourism highlights.",
    images: ["https://www.bonet.rw/images/blog-travel-preview.jpg"],
  },
};

export default function BlogTravelTipsPage() {
  return (
    <div className="bg-white min-h-screen text-center text-white">
      <FirstService />
      <TravelTips />
    </div>
  );
}
