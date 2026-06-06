'use client'
import Link from "next/link";
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
      className="bg-white text-gray-700 border-t border-gray-200 relative z-10 -mt-16 rounded-t-[60px]"
      role="contentinfo"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* First Column - Logo & Description */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-4">
            <img src="../assets/images/logo.png" alt="Bonet Elite Services Logo" className="h-16 w-16" loading="lazy" />
            <div>
              <h3 className="font-bold text-lg text-gray-900">Bonet Elite</h3>
              <p className="text-[#C9A84C] text-sm font-semibold">Services</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
            {t("footer.description")}
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialIcons.map(({ Icon, label, url }, idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-400 hover:text-[#C9A84C] transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Second Column - Services */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider mb-4">
            Services
          </h3>
          <ul className="space-y-2 text-sm">
            {["business-registration", "investment", "consulting", "hr-recruitment", "relocation-services", "executive-travel"].map((link) => (
              <li key={link}>
                <a
                  href={`/${link}`}
                  className="text-gray-500 hover:text-[#C9A84C] transition-colors"
                >
                  {link.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Third Column - Company */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider mb-4">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
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
                  className="text-gray-500 hover:text-[#C9A84C] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Fourth Column - Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider mb-4">
            {t("footer.contactUs")}
          </h3>
          
          <p className="text-gray-500 text-sm mb-4 max-w-xs">
            {t("footer.contactDescription")}
          </p>

          <div className="space-y-3 w-full max-w-sm">
            <a href="tel:+250726300260" className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 hover:border-[#C9A84C] transition-colors">
              <Phone className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
              <div>
                <p className="text-xs text-[#C9A84C] font-semibold">{t("footer.whatsappCall")}</p>
                <p className="text-sm font-semibold text-gray-900">0726 300 260</p>
              </div>
            </a>

            <a href="mailto:info@bonet.rw" className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 hover:border-[#C9A84C] transition-colors">
              <Mail className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
              <div>
                <p className="text-xs text-[#C9A84C] font-semibold">{t("footer.email")}</p>
                <p className="text-sm font-semibold text-gray-900">info@bonet.rw</p>
              </div>
            </a>

            <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3">
              <MapPin className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
              <div>
                <p className="text-xs text-[#C9A84C] font-semibold">{t("footer.location")}</p>
                <p className="text-sm font-semibold text-gray-900">Kigali, Rwanda, Masaka</p>
                <p className="text-xs text-gray-500">Dubai Port, Road</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Bonet Elite Services. {t("footer.copyright")}</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SuperFooter;