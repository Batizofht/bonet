import HRRecruitmentClient from "./HRRecruitmentClient";

export const metadata = {
  title: "HR & Recruitment Rwanda | Talent Solutions | Bonet Elite",
  description:
    "Professional HR and recruitment services in Rwanda. Talent sourcing, payroll management, compliance, and workforce solutions for foreign companies.",
  keywords:
    "HR services Rwanda, recruitment Rwanda, payroll management Rwanda, talent sourcing Rwanda, HR compliance Rwanda",
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
        url: "https://bonet.rw/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "HR and Recruitment Services Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "HR & Recruitment Rwanda | Bonet Elite",
    description: "Professional HR and recruitment services for companies in Rwanda.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

export default function HRRecruitmentPage() {
  return <HRRecruitmentClient />;
}
