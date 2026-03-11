import { Metadata } from 'next'
import BlogsClient from './BlogsClient'

export const metadata: Metadata = {
  title: "Blogs - Bonet Elite Services | Expert Articles on Travel, Business & Investment in Rwanda",
  description: "Discover expert insights, tips, and comprehensive guides on travel, business setup, investment opportunities, and premium services in Rwanda. Stay informed with Bonet's latest articles.",
  keywords: "Rwanda travel blog, business investment Rwanda, Kigali tourism, Rwanda business guide, investment opportunities Rwanda, hospitality services Rwanda, Bonet blog",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/blogs" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/blogs",
    title: "Blogs - Bonet Elite Services | Expert Articles on Travel, Business & Investment in Rwanda",
    description: "Discover expert insights, tips, and comprehensive guides on travel, business setup, investment opportunities, and premium services in Rwanda.",
    images: [
      {
        url: "https://bonet.rw/images/blogs-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Bonet Elite Services Blog - Expert Articles on Rwanda Travel, Business & Investment",
        type: "image/jpeg"
      }
    ],
    siteName: "Bonet Elite Services",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    creator: "@BonetElite",
    title: "Blogs - Bonet Elite Services | Expert Articles on Travel, Business & Investment in Rwanda",
    description: "Discover expert insights, tips, and comprehensive guides on travel, business setup, investment opportunities, and premium services in Rwanda.",
    images: {
      url: "https://bonet.rw/images/blogs-preview.jpg",
      width: 1200,
      height: 630,
      alt: "Bonet Elite Services Blog - Expert Articles on Rwanda Travel, Business & Investment",
    },
  },
  other: {
    "og:site_name": "Bonet Elite Services",
    "og:locale": "en_US",
    "twitter:domain": "bonet.rw",
    "article:section": "Travel & Business",
    "article:tag": ["Rwanda", "Travel", "Business", "Investment", "Tourism", "Kigali"],
  },
};

export default function BlogsPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Bonet Elite Services Blog",
            "description": "Expert insights, tips, and comprehensive guides on travel, business setup, investment opportunities, and premium services in Rwanda.",
            "url": "https://bonet.rw/blogs",
            "publisher": {
              "@type": "Organization",
              "name": "Bonet Elite Services",
              "logo": {
                "@type": "ImageObject",
                "url": "https://bonet.rw/images/logo.png"
              }
            },
            "blogPost": [],
            "inLanguage": "en-US"
          })
        }}
      />
      <BlogsClient />
    </>
  );
}