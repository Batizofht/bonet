import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";

const heading = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bonet.rw"),
  title: {
    default: "Invest in Rwanda With Confidence | Bonet Elite Services",
    // Short brand suffix keeps full titles under ~60 characters in Google
    template: "%s | Bonet Elite",
  },
  description:
    "Helping foreign investors register companies, secure tax incentives, hire teams, relocate families, and travel through Rwanda. Fast, fully online business setup. Zero minimum capital.",
  keywords:
    "Bonet Elite Services Rwanda, travel Rwanda, business setup Rwanda, investment in Rwanda, VIP concierge Rwanda, luxury travel Kigali, HR services Rwanda, executive services Rwanda, tourism Rwanda",
  authors: [{ name: "Bonet Elite Services", url: "https://bonet.rw" }],
  creator: "Bonet Elite Services",
  publisher: "Bonet Elite Services",
  applicationName: "Bonet Elite Services",
  category: "business",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Bonet Elite Services",
    locale: "en_US",
    images: [{ url: "https://bonet.rw/assets/images/bonet-og.png", width: 1200, height: 630, alt: "Bonet Elite Services, Kigali" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetPJ",
    images: ["https://bonet.rw/assets/images/bonet-og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c1a2e",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://bonet.rw/#organization",
  name: "Bonet Elite Services",
  alternateName: "Bonet Elite",
  url: "https://bonet.rw",
  // Search engines show logos on white, so schema keeps the dark-text version
  logo: "https://bonet.rw/assets/images/bonet-logo.png",
  image: "https://bonet.rw/assets/images/bonet-og.png",
  description:
    "Business registration, investment advisory, HR, relocation and executive travel for foreign investors in Rwanda.",
  email: "info@bonet.rw",
  telephone: "+250726300260",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Masaka, Dubai Port Road",
    addressLocality: "Kigali",
    addressCountry: "RW",
  },
  areaServed: [
    { "@type": "Country", name: "Rwanda" },
    { "@type": "Place", name: "East Africa" },
  ],
  knowsLanguage: ["en", "fr", "zh", "rw"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/profile.php?id=61579396603309",
    "https://www.instagram.com/bonet_elite_services_ltd/",
    "https://x.com/BonetPJ",
    "https://www.linkedin.com/company/108662677/",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${heading.variable} ${body.variable}`}>
      <head>
        <meta name="google-site-verification" content="XmA718kfY8J4ixoy_mtJ-RWVR38ho1jxm4EycrG0pM0" />
        <link rel="preconnect" href="https://api.bonet.rw" />
        {/* Consent bootstrap: everything starts denied until the visitor accepts
            in the cookie banner. A stored choice is replayed before any tag loads.
            Key must match CONSENT_KEY in components/CookieBanner.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
window.__bonetConsent=null;try{var c=JSON.parse(localStorage.getItem('bonet_cookie_consent')||'null');if(c&&c.v===1){window.__bonetConsent=c;gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:c.marketing?'granted':'denied',ad_user_data:c.marketing?'granted':'denied',ad_personalization:c.marketing?'granted':'denied'});}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }} alt="" src="https://www.facebook.com/tr?id=1918347932949769&ev=PageView&noscript=1" />
        </noscript>
        {/* Deferred analytics — load after interactive, never block first paint */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3BEG46CGMG" strategy="lazyOnload" />
        <Script id="gtag-init" strategy="lazyOnload">
          {`gtag('js', new Date());gtag('config', 'G-3BEG46CGMG');`}
        </Script>
        <Script id="fb-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('consent',(window.__bonetConsent&&window.__bonetConsent.marketing)?'grant':'revoke');fbq('init','1918347932949769');fbq('track','PageView');`}
        </Script>
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="ZwyWK9S5Y9ynmnRi3oqhwQ" strategy="lazyOnload" />
      </body>
    </html>
  );
}
