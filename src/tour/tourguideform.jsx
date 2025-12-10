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
  TeamOutlined,
  EnvironmentOutlined,
  CarOutlined,
  DollarOutlined,
  GlobalOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { RangePicker } = DatePicker;

const TourGuideForm = ({ onTourSubmit }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [durationType, setDurationType] = useState(null);
  const [isCustomBudget, setIsCustomBudget] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBudgetSelect = (value) => {
    setIsCustomBudget(value === "custom");
    if (value !== "custom") {
      form.setFieldsValue({ estimatedBudget: undefined });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();

      if (!values.travelDates || values.travelDates.length !== 2) {
        toast.error("❌ Please select both start and end dates for your travel.");
        return;
      }

      const payload = {
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        language: values.language,
        destinations: values.destinations,
        travelDates: values.travelDates.map((d) => d.format("YYYY-MM-DD")),
        tour_type: values.tourType,
        activity_level: values.activityLevel,
        budget: values.budget,
        estimated_budget: values.estimatedBudget || null,
        travelers: values.travelers,
        duration: values.duration,
        number_of_days: values.number_of_days || null,
        transport: values.transport,
        addons: values.addons || [],
        special_requests: values.special_requests || "",
      };

      await axios.post(
        "https://api.bonet.rw/bonetBakend/backend/public/tourGuides",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("🎉 Tour guide request submitted successfully!");
      form.resetFields();
      setIsCustomBudget(false);
      setDurationType(null);
      
      // Call the parent callback if provided
      if (onTourSubmit) {
        onTourSubmit(payload);
      }
    } catch (error) {
      console.error(error);
      if (error.errorFields) {
        toast.error("📝 Please fill in all required fields correctly.");
      } else {
        toast.error("❌ Failed to submit tour guide request.");
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
              Tour Guide Request
            </h1>
      
          </div>

          <Form
            layout="vertical"
            form={form}
            size="large"
          >
            <Row gutter={32}>
              {/* Left Column */}
              <Col xs={24} lg={12}>
                {/* Personal Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <UserOutlined className="text-blue-600" />
                    Personal Information
                  </h3>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Form.Item
                        label="Full Name"
                        name="fullName"
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
                    <Col xs={24}>
                      <Form.Item
                        label="Preferred Language"
                        name="language"
                        rules={[{ required: true, message: 'Please select preferred language' }]}
                      >
                        <Select 
                          placeholder="Select preferred language"
                          className="rounded-lg h-12"
                        >
                          <Option value="english">English</Option>
                          <Option value="french">French</Option>
                          <Option value="kinyarwanda">Kinyarwanda</Option>
                          <Option value="swahili">Swahili</Option>
                          <Option value="spanish">Spanish</Option>
                          <Option value="german">German</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                {/* Tour Details */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <CalendarOutlined className="text-green-600" />
                    Tour Details
                  </h3>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Form.Item
                        label="Destinations to Visit"
                        name="destinations"
                        rules={[{ required: true, message: 'Please enter destinations you want to visit' }]}
                      >
                        <Input
                          prefix={<EnvironmentOutlined className="text-gray-400" />}
                          placeholder="e.g., Volcanoes National Park, Lake Kivu, Kigali City"
                          className="rounded-lg h-12"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        label="Travel Dates"
                        name="travelDates"
                        rules={[{ required: true, message: 'Please select your travel dates' }]}
                      >
                        <RangePicker
                          className="w-full rounded-lg h-12"
                          format="YYYY-MM-DD"
                          placeholder={['Start date', 'End date']}
                        />
                      </Form.Item>
                    </Col>
                    <Col >
                      <Form.Item
                        label="Number of Travelers"
                        name="travelers"
                        rules={[{ required: true, message: 'Please enter number of travelers' }]}
                      >
                        <InputNumber
                          min={1}
                          max={50}
                          placeholder="Number of people"
                          className="w-full rounded-lg h-12"
                          controls={false}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Col>

              {/* Right Column */}
              <Col xs={24} lg={12}>
                {/* Tour Preferences */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <GlobalOutlined className="text-purple-600" />
                    Tour Preferences
                  </h3>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Form.Item
                        label="Tour Type"
                        name="tourType"
                        rules={[{ required: true, message: 'Please select tour type' }]}
                      >
                        <Select
                          mode="multiple"
                          placeholder="Select types of tours you're interested in"
                          className="rounded-lg h-12"
                        >
                          <Option value="cultural">Cultural & Historical</Option>
                          <Option value="nature">Nature & Wildlife</Option>
                          <Option value="city">City Tours</Option>
                          <Option value="adventure">Adventure & Hiking</Option>
                          <Option value="relaxation">Relaxation & Leisure</Option>
                          <Option value="food">Food & Culinary</Option>
                          <Option value="religious">Religious & Spiritual</Option>
                          <Option value="photography">Photography Tours</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Activity Level"
                        name="activityLevel"
                        rules={[{ required: true, message: 'Please select activity level' }]}
                      >
                        <Select 
                          placeholder="Select activity level"
                          className="rounded-lg h-12"
                        >
                          <Option value="low">Low (Light walking)</Option>
                          <Option value="medium">Medium (Moderate activity)</Option>
                          <Option value="high">High (Strenuous activity)</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="Tour Duration"
                        name="duration"
                        rules={[{ required: true, message: 'Please select tour duration' }]}
                      >
                        <Select 
                          placeholder="Select duration"
                          onChange={(value) => setDurationType(value)}
                          className="rounded-lg h-12"
                        >
                          <Option value="half_day">Half Day (4-5 hours)</Option>
                          <Option value="full_day">Full Day (8-10 hours)</Option>
                          <Option value="multiple_days">Multiple Days</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {durationType === "multiple_days" && (
                      <Col xs={24}>
                        <Form.Item
                          label="Number of Days"
                          name="number_of_days"
                          rules={[{ required: true, message: 'Please enter number of days' }]}
                        >
                          <InputNumber
                            min={2}
                            max={30}
                            placeholder="Number of days"
                            className="w-full rounded-lg h-12"
                            controls={false}
                          />
                        </Form.Item>
                      </Col>
                    )}
                  </Row>
                </div>

                {/* Budget & Transport */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <DollarOutlined className="text-yellow-600" />
                    Budget & Transport
                  </h3>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Form.Item
                        label="Budget Range"
                        name="budget"
                        rules={[{ required: true, message: 'Please select budget range' }]}
                      >
                        <Select 
                          placeholder="Select your budget range"
                          onChange={handleBudgetSelect}
                          className="rounded-lg h-12"
                        >
                          <Option value="budget">Budget ($50 - $100 per person)</Option>
                          <Option value="mid">Mid-Range ($100 - $250 per person)</Option>
                          <Option value="premium">Premium ($250 - $500 per person)</Option>
                          <Option value="vip">VIP ($500+ per person)</Option>
                          <Option value="custom">Custom Budget</Option>
                        </Select>
                      </Form.Item>
                      {isCustomBudget && (
                        <Form.Item
                          label="Custom Budget Amount"
                          name="estimatedBudget"
                          rules={[{ required: true, message: 'Please enter your budget amount' }]}
                        >
                          <Input
                            prefix={<DollarOutlined className="text-gray-400" />}
                            placeholder="Enter your total budget"
                            type="number"
                            className="rounded-lg h-12"
                          />
                        </Form.Item>
                      )}
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        label="Preferred Transport"
                        name="transport"
                      >
                        <Select 
                          placeholder="Select preferred transport (optional)"
                          className="rounded-lg h-12"
                        >
                          <Option value="suv">SUV (1-6 people)</Option>
                          <Option value="minivan">Minivan (7-12 people)</Option>
                          <Option value="bus">Tour Bus (13+ people)</Option>
                          <Option value="luxury_car">Luxury Car</Option>
                          <Option value="no_transport">No transport needed</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                {/* Additional Services */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <BulbOutlined className="text-orange-600" />
                    Additional Services
                  </h3>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Form.Item
                        label="Additional Services"
                        name="addons"
                      >
                        <Select
                          mode="multiple"
                          placeholder="Select additional services (optional)"
                          className="rounded-lg h-12"
                        >
                          <Option value="professional_photographer">Professional Photographer</Option>
                          <Option value="multilingual_guide">Multilingual Guide</Option>
                          <Option value="meal_inclusions">Meal Inclusions</Option>
                          <Option value="entrance_fees">Entrance Fees Included</Option>
                          <Option value="hotel_pickup">Hotel Pickup & Drop-off</Option>
                          <Option value="custom_itinerary">Custom Itinerary Planning</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        label="Special Requests"
                        name="special_requests"
                      >
                        <Input.TextArea
                          rows={4}
                          placeholder="Any special requirements, specific interests, dietary restrictions, or additional information we should know about..."
                          className="rounded-lg"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <Button
                type="primary"
                size="large"
                loading={isLoading}
                onClick={handleSubmit}
                className="h-14 px-16 rounded-lg w-full text-lg font-semibold bg-green-600 hover:bg-green-700 border-0 shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isLoading ? 'Submitting Your Request...' : 'Submit Tour Request'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TourGuideForm;