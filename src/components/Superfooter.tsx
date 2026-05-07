'use client'
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react";

const socialIcons = [
  {
    Icon: Facebook,
    label: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61579396603309&mibextid=ZbWKwL",
  },
  {
    Icon: Instagram,
    label: "Instagram",
    url: "https://www.instagram.com/bonet_elite_services_ltd/",
  },
  {
    Icon: Twitter,
    label: "Twitter",
    url: "https://x.com/BonetPJ?t=O_74Kuk2Z0Aja2Dqbj7lEA&s=09",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/108662677/admin/page-posts/published/",
  },
];

const SuperFooter = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="bg-white text-gray-700 border-t border-gray-200"
      role="contentinfo"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center md:text-left">
        
        {/* First Column - Logo & Description */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-6">
            <div className=" rounded-2xl flex items-center justify-center shadow-lg">
             <img src="../assets/images/logo.png" alt="Bonet Elite Services Logo" className="h-20 w-20" loading="lazy" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">Bonet Elite</h3>
              <p className="text-[#C9A84C] text-sm font-semibold">Services</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-xs leading-relaxed mb-6">
            {t("footer.description")}
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-3">
            {socialIcons.map(({ Icon, label, url }, idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-[#C9A84C] hover:border-[#C9A84C] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <Icon className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Second Column - Services */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-lg text-[#C9A84C] mb-6">
            Services
          </h3>
          <ul className="space-y-3 text-center md:text-left">
            {["business-registration", "investment", "consulting", "hr-recruitment", "relocation-services", "executive-travel"].map((link) => (
              <li key={link}>
                <a
                  href={`/${link}`}
                  className="text-gray-600 hover:text-[#C9A84C] transition-colors duration-300"
                >
                  {link.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Third Column - Company */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-lg text-[#C9A84C] mb-6">
            Company
          </h3>
          <ul className="space-y-3 text-center md:text-left">
            {[
              { path: "/about", label: "About Us" },
              { path: "/blogs", label: "Blog" },
              { path: "/faq", label: "FAQ" },
              { path: "/Reservations", label: "Reservations" },
              { path: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  className="text-gray-600 hover:text-[#C9A84C] transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Fourth Column - Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-lg text-[#C9A84C] mb-6">
            {t("footer.contactUs")}
          </h3>
          
          <p className="text-gray-600 mb-6 text-center md:text-left max-w-xs">
            {t("footer.contactDescription")}
          </p>

          <div className="space-y-3 w-full max-w-sm">
            <a href="tel:+250726300260" className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/60 p-4 hover:border-[#C9A84C] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-[#C9A84C]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[#C9A84C] font-semibold mb-1">{t("footer.whatsappCall")}</p>
                <p className="font-semibold text-gray-900">0726 300 260</p>
              </div>
            </a>

            <a href="mailto:info@bonet.rw" className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/60 p-4 hover:border-[#C9A84C] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-[#C9A84C]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[#C9A84C] font-semibold mb-1">{t("footer.email")}</p>
                <p className="font-semibold text-gray-900">info@bonet.rw</p>
              </div>
            </a>

            <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/60 p-4">
              <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-[#C9A84C]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[#C9A84C] font-semibold mb-1">{t("footer.location")}</p>
                <p className="font-semibold text-gray-900 leading-relaxed">Kigali, Rwanda, Masaka</p>
                <p className="text-sm text-gray-500 leading-relaxed">Dubai Port, Road</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:gap-6 pt-6 md:pt-8">
            {/* Copyright */}
            <div className="flex items-center gap-3 text-gray-500">
           
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700">Bonet Elite Services</span>
                <span className="text-xs text-gray-400">&copy; {new Date().getFullYear()} {t("footer.copyright")}</span>
              </div>
            </div>

            {/* Made with love indicator */}
            <div className="flex items-center justify-center">
              <img src="./image/SWCFY.png" alt="Switchify - Website Development Partner" className="h-8 md:h-10 w-auto max-w-[200px] rounded-md" />
            </div>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-colors duration-300 text-sm font-medium"
            >
              <span>Back to top</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SuperFooter;