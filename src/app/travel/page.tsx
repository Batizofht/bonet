
import FirstService from "../../services/firstservice";
import HotelHospitality from "../../services/hotel";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Investment & Business Setup | Bonet Elite Services Rwanda",
  description:
    "Set up your business in Rwanda with Bonet Elite Services. We assist investors with company registration, hospitality solutions, and executive support.",
  keywords:
    "Rwanda investment, business setup Rwanda, Rwanda hospitality services, Bonet Elite Services, start business in Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  openGraph: {
    type: "website",
    url: "https://www.bonet.rw/investment",
    title: "Investment & Business Setup | Bonet Elite Services",
    description:
      "Bonet Elite Services helps investors establish businesses in Rwanda. From hospitality to legal support, we make your investment journey seamless.",
    images: [
      {
        url: "https://www.bonet.rw/images/investment-preview.jpg",
        width: 800,
        height: 600,
        alt: "Investment & Business Setup Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "Investment & Business Setup | Bonet Elite Services",
    description:
      "Start your business in Rwanda with Bonet Elite Services. Trusted support for investors and executives.",
    images: ["https://www.bonet.rw/images/investment-preview.jpg"],
  },
};

export default function InvestmentPage() {
  return (
    <div className="bg-white min-h-screen text-center text-white">
      <FirstService />
      <HotelHospitality />
    </div>
  );
}
