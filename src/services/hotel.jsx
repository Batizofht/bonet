"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, MapPin } from "lucide-react";
import { MediaRow, WhatsAppButton, SectionHeader } from "@/components/ui/kit";

export default function HotelHospitality() {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);
  const p = "travelHospitality.page.services";

  const services = [
    { base: `${p}.hotelReservations`, image: "/assets/images/hot.jpg" },
    { base: `${p}.airportTransfers`, image: "/assets/photos/kigali-street.jpg" },
    { base: `${p}.tourismGuides`, image: "/assets/photos/gorilla.jpg", book: t(`${p}.tourismGuides.bookButton`) },
    { base: `${p}.vipServices`, image: "/assets/photos/conference-2.jpg" },
  ];

  const tags = [
    L("Premium Service", "Service Premium", "高端服务"),
    L("Booking Travel", "Réservation de Voyage", "旅行预订"),
    L("24/7 Support", "Support 24h/24 7j/7", "全天候支持"),
  ];

  return (
    <>
      {/* Merged in from the former /travel page (it now redirects to /executive-travel) */}
      <section id="travel-hospitality" className="border-t border-line bg-white py-16 md:py-24">
        <div className="container-x">
          <SectionHeader
            eyebrow={L("Services", "Services", "服务")}
            title={L("Travel & Hospitality", "Voyage et Hôtellerie", "旅游与酒店")}
            lead={t("travelHospitality.page.description")}
            action={
              <div className="flex flex-wrap gap-3">
                <Link href="/Reservations" className="btn btn-ink">
                  {L("Book now", "Réserver", "立即预订")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppButton>{t("travelHospitality.page.buttons.quickContact")}</WhatsAppButton>
              </div>
            }
          />
          <div className="space-y-20 md:space-y-28">
            {services.map((s, i) => (
              <MediaRow
                key={s.base}
                index={i}
                reverse={i % 2 === 1}
                image={s.image}
                imageAlt={t(`${s.base}.title`)}
                eyebrow={t(`${s.base}.subtitle`)}
                title={t(`${s.base}.title`)}
                footer={
                  <div className="flex flex-col items-start gap-6">
                    <ul className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-line bg-ivory px-3.5 py-1.5 text-[13px] font-medium text-ink-700">{tag}</li>
                      ))}
                    </ul>
                    {s.book && (
                      <Link href="/Reservations#tourism" className="btn btn-gold">
                        <MapPin className="h-4 w-4" />
                        {s.book}
                      </Link>
                    )}
                  </div>
                }
              >
                <p>{t(`${s.base}.description`)}</p>
              </MediaRow>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
