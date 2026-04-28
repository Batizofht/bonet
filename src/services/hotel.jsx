"use client"
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { 
  Phone, 
  MessageCircle, 
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
    },
    {
      title: t("travelHospitality.page.services.airportTransfers.title"),
      subtitle: t("travelHospitality.page.services.airportTransfers.subtitle"),
      description: t("travelHospitality.page.services.airportTransfers.description"),
      image: "../assets/images/rentals.jpg",
      icon: Plane,
    },
    {
      title: t("travelHospitality.page.services.tourismGuides.title"),
      subtitle: t("travelHospitality.page.services.tourismGuides.subtitle"),
      description: t("travelHospitality.page.services.tourismGuides.description"),
      image: "../assets/images/tour.jpg",
      BookButton: t("travelHospitality.page.services.tourismGuides.bookButton"),
      icon: MapPin,
    },
    {
      title: t("travelHospitality.page.services.vipServices.title"),
      subtitle: t("travelHospitality.page.services.vipServices.subtitle"),
      description: t("travelHospitality.page.services.vipServices.description"),
      image: "../assets/images/vip.png",
      icon: Crown,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* HEADER */}
      <div className="text-center mb-16">
        <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
          Services
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
          Travel & <span className="text-[#C9A84C]">Hospitality</span>
        </h1>
        <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
          {t("travelHospitality.page.description")}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate.push("/bookNow")}
            className="flex items-center gap-3 bg-[#C9A84C] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#B8973B] transition-colors duration-300"
          >
            <Phone className="w-5 h-5" />
            Need seamless travel & Hospitality arrangements? Contact us now!
          </button>

          <button 
            onClick={openWhatsApp}
            className="flex items-center gap-3 border border-gray-300 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            {t("travelHospitality.page.buttons.quickContact")}
          </button>
        </div>
      </div>

      {/* SERVICES LIST */}
      <div className="space-y-12">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center overflow-hidden ${
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
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-80 lg:h-96 bg-gray-100 flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="lg:w-1/2 w-full p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <IconComponent className="w-7 h-7 text-[#C9A84C] flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {service.title}
                    </h2>
                  </div>
                </div>
                <p className="text-gray-500 font-medium text-sm uppercase tracking-wide mb-4">{service.subtitle}</p>

                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  {service.description}
                </p>

                {service.BookButton && (
                  <button
                    className="flex items-center gap-2 bg-[#C9A84C] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#B8973B] transition-colors"
                    onClick={() => navigate.push("/bookNow#tourism")}
                  >
                    <MapPin className="w-4 h-4" />
                    {service.BookButton}
                  </button>
                )}

                {/* Features */}
                <div className="flex flex-wrap gap-4 mt-6">
                  {["Premium Service", "Booking Travel", "24/7 Support"].map((data, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full"></div>
                      <span className="text-sm text-gray-600">{data}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}