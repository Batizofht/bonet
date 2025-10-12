"use client";

import Navbar from "@/components/navbar";
import SuperFooter from "@/components/Superfooter";
import ChatBot from "@/components/bot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
   const pathname = usePathname();

  useEffect(() => {
    NProgress.start(); // start loading bar
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      NProgress.done(); // end loading bar
    }, 500); // adjust duration if needed

    return () => {
      clearTimeout(timer); // cleanup
      NProgress.done(); // ensure bar ends if unmounted
    };
  }, [pathname]);

  return (
    <>
      <Navbar />
      <ChatBot />
      <ToastContainer position="top-right" autoClose={3000} />
      {children}
      <SuperFooter />
    </>
  );
}
