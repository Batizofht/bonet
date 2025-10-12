// src/book/ApartmentCard.jsx
import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import AccommodationForm from "../../book/custom/CustomCard";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { FaHotel, FaCogs, FaClipboardCheck } from "react-icons/fa";
import axios from "axios";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { RangePicker } = DatePicker;

const sampleApartments = [
  { name: "Norrsken Kigali Apartment", image: "image/millenium.jpg", price: 100, location: "Norrsken Hub, Kigali" },
  { name: "Vision City Apartments", image: "image/city.jpg", price: 120, location: "Gaculiro, Kigali" },
  { name: "Kigali Heights Residence", image: "image/classic.jpg", price: 150, location: "Kimihurura, Kigali" },
  { name: "Ubumwe Grande Apartments", image: "image/5.jpg", price: 140, location: "CBD, Kigali" },
  { name: "Green Hills Apartments", image: "image/millenium.jpg", price: 110, location: "Gisozi, Kigali" },
  { name: "Palm Garden Villas", image: "image/amazing.jpg", price: 125, location: "Kimironko, Kigali" },
  { name: "Kabeza Airport Apartments", image: "image/ituze.jpg", price: 85, location: "Kabeza, Kigali" },
];

const ApartmentCard = () => {
  const { t } = useTranslation();
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [form] = Form.useForm();
  const [budgetType, setBudgetType] = useState(null);
  const [locationType, setLocationType] = useState(null);
  const [expanded, setExpanded] = useState({
    belief: false,
    services: false,
    booking: false,
  });

  const handleBookNow = (apartment) => {
    setSelectedApartment(apartment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApartment(null);
    form.resetFields();
    setBudgetType(null);
    setLocationType(null);
  };

  const handleBudgetChange = (value) => {
    setBudgetType(value);
    if (value !== "custom") {
      form.setFieldsValue({ custom_budget: undefined });
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = async (values) => {
    try {
      const [checkinDate, checkoutDate] = values.date_range || [];

      const payload = {
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        guests: values.guests,
        purpose_of_stay: values.purpose_of_stay,
        location: values.custom_location || values.location,
        transport: values.transport,
        checkin_date: checkinDate?.format("YYYY-MM-DD"),
        checkout_date: checkoutDate?.format("YYYY-MM-DD"),
        room_type: values.room_type,
        budget_range: values.budget_range,
        custom_budget: values.custom_budget || null,
        special_needs: values.special_needs || "",
      };

      await axios.post("https://switchiify.com/bonetProject/backend/public/apartment-requests", payload);

      toast.success("✅ Apartment request submitted!");
      form.resetFields();
      setBudgetType(null);
      setLocationType(null);
      setShowModal(false);
      setSelectedApartment(null);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to submit apartment request");
    }
  };

  const InfoCard = ({ icon, title, content, id, titleColor = "text-[#188bff]" }) => {
    const isExpanded = expanded[id];
    return (
      <div
        className="bg-white border border-blue-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300 cursor-pointer relative"
        onClick={() => toggleExpand(id)}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className={`${titleColor} text-2xl mt-1`}>{icon}</div>
          <h3 className={`text-xl font-bold ${titleColor}`}>{title}</h3>
        </div>

        <div
          className={`text-gray-700 text-sm text-left leading-relaxed overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-[800px]" : "max-h-[120px]"
          }`}
        >
          <div className={`${!isExpanded ? "fade-bottom relative" : ""}`}>{content}</div>
        </div>

        <div
          className={`${titleColor} text-sm font-medium mt-3 underline`}
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand(id);
          }}
        >
          {isExpanded ? "View Less" : "View More"}
        </div>
      </div>
    );
  };

  return (
    <div className="px-4">
      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <InfoCard
          id="belief"
          icon={<FaHotel />}
          title={t("apartmentInfo.cards.belief.title")}
          titleColor="text-[#188bff]"
          content={
            <>
              {t("apartmentInfo.cards.belief.textStart")}{" "}
              <span className="text-[#188bff] font-medium">Bonet Elite Services</span>
              {t("apartmentInfo.cards.belief.textMiddle")}
              <strong>{t("apartmentInfo.cards.belief.values.comfort")}</strong>,{" "}
              <strong>{t("apartmentInfo.cards.belief.values.class")}</strong>,{" "}
              <strong>{t("apartmentInfo.cards.belief.values.privacy")}</strong>,{" "}
              <strong>{t("apartmentInfo.cards.belief.values.efficiency")}</strong>.
            </>
          }
        />

        <InfoCard
          id="services"
          icon={<FaCogs />}
          title={t("apartmentInfo.cards.services.title")}
          titleColor="text-[#188bff]"
          content={
            <>
              {t("apartmentInfo.cards.services.intro")}
              <ul className="list-disc list-outside pl-5 mt-3 space-y-1">
                <li>{t("apartmentInfo.cards.services.list.premiumSelection")}</li>
                <li>{t("apartmentInfo.cards.services.list.flexibility")}</li>
                <li>{t("apartmentInfo.cards.services.list.transportPickup")}</li>
                <li>{t("apartmentInfo.cards.services.list.roomSetup")}</li>
                <li>{t("apartmentInfo.cards.services.list.personalAssist")}</li>
              </ul>
            </>
          }
        />

        <InfoCard
          id="booking"
          icon={<FaClipboardCheck />}
          title={t("apartmentInfo.cards.booking.title")}
          titleColor="text-[#188bff]"
          content={<>{t("apartmentInfo.cards.booking.description")}</>}
        />
      </div>

      {/* CTA Button */}
      <div className="text-center mb-10">
        <h4 className="text-xl font-semibold text-[#188bff] mb-4">
          {t("apartmentInfo.cta.heading")}
        </h4>
        <Button
          onClick={() => setShowCustomModal(true)}
          className="bg-gradient-to-r from-blue-600 to-sky-500 text-white px-8 py-3 rounded-lg shadow-lg font-semibold hover:from-blue-700 hover:to-sky-600 transition-all duration-300"
        >
          {t("apartmentInfo.cta.button")}
        </Button>
      </div>

      {/* Apartment Cards */}
      <Row gutter={[16, 16]}>
        {sampleApartments.map((apartment, index) => (
          <Col xs={24} sm={12} md={12} lg={8} key={index}>
            <Card
              hoverable
              cover={
                <img
                  alt={apartment.name}
                  src={apartment.image}
                  className="h-60 object-cover w-full"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/300x200?text=Apartment+Image")
                  }
                />
              }
              className="shadow-md rounded-md"
            >
              <h1 className="text-lg font-semibold text-blue-600">{apartment.name}</h1>
              <p className="text-sm text-gray-600">{apartment.location}</p>
              {/* <p className="text-blue-600 font-bold mt-1">${apartment.price} USD</p> */}
              <Button
                className="mt-3 w-full bg-blue-500 hover:bg-blue-600"
                onClick={() => handleBookNow(apartment)}
              >
                {t("apartmentInfo.cta.bookNow")}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Booking Modal */}
      <Modal
        title={`Booking for ${selectedApartment?.name}`}
        open={showModal}
        onCancel={closeModal}
        footer={null}
        destroyOnHidden
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Full Name" name="full_name" rules={[{ required: true }]}>
                <Input prefix={<UserOutlined />} placeholder="Full Name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                <Input prefix={<MailOutlined />} placeholder="Email Address" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Guests" name="guests" rules={[{ required: true }]}>
                <Input type="number" min={1} placeholder="e.g. 2" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Transport"
            name="transport"
            
          >
            <Select placeholder="Select Transport">
              <Option value="Executive Sedans – First-Class (VIP)">
                Executive Sedans – First-Class (VIP)
              </Option>
              <Option value="Luxury SUVs – First-Class (VIP)">Luxury SUVs – First-Class (VIP)</Option>
              <Option value="Business-Class Sedans – Second-Class (Executive)">
                Business-Class Sedans – Second-Class (Executive)
              </Option>
              <Option value="Reliable SUVs – Second-Class (Business & NGO Use)">
                Reliable SUVs – Second-Class (Business & NGO Use)
              </Option>
              <Option value="Luxury Vans – VIP Group Transport">Luxury Vans – VIP Group Transport</Option>
            </Select>
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Purpose of Stay" name="purpose_of_stay" >
                <Select placeholder="Select purpose">
                  <Option value="business">Business Travel</Option>
                  <Option value="honeymoon">Honeymoon / Romantic</Option>
                  <Option value="family">Family Vacation</Option>
                  <Option value="diplomatic">Diplomatic Visit</Option>
                  <Option value="vip_event">VIP Event</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Preferred Location"
                name="preferred_location"
                
              >
                <Select
                  placeholder="Choose location"
                  onChange={(value) => {
                    setLocationType(value);
                    if (value !== "other") {
                      form.setFieldsValue({ custom_location: undefined });
                    }
                  }}
                >
                  <Option value="kcc">Kigali City Center</Option>
                  <Option value="embassy">Embassy Area</Option>
                  <Option value="vision_city">Vision City</Option>
                  <Option value="musanze">Musanze</Option>
                  <Option value="lake_kivu">Lake Kivu</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              {locationType === "other" && (
                <Form.Item name="custom_location" rules={[{ required: true }]}>
                  <Input placeholder="Custom Location" />
                </Form.Item>
              )}
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Location (Province, District)"
                name="location"
             
              >
                <Input prefix={<EnvironmentOutlined />} placeholder="e.g., Kigali, Gasabo" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Stay Dates" name="date_range" rules={[{ required: true }]}>
                <RangePicker className="w-full" suffixIcon={<CalendarOutlined />} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Room Type" name="room_type" >
                <Select placeholder="Select room type">
                  <Option value="executive">Executive Room</Option>
                  <Option value="deluxe">Deluxe Room</Option>
                  <Option value="penthouse">Penthouse Suite</Option>
                  <Option value="villa">Private Villa</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Budget (Per Night)" name="budget_range" rules={[{ required: true }]}>
                <Select placeholder="Select budget" onChange={handleBudgetChange}>
                  <Option value="150_200">$150 – $200</Option>
                  <Option value="200_400">$200 – $400</Option>
                  <Option value="400_plus">$400+</Option>
                  <Option value="custom">Custom</Option>
                </Select>
              </Form.Item>

              {budgetType === "custom" && (
                <Form.Item
                  name="custom_budget"
                  rules={[
                    { required: true, message: "Enter budget amount" },
                    { pattern: /^\d+$/, message: "Only numbers allowed" },
                  ]}
                >
                  <Input placeholder="Enter custom budget $" type="number" />
                </Form.Item>
              )}
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item label="Special Needs or Notes" name="special_needs">
                <Input.TextArea rows={3} placeholder="Write anything important..." />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24} className="text-center mt-4">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="px-10 rounded-full bg-gradient-to-r from-blue-600 to-green-500"
              >
                Submit Request
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Custom Modal with Form */}
      <Modal
        title="Custom Accommodation Request"
        open={showCustomModal}
        onCancel={() => setShowCustomModal(false)}
        footer={null}
        destroyOnHidden
      >
        <AccommodationForm />
      </Modal>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ApartmentCard;
