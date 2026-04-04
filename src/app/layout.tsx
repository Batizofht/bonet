import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://bonet.rw"),
  title: {
    default: "Business Setup & Travel Services Rwanda | Bonet Elite",
    template: "%s | Bonet Elite Services",
  },
  description:
    "Business setup, travel, HR and investment support in Rwanda. Hotel booking, company registration, consulting and VIP services in Kigali.",
  keywords:
    "Bonet Elite Services Rwanda, travel Rwanda, business setup Rwanda, investment in Rwanda, VIP concierge Rwanda, luxury travel Kigali, HR services Rwanda, executive services Rwanda, tourism Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  icons: {
    icon: "/assets/images/logo.png",
  },
  openGraph: {
    type: "website",
    siteName: "Bonet Elite Services",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
};

// ✅ Add this outside of metadata
export function generateViewport() {
  return "width=device-width, initial-scale=1.0";
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={false}
    
    >
      <head>
       <meta name="google-site-verification" content="XmA718kfY8J4ixoy_mtJ-RWVR38ho1jxm4EycrG0pM0" />
       <link rel="preconnect" href="https://api.bonet.rw:8443" />
       <link rel="preconnect" href="https://analytics.ahrefs.com" />
       
       {/* International SEO - hreflang tags */}
       <link rel="alternate" hrefLang="en" href="https://bonet.rw" />
       <link rel="alternate" hrefLang="fr" href="https://bonet.rw" />
       <link rel="alternate" hrefLang="zh-CN" href="https://bonet.rw" />
       <link rel="alternate" hrefLang="x-default" href="https://bonet.rw" />
       
       {/* Google tag (gtag.js) */}
       <script async src="https://www.googletagmanager.com/gtag/js?id=G-3BEG46CGMG"></script>
       <script dangerouslySetInnerHTML={{
         __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'G-3BEG46CGMG');
         `
       }} />
      </head>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="ZwyWK9S5Y9ynmnRi3oqhwQ" defer></script>
      </body>
    </html>
  );
}
