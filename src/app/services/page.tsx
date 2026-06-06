import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

export const metadata = {
  title: "All Services for Foreign Investors | Bonet Elite",
  description: "Five integrated services for foreign investors in Rwanda: Business Registration, Investment Advisory, HR & Recruitment, Executive Relocation, and Executive Travel. One team, end-to-end delivery.",
  keywords: "Bonet Elite Services, premium services Rwanda, business registration Rwanda, investment advisory Rwanda, HR recruitment Rwanda, relocation Rwanda, executive travel Rwanda",
  authors: [{ name: "Bonet Elite Services" }],
  openGraph: {
    type: "website",
    url: "https://bonet.rw/services",
    title: "All Services for Foreign Investors | Bonet Elite",
    description: "Five integrated services for foreign investors in Rwanda: Business Registration, Investment Advisory, HR & Recruitment, Executive Relocation, and Executive Travel. One team, end-to-end delivery.",
    images: [
      {
        url: "https://bonet.rw/assets/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Bonet Elite Services - Integrated Services for Foreign Investors in Rwanda",
      },
    ],
    siteName: "Bonet Elite Services",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BonetElite",
    title: "All Services for Foreign Investors | Bonet Elite",
    description: "Five integrated services for foreign investors in Rwanda: Business Registration, Investment Advisory, HR & Recruitment, Executive Relocation, and Executive Travel. One team, end-to-end delivery.",
    images: ["https://bonet.rw/assets/images/logo.png"],
  },
  metadataBase: new URL("https://bonet.rw"),
  robots: "index, follow",
  alternates: {
    canonical: "https://bonet.rw/services"
  }
};

interface ServiceItem {
  href: string;
  label: string;
  description: string;
}

interface ServiceGroup {
  title: string;
  items: ServiceItem[];
}

const serviceGroups: ServiceGroup[] = [
  {
    title: "Investment Advisory",
    items: [
      { href: "/business-registration", label: "Company Registration", description: "Company formation and legal setup" },
      { href: "/investment", label: "Investment Certificate", description: "RDB investment certification support" },
      { href: "/investment", label: "Business Permits", description: "Permits, compliance, and approvals" },
      { href: "/investment", label: "Market Research", description: "Market validation and opportunity mapping" },
    ],
  },
  {
    title: "Business Consulting",
    items: [
      { href: "/consulting", label: "Business Planning", description: "Growth strategy and execution planning" },
      { href: "/consulting", label: "Financial Advisory", description: "Financial structuring and advisory" },
      { href: "/consulting", label: "Process Optimization", description: "Operational efficiency and process design" },
      { href: "/consulting", label: "Project Auditing", description: "Project audit and implementation review" },
    ],
  },
  {
    title: "HR & Admin Support",
    items: [
      { href: "/hr-recruitment", label: "Recruitment", description: "Talent sourcing and onboarding" },
      { href: "/hrsupport", label: "HR Policy Development", description: "HR policy and compliance framework" },
      { href: "/hrsupport", label: "Employee Training", description: "Workforce training and capability building" },
      { href: "/hrsupport", label: "Administrative Support", description: "Back-office and admin operations" },
    ],
  },
  {
    title: "Travel & Hospitality",
    items: [
      { href: "/relocation-services", label: "Relocation & Concierge", description: "Relocation support, concierge, and settling-in services" },
      { href: "/executive-travel", label: "Executive Travel", description: "Executive travel coordination" },
      { href: "/travel", label: "Hotels", description: "Hotel and premium stay coordination" },
      { href: "/travel", label: "Transport", description: "Airport transfers and private transport" },
      { href: "/travel", label: "Tourism", description: "Curated tourism and local experiences" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative w-full h-[20vh] sm:h-[30vh] bg-gray-900 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/8.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Services</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">Our Services</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
        <div className="mb-12 lg:mb-16">
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Business Services</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">
            What We Offer
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {serviceGroups.map((group, gi) => (
            <div key={group.title} className="rounded-xl border border-gray-200 p-6 lg:p-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 pb-4 border-b border-gray-200">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item, ii) => (
                  <Link
                    key={`${gi}-${ii}`}
                    href={item.href}
                    className="group flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#C9A84C] transition-colors flex-shrink-0 ml-4" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
          >
            Talk to an Expert
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="p-8 md:p-12 border-b border-gray-100">
              <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Business Setup</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider mb-4">
                Complete Guide to Business Registration in Rwanda
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-sm">Bonet Business Team</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-sm">December 15, 2024</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-sm">8 min read</span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Starting a business in Rwanda has never been easier with the government&apos;s continued efforts to streamline the registration process. This comprehensive guide will walk you through every step needed to legally establish your business in Rwanda.
                </p>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Why Register Your Business in Rwanda?
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Rwanda ranks among the easiest places to do business in Africa, thanks to its efficient registration system, favorable tax policies, and strong support for entrepreneurs. Registered businesses gain access to legal protection, banking services, and government incentives.
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Need Help With Business Registration?
                  </h3>
                  <p className="text-gray-500 text-sm mb-5">
                    Let our experts handle the entire registration process for you. We ensure compliance with all regulations and save you time.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/business-registration" className="inline-flex items-center justify-center px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm">
                      Start Registration Today
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors text-sm">
                      Free Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative w-full bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/1.jpg')", minHeight: "30vh" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative flex flex-col items-center justify-center text-center px-4 py-16 lg:py-20">
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">Get Started</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
            Book a free 30-minute consultation. We will assess your needs and recommend the right path.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
          >
            Book Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
