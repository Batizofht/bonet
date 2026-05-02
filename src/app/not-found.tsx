import React from "react";
import Link from "next/link";
import { Home, MessageCircle, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4 py-16">
      {/* 404 Icon */}
      <div className="w-24 h-24 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mb-8">
        <Search className="w-12 h-12 text-[#C9A84C]" />
      </div>

      {/* Title */}
      <h1 className="text-7xl font-bold mb-4 text-gray-900">404</h1>
      
      {/* Clear Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Page Not Found
      </h2>
      
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        The page you are looking for may have been moved, deleted, or never existed. 
        Please check the URL or return to our homepage.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-[#C9A84C] text-white font-semibold rounded-xl hover:bg-[#B8973B] transition-colors"
        >
          <Home className="w-5 h-5" />
          Go to Home
        </Link>
        
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-gray-800 font-semibold rounded-xl border-2 border-gray-200 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Contact Us
        </Link>
      </div>

      {/* Help Text */}
      <p className="text-sm text-gray-500 mt-8">
        Need help finding something?{" "}
        <Link href="/contact" className="text-[#C9A84C] hover:underline">
          Reach out to our team
        </Link>
      </p>
    </div>
  );
}
