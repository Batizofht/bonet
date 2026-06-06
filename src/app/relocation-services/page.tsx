import RelocationServicesClient from "./RelocationServicesClient";

export const metadata = {
  title: "Relocation Services Rwanda | Executive Concierge",
  description:
    "Premium relocation services for executives and families moving to Rwanda. Housing, schooling, banking, transport, and full concierge support.",
  keywords:
    "relocation services Rwanda, executive relocation Kigali, corporate relocation Rwanda, expat housing Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/relocation-services" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/relocation-services",
    title: "Executive Relocation Services Rwanda",
    description:
      "Premium relocation services for executives and families moving to Rwanda. Complete concierge support.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Relocation Services Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "Relocation Services Rwanda",
    description: "Premium relocation services for executives moving to Rwanda.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

export default function RelocationServicesPage() {
  return <RelocationServicesClient />;
}
