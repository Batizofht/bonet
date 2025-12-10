// src/book/HotelCard.jsx
import React, { useState } from "react";
import {
  Row,
  Col,
  Card as AntCard,
  Button,
  Modal,
  Select,
  Form,
  Input,
  DatePicker,
} from "antd";
import { toast, ToastContainer } from "react-toastify";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import AccommodationHotel from "../book/custom/hotelCustom";
import axios from "axios";
import { FaHotel, FaCogs, FaClipboardCheck } from "react-icons/fa";
import { text } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "react-i18next";
import CustomModal from "./custom/CustomModal";

const { Option } = Select;
const { RangePicker } = DatePicker;

const sampleHotels = [
 
  {
    hotel_name: "One&Only Gorilla's Nest",
    image_url: "/image/one.png",
    price: 1200,
    currency: "USD",
    location: "Volcanoes National Park",
  },
  {
    hotel_name: "Lake Kivu Serena Hotel",
    image_url: "/image/kivuserena.png",
    price: 180,
    currency: "USD",
    location: "Gisenyi, Lake Kivu",
  },
  {
    hotel_name: "Hotel des Mille Collines",
    image_url: "/image/millecolline.png",
    price: 110,
    currency: "USD",
    location: "Kigali - Nyarugenge",
  },
  {
    hotel_name: "Heaven Boutique Hotel",
    image_url: "/image/heaven.png",
    price: 90,
    currency: "USD",
    location: "Kiyovu, Kigali",
  },
  {
    hotel_name: "Radisson Blu Hotel",
    image_url: "/image/radison.png",
    price: 200,
    currency: "USD",
    location: "Kigali Convention Center",
  },
  {
    hotel_name: "Kivu Marina Bay Hotel",
    image_url: "/image/kivumarina.png",
    price: 160,
    currency: "USD",
    location: "Rusizi, Lake Kivu",
  },
  {
    hotel_name: "Classic Hotel",
    image_url: "/image/serena.png",
    price: 60,
    currency: "USD",
    location: "Musanze",
  },
];

const HotelCard = () => {
  const { t } = useTranslation();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [locationType, setLocationType] = useState(null);
  const [budgetType, setBudgetType] = useState(null);
  const [form] = Form.useForm();
  const [expanded, setExpanded] = useState({
    belief: false,
    services: false,
    booking: false,
  });

  const handleBookNow = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedHotel(null);
    setBudgetType(null);
    setLocationType(null);
    form.resetFields();
  };

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!values.date_range || values.date_range.length !== 2) {
        return toast.error("❌ Please select both check-in and check-out dates.");
      }

      const [checkinDate, checkoutDate] = values.date_range;

      const payload = {
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        guests: values.guests,
        purpose_of_stay: values.purpose_of_stay,
        custom_location: values.custom_location || values.location,
        location: values.location,
        checkin_date: dayjs(checkinDate).format("YYYY-MM-DD"),
        checkout_date: dayjs(checkoutDate).format("YYYY-MM-DD"),
        hotel_level: values.hotel_level,
        transport: values.transport,
        budget_range: values.budget_range,
        custom_budget: values.custom_budget || null,
        special_needs: values.special_needs || "",
        selected_hotel_name: selectedHotel?.hotel_name,
        selected_hotel_location: selectedHotel?.location,
      };

      await axios.post("https://api.bonet.rw/bonetBackend/backend/public/hotel-requests", payload);

      toast.success("✅ Hotel request submitted!");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to submit hotel request.");
    }
  };

  const InfoCard = ({ icon, title, content, id }) => {
    const isExpanded = expanded[id];
    return (
      <div
        className="bg-white border border-blue-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 cursor-pointer relative"
        onClick={() => toggleExpand(id)}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="text-[#188bff] text-2xl mt-1">{icon}</div>
          <h3 className="text-xl font-bold text-[#188bff]">{title}</h3>
        </div>

        <div
          className={`text-gray-700 text-sm text-left leading-relaxed overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-[800px]" : "max-h-[120px]"
          }`}
        >
          <div className={`${!isExpanded ? "fade-bottom relative" : ""}`}>{content}</div>
        </div>

        <div
        className="text-[#188bff] text-sm font-medium mt-3 underline"
        onClick={(e) => {
          e.stopPropagation();
          toggleExpand(id);
        }}
      >
        {isExpanded ? t("infoCards.hotelCard.viewLess") : t("infoCards.hotelCard.viewMore")}
      </div>
      </div>
    );
  };

  return (
    <div>
      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <InfoCard
          id="belief"
          icon={<FaHotel />}
          title={t("infoCards.belief.title")}
          content={
            <>
              {t("infoCards.belief.content.part1")}{" "}
              <span className="text-[#188bff] font-medium">
                {t("brandName")}
              </span>
              {t("infoCards.belief.content.part2")}
              <strong>{t("infoCards.belief.content.comfort")}</strong>,{" "}
              <strong>{t("infoCards.belief.content.class")}</strong>,{" "}
              <strong>{t("infoCards.belief.content.privacy")}</strong>,{" "}
              <strong>{t("infoCards.belief.content.efficiency")}</strong>.
            </>
          }
        />

        <InfoCard
          id="services"
          icon={<FaCogs />}
          title={t("infoCards.services.title")}
          content={
            <>
              {t("infoCards.services.content.intro")}
              <ul className="list-disc list-outside pl-5 mt-3 space-y-1">
                <li>{t("infoCards.services.content.list.premiumSelection")}</li>
                <li>{t("infoCards.services.content.list.flexibility")}</li>
                <li>{t("infoCards.services.content.list.transport")}</li>
                <li>{t("infoCards.services.content.list.roomSetup")}</li>
                <li>{t("infoCards.services.content.list.assistance")}</li>
              </ul>
            </>
          }
        />

        <InfoCard
          id="booking"
          icon={<FaClipboardCheck />}
          title={t("infoCards.booking.title")}
          titleColor="text-[#188bff]"
          content={
            <>
              {t("infoCards.booking.content")}
            </>
          }
        />
      </div>

      {/* CTA Button */}
      <div className="text-center mb-10">
        <h4 className="text-xl font-semibold text-[#188bff] mb-4">
          {t("cta.heading")}
        </h4>
        <Button
          onClick={() => setShowCustomModal(true)}
          className="bg-gradient-to-r from-blue-600 to-sky-500 text-white px-8 py-3 rounded-lg shadow-lg font-semibold hover:from-blue-700 hover:to-sky-600 transition-all duration-300"
        >
          {t("cta.button")}
        </Button>
      </div>
      {/* Hotel Cards */}
      <Row gutter={[16, 16]}>
        {sampleHotels.map((hotel, index) => (
          <Col xs={24} sm={12} md={12} lg={8} key={index}>
            <AntCard
              hoverable
              cover={
                <img
                  alt={hotel.hotel_name}
                  src={hotel.image_url}
                  className="h-60 object-cover w-full"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/300x200?text=Hotel+Image")
                  }
                />
              }
              className="shadow rounded-md"
            >
              <h1 className="text-lg font-semibold text-blue-500">
                {hotel.hotel_name}
              </h1>
              <p className="text-sm text-gray-600">{hotel.location}</p>
              {/* <p className="text-blue-600 font-bold">
                {hotel.price} {hotel.currency}
              </p> */}
              <Button
  className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white"
  onClick={() => handleBookNow(hotel)}
>
  {t("infoCards.hotelCard.bookNow")}
</Button>
            </AntCard>
          </Col>
        ))}
      </Row>

      {/* Booking Modal */}
      <Modal
        title={`Booking for ${selectedHotel?.hotel_name}`}
        open={showModal}
        onCancel={closeModal}
        footer={null}
        destroyOnHidden
        width={800}
      >
        <AccommodationHotel form={form} handleSubmit={handleSubmit} />
      </Modal>



<CustomModal
  open={showCustomModal}
  onClose={() => {
    setShowCustomModal(false)
   
  }}
  title={t("form.title")}
/>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default HotelCard;
