
import WelcomeUs from "../../welcome/welcome";
import { Suspense } from "react";
import PageLoader from "../../components/PageLoader";

export const metadata = {
  title: "Welcome",
  description:
    "Welcome to Bonet Elite Services. Get in touch for bookings, business support and concierge services in Rwanda.",
  keywords:
    "Bonet Elite Services welcome, Rwanda concierge services, business support Rwanda, bookings Rwanda, travel assistance Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/welcome" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/welcome",
    title: "Welcome",
    description:
      "Welcome to Bonet Elite Services. Get in touch for bookings, business support and concierge services in Rwanda.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Welcome to Bonet Elite Services Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome",
    description:
      "Welcome to Bonet Elite Services. Get in touch for bookings, business support and concierge services in Rwanda.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

export default function WelcomePage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<PageLoader />}>
        <WelcomeUs />
      </Suspense>
    </div>
  );
}
