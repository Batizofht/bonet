"use client"
import { useRef, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
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
  }

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
    },
    {
      title: t("travelHospitality.page.services.airportTransfers.title"),
      subtitle: t("travelHospitality.page.services.airportTransfers.subtitle"),
      description: t("travelHospitality.page.services.airportTransfers.description"),
      image: "../assets/images/rentals.jpg",
    },
    {
      title: t("travelHospitality.page.services.tourismGuides.title"),
      subtitle: t("travelHospitality.page.services.tourismGuides.subtitle"),
      description: t("travelHospitality.page.services.tourismGuides.description"),
      image: "../assets/images/tour.jpg",
      BookButton: t("travelHospitality.page.services.tourismGuides.bookButton"),
    },
    {
      title: t("travelHospitality.page.services.vipServices.title"),
      subtitle: t("travelHospitality.page.services.vipServices.subtitle"),
      description: t("travelHospitality.page.services.vipServices.description"),
      image: "../assets/images/vip.png",
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
    <div className="p-4 max-w-screen-xl mx-auto">
      <ToastContainer position="top-center" />

      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-[#188bff] bg-clip-text text-transparent">
          {t("travelHospitality.page.header")}
        </h1>
        <p className="text-base text-gray-700 mb-4">
          {t("travelHospitality.page.description")}
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            ref={bookingRef}
            onClick={() => setIsPopupOpen(true)}
            className="bg-[#188bff] text-white px-6 py-3 rounded-lg shadow hover:opacity-80 flex items-center gap-2"
          >
            <FaPhoneAlt /> {t("travelHospitality.page.buttons.contactUs")}
          </button>

          <button onClick={openWhatsApp} className="px-6 py-3 bg-[#139320] text-white rounded-lg shadow hover:opacity-80 flex items-center">
  <img src="../assets/images/white.png" alt="WhatsApp" className="h-6 w-6 mr-2" />
  {t("travelHospitality.page.buttons.quickContact")}
</button>
        </div>
      </div>

      {/* SERVICES LIST */}
      <div className="space-y-10">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                className="w-full md:w-1/2 h-64 object-cover"
              />
            ) : (
              <div className="w-full md:w-1/2 h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">{t("travelHospitality.imageNotFound")}</span>
              </div>
            )}
            <div className="p-6 md:w-1/2">
              <h2 className="text-2xl font-semibold bg-[#188bff] bg-clip-text text-transparent">
                {service.title}
              </h2>
              <p className="text-gray-700 mt-2 font-medium">{service.subtitle}</p>
              <p className="text-gray-600 mt-4">{service.description}</p>

              {service.BookButton && (
                <button
                  className="mt-4 px-5 py-2 bg-[#188bff] text-white rounded hover:opacity-90 transition"
                  onClick={() => navigate.push("/bookNow#tourism")}
                >
                  {service.BookButton}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL BOOKING FORM */}
      <Modal
        title={
          <span className="text-[#188bff] text-lg font-semibold">
            {t("travelHospitality.modalTitle")}
          </span>
        }
        open={isPopupOpen}
        onCancel={() => setIsPopupOpen(false)}
        footer={null}
        width={700}
        centered
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {t("travelHospitality.selectService.label")}
          </label>
          <Select
            className="w-full"
            value={selectedService}
            onChange={(val) => {
              setSelectedService(val);
              form.resetFields();
              setRentTime(null);
            }}
          >
            <Option value="hotel">{t("travelHospitality.selectService.options.hotel")}</Option>
            <Option value="apartment">{t("travelHospitality.selectService.options.apartment")}</Option>
            <Option value="transport">{t("travelHospitality.selectService.options.transport")}</Option>
          </Select>
        </div>

        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            {/* 1. Full Name */}
            <Col xs={24} md={12}>
              <Form.Item
                label={t("travelHospitality.fullName.label")}
                name="full_name"
                rules={[{ required: true, message: t("travelHospitality.fullName.required") }]}
              >
                <Input prefix={<UserOutlined />} placeholder={t("travelHospitality.fullName.placeholder")} />
              </Form.Item>
            </Col>

            {/* 2. Email */}
            <Col xs={24} md={12}>
              <Form.Item
                label={t("travelHospitality.email.label")}
                name="email"
                rules={[
                  { required: true, message: t("travelHospitality.email.required") },
                  { type: "email", message: t("travelHospitality.email.invalid") },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder={t("travelHospitality.email.placeholder")} />
              </Form.Item>
            </Col>

            {/* 3. Phone */}
            <Col xs={24} md={12}>
              <Form.Item
                label={t("travelHospitality.phone.label")}
                name="phone"
                rules={[{ required: true, message: t("travelHospitality.phone.required") }]}
              >
                <Input placeholder={t("travelHospitality.phone.placeholder")} />
              </Form.Item>
            </Col>

            {/* 4. Guests */}
            <Col xs={24} md={12}>
              <Form.Item
                label={t("travelHospitality.guests.label")}
                name="guests"
                rules={[{ required: true, message: t("travelHospitality.guests.required") }]}
              >
                <Input type="number" min={1} placeholder={t("travelHospitality.guests.placeholder")} />
              </Form.Item>
            </Col>

            {/* 5. Purpose of Stay */}
            <Col xs={24} md={12}>
              <Form.Item
                label={t("travelHospitality.purposeOfStay.label")}
                name="purpose_of_stay"
                rules={[{ required: true, message: t("travelHospitality.purposeOfStay.required") }]}
              >
                <Select placeholder={t("travelHospitality.purposeOfStay.placeholder")}>
                  <Option value="business">{t("travelHospitality.purposeOfStay.options.business")}</Option>
                  <Option value="honeymoon">{t("travelHospitality.purposeOfStay.options.honeymoon")}</Option>
                  <Option value="family">{t("travelHospitality.purposeOfStay.options.family")}</Option>
                  <Option value="diplomatic">{t("travelHospitality.purposeOfStay.options.diplomatic")}</Option>
                  <Option value="vip_event">{t("travelHospitality.purposeOfStay.options.vip_event")}</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* 6. Location */}
            <Col xs={24} md={12}>
              <Form.Item
                label={t("travelHospitality.location.label")}
                name="location"
                rules={[{ required: true, message: t("travelHospitality.location.required") }]}
              >
                <Input placeholder={t("travelHospitality.location.placeholder")} />
              </Form.Item>
            </Col>

            {/* 7. Stay Dates (Hotel & Apartment) */}
            {(selectedService === "hotel" || selectedService === "apartment") && (
              <Col xs={24} md={12}>
                <Form.Item
                  label={t(`travelHospitality.${selectedService}.stayDates.label`)}
                  name="date_range"
                  rules={[{ required: true, message: t(`travelHospitality.${selectedService}.stayDates.required`) }]}
                >
                  <RangePicker className="w-full" />
                </Form.Item>
              </Col>
            )}

            {/* 8. Hotel Level */}
            {selectedService === "hotel" && (
              <Col xs={24} md={12}>
                <Form.Item
                  label={t("travelHospitality.hotel.hotelLevel.label")}
                  name="hotel_level"
                  rules={[{ required: true, message: t("travelHospitality.hotel.hotelLevel.required") }]}
                >
                  <Select placeholder={t("travelHospitality.hotel.hotelLevel.placeholder")}>
                    <Option value="3Star">{t("commonOptions.hotelLevels.3Star")}</Option>
                    <Option value="4Star">{t("commonOptions.hotelLevels.4Star")}</Option>
                    <Option value="5Star">{t("commonOptions.hotelLevels.5Star")}</Option>
                    <Option value="luxury">{t("commonOptions.hotelLevels.luxury")}</Option>
                  </Select>
                </Form.Item>
              </Col>
            )}

            {/* 9. Room Type */}
            {selectedService === "apartment" && (
              <Col xs={24} md={12}>
                <Form.Item
                  label={t("travelHospitality.apartment.roomType.label")}
                  name="room_type"
                  rules={[{ required: true, message: t("travelHospitality.apartment.roomType.required") }]}
                >
                  <Select placeholder={t("travelHospitality.apartment.roomType.placeholder")}>
                    <Option value="executive">{t("travelHospitality.apartment.roomType.options.executive")}</Option>
                    <Option value="deluxe">{t("travelHospitality.apartment.roomType.options.deluxe")}</Option>
                    <Option value="penthouse">{t("travelHospitality.apartment.roomType.options.penthouse")}</Option>
                    <Option value="villa">{t("travelHospitality.apartment.roomType.options.villa")}</Option>
                  </Select>
                </Form.Item>
              </Col>
            )}

            {/* 10. Transport Service */}
            {selectedService === "transport" && (
              <>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t("travelHospitality.transport.transportService.label")}
                    name="transport_service"
                    rules={[{ required: true, message: t("travelHospitality.transport.transportService.required") }]}
                  >
                    <Select
                      placeholder={t("travelHospitality.transport.transportService.placeholder")}
                      onChange={() => {
                        form.setFieldsValue({ dropoff_location: undefined });
                      }}
                    >
                      <Option value="Airport Transfers">{t("travelHospitality.transport.transportService.options.airportTransfers")}</Option>
                      <Option value="Hotel to Airport Pickups">{t("travelHospitality.transport.transportService.options.hotelToAirport")}</Option>
                      <Option value="Local Business Transport">{t("travelHospitality.transport.transportService.options.localBusiness")}</Option>
                      <Option value="City Tours & Excursions">{t("travelHospitality.transport.transportService.options.cityTours")}</Option>
                      <Option value="Conference & Event Transport">{t("travelHospitality.transport.transportService.options.conference")}</Option>
                    </Select>
                  </Form.Item>
                </Col>

                {/* 11. Transport Type */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t("travelHospitality.transport.transportType.label")}
                    name="transport_type"
                    rules={[{ required: true, message: t("travelHospitality.transport.transportType.required") }]}
                  >
                    <Select placeholder={t("travelHospitality.transport.transportType.placeholder")}>
                      <Option value="Business & VIP Transport">{t("travelHospitality.transport.transportType.options.businessVIP")}</Option>
                      <Option value="Standard Transport">{t("travelHospitality.transport.transportType.options.standard")}</Option>
                    </Select>
                  </Form.Item>
                </Col>

                {/* 12. Car Type */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t("travelHospitality.transport.carType.label")}
                    name="car_type"
                    rules={[{ required: true, message: t("travelHospitality.transport.carType.required") }]}
                  >
                    <Select placeholder={t("travelHospitality.transport.carType.placeholder")}>
                      <Option value="Executive Sedans – First-Class (VIP)">{t("travelHospitality.transport.carType.options.executiveSedans")}</Option>
                      <Option value="Luxury SUVs – First-Class (VIP)">{t("travelHospitality.transport.carType.options.luxurySUVs")}</Option>
                      <Option value="Business-Class Sedans – Second-Class (Executive)">{t("travelHospitality.transport.carType.options.businessClassSedans")}</Option>
                      <Option value="Reliable SUVs – Second-Class (Business & NGO Use)">{t("travelHospitality.transport.carType.options.reliableSUVs")}</Option>
                      <Option value="Luxury Vans – VIP Group Transport">{t("travelHospitality.transport.carType.options.luxuryVans")}</Option>
                    </Select>
                  </Form.Item>
                </Col>

                {/* Bonus: Number of Seats */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t("travelHospitality.transport.seats.label")}
                    name="seats"
                    rules={[{ required: true, message: t("travelHospitality.transport.seats.required") }]}
                  >
                    <Input
                      type="number"
                      min={1}
                      prefix={<TeamOutlined />}
                      placeholder={t("travelHospitality.transport.seats.placeholder")}
                    />
                  </Form.Item>
                </Col>

                {/* Bonus: Rent Time */}
                <Col xs={24} md={12}>
                  <Form.Item label={t("travelHospitality.transport.rentTime.label")} name="rent_time">
                    <Select
                      placeholder={t("travelHospitality.transport.rentTime.placeholder")}
                      allowClear
                      onChange={(value) => setRentTime(value)}
                    >
                      <Option value="whole day">{t("travelHospitality.transport.rentTime.options.wholeDay")}</Option>
                      <Option value="half day">{t("travelHospitality.transport.rentTime.options.halfDay")}</Option>
                      <Option value="trip">{t("travelHospitality.transport.rentTime.options.trip")}</Option>
                      <Option value="more days">{t("travelHospitality.transport.rentTime.options.moreDays")}</Option>
                    </Select>
                  </Form.Item>
                </Col>

                {/* Number of Days if rentTime === "more days" */}
                {rentTime === "more days" && (
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t("travelHospitality.transport.numberOfDays.label")}
                      name="number_of_days"
                      rules={[{ required: true, message: t("travelHospitality.transport.numberOfDays.required") }]}
                    >
                      <Input type="number" min={1} placeholder={t("travelHospitality.transport.numberOfDays.placeholder")} />
                    </Form.Item>
                  </Col>
                )}

                {/* Pickup Location */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t("travelHospitality.transport.pickupLocation.label")}
                    name="pickup_location"
                    rules={[{ required: true, message: t("travelHospitality.transport.pickupLocation.required") }]}
                  >
                    {isLoaded ? (
                      <Autocomplete
                        onLoad={(ref) => (pickupRef.current = ref)}
                        onPlaceChanged={() => handlePlaceChange("pickup_location", pickupRef)}
                      >
                        <Input prefix={<EnvironmentOutlined />} placeholder={t("travelHospitality.transport.pickupLocation.placeholder")} />
                      </Autocomplete>
                    ) : (
                      <Input disabled placeholder={t("travelHospitality.transport.mapsLoading")} />
                    )}
                  </Form.Item>
                </Col>

                {/* Dropoff Location */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t("travelHospitality.transport.dropoffLocation.label")}
                    name="dropoff_location"
                    rules={[{ required: true, message: t("travelHospitality.transport.dropoffLocation.required") }]}
                  >
                    {form.getFieldValue("transport_service") === "Hotel to Airport Pickups" ? (
                      <Input value={t("travelHospitality.transport.dropoffLocation.airport")} disabled />
                    ) : isLoaded ? (
                      <Autocomplete
                        onLoad={(ref) => (dropoffRef.current = ref)}
                        onPlaceChanged={() => handlePlaceChange("dropoff_location", dropoffRef)}
                      >
                        <Input prefix={<EnvironmentOutlined />} placeholder={t("travelHospitality.transport.dropoffLocation.placeholder")} />
                      </Autocomplete>
                    ) : (
                      <Input disabled placeholder={t("travelHospitality.transport.mapsLoading")} />
                    )}
                  </Form.Item>
                </Col>

                {/* Pickup Date */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t("travelHospitality.transport.pickupDate.label")}
                    name="pickup_date"
                    rules={[{ required: true, message: t("travelHospitality.transport.pickupDate.required") }]}
                  >
                    <DatePicker className="w-full" suffixIcon={<CalendarOutlined />} />
                  </Form.Item>
                </Col>

                {/* Pickup Time */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label={t("travelHospitality.transport.pickupTime.label")}
                    name="pickup_time"
                    rules={[{ required: true, message: t("travelHospitality.transport.pickupTime.required") }]}
                  >
                    <TimePicker format="HH:mm" className="w-full" suffixIcon={<CalendarOutlined />} />
                  </Form.Item>
                </Col>
              </>
            )}

            {/* Common Transport (bottom) for hotel & apartment */}
            {selectedService !== "transport" && (
              <>
                <Col span={24}>
                  <Form.Item
                    label={t("travelHospitality.commonTransport.transport.label")}
                    name="transport"
                    rules={[{ required: true, message: t("travelHospitality.commonTransport.transport.required") }]}
                  >
                    <Select placeholder={t("travelHospitality.commonTransport.transport.placeholder")}>
                      <Option value="Executive Sedans – First-Class (VIP)">{t("travelHospitality.commonTransport.transport.options.executiveSedans")}</Option>
                      <Option value="Luxury SUVs – First-Class (VIP)">{t("travelHospitality.commonTransport.transport.options.luxurySUVs")}</Option>
                      <Option value="Business-Class Sedans – Second-Class (Executive)">{t("travelHospitality.commonTransport.transport.options.businessClassSedans")}</Option>
                      <Option value="Reliable SUVs – Second-Class (Business & NGO Use)">{t("travelHospitality.commonTransport.transport.options.reliableSUVs")}</Option>
                      <Option value="Luxury Vans – VIP Group Transport">{t("travelHospitality.commonTransport.transport.options.luxuryVans")}</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label={t("travelHospitality.commonTransport.budgetRange.label")}
                    name="budget_range"
                    rules={[{ required: true, message: t("travelHospitality.commonTransport.budgetRange.required") }]}
                  >
                    <Select placeholder={t("travelHospitality.commonTransport.budgetRange.placeholder")}>
                      <Option value="150_200">$150 – $200</Option>
                      <Option value="200_400">$200 – $400</Option>
                      <Option value="400_plus">$400+</Option>
                      <Option value="custom">{t("travelHospitality.commonTransport.budgetRange.options.custom")}</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label={t("travelHospitality.commonTransport.specialNeeds.label")} name="special_needs">
                    <Input.TextArea rows={3} placeholder={t("travelHospitality.commonTransport.specialNeeds.placeholder")} />
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>

          <div className="flex justify-end gap-2 mt-3">
            <Button onClick={() => setIsPopupOpen(false)}>{t("travelHospitality.buttons.cancel")}</Button>
            <Button type="primary" onClick={handleSubmit}>{t("travelHospitality.buttons.submit")}</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}