import BusinessRegistrationClient from "./BusinessRegistrationClient";

export const metadata = {
  title: "Business Registration Rwanda | Company Setup",
  description:
    "Register your company in Rwanda quickly and easily. No government registration fee. Complete RDB registration, TIN, RSSB, licensing, and bank account support for foreign investors.",
  keywords:
    "business registration Rwanda, company formation Rwanda, RDB registration, foreign company setup Rwanda, TIN registration Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/business-registration" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/business-registration",
    title: "Business Registration Rwanda | Company Setup",
    description:
      "Register your company in Rwanda with 100% foreign ownership and no minimum capital required.",
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
    title: "Business Registration Rwanda | Company Setup",
    description: "Register your company in Rwanda with Bonet Elite Services.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

export default function BusinessRegistrationPage() {
  return <BusinessRegistrationClient />;
}
