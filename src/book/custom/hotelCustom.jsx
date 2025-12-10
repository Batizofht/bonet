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
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { RangePicker } = DatePicker;

const AccommodationHotel = () => {
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

      if (!values.date_range || values.date_range.length !== 2) {
        return toast.error(t("form.errors.selectDates"));
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
      };

      await axios.post(
        "https://api.bonet.rw/bonetBakend/backend/public/hotel-requests",
        payload
      );

      toast.success(t("form.success"));
      form.resetFields();
      setBudgetType(null);
      setLocationType(null);
    } catch (err) {
      console.error(err);
      toast.error(t("form.fail"));
    }
  };

  return (
    <div style={{}} className="">
      <ToastContainer position="top-center" autoClose={3000} />

 
       
        <Form layout="vertical" form={form}>
          {/* Personal Info */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t("form.fullName.label")}
                name="full_name"
                rules={[{ required: true, message: t("form.fullName.required") }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder={t("form.fullName.placeholder")}
                  className="rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t("form.email.label")}
                name="email"
                rules={[
                  { required: true, message: t("form.email.required") },
                  { type: "email", message: t("form.email.invalid") },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder={t("form.email.placeholder")}
                  className="rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t("form.phone.label")}
                name="phone"
                rules={[{ required: true, message: t("form.phone.required") }]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder={t("form.phone.placeholder")}
                  className="rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t("form.guests.label")}
                name="guests"
                rules={[{ required: true, message: t("form.guests.required") }]}
              >
                <Input
                  type="number"
                  min={1}
                  placeholder={t("form.guests.placeholder")}
                  className="rounded-xl focus:ring-2 focus:ring-blue-400 transition"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Stay Details */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label={t("form.purpose.label")} name="purpose_of_stay">
                <Select placeholder={t("form.purpose.placeholder")} className="rounded-xl">
                  <Option value="business">{t("form.purpose.options.business")}</Option>
                  <Option value="honeymoon">{t("form.purpose.options.honeymoon")}</Option>
                  <Option value="family">{t("form.purpose.options.family")}</Option>
                  <Option value="diplomatic">{t("form.purpose.options.diplomatic")}</Option>
                  <Option value="vip_event">{t("form.purpose.options.vip_event")}</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label={t("form.preferredLocation.label")} name="preferred_location">
                <Select
                  placeholder={t("form.preferredLocation.placeholder")}
                  onChange={(val) => {
                    setLocationType(val);
                    if (val !== "other") form.setFieldsValue({ custom_location: undefined });
                  }}
                  className="rounded-xl"
                >
                  <Option value="kcc">{t("form.preferredLocation.options.kcc")}</Option>
                  <Option value="embassy">{t("form.preferredLocation.options.embassy")}</Option>
                  <Option value="vision_city">{t("form.preferredLocation.options.vision_city")}</Option>
                  <Option value="musanze">{t("form.preferredLocation.options.musanze")}</Option>
                  <Option value="lake_kivu">{t("form.preferredLocation.options.lake_kivu")}</Option>
                  <Option value="other">{t("form.preferredLocation.options.other")}</Option>
                </Select>
              </Form.Item>

              {locationType === "other" && (
                <Form.Item name="custom_location">
                  <Input placeholder={t("form.customLocation.placeholder")} className="rounded-xl" />
                </Form.Item>
              )}
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label={t("form.location.label")} name="location">
                <Input
                  prefix={<EnvironmentOutlined />}
                  placeholder={t("form.location.placeholder")}
                  className="rounded-xl"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label={t("form.dates.label")} name="date_range">
                <RangePicker
                  className="w-full rounded-xl"
                  suffixIcon={<CalendarOutlined />}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Budget & Hotel Level */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label={t("form.hotelLevel.label")} name="hotel_level">
                <Select placeholder={t("form.hotelLevel.placeholder")} className="rounded-xl">
                  <Option value="premium">{t("form.hotelLevel.options.premium")}</Option>
                  <Option value="4-star">{t("form.hotelLevel.options.4star")}</Option>
                  <Option value="5-star">{t("form.hotelLevel.options.5star")}</Option>
                  <Option value="luxury1">{t("form.hotelLevel.options.luxury1")}</Option>
                  <Option value="luxury2">{t("form.hotelLevel.options.luxury2")}</Option>
                  <Option value="private_villa">{t("form.hotelLevel.options.private_villa")}</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label={t("form.transport.label")} name="transport">
                <Select placeholder={t("form.transport.placeholder")} className="rounded-xl">
                  <Option value="Executive Sedans – First-Class (VIP)">
                    {t("form.transport.options.sedan_vip")}
                  </Option>
                  <Option value="Luxury SUVs – First-Class (VIP)">
                    {t("form.transport.options.suv_vip")}
                  </Option>
                  <Option value="Business-Class Sedans – Second-Class (Executive)">
                    {t("form.transport.options.sedan_exec")}
                  </Option>
                  <Option value="Reliable SUVs – Second-Class (Business & NGO Use)">
                    {t("form.transport.options.suv_exec")}
                  </Option>
                  <Option value="Luxury Vans – VIP Group Transport">
                    {t("form.transport.options.van_vip")}
                  </Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label={t("form.budget.label")} name="budget_range">
                <Select placeholder={t("form.budget.placeholder")} onChange={handleBudgetChange} className="rounded-xl">
                  <Option value="150_200">{t("form.budget.options.150_200")}</Option>
                  <Option value="200_400">{t("form.budget.options.200_400")}</Option>
                  <Option value="400_plus">{t("form.budget.options.400_plus")}</Option>
                  <Option value="custom">{t("form.budget.options.custom")}</Option>
                </Select>
              </Form.Item>

              {budgetType === "custom" && (
                <Form.Item
                  name="custom_budget"
                  rules={[
                    { required: true, message: t("form.customBudget.required") },
                    { pattern: /^\d+$/, message: t("form.customBudget.onlyNumbers") },
                  ]}
                >
                  <Input placeholder={t("form.customBudget.placeholder")} type="number" className="rounded-xl" />
                </Form.Item>
              )}
            </Col>
          </Row>

          {/* Special Needs */}
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item label={t("form.specialNeeds.label")} name="special_needs">
                <Input.TextArea rows={3} placeholder={t("form.specialNeeds.placeholder")} className="rounded-xl" />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <Row>
            <Col span={24} className="text-center mt-6">
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
               className="bg-gradient-to-r from-blue-500 to-blue-600 w-full hover:from-blue-600 hover:to-blue-500 text-white font-semibold rounded-xl py-3 h-auto transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border-0"
              >
                {t("form.submit")}
              </Button>
            </Col>
          </Row>
        </Form>
      
    </div>
  );
};

export default AccommodationHotel;
