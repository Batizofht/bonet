import FAQClient from "./FAQClient";

export const metadata = {
  title: "FAQ | Rwanda Business Setup & Investment",
  description:
    "Frequently asked questions about business registration, investment, work permits, and living in Rwanda. Expert answers for foreign investors and companies.",
  keywords:
    "Rwanda FAQ, business registration FAQ Rwanda, invest in Rwanda questions, Rwanda work permit FAQ",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/faq" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/faq",
    title: "FAQ | Rwanda Business Setup & Investment",
    description:
      "Expert answers to frequently asked questions about business registration, investment, and living in Rwanda.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "FAQ Rwanda Business Setup",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "FAQ | Rwanda Business & Investment",
    description: "Expert answers about business setup and investment in Rwanda.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
