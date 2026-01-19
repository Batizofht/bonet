"use"
import VisitFirst from "../../services/VisitFirst";
import VisitRwanda from "../../visit/visit";
import WhyInvest from "../../visit/why";
export const metadata = {
  title: "Visit Rwanda | Bonet Elite Services",
  description:
    "Discover Rwanda with Bonet Elite Services. Explore tourism, investment opportunities, culture, and luxury experiences in the Land of a Thousand Hills.",
  keywords:
    "Visit Rwanda, Rwanda tourism, Rwanda investment, Kigali travel, Rwanda luxury services, Bonet Elite Services",
  authors: [{ name: "Bonet Elite Services" }],
  openGraph: {
    type: "website",
    url: "https://www.bonet.rw/visit-rwanda",
    title: "Visit Rwanda | Bonet Elite Services",
    description:
      "Plan your trip with Bonet Elite Services. Experience Rwanda’s breathtaking landscapes, business opportunities, and cultural treasures.",
    images: [
      {
        url: "https://www.bonet.rw/images/visit-rwanda-preview.jpg",
        width: 800,
        height: 600,
        alt: "Visit Rwanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Rwanda | Bonet Elite Services",
    description:
      "Explore Rwanda with Bonet Elite Services. Tourism, culture, and investment in the heart of Africa.",
    images: ["https://www.bonet.rw/images/visit-rwanda-preview.jpg"],
  },
};

export default function VisitRwandaPage() {
  return (
    <div className="min-h-screen">
      <VisitFirst />
      <VisitRwanda />
      <WhyInvest />
    </div>
  );
}
