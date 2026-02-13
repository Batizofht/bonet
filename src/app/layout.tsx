import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";

export const metadata: Metadata = {
  title: "Bonet Elite Services | Travel, Business & Investment Support in Rwanda",
  description:
    "Your trusted partner for travel, business, and investment in Rwanda. We simplify your journey with tailored hospitality, business setup, consulting, HR, and VIP executive services.",
  keywords:
    "Bonet Elite Services Rwanda, travel Rwanda, business setup Rwanda, investment in Rwanda, VIP concierge Rwanda, luxury travel Kigali, HR services Rwanda, executive services Rwanda, tourism Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  icons: {
    icon: "/assets/images/logo.png",
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
      </head>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="ZwyWK9S5Y9ynmnRi3oqhwQ" defer></script>
      </body>
    </html>
  );
}
