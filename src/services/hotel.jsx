"use client"
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { 
  Phone, 
  MessageCircle, 
  Building, 
  MapPin, 
  Star,
  Hotel,
  Plane,
  Crown
} from "lucide-react";

export default function HotelHospitality() {
  const { t } = useTranslation();
  const navigate = useRouter();

  const openWhatsApp = () => {
    const phoneNumber = "250726300260";
    const appUrl = `whatsapp://send?phone=${phoneNumber}`;
    const webUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

    window.location.href = appUrl;
    setTimeout(() => {
      window.open(webUrl, "_blank");
    }, 1500);
  };

  const services = [
    {
      title: t("travelHospitality.page.services.hotelReservations.title"),
      subtitle: t("travelHospitality.page.services.hotelReservations.subtitle"),
      description: t("travelHospitality.page.services.hotelReservations.description"),
      image: "../assets/images/hot.jpg",
      icon: Hotel,
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: t("travelHospitality.page.services.airportTransfers.title"),
      subtitle: t("travelHospitality.page.services.airportTransfers.subtitle"),
      description: t("travelHospitality.page.services.airportTransfers.description"),
      image: "../assets/images/rentals.jpg",
      icon: Plane,
      color: "from-green-500 to-emerald-400"
    },
    {
      title: t("travelHospitality.page.services.tourismGuides.title"),
      subtitle: t("travelHospitality.page.services.tourismGuides.subtitle"),
      description: t("travelHospitality.page.services.tourismGuides.description"),
      image: "../assets/images/tour.jpg",
      BookButton: t("travelHospitality.page.services.tourismGuides.bookButton"),
      icon: MapPin,
      color: "from-purple-500 to-pink-400"
    },
    {
      title: t("travelHospitality.page.services.vipServices.title"),
      subtitle: t("travelHospitality.page.services.vipServices.subtitle"),
      description: t("travelHospitality.page.services.vipServices.description"),
      image: "../assets/images/vip.png",
      icon: Crown,
      color: "from-orange-500 to-amber-400"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* HEADER */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <Building className="w-6 h-6 text-[#188bff] animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Travel & <span className="bg-[#188bff] bg-clip-text text-transparent">Hospitality</span>
        </h1>
        <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
          {t("travelHospitality.page.description")}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={() => navigate.push("/bookNow")}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gradient-to-r from-[#188bff] to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            Need seamless travel&Hospitality arrangements? Contact us now!
          </motion.button>

          <motion.button 
            onClick={openWhatsApp}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            {t("travelHospitality.page.buttons.quickContact")}
          </motion.button>
        </div>
      </div>

      {/* SERVICES LIST */}
      <div className="space-y-12">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center bg-white rounded-3xl border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Image */}
              <div className="lg:w-1/2 w-full relative">
                {service.image ? (
                  <div className="relative overflow-hidden h-80 lg:h-96">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="lg:w-1/2 w-full p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#188bff] to-cyan-500 bg-clip-text text-transparent">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 font-semibold mt-1">{service.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  {service.description}
                </p>

                {service.BookButton && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-[#188bff] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
                    onClick={() => navigate.push("/bookNow#tourism")}
                  >
                    <MapPin className="w-4 h-4" />
                    {service.BookButton}
                  </motion.button>
                )}

                {/* Features */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {["Premium Service", "Booking Travel","24/7 DAYS Support"].map((data, i) => (
                    <div key={i} className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                      <Star className="w-3 h-3 text-[#188bff] fill-[#188bff]" />
                      <span className="text-sm text-gray-700">{data}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}