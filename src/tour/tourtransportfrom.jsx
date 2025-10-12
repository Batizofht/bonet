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
} from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const TransportForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [ads, setAds] = useState([]);
  const [loadingAds, setLoadingAds] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(
          "https://switchiify.com/bonetProject/backend/public/advertisements"
        );
        setAds(res.data.slice(0, 3));
      } catch (err) {
        console.error("Failed to load advertisements:", err);
      } finally {
        setLoadingAds(false);
      }
    };
    fetchAds();
  }, []);

  const onFinish = async (values) => {
    try {
      const adds_on = Array.isArray(values.addons)
        ? values.addons.join(", ")
        : "";

      const formattedData = {
        ...values,
        datetime: values.datetime ? values.datetime.toISOString() : null,
        adds_on,
      };

      delete formattedData.addons;

      const response = await axios.post(
        "https://switchiify.com/bonetProject/backend/public/tourTransports",
        formattedData
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(t("transportForm.successMessage"));
        form.resetFields();
      } else {
        toast.error(t("transportForm.errorMessage"));
      }
    } catch (error) {
      toast.error(t("transportForm.errorMessage"));
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <Card className="relative shadow-2xl rounded-3xl bg-white/90 backdrop-blur-md border border-white/20 overflow-hidden w-full max-w-[1100px]">
        {/* Decorative Orbs Inside Card */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-gradient-to-tr from-green-400/20 to-cyan-600/20 rounded-full pointer-events-none"></div>

        <Row gutter={24}>
          {/* Form Section */}
          <Col xs={24} md={16}>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-2">
              {t("transportForm.title")}
            </h1>
            <p className="text-gray-600 mb-4">{t("transportForm.subtitle")}</p>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="relative z-10"
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label={t("transportForm.labels.fullName")}
                    name="name"
                    rules={[{ required: true, message: t("transportForm.errors.required") }]}
                  >
                    <Input placeholder={t("transportForm.placeholders.fullName")} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={t("transportForm.labels.email")}
                    name="email"
                    rules={[
                      { required: true, message: t("transportForm.errors.required") },
                      { type: "email", message: t("transportForm.errors.emailInvalid") }
                    ]}
                  >
                    <Input placeholder={t("transportForm.placeholders.email")} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={t("transportForm.labels.datetime")}
                    name="datetime"
                    rules={[{ required: true, message: t("transportForm.errors.required") }]}
                  >
                    <DatePicker showTime className="w-full" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={t("transportForm.labels.pickup")}
                    name="pickup"
                    rules={[{ required: true, message: t("transportForm.errors.required") }]}
                  >
                    <Input placeholder={t("transportForm.placeholders.pickup")} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={t("transportForm.labels.dropoff")}
                    name="dropoff"
                    rules={[{ required: true, message: t("transportForm.errors.required") }]}
                  >
                    <Input placeholder={t("transportForm.placeholders.dropoff")} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={t("transportForm.labels.passengers")}
                    name="passengers"
                    rules={[{ required: true, message: t("transportForm.errors.required") }]}
                  >
                    <Input
                      type="number"
                      min={1}
                      placeholder={t("transportForm.placeholders.passengers")}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={t("transportForm.labels.vehicle")} name="vehicle">
                    <Select placeholder={t("transportForm.placeholders.vehicle")}>
                      <Option value="suv">{t("transportForm.options.vehicle.suv")}</Option>
                      <Option value="cruiser">{t("transportForm.options.vehicle.cruiser")}</Option>
                      <Option value="minivan">{t("transportForm.options.vehicle.minivan")}</Option>
                      <Option value="bus">{t("transportForm.options.vehicle.bus")}</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={t("transportForm.labels.addons")} name="addons">
                    <Select
                      mode="multiple"
                      placeholder={t("transportForm.placeholders.addons")}
                      allowClear
                    >
                      <Option value="driver">{t("transportForm.options.addons.driver")}</Option>
                      <Option value="multilingual">{t("transportForm.options.addons.multilingual")}</Option>
                      <Option value="water-wifi">{t("transportForm.options.addons.waterWifi")}</Option>
                      <Option value="route-support">{t("transportForm.options.addons.routeSupport")}</Option>
                      <Option value="meet-greet">{t("transportForm.options.addons.meetGreet")}</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label={t("transportForm.labels.notes")} name="notes">
                    <Input.TextArea
                      rows={3}
                      placeholder={t("transportForm.placeholders.notes")}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <div className="flex justify-center mt-4">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-500 hover:to-blue-600 transition-all"
                    >
                      {t("transportForm.submitButton")}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>

          {/* Advertisement Section inside Card */}
          <Col xs={24} md={8} className="mt-6 md:mt-0">
            <Card
              title={t("transportForm.adsTitle")}
              className="shadow-md border border-gray-200 overflow-hidden"
            >
              {loadingAds ? (
                <Spin />
              ) : ads.length > 0 ? (
                ads.map((ad) => (
                  <div key={ad.id} className="mb-4 border-b pb-2">
                    {ad.image && (
                      <img
                        src={`https://switchiify.com/bonetProject/backend/public/${ad.image}`}
                        alt={ad.title}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                    )}
                    <h4 className="font-semibold text-blue-500">{ad.adv_title}</h4>
                    <p className="text-sm text-gray-700 line-clamp-3">{ad.subtitle}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">{t("transportForm.noAds")}</p>
              )}
            </Card>
          </Col>
        </Row>
      </Card>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TransportForm;
