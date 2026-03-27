# Bonet Elite Services - READPROGRESS.md

> **Comprehensive Technical Documentation & SEO Reference Guide**
> **Last Updated:** March 2025  
> **Domain:** https://bonet.rw

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Tech Stack Overview](#tech-stack-overview)
3. [Architecture Decisions](#architecture-decisions)
4. [Complete Page Inventory](#complete-page-inventory)
5. [SEO Implementation Deep Dive](#seo-implementation-deep-dive)
6. [Third-Party Integrations](#third-party-integrations)
7. [Environment Setup](#environment-setup)
8. [Known Issues & Blockers](#known-issues--blockers)
9. [File Structure Map](#file-structure-map)

---

## Executive Summary

**Bonet Elite Services** is a premium concierge, business consulting, and travel services company based in Rwanda. This Next.js 16 application serves as the primary digital presence, supporting three languages (English, French, Chinese) with comprehensive SEO optimization, dynamic blog content, and integrated booking systems.

### Primary Business Areas
- **Travel & Hospitality** - Hotel bookings, apartments, transport, tourism guides
- **Business Services** - Company registration, consulting, HR support, licensing
- **Investment Support** - Investment guidance, real estate, sector-specific opportunities
- **VIP/Concierge Services** - Executive support, premium experiences

---

## Tech Stack Overview

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.8 | React framework with App Router, SSR/SSG, API routes |
| **React** | 19.1.0 | UI component library (Latest stable) |
| **TypeScript** | 5.x | Type safety and enhanced DX |
| **Node.js** | LTS | Runtime environment |

### Why Next.js Was Chosen

1. **Server-Side Rendering (SSR)** - Critical for SEO as search engines can fully index dynamic content
2. **Static Site Generation (SSG)** - Pages like `/about`, `/services` are pre-built for performance
3. **Dynamic Metadata** - Each page exports custom `metadata` objects for SEO optimization
4. **App Router Architecture** - File-based routing with nested layouts and loading states
5. **Image Optimization** - Built-in `next/image` with WebP/AVIF format support
6. **Sitemap Generation** - Programmatic sitemap.ts for automatic SEO indexing
7. **Internationalization** - Native support for multi-language routing

### Styling & UI
| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Ant Design (antd)** | 5.27.4 | Enterprise UI components |
| **Framer Motion** | 12.23.24 | Animations and transitions |
| **AOS** | 2.3.4 | Scroll-triggered animations |
| **Lucide React** | 0.545.0 | Icon library |
| **React Icons** | 5.5.0 | Additional icon sets |

### State & Data
| Technology | Purpose |
|------------|---------|
| **Axios** | HTTP client for API requests |
| **Day.js** | Date manipulation |
| **UUID** | Unique identifier generation |
| **NProgress** | Page load progress indicator |

### Internationalization (i18n)
| Technology | Purpose |
|------------|---------|
| **i18next** | Core i18n framework |
| **react-i18next** | React bindings |
| **i18next-browser-languagedetector** | Auto language detection |
| **next-intl** | Next.js i18n utilities |

### Animation Libraries
- **Framer Motion** - Complex animations, page transitions, gesture handling
- **AOS (Animate On Scroll)** - Simple scroll-triggered fade/slide effects

### Utilities
- **Critters** - Critical CSS inlining for performance
- **React Toastify** - Toast notifications

---

## Architecture Decisions

### App Router Structure (Next.js 13+ Pattern)
```
src/app/
├── layout.tsx           # Root layout with global metadata
├── page.tsx             # Homepage (Server Component)
├── pageClient.tsx       # Homepage client logic
├── loading.tsx          # Loading UI (if exists)
├── error.tsx            # Error boundary (if exists)
├── not-found.tsx        # 404 page
├── sitemap.ts          # Auto-generated sitemap
├── [route]/
│   ├── page.tsx         # Route page component
│   └── layout.tsx       # Route-specific layout (optional)
```

### Component Architecture
- **Server Components (default)** - Used for static content, SEO metadata, data fetching
- **Client Components ("use client")** - Used for interactivity, browser APIs, state management
- **Dynamic Imports** - Lazy loading for performance (`next/dynamic`)

### Data Fetching Pattern
```typescript
// Server Component fetching
async function getData() {
  const res = await fetch('https://api.bonet.rw:8443/...', {
    next: { revalidate: 3600 } // ISR support
  })
  return res.json()
}
```

---

## Complete Page Inventory

### Static Pages

#### 1. **Homepage** (`/`)
- **File:** `src/app/page.tsx`
- **Purpose:** Main landing page showcasing all services
- **Components:**
  - `FirstHome` - Hero section with typewriter animation
  - `CardHome` - Service cards grid
  - `ServiceSection` - Featured services
  - `Features` - Key differentiators
  - `Company` - Trust badges
  - `Customer` - Testimonials
  - `Partner` - Partner logos
  - `GreatSoftware` - Tech showcase
  - `Resources` - Additional resources
  - `HowDev` - Process explanation
  - `HomeCTA` - Call-to-action
  - `Knowledge` - Blog preview
- **SEO Metadata:**
  - Title: "Bonet Elite Services | Travel, Business & Investment Support in Rwanda"
  - Description: Primary business description with keywords
  - Keywords: Travel Rwanda, business setup, investment, VIP concierge
  - Open Graph: Full social sharing metadata
  - Twitter Card: Summary large image

#### 2. **About Us** (`/about`)
- **File:** `src/app/about/page.tsx`
- **Purpose:** Company history, mission, vision, team
- **Components:**
  - `FirstService` - Page header
  - `AboutSection` - Company story
  - `ExperienceSection` - Years of experience
  - `FounderSection` - Leadership team
  - `MissionSection` - Mission/vision
  - `NewExperience` - Enhanced experience display
- **SEO:** Mission/vision focused keywords

#### 3. **Services** (`/services`)
- **File:** `src/app/services/page.tsx`
- **Purpose:** Overview of all service categories
- **Components:**
  - `FirstService` - Service header
  - `LazyBusinessRegistration` - Business services (lazy loaded)
- **SEO:** Service-specific keywords (hotel, transport, tourism)

#### 4. **Travel & Hospitality** (`/travel`)
- **File:** `src/app/travel/page.tsx`
- **Purpose:** Travel-focused service page
- **Components:**
  - `FirstService` - Header
  - `HotelHospitality` - Hotel/apartment listings
- **SEO:** Travel and hospitality keywords

#### 5. **Investment & Business Setup** (`/investment`)
- **File:** `src/app/investment/page.tsx`
- **Purpose:** Investment opportunities and business registration
- **Components:**
  - `FirstService` - Header
  - `InvestmentBusinessSetup` - Investment content
- **SEO:** Investment, business setup Rwanda keywords

#### 6. **Business Consulting** (`/consulting`)
- **File:** `src/app/consulting/page.tsx`
- **Purpose:** Consulting services detail
- **Components:**
  - `FirstService` - Header
  - `BusinessConsulting` - Consulting content
- **SEO:** Business consulting, planning, auditing keywords

#### 7. **HR & Admin Support** (`/hrsupport`)
- **File:** `src/app/hrsupport/page.tsx`
- **Purpose:** HR services detail page
- **Components:**
  - `FirstService` - Header
  - `HRAdminSupport` - HR content
- **SEO:** HR services, admin support keywords
- **Note:** Currently has duplicate metadata title as consulting page (potential bug)

#### 8. **Visit Rwanda** (`/visitrwanda`)
- **File:** `src/app/visitrwanda/page.tsx`
- **Purpose:** Tourism promotion and Rwanda highlights
- **Components:**
  - `VisitFirst` - Hero section
  - `VisitRwanda` - Tourism content
  - `WhyInvest` - Investment incentives
- **SEO:** Visit Rwanda, tourism, culture keywords

#### 9. **Contact** (`/contact`)
- **File:** `src/app/contact/page.tsx`
- **Purpose:** Contact form and location information
- **Components:**
  - `FirstContact` - Contact header
  - `ContactUs` - Contact form
  - `GoogleMapEmbed` - Embedded map
  - `MapComponent` - Interactive map
- **SEO:** Contact, inquiries, support keywords

#### 10. **Book Now** (`/bookNow`)
- **File:** `src/app/bookNow/page.tsx`
- **Purpose:** Direct booking interface for hotels/services
- **Components:**
  - `ContainerWithButtons` - Booking container
  - `Gallery` - Photo gallery
- **SEO:** Book hotels Rwanda, apartment booking keywords

### Blog System

#### 11. **Blog Index** (`/blogs`)
- **File:** `src/app/blogs/page.tsx`
- **Purpose:** Blog listing page
- **Components:**
  - `BlogsClient` - Client-side blog fetching and display
- **SEO:** Blog listing metadata with structured data (Schema.org Blog type)
- **Features:**
  - Dynamic blog fetching from API
  - Category filtering
  - Search functionality
  - Pagination

#### 12. **Blog Detail** (`/blog/[slug]`)
- **File:** `src/app/blog/[slug]/page.tsx`
- **Purpose:** Individual blog post display
- **Components:**
  - `BlogDetailClient` - Client-side blog rendering
- **SEO:** 
  - Dynamic metadata generation via `generateMetadata()`
  - Slug-based URL structure for SEO-friendly URLs
  - Structured data: BreadcrumbList + BlogPosting schema
  - Article-type Open Graph tags
- **Features:**
  - Dynamic slug parameter
  - API-based content fetching
  - Social sharing optimization
  - Related posts

#### 13. **Blog Categories**

**Business Blog** (`/blog-business`)
- **File:** `src/app/blog-business/page.tsx`
- **Purpose:** Business-focused articles
- **Components:** `BusinessRegistration`
- **SEO:** Business in Rwanda, investment keywords

**Investment Blog** (`/blog-investment`)
- **File:** `src/app/blog-investment/page.tsx`
- **Purpose:** Investment opportunity articles
- **Components:** `InvestmentOpportunities`
- **SEO:** Investment sectors, real estate, agriculture keywords

**Travel Tips Blog** (`/blog-travel-tips`)
- **File:** `src/app/blog-travel-tips/page.tsx`
- **Purpose:** Travel guide articles
- **Components:** `TravelTips`
- **SEO:** Travel tips, visa requirements, tourism keywords

### Utility Pages

#### 14. **404 Not Found**
- **File:** `src/app/not-found.tsx`
- **Purpose:** Custom 404 error page
- **Features:** Return to home link, branded styling

---

## SEO Implementation Deep Dive

### Global SEO Configuration

#### Root Layout (`src/app/layout.tsx`)
```typescript
// Global metadata base
metadataBase: new URL("https://bonet.rw")

// Core meta tags
- title: Global site title
- description: Site-wide description
- keywords: Primary business keywords
- authors: [{ name: "Bonet Elite Services" }]
- icons: Favicon configuration
```

#### Viewport Configuration
```typescript
export function generateViewport() {
  return "width=device-width, initial-scale=1.0";
}
```

#### Verification & Analytics
```html
<!-- Google Search Console -->
<meta name="google-site-verification" content="XmA718kfY8J4ixoy_mtJ-RWVR38ho1jxm4EycrG0pM0" />

<!-- Google Analytics 4 (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3BEG46CGMG"></script>

<!-- Ahrefs Analytics -->
<script src="https://analytics.ahrefs.com/analytics.js" data-key="ZwyWK9S5Y9ynmnRi3oqhwQ" defer></script>
```

#### Hreflang (International SEO)
```html
<link rel="alternate" hrefLang="en" href="https://bonet.rw" />
<link rel="alternate" hrefLang="fr" href="https://bonet.rw" />
<link rel="alternate" hrefLang="zh-CN" href="https://bonet.rw" />
<link rel="alternate" hrefLang="x-default" href="https://bonet.rw" />
```

### Page-Level SEO Patterns

Every page exports a `metadata` object:

```typescript
export const metadata = {
  title: "Page Specific Title | Bonet Elite Services",
  description: "Unique page description under 160 characters",
  keywords: "comma, separated, relevant, keywords",
  authors: [{ name: "Bonet Elite Services" }],
  
  // Canonical URL
  alternates: { canonical: "https://bonet.rw/page-url" },
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    url: "https://bonet.rw/page-url",
    title: "Social sharing title",
    description: "Social sharing description",
    images: [{ url: "https://bonet.rw/images/preview.jpg", width: 1200, height: 630 }],
    siteName: "Bonet Elite Services",
    locale: "en_US",
  },
  
  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "Twitter title",
    description: "Twitter description",
    images: ["https://bonet.rw/images/preview.jpg"],
  },
  
  // Robots directives
  robots: "index, follow",
  
  // Additional meta
  other: {
    "og:site_name": "Bonet Elite Services",
    "article:section": "Travel & Business",
  }
};
```

### Dynamic SEO (Blog Posts)

Blog detail pages use `generateMetadata()` for dynamic SEO:

```typescript
export async function generateMetadata({ params }) {
  // Fetch blog data
  const blog = await fetchBlog(params.slug);
  
  return {
    title: `${blog.title} | Bonet Elite Services Blog`,
    description: blog.quote || blog.description.substring(0, 160),
    keywords: generateKeywords(blog),
    
    openGraph: {
      type: "article",
      publishedTime: blog.created_at,
      modifiedTime: blog.created_at,
      authors: [blog.author],
      section: "Travel & Business",
      tags: blog.keywords,
    },
    
    // Article meta
    other: {
      "article:author": blog.author,
      "article:published_time": blog.created_at,
      "article:modified_time": blog.created_at,
    }
  };
}
```

### Structured Data (Schema.org)

#### Blog Listing Schema (`/blogs`)
```json
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Bonet Elite Services Blog",
  "description": "Expert insights...",
  "url": "https://bonet.rw/blogs",
  "publisher": {
    "@type": "Organization",
    "name": "Bonet Elite Services",
    "logo": { "@type": "ImageObject", "url": "https://bonet.rw/images/logo.png" }
  }
}
```

#### Blog Post Schema (`/blog/[slug]`)
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "description": "Article excerpt",
  "image": "https://bonet.rw/images/article.jpg",
  "author": {
    "@type": "Organization",
    "name": "Bonet Elite Services"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Bonet Elite Services",
    "logo": { "@type": "ImageObject", "url": "https://bonet.rw/images/logo.png" }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "id": "https://bonet.rw/blog/article-slug"
  }
}
```

#### Breadcrumb Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bonet.rw" },
    { "@type": "ListItem", "position": 2, "name": "Blogs", "item": "https://bonet.rw/blogs" },
    { "@type": "ListItem", "position": 3, "name": "Article", "item": "https://bonet.rw/blog/slug" }
  ]
}
```

### Sitemap Configuration (`sitemap.ts`)

```typescript
// Automatic sitemap generation
export default async function sitemap() {
  const staticPages = [
    { url: 'https://bonet.rw', priority: 1.0, changeFrequency: 'weekly' },
    { url: 'https://bonet.rw/blogs', priority: 0.9, changeFrequency: 'daily' },
    { url: 'https://bonet.rw/about', priority: 0.8, changeFrequency: 'monthly' },
    // ... more pages
  ];
  
  // Dynamic blog URLs from API
  const blogs = await fetchBlogs();
  const blogUrls = blogs.map(blog => ({
    url: `https://bonet.rw/blog/${slugify(blog.title)}`,
    priority: 0.7,
    changeFrequency: 'weekly'
  }));
  
  return [...staticPages, ...blogUrls];
}
```

### Image Optimization for SEO

```typescript
// next.config.ts
images: {
  formats: ['image/webp', 'image/avif'], // Modern formats for better compression
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'api.bonet.rw', // API images
      pathname: '/**',
    },
  ],
}
```

### Preconnect for Performance

```html
<!-- In layout.tsx <head> -->
<link rel="preconnect" href="https://api.bonet.rw:8443" />
<link rel="preconnect" href="https://analytics.ahrefs.com" />
```

---

## Third-Party Integrations

### Analytics & Tracking

| Service | Purpose | Location | Implementation |
|---------|---------|----------|----------------|
| **Google Analytics 4** | Traffic analysis | All pages | gtag.js in layout.tsx |
| **Google Search Console** | Search performance | Verification only | Meta tag in layout.tsx |
| **Ahrefs** | SEO monitoring | All pages | Analytics script in body |

### Backend API

| Service | Purpose | Endpoint | Usage |
|---------|---------|----------|-------|
| **Bonet Backend API** | Blog content, bookings | `https://api.bonet.rw:8443/bonetBackend/backend/public/` | Blog fetching, sitemap generation |
| **Bonet Sitemap API** | Blog list for SEO | `https://api.bonet.rw:8443/bonetBackend/backend/public/blogsitemap` | sitemap.ts |

### Maps & Location

| Service | Purpose | Component | Implementation |
|---------|---------|-----------|----------------|
| **Google Maps API** | Location display | `GoogleMapEmbed`, `MapComponent` | React Google Maps (@react-google-maps/api) |

### Communication

| Service | Purpose | Component | Status |
|---------|---------|-----------|--------|
| **ChatBot** | AI customer support | `ChatBot`, `Bigbot` | Custom implementation |
| **LiveChatButton** | Direct messaging | `LiveChatButton` | Available on all pages |
| **Toast Notifications** | User feedback | `ModernToastContainer` | React Toastify |

### Social Sharing

| Service | Purpose | Component |
|---------|---------|-----------|
| **SocialShare** | Share buttons | `SocialShare` component |

### Form Handling

| Purpose | Implementation | Location |
|---------|---------------|----------|
| Contact Forms | React state + API submission | `contact/contact.jsx` |
| Booking Forms | Custom form components | `book/` directory |

---

## Environment Setup

### Environment Variables

#### Development (`.env`)
```env
# Development Performance Optimizations
NEXT_PUBLIC_DISABLE_ANIMATIONS=true
NEXT_PUBLIC_SKIP_API_CALLS=true
NODE_ENV=development
```

#### Development Override (`.env.development`)
```env
# Can override .env values for dev-specific settings
NEXT_PUBLIC_DISABLE_ANIMATIONS=true
NEXT_PUBLIC_SKIP_API_CALLS=true
NODE_ENV=development
```

### Required Environment Variables (Production)

The following should be set in production environment:

```env
# Base URL
NEXT_PUBLIC_BASE_URL=https://bonet.rw

# API Configuration
NEXT_PUBLIC_API_URL=https://api.bonet.rw:8443/bonetBackend/backend/public

# Analytics
NEXT_PUBLIC_GA_ID=G-3BEG46CGMG

# Google Maps (if needed for private API features)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here

# Optional: Feature flags
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_BOOKING=true
```

### Build Configuration

```typescript
// next.config.ts
const nextConfig = {
  // Performance optimizations
  staticPageGenerationTimeout: 500,
  compress: true,
  
  // TypeScript (production builds)
  typescript: {
    ignoreBuildErrors: true, // Disabled for dev speed
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: ['lucide-react', '@ant-design/icons', ...],
  }
};
```

### Deployment

- **Platform:** Netlify (inferred from `netlify.toml`)
- **Build Command:** `next build`
- **Dev Command:** `next dev --turbopack`

---

## Known Issues & Blockers

### Current Issues

#### 1. **Duplicate SEO Metadata on HR Support Page**
- **Location:** `src/app/hrsupport/page.tsx`
- **Issue:** Metadata title says "Business Consulting" instead of "HR & Admin Support"
- **Impact:** SEO confusion, wrong page indexed
- **Fix Required:** Update metadata object with correct HR-focused content

```typescript
// Current (WRONG):
title: "Business Consulting | Bonet Elite Services"

// Should be:
title: "HR & Admin Support | Bonet Elite Services"
description: "Professional HR and administrative support services..."
```

#### 2. **Travel Page Metadata Mismatch**
- **Location:** `src/app/travel/page.tsx`
- **Issue:** Page is in `/travel` folder but metadata says "Investment & Business Setup"
- **Impact:** Content/SEO mismatch
- **Fix Required:** Update metadata to reflect Travel/Hospitality content

#### 3. **Missing Environment Variables**
- **Issue:** Production environment variables not documented
- **Impact:** Deployment failures or missing features
- **Recommendation:** Create `.env.production` template

#### 4. **Missing Blog Preview Images**
- **Issue:** Some Open Graph image URLs may not exist:
  - `/images/bonet-preview.jpg`
  - `/images/blog-business-preview.jpg`
  - `/images/blog-investment-preview.jpg`
  - `/images/blog-travel-preview.jpg`
  - `/images/book-preview.jpg`
  - `/images/consulting-preview.jpg`
  - `/images/contact-preview.jpg`
  - `/images/investment-preview.jpg`
  - `/images/premium-services-preview.jpg`
- **Impact:** Social sharing shows broken images
- **Recommendation:** Verify and create all preview images in `public/images/`

#### 5. **Deprecated Metadata Export**
- **Location:** `src/app/hrsupport/page.tsx`, `src/app/travel/page.tsx`
- **Issue:** Using `export const metadata` with duplicate imports
- **Impact:** Potential build warnings
- **Fix:** Clean up duplicate component imports

#### 6. **Unused File**
- **Location:** `src/services/style.css` (0 bytes)
- **Issue:** Empty CSS file
- **Fix:** Remove or populate

### Performance Optimizations Needed

1. **Image Optimization**
   - Verify all Open Graph images exist and are optimized
   - Consider using `next/image` for all images

2. **Bundle Size**
   - Review `framer-motion` usage (12.23.24 is a large library)
   - Consider code-splitting heavier components

3. **API Timeouts**
   - Blog sitemap timeout set to 15s (good)
   - Consider implementing fallback content

### Security Considerations

1. **API Endpoint Exposure**
   - API URL is visible in client-side code
   - Ensure API has proper authentication/CORS

2. **Analytics Keys**
   - GA and Ahrefs keys are public (acceptable)
   - Verify no private keys in client bundles

---

## File Structure Map

```
c:/bonetlive/
├── .env                          # Environment variables
├── .env.development              # Dev-specific overrides
├── .gitignore                    # Git exclusions
├── i18n.ts                       # i18n configuration (EN/FR/CH)
├── netlify.toml                  # Deployment config
├── next.config.ts                # Next.js configuration
├── next-env.d.ts                 # Next.js TypeScript
├── package.json                  # Dependencies
├── package-lock.json             # Locked versions
├── postcss.config.mjs            # PostCSS config
├── README.md                     # Basic readme
├── slugify.js                    # URL slug utility
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript config
│
├── public/                       # Static assets
│   ├── assets/
│   │   └── images/               # Logo, icons
│   ├── image/                    # Page images (1.jpg - 20+ files)
│   ├── locales/                  # i18n translations
│   │   ├── ch/                   # Chinese translations
│   │   ├── en/                   # English translations
│   │   └── fr/                   # French translations
│   ├── utilis/
│   │   └── slugify.js            # Client-side slug utility
│   ├── _headers                  # Netlify headers
│   ├── bonet-preview.jpg         # Social preview
│   └── google*.html              # Search console verification
│
├── src/
│   ├── aboutUs/                  # About page components
│   │   ├── about.jsx
│   │   ├── experience.jsx
│   │   ├── founder.jsx
│   │   ├── mission.jsx
│   │   └── newexperience.tsx
│   │
│   ├── ai/                       # AI/Chat components
│   │   ├── chat.jsx
│   │   └── info.jsx
│   │
│   ├── app/                      # Next.js App Router
│   │   ├── about/                # /about route
│   │   │   ├── page.tsx
│   │   │   └── pageClient.tsx
│   │   ├── blog/                 # /blog/[slug] dynamic route
│   │   │   └── [slug]/
│   │   │       ├── BlogDetailClient.tsx
│   │   │       └── page.tsx
│   │   ├── blog-business/        # /blog-business
│   │   │   └── page.tsx
│   │   ├── blog-investment/      # /blog-investment
│   │   │   └── page.tsx
│   │   ├── blog-travel-tips/     # /blog-travel-tips
│   │   │   └── page.tsx
│   │   ├── blogs/                # /blogs listing
│   │   │   ├── BlogsClient.tsx
│   │   │   └── page.tsx
│   │   ├── bookNow/              # /bookNow
│   │   │   └── page.tsx
│   │   ├── consulting/           # /consulting
│   │   │   └── page.tsx
│   │   ├── contact/              # /contact
│   │   │   └── page.tsx
│   │   ├── hrsupport/            # /hrsupport
│   │   │   └── page.tsx
│   │   ├── investment/           # /investment
│   │   │   └── page.tsx
│   │   ├── services/             # /services
│   │   │   └── page.tsx
│   │   ├── travel/               # /travel
│   │   │   └── page.tsx
│   │   ├── visitrwanda/          # /visitrwanda
│   │   │   └── page.tsx
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout with SEO
│   │   ├── LayoutWrapper.tsx     # Client layout wrapper
│   │   ├── not-found.tsx         # 404 page
│   │   ├── page.tsx              # Homepage
│   │   ├── pageClient.tsx        # Homepage client logic
│   │   ├── sitemap-index.ts      # Sitemap index
│   │   └── sitemap.ts            # Dynamic sitemap
│   │
│   ├── assets/                   # Asset imports
│   │   └── react.svg
│   │
│   ├── blogs/                    # Blog content components
│   │   ├── business.jsx
│   │   ├── busreg.jsx
│   │   ├── firstbussiness.jsx
│   │   ├── firstinvestment.jsx
│   │   ├── firsttrip.jsx
│   │   ├── investment.jsx
│   │   └── trip.jsx
│   │
│   ├── book/                     # Booking system components
│   │   ├── apartments/           # Apartment booking
│   │   ├── custom/               # Custom booking
│   │   ├── transport/            # Transport booking
│   │   ├── bookingdetails.jsx
│   │   ├── container.jsx
│   │   ├── custom.jsx
│   │   ├── hotelcard.jsx
│   │   ├── hotelmore.jsx
│   │   ├── lasthotel.jsx
│   │   └── userdetails.jsx
│   │
│   ├── components/               # Reusable components
│   │   ├── Bigbot.jsx            # AI chatbot
│   │   ├── bot.tsx               # Main bot component
│   │   ├── CardHome.tsx          # Service cards
│   │   ├── features.jsx          # Feature highlights
│   │   ├── firsthome.tsx         # Hero section
│   │   ├── footer.tsx            # Site footer
│   │   ├── home.jsx              # Home sections
│   │   ├── knowledge.jsx         # Blog knowledge base
│   │   ├── LiveChatButton.jsx    # Live chat
│   │   ├── Logoname.tsx          # Logo component
│   │   ├── MenuBars.tsx          # Mobile navigation
│   │   ├── ModernToast.tsx       # Toast notifications
│   │   ├── navbar.tsx            # Navigation
│   │   ├── QuickButtons.jsx      # Quick action buttons
│   │   ├── resources.tsx         # Resources section
│   │   ├── reviews.jsx           # Testimonials
│   │   ├── SocialShare.jsx       # Social sharing
│   │   ├── Superfooter.tsx       # Enhanced footer
│   │   ├── TypewriterText.jsx    # Typewriter effect
│   │   └── visitrwanda.tsx       # Visit Rwanda gallery
│   │
│   ├── contact/                  # Contact page components
│   │   ├── contact.jsx           # Contact form
│   │   ├── firstcontact.jsx      # Contact header
│   │   └── map.jsx               # Map components
│   │
│   ├── navigation/               # Navigation components
│   │   └── map.jsx               # Navigation map
│   │
│   ├── services/                 # Service page components
│   │   ├── advisory.jsx          # Advisory services
│   │   ├── apartments.jsx        # Apartment listings
│   │   ├── consult.jsx           # Consulting content
│   │   ├── firstservice.jsx    # Service header
│   │   ├── hotel.jsx             # Hotel services
│   │   ├── hr.tsx                # HR services
│   │   ├── licensing.jsx         # Licensing info
│   │   ├── secondservice.jsx     # Secondary services
│   │   ├── service.jsx           # Service cards
│   │   ├── services.tsx          # Services main
│   │   ├── setup.jsx             # Business setup
│   │   ├── thirdserevice.jsx     # Tertiary services
│   │   ├── VisitFirst.jsx        # Visit page hero
│   │   └── whychoose.tsx         # Why choose us
│   │
│   ├── slugify.ts                # TypeScript slug utility
│   │
│   └── visit/                    # Visit Rwanda components
│       ├── visit.jsx             # Visit content
│       └── why.jsx               # Why invest section
│
└── node_modules/                 # Dependencies (generated)
```

---

## Quick Reference

### Page Routes Summary

| Route | File | Priority | Change Frequency |
|-------|------|----------|------------------|
| `/` | `app/page.tsx` | 1.0 | weekly |
| `/about` | `app/about/page.tsx` | 0.8 | monthly |
| `/services` | `app/services/page.tsx` | 0.8 | weekly |
| `/travel` | `app/travel/page.tsx` | 0.8 | weekly |
| `/investment` | `app/investment/page.tsx` | 0.8 | weekly |
| `/consulting` | `app/consulting/page.tsx` | 0.8 | weekly |
| `/hrsupport` | `app/hrsupport/page.tsx` | 0.8 | weekly |
| `/visitrwanda` | `app/visitrwanda/page.tsx` | 0.8 | weekly |
| `/contact` | `app/contact/page.tsx` | 0.8 | monthly |
| `/bookNow` | `app/bookNow/page.tsx` | 0.8 | weekly |
| `/blogs` | `app/blogs/page.tsx` | 0.9 | daily |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | 0.7 | weekly |
| `/blog-business` | `app/blog-business/page.tsx` | 0.6 | weekly |
| `/blog-investment` | `app/blog-investment/page.tsx` | 0.6 | weekly |
| `/blog-travel-tips` | `app/blog-travel-tips/page.tsx` | 0.6 | weekly |

### SEO Checklist

- [ ] All pages have unique metadata
- [ ] All pages have Open Graph tags
- [ ] All pages have Twitter Card tags
- [ ] All canonical URLs are correct
- [ ] Sitemap includes all routes
- [ ] All preview images exist in `/public/images/`
- [ ] Google Analytics is firing
- [ ] Google Search Console is verified
- [ ] Ahrefs tracking is active
- [ ] hreflang tags are correct
- [ ] Structured data validates

### Build Commands

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server
```

---

## Detailed File Reference with Line Numbers

This section provides precise file paths and line numbers for all critical configurations, SEO elements, and components.

### Configuration Files

#### Package.json - Dependencies
**File:** `c:/bonetlive/package.json`
- **Line 1-48** - All project dependencies and versions
- **Line 10-36** - Production dependencies (Next.js 16.0.8, React 19.1.0, etc.)
- **Line 37-46** - DevDependencies (TypeScript, Tailwind CSS 4.x)
- **Line 5-9** - Build scripts with Turbopack

#### Next.js Configuration
**File:** `c:/bonetlive/next.config.ts`
- **Line 1-63** - Complete Next.js configuration
- **Line 4-19** - Development performance optimizations (webpack settings)
- **Line 22** - Static page generation timeout: 500 seconds
- **Line 24-27** - TypeScript build errors ignored for dev speed
- **Line 30-40** - Image optimization with WebP/AVIF formats
- **Line 43** - React StrictMode conditional
- **Line 49-60** - Experimental features (optimizeCss, scrollRestoration, package imports)

#### Tailwind Configuration
**File:** `c:/bonetlive/tailwind.config.ts`
- **Line 1-41** - Tailwind CSS v4 configuration
- **Line 8-13** - Custom font families (Boogaloo, Inder, Poetsen, Sulphur)
- **Line 14-30** - Custom keyframes (typewriter, fadeIn, bubble, modalIn)
- **Line 32-36** - Animation utilities

#### TypeScript Configuration
**File:** `c:/bonetlive/tsconfig.json`
- **Line 1-32** - TypeScript compiler options
- **Line 20-25** - Path aliases (@/* mapped to src/*)

#### Internationalization
**File:** `c:/bonetlive/i18n.ts`
- **Line 1-25** - i18next configuration
- **Line 4-6** - Translation imports (EN, FR, CH)
- **Line 18** - Fallback language: English
- **Line 19** - Debug mode: true

### Root Layout & Global SEO

#### Root Layout
**File:** `c:/bonetlive/src/app/layout.tsx`
- **Line 1-57** - Root HTML layout
- **Line 5-16** - Global metadata object
- **Line 6** - metadataBase: https://bonet.rw
- **Line 7** - Global title
- **Line 8-9** - Global description
- **Line 10-11** - Global keywords
- **Line 19-21** - Viewport configuration function
- **Line 29** - Google Search Console verification meta tag
- **Line 30-31** - Preconnect links (API + Ahrefs)
- **Line 33-37** - Hreflang tags (en, fr, zh-CN, x-default)
- **Line 40-48** - Google Analytics 4 (gtag.js) script
- **Line 52** - Ahrefs analytics script in body

#### Layout Wrapper (Client-side)
**File:** `c:/bonetlive/src/app/LayoutWrapper.tsx`
- **Line 1-64** - Client layout wrapper
- **Line 11-13** - Dynamic imports (ChatBot, SuperFooter)
- **Line 16-21** - NProgress configuration
- **Line 28-43** - Progress bar on link clicks
- **Line 46-52** - Progress completion on route change
- **Line 54-61** - Component rendering order (Navbar → ChatBot → Toast → Children → Footer)

### Page-Level SEO by Route

#### Homepage (/) - Server Component
**File:** `c:/bonetlive/src/app/page.tsx`
- **Line 1-35** - Homepage with SEO metadata
- **Line 3-26** - Metadata object:
  - **Line 4** - Title: "Bonet Elite Services | Travel, Business & Investment Support in Rwanda"
  - **Line 5-6** - Description with business keywords
  - **Line 7-8** - Keywords: Bonet Elite Services Rwanda, travel, business, investment, VIP concierge
  - **Line 10** - Canonical: https://bonet.rw/
  - **Line 11-18** - Open Graph tags
  - **Line 19-25** - Twitter Card tags
- **Line 28-34** - Page component rendering HomePageClient

#### Homepage Client Component
**File:** `c:/bonetlive/src/app/pageClient.tsx`
- **Line 1-200+** - Client-side homepage logic
- Contains all section components: FirstHome, CardHome, ServiceSection, Features, Company, Customer, Partner, etc.

#### About Page (/about)
**File:** `c:/bonetlive/src/app/about/page.tsx`
- **Line 1-40** - About page with SEO
- **Line 5-30** - Metadata:
  - **Line 6** - Title: "About Us | Bonet Elite Services Rwanda"
  - **Line 7-8** - Description about company
  - **Line 9-10** - Keywords: About Bonet Elite Services, Rwanda concierge, etc.
  - **Line 11-21** - Open Graph
  - **Line 23-29** - Twitter Card

#### Services Page (/services)
**File:** `c:/bonetlive/src/app/services/page.tsx`
- **Line 1-50** - Services page
- **Line 8-39** - Metadata with full SEO configuration
- **Line 34** - MetadataBase: new URL("https://bonet.rw")
- **Line 35** - Robots: "index, follow"
- **Line 36-38** - Canonical URL

#### Travel Page (/travel) - ⚠️ KNOWN ISSUE
**File:** `c:/bonetlive/src/app/travel/page.tsx`
- **Line 1-44** - Travel page
- **Line 4-33** - Metadata (INCORRECT - says "Investment & Business Setup" instead of travel)
- **⚠️ BUG:** Title and description don't match the page content

#### Investment Page (/investment)
**File:** `c:/bonetlive/src/app/investment/page.tsx`
- **Line 1-44** - Investment page
- **Line 4-33** - Correct metadata for investment services
- **Line 5** - Title: "Investment & Business Setup | Bonet Elite Services"

#### Consulting Page (/consulting)
**File:** `c:/bonetlive/src/app/consulting/page.tsx`
- **Line 1-44** - Consulting page
- **Line 4-33** - Metadata for consulting services

#### HR Support Page (/hrsupport) - ⚠️ KNOWN ISSUE
**File:** `c:/bonetlive/src/app/hrsupport/page.tsx`
- **Line 1-45** - HR Support page
- **Line 5-34** - Metadata (INCORRECT - duplicates consulting metadata)
- **Line 6** - Title says "Business Consulting" - should say "HR & Admin Support"
- **⚠️ BUG:** Wrong metadata copy-pasted from consulting page

#### Visit Rwanda Page (/visitrwanda)
**File:** `c:/bonetlive/src/app/visitrwanda/page.tsx`
- **Line 1-45** - Visit Rwanda page
- **Line 5-33** - Tourism-focused metadata
- **Line 6** - Title: "Visit Rwanda | Bonet Elite Services"

#### Contact Page (/contact)
**File:** `c:/bonetlive/src/app/contact/page.tsx`
- **Line 1-47** - Contact page
- **Line 6-35** - Contact-specific SEO metadata
- **Line 7** - Title: "Contact Us | Bonet Elite Services"

#### Book Now Page (/bookNow)
**File:** `c:/bonetlive/src/app/bookNow/page.tsx`
- **Line 1-48** - Booking page
- **Line 6-37** - Booking-focused metadata
- **Line 7** - Title: "Book Hotels & Services in Rwanda | Bonet Elite Services"

#### Blogs Listing Page (/blogs)
**File:** `c:/bonetlive/src/app/blogs/page.tsx`
- **Line 1-78** - Blog listing page
- **Line 4-47** - Comprehensive metadata with Open Graph and Twitter
- **Line 5** - Title: "Blogs - Bonet Elite Services | Expert Articles..."
- **Line 53-74** - Structured data (Schema.org Blog type) injected via script

#### Blog Detail Page (/blog/[slug]) - Dynamic SEO
**File:** `c:/bonetlive/src/app/blog/[slug]/page.tsx`
- **Line 1-250** - Dynamic blog post page
- **Line 4** - export const dynamic = 'force-dynamic'
- **Line 6-14** - Blog TypeScript interface
- **Line 16-24** - slugifyTitle() function
- **Line 26-32** - normalizeSlug() function
- **Line 34-180** - generateMetadata() function (DYNAMIC SEO)
  - **Line 42-52** - API fetch with 10s timeout
  - **Line 62** - Extract blogs array from response
  - **Line 73-85** - Find blog by slug matching
  - **Line 104-172** - Return metadata with:
    - Dynamic title from slug
    - Dynamic description from quote or excerpt
    - Article-type Open Graph with publishedTime
    - Twitter Card with creator
    - Additional article: meta tags
- **Line 182-249** - Page component with:
  - **Line 188-245** - JSON-LD structured data (BreadcrumbList + BlogPosting)

#### Blog Categories

**Business Blog (/blog-business)**
**File:** `c:/bonetlive/src/app/blog-business/page.tsx`
- **Line 1-42** - Business category blog
- **Line 3-32** - Business-focused metadata

**Investment Blog (/blog-investment)**
**File:** `c:/bonetlive/src/app/blog-investment/page.tsx`
- **Line 1-43** - Investment category blog
- **Line 4-33** - Investment-focused metadata

**Travel Tips Blog (/blog-travel-tips)**
**File:** `c:/bonetlive/src/app/blog-travel-tips/page.tsx`
- **Line 1-43** - Travel tips category blog
- **Line 4-33** - Travel-focused metadata

#### 404 Not Found Page
**File:** `c:/bonetlive/src/app/not-found.tsx`
- **Line 1-18** - Custom 404 page
- **Line 7** - 404 heading with brand color (#188bff)

### SEO Infrastructure

#### Sitemap Generation
**File:** `c:/bonetlive/src/app/sitemap.ts`
- **Line 1-136** - Dynamic sitemap generator
- **Line 7-56** - Static pages array with priorities and change frequencies
- **Line 60** - API endpoint: https://api.bonet.rw:8443/bonetBackend/backend/public/blogsitemap
- **Line 67-99** - API fetch with 15s timeout
- **Line 108-126** - Blog URL generation with slugify
- **Line 128** - Return combined sitemap

### Component Architecture

#### Navigation
**File:** `c:/bonetlive/src/components/navbar.tsx`
- **Line 1-50+** - Main navigation component

**File:** `c:/bonetlive/src/components/MenuBars.tsx`
- **Line 1-300+** - Mobile navigation menu with animation

#### ChatBot System
**File:** `c:/bonetlive/src/components/bot.tsx`
- **Line 1-600+** - Main chatbot component with AI integration

**File:** `c:/bonetlive/src/components/Bigbot.jsx`
- **Line 1-200+** - Expanded chatbot view

**File:** `c:/bonetlive/src/components/LiveChatButton.jsx`
- **Line 1-200+** - Floating chat button

#### Homepage Components
**File:** `c:/bonetlive/src/components/firsthome.tsx`
- **Line 1-200+** - Hero section with typewriter animation

**File:** `c:/bonetlive/src/components/CardHome.tsx`
- **Line 1-150+** - Service cards grid

**File:** `c:/bonetlive/src/components/features.jsx`
- **Line 1-200+** - Features showcase

**File:** `c:/bonetlive/src/components/knowledge.jsx`
- **Line 1-350+** - Blog knowledge base preview

#### Footer
**File:** `c:/bonetlive/src/components/Superfooter.tsx`
- **Line 1-250+** - Enhanced footer with links and social

**File:** `c:/bonetlive/src/components/footer.tsx`
- **Line 1-200+** - Standard footer component

#### Toast Notifications
**File:** `c:/bonetlive/src/components/ModernToast.tsx`
- **Line 1-100+** - Toast notification container

#### Social Sharing
**File:** `c:/bonetlive/src/components/SocialShare.jsx`
- **Line 1-250+** - Social media share buttons

### Service Components

**File:** `c:/bonetlive/src/services/firstservice.jsx`
- **Line 1-50** - Service page header component

**File:** `c:/bonetlive/src/services/hotel.jsx`
- **Line 1-250+** - Hotel hospitality content

**File:** `c:/bonetlive/src/services/setup.jsx`
- **Line 1-450+` - Business setup content

**File:** `c:/bonetlive/src/services/consult.jsx`
- **Line 1-500+` - Consulting services content

**File:** `c:/bonetlive/src/services/hr.tsx`
- **Line 1-400+` - HR support content

### Booking System

**File:** `c:/bonetlive/src/book/container.jsx`
- **Line 1-250+` - Main booking container

**File:** `c:/bonetlive/src/book/hotelcard.jsx`
- **Line 1-450+` - Hotel card component with booking form

**File:** `c:/bonetlive/src/book/bookingdetails.jsx`
- **Line 1-250+` - Booking details form

### Contact System

**File:** `c:/bonetlive/src/contact/contact.jsx`
- **Line 1-450+` - Contact form with validation

**File:** `c:/bonetlive/src/contact/firstcontact.jsx`
- **Line 1-50` - Contact page header

**File:** `c:/bonetlive/src/contact/map.jsx`
- **Line 1-100+` - Google Maps integration

### Blog Components

**File:** `c:/bonetlive/src/blogs/busreg.jsx`
- **Line 1-400+` - Business registration content

**File:** `c:/bonetlive/src/blogs/investment.jsx`
- **Line 1-250+` - Investment opportunities content

**File:** `c:/bonetlive/src/blogs/trip.jsx`
- **Line 1-350+` - Travel tips content

### About Components

**File:** `c:/bonetlive/src/aboutUs/about.jsx`
- **Line 1-150+` - About section content

**File:** `c:/bonetlive/src/aboutUs/mission.jsx`
- **Line 1-150+` - Mission and vision

**File:** `c:/bonetlive/src/aboutUs/founder.jsx`
- **Line 1-50` - Founder information

---

## Environment Files Reference

### Development Environment
**File:** `c:/bonetlive/.env`
- **Line 1-4** - Environment variables
- **Line 2** - NEXT_PUBLIC_DISABLE_ANIMATIONS=true
- **Line 3** - NEXT_PUBLIC_SKIP_API_CALLS=true
- **Line 4** - NODE_ENV=development

**File:** `c:/bonetlive/.env.development`
- **Line 1-4** - Same as .env (development overrides)

### Deployment Configuration
**File:** `c:/bonetlive/netlify.toml`
- **Line 1-15** - Netlify deployment settings

---

## SEO Quick Reference Links

### Global SEO Elements (Root Layout)

| SEO Element | File | Line(s) | Purpose |
|-------------|------|---------|---------|
| **metadataBase** | `src/app/layout.tsx` | 6 | Base URL for all relative metadata URLs |
| **Global Title** | `src/app/layout.tsx` | 7 | Default page title fallback |
| **Global Description** | `src/app/layout.tsx` | 8-9 | Site-wide meta description |
| **Global Keywords** | `src/app/layout.tsx` | 10-11 | Primary business keywords |
| **Favicon** | `src/app/layout.tsx` | 13-15 | Site icon configuration |
| **Viewport** | `src/app/layout.tsx` | 19-21 | Responsive viewport settings |
| **Google Search Console** | `src/app/layout.tsx` | 29 | Verification meta tag |
| **Preconnect API** | `src/app/layout.tsx` | 30 | DNS prefetch for API |
| **Preconnect Ahrefs** | `src/app/layout.tsx` | 31 | DNS prefetch for analytics |
| **Hreflang EN** | `src/app/layout.tsx` | 34 | English language targeting |
| **Hreflang FR** | `src/app/layout.tsx` | 35 | French language targeting |
| **Hreflang ZH** | `src/app/layout.tsx` | 36 | Chinese language targeting |
| **Hreflang Default** | `src/app/layout.tsx` | 37 | X-default fallback |
| **Google Analytics** | `src/app/layout.tsx` | 40-48 | GA4 gtag.js implementation |
| **Ahrefs Analytics** | `src/app/layout.tsx` | 52 | Ahrefs tracking script |

### Page-Level SEO by Route

| Route | File | Metadata Lines | Canonical | OG Image |
|-------|------|----------------|-----------|----------|
| **Homepage (/)** | `src/app/page.tsx` | 3-26 | Line 10 | Line 17 |
| **About (/about)** | `src/app/about/page.tsx` | 5-30 | Implicit | Line 16-20 |
| **Services (/services)** | `src/app/services/page.tsx` | 8-39 | Line 36-38 | Line 20-24 |
| **Travel (/travel)** | `src/app/travel/page.tsx` | 4-33 | Line 13 | Line 19-23 |
| **Investment (/investment)** | `src/app/investment/page.tsx` | 4-33 | Line 13 | Line 19-23 |
| **Consulting (/consulting)** | `src/app/consulting/page.tsx` | 4-33 | Line 13 | Line 19-23 |
| **HR Support (/hrsupport)** | `src/app/hrsupport/page.tsx` | 5-34 | Line 14 | Line 20-24 |
| **Visit Rwanda (/visitrwanda)** | `src/app/visitrwanda/page.tsx` | 5-33 | Line 14 | Line 20-24 |
| **Contact (/contact)** | `src/app/contact/page.tsx` | 6-35 | Line 15 | Line 21-25 |
| **Book Now (/bookNow)** | `src/app/bookNow/page.tsx` | 6-37 | Line 36 | Line 21-26 |
| **Blogs (/blogs)** | `src/app/blogs/page.tsx` | 4-47 | Line 9 | Line 17-22 |
| **Blog Business (/blog-business)** | `src/app/blog-business/page.tsx` | 3-32 | Line 12 | Line 18-22 |
| **Blog Investment (/blog-investment)** | `src/app/blog-investment/page.tsx` | 4-33 | Line 13 | Line 19-23 |
| **Blog Travel (/blog-travel-tips)** | `src/app/blog-travel-tips/page.tsx` | 4-33 | Line 13 | Line 19-23 |

### Dynamic SEO (Blog Detail Page)

| SEO Feature | File | Line(s) | Function |
|-------------|------|---------|----------|
| **Dynamic Export** | `src/app/blog/[slug]/page.tsx` | 4 | Force dynamic rendering |
| **Blog Interface** | `src/app/blog/[slug]/page.tsx` | 6-14 | TypeScript type definition |
| **Slugify Function** | `src/app/blog/[slug]/page.tsx` | 16-24 | URL-friendly slug generator |
| **Normalize Slug** | `src/app/blog/[slug]/page.tsx` | 26-32 | Slug normalization |
| **generateMetadata** | `src/app/blog/[slug]/page.tsx` | 34-180 | Dynamic metadata generator |
| **API Fetch** | `src/app/blog/[slug]/page.tsx` | 42-52 | Blog data fetch with timeout |
| **Blog Matching** | `src/app/blog/[slug]/page.tsx` | 73-85 | Find blog by slug |
| **Dynamic Title** | `src/app/blog/[slug]/page.tsx` | 104-111 | Title from slug |
| **Dynamic OG** | `src/app/blog/[slug]/page.tsx` | 125-146 | Article Open Graph |
| **Dynamic Twitter** | `src/app/blog/[slug]/page.tsx` | 149-156 | Twitter Card data |
| **Article Meta** | `src/app/blog/[slug]/page.tsx` | 159-172 | article:* meta tags |
| **Breadcrumb JSON-LD** | `src/app/blog/[slug]/page.tsx` | 188-245 | Structured data |

### Sitemap & Indexing

| Feature | File | Line(s) | Details |
|---------|------|---------|---------|
| **Sitemap Export** | `src/app/sitemap.ts` | 3 | Default async export |
| **Static Pages** | `src/app/sitemap.ts` | 7-56 | Homepage priority 1.0, blogs 0.9 |
| **API Endpoint** | `src/app/sitemap.ts` | 60 | Blogs fetch URL |
| **Fetch Timeout** | `src/app/sitemap.ts` | 77 | 15 second timeout |
| **Blog URL Gen** | `src/app/sitemap.ts` | 108-126 | Slug generation logic |
| **Fallback** | `src/app/sitemap.ts` | 103-105 | Static pages on API fail |

### Structured Data Implementation

| Schema Type | File | Line(s) | Context |
|-------------|------|---------|---------|
| **Blog Schema** | `src/app/blogs/page.tsx` | 53-74 | Schema.org Blog type |
| **Blog Posting** | `src/app/blog/[slug]/page.tsx` | 216-242 | Schema.org BlogPosting |
| **Breadcrumb** | `src/app/blog/[slug]/page.tsx` | 192-214 | Schema.org BreadcrumbList |
| **Organization** | Both | Various | Publisher/Author data |

### Image Optimization

| Feature | File | Line(s) | Configuration |
|---------|------|---------|---------------|
| **WebP Format** | `next.config.ts` | 31 | Modern image format |
| **AVIF Format** | `next.config.ts` | 31 | Next-gen image format |
| **Remote Patterns** | `next.config.ts` | 32-40 | Allow api.bonet.rw images |
| **API Hostname** | `next.config.ts` | 35 | Backend image source |

### Internationalization (i18n) SEO

| Feature | File | Line(s) | Languages |
|---------|------|---------|-----------|
| **i18n Config** | `i18n.ts` | 1-25 | i18next initialization |
| **English** | `i18n.ts` | 4, 14 | EN translations |
| **French** | `i18n.ts` | 5, 15 | FR translations |
| **Chinese** | `i18n.ts` | 6, 16 | CH translations |
| **Fallback** | `i18n.ts` | 18 | English fallback |
| **Debug Mode** | `i18n.ts` | 19 | Development logging |

### Known SEO Issues (To Fix)

| Issue | File | Line | Problem | Fix Required |
|-------|------|------|---------|--------------|
| **HR Title Wrong** | `src/app/hrsupport/page.tsx` | 6 | Says "Business Consulting" | Change to "HR & Admin Support" |
| **HR Desc Wrong** | `src/app/hrsupport/page.tsx` | 7-8 | Consulting description | Write HR-focused description |
| **HR OG Wrong** | `src/app/hrsupport/page.tsx` | 12-26 | Consulting OG data | Update to HR content |
| **Travel Title Wrong** | `src/app/travel/page.tsx` | 5 | Says "Investment & Business" | Change to "Travel & Hospitality" |
| **Travel URL Wrong** | `src/app/travel/page.tsx` | 13 | Points to /investment | Change to /travel |
| **Missing OG Images** | Various | N/A | Preview images don't exist | Create images in /public/images/ |

### Performance SEO Features

| Feature | File | Line(s) | Benefit |
|---------|------|---------|---------|
| **Preconnect** | `layout.tsx` | 30-31 | Faster API/analytics loading |
| **Dynamic Imports** | `LayoutWrapper.tsx` | 12-13 | Lazy load ChatBot/Footer |
| **Lazy Loading** | `services/page.tsx` | 6 | Lazy BusinessRegistration |
| **Optimize CSS** | `next.config.ts` | 50 | Critical CSS extraction |
| **Package Imports** | `next.config.ts` | 52-58 | Faster builds |
| **NProgress** | `LayoutWrapper.tsx` | 16-21 | Visual loading feedback |
| **Scroll Restore** | `next.config.ts` | 51 | Maintain scroll position |

### Analytics & Tracking Elements

| Service | File | Line(s) | Tracking ID |
|---------|------|---------|-------------|
| **Google Analytics** | `layout.tsx` | 40-48 | G-3BEG46CGMG |
| **Search Console** | `layout.tsx` | 29 | XmA718kfY8J4ixoy_mtJ-RWVR38ho1jxm4EycrG0pM0 |
| **Ahrefs** | `layout.tsx` | 52 | ZwyWK9S5Y9ynmnRi3oqhwQ |

---

## Developer Quick Access Guide

### To Update Global SEO:
1. Edit `src/app/layout.tsx` lines 5-16 for metadata
2. Edit `src/app/layout.tsx` lines 28-52 for head scripts
3. Update favicon: `public/assets/images/logo.png`

### To Update Page SEO:
1. Find page in `src/app/[route]/page.tsx`
2. Edit `metadata` object at top of file (usually lines 3-40)
3. Update title, description, keywords, Open Graph, Twitter

### To Add a New Page with SEO:
1. Create `src/app/[new-route]/page.tsx`
2. Export `metadata` object with all SEO fields
3. Add page to `src/app/sitemap.ts` static pages array
4. Create OG image in `public/images/[page]-preview.jpg`

### To Fix Blog SEO:
1. Edit `src/app/blog/[slug]/page.tsx` lines 34-180
2. Modify `generateMetadata()` function
3. Update JSON-LD schema at lines 188-245

### To Update Site-wide Analytics:
1. Google Analytics: `src/app/layout.tsx` line 40-48
2. Ahrefs: `src/app/layout.tsx` line 52
3. Search Console: `src/app/layout.tsx` line 29 (meta tag)

### To Modify Sitemap:
1. Edit `src/app/sitemap.ts`
2. Add static pages to array (lines 7-56)
3. Update API endpoint if needed (line 60)

### To Add New Language:
1. Create translation file: `public/locales/[lang]/translation.json`
2. Import in `i18n.ts` (add lines like 4-6)
3. Add to resources (lines 14-16)
4. Add hreflang tag in `layout.tsx` (add line after 36)

---

## Component Architecture & Navigation Guide

### How Components Are Organized

The codebase follows a **feature-based organization** pattern:

```
src/
├── app/              # Next.js App Router (pages & layouts)
├── components/       # Shared reusable UI components
├── services/         # Service-specific components
├── aboutUs/          # About page components
├── book/             # Booking system components
├── blogs/            # Blog content components
├── contact/          # Contact page components
├── visit/            # Visit Rwanda components
├── ai/               # AI/Chat components
└── navigation/       # Navigation utilities
```

### Component Categories

#### 1. Layout Components (Global)

| Component | File | Purpose | Lines |
|-----------|------|---------|-------|
| **RootLayout** | `src/app/layout.tsx` | HTML shell + metadata | 1-57 |
| **LayoutWrapper** | `src/app/LayoutWrapper.tsx` | Client layout with Nav/Footer | 1-64 |
| **Navbar** | `src/components/navbar.tsx` | Main navigation | 1-50+ |
| **SuperFooter** | `src/components/Superfooter.tsx` | Enhanced footer | 1-250+ |
| **Footer** | `src/components/footer.tsx` | Standard footer | 1-200+ |

#### 2. Homepage Components

| Component | File | Purpose | Key Features |
|-----------|------|---------|--------------|
| **FirstHome** | `src/components/firsthome.tsx` | Hero section | Typewriter animation |
| **CardHome** | `src/components/CardHome.tsx` | Service cards | Grid layout, icons |
| **Features** | `src/components/features.jsx` | Features showcase | Icons, descriptions |
| **Knowledge** | `src/components/knowledge.jsx` | Blog preview | Dynamic content |
| **Reviews** | `src/components/reviews.jsx` | Testimonials | Carousel |
| **Company** | `src/components/company.jsx` | Trust badges | Logo grid |
| **Partner** | `src/components/partener.jsx` | Partners | Logo showcase |
| **Resources** | `src/components/resources.tsx` | Resources grid | Links, icons |
| **HowDev** | `src/components/howDev.jsx` | Process steps | Timeline |

#### 3. Service Page Components

| Component | File | Used In | Purpose |
|-----------|------|---------|---------|
| **FirstService** | `src/services/firstservice.jsx` | All service pages | Page header |
| **HotelHospitality** | `src/services/hotel.jsx` | /travel | Hotel content |
| **InvestmentSetup** | `src/services/setup.jsx` | /investment | Business setup |
| **BusinessConsulting** | `src/services/consult.jsx` | /consulting | Consulting |
| **HRAdminSupport** | `src/services/hr.tsx` | /hrsupport | HR services |
| **Advisory** | `src/services/advisory.jsx` | Various | Advisory content |
| **Apartments** | `src/services/apartments.jsx` | /book | Apartment listings |
| **Licensing** | `src/services/licensing.jsx` | Various | Licensing info |
| **WhyChoose** | `src/services/whychoose.tsx` | Various | Value props |

#### 4. Booking System Components

| Component | File | Purpose | Key Lines |
|-----------|------|---------|-----------|
| **ContainerWithButtons** | `src/book/container.jsx` | Main booking UI | 1-250+ |
| **HotelCard** | `src/book/hotelcard.jsx` | Hotel display + booking | 1-450+ |
| **BookingDetails** | `src/book/bookingdetails.jsx` | Booking form | 1-250+ |
| **UserDetails** | `src/book/userdetails.jsx` | User info form | 1-100+ |
| **LastHotel** | `src/book/lasthotel.jsx` | Recent bookings | 1-100+ |
| **HotelMore** | `src/book/hotelmore.jsx` | Hotel details | 1-100+ |

**Booking Subdirectories:**
- `src/book/apartments/` - Apartment booking flow
- `src/book/transport/` - Transport booking flow
- `src/book/custom/` - Custom booking requests

#### 5. Contact System Components

| Component | File | Purpose | Key Lines |
|-----------|------|---------|-----------|
| **FirstContact** | `src/contact/firstcontact.jsx` | Contact header | 1-50 |
| **ContactUs** | `src/contact/contact.jsx` | Contact form | 1-450+ |
| **GoogleMapEmbed** | `src/contact/map.jsx` | Map display | 1-100+ |
| **MapComponent** | `src/navigation/map.jsx` | Interactive map | 1-100+ |

#### 6. Blog System Components

| Component | File | Purpose | Location |
|-----------|------|---------|----------|
| **BlogsClient** | `src/app/blogs/BlogsClient.tsx` | Blog listing UI | Page-specific |
| **BlogDetailClient** | `src/app/blog/[slug]/BlogDetailClient.tsx` | Blog post UI | Page-specific |
| **BusinessBlog** | `src/blogs/busreg.jsx` | Business content | Reusable |
| **InvestmentBlog** | `src/blogs/investment.jsx` | Investment content | Reusable |
| **TravelBlog** | `src/blogs/trip.jsx` | Travel content | Reusable |
| **FirstBusiness** | `src/blogs/firstbussiness.jsx` | Business header | Reusable |
| **FirstInvestment** | `src/blogs/firstinvestment.jsx` | Investment header | Reusable |
| **FirstTrip** | `src/blogs/firsttrip.jsx` | Travel header | Reusable |

#### 7. About Page Components

| Component | File | Purpose |
|-----------|------|---------|
| **AboutSection** | `src/aboutUs/about.jsx` | Company story |
| **ExperienceSection** | `src/aboutUs/experience.jsx` | Years of experience |
| **FounderSection** | `src/aboutUs/founder.jsx` | Founder info |
| **MissionSection** | `src/aboutUs/mission.jsx` | Mission/vision |
| **NewExperience** | `src/aboutUs/newexperience.tsx` | Enhanced experience |

#### 8. AI/Chat Components

| Component | File | Purpose | Key Features |
|-----------|------|---------|--------------|
| **ChatBot** | `src/components/bot.tsx` | Main chat widget | AI integration |
| **BigBot** | `src/components/Bigbot.jsx` | Expanded chat | Full conversation |
| **LiveChatButton** | `src/components/LiveChatButton.jsx` | Floating button | Quick access |
| **AIChat** | `src/ai/chat.jsx` | Chat interface | Message handling |
| **AIInfo** | `src/ai/info.jsx` | Chat info display | Context |

#### 9. UI Utility Components

| Component | File | Purpose |
|-----------|------|---------|
| **ModernToast** | `src/components/ModernToast.tsx` | Toast notifications |
| **SocialShare** | `src/components/SocialShare.jsx` | Share buttons |
| **QuickButtons** | `src/components/QuickButtons.jsx` | Quick actions |
| **TypewriterText** | `src/components/TypewriterText.jsx` | Typewriter effect |
| **MenuBars** | `src/components/MenuBars.tsx` | Mobile menu |
| **Logoname** | `src/components/Logoname.tsx` | Logo component |
| **Voice** | `src/components/voice.jsx` | Voice features |
| **Call** | `src/components/call.jsx` | Call button |
| **Customer** | `src/components/customer.jsx` | Customer display |
| **Mesa** | `src/components/mesa.tsx` | Mesa component |
| **MesaAI** | `src/components/mesaai.tsx` | Mesa AI |

### Import Patterns

#### Server Component Imports (Default)
```typescript
// Direct imports - no 'use client' needed
import Component from "@/components/Component";
import { Metadata } from "next";
```

#### Client Component Imports
```typescript
// Top of file before imports
"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
```

#### Dynamic Imports (Lazy Loading)
```typescript
// In LayoutWrapper.tsx lines 11-13
const ChatBot = dynamic(() => import("@/components/bot"), { ssr: false });
const SuperFooterLazy = dynamic(() => import("@/components/Superfooter"), { ssr: false });

// In services/page.tsx line 6
const LazyBusinessRegistration = lazy(() => import("../../blogs/busreg"));
```

### Path Aliases (@/*)

| Alias | Maps To | Usage |
|-------|---------|-------|
| `@/components/*` | `src/components/*` | `import X from "@/components/X"` |
| `@/services/*` | `src/services/*` | `import X from "@/services/X"` |
| `@/app/*` | `src/app/*` | `import X from "@/app/X"` |

**Configuration:** `tsconfig.json` lines 20-25

---

## Development Workflow Guide

### Adding a New Page

1. **Create page file:**
   ```bash
   touch src/app/new-page/page.tsx
   ```

2. **Add SEO metadata (lines 1-40):**
   ```typescript
   export const metadata = {
     title: "New Page | Bonet Elite Services",
     description: "Page description",
     // ... complete SEO
   };
   ```

3. **Create page component:**
   ```typescript
   export default function NewPage() {
     return <div>New Page Content</div>;
   }
   ```

4. **Add to sitemap:**
   Edit `src/app/sitemap.ts` lines 7-56, add:
   ```typescript
   {
     url: `${baseUrl}/new-page`,
     lastModified: new Date(),
     changeFrequency: 'monthly',
     priority: 0.8,
   }
   ```

5. **Create OG image:**
   ```bash
   # Add to public/images/
   new-page-preview.jpg (1200x630)
   ```

### Adding a New Component

1. **Choose location:**
   - Global reusable: `src/components/NewComponent.tsx`
   - Feature-specific: `src/[feature]/NewComponent.tsx`

2. **Decide component type:**
   - Server Component: No directive, async allowed
   - Client Component: `"use client"` at top

3. **Export component:**
   ```typescript
   export default function NewComponent() {
     return <div>Content</div>;
   }
   ```

4. **Import in page:**
   ```typescript
   import NewComponent from "@/components/NewComponent";
   ```

### Modifying SEO

1. **Find the page:**
   - Check "Page-Level SEO by Route" table above
   - Navigate to file and line

2. **Edit metadata object:**
   - Title: Keep under 60 chars
   - Description: Keep under 160 chars
   - Keywords: 5-10 relevant terms

3. **Update Open Graph:**
   - og:title: Social title
   - og:description: Social description
   - og:image: 1200x630 preview image

4. **Update Twitter Cards:**
   - twitter:title
   - twitter:description
   - twitter:image

5. **Verify sitemap:**
   - Check page is included in `sitemap.ts`

### Debugging Issues

| Issue | File to Check | Lines | Solution |
|-------|---------------|-------|----------|
| Page not rendering | `src/app/[page]/page.tsx` | 30-40 | Check component export |
| SEO not updating | `src/app/[page]/page.tsx` | 1-40 | Verify metadata export |
| Images not loading | `next.config.ts` | 32-40 | Check remotePatterns |
| Build errors | `next.config.ts` | 24-27 | TypeScript settings |
| API failing | `src/app/[page]/page.tsx` | 40-60 | Check fetch URL |
| Styles not applying | `tailwind.config.ts` | 1-41 | Verify config |
| i18n not working | `i18n.ts` | 1-25 | Check init config |

---

*This reference guide provides direct navigation to every critical configuration, SEO element, and component in the Bonet Elite Services application.*

---

## API Integration & Data Flow

### Backend API Configuration

| Setting | Value | Location |
|---------|-------|----------|
| **Base URL** | `https://api.bonet.rw:8443/bonetBackend/backend/public` | Environment variable |
| **Port** | 8443 (HTTPS) | Hardcoded in fetch calls |
| **Timeout** | 10-15 seconds | Fetch signal config |
| **Blogs Endpoint** | `/blogs` | Blog listing/detail |
| **Sitemap Endpoint** | `/blogsitemap` | SEO sitemap data |

### API Endpoints Used

| Endpoint | Method | Purpose | Used In | Lines |
|----------|--------|---------|---------|-------|
| `/blogs` | GET | Fetch all blogs | `blog/[slug]/page.tsx` | 42-52 |
| `/blogs` | GET | Blog listing | `blogs/BlogsClient.tsx` | Various |
| `/blogsitemap` | GET | Sitemap data | `sitemap.ts` | 60, 69 |

### Fetch Configuration Pattern

```typescript
// Standard fetch pattern used across app
const response = await fetch("https://api.bonet.rw:8443/bonetBackend/backend/public/endpoint", {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  cache: 'no-store',
  signal: AbortSignal.timeout(10000), // 10 second timeout
});
```

**Found in:**
- `src/app/blog/[slug]/page.tsx` lines 42-52
- `src/app/sitemap.ts` lines 67-99

### Data Flow Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   User Request  │────▶│  Next.js App │────▶│   Backend API   │
│   (Browser)     │     │   (Vercel)   │     │ (api.bonet.rw)  │
└─────────────────┘     └──────────────┘     └─────────────────┘
                                │
                                ▼
                       ┌──────────────┐
                       │   Response   │
                       │   (JSON)     │
                       └──────────────┘
```

### Blog Data Structure

```typescript
interface Blog {
  id: number;
  title: string;
  image?: string;
  quote?: string;
  description?: string;
  created_at?: string;
  author?: string;
}
```

**Definition:** `src/app/blog/[slug]/page.tsx` lines 6-14

### Error Handling Pattern

```typescript
// API error handling
if (!response.ok) {
  throw new Error(`API returned ${response.status}`);
}

const data = await response.json();
const blogsArray = data?.data || data?.blogs || data;

if (!Array.isArray(blogsArray)) {
  return {
    title: "Blog - Bonet Elite Services",
    description: "Discover expert insights...",
  };
}
```

**Found in:** `src/app/blog/[slug]/page.tsx` lines 55-71

---

## State Management & Data Flow

### State Management Approach

This application uses **React's built-in state management** (no Redux/Zustand):

| Level | Method | Use Case |
|-------|--------|----------|
| **Local State** | `useState` | Form inputs, UI toggles |
| **Effect State** | `useEffect` | Side effects, data fetching |
| **Ref State** | `useRef` | DOM references, previous values |
| **Context** | React Context | Theme, auth (if added) |

### Client Component State Pattern

```typescript
"use client";

import { useState, useEffect, useRef } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const prevPathname = useRef(pathname);
  
  useEffect(() => {
    // Data fetching
    fetchData().then(setData);
  }, []);
  
  return <div>{data}</div>;
}
```

### NProgress State Management

**File:** `src/app/LayoutWrapper.tsx` lines 16-52

```typescript
// Configure progress bar
NProgress.configure({ 
  showSpinner: false,
  minimum: 0.1,
  speed: 400,
  trickleSpeed: 200
});

// Start on link click
const handleClick = (e: MouseEvent) => {
  const anchor = target.closest('a');
  if (anchor && anchor.href.startsWith(window.location.origin)) {
    NProgress.start();
  }
};

// Complete on route change
useEffect(() => {
  NProgress.done();
}, [pathname]);
```

### i18n State Management

**File:** `i18n.ts` lines 1-25

```typescript
i18n
  .use(LanguageDetector)  // Auto-detect browser language
  .use(initReactI18next)  // React integration
  .init({
    resources: { en, fr, ch },
    fallbackLng: 'en',
    debug: true,
  });
```

---

## Build & Deployment Configuration

### Next.js Build Settings

**File:** `next.config.ts`

| Setting | Value | Purpose | Line |
|---------|-------|---------|------|
| **SSG Timeout** | 500s | Static generation limit | 22 |
| **TypeScript Errors** | Ignored | Dev speed optimization | 24-27 |
| **Image Formats** | WebP, AVIF | Modern compression | 31 |
| **Remote Images** | api.bonet.rw | Allow external images | 35 |
| **Strict Mode** | Conditional | Dev vs prod | 43 |
| **Compression** | Enabled | Gzip compression | 46 |
| **Optimize CSS** | true | Critical CSS | 50 |
| **Scroll Restore** | true | UX improvement | 51 |
| **Package Imports** | 7 packages | Faster builds | 52-58 |

### Package Optimization

```typescript
optimizePackageImports: [
  'lucide-react', 
  '@ant-design/icons',
  'framer-motion',
  'react-i18next',
  'axios',
  'antd'
]
```

**Line:** `next.config.ts` line 52-58

### Netlify Configuration

**File:** `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Build Commands

| Command | Script | Purpose |
|---------|--------|---------|
| **Development** | `next dev --turbopack` | Dev server with hot reload |
| **Build** | `next build` | Production build |
| **Start** | `next start` | Production server |

**Location:** `package.json` lines 5-9

---

## Troubleshooting & Common Issues

### Build Issues

| Issue | Cause | Solution | File |
|-------|-------|----------|------|
| **Build timeout** | Slow API response | Increase timeout to 500s | `next.config.ts:22` |
| **Type errors** | Strict checking | Set ignoreBuildErrors: true | `next.config.ts:24-27` |
| **Image load fail** | Remote pattern missing | Add hostname to config | `next.config.ts:32-40` |
| **Memory error** | Large bundles | Enable package optimization | `next.config.ts:52-58` |

### Runtime Issues

| Issue | Cause | Solution | Location |
|-------|-------|----------|----------|
| **API timeout** | Slow backend | Increase AbortSignal timeout | Fetch calls: 10000ms |
| **Blog 404** | Slug mismatch | Check slugify function | `blog/[slug]/page.tsx:16-24` |
| **Metadata undefined** | Missing blog data | Add fallback metadata | `blog/[slug]/page.tsx:87-98` |
| **i18n not working** | Debug mode off | Set debug: true | `i18n.ts:19` |
| **Chat not loading** | SSR issue | Use dynamic import with ssr: false | `LayoutWrapper.tsx:12-13` |

### SEO Issues

| Issue | Cause | Solution | Priority |
|-------|-------|----------|----------|
| **Wrong page title** | Copy-paste error | Update metadata.title | High |
| **Missing OG image** | File doesn't exist | Add to public/images/ | High |
| **No canonical URL** | Missing alternates | Add alternates.canonical | Medium |
| **Duplicate content** | Same metadata | Make each page unique | High |
| **Sitemap 404** | API failure | Check /blogsitemap endpoint | Medium |

### Performance Issues

| Issue | Cause | Solution | Impact |
|-------|-------|----------|--------|
| **Slow initial load** | Large bundle | Use dynamic imports | High |
| **Animation jank** | Too many animations | Disable with flag | Medium |
| **Image loading** | No optimization | Use next/image | High |
| **Font loading** | Web fonts | Add font-display: swap | Low |

### Environment Issues

| Issue | Cause | Solution | Check |
|-------|-------|----------|-------|
| **API not found** | Wrong URL | Verify api.bonet.rw | `.env` |
| **Analytics not firing** | Wrong ID | Check GA/Ahrefs keys | `layout.tsx:29,40,52` |
| **Images blocked** | CORS | Verify remotePatterns | `next.config.ts:32-40` |
| **Build fails** | Node version | Use Node 18+ | `package.json` |

---

## Testing & Quality Assurance

### Manual Testing Checklist

#### SEO Testing
- [ ] All pages have unique titles (< 60 chars)
- [ ] All pages have descriptions (< 160 chars)
- [ ] Open Graph images exist and are 1200x630
- [ ] Twitter Cards display correctly
- [ ] Canonical URLs are correct
- [ ] Sitemap.xml is accessible at /sitemap.xml
- [ ] Structured data validates (use Google's tool)
- [ ] No duplicate content warnings

#### Functionality Testing
- [ ] All navigation links work
- [ ] Blog detail pages load with correct content
- [ ] Booking forms submit successfully
- [ ] Contact form sends messages
- [ ] Chat widget opens and functions
- [ ] Language switcher works (if implemented)
- [ ] Mobile menu opens/closes
- [ ] Footer links are correct

#### Performance Testing
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] No console errors
- [ ] Images load quickly (WebP/AVIF)

#### Responsive Testing
- [ ] Desktop (1920px) - Layout correct
- [ ] Laptop (1366px) - Layout correct
- [ ] Tablet (768px) - Layout correct
- [ ] Mobile (375px) - Layout correct
- [ ] Touch targets > 48px on mobile

### Tools for Testing

| Tool | Purpose | URL |
|------|---------|-----|
| **Google Rich Results** | Structured data | https://search.google.com/test/rich-results |
| **PageSpeed Insights** | Performance | https://pagespeed.web.dev/ |
| **Mobile-Friendly Test** | Mobile UX | https://search.google.com/test/mobile-friendly |
| **Schema Validator** | JSON-LD | https://validator.schema.org/ |
| **Ahrefs Site Audit** | SEO health | https://ahrefs.com/site-audit |
| **GTmetrix** | Performance | https://gtmetrix.com/ |

---

## Maintenance & Update Procedures

### Monthly Tasks

1. **SEO Health Check**
   - Run Ahrefs audit
   - Check Google Search Console for errors
   - Verify sitemap is up to date
   - Check for broken links

2. **Performance Review**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Review bundle size
   - Optimize images if needed

3. **Content Updates**
   - Update blog listing
   - Refresh testimonials
   - Update team photos
   - Check for outdated info

### Quarterly Tasks

1. **Dependency Updates**
   ```bash
   npm update
   npm audit
   npm audit fix
   ```

2. **Security Review**
   - Check for known vulnerabilities
   - Review API access logs
   - Verify analytics are working
   - Update environment variables if needed

3. **Backup Verification**
   - Verify code is in git
   - Check database backups (API side)
   - Document any config changes

### Annual Tasks

1. **Domain Renewal**
   - Check bonet.rw expiration
   - Verify SSL certificate
   - Update copyright year

2. **Major Version Updates**
   - Next.js major version
   - React major version
   - Node.js version
   - Test thoroughly before deploying

---

## Quick Command Reference

### Development

```bash
# Start development server
npm run dev

# Type checking
npx tsc --noEmit

# Lint checking
npx next lint
```

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server locally
npm run start

# Export static files (if needed)
next export
```

### Debugging

```bash
# Analyze bundle size
npx next build --analyze

# Check for circular dependencies
npx madge --circular src/

# List all routes
npx next dev &
curl http://localhost:3000/_next/static/development/_devPagesManifest.json
```

### Utilities

```bash
# Update dependencies
npm update

# Clean install
rm -rf node_modules
rm package-lock.json
npm install

# Check for outdated packages
npm outdated

# Audit security
npm audit
```

---

*This comprehensive reference guide covers every aspect of the Bonet Elite Services application - from configuration and SEO to troubleshooting and maintenance.*

---

## Contact & Support

**Development Team:** Bonet Elite Services  
**Domain:** https://bonet.rw  
**API:** https://api.bonet.rw:8443/bonetBackend/backend/public/

---

*End of READPROGRESS.md*
