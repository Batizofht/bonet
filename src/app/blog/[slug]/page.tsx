import { Metadata } from 'next'
import axios from "axios";
import BlogDetailClient from './BlogDetailClient'

interface Blog {
  id: number;
  title: string;
  image?: string;
  quote?: string;
  description?: string;
  created_at?: string;
  author?: string;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const response = await axios.get(
      "https://api.bonet.rw:8443/bonetBackend/backend/public/blogs",
      { timeout: 10000 }
    );

    const blogsArray = response.data.data || response.data.blogs || response.data;
    
    if (!Array.isArray(blogsArray)) {
      return {
        title: "Blog - Bonet Elite Services",
        description: "Discover expert insights on travel, business, and investment in Rwanda.",
      };
    }

    const foundBlog = blogsArray.find((item: Blog) => {
      if (!item.title) return false;
      
      const blogSlug = item.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      return blogSlug === params.slug;
    });

    if (!foundBlog) {
      return {
        title: "Blog Not Found - Bonet Elite Services",
        description: "The requested blog post could not be found.",
      };
    }

    const title = `${foundBlog.title} | Bonet Elite Services Blog`;
    const description = foundBlog.quote || foundBlog.description?.substring(0, 160) || "Read this expert article on travel, business, or investment in Rwanda.";
    const imageUrl = foundBlog.image ? `https://api.bonet.rw:8443/bonetBackend/public/${foundBlog.image}` : "https://www.bonet.rw/images/blog-default.jpg";
    const url = `https://www.bonet.rw/blog/${params.slug}`;
    const keywords = `${foundBlog.title}, Rwanda travel, business Rwanda, investment Rwanda, Bonet Services, Kigali, ${foundBlog.title.toLowerCase()}`;

    return {
      title,
      description,
      keywords,
      authors: [{ name: foundBlog.author || "Bonet Elite Services" }],
      alternates: { canonical: url },
      
      // Advanced Open Graph optimization
      openGraph: {
        type: "article",
        url,
        title,
        description,
        images: [
          { 
            url: imageUrl, 
            width: 1200, 
            height: 630, 
            alt: foundBlog.title,
            type: "image/jpeg"
          }
        ],
        publishedTime: foundBlog.created_at,
        modifiedTime: foundBlog.created_at,
        authors: [foundBlog.author || "Bonet Elite Services"],
        siteName: "Bonet Elite Services",
        section: "Travel & Business",
        tags: keywords.split(', ').map(tag => tag.trim()),
        locale: "en_US",
      },
      
      // Advanced Twitter Card optimization
      twitter: {
        card: "summary_large_image",
        site: "@BonetElite",
        creator: "@BonetElite",
        title,
        description,
        images: {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: foundBlog.title,
        },
        // Additional Twitter-specific meta
        "app:name:iphone": "Bonet Elite",
        "app:name:ipad": "Bonet Elite",
        "app:name:googleplay": "Bonet Elite",
      },
      
      // Additional meta tags for social sharing
      other: {
        "article:author": foundBlog.author || "Bonet Elite Services",
        "article:published_time": foundBlog.created_at,
        "article:modified_time": foundBlog.created_at,
        "article:section": "Travel & Business",
        "article:tag": keywords.split(', ').map(tag => tag.trim()),
        "og:site_name": "Bonet Elite Services",
        "og:locale": "en_US",
        "fb:app_id": "your-facebook-app-id", // Add if you have Facebook app
        "twitter:domain": "bonet.rw",
      },
    };
  } catch (error) {
    return {
      title: "Blog - Bonet Elite Services",
      description: "Discover expert insights on travel, business, and investment in Rwanda.",
    };
  }
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.bonet.rw"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blogs",
                  "item": "https://www.bonet.rw/blogs"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": params.slug,
                  "item": `https://www.bonet.rw/blog/${params.slug}`
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": params.slug,
              "description": "Expert article on travel, business, or investment in Rwanda",
              "image": "https://www.bonet.rw/images/blog-default.jpg",
              "url": `https://www.bonet.rw/blog/${params.slug}`,
              "author": {
                "@type": "Organization",
                "name": "Bonet Elite Services",
                "url": "https://www.bonet.rw"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Bonet Elite Services",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.bonet.rw/images/logo.png"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "id": `https://www.bonet.rw/blog/${params.slug}`
              },
              "keywords": "Rwanda travel, business Rwanda, investment Rwanda, Bonet Services, Kigali",
              "inLanguage": "en-US"
            }
          ])
        }}
      />
      <BlogDetailClient />
    </>
  );
}
