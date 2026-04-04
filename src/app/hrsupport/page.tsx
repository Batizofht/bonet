
import FirstService from "../../services/firstservice";
import BusinessConsulting from "../../services/consult";
import HRAdminSupport from "@/services/hr";
export const metadata = {
  title: "HR & Admin Support Services Rwanda | Bonet Elite",
  description:
    "HR and administrative support in Rwanda. Recruitment, payroll, employee training and HR policy by Bonet Elite Services in Kigali.",
  keywords:
    "HR services Rwanda, administrative support Rwanda, recruitment Kigali, payroll Rwanda, employee training Rwanda, Bonet Elite Services",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/hrsupport" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/hrsupport",
    title: "HR & Admin Support Services Rwanda | Bonet Elite",
    description:
      "HR and administrative support in Rwanda. Recruitment, payroll, employee training and HR policy by Bonet Elite Services in Kigali.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "HR and Administrative Support Services in Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "HR & Admin Support Services Rwanda | Bonet Elite",
    description:
      "HR and administrative support in Rwanda. Recruitment, payroll, employee training and HR policy by Bonet Elite Services.",
    images: ["https://bonet.rw/assets/images/logo.png"],
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
