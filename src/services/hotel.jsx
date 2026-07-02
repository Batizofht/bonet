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
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
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
    <div>
      {/* HEADER */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
              {L("Services","Services","服务")}
            </span>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 uppercase tracking-wider">
              {L("Travel & Hospitality","Voyage et Hôtellerie","旅游与酒店")}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {t("travelHospitality.page.description")}
            </p>

            <div className="flex justify-center mt-10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate.push("/Reservations")}
                  className="inline-flex items-center gap-2 bg-[#C9A84C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8973B] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {L("Need seamless travel & hospitality arrangements? Contact us now!","Besoin d'arrangements de voyage et d'hôtellerie ? Contactez-nous maintenant !","需要无缝旅行和酒店安排？立即联系我们！")}
                </button>

                <button 
                  onClick={openWhatsApp}
                  className="inline-flex items-center gap-2 border border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t("travelHospitality.page.buttons.quickContact")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid gap-10">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Image */}
                  <div className="lg:w-1/2 w-full">
                    {service.image ? (
                      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 h-80 lg:h-96">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-80 lg:h-96 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center">
                        <IconComponent className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2 w-full px-0 lg:px-12 py-8 lg:py-0">
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className="w-6 h-6 text-[#C9A84C] flex-shrink-0" strokeWidth={1.5} />
                      <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-gray-500 font-medium text-xs uppercase tracking-wide mt-3 mb-4">{service.subtitle}</p>

                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>

                    {service.BookButton && (
                      <button
                        className="mt-6 inline-flex items-center gap-2 bg-[#C9A84C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8973B] transition-colors text-sm"
                        onClick={() => navigate.push("/Reservations#tourism")}
                      >
                        <MapPin className="w-4 h-4" />
                        {service.BookButton}
                      </button>
                    )}

                    {/* Features */}
                    <div className="flex flex-wrap gap-4 mt-6">
                      {[
                        L("Premium Service","Service Premium","高端服务"),
                        L("Booking Travel","Réservation de Voyage","旅行预订"),
                        L("24/7 Support","Support 24h/24 7j/7","全天候支持")
                      ].map((data, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded"></div>
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
      </section>
    </div>
  );
}