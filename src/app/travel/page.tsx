
import FirstService from "../../services/firstservice";
import HotelHospitality from "../../services/hotel";
export const metadata = {
  title: "Travel & Hospitality Services Rwanda | Bonet Elite",
  description:
    "Luxury travel and hospitality services in Rwanda. Hotel booking, airport transfers, tours and VIP handling in Kigali by Bonet Elite.",
  keywords:
    "Rwanda travel, hospitality services Rwanda, hotel booking Kigali, airport transfers Rwanda, VIP travel Rwanda, Bonet Elite Services",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/travel" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/travel",
    title: "Travel & Hospitality Services Rwanda | Bonet Elite",
    description:
      "Luxury travel and hospitality services in Rwanda. Hotel booking, airport transfers, tours and VIP handling in Kigali by Bonet Elite.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Travel and Hospitality Services in Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "Travel & Hospitality Services Rwanda | Bonet Elite",
    description:
      "Luxury travel and hospitality services in Rwanda. Hotel booking, airport transfers, tours and VIP handling in Kigali.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

export default function InvestmentPage() {
  return (
    <div className="min-h-screen">
      <FirstService />
      <HotelHospitality />
    </div>
  );
}
