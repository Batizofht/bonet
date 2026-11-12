import ExecutiveTravelClient from "./ExecutiveTravelClient";
import RelatedGuides from "@/components/insights/RelatedGuides";

export const metadata = {
  title: "Executive Travel & Hospitality in Rwanda",
  description:
    "Hotel bookings, airport transfers, tour guides, VIP concierge and gorilla trekking in Rwanda, arranged by one team in Kigali for business travellers.",
  keywords:
    "executive travel Rwanda, VIP concierge Rwanda, hotel booking Kigali, airport transfers Rwanda, tour guides Rwanda, gorilla trekking Rwanda, private tours Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/executive-travel" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/executive-travel",
    title: "Executive Travel & VIP Concierge Rwanda",
    description:
      "Luxury executive travel and VIP concierge services in Rwanda. Bespoke itineraries for discerning travelers.",
    images: [
      {
        url: "https://bonet.rw/assets/images/bonet-og.png",
        width: 800,
        height: 600,
        alt: "Executive Travel Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetPJ",
    title: "Executive Travel Rwanda",
    description: "Luxury executive travel and VIP concierge services in Rwanda.",
    images: ["https://bonet.rw/assets/images/bonet-og.png"],
  },
};

export default function ExecutiveTravelPage() {
  return (
    <>
      <ExecutiveTravelClient />
      <RelatedGuides service="/executive-travel" />
    </>
  );
}
