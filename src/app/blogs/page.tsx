import { Metadata } from 'next'
import BlogsClient from './BlogsClient'

export const metadata: Metadata = {
  title: "Rwanda Business & Travel Blog | Bonet Elite Services",
  description: "Expert insights on Rwanda business setup, travel tips, investment guides and Kigali tourism. Latest articles from Bonet Elite Services.",
  keywords: "Rwanda travel blog, business investment Rwanda, Kigali tourism, Rwanda business guide, investment opportunities Rwanda, hospitality services Rwanda, Bonet blog",
  authors: [{ name: "Bonet Elite Services" }],
  alternates: { canonical: "https://bonet.rw/blogs" },
  openGraph: {
    type: "website",
    url: "https://bonet.rw/blogs",
    title: "Rwanda Business & Travel Blog | Bonet Elite Services",
    description: "Expert insights on Rwanda business setup, travel tips, investment guides and Kigali tourism. Latest articles from Bonet Elite Services.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Bonet Elite Services Blog - Expert Articles on Rwanda Travel, Business & Investment",
        type: "image/png"
      }
    ],
    siteName: "Bonet Elite Services",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    creator: "@BonetElite",
    title: "Rwanda Business & Travel Blog | Bonet Elite Services",
    description: "Expert insights on Rwanda business setup, travel tips, investment guides and Kigali tourism. Latest articles from Bonet Elite Services.",
    images: {
      url: "https://bonet.rw/assets/images/logo.png",
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