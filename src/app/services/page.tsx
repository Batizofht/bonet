import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "All Services for Foreign Investors | Bonet Elite",
  description: "Five integrated services for foreign investors in Rwanda: Business Registration, Investment Advisory, HR & Recruitment, Executive Relocation, and Executive Travel. One team, end-to-end delivery.",
  keywords: "Bonet Elite Services, premium services Rwanda, business registration Rwanda, investment advisory Rwanda, HR recruitment Rwanda, relocation Rwanda, executive travel Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  openGraph: {
    type: "website",
    url: "https://bonet.rw/services",
    title: "All Services for Foreign Investors | Bonet Elite",
    description: "Five integrated services for foreign investors in Rwanda: Business Registration, Investment Advisory, HR & Recruitment, Executive Relocation, and Executive Travel. One team, end-to-end delivery.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Bonet Elite Services - Integrated Services for Foreign Investors in Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "All Services for Foreign Investors | Bonet Elite",
    description: "Five integrated services for foreign investors in Rwanda: Business Registration, Investment Advisory, HR & Recruitment, Executive Relocation, and Executive Travel. One team, end-to-end delivery.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
  metadataBase: new URL("https://bonet.rw"),
  robots: "index, follow",
  alternates: {
    canonical: "https://bonet.rw/services"
  }
};

export default function ServicesPage() {
  return <ServicesClient />;
}
