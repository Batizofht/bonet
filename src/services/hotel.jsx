"use client"
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Modal,
  TimePicker,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { 
  Phone, 
  MessageCircle, 
  Building, 
  Car, 
  MapPin, 
  Users, 
  Star,
  Sparkles,
  Hotel,
  Plane,
  Globe,
  Crown,
  X
} from "lucide-react";

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function HotelHospitality() {
  const { t } = useTranslation();
  const navigate = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("hotel");
  const [rentTime, setRentTime] = useState(null);
  const [form] = Form.useForm();
  const bookingRef = useRef(null);
  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);

  const openWhatsApp = () => {
    const phoneNumber = "250726300260";
    const appUrl = `whatsapp://send?phone=${phoneNumber}`;
    const webUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

    window.location.href = appUrl;
    setTimeout(() => {
      window.open(webUrl, "_blank");
    }, 1500);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE",
    libraries: ["places"],
  });

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

  const handlePlaceChange = (fieldName, ref) => {
    if (ref.current) {
      const place = ref.current.getPlace();
      if (place?.formatted_address) {
        form.setFieldsValue({ [fieldName]: place.formatted_address });
      } else if (place?.name) {
        form.setFieldsValue({ [fieldName]: place.name });
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const [checkinDate, checkoutDate] = values.date_range || [];

      let payload = {
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        guests: values.guests,
        purpose_of_stay: values.purpose_of_stay,
        location: values.location,
        transport: values.transport,
        checkin_date: checkinDate?.format("YYYY-MM-DD"),
        checkout_date: checkoutDate?.format("YYYY-MM-DD"),
        special_needs: values.special_needs || "",
        budget_range: values.budget_range,
      };

      if (selectedService === "hotel") {
        payload = {
          ...payload,
          hotel_level: values.hotel_level,
          hotel_custom: values.hotel_custom,
        };
      } else if (selectedService === "apartment") {
        payload = {
          ...payload,
          room_type: values.room_type,
          apartment_custom: values.apartment_custom,
        };
      } else if (selectedService === "transport") {
        payload = {
          ...payload,
          transport_service: values.transport_service,
          transport_type: values.transport_type,
          car_type: values.car_type,
          seats: values.seats,
          rent_time: values.rent_time,
          number_of_days: values.number_of_days || null,
          pickup_location: values.pickup_location,
          dropoff_location: values.dropoff_location,
          pickup_date: values.pickup_date?.format("YYYY-MM-DD"),
          pickup_time: values.pickup_time?.format("HH:mm"),
        };
      }

      const url =
        selectedService === "hotel"
          ? "https://switchiify.com/bonetProject/backend/public/hotel-requests"
          : selectedService === "apartment"
          ? "https://switchiify.com/bonetProject/backend/public/apartment-requests"
          : "https://switchiify.com/bonetProject/backend/public/transportBooking";

      await axios.post(url, payload);
      toast.success(t("travelHospitality.toast.success"));
      form.resetFields();
      setRentTime(null);
      setIsPopupOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(t("travelHospitality.toast.error"));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <ToastContainer position="top-center" />

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
            ref={bookingRef}
            onClick={() => setIsPopupOpen(true)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gradient-to-r from-[#188bff] to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            {t("travelHospitality.page.buttons.contactUs")}
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

      {/* MODAL BOOKING FORM */}
     {/* MODAL BOOKING FORM */}
<AnimatePresence>
  {isPopupOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 border border-blue-100 overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-green-400/10 to-emerald-500/10 rounded-full translate-x-12 translate-y-12"></div>

        {/* Close button */}
        <button
          onClick={() => setIsPopupOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#188bff] to-cyan-400 rounded-2xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{t("travelHospitality.modalTitle")}</h3>
              <p className="text-gray-500">Book your perfect stay or transport</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t("travelHospitality.selectService.label")}
            </label>
            <Select
              className="w-full rounded-xl border-gray-300 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 transition-all"
              value={selectedService}
              onChange={(val) => {
                setSelectedService(val);
                form.resetFields();
                setRentTime(null);
              }}
              suffixIcon={<Sparkles className="w-4 h-4 text-[#188bff]" />}
            >
              <Option value="hotel">
                <div className="flex items-center gap-2">
                  <Hotel className="w-4 h-4" />
                  {t("travelHospitality.selectService.options.hotel")}
                </div>
              </Option>
              <Option value="apartment">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  {t("travelHospitality.selectService.options.apartment")}
                </div>
              </Option>
              <Option value="transport">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  {t("travelHospitality.selectService.options.transport")}
                </div>
              </Option>
            </Select>
          </div>

          <Form 
            layout="vertical" 
            form={form}
            onFinish={handleSubmit}
            className="space-y-4"
          >
            {/* Personal Information Header */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#188bff]" />
                Personal Information
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label={
                  <span className="text-gray-700 font-semibold">
                    {t("travelHospitality.fullName.label")}
                  </span>
                }
                name="full_name"
                rules={[{ required: true, message: t("travelHospitality.fullName.required") }]}
              >
                <Input 
                  prefix={<UserOutlined className="text-gray-400" />} 
                  placeholder={t("travelHospitality.fullName.placeholder")}
                  className="rounded-xl border-gray-300 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-semibold">
                    {t("travelHospitality.email.label")}
                  </span>
                }
                name="email"
                rules={[
                  { required: true, message: t("travelHospitality.email.required") },
                  { type: "email", message: t("travelHospitality.email.invalid") },
                ]}
              >
                <Input 
                  prefix={<MailOutlined className="text-gray-400" />} 
                  placeholder={t("travelHospitality.email.placeholder")}
                  className="rounded-xl border-gray-300 focus:border-[#188bff] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </Form.Item>
            </div>

            {/* Rest of your form fields would go here with similar styling */}

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <motion.button
                onClick={() => setIsPopupOpen(false)}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 font-semibold"
              >
                {t("travelHospitality.buttons.cancel")}
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#188bff] to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("travelHospitality.buttons.submit")}
              </motion.button>
            </div>
          </Form>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}