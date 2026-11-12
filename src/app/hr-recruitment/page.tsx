import HRRecruitmentClient from "./HRRecruitmentClient";
import RelatedGuides from "@/components/insights/RelatedGuides";

export const metadata = {
  title: "HR, Recruitment & Admin Support in Rwanda",
  description:
    "Recruitment, payroll, HR policies, staff training, work permits and administrative support for foreign companies hiring in Rwanda.",
  keywords:
    "HR services Rwanda, recruitment Rwanda, payroll management Rwanda, HR administrative support Rwanda, employee training Rwanda, HR compliance Rwanda, work permits Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/hr-recruitment" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/hr-recruitment",
    title: "HR & Recruitment Services Rwanda",
    description:
      "Professional HR and recruitment services for companies in Rwanda. Talent sourcing, payroll, and compliance.",
    images: [
      {
        url: "https://bonet.rw/assets/images/bonet-og.png",
        width: 800,
        height: 600,
        alt: "HR and Recruitment Services Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetPJ",
    title: "HR & Recruitment Rwanda",
    description: "Professional HR and recruitment services for companies in Rwanda.",
    images: ["https://bonet.rw/assets/images/bonet-og.png"],
  },
};

export default function HRRecruitmentPage() {
  return (
    <>
      <HRRecruitmentClient />
      <RelatedGuides service="/hr-recruitment" />
    </>
  );
}
