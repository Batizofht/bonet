import { Metadata } from 'next'
import BlogDetailClient from './BlogDetailClient'

export const dynamic = 'force-dynamic';

interface Blog {
  id: number;
  title: string;
  image?: string;
  quote?: string;
  description?: string;
  created_at?: string;
  author?: string;
}

const slugifyTitle = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
};

const normalizeSlug = (slug: string) => {
  try {
    return decodeURIComponent(slug).replace(/^-+|-+$/g, '').trim();
  } catch {
    return slug.replace(/^-+|-+$/g, '').trim();
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
  try {
    // Handle params as Promise or direct value
    const resolvedParams = await Promise.resolve(params);
    const targetSlug = normalizeSlug(resolvedParams?.slug || '');
    console.log('[SEO] Target slug:', targetSlug);
    
    // Use fetch like sitemap.ts does
    const response = await fetch(
      "https://api.bonet.rw:8443/bonetBackend/backend/public/blogs",
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    console.log('[SEO] Raw API response:', JSON.stringify(data)?.substring(0, 500));
    
    const blogsArray = data?.data || data?.blogs || data;
    console.log('[SEO] Extracted blogsArray type:', typeof blogsArray, 'isArray:', Array.isArray(blogsArray), 'length:', blogsArray?.length);
    
    if (!Array.isArray(blogsArray)) {
      console.log('[SEO] Not an array, data:', data);
      return {
        title: "Blog - Bonet Elite Services",
        description: "Discover expert insights on travel, business, and investment in Rwanda.",
      };
    }

    const foundBlog = blogsArray.find((item: any) => {
      if (!item.title) {
        console.log('[SEO] Blog without title:', item);
        return false;
      }
      
      const blogSlug = slugifyTitle(item.title);
      const match = blogSlug === targetSlug;
      if (match) {
        console.log('[SEO] Found matching blog:', item.title);
      }
      return match;
    });

    if (!foundBlog) {
      const safeSlug = targetSlug || resolvedParams?.slug || 'blog-post';
      // Capitalize each word
      const readableTitle = safeSlug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
        .trim();
      return {
        title: `${readableTitle} | Bonet Elite Services Blog`,
        description: "Discover expert insights on travel, business, and investment in Rwanda.",
        alternates: { canonical: `https://bonet.rw/blog/${safeSlug}` },
      };
    }

    console.log('[SEO] Found blog:', foundBlog);

    // ALWAYS use slug title - never use API title to avoid "undefined"
    const safeSlug = targetSlug || resolvedParams?.slug || 'blog-post';
    // Capitalize each word: "audit-ready" -> "Audit Ready"
    const slugTitle = safeSlug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase())
      .trim();
    const blogTitle = slugTitle || 'Blog Post';
    const title = `${blogTitle} | Bonet Elite Services Blog`;
    const description = foundBlog?.quote || foundBlog?.description?.substring(0, 160) || "Read this expert article on travel, business, or investment in Rwanda.";
    const imageUrl = foundBlog?.image ? `https://api.bonet.rw:8443/bonetBackend/public/${foundBlog.image}` : "https://bonet.rw/assets/images/logo.png";
    const url = `https://bonet.rw/blog/${targetSlug}`;
    const keywords = `${blogTitle}, Rwanda travel, business Rwanda, investment Rwanda, Bonet Services, Kigali, ${blogTitle.toLowerCase()}`;

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
        images: [imageUrl],
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
        "twitter:app:name:iphone": "Bonet Elite Services",
        "twitter:app:name:ipad": "Bonet Elite Services",
        "twitter:app:name:googleplay": "Bonet Elite Services",
      },
    };
  } catch (error) {
    return {
      title: "Blog - Bonet Elite Services",
      description: "Discover expert insights on travel, business, and investment in Rwanda.",
    };
  }
}

async function getBlogData(slug: string): Promise<Blog | null> {
  try {
    const targetSlug = normalizeSlug(slug);
    const response = await fetch(
      "https://api.bonet.rw:8443/bonetBackend/backend/public/blogs",
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const blogsArray = data?.data || data?.blogs || data;
    
    if (!Array.isArray(blogsArray)) return null;

    return blogsArray.find((item: any) => {
      if (!item.title) return false;
      return slugifyTitle(item.title) === targetSlug;
    }) || null;
  } catch {
    return null;
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug || 'blog-post';
  
  const blog = await getBlogData(slug);
  
  const headline = blog?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const description = blog?.quote || blog?.description?.substring(0, 160) || "Expert article on travel, business, or investment in Rwanda";
  const imageUrl = blog?.image 
    ? `https://api.bonet.rw:8443/bonetBackend/public/${blog.image}` 
    : "https://bonet.rw/assets/images/logo.png";
  const datePublished = blog?.created_at || new Date().toISOString();
  
  return (
    <>
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
                  "item": "https://bonet.rw"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blogs",
                  "item": "https://bonet.rw/blogs"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": headline,
                  "item": `https://bonet.rw/blog/${slug}`
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": headline,
              "description": description,
              "image": imageUrl,
              "url": `https://bonet.rw/blog/${slug}`,
              "datePublished": datePublished,
              "dateModified": datePublished,
              "author": {
                "@type": "Person",
                "name": "Bonet Elite Services"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Bonet Elite Services",
                "url": "https://bonet.rw",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://bonet.rw/assets/images/logo.png"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://bonet.rw/blog/${slug}`
              },
              "keywords": "Rwanda travel, business Rwanda, investment Rwanda, Bonet Services, Kigali",
              "inLanguage": "en-US"
            }
          ])
        }}
      />
      <BlogDetailClient key={slug} />
    </>
  );
}
