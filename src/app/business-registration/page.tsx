import BusinessRegistrationClient from "./BusinessRegistrationClient";

export const metadata = {
  title: "Business Registration Rwanda | 6-Hour Company Setup | Bonet Elite",
  description:
    "Register your company in Rwanda in just 6 hours. 100% foreign ownership, no minimum capital, RWF 7,000 fee. Complete RDB registration, TIN, RSSB, and licensing support.",
  keywords:
    "business registration Rwanda, company formation Rwanda, RDB registration, foreign company setup Rwanda, TIN registration Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/business-registration" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/business-registration",
    title: "Business Registration Rwanda | 6-Hour Company Setup",
    description:
      "Register your company in Rwanda in just 6 hours. 100% foreign ownership, no minimum capital required.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Business Registration in Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "Business Registration Rwanda | 6-Hour Setup",
    description: "Register your company in Rwanda in just 6 hours with Bonet Elite Services.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

export default function BusinessRegistrationPage() {
  return <BusinessRegistrationClient />;
}
