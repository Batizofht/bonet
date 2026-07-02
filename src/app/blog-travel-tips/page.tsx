
import FirstService from "../../services/firstservice";
import TravelTips from "../../blogs/trip";
export const metadata = {
  title: "Travel Tips for Rwanda",
  description:
    "Essential travel tips for visiting Rwanda: visa requirements, cultural etiquette, top destinations, safety insights, and the best times to visit.",
  keywords:
    "Rwanda travel tips, visit Rwanda guide, Rwanda tourism, Rwanda visa requirements, Kigali travel, Rwanda culture, Bonet Elite Services blog",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/blog-travel-tips" },
  openGraph: {
    type: "article",
    url: "https://bonet.rw/blog/travel-tips",
    title: "Travel Tips for Rwanda",
    description:
      "Learn everything you need for a smooth trip to Rwanda — from cultural etiquette and safety to must-visit destinations and travel essentials.",
    images: [
      {
        url: "https://bonet.rw/images/blog-travel-preview.jpg",
        width: 800,
        height: 600,
        alt: "Travel Tips for Rwanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Tips for Rwanda",
    description:
      "Discover travel essentials and pro tips for Rwanda with Bonet Elite Services: visas, safety, culture, and tourism highlights.",
    images: ["https://bonet.rw/images/blog-travel-preview.jpg"],
  },
};

export default function BlogTravelTipsPage() {
  return (
    <div className="min-h-screen">
      <FirstService
        image="/image/3.jpg"
        subtitleKey="pageHero.blogTravel.subtitle"
        titleKey="pageHero.blogTravel.title"
        descriptionKey="pageHero.blogTravel.desc"
      />
      <TravelTips />
    </div>
  );
}
