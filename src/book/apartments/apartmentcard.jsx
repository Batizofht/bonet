// src/book/ApartmentCard.jsx
import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { toast, ToastContainer } from "react-toastify";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  HomeOutlined,
  CarOutlined,
  DollarOutlined,
  TeamOutlined,
  BulbOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import axios from "axios";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { RangePicker } = DatePicker;

const ApartmentCard = ({ bookApartment }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [budgetType, setBudgetType] = useState(null);
  const [locationType, setLocationType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBudgetChange = (value) => {
    setBudgetType(value);
    if (value !== "custom") {
      form.setFieldsValue({ custom_budget: undefined });
    }
  };

  const handleLocationChange = (value) => {
    setLocationType(value);
    if (value !== "other") {
      form.setFieldsValue({ custom_location: undefined });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();

      if (!values.date_range || values.date_range.length !== 2) {
        toast.error("❌ Please select both check-in and check-out dates.");
        return;
      }

      const [checkinDate, checkoutDate] = values.date_range;

      const payload = {
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        guests: values.guests,
        purpose_of_stay: values.purpose_of_stay,
        location: values.custom_location || values.location,
        transport: values.transport,
        checkin_date: dayjs(checkinDate).format("YYYY-MM-DD"),
        checkout_date: dayjs(checkoutDate).format("YYYY-MM-DD"),
        room_type: values.room_type,
        budget_range: values.budget_range,
        custom_budget: values.custom_budget || null,
        special_needs: values.special_needs || "",
      };

      await axios.post(
        "https://api.bonet.rw:8443/bonetBackend/backend/public/apartment-requests", 
        payload
      );

      toast.success("🎉 Apartment request submitted successfully!");
      form.resetFields();
      setBudgetType(null);
      setLocationType(null);
    } catch (error) {
      console.error(error);
      if (error.errorFields) {
        toast.error("📝 Please fill in all required fields correctly.");
      } else {
        toast.error("❌ Failed to submit apartment request.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-8">
      <ToastContainer 
        position="top-center" 
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    <div className="mx-0 md:max-w-4xl md:mx-auto md:px-4 px-2">
        {/* Form Container */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <Form
            layout="vertical"
            form={form}
            size="large"
          >
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <UserOutlined className="text-blue-600" />
                Personal Information
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Full Name"
                    name="full_name"
                    rules={[{ required: true, message: 'Please enter your full name' }]}
                  >
                    <Input
                      prefix={<UserOutlined className="text-gray-400" />}
                      placeholder="Enter your full name"
                      className="rounded-lg h-12"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined className="text-gray-400" />}
                      placeholder="your.email@example.com"
                      className="rounded-lg h-12"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                  >
                    <Input
                      prefix={<PhoneOutlined className="text-gray-400" />}
                      placeholder="+250 78X XXX XXX"
                      className="rounded-lg h-12"
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Number of Guests"
                    name="guests"
                    rules={[{ required: true, message: 'Please enter number of guests' }]}
                  >
                    <InputNumber
                      min={1}
                      max={20}
                      placeholder="2"
                      className="w-full rounded-lg h-12"
                      controls={false}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Stay Details */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <HomeOutlined className="text-green-600" />
                Stay Details
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item 
                    label="Purpose of Stay" 
                    name="purpose_of_stay"
                    rules={[{ required: true, message: 'Please select purpose of stay' }]}
                  >
                    <Select 
                      placeholder="Select purpose of stay"
                      className="rounded-lg h-12"
                    >
                      <Option value="business">Business Travel</Option>
                      <Option value="honeymoon">Honeymoon / Romantic</Option>
                      <Option value="family">Family Vacation</Option>
                      <Option value="diplomatic">Diplomatic Visit</Option>
                      <Option value="vip_event">VIP Event</Option>
                      <Option value="extended_stay">Extended Stay</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item 
                    label="Preferred Location" 
                    name="preferred_location"
                    rules={[{ required: true, message: 'Please select preferred location' }]}
                  >
                    <Select
                      placeholder="Choose preferred location"
                      onChange={handleLocationChange}
                      className="rounded-lg h-12"
                    >
                      <Option value="kcc">Kigali City Center</Option>
                      <Option value="embassy">Embassy & Diplomatic Area</Option>
                      <Option value="vision_city">Vision City</Option>
                      <Option value="musanze">Musanze</Option>
                      <Option value="lake_kivu">Lake Kivu</Option>
                      <Option value="other">Other Location</Option>
                    </Select>
                  </Form.Item>
                  {locationType === "other" && (
                    <Form.Item 
                      name="custom_location"
                      rules={[{ required: true, message: 'Please specify your location' }]}
                    >
                      <Input 
                        prefix={<EnvironmentOutlined className="text-gray-400" />}
                        placeholder="Enter specific location"
                        className="rounded-lg h-12"
                      />
                    </Form.Item>
                  )}
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item 
                    label="Location Details" 
                    name="location"
                    rules={[{ required: true, message: 'Please enter location details' }]}
                  >
                    <Input
                      prefix={<EnvironmentOutlined className="text-gray-400" />}
                      placeholder="e.g., Kigali, Gasabo District"
                      className="rounded-lg h-12"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item 
                    label="Check-in & Check-out Dates" 
                    name="date_range"
                    rules={[{ required: true, message: 'Please select check-in and check-out dates' }]}
                  >
                    <RangePicker
                      className="w-full rounded-lg h-12"
                      format="YYYY-MM-DD"
                      placeholder={['Check-in date', 'Check-out date']}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Apartment Preferences */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <StarOutlined className="text-yellow-600" />
                Apartment Preferences
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item 
                    label="Room Type" 
                    name="room_type"
                    rules={[{ required: true, message: 'Please select room type' }]}
                  >
                    <Select 
                      placeholder="Select room type"
                      className="rounded-lg h-12"
                    >
                      <Option value="executive">Executive Apartment</Option>
                      <Option value="deluxe">Deluxe Apartment</Option>
                      <Option value="penthouse">Penthouse Suite</Option>
                      <Option value="villa">Private Villa</Option>
                      <Option value="studio">Studio Apartment</Option>
                      <Option value="1_bedroom">1 Bedroom Apartment</Option>
                      <Option value="2_bedroom">2 Bedroom Apartment</Option>
                      <Option value="3_bedroom">3+ Bedroom Apartment</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item 
                    label="Transportation Service" 
                    name="transport"
                  >
                    <Select 
                      placeholder="Select transportation (optional)"
                      className="rounded-lg h-12"
                    >
                      <Option value="Executive Sedans – First-Class (VIP)">
                        Executive Sedans (VIP)
                      </Option>
                      <Option value="Luxury SUVs – First-Class (VIP)">
                        Luxury SUVs (VIP)
                      </Option>
                      <Option value="Business-Class Sedans – Second-Class (Executive)">
                        Business Sedans (Executive)
                      </Option>
                      <Option value="Reliable SUVs – Second-Class (Business & NGO Use)">
                        Reliable SUVs (Business)
                      </Option>
                      <Option value="Luxury Vans – VIP Group Transport">
                        Luxury Vans (Group VIP)
                      </Option>
                      <Option value="none">No Transportation Needed</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item 
                    label="Budget Range" 
                    name="budget_range"
                    rules={[{ required: true, message: 'Please select budget range' }]}
                  >
                    <Select
                      placeholder="Select your budget range"
                      onChange={handleBudgetChange}
                      className="rounded-lg h-12"
                    >
                      <Option value="150_200">$150 - $200 per night</Option>
                      <Option value="200_400">$200 - $400 per night</Option>
                      <Option value="400_plus">$400+ per night</Option>
                      <Option value="custom">Custom Budget</Option>
                    </Select>
                  </Form.Item>
                  {budgetType === "custom" && (
                    <Form.Item
                      name="custom_budget"
                      rules={[{ required: true, message: 'Please enter your budget amount' }]}
                    >
                      <Input
                        prefix={<DollarOutlined className="text-gray-400" />}
                        placeholder="Enter your budget amount"
                        type="number"
                        className="rounded-lg h-12"
                      />
                    </Form.Item>
                  )}
                </Col>
              </Row>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <BulbOutlined className="text-purple-600" />
                Additional Information
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24}>
                  <Form.Item label="Special Requests" name="special_needs">
                    <Input.TextArea
                      rows={4}
                      placeholder="Any special requirements, apartment preferences, amenities needed, or additional information we should know about..."
                      className="rounded-lg"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button
                type="primary"
                size="large"
                loading={isLoading}
                onClick={handleSubmit}
                className="w-full h-14 rounded-lg text-lg font-semibold bg-green-600 hover:bg-green-700 border-0 shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isLoading ? 'Submitting Your Request...' : 'Submit Apartment Request'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;