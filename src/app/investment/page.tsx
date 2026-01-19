
import FirstService from "../../services/firstservice";
import InvestmentBusinessSetup from "../../services/setup";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Investment & Business Setup | Bonet Elite Services",
  description:
    "Bonet Elite Services helps investors and entrepreneurs in Rwanda with business registration, licensing, investment guidance, and legal compliance.",
  keywords:
    "Bonet Elite Services investment Rwanda, business setup Rwanda, company registration Rwanda, licensing Rwanda, investor support Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  openGraph: {
    type: "website",
    url: "https://www.bonet.rw/investment-setup",
    title: "Investment & Business Setup | Bonet Elite Services",
    description:
      "Get professional assistance with business registration, licensing, and investment opportunities in Rwanda from Bonet Elite Services.",
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
    site: "@BonetElite", // optional
    title: "Investment & Business Setup | Bonet Elite Services",
    description:
      "Support for investors and entrepreneurs in Rwanda with business setup, licensing, and investment guidance.",
    images: ["https://www.bonet.rw/images/investment-preview.jpg"],
  },
};

export default function InvestmentPage() {
  return (
    <div className="min-h-screen">
      <FirstService />
      <InvestmentBusinessSetup />
    </div>
  );
}
