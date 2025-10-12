'use client'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const socialIcons = [
  {
    Icon: FaFacebookF,
    label: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61579396603309&mibextid=ZbWKwL",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    url: "https://www.instagram.com/bonet_elite_services/",
  },
  {
    Icon: FaTwitter,
    label: "Twitter",
    url: "https://x.com/BonetPJ?t=O_74Kuk2Z0Aja2Dqbj7lEA&s=09",
  },
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/108662677/admin/page-posts/published/",
  },
];

const SuperFooter = () => {
  const { t } = useTranslation();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-white text-gray-700 text-sm border-t border-gray-200"
      role="contentinfo"
    >
      {/* SVG Gradient for Icons */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#188bff" />
            <stop offset="100%" stopColor="#62b1ff" />
          </linearGradient>
        </defs>
      </svg>

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* First Column */}
        <div className="flex flex-col items-center md:items-start">
          <img src="../assets/images/logo.png" alt="Logo" className="h-30 w-30" />
          <p className="mt-4 text-gray-500 max-w-xs">{t("footer.description")}</p>
        </div>

        {/* Second Column - Links */}
        <div>
          <h3 className="font-bold text-transparent bg-gradient-to-r from-[#188bff] to-[#62b1ff] bg-clip-text mb-4">
            {t("footer.quickLinks")}
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="/about"
                className="text-gray-500 hover:text-black transition-colors duration-200"
              >
                {t("footer.aboutUs")}
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-gray-500 hover:text-black transition-colors duration-200"
              >
                {t("footer.services")}
              </a>
            </li>
            <li>
              <a
                href="/bookNow"
                className="text-gray-500 hover:text-black transition-colors duration-200"
              >
                {t("footer.bookNow")}
              </a>
            </li>
          </ul>
        </div>

        {/* Third Column - Contact */}
        <div>
          <h3 className="font-bold text-transparent bg-gradient-to-r from-[#188bff] to-[#62b1ff] bg-clip-text mb-4">
            {t("footer.contactUs")}
          </h3>
          <p className="text-gray-500 mb-2">
            {t("footer.contactDescription")}
          </p>

          <p className="text-gray-500 font-medium">
            <span>{t("footer.whatsappCall")}</span> 0726 300 260
          </p>
          <p className="text-gray-500 font-medium">
            <span>{t("footer.email")}</span> info@bonet.rw
          </p>
          <p className="text-gray-500 font-medium">
            <span>{t("footer.location")}</span> Kigali, Rwanda
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            {socialIcons.map(({ Icon, label, url }, idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-200"
              >
                <Icon className="text-lg" style={{ fill: "url(#gradient)" }} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-300 mx-6" />

      {/* Bottom Section */}
      <div className="text-center py-4 text-gray-500">
        &copy; {new Date().getFullYear()} Bonet Elite Services{" "}
        {t("footer.copyright")}
      </div>
    </motion.footer>
  );
};

export default SuperFooter;
