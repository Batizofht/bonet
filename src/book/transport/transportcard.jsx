import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,
  Spin,
  Card,
} from "antd";
import {
  TeamOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const TransportCard = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [rentTime, setRentTime] = useState(null);
  const [advertisements, setAdvertisements] = useState([]);
  const [loadingAds, setLoadingAds] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE",
    libraries: ["places"],
  });

  const pickupRef = useRef(null);
  const dropoffRef = useRef(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(
          "https://switchiify.com/bonetProject/backend/public/advertisements"
        );
        setAdvertisements(res.data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch advertisements:", error);
      } finally {
        setLoadingAds(false);
      }
    };
    fetchAds();
  }, []);

  const handlePlaceChange = (field, ref) => {
    const place = ref.current.getPlace();
    if (place && place.formatted_address) {
      form.setFieldValue(field, place.formatted_address);
    }
  };

  const handleTransportServiceChange = (value) => {
    if (value === t("transportCard.options.transportService.hotelToAirport")) {
      form.setFieldsValue({
        transport_service: value,
        dropoff_location: t("transportCard.kigaliAirport"),
        rent_time: undefined,
      });
    } else {
      form.setFieldsValue({
        transport_service: value,
        dropoff_location: undefined,
      });
    }
  };

  const handleContactNow = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        ...values,
        pickup: values.pickup.format("YYYY-MM-DD"),
        dropoff: values.dropoff.format("HH:mm:ss"),
        status: "not replied",
        days_number: values.number_of_days || "",
      };

      const response = await axios.post(
        "https://switchiify.com/bonetProject/backend/public/transportBooking",
        payload
      );

      if (response.data.id) {
        toast.success(t("transportCard.successMessage"));
        form.resetFields();
        setRentTime(null);
      } else {
        toast.error(t("transportCard.errorMessage"));
      }
    } catch (error) {
      toast.error(t("transportCard.fillRequired"));
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Glassy Gradient Form */}
      <div className="flex-1 relative bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-cyan-600/20 rounded-full translate-x-12 translate-y-12"></div>

        <div className="relative z-10 p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-2">
            {t("transportCard.titles.transportRequest")}
          </h1>
          <p className="text-[15px] text-white/80 mb-6">
            {t("transportCard.instructions")}
          </p>

          <Form
            layout="vertical"
            form={form}
            onFinish={handleContactNow}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Form.Item
                label={<span className="text-white/80">{t("transportCard.labels.fullName")}</span>}
                name="names"
                rules={[{ required: true, message: t("transportCard.errors.enterName") }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder={t("transportCard.placeholders.fullName")}
                  className="rounded-xl border-white/30 bg-white/5 text-white placeholder-white/50 hover:bg-white/10 focus:ring-2 focus:ring-blue-400"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-white/80">{t("transportCard.labels.email")}</span>}
                name="email"
                rules={[{ required: true, type: "email", message: t("transportCard.errors.enterValidEmail") }]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder={t("transportCard.placeholders.email")}
                  className="rounded-xl border-white/30 bg-white/5 text-white placeholder-white/50 hover:bg-white/10 focus:ring-2 focus:ring-blue-400"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-white/80">{t("transportCard.labels.transportService")}</span>}
                name="transport_service"
              >
                <Select
                  onChange={handleTransportServiceChange}
                  placeholder={t("transportCard.placeholders.selectService")}
                  className="rounded-xl bg-white/5 text-white placeholder-white/50"
                >
                  <Option value={t("transportCard.options.transportService.airportTransfers")}>
                    {t("transportCard.options.transportService.airportTransfers")}
                  </Option>
                  <Option value={t("transportCard.options.transportService.hotelToAirport")}>
                    {t("transportCard.options.transportService.hotelToAirport")}
                  </Option>
                  <Option value={t("transportCard.options.transportService.localBusiness")}>
                    {t("transportCard.options.transportService.localBusiness")}
                  </Option>
                  <Option value={t("transportCard.options.transportService.cityTours")}>
                    {t("transportCard.options.transportService.cityTours")}
                  </Option>
                  <Option value={t("transportCard.options.transportService.conferenceEvent")}>
                    {t("transportCard.options.transportService.conferenceEvent")}
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<span className="text-white/80">{t("transportCard.labels.transportType")}</span>}
                name="transport_type"
                rules={[{ required: true, message: t("transportCard.errors.selectType") }]}
              >
                <Select
                  placeholder={t("transportCard.placeholders.selectType")}
                  className="rounded-xl bg-white/5 text-white placeholder-white/50"
                >
                  <Option value={t("transportCard.options.transportType.businessVip")}>
                    {t("transportCard.options.transportType.businessVip")}
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<span className="text-white/80">{t("transportCard.labels.carType")}</span>}
                name="car_type"
              >
                <Select
                  placeholder={t("transportCard.placeholders.selectCarType")}
                  className="rounded-xl bg-white/5 text-white placeholder-white/50"
                >
                  <Option value={t("transportCard.options.carType.execSedan")}>
                    {t("transportCard.options.carType.execSedan")}
                  </Option>
                  <Option value={t("transportCard.options.carType.luxSUV")}>
                    {t("transportCard.options.carType.luxSUV")}
                  </Option>
                  <Option value={t("transportCard.options.carType.bizSedan")}>
                    {t("transportCard.options.carType.bizSedan")}
                  </Option>
                  <Option value={t("transportCard.options.carType.reliableSUV")}>
                    {t("transportCard.options.carType.reliableSUV")}
                  </Option>
                  <Option value={t("transportCard.options.carType.luxVan")}>
                    {t("transportCard.options.carType.luxVan")}
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<span className="text-white/80">{t("transportCard.labels.seats")}</span>}
                name="seats"
              >
                <Input
                  type="number"
                  min={1}
                  prefix={<TeamOutlined />}
                  placeholder={t("transportCard.placeholders.seats")}
                  className="rounded-xl border-white/30 bg-white/5 text-white placeholder-white/50 hover:bg-white/10 focus:ring-2 focus:ring-blue-400"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-white/80">{t("transportCard.labels.rentTime")}</span>}
                name="rent_time"
              >
                <Select
                  placeholder={t("transportCard.placeholders.selectRentTime")}
                  allowClear
                  onChange={(value) => setRentTime(value)}
                  className="rounded-xl bg-white/5 text-white placeholder-white/50"
                >
                  <Option value={t("transportCard.options.rentTime.wholeDay")}>
                    {t("transportCard.options.rentTime.wholeDay")}
                  </Option>
                  <Option value={t("transportCard.options.rentTime.halfDay")}>
                    {t("transportCard.options.rentTime.halfDay")}
                  </Option>
                  <Option value={t("transportCard.options.rentTime.trip")}>
                    {t("transportCard.options.rentTime.trip")}
                  </Option>
                  <Option value={t("transportCard.options.rentTime.moreDays")}>
                    {t("transportCard.options.rentTime.moreDays")}
                  </Option>
                </Select>
              </Form.Item>

              {rentTime === t("transportCard.options.rentTime.moreDays") && (
                <Form.Item
                  label={<span className="text-white/80">{t("transportCard.labels.numberOfDays")}</span>}
                  name="number_of_days"
                  rules={[{ required: true, message: t("transportCard.errors.enterNumberOfDays") }]}
                >
                  <Input
                    type="number"
                    min={1}
                    placeholder={t("transportCard.placeholders.numberOfDays")}
                    className="rounded-xl border-white/30 bg-white/5 text-white placeholder-white/50 hover:bg-white/10 focus:ring-2 focus:ring-blue-400"
                  />
                </Form.Item>
              )}

              <Form.Item
                label={<span className="text-white/80">{t("transportCard.labels.pickupLocation")}</span>}
                name="pickup_location"
                rules={[{  message: t("transportCard.errors.enterPickupLocation") }]}
              >
                {isLoaded ? (
                  <Autocomplete
                    onLoad={(ref) => (pickupRef.current = ref)}
                    onPlaceChanged={() => handlePlaceChange("pickup_location", pickupRef)}
                  >
                    <Input
                      prefix={<EnvironmentOutlined />}
                      placeholder={t("transportCard.placeholders.pickupLocation")}
                      className="rounded-xl border-white/30 bg-white/5 text-white placeholder-white/50 hover:bg-white/10 focus:ring-2 focus:ring-blue-400"
                    />
                  </Autocomplete>
                ) : (
                  <Input disabled placeholder={t("transportCard.placeholders.loadingMaps")} />
                )}
              </Form.Item>

              <Form.Item
                label={<span className="text-white/80">{t("transportCard.labels.dropoffLocation")}</span>}
                name="dropoff_location"
                rules={[{  message: t("transportCard.errors.enterDropoffLocation") }]}
              >
                {form.getFieldValue("transport_service") === t("transportCard.options.transportService.hotelToAirport") ? (
                  <Input value={t("transportCard.kigaliAirport")} disabled />
                ) : isLoaded ? (
                  <Autocomplete
                    onLoad={(ref) => (dropoffRef.current = ref)}
                    onPlaceChanged={() => handlePlaceChange("dropoff_location", dropoffRef)}
                  >
                    <Input
                      prefix={<EnvironmentOutlined />}
                      placeholder={t("transportCard.placeholders.dropoffLocation")}
                      className="rounded-xl border-white/30 bg-white/5 text-white placeholder-white/50 hover:bg-white/10 focus:ring-2 focus:ring-blue-400"
                    />
                  </Autocomplete>
                ) : (
                  <Input disabled placeholder={t("transportCard.placeholders.loadingMaps")} />
                )}
              </Form.Item>

              <Form.Item
                label={<span className="text-white/80">{t("transportCard.labels.pickupDate")}</span>}
                name="pickup"
                rules={[{ required: true, message: t("transportCard.errors.selectPickupDate") }]}
              >
                <DatePicker
                  className="w-full rounded-xl bg-white/5 border-white/30 text-white placeholder-white/50"
                  suffixIcon={<CalendarOutlined className="text-white/70" />}
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-white/80">{t("tourGuideForm.labels.addons")}</span>}
                name="addons"
              >
                <Select
                  mode="multiple"
                  allowClear
                  className="rounded-xl bg-white/5 text-white placeholder-white/50"
                >
                  <Option value="driver">{t("tourGuideForm.options.addons.driver")}</Option>
                  <Option value="multilingual">{t("tourGuideForm.options.addons.multilingual")}</Option>
                  <Option value="water-wifi">{t("tourGuideForm.options.addons.waterWifi")}</Option>
                  <Option value="route-support">{t("tourGuideForm.options.addons.routeSupport")}</Option>
                  <Option value="meet-greet">{t("tourGuideForm.options.addons.meetGreet")}</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<span className="text-white/80">{t("transportCard.labels.pickupTime")}</span>}
                name="dropoff"
                rules={[{ required: true, message: t("transportCard.errors.selectPickupTime") }]}
              >
                <TimePicker
                  format="HH:mm"
                  className="w-full rounded-xl bg-white/5 border-white/30 text-white placeholder-white/50"
                  suffixIcon={<CalendarOutlined className="text-white/70" />}
                />
              </Form.Item>
            </div>

            <div className="col-span-2 text-center mt-4">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="px-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("transportCard.submitButton")}
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* Ads Section unchanged */}
      <div className="w-full md:w-[320px]">
  <Card
    title={t("transportCard.titles.sponsoredAds")}
    className="relative shadow-2xl border border-white/20 rounded-2xl 
               bg-white/5 backdrop-blur-lg text-white overflow-hidden"
    headStyle={{ color: "white" }}
  >
    {/* Decorative gradient orbs like in form */}
    <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-cyan-600/20 rounded-full blur-2xl" />

    {loadingAds ? (
      <Spin />
    ) : advertisements.length > 0 ? (
      advertisements.map((ad) => (
        <div
          key={ad.id}
          className="mb-4 pb-2 relative z-10 bg-white/10 p-3 rounded-xl backdrop-blur-sm"
        >
          {ad.image && (
            <img
              src={`https://switchiify.com/bonetProject/backend/public/${ad.image}`}
              alt={ad.adv_title}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
          )}
          <h4 className="font-semibold text-white">{ad.adv_title}</h4>
          <p className="text-sm text-white/80 line-clamp-3">{ad.subtitle}</p>
        </div>
      ))
    ) : (
      <p className="text-sm text-white/70 relative z-10">
        {t("transportCard.noAds")}
      </p>
    )}
  </Card>
</div>


      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TransportCard;

