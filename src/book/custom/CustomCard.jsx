import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Card,
  Typography,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { RangePicker } = DatePicker;

const AccommodationForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [budgetType, setBudgetType] = useState(null);
  const [locationType, setLocationType] = useState(null);

  const handleBudgetChange = (value) => {
    setBudgetType(value);
    if (value !== "custom") {
      form.setFieldsValue({ custom_budget: undefined });
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
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

      await axios.post(
        "https://api.bonet.rw/bonetBackend/backend/public/apartment-requests",
        payload
      );

      toast.success("✅ Apartment request submitted!");
      form.resetFields();
      setBudgetType(null);
      setLocationType(null);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to submit apartment request");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <Card className="relative w-full max-w-4xl p-10 rounded-3xl shadow-2xl bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-lg border border-white/20 overflow-hidden">
        {/* Decorative Orbs */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full"></div>
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-cyan-600/20 rounded-full"></div>

        <Typography.Title
          level={2}
          className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-8"
        >
          {t("apartmentForm.title")}
        </Typography.Title>

        <Form layout="vertical" form={form}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t("apartmentForm.fields.fullName")}
                name="full_name"
                rules={[{ required: true }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder={t("apartmentForm.placeholders.fullName")}
                  className="rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label={t("apartmentForm.fields.email")}
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder={t("apartmentForm.placeholders.email")}
                  className="rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label={t("apartmentForm.fields.phone")}
                name="phone"
                rules={[{ required: true }]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder={t("apartmentForm.placeholders.phone")}
                  className="rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label={t("apartmentForm.fields.guests")}
                name="guests"
                rules={[{ required: true }]}
              >
                <Input
                  type="number"
                  min={1}
                  placeholder={t("apartmentForm.placeholders.guests")}
                  className="rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Transport & Purpose */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label={t("apartmentForm.fields.transport")} name="transport">
                <Select placeholder={t("apartmentForm.placeholders.transport")} className="rounded-xl">
                  <Option value="Executive Sedans – First-Class (VIP)">
                    {t("apartmentForm.options.transport.execSedan")}
                  </Option>
                  <Option value="Luxury SUVs – First-Class (VIP)">
                    {t("apartmentForm.options.transport.luxSUV")}
                  </Option>
                  <Option value="Business-Class Sedans – Second-Class (Executive)">
                    {t("apartmentForm.options.transport.bizSedan")}
                  </Option>
                  <Option value="Reliable SUVs – Second-Class (Business & NGO Use)">
                    {t("apartmentForm.options.transport.reliableSUV")}
                  </Option>
                  <Option value="Luxury Vans – VIP Group Transport">
                    {t("apartmentForm.options.transport.luxVan")}
                  </Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label={t("apartmentForm.fields.purpose")} name="purpose_of_stay">
                <Select placeholder={t("form.purpose.placeholder")} className="rounded-xl">
                  <Option value="business">{t("form.purpose.options.business")}</Option>
                  <Option value="honeymoon">{t("form.purpose.options.honeymoon")}</Option>
                  <Option value="family">{t("form.purpose.options.family")}</Option>
                  <Option value="diplomatic">{t("form.purpose.options.diplomatic")}</Option>
                  <Option value="vip_longterm">{t("form.purpose.options.vip_longterm")}</Option>
                  <Option value="vip_event">{t("form.purpose.options.vip_event")}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Location & Dates */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label={t("apartmentForm.fields.preferredLocation")} name="preferred_location">
                <Select
                  placeholder={t("apartmentForm.placeholders.location")}
                  className="rounded-xl"
                  onChange={(value) => {
                    setLocationType(value);
                    if (value !== "other") form.setFieldsValue({ custom_location: undefined });
                  }}
                >
                  <Option value="kcc">{t("form.preferredLocation.options.kcc")}</Option>
                  <Option value="embassy">{t("form.preferredLocation.options.embassy")}</Option>
                  <Option value="vision_city">{t("form.preferredLocation.options.vision_city")}</Option>
                  <Option value="lake_kivu">{t("form.preferredLocation.options.lake_kivu")}</Option>
                  <Option value="musanze">{t("form.preferredLocation.options.musanze")}</Option>
                  <Option value="akagera">{t("form.preferredLocation.options.akagera")}</Option>
                  <Option value="other">{t("form.preferredLocation.options.other")}</Option>
                </Select>
              </Form.Item>

              {locationType === "other" && (
                <Form.Item name="custom_location">
                  <Input
                    placeholder={t("apartmentForm.placeholders.customLocation")}
                    className="rounded-xl"
                  />
                </Form.Item>
              )}
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label={t("apartmentForm.fields.locationFull")} name="location">
                <Input
                  prefix={<EnvironmentOutlined />}
                  placeholder={t("apartmentForm.placeholders.locationFull")}
                  className="rounded-xl"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label={t("apartmentForm.fields.dates")} name="date_range" rules={[{ required: true }]}>
                <RangePicker className="w-full rounded-xl" suffixIcon={<CalendarOutlined />} />
              </Form.Item>
            </Col>
          </Row>

          {/* Room Type & Budget */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label={t("apartmentForm.fields.roomType")} name="room_type">
                <Select placeholder={t("apartmentForm.placeholders.roomType")} className="rounded-xl">
                  <Option value="executiveRoom">{t("apartmentForm.options.roomType.executiveRoom")}</Option>
                  <Option value="deluxeRoom">{t("apartmentForm.options.roomType.deluxeRoom")}</Option>
                  <Option value="juniorSuite">{t("apartmentForm.options.roomType.juniorSuite")}</Option>
                  <Option value="presidentialSuite">{t("apartmentForm.options.roomType.presidentialSuite")}</Option>
                  <Option value="penthouseSuite">{t("apartmentForm.options.roomType.penthouseSuite")}</Option>
                  <Option value="luxury1bedroom">{t("apartmentForm.options.roomType.luxury1bedroom")}</Option>
                  <Option value="apartment2bedroom">{t("apartmentForm.options.roomType.apartment2bedroom")}</Option>
                  <Option value="apartment3bedroom">{t("apartmentForm.options.roomType.apartment3bedroom")}</Option>
                  <Option value="privateVilla">{t("apartmentForm.options.roomType.privateVilla")}</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label={t("apartmentForm.fields.budget")} name="budget_range" rules={[{ required: true }]}>
                <Select placeholder={t("apartmentForm.placeholders.budget")} onChange={handleBudgetChange} className="rounded-xl">
                  <Option value="150_200">{t("apartmentForm.options.budget.range1")}</Option>
                  <Option value="200_400">{t("apartmentForm.options.budget.range2")}</Option>
                  <Option value="400_plus">{t("apartmentForm.options.budget.range3")}</Option>
                  <Option value="custom">{t("apartmentForm.options.budget.custom")}</Option>
                </Select>
              </Form.Item>

              {budgetType === "custom" && (
                <Form.Item name="custom_budget">
                  <Input
                    type="number"
                    placeholder={t("apartmentForm.placeholders.customBudget")}
                    className="rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                  />
                </Form.Item>
              )}
            </Col>
          </Row>

          {/* Special Needs */}
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item label={t("apartmentForm.fields.specialNeeds")} name="special_needs">
                <Input.TextArea
                  rows={3}
                  placeholder={t("apartmentForm.placeholders.specialNeeds")}
                  className="rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit */}
          <Row>
            <Col span={24} className="text-center mt-6">
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                className="px-12 py-3 rounded-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-500 hover:to-blue-600 transition-all"
              >
                {t("apartmentForm.submit")}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AccommodationForm;
