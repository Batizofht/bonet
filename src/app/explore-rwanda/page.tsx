import ExploreRwandaClient from "./ExploreRwandaClient";

export const metadata = {
  title: "Explore Rwanda | Investment, Tourism & Living Guide",
  description: "Discover Rwanda: Africa's safest country for investment, tourism, and living. Key sectors, living costs, gallery, and business opportunities.",
  keywords: "Explore Rwanda, Rwanda investment, Rwanda tourism, Rwanda living, Kigali business, Rwanda economy",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/explore-rwanda" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/explore-rwanda",
    title: "Explore Rwanda | Investment & Tourism Guide",
    description: "Discover Rwanda: investment sectors, living guide, and tourism highlights.",
    images: [{ url: "https://bonet.rw/assets/images/logo.png", width: 1200, height: 630 }],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Rwanda | Investment & Tourism Guide",
    description: "Discover Rwanda: investment sectors, living guide, and tourism highlights.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

export default function ExploreRwandaPage() {
  return <ExploreRwandaClient />;
}
