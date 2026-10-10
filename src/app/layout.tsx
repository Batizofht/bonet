import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://bonet.rw"),
  title: {
    default: "Invest in Rwanda With Confidence | Bonet Elite Services",
    template: "%s | Bonet Elite Services",
  },
  description:
    "Helping foreign investors register companies, secure tax incentives, hire teams, relocate families, and travel through Rwanda. Fast, fully online business setup. Zero minimum capital.",
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

export function generateViewport() {
  return "width=device-width, initial-scale=1.0";
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="XmA718kfY8J4ixoy_mtJ-RWVR38ho1jxm4EycrG0pM0" />
        <link rel="preconnect" href="https://api.bonet.rw" />
        <link rel="alternate" hrefLang="en" href="https://bonet.rw" />
        <link rel="alternate" hrefLang="fr" href="https://bonet.rw" />
        <link rel="alternate" hrefLang="zh-CN" href="https://bonet.rw" />
        <link rel="alternate" hrefLang="x-default" href="https://bonet.rw" />
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
          {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-3BEG46CGMG');`}
        </Script>
        <Script id="fb-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1918347932949769');fbq('track','PageView');`}
        </Script>
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="ZwyWK9S5Y9ynmnRi3oqhwQ" strategy="lazyOnload" />
      </body>
    </html>
  );
}
