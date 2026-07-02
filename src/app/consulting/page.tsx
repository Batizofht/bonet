
import FirstService from "../../services/firstservice";
import BusinessConsulting from "../../services/consult";
export const metadata = {
  title: "Business Consulting Services Rwanda",
  description:
    "Expert business consulting in Rwanda. Business plans, project planning, financial audits and strategy by Bonet Elite Services in Kigali.",
  keywords:
    "Bonet Elite Services consulting, business consulting Rwanda, business plan Rwanda, project planning Rwanda, financial audits Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/consulting" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/consulting",
    title: "Business Consulting Services Rwanda",
    description:
      "Expert business consulting in Rwanda. Business plans, project planning, financial audits and strategy by Bonet Elite Services in Kigali.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Business Consulting Services in Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "Business Consulting Services Rwanda",
    description:
      "Expert business consulting in Rwanda. Business plans, project planning, financial audits and strategy by Bonet Elite Services.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

export default function ConsultingPage() {
  return (
    <div className="min-h-screen">
      <FirstService
        image="/image/7.jpg"
        subtitleKey="pageHero.consulting.subtitle"
        titleKey="pageHero.consulting.title"
        descriptionKey="pageHero.consulting.desc"
      />
      <BusinessConsulting />
    </div>
  );
}
