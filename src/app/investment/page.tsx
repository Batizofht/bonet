
import FirstService from "../../services/firstservice";
import InvestmentBusinessSetup from "../../services/setup";
export const metadata = {
  title: "Investment & Business Setup Rwanda | Bonet Elite",
  description:
    "Company registration, licensing and investment support in Rwanda. Bonet Elite helps entrepreneurs start businesses in Kigali fast.",
  keywords:
    "Bonet Elite Services investment Rwanda, business setup Rwanda, company registration Rwanda, licensing Rwanda, investor support Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/investment" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/investment",
    title: "Investment & Business Setup Rwanda | Bonet Elite",
    description:
      "Company registration, licensing and investment support in Rwanda. Bonet Elite helps entrepreneurs start businesses in Kigali fast.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Investment and Business Setup Services in Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "Investment & Business Setup Rwanda | Bonet Elite",
    description:
      "Company registration, licensing and investment support in Rwanda. Bonet Elite helps entrepreneurs start businesses in Kigali fast.",
    images: ["https://bonet.rw/assets/images/logo.png"],
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
