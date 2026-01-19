"use client";

import Navbar from "@/components/navbar";
import SuperFooter from "@/components/Superfooter";
import ChatBot from "@/components/bot";
import { ModernToastContainer } from "@/components/ModernToast";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress for faster, smoother transitions
NProgress.configure({ 
  showSpinner: false,
  minimum: 0.1,
  speed: 200,
  trickleSpeed: 100
});

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Immediately complete any pending progress bar
    NProgress.done();
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <ChatBot />
      <ModernToastContainer />
      {children}
      <SuperFooter />
    </>
  );
}
