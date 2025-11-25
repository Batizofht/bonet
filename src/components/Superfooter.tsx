'use client'
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin, Heart, ArrowRight } from "lucide-react";

const socialIcons = [
  {
    Icon: Facebook,
    label: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61579396603309&mibextid=ZbWKwL",
  },
  {
    Icon: Instagram,
    label: "Instagram",
    url: "https://www.instagram.com/bonet_elite_services/",
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
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gradient-to-b from-white to-blue-50 text-gray-700 border-t border-blue-100"
      role="contentinfo"
    >
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* First Column - Logo & Description */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-6">
            <div className=" rounded-2xl flex items-center justify-center shadow-lg">
             <img src="../assets/images/logo.png" alt="Logo" className="h-20 w-20" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-800">Bonet Elite</h3>
              <p className="text-[#188bff] text-sm">Services</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-xs leading-relaxed mb-6">
            {t("footer.description")}
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-3">
            {socialIcons.map(({ Icon, label, url }, idx) => (
              <motion.a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-blue-200 hover:bg-[#188bff] hover:border-[#188bff] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <Icon className="w-4 h-4 text-[#188bff] group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Second Column - Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-lg bg-[#188bff] bg-clip-text text-transparent mb-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#188bff] rounded-full animate-pulse"></div>
            {t("footer.quickLinks")}
          </h3>
          <ul className="space-y-4">
            {["aboutUs", "services", "bookNow"].map((link) => (
              <motion.li key={link} whileHover={{ x: 5 }}>
                <a
                  href={link}
                  className="text-gray-600 hover:text-[#188bff] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#188bff] transform group-hover:translate-x-1 transition-all" />
                  {t(`footer.${link}`)}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Third Column - Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-lg bg-[#188bff] bg-clip-text text-transparent mb-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#188bff] rounded-full animate-pulse"></div>
            {t("footer.contactUs")}
          </h3>
          
          <p className="text-gray-600 mb-6 text-center md:text-left">
            {t("footer.contactDescription")}
          </p>

          <div className="space-y-4">
            <motion.div 
              className="flex items-center gap-3 text-gray-600 group"
              whileHover={{ x: 5 }}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-[#188bff] transition-colors duration-300">
                <Phone className="w-4 h-4 text-[#188bff] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("footer.whatsappCall")}</p>
                <p className="font-semibold text-gray-800">0726 300 260</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-3 text-gray-600 group"
              whileHover={{ x: 5 }}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-[#188bff] transition-colors duration-300">
                <Mail className="w-4 h-4 text-[#188bff] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("footer.email")}</p>
                <p className="font-semibold text-gray-800">info@bonet.rw</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-3 text-gray-600 group"
              whileHover={{ x: 5 }}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-[#188bff] transition-colors duration-300">
                <MapPin className="w-4 h-4 text-[#188bff] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("footer.location")}</p>
                <p className="font-semibold text-gray-800">Kigali, Rwanda</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-2">
              <span>&copy; {new Date().getFullYear()} Bonet Elite Services</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>{t("footer.copyright")}</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="text-gray-500">{t("made_with")}</span>
              <div className="flex gap-1">
                <div className="w-4 h-4 bg-[#188bff] rounded-full flex justify-center text-center items-center text-white p-1 animate-bounce">S</div>
                <div className="w-4 h-4 bg-[#188bff] rounded-full flex justify-center text-center items-center text-white p-1 animate-bounce delay-100">W</div>
                <div className="w-4 h-4 bg-[#188bff] rounded-full flex justify-center text-center items-center text-white p-1 animate-bounce delay-200">C</div>
                 <div className="w-6 h-6 bg-[#188bff] rounded-full flex justify-center text-center items-center text-white p-1 animate-bounce delay-200">FY</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default SuperFooter;