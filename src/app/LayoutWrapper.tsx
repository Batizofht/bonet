"use client";

import dynamic from 'next/dynamic';
import Navbar from "@/components/navbar";
import { ModernToastContainer } from "@/components/ModernToast";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Lazy load non-critical components
const ChatBot = dynamic(() => import("@/components/bot"), { ssr: false });
const SuperFooterLazy = dynamic(() => import("@/components/Superfooter"), { ssr: false });

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  minimum: 0.1,
  speed: 400,
  trickleSpeed: 200
});

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Start progress bar on link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        const targetPath = new URL(anchor.href).pathname;
        if (targetPath !== pathname) {
          NProgress.start();
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  // Complete progress bar when pathname changes
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      NProgress.done();
      prevPathname.current = pathname;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <ChatBot />
      <ModernToastContainer />
      {children}
      <SuperFooterLazy />
    </>
  );
}
