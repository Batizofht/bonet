import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Button,
  InputNumber,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  CarOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const TransportForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();

      if (!values.datetime) {
        toast.error("❌ Please select date and time for your transport.");
        return;
      }

      const adds_on = Array.isArray(values.addons) ? values.addons.join(", ") : "";

      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        datetime: values.datetime.toISOString(),
        pickup: values.pickup,
        dropoff: values.dropoff,
        passengers: values.passengers,
        vehicle: values.vehicle,
        addons: adds_on,
        notes: values.notes || "",
      };

      await axios.post(
        "https://switchiify.com/bonetProject/backend/public/tourTransports",
        payload
      );

      toast.success("🎉 Transport request submitted successfully!");
      form.resetFields();
    } catch (error) {
      console.error(error);
      if (error.errorFields) {
        toast.error("📝 Please fill in all required fields correctly.");
      } else {
        toast.error("❌ Failed to submit transport request.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
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

      <div className="">
        {/* Form Container */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Tour Transport Request
            </h1>
         
          </div>

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
                    name="name"
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
              </Row>
            </div>

            {/* Transport Details */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <CarOutlined className="text-green-600" />
                Transport Details
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Date & Time"
                    name="datetime"
                    rules={[{ required: true, message: 'Please select date and time' }]}
                  >
                    <DatePicker
                      showTime
                      className="w-full rounded-lg h-12"
                      placeholder="Select date and time"
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Number of Passengers"
                    name="passengers"
                    rules={[{ required: true, message: 'Please enter number of passengers' }]}
                  >
                    <InputNumber
                      min={1}
                      max={50}
                      placeholder="Number of passengers"
                      className="w-full rounded-lg h-12"
                      controls={false}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Pickup Location"
                    name="pickup"
                    rules={[{ required: true, message: 'Please enter pickup location' }]}
                  >
                    <Input
                      prefix={<EnvironmentOutlined className="text-gray-400" />}
                      placeholder="Enter pickup address or location"
                      className="rounded-lg h-12"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Drop-off Location"
                    name="dropoff"
                    rules={[{ required: true, message: 'Please enter drop-off location' }]}
                  >
                    <Input
                      prefix={<EnvironmentOutlined className="text-gray-400" />}
                      placeholder="Enter drop-off address or location"
                      className="rounded-lg h-12"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Vehicle & Services */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <BulbOutlined className="text-purple-600" />
                Vehicle & Services
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Vehicle Type"
                    name="vehicle"
                    rules={[{ required: true, message: 'Please select vehicle type' }]}
                  >
                    <Select 
                      placeholder="Select vehicle type"
                      className="rounded-lg h-12"
                    >
                      <Option value="suv">SUV (1-6 passengers)</Option>
                      <Option value="cruiser">4x4 Cruiser (1-6 passengers)</Option>
                      <Option value="minivan">Minivan (7-12 passengers)</Option>
                      <Option value="bus">Tour Bus (13+ passengers)</Option>
                      <Option value="luxury_suv">Luxury SUV</Option>
                      <Option value="executive_car">Executive Car</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Additional Services"
                    name="addons"
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select additional services (optional)"
                      className="rounded-lg h-12"
                    >
                      <Option value="professional_driver">Professional Driver</Option>
                      <Option value="multilingual_driver">Multilingual Driver</Option>
                      <Option value="water_wifi">Complimentary Water & WiFi</Option>
                      <Option value="route_planning">Route Planning & Support</Option>
                      <Option value="meet_greet">Meet & Greet Service</Option>
                      <Option value="luggage_assistance">Luggage Assistance</Option>
                      <Option value="child_seats">Child Safety Seats</Option>
                      <Option value="cooler_box">Cooler Box with Refreshments</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <EnvironmentOutlined className="text-orange-600" />
                Additional Information
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24}>
                  <Form.Item
                    label="Special Instructions"
                    name="notes"
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Any special requirements, specific routes, waiting times, accessibility needs, or additional information we should know about..."
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
                className="w-full h-14 rounded-lg text-lg font-semibold bg-blue-600 hover:bg-blue-700 border-0 shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isLoading ? 'Submitting Your Request...' : 'Submit Transport Request'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TransportForm;