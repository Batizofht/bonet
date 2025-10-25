
import FirstContact from "../../contact/firstcontact";
import ContactUs from "../../contact/contact";
import GoogleMapEmbed from "../../contact/map";
import MapComponent from "../../navigation/map";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Contact Us | Bonet Elite Services",
  description:
    "Get in touch with Bonet Elite Services for inquiries, bookings, business support, or concierge services in Rwanda. Quick and reliable assistance.",
  keywords:
    "Bonet Elite Services contact, Rwanda concierge services, business support Rwanda, bookings Rwanda, travel assistance Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  openGraph: {
    type: "website",
    url: "https://www.bonet.rw/contact",
    title: "Contact Us | Bonet Elite Services",
    description:
      "Reach Bonet Elite Services for inquiries, bookings, business setup, and concierge services in Rwanda. Fast and professional support.",
    images: [
      {
        url: "https://www.bonet.rw/images/contact-preview.jpg",
        width: 800,
        height: 600,
        alt: "Contact Bonet Elite Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Bonet Elite Services",
    description:
      "Connect with Bonet Elite Services for support with bookings, business, and VIP services in Rwanda.",
    images: ["https://www.bonet.rw/images/contact-preview.jpg"],
  },
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen text-center text-white">
      <FirstContact />
      <ContactUs />
      <GoogleMapEmbed />
      <MapComponent />
    </div>
  );
}
