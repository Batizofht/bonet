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
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
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
        "https://api.bonet.rw:8443/bonetBackend/backend/public/tourTransports",
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
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {L("Tour Transport Request","Demande de transport touristique","旅游交通请求")}
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
                <UserOutlined className="text-[#C9A84C]" />
                {L("Personal Information","Informations personnelles","个人信息")}
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={L("Full Name","Nom complet","全名")}
                    name="name"
                    rules={[{ required: true, message: L('Please enter your full name','Veuillez entrer votre nom complet','请输入您的全名') }]}
                  >
                    <Input
                      prefix={<UserOutlined className="text-gray-400" />}
                      placeholder={L("Enter your full name","Entrez votre nom complet","输入您的全名")}
                      className="rounded-lg h-12"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
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
                </Col>
                <Col xs={24} sm={12}>
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
                </Col>
              </Row>
            </div>

            {/* Transport Details */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <CarOutlined className="text-green-600" />
                {L("Transport Details","Détails du transport","交通详情")}
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={L("Date & Time","Date et heure","日期与时间")}
                    name="datetime"
                    rules={[{ required: true, message: L('Please select date and time','Veuillez sélectionner la date et l\'heure','请选择日期和时间') }]}
                  >
                    <DatePicker
                      showTime
                      className="w-full rounded-lg h-12"
                      placeholder={L("Select date and time","Sélectionnez la date et l'heure","选择日期和时间")}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label={L("Number of Passengers","Nombre de passagers","乘客人数")}
                    name="passengers"
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
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={L("Pickup Location","Lieu de prise en charge","上车地点")}
                    name="pickup"
                    rules={[{ required: true, message: L('Please enter pickup location','Veuillez entrer le lieu de prise en charge','请输入上车地点') }]}
                  >
                    <Input
                      prefix={<EnvironmentOutlined className="text-gray-400" />}
                      placeholder={L("Enter pickup address or location","Entrez l'adresse de prise en charge","输入上车地址或位置")}
                      className="rounded-lg h-12"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={L("Drop-off Location","Lieu de dépose","下车地点")}
                    name="dropoff"
                    rules={[{ required: true, message: L('Please enter drop-off location','Veuillez entrer le lieu de dépose','请输入下车地点') }]}
                  >
                    <Input
                      prefix={<EnvironmentOutlined className="text-gray-400" />}
                      placeholder={L("Enter drop-off address or location","Entrez l'adresse de dépose","输入下车地址或位置")}
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
                {L("Vehicle & Services","Véhicule et services","车辆与服务")}
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={L("Vehicle Type","Type de véhicule","车辆类型")}
                    name="vehicle"
                    rules={[{ required: true, message: L('Please select vehicle type','Veuillez sélectionner le type de véhicule','请选择车辆类型') }]}
                  >
                    <Select
                      placeholder={L("Select vehicle type","Sélectionnez le type de véhicule","选择车辆类型")}
                      className="rounded-lg h-12"
                    >
                      <Option value="suv">{L("SUV (1-6 passengers)","SUV (1-6 passagers)","SUV（1-6人）")}</Option>
                      <Option value="cruiser">{L("4x4 Cruiser (1-6 passengers)","Cruiser 4x4 (1-6 passagers)","4x4越野车（1-6人）")}</Option>
                      <Option value="minivan">{L("Minivan (7-12 passengers)","Minibus (7-12 passagers)","面包车（7-12人）")}</Option>
                      <Option value="bus">{L("Tour Bus (13+ passengers)","Bus de visite (13+ passagers)","旅游巴士（13人以上）")}</Option>
                      <Option value="luxury_suv">{L("Luxury SUV","SUV de luxe","豪华SUV")}</Option>
                      <Option value="executive_car">{L("Executive Car","Voiture exécutive","行政轿车")}</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
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
                      <Option value="luggage_assistance">{L("Luggage Assistance","Assistance bagages","行李协助")}</Option>
                      <Option value="child_seats">{L("Child Safety Seats","Sièges enfant","儿童安全座椅")}</Option>
                      <Option value="cooler_box">{L("Cooler Box with Refreshments","Glacière avec rafraîchissements","带饮料的冷藏箱")}</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <EnvironmentOutlined className="text-orange-600" />
                {L("Additional Information","Informations complémentaires","附加信息")}
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24}>
                  <Form.Item
                    label={L("Special Instructions","Instructions spéciales","特殊说明")}
                    name="notes"
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder={L("Any special requirements, specific routes, waiting times, or additional information...","Exigences spéciales, itinéraires, temps d'attente ou informations supplémentaires...","任何特殊要求、特定路线、等待时间或附加信息...")}
                      className="rounded-lg"
                    />
                  </Form.Item>
                </Col>
              </Row>
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

export default TransportForm;