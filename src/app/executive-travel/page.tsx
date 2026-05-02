import ExecutiveTravelClient from "./ExecutiveTravelClient";

export const metadata = {
  title: "Executive Travel Rwanda | VIP Concierge | Bonet Elite",
  description:
    "Luxury executive travel and VIP concierge services in Rwanda. Gorilla trekking, luxury hotels, private transport, and bespoke itineraries for discerning travelers.",
  keywords:
    "executive travel Rwanda, VIP concierge Rwanda, luxury travel Rwanda, gorilla trekking Rwanda, private tours Rwanda",
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
        url: "https://bonet.rw/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Executive Travel Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "Executive Travel Rwanda | Bonet Elite",
    description: "Luxury executive travel and VIP concierge services in Rwanda.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

export default function ExecutiveTravelPage() {
  return <ExecutiveTravelClient />;
}
