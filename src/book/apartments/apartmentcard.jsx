// src/book/ApartmentCard.jsx
import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { modernToast } from "@/components/ModernToast";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  HomeOutlined,
  CarOutlined,
  DollarOutlined,
  TeamOutlined,
  BulbOutlined,
  StarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { RangePicker } = DatePicker;

const ApartmentCard = ({ bookApartment }) => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
  const [form] = Form.useForm();
  const [budgetType, setBudgetType] = useState(null);
  const [locationType, setLocationType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBudgetChange = (value) => {
    setBudgetType(value);
    if (value !== "custom") {
      form.setFieldsValue({ custom_budget: undefined });
    }
  };

  const handleLocationChange = (value) => {
    setLocationType(value);
    if (value !== "other") {
      form.setFieldsValue({ custom_location: undefined });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();

      if (!values.date_range || values.date_range.length !== 2) {
        modernToast.error("❌ Please select both check-in and check-out dates.");
        return;
      }

      const [checkinDate, checkoutDate] = values.date_range;

      const payload = {
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        guests: values.guests,
        purpose_of_stay: values.purpose_of_stay,
        location: values.custom_location || values.location,
        transport: values.transport,
        checkin_date: dayjs(checkinDate).format("YYYY-MM-DD"),
        checkout_date: dayjs(checkoutDate).format("YYYY-MM-DD"),
        room_type: values.room_type,
        budget_range: values.budget_range,
        custom_budget: values.custom_budget || null,
        special_needs: values.special_needs || "",
      };

      await axios.post(
        "https://api.bonet.rw:8443/bonetBackend/backend/public/apartment-requests", 
        payload
      );

      modernToast.success("🎉 Apartment request submitted successfully!");
      form.resetFields();
      setBudgetType(null);
      setLocationType(null);
    } catch (error) {
      console.error(error);
      if (error.errorFields) {
        modernToast.error("📝 Please fill in all required fields correctly.");
      } else {
        modernToast.error("❌ Failed to submit apartment request.");
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
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
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
                <Col>
                  <Form.Item
                    label={L("Number of Guests","Nombre d'invités","宾客人数")}
                    name="guests"
                    rules={[{ required: true, message: L('Please enter number of guests','Veuillez entrer le nombre d\'invités','请输入宾客人数') }]}
                  >
                    <InputNumber
                      min={1}
                      max={20}
                      placeholder="2"
                      className="w-full rounded-lg h-12"
                      controls={false}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Stay Details */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <HomeOutlined className="text-green-600" />
                {L("Stay Details","Détails du séjour","住宿详情")}
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={L("Purpose of Stay","Motif du séjour","入住目的")}
                    name="purpose_of_stay"
                    rules={[{ required: true, message: L('Please select purpose of stay','Veuillez sélectionner le motif','请选择入住目的') }]}
                  >
                    <Select
                      placeholder={L("Select purpose of stay","Sélectionnez le motif","选择入住目的")}
                      className="rounded-lg h-12"
                    >
                      <Option value="business">{L("Business Travel","Voyage d'affaires","商务出行")}</Option>
                      <Option value="honeymoon">{L("Honeymoon / Romantic","Lune de miel / Romantique","蜜月/浪漫")}</Option>
                      <Option value="family">{L("Family Vacation","Vacances en famille","家庭度假")}</Option>
                      <Option value="diplomatic">{L("Diplomatic Visit","Visite diplomatique","外交访问")}</Option>
                      <Option value="vip_event">{L("VIP Event","Événement VIP","VIP活动")}</Option>
                      <Option value="extended_stay">{L("Extended Stay","Séjour prolongé","长期住宿")}</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={L("Preferred Location","Emplacement préféré","首选位置")}
                    name="preferred_location"
                    rules={[{ required: true, message: L('Please select preferred location','Veuillez sélectionner l\'emplacement','请选择首选位置') }]}
                  >
                    <Select
                      placeholder={L("Choose preferred location","Choisissez l'emplacement","选择首选位置")}
                      onChange={handleLocationChange}
                      className="rounded-lg h-12"
                    >
                      <Option value="kcc">{L("Kigali City Center","Centre-ville de Kigali","基加利市中心")}</Option>
                      <Option value="embassy">{L("Embassy & Diplomatic Area","Zone des ambassades et diplomatique","大使馆和外交区")}</Option>
                      <Option value="vision_city">Vision City</Option>
                      <Option value="musanze">Musanze</Option>
                      <Option value="lake_kivu">{L("Lake Kivu","Lac Kivu","基伍湖")}</Option>
                      <Option value="other">{L("Other Location","Autre emplacement","其他位置")}</Option>
                    </Select>
                  </Form.Item>
                  {locationType === "other" && (
                    <Form.Item
                      name="custom_location"
                      rules={[{ required: true, message: L('Please specify your location','Veuillez préciser votre emplacement','请指定您的位置') }]}
                    >
                      <Input
                        prefix={<EnvironmentOutlined className="text-gray-400" />}
                        placeholder={L("Enter specific location","Entrez l'emplacement spécifique","输入具体位置")}
                        className="rounded-lg h-12"
                      />
                    </Form.Item>
                  )}
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={L("Location Details","Détails de l'emplacement","位置详情")}
                    name="location"
                    rules={[{ required: true, message: L('Please enter location details','Veuillez entrer les détails de l\'emplacement','请输入位置详情') }]}
                  >
                    <Input
                      prefix={<EnvironmentOutlined className="text-gray-400" />}
                      placeholder={L("e.g., Kigali, Gasabo District","ex. : Kigali, District de Gasabo","如：基加利，加萨博区")}
                      className="rounded-lg h-12"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={L("Check-in & Check-out Dates","Dates d'arrivée et de départ","入住与退房日期")}
                    name="date_range"
                    rules={[{ required: true, message: L('Please select check-in and check-out dates','Veuillez sélectionner les dates','请选择入住和退房日期') }]}
                  >
                    <RangePicker
                      className="w-full rounded-lg h-12"
                      format="YYYY-MM-DD"
                      placeholder={[L('Check-in date','Date d\'arrivée','入住日期'), L('Check-out date','Date de départ','退房日期')]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Apartment Preferences */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <StarOutlined className="text-yellow-600" />
                {L("Apartment Preferences","Préférences d'appartement","公寓偏好")}
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={L("Room Type","Type de chambre","房型")}
                    name="room_type"
                    rules={[{ required: true, message: L('Please select room type','Veuillez sélectionner le type de chambre','请选择房型') }]}
                  >
                    <Select
                      placeholder={L("Select room type","Sélectionnez le type de chambre","选择房型")}
                      className="rounded-lg h-12"
                    >
                      <Option value="executive">{L("Executive Apartment","Appartement exécutif","行政公寓")}</Option>
                      <Option value="deluxe">{L("Deluxe Apartment","Appartement de luxe","豪华公寓")}</Option>
                      <Option value="penthouse">{L("Penthouse Suite","Suite Penthouse","顶层套房")}</Option>
                      <Option value="villa">{L("Private Villa","Villa privée","私人别墅")}</Option>
                      <Option value="studio">{L("Studio Apartment","Studio","单间公寓")}</Option>
                      <Option value="1_bedroom">{L("1 Bedroom Apartment","Appartement 1 chambre","一室公寓")}</Option>
                      <Option value="2_bedroom">{L("2 Bedroom Apartment","Appartement 2 chambres","两室公寓")}</Option>
                      <Option value="3_bedroom">{L("3+ Bedroom Apartment","Appartement 3+ chambres","三室及以上公寓")}</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={L("Transportation Service","Service de transport","交通服务")}
                    name="transport"
                  >
                    <Select
                      placeholder={L("Select transportation (optional)","Sélectionnez le transport (optionnel)","选择交通方式（可选）")}
                      className="rounded-lg h-12"
                    >
                      <Option value="Executive Sedans – First-Class (VIP)">
                        {L("Executive Sedans (VIP)","Berlines exécutives (VIP)","行政轿车（VIP）")}
                      </Option>
                      <Option value="Luxury SUVs – First-Class (VIP)">
                        {L("Luxury SUVs (VIP)","SUV de luxe (VIP)","豪华SUV（VIP）")}
                      </Option>
                      <Option value="Business-Class Sedans – Second-Class (Executive)">
                        {L("Business Sedans (Executive)","Berlines d'affaires (Exécutif)","商务轿车（行政）")}
                      </Option>
                      <Option value="Reliable SUVs – Second-Class (Business & NGO Use)">
                        {L("Reliable SUVs (Business)","SUV fiables (Affaires)","可靠SUV（商务）")}
                      </Option>
                      <Option value="Luxury Vans – VIP Group Transport">
                        {L("Luxury Vans (Group VIP)","Vans de luxe (Groupe VIP)","豪华面包车（团体VIP）")}
                      </Option>
                      <Option value="none">{L("No Transportation Needed","Pas de transport nécessaire","无需交通服务")}</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={L("Budget Range","Fourchette budgétaire","预算范围")}
                    name="budget_range"
                    rules={[{ required: true, message: L('Please select budget range','Veuillez sélectionner la fourchette budgétaire','请选择预算范围') }]}
                  >
                    <Select
                      placeholder={L("Select your budget range","Sélectionnez votre fourchette budgétaire","选择您的预算范围")}
                      onChange={handleBudgetChange}
                      className="rounded-lg h-12"
                    >
                      <Option value="150_200">{L("$150 - $200 per night","150 $ - 200 $ par nuit","每晚150-200美元")}</Option>
                      <Option value="200_400">{L("$200 - $400 per night","200 $ - 400 $ par nuit","每晚200-400美元")}</Option>
                      <Option value="400_plus">{L("$400+ per night","400 $+ par nuit","每晚400美元以上")}</Option>
                      <Option value="custom">{L("Custom Budget","Budget personnalisé","自定义预算")}</Option>
                    </Select>
                  </Form.Item>
                  {budgetType === "custom" && (
                    <Form.Item
                      name="custom_budget"
                      rules={[{ required: true, message: L('Please enter your budget amount','Veuillez entrer votre budget','请输入您的预算金额') }]}
                    >
                      <Input
                        prefix={<DollarOutlined className="text-gray-400" />}
                        placeholder={L("Enter your budget amount","Entrez votre montant budgétaire","输入您的预算金额")}
                        type="number"
                        className="rounded-lg h-12"
                      />
                    </Form.Item>
                  )}
                </Col>
              </Row>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                <BulbOutlined className="text-purple-600" />
                {L("Additional Information","Informations complémentaires","附加信息")}
              </h3>
              <Row gutter={[24, 16]}>
                <Col xs={24}>
                  <Form.Item
                    label={L("Special Requests","Demandes spéciales","特殊要求")}
                    name="special_needs"
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder={L(
                        "Any special requirements, apartment preferences, amenities needed, or additional information we should know about...",
                        "Exigences spéciales, préférences d'appartement, équipements souhaités ou informations supplémentaires...",
                        "任何特殊要求、公寓偏好、所需设施或我们应了解的附加信息..."
                      )}
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
                {isLoading
                  ? L('Submitting Your Request...','Envoi en cours...','提交中...')
                  : L('Submit Apartment Request','Soumettre la demande d\'appartement','提交公寓请求')}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;