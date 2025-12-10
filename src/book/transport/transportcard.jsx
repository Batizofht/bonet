import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,
  InputNumber,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CarOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const TransportCard = ({ bookTransport }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [rentTime, setRentTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE",
    libraries: ["places"],
  });

  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);

  const handlePlaceChange = (field, ref) => {
    const place = ref.current.getPlace();
    if (place && place.formatted_address) {
      form.setFieldValue(field, place.formatted_address);
    }
  };

  const handleTransportServiceChange = (value) => {
    if (value === "hotel_to_airport") {
      form.setFieldsValue({
        transport_service: value,
        dropoff_location: "Kigali International Airport (KGL)",
        rent_time: undefined,
      });
    } else {
      form.setFieldsValue({
        transport_service: value,
        dropoff_location: undefined,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();

      if (!values.pickup || !values.dropoff_time) {
        toast.error("❌ Please select both pickup date and time.");
        return;
      }

      const payload = {
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        transport_service: values.transport_service,
        transport_type: values.transport_type,
        car_type: values.car_type,
        seats: values.seats,
        rent_time: values.rent_time,
        number_of_days: values.number_of_days || null,
        pickup_location: values.pickup_location,
        dropoff_location: values.dropoff_location,
        pickup_date: values.pickup.format("YYYY-MM-DD"),
        pickup_time: values.dropoff_time.format("HH:mm:ss"),
        addons: values.addons || [],
        special_requests: values.special_requests || "",
      };

      await axios.post(
        "https://api.bonet.rw/bonetBakend/backend/public/transportBooking",
        payload
      );

      toast.success("🎉 Transport request submitted successfully!");
      form.resetFields();
      setRentTime(null);
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>
            </div>

            {/* Transport Service */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <CarOutlined className="text-green-600" />
                Transport Service
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  label="Service Type"
                  name="transport_service"
                  rules={[{ required: true, message: 'Please select service type' }]}
                >
                  <Select
                    onChange={handleTransportServiceChange}
                    placeholder="Select transport service"
                    className="rounded-lg h-12"
                  >
                    <Option value="airport_transfers">Airport Transfers</Option>
                    <Option value="hotel_to_airport">Hotel to Airport</Option>
                    <Option value="local_business">Local Business Transport</Option>
                    <Option value="city_tours">City Tours</Option>
                    <Option value="conference_event">Conference & Event Transport</Option>
                    <Option value="intercity_travel">Intercity Travel</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Transport Type"
                  name="transport_type"
                  rules={[{ required: true, message: 'Please select transport type' }]}
                >
                  <Select
                    placeholder="Select transport type"
                    className="rounded-lg h-12"
                  >
                    <Option value="business_vip">Business VIP Service</Option>
                    <Option value="executive">Executive Service</Option>
                    <Option value="standard">Standard Service</Option>
                    <Option value="group_transport">Group Transport</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Vehicle Type"
                  name="car_type"
                  rules={[{ required: true, message: 'Please select vehicle type' }]}
                >
                  <Select
                    placeholder="Select vehicle type"
                    className="rounded-lg h-12"
                  >
                    <Option value="executive_sedan">Executive Sedan</Option>
                    <Option value="luxury_suv">Luxury SUV</Option>
                    <Option value="business_sedan">Business Sedan</Option>
                    <Option value="reliable_suv">Reliable SUV</Option>
                    <Option value="luxury_van">Luxury Van</Option>
                    <Option value="minibus">Minibus</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Number of Passengers"
                  name="seats"
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
              </div>
            </div>

            {/* Rental Details */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <ClockCircleOutlined className="text-yellow-600" />
                Rental Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  label="Rental Duration"
                  name="rent_time"
                  rules={[{ required: true, message: 'Please select rental duration' }]}
                >
                  <Select
                    placeholder="Select rental duration"
                    onChange={(value) => setRentTime(value)}
                    className="rounded-lg h-12"
                  >
                    <Option value="whole_day">Whole Day (8 hours)</Option>
                    <Option value="half_day">Half Day (4 hours)</Option>
                    <Option value="per_trip">Per Trip</Option>
                    <Option value="multiple_days">Multiple Days</Option>
                  </Select>
                </Form.Item>

                {rentTime === "multiple_days" && (
                  <Form.Item
                    label="Number of Days"
                    name="number_of_days"
                    rules={[{ required: true, message: 'Please enter number of days' }]}
                  >
                    <InputNumber
                      min={1}
                      max={30}
                      placeholder="Number of days"
                      className="w-full rounded-lg h-12"
                      controls={false}
                    />
                  </Form.Item>
                )}

                <Form.Item
                  label="Pickup Date"
                  name="pickup"
                  rules={[{ required: true, message: 'Please select pickup date' }]}
                >
                  <DatePicker
                    className="w-full rounded-lg h-12"
                    format="YYYY-MM-DD"
                    placeholder="Select pickup date"
                  />
                </Form.Item>

                <Form.Item
                  label="Pickup Time"
                  name="dropoff_time"
                  rules={[{ required: true, message: 'Please select pickup time' }]}
                >
                  <TimePicker
                    format="HH:mm"
                    className="w-full rounded-lg h-12"
                    placeholder="Select pickup time"
                  />
                </Form.Item>
              </div>
            </div>

            {/* Locations */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <EnvironmentOutlined className="text-purple-600" />
                Locations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  label="Pickup Location"
                  name="pickup_location"
                  rules={[{ required: true, message: 'Please enter pickup location' }]}
                >
                  {isLoaded ? (
                    <Autocomplete
                      onLoad={(ref) => (pickupRef.current = ref)}
                      onPlaceChanged={() => handlePlaceChange("pickup_location", pickupRef)}
                    >
                      <Input
                        prefix={<EnvironmentOutlined className="text-gray-400" />}
                        placeholder="Enter pickup location"
                        className="rounded-lg h-12"
                      />
                    </Autocomplete>
                  ) : (
                    <Input
                      prefix={<EnvironmentOutlined className="text-gray-400" />}
                      placeholder="Enter pickup location"
                      className="rounded-lg h-12"
                    />
                  )}
                </Form.Item>

                <Form.Item
                  label="Drop-off Location"
                  name="dropoff_location"
                  rules={[{ required: true, message: 'Please enter drop-off location' }]}
                >
                  {form.getFieldValue("transport_service") === "hotel_to_airport" ? (
                    <Input
                      value="Kigali International Airport (KGL)"
                      disabled
                      className="rounded-lg h-12"
                    />
                  ) : isLoaded ? (
                    <Autocomplete
                      onLoad={(ref) => (dropoffRef.current = ref)}
                      onPlaceChanged={() => handlePlaceChange("dropoff_location", dropoffRef)}
                    >
                      <Input
                        prefix={<EnvironmentOutlined className="text-gray-400" />}
                        placeholder="Enter drop-off location"
                        className="rounded-lg h-12"
                      />
                    </Autocomplete>
                  ) : (
                    <Input
                      prefix={<EnvironmentOutlined className="text-gray-400" />}
                      placeholder="Enter drop-off location"
                      className="rounded-lg h-12"
                    />
                  )}
                </Form.Item>
              </div>
            </div>

            {/* Additional Services */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <BulbOutlined className="text-orange-600" />
                Additional Services
              </h3>
              <div className="grid grid-cols-1 gap-6">
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
                    <Option value="child_seats">Child Safety Seats</Option>
                    <Option value="luggage_assistance">Luggage Assistance</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Special Requests"
                  name="special_requests"
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Any special requirements, specific routes, or additional information we should know about..."
                    className="rounded-lg"
                  />
                </Form.Item>
              </div>
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

export default TransportCard;