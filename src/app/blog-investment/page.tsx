
import FirstService from "../../services/firstservice";
import InvestmentOpportunities from "../../blogs/investment";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Investment in Rwanda | Bonet Elite Services Blog",
  description:
    "Explore Rwanda’s top investment opportunities with Bonet Elite Services. Learn about real estate, agriculture, ICT, tourism, and government incentives for investors.",
  keywords:
    "Investment in Rwanda, Rwanda investment guide, Rwanda real estate, Rwanda ICT sector, Rwanda agriculture, Rwanda tourism, Bonet Elite Services blog",
  authors: [{ name: "Bonet Elite Services" }],
  openGraph: {
    type: "article",
    url: "https://www.bonet.rw/blog/investment",
    title: "Investment in Rwanda | Bonet Elite Services Blog",
    description:
      "Uncover Rwanda’s most promising sectors—real estate, agriculture, ICT, and tourism—with insights on potential returns and investor support.",
    images: [
      {
        url: "https://www.bonet.rw/images/blog-investment-preview.jpg",
        width: 800,
        height: 600,
        alt: "Investment in Rwanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investment in Rwanda | Bonet Elite Services Blog",
    description:
      "Detailed insights on investment sectors in Rwanda and how Bonet Elite Services supports investors every step of the way.",
    images: ["https://www.bonet.rw/images/blog-investment-preview.jpg"],
  },
};

export default function BlogInvestmentPage() {
  return (
    <div className="min-h-screen">
      <FirstService />
      <InvestmentOpportunities />
    </div>
  );
}
