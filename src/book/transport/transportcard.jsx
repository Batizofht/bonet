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
import { modernToast } from "@/components/ModernToast";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const TransportCard = ({ bookTransport }) => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
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
        modernToast.error("❌ Please select both pickup date and time.");
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
        "https://api.bonet.rw:8443/bonetBackend/backend/public/transportBooking",
        payload
      );

      modernToast.success("🎉 Transport request submitted successfully!");
      form.resetFields();
      setRentTime(null);
    } catch (error) {
      console.error(error);
      if (error.errorFields) {
        modernToast.error("📝 Please fill in all required fields correctly.");
      } else {
        modernToast.error("❌ Failed to submit transport request.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-8">
     <div className="mx-0 md:max-w-4xl md:mx-auto md:px-4 px-2">
        {/* Form Container */}
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <Form
            layout="vertical"
            form={form}
            size="large"
          >
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <UserOutlined className="text-[#C9A84C]" />
                {L("Personal Information","Informations personnelles","个人信息")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  label={L("Full Name","Nom complet","全名")}
                  name="full_name"
                  rules={[{ required: true, message: L('Please enter your full name','Veuillez entrer votre nom complet','请输入您的全名') }]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder={L("Enter your full name","Entrez votre nom complet","输入您的全名")}
                    className="rounded-lg h-12"
                  />
                </Form.Item>

                <Form.Item
                  label={L("Email Address","Adresse e-mail","电子邮件地址")}
                  name="email"
                  rules={[
                    { required: true, message: L('Please enter your email','Veuillez entrer votre email','请输入您的邮箱') },
                    { type: 'email', message: L('Please enter a valid email','Email invalide','请输入有效邮箱') }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="your.email@example.com"
                    className="rounded-lg h-12"
                  />
                </Form.Item>

                <Form.Item
                  label={L("Phone Number","Numéro de téléphone","电话号码")}
                  name="phone"
                  rules={[{ required: true, message: L('Please enter your phone number','Veuillez entrer votre numéro','请输入您的电话号码') }]}
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
                {L("Transport Service","Service de transport","交通服务")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  label={L("Service Type","Type de service","服务类型")}
                  name="transport_service"
                  rules={[{ required: true, message: L('Please select service type','Veuillez sélectionner le type de service','请选择服务类型') }]}
                >
                  <Select
                    onChange={handleTransportServiceChange}
                    placeholder={L("Select transport service","Sélectionnez le service de transport","选择交通服务")}
                    className="rounded-lg h-12"
                  >
                    <Option value="airport_transfers">{L("Airport Transfers","Transferts aéroport","机场接送")}</Option>
                    <Option value="hotel_to_airport">{L("Hotel to Airport","Hôtel vers l'aéroport","酒店至机场")}</Option>
                    <Option value="local_business">{L("Local Business Transport","Transport d'affaires local","本地商务交通")}</Option>
                    <Option value="city_tours">{L("City Tours","Visites de ville","城市游览")}</Option>
                    <Option value="conference_event">{L("Conference & Event Transport","Transport conférence et événement","会议活动交通")}</Option>
                    <Option value="intercity_travel">{L("Intercity Travel","Voyage interurbain","城际旅行")}</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={L("Transport Type","Type de transport","交通类型")}
                  name="transport_type"
                  rules={[{ required: true, message: L('Please select transport type','Veuillez sélectionner le type de transport','请选择交通类型') }]}
                >
                  <Select
                    placeholder={L("Select transport type","Sélectionnez le type de transport","选择交通类型")}
                    className="rounded-lg h-12"
                  >
                    <Option value="business_vip">{L("Business VIP Service","Service VIP Affaires","商务VIP服务")}</Option>
                    <Option value="executive">{L("Executive Service","Service exécutif","行政服务")}</Option>
                    <Option value="standard">{L("Standard Service","Service standard","标准服务")}</Option>
                    <Option value="group_transport">{L("Group Transport","Transport de groupe","团队交通")}</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={L("Vehicle Type","Type de véhicule","车辆类型")}
                  name="car_type"
                  rules={[{ required: true, message: L('Please select vehicle type','Veuillez sélectionner le type de véhicule','请选择车辆类型') }]}
                >
                  <Select
                    placeholder={L("Select vehicle type","Sélectionnez le type de véhicule","选择车辆类型")}
                    className="rounded-lg h-12"
                  >
                    <Option value="executive_sedan">{L("Executive Sedan","Berline exécutive","行政轿车")}</Option>
                    <Option value="luxury_suv">{L("Luxury SUV","SUV de luxe","豪华SUV")}</Option>
                    <Option value="business_sedan">{L("Business Sedan","Berline d'affaires","商务轿车")}</Option>
                    <Option value="reliable_suv">{L("Reliable SUV","SUV fiable","可靠SUV")}</Option>
                    <Option value="luxury_van">{L("Luxury Van","Van de luxe","豪华面包车")}</Option>
                    <Option value="minibus">{L("Minibus","Minibus","小型巴士")}</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={L("Number of Passengers","Nombre de passagers","乘客人数")}
                  name="seats"
                  rules={[{ required: true, message: L('Please enter number of passengers','Veuillez entrer le nombre de passagers','请输入乘客人数') }]}
                >
                  <InputNumber
                    min={1}
                    max={50}
                    placeholder={L("Number of passengers","Nombre de passagers","乘客人数")}
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
                {L("Rental Details","Détails de la location","租车详情")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  label={L("Rental Duration","Durée de location","租用时长")}
                  name="rent_time"
                  rules={[{ required: true, message: L('Please select rental duration','Veuillez sélectionner la durée de location','请选择租用时长') }]}
                >
                  <Select
                    placeholder={L("Select rental duration","Sélectionnez la durée de location","选择租用时长")}
                    onChange={(value) => setRentTime(value)}
                    className="rounded-lg h-12"
                  >
                    <Option value="whole_day">{L("Whole Day (8 hours)","Journée entière (8 heures)","全天（8小时）")}</Option>
                    <Option value="half_day">{L("Half Day (4 hours)","Demi-journée (4 heures)","半天（4小时）")}</Option>
                    <Option value="per_trip">{L("Per Trip","Par trajet","按次")}</Option>
                    <Option value="multiple_days">{L("Multiple Days","Plusieurs jours","多天")}</Option>
                  </Select>
                </Form.Item>

                {rentTime === "multiple_days" && (
                  <Form.Item
                    label={L("Number of Days","Nombre de jours","天数")}
                    name="number_of_days"
                    rules={[{ required: true, message: L('Please enter number of days','Veuillez entrer le nombre de jours','请输入天数') }]}
                  >
                    <InputNumber
                      min={1}
                      max={30}
                      placeholder={L("Number of days","Nombre de jours","天数")}
                      className="w-full rounded-lg h-12"
                      controls={false}
                    />
                  </Form.Item>
                )}

                <Form.Item
                  label={L("Pickup Date","Date de prise en charge","上车日期")}
                  name="pickup"
                  rules={[{ required: true, message: L('Please select pickup date','Veuillez sélectionner la date de prise en charge','请选择上车日期') }]}
                >
                  <DatePicker
                    className="w-full rounded-lg h-12"
                    format="YYYY-MM-DD"
                    placeholder={L("Select pickup date","Sélectionnez la date","选择上车日期")}
                  />
                </Form.Item>

                <Form.Item
                  label={L("Pickup Time","Heure de prise en charge","上车时间")}
                  name="dropoff_time"
                  rules={[{ required: true, message: L('Please select pickup time','Veuillez sélectionner l\'heure de prise en charge','请选择上车时间') }]}
                >
                  <TimePicker
                    format="HH:mm"
                    className="w-full rounded-lg h-12"
                    placeholder={L("Select pickup time","Sélectionnez l'heure","选择上车时间")}
                  />
                </Form.Item>
              </div>
            </div>

            {/* Locations */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <EnvironmentOutlined className="text-purple-600" />
                {L("Locations","Emplacements","地点")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  label={L("Pickup Location","Lieu de prise en charge","上车地点")}
                  name="pickup_location"
                  rules={[{ required: true, message: L('Please enter pickup location','Veuillez entrer le lieu de prise en charge','请输入上车地点') }]}
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
                  label={L("Drop-off Location","Lieu de dépose","下车地点")}
                  name="dropoff_location"
                  rules={[{ required: true, message: L('Please enter drop-off location','Veuillez entrer le lieu de dépose','请输入下车地点') }]}
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
                {L("Additional Services","Services supplémentaires","附加服务")}
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <Form.Item
                  label={L("Additional Services","Services supplémentaires","附加服务")}
                  name="addons"
                >
                  <Select
                    mode="multiple"
                    placeholder={L("Select additional services (optional)","Services supplémentaires (optionnel)","选择附加服务（可选）")}
                    className="rounded-lg h-12"
                  >
                    <Option value="professional_driver">{L("Professional Driver","Chauffeur professionnel","专业司机")}</Option>
                    <Option value="multilingual_driver">{L("Multilingual Driver","Chauffeur multilingue","多语言司机")}</Option>
                    <Option value="water_wifi">{L("Complimentary Water & WiFi","Eau et WiFi offerts","免费水和WiFi")}</Option>
                    <Option value="route_planning">{L("Route Planning & Support","Planification d'itinéraire","路线规划与支持")}</Option>
                    <Option value="meet_greet">{L("Meet & Greet Service","Service d'accueil","迎接服务")}</Option>
                    <Option value="child_seats">{L("Child Safety Seats","Sièges enfant","儿童安全座椅")}</Option>
                    <Option value="luggage_assistance">{L("Luggage Assistance","Assistance bagages","行李协助")}</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={L("Special Requests","Demandes spéciales","特殊要求")}
                  name="special_requests"
                >
                  <Input.TextArea
                    rows={4}
                    placeholder={L("Any special requirements, specific routes, or additional information...","Exigences spéciales, itinéraires ou informations supplémentaires...","任何特殊要求、特定路线或附加信息...")}
                    className="rounded-lg"
                  />
                </Form.Item>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className="w-full h-14 rounded-lg text-lg font-semibold bg-[#C9A84C] hover:bg-[#B8973B] text-white border-0 transition-colors duration-200"
              >
                {isLoading ? L('Submitting Your Request...','Envoi en cours...','提交中...') : L('Submit Transport Request','Soumettre la demande de transport','提交交通请求')}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TransportCard;