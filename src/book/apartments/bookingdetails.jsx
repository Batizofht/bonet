import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BookingOverlay from "./lastapartment";

const BookingDetailsApartment = ({ selectedHotel, checkInDate, checkOutDate, setCheckInDate, setCheckOutDate, setOpen, checked1, setChecked1, checked2, setChecked2 }) => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [showNextComponent, setShowNextComponent] = useState(false);
  const handleIncrement = (setter, currentValue) => setter(currentValue + 1);
  const handleDecrement = (setter, currentValue) => {
    if (currentValue > 0) setter(currentValue - 1);
  };
  const handleContinueClick = () => {
    setShowNextComponent(true);
  };
  if (showNextComponent) {
    return (
      <div className="flex justify-center items-center h-full mt-5 sm:-mt-2 flex-col">
      <BookingOverlay/>
      </div>
    );
  }

  return (
      <div className="justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-1xl font-semibold mb-4 text-[#C9A84C]">
              {L("Select Booking Dates","Sélectionnez les dates de réservation","选择预订日期")}
            </h2>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full text-gray-500 mb-4"
            />
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full text-gray-500"
            />
          </div>
          <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-1xl font-semibold mb-4 text-[#C9A84C]">
              {L("Booking Summary","Résumé de la réservation","预订摘要")}
            </h2>
            <p className="text-gray-600" style={{ fontSize: '14px' }}>
              {L("Apartment","Appartement","公寓")}: {selectedHotel || L("No apartment selected","Aucun appartement sélectionné","未选择公寓")}
            </p>
            <p className="text-gray-600" style={{ fontSize: '14px' }}>
              {L("Check-in","Arrivée","入住")}: {checkInDate || L("Not selected","Non sélectionné","未选择")}
            </p>
            <p className="text-gray-600" style={{ fontSize: '14px' }}>
              {L("Check-out","Départ","退房")}: {checkOutDate || L("Not selected","Non sélectionné","未选择")}
            </p>
          </div>

          {/* Guests section */}
          <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white mt-6">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer flex items-center justify-between bg-[#C9A84C] text-white p-3 rounded-lg"
            >
              <div className="flex items-center">
                <span>{L("Guests","Invités","宾客")}</span>
              </div>
              <div className="flex space-x-3">
                <div className="flex items-center space-x-1">
                  <span>{L("Adults","Adultes","成人")}: {adults}</span>
                  <span>{L("Children","Enfants","儿童")}: {children}</span>
                  <span>{L("Rooms","Chambres","房间")}: {rooms}</span>
                </div>
              </div>
            </div>

            {isOpen && (
              <div className="mt-4 p-4 bg-white shadow-lg rounded-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{L("Adults","Adultes","成人")}</h3>
                      <div className="flex items-center space-x-4 ml-4">
                        <button onClick={() => handleDecrement(setAdults, adults)} className="text-gray-500">-</button>
                        <span>{adults}</span>
                        <button onClick={() => handleIncrement(setAdults, adults)} className="text-gray-500">+</button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{L("Children","Enfants","儿童")}</h3>
                      <div className="flex items-center space-x-4 ml-4">
                        <button onClick={() => handleDecrement(setChildren, children)} className="text-gray-500">-</button>
                        <span>{children}</span>
                        <button onClick={() => handleIncrement(setChildren, children)} className="text-gray-500">+</button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{L("Rooms","Chambres","房间")}</h3>
                      <div className="flex items-center space-x-4 ml-4">
                        <button onClick={() => handleDecrement(setRooms, rooms)} className="text-gray-500">-</button>
                        <span>{rooms}</span>
                        <button onClick={() => handleIncrement(setRooms, rooms)} className="text-gray-500">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 md:space-y-6 md:mt-[23pc] md:mb-10">
          <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-1xl font-semibold text-[#C9A84C] mb-3">
              {L("No payment details required","Aucun paiement requis","无需支付信息")}
            </h2>
            <p className="text-gray-700" style={{ fontSize: '14px' }}>
              {L(
                `Your payment will be handled by ${selectedHotel || "the apartment"} so you don't need to enter any payment details for this booking.`,
                `Votre paiement sera géré par ${selectedHotel || "l'appartement"}, vous n'avez pas besoin de saisir de détails de paiement.`,
                `您的付款将由${selectedHotel || "公寓"}处理，您无需为此次预订输入任何支付信息。`
              )}
            </p>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <label className="flex items-start space-x-3 mb-2">
              <input type="checkbox" className="w-5 h-5 text-[#C9A84C]" onChange={() => setChecked1(!checked1)} />
              <span className="text-gray-700" style={{ fontSize: '14px' }}>
                {L(
                  "I consent to receiving marketing emails from bonet.rw, including promotions, personalized recommendations, rewards, travel experiences, and updates about boneteliteservice services.",
                  "J'accepte de recevoir des emails marketing de bonet.rw, y compris des promotions, recommandations personnalisées, récompenses, expériences de voyage et mises à jour sur les services boneteliteservice.",
                  "我同意接收来自bonet.rw的营销邮件，包括促销、个性化推荐、奖励、旅行体验以及boneteliteservice服务更新。"
                )}
              </span>
            </label>
            <label className="flex items-start space-x-3 mb-8">
              <input type="checkbox" className="w-5 h-5 text-[#C9A84C]" onChange={() => setChecked2(!checked2)} />
              <span className="text-gray-700" style={{ fontSize: '14px' }}>
                {L(
                  "I consent to receiving marketing emails from boneteliteservice, including promotions, personalized recommendations, rewards, travel experiences, and updates about boneteliteservice Transport Limited's and services.",
                  "J'accepte de recevoir des emails marketing de boneteliteservice, y compris des promotions, recommandations personnalisées, récompenses, expériences de voyage et mises à jour sur les services de Bonet Elite Service Transport Limited.",
                  "我同意接收来自boneteliteservice的营销邮件，包括促销、个性化推荐、奖励、旅行体验以及Bonet Elite Service运输有限公司的服务更新。"
                )}
              </span>
            </label>

            {/* Notice */}
            <p className="text-gray-700 text-sm mb-4">
              {L(
                `Your booking is directly with the apartment: ${selectedHotel || "No apartment selected"}, and by completing this booking, you agree to the booking conditions, general terms, and privacy policy.`,
                `Votre réservation est directement avec l'appartement : ${selectedHotel || "Aucun appartement sélectionné"}, et en complétant cette réservation, vous acceptez les conditions de réservation, les conditions générales et la politique de confidentialité.`,
                `您的预订直接与公寓：${selectedHotel || "未选择公寓"}签订，完成预订即表示您同意预订条款、一般条款和隐私政策。`
              )}
            </p>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                style={{ fontSize: '13px', width: '20pc', height: '3pc' }}
                className="hover:bg-[#C9A84C] hover:text-white text-gray-700 px-4 py-2 font-bold border border-gray-300 rounded text-gray-500 bg-gray-200">
                <span>{L("Check booking","Vérifier la réservation","检查预订")}</span>
              </button>

              <button
                onClick={handleContinueClick}
                style={{ fontSize: '13px', width: '20pc', height: '3pc' }}
                className="hover:bg-[#C9A84C] hover:text-white text-gray-700 px-4 py-2 font-bold border border-gray-300 rounded text-gray-500 bg-gray-200">
                <span>{L("Complete booking","Finaliser la réservation","完成预订")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BookingDetailsApartment;
