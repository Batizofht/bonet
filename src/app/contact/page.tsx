
import FirstContact from "../../contact/firstcontact";
import ContactUs from "../../contact/contact";
import GoogleMapEmbed from "../../contact/map";
import MapComponent from "../../navigation/map";
export const metadata = {
  title: "Contact Us | Bonet Elite Services Rwanda",
  description:
    "Contact Bonet Elite Services for bookings, business support and concierge services in Rwanda. Call +250 726 300 260 or visit us in Kigali.",
  keywords:
    "Bonet Elite Services contact, Rwanda concierge services, business support Rwanda, bookings Rwanda, travel assistance Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/contact" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/contact",
    title: "Contact Us | Bonet Elite Services Rwanda",
    description:
      "Contact Bonet Elite Services for bookings, business support and concierge services in Rwanda. Call +250 726 300 260 or visit us in Kigali.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 800,
        height: 600,
        alt: "Contact Bonet Elite Services Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Bonet Elite Services Rwanda",
    description:
      "Contact Bonet Elite Services for bookings, business support and concierge services in Rwanda. Call +250 726 300 260.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <FirstContact />
      <ContactUs />
      <GoogleMapEmbed />
      <MapComponent />
    </div>
  );
}
