import FirstService from "../../services/firstservice";
import BusinessRegistration from "../../blogs/busreg";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Business & Investment in Rwanda | Bonet Elite Services Blog",
  description:
    "Discover how to start and grow a business in Rwanda. Learn about company registration, tax regulations, and investment opportunities with Bonet Elite Services.",
  keywords:
    "Business in Rwanda, Investment Rwanda, Business registration Rwanda, Rwanda business blog, Rwanda investment guide, Bonet Elite Blog, company setup Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  openGraph: {
    type: "article",
    url: "https://www.bonet.rw/blog/business",
    title: "Business & Investment in Rwanda | Bonet Elite Services Blog",
    description:
      "Step-by-step insights on business registration, investment opportunities, and growth strategies in Rwanda.",
    images: [
      {
        url: "https://www.bonet.rw/images/blog-business-preview.jpg",
        width: 800,
        height: 600,
        alt: "Business & Investment in Rwanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business & Investment in Rwanda | Bonet Elite Services Blog",
    description:
      "Expert guides on business setup, registration, and investment opportunities in Rwanda.",
    images: ["https://www.bonet.rw/images/blog-business-preview.jpg"],
  },
};

export default function BlogBusinessPage() {
  return (
    <div className="min-h-screen">
      <FirstService />
      <BusinessRegistration />
    </div>
  );
}
