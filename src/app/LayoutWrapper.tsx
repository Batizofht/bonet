"use client";

import Navbar from "@/components/navbar";
import SuperFooter from "@/components/Superfooter";
import ChatBot from "@/components/bot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
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
