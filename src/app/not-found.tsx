import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4">
      <h1 className="text-5xl font-bold mb-4 text-[#188bff]">404</h1>
      <p className="text-lg mb-6">Sorry, the page you’re looking for doesn’t exist.</p>
      <Link
        href="/"
        className="px-6 py-2 bg-[#188bff] rounded-full hover:bg-blue-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
