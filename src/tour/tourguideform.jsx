import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Button,
  Card,
  Spin,
  InputNumber,
  Typography,
} from "antd";
import { TeamOutlined, CalendarOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { RangePicker } = DatePicker;

const TourGuideForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [DurationTime, setDurationTime] = useState(null);
  const [ads, setAds] = useState([]);
  const [loadingAds, setLoadingAds] = useState(true);
  const [isCustomBudget, setIsCustomBudget] = useState(false);

  const handleBudgetSelect = (value) => {
    setIsCustomBudget(value === "custom");
    if (value !== "custom")
      form.setFieldsValue({ estimatedBudget: undefined, travelers: undefined });
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(
          "https://switchiify.com/bonetProject/backend/public/advertisements"
        );
        setAds(res.data.slice(0, 3));
      } catch (err) {
        console.error("Failed to load ads:", err);
      } finally {
        setLoadingAds(false);
      }
    };
    fetchAds();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        full_name: values.fullName,
        email: values.email,
        language: values.language,
        destinations: values.destinations,
        travelDates: values.travelDates.map((d) => d.format("YYYY-MM-DD")),
        tour_type: values.tourType,
        activity_level: values.activityLevel,
        budget: values.budget,
        travelers: values.travelers,
        duration: values.duration,
        transport: values.transport,
        requests: values.requests,
      };

      await axios.post(
        "https://switchiify.com/bonetProject/backend/public/tourGuides",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(t("tourGuideForm.successMessage"));
      form.resetFields();
      setIsCustomBudget(false);
      setDurationTime(null);
    } catch (error) {
      console.error(error);
      toast.error(t("tourGuideForm.errorMessage"));
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <Card className="relative shadow-2xl rounded-3xl bg-white/90 backdrop-blur-md border border-white/20 overflow-hidden w-full max-w-[1100px]">
        {/* Decorative Orbs Inside Card */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-gradient-to-tr from-green-400/20 to-cyan-600/20 rounded-full pointer-events-none"></div>

        <Row gutter={24}>
          {/* Form Section */}
          <Col xs={24} md={16}>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-2">
              {t("tourGuideForm.title")}
            </h1>
            
            <p className="text-gray-600 mb-4">{t("tourGuideForm.subtitle")}</p>
           

            <Form layout="vertical" form={form} onFinish={handleSubmit} className="relative z-10 p-4 md:p-6">
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label={t("tourGuideForm.labels.fullName")}
                    name="fullName"
                    rules={[{ required: true, message: t("tourGuideForm.errors.required") }]}
                  >
                    <Input placeholder={t("tourGuideForm.placeholders.fullName")} className="rounded-xl focus:ring-2 focus:ring-blue-400 transition" />
                  </Form.Item>

                  <Form.Item
                    label={t("tourGuideForm.labels.email")}
                    name="email"
                    rules={[
                      { required: true, message: t("tourGuideForm.errors.required") },
                      { type: "email", message: t("tourGuideForm.errors.emailInvalid") },
                    ]}
                  >
                    <Input placeholder={t("tourGuideForm.placeholders.email")} className="rounded-xl focus:ring-2 focus:ring-blue-400 transition" />
                  </Form.Item>

                  <Form.Item
                    label={t("tourGuideForm.labels.language")}
                    name="language"
                    rules={[{ required: true, message: t("tourGuideForm.errors.required") }]}
                  >
                    <Select placeholder={t("tourGuideForm.placeholders.language")} className="rounded-xl">
                      <Option value="english">{t("tourGuideForm.options.languages.english")}</Option>
                      <Option value="french">{t("tourGuideForm.options.languages.french")}</Option>
                      <Option value="kinyarwanda">{t("tourGuideForm.options.languages.kinyarwanda")}</Option>
                      <Option value="swahili">{t("tourGuideForm.options.languages.swahili")}</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label={t("tourGuideForm.labels.destinations")}
                    name="destinations"
                    rules={[{ required: true, message: t("tourGuideForm.errors.required") }]}
                  >
                    <Input placeholder={t("tourGuideForm.placeholders.destinations")} className="rounded-xl focus:ring-2 focus:ring-blue-400 transition" />
                  </Form.Item>

                  <Form.Item
                    label={t("tourGuideForm.labels.travelDates")}
                    name="travelDates"
                    rules={[{ required: true, message: t("tourGuideForm.errors.required") }]}
                  >
                    <RangePicker className="w-full rounded-xl" suffixIcon={<CalendarOutlined />} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={t("tourGuideForm.labels.tourType")} name="tourType">
                    <Select
                      mode="multiple"
                      placeholder={t("tourGuideForm.placeholders.tourType")}
                      className="rounded-xl"
                    >
                      <Option value="cultural">{t("tourGuideForm.options.tourType.cultural")}</Option>
                      <Option value="nature">{t("tourGuideForm.options.tourType.nature")}</Option>
                      <Option value="city">{t("tourGuideForm.options.tourType.city")}</Option>
                      <Option value="adventure">{t("tourGuideForm.options.tourType.adventure")}</Option>
                      <Option value="relaxation">{t("tourGuideForm.options.tourType.relaxation")}</Option>
                      <Option value="food">{t("tourGuideForm.options.tourType.food")}</Option>
                      <Option value="religious">{t("tourGuideForm.options.tourType.religious")}</Option>
                      <Option value="beach">{t("tourGuideForm.options.tourType.beach")}</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="activityLevel" rules={[{ required: true, message: t("tourGuideForm.errors.required") }]}>
                    <Select placeholder={t("tourGuideForm.placeholders.activityLevel")} className="rounded-xl">
                      <Option value="low">{t("tourGuideForm.options.activityLevel.low")}</Option>
                      <Option value="medium">{t("tourGuideForm.options.activityLevel.medium")}</Option>
                      <Option value="high">{t("tourGuideForm.options.activityLevel.high")}</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label={t("tourGuideForm.labels.budget")} name="budget" rules={[{ required: true, message: t("tourGuideForm.errors.required") }]}>
                    <Select placeholder={t("tourGuideForm.placeholders.budget")} onChange={handleBudgetSelect} className="rounded-xl">
                      <Option value="budget">{t("tourGuideForm.options.budget.budget")}</Option>
                      <Option value="mid">{t("tourGuideForm.options.budget.mid")}</Option>
                      <Option value="premium">{t("tourGuideForm.options.budget.premium")}</Option>
                      <Option value="vip">{t("tourGuideForm.options.budget.vip")}</Option>
                      <Option value="custom">{t("tourGuideForm.options.budget.custom")}</Option>
                      <Option value="unsure">{t("tourGuideForm.options.budget.unsure")}</Option>
                    </Select>
                  </Form.Item>

                  {isCustomBudget && (
                    <Form.Item label={t("tourGuideForm.labels.estimatedBudget")} name="estimatedBudget" rules={[{ required: true, message: t("tourGuideForm.errors.required") }]}>
                      <InputNumber className="w-full rounded-xl focus:ring-2 focus:ring-blue-400 transition" min={1} placeholder={t("tourGuideForm.placeholders.estimatedBudget")} />
                    </Form.Item>
                  )}

                  <Form.Item label={t("tourGuideForm.labels.seats")} name="seats" rules={[{ required: true, message: t("tourGuideForm.errors.required") }]}>
                    <Input type="number" min={0} prefix={<TeamOutlined />} className="rounded-xl focus:ring-2 focus:ring-blue-400 transition" placeholder={t("tourGuideForm.placeholders.seats")} />
                  </Form.Item>

                  <Form.Item label={t("tourGuideForm.labels.duration")} name="duration" rules={[{ required: true, message: t("tourGuideForm.errors.required") }]}>
                    <Select placeholder={t("tourGuideForm.placeholders.duration")} allowClear className="rounded-xl" onChange={(value) => setDurationTime(value)}>
                      <Option value="whole day">{t("tourGuideForm.options.duration.wholeDay")}</Option>
                      <Option value="half day">{t("tourGuideForm.options.duration.halfDay")}</Option>
                      <Option value="trip">{t("tourGuideForm.options.duration.trip")}</Option>
                      <Option value="more days">{t("tourGuideForm.options.duration.moreDays")}</Option>
                    </Select>
                  </Form.Item>

                  {DurationTime === "more days" && (
                    <Form.Item label={t("tourGuideForm.labels.numberOfDays")} name="number_of_days" rules={[{ required: true, message: t("tourGuideForm.errors.required") }]}>
                      <Input type="number" min={1} className="rounded-xl focus:ring-2 focus:ring-blue-400 transition" placeholder={t("tourGuideForm.placeholders.numberOfDays")} />
                    </Form.Item>
                  )}
                </Col>

                <Col span={24}>
                  <Form.Item label={t("tourGuideForm.labels.transport")} name="transport">
                    <Select placeholder={t("tourGuideForm.placeholders.transport")} className="rounded-xl">
                      <Option value="suv">{t("tourGuideForm.options.transport.suv")}</Option>
                      <Option value="cruiser">{t("tourGuideForm.options.transport.cruiser")}</Option>
                      <Option value="minivan">{t("tourGuideForm.options.transport.minivan")}</Option>
                      <Option value="bus">{t("tourGuideForm.options.transport.bus")}</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label={t("tourGuideForm.labels.addons")} name="addons">
                    <Select mode="multiple" allowClear placeholder={t("tourGuideForm.placeholders.addons")} className="rounded-xl">
                      <Option value="driver">{t("tourGuideForm.options.addons.driver")}</Option>
                      <Option value="multilingual">{t("tourGuideForm.options.addons.multilingual")}</Option>
                      <Option value="water-wifi">{t("tourGuideForm.options.addons.waterWifi")}</Option>
                      <Option value="route-support">{t("tourGuideForm.options.addons.routeSupport")}</Option>
                      <Option value="meet-greet">{t("tourGuideForm.options.addons.meetGreet")}</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label={t("tourGuideForm.labels.requests")} name="requests">
                    <Input.TextArea rows={3} placeholder={t("tourGuideForm.placeholders.requests")} className="rounded-xl focus:ring-2 focus:ring-blue-400 transition" />
                  </Form.Item>

                  <div className="flex justify-center mt-6">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="px-12 py-3 rounded-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-500 hover:to-blue-600 transition-all"
                    >
                      {t("tourGuideForm.submitButton")}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>

          {/* Ads Section */}
          <Col xs={24} md={8} className="mt-6 md:mt-0">
            <Card title={t("tourGuideForm.adsTitle")} className="shadow-md rounded-2xl border border-gray-200 overflow-hidden">
              {loadingAds ? (
                <Spin />
              ) : ads.length > 0 ? (
                ads.map((ad) => (
                  <div key={ad.id} className="mb-6 border-b pb-3">
                    {ad.image && (
                      <img
                        src={`https://switchiify.com/bonetProject/backend/public/${ad.image}`}
                        alt={ad.title}
                        className="w-full h-36 object-cover rounded mb-2"
                      />
                    )}
                    <h4 className="font-semibold text-blue-500">{ad.adv_title}</h4>
                    <p className="text-sm text-gray-700 line-clamp-3">{ad.subtitle}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">{t("tourGuideForm.noAds")}</p>
              )}
            </Card>
          </Col>
        </Row>
      </Card>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TourGuideForm;
