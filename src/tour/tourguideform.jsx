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
import { modernToast } from "@/components/ModernToast";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { RangePicker } = DatePicker;

const TourGuideForm = ({ onTourSubmit }) => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
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
        modernToast.error("❌ Please select both start and end dates for your travel.");
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
        "https://api.bonet.rw:8443/bonetBackend/backend/public/tourGuides",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      modernToast.success("🎉 Tour guide request submitted successfully!");
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
        modernToast.error("📝 Please fill in all required fields correctly.");
      } else {
        modernToast.error("❌ Failed to submit tour guide request.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      {/* Form Container */}
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {L("Tour Guide Request","Demande de guide touristique","导游请求")}
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
                    <UserOutlined className="text-[#C9A84C]" />
                    {L("Personal Information","Informations personnelles","个人信息")}
                  </h3>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Form.Item
                        label={L("Full Name","Nom complet","全名")}
                        name="fullName"
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
                          { type: 'email', message: L('Please enter a valid email','Veuillez entrer un email valide','请输入有效邮箱') }
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
                    <Col xs={24}>
                      <Form.Item
                        label={L("Preferred Language","Langue préférée","首选语言")}
                        name="language"
                        rules={[{ required: true, message: L('Please select preferred language','Veuillez sélectionner une langue','请选择首选语言') }]}
                      >
                        <Select
                          placeholder={L("Select preferred language","Sélectionnez la langue","选择首选语言")}
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
                    {L("Tour Details","Détails de la visite","旅游详情")}
                  </h3>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Form.Item
                        label={L("Destinations to Visit","Destinations à visiter","目的地")}
                        name="destinations"
                        rules={[{ required: true, message: L('Please enter destinations','Veuillez entrer les destinations','请输入目的地') }]}
                      >
                        <Input
                          prefix={<EnvironmentOutlined className="text-gray-400" />}
                          placeholder={L("e.g., Volcanoes National Park, Lake Kivu, Kigali City","ex. : Parc des Volcans, Lac Kivu, Kigali","如：火山国家公园、基伍湖、基加利")}
                          className="rounded-lg h-12"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        label={L("Travel Dates","Dates de voyage","旅行日期")}
                        name="travelDates"
                        rules={[{ required: true, message: L('Please select your travel dates','Veuillez sélectionner les dates de voyage','请选择旅行日期') }]}
                      >
                        <RangePicker
                          className="w-full rounded-lg h-12"
                          format="YYYY-MM-DD"
                          placeholder={[L('Start date','Date de début','开始日期'), L('End date','Date de fin','结束日期')]}
                        />
                      </Form.Item>
                    </Col>
                    <Col >
                      <Form.Item
                        label={L("Number of Travelers","Nombre de voyageurs","旅行人数")}
                        name="travelers"
                        rules={[{ required: true, message: L('Please enter number of travelers','Veuillez entrer le nombre de voyageurs','请输入旅行人数') }]}
                      >
                        <InputNumber
                          min={1}
                          max={50}
                          placeholder={L("Number of people","Nombre de personnes","人数")}
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
                    {L("Tour Preferences","Préférences de visite","旅游偏好")}
                  </h3>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Form.Item
                        label={L("Tour Type","Type de visite","旅游类型")}
                        name="tourType"
                        rules={[{ required: true, message: L('Please select tour type','Veuillez sélectionner le type de visite','请选择旅游类型') }]}
                      >
                        <Select
                          mode="multiple"
                          placeholder={L("Select types of tours you're interested in","Sélectionnez les types de visites","选择您感兴趣的旅游类型")}
                          className="rounded-lg h-12"
                        >
                          <Option value="cultural">{L("Cultural & Historical","Culture et histoire","文化与历史")}</Option>
                          <Option value="nature">{L("Nature & Wildlife","Nature et faune","自然与野生动物")}</Option>
                          <Option value="city">{L("City Tours","Visites de ville","城市游")}</Option>
                          <Option value="adventure">{L("Adventure & Hiking","Aventure et randonnée","探险与徒步")}</Option>
                          <Option value="relaxation">{L("Relaxation & Leisure","Détente et loisirs","休闲与娱乐")}</Option>
                          <Option value="food">{L("Food & Culinary","Gastronomie","美食与烹饪")}</Option>
                          <Option value="religious">{L("Religious & Spiritual","Religieux et spirituel","宗教与灵性")}</Option>
                          <Option value="photography">{L("Photography Tours","Visites photo","摄影之旅")}</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={L("Activity Level","Niveau d'activité","活动强度")}
                        name="activityLevel"
                        rules={[{ required: true, message: L('Please select activity level','Veuillez sélectionner le niveau d\'activité','请选择活动强度') }]}
                      >
                        <Select
                          placeholder={L("Select activity level","Sélectionnez le niveau","选择活动强度")}
                          className="rounded-lg h-12"
                        >
                          <Option value="low">{L("Low (Light walking)","Faible (Marche légère)","低（轻松步行）")}</Option>
                          <Option value="medium">{L("Medium (Moderate activity)","Moyen (Activité modérée)","中等（适度活动）")}</Option>
                          <Option value="high">{L("High (Strenuous activity)","Élevé (Activité intense)","高（剧烈活动）")}</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label={L("Tour Duration","Durée de la visite","旅游时长")}
                        name="duration"
                        rules={[{ required: true, message: L('Please select tour duration','Veuillez sélectionner la durée','请选择旅游时长') }]}
                      >
                        <Select
                          placeholder={L("Select duration","Sélectionnez la durée","选择时长")}
                          onChange={(value) => setDurationType(value)}
                          className="rounded-lg h-12"
                        >
                          <Option value="half_day">{L("Half Day (4-5 hours)","Demi-journée (4-5 heures)","半天（4-5小时）")}</Option>
                          <Option value="full_day">{L("Full Day (8-10 hours)","Journée entière (8-10 heures)","全天（8-10小时）")}</Option>
                          <Option value="multiple_days">{L("Multiple Days","Plusieurs jours","多天")}</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {durationType === "multiple_days" && (
                      <Col xs={24}>
                        <Form.Item
                          label={L("Number of Days","Nombre de jours","天数")}
                          name="number_of_days"
                          rules={[{ required: true, message: L('Please enter number of days','Veuillez entrer le nombre de jours','请输入天数') }]}
                        >
                          <InputNumber
                            min={2}
                            max={30}
                            placeholder={L("Number of days","Nombre de jours","天数")}
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
                    {L("Budget & Transport","Budget et transport","预算与交通")}
                  </h3>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Form.Item
                        label={L("Budget Range","Fourchette de budget","预算范围")}
                        name="budget"
                        rules={[{ required: true, message: L('Please select budget range','Veuillez sélectionner le budget','请选择预算范围') }]}
                      >
                        <Select
                          placeholder={L("Select your budget range","Sélectionnez votre budget","选择预算范围")}
                          onChange={handleBudgetSelect}
                          className="rounded-lg h-12"
                        >
                          <Option value="budget">{L("Budget ($50 - $100 per person)","Budget (50 $ - 100 $ par personne)","经济型（每人50-100美元）")}</Option>
                          <Option value="mid">{L("Mid-Range ($100 - $250 per person)","Milieu de gamme (100 $ - 250 $)","中档（每人100-250美元）")}</Option>
                          <Option value="premium">{L("Premium ($250 - $500 per person)","Premium (250 $ - 500 $)","高端（每人250-500美元）")}</Option>
                          <Option value="vip">{L("VIP ($500+ per person)","VIP (500 $+ par personne)","VIP（每人500美元以上）")}</Option>
                          <Option value="custom">{L("Custom Budget","Budget personnalisé","自定义预算")}</Option>
                        </Select>
                      </Form.Item>
                      {isCustomBudget && (
                        <Form.Item
                          label={L("Custom Budget Amount","Montant du budget personnalisé","自定义预算金额")}
                          name="estimatedBudget"
                          rules={[{ required: true, message: L('Please enter your budget amount','Veuillez entrer votre budget','请输入您的预算金额') }]}
                        >
                          <Input
                            prefix={<DollarOutlined className="text-gray-400" />}
                            placeholder={L("Enter your total budget","Entrez votre budget total","输入您的总预算")}
                            type="number"
                            className="rounded-lg h-12"
                          />
                        </Form.Item>
                      )}
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        label={L("Preferred Transport","Transport préféré","首选交通")}
                        name="transport"
                      >
                        <Select
                          placeholder={L("Select preferred transport (optional)","Sélectionnez le transport (optionnel)","选择首选交通（可选）")}
                          className="rounded-lg h-12"
                        >
                          <Option value="suv">{L("SUV (1-6 people)","SUV (1-6 personnes)","SUV（1-6人）")}</Option>
                          <Option value="minivan">{L("Minivan (7-12 people)","Minibus (7-12 personnes)","面包车（7-12人）")}</Option>
                          <Option value="bus">{L("Tour Bus (13+ people)","Bus de visite (13+ personnes)","旅游巴士（13人以上）")}</Option>
                          <Option value="luxury_car">{L("Luxury Car","Voiture de luxe","豪华轿车")}</Option>
                          <Option value="no_transport">{L("No transport needed","Pas de transport nécessaire","无需交通")}</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                {/* Additional Services */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                    <BulbOutlined className="text-orange-600" />
                    {L("Additional Services","Services supplémentaires","附加服务")}
                  </h3>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Form.Item
                        label={L("Additional Services","Services supplémentaires","附加服务")}
                        name="addons"
                      >
                        <Select
                          mode="multiple"
                          placeholder={L("Select additional services (optional)","Services supplémentaires (optionnel)","选择附加服务（可选）")}
                          className="rounded-lg h-12"
                        >
                          <Option value="professional_photographer">{L("Professional Photographer","Photographe professionnel","专业摄影师")}</Option>
                          <Option value="multilingual_guide">{L("Multilingual Guide","Guide multilingue","多语言导游")}</Option>
                          <Option value="meal_inclusions">{L("Meal Inclusions","Repas inclus","含餐")}</Option>
                          <Option value="entrance_fees">{L("Entrance Fees Included","Frais d'entrée inclus","含门票")}</Option>
                          <Option value="hotel_pickup">{L("Hotel Pickup & Drop-off","Transfert hôtel","酒店接送")}</Option>
                          <Option value="custom_itinerary">{L("Custom Itinerary Planning","Planification d'itinéraire personnalisé","定制行程规划")}</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        label={L("Special Requests","Demandes spéciales","特殊要求")}
                        name="special_requests"
                      >
                        <Input.TextArea
                          rows={4}
                          placeholder={L("Any special requirements, specific interests, dietary restrictions, or additional information...","Exigences spéciales, intérêts particuliers, restrictions alimentaires...","任何特殊要求、特定兴趣、饮食限制或附加信息...")}
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
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className="h-14 px-16 rounded-lg w-full text-lg font-semibold bg-[#C9A84C] hover:bg-[#B8973B] text-white border-0 transition-colors duration-200"
              >
                {isLoading ? L('Submitting Your Request...','Envoi en cours...','提交中...') : L('Submit Tour Request','Soumettre la demande de visite','提交旅游请求')}
              </button>
            </div>
          </Form>
        </div>
      </div>
  
  );
};

export default TourGuideForm;