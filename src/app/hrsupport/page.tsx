
import FirstService from "../../services/firstservice";
import BusinessConsulting from "../../services/consult";
import HRAdminSupport from "@/services/hr";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Business Consulting | Bonet Elite Services",
  description:
    "Professional business consulting services in Rwanda by Bonet Elite Services, including business plan development, project planning, and financial audits.",
  keywords:
    "Bonet Elite Services consulting, business consulting Rwanda, business plan Rwanda, project planning Rwanda, financial audits Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  openGraph: {
    type: "website",
    url: "https://www.bonet.rw/consulting",
    title: "Business Consulting | Bonet Elite Services",
    description:
      "Get expert business consulting from Bonet Elite Services in Rwanda. We help with business plans, project strategies, and financial audits.",
    images: [
      {
        url: "https://www.bonet.rw/images/consulting-preview.jpg",
        width: 800,
        height: 600,
        alt: "Business Consulting Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite", // optional
    title: "Business Consulting | Bonet Elite Services",
    description:
      "Professional consulting services for business planning, project management, and financial auditing in Rwanda.",
    images: ["https://www.bonet.rw/images/consulting-preview.jpg"],
  },
};

export default function ConsultingPage() {
  return (
    <div className="min-h-screen">
      <FirstService />
      <HRAdminSupport />
    </div>
  );
}
