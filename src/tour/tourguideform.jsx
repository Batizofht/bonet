"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Globe,
  DollarSign,
  Lightbulb,
} from "lucide-react";
import {
  Field,
  TextInput,
  TextArea,
  NumberInput,
  Select,
  DateRangePicker,
  SectionTitle,
  SubmitButton,
} from "@/components/ui/inputs";
import { apiPost } from "@/lib/api";
import { modernToast } from "@/components/ui/toast";
import { useTranslation } from "react-i18next";

const TourGuideForm = ({ onTourSubmit }) => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
  const [durationType, setDurationType] = useState(null);
  const [isCustomBudget, setIsCustomBudget] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    language: "",
    destinations: "",
    travelDates: [undefined, undefined],
    travelers: "",
    tourType: [],
    activityLevel: "",
    duration: "",
    number_of_days: "",
    budget: "",
    estimatedBudget: "",
    transport: "",
    addons: [],
    special_requests: "",
  });
  const [errors, setErrors] = useState({});

  const set = (name, val) => {
    setValues((v) => ({ ...v, [name]: val }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleBudgetSelect = (value) => {
    setIsCustomBudget(value === "custom");
    setValues((v) => ({ ...v, budget: value, estimatedBudget: value !== "custom" ? "" : v.estimatedBudget }));
    setErrors((e) => ({ ...e, budget: undefined }));
  };

  const handleDurationSelect = (value) => {
    setDurationType(value);
    setValues((v) => ({ ...v, duration: value }));
    setErrors((e) => ({ ...e, duration: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!values.fullName.trim()) e.fullName = L('Please enter your full name','Veuillez entrer votre nom complet','请输入您的全名');
    if (!values.email.trim()) e.email = L('Please enter your email','Veuillez entrer votre email','请输入您的邮箱');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = L('Please enter a valid email','Veuillez entrer un email valide','请输入有效邮箱');
    if (!values.phone.trim()) e.phone = L('Please enter your phone number','Veuillez entrer votre numéro','请输入您的电话号码');
    if (!values.language) e.language = L('Please select preferred language','Veuillez sélectionner une langue','请选择首选语言');
    if (!values.destinations.trim()) e.destinations = L('Please enter destinations','Veuillez entrer les destinations','请输入目的地');
    if (!values.travelDates || !values.travelDates[0] || !values.travelDates[1]) e.travelDates = L('Please select your travel dates','Veuillez sélectionner les dates de voyage','请选择旅行日期');
    if (!values.travelers) e.travelers = L('Please enter number of travelers','Veuillez entrer le nombre de voyageurs','请输入旅行人数');
    if (!values.tourType || values.tourType.length === 0) e.tourType = L('Please select tour type','Veuillez sélectionner le type de visite','请选择旅游类型');
    if (!values.activityLevel) e.activityLevel = L('Please select activity level','Veuillez sélectionner le niveau d\'activité','请选择活动强度');
    if (!values.duration) e.duration = L('Please select tour duration','Veuillez sélectionner la durée','请选择旅游时长');
    if (values.duration === "multiple_days" && !values.number_of_days) e.number_of_days = L('Please enter number of days','Veuillez entrer le nombre de jours','请输入天数');
    if (!values.budget) e.budget = L('Please select budget range','Veuillez sélectionner le budget','请选择预算范围');
    if (values.budget === "custom" && !values.estimatedBudget) e.estimatedBudget = L('Please enter your budget amount','Veuillez entrer votre budget','请输入您的预算金额');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      modernToast.error("📝 Please fill in all required fields correctly.");
      return;
    }
    if (!values.travelDates || values.travelDates.length !== 2 || !values.travelDates[0] || !values.travelDates[1]) {
      modernToast.error("❌ Please select both start and end dates for your travel.");
      return;
    }
    try {
      setIsLoading(true);
      const payload = {
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        language: values.language,
        destinations: values.destinations,
        travelDates: values.travelDates,
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

      await apiPost(
        "https://api.bonet.rw/bonetBackend/backend/public/tourGuides",
        payload
      );

      modernToast.success("🎉 Tour guide request submitted successfully!");
      setValues({
        fullName: "",
        email: "",
        phone: "",
        language: "",
        destinations: "",
        travelDates: [undefined, undefined],
        travelers: "",
        tourType: [],
        activityLevel: "",
        duration: "",
        number_of_days: "",
        budget: "",
        estimatedBudget: "",
        transport: "",
        addons: [],
        special_requests: "",
      });
      setErrors({});
      setIsCustomBudget(false);
      setDurationType(null);

      // Call the parent callback if provided
      if (onTourSubmit) {
        onTourSubmit(payload);
      }
    } catch (error) {
      console.error(error);
      modernToast.error("❌ Failed to submit tour guide request.");
    } finally {
      setIsLoading(false);
    }
  };

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "french", label: "French" },
    { value: "kinyarwanda", label: "Kinyarwanda" },
    { value: "swahili", label: "Swahili" },
    { value: "spanish", label: "Spanish" },
    { value: "german", label: "German" },
  ];
  const tourTypeOptions = [
    { value: "cultural", label: L("Cultural & Historical","Culture et histoire","文化与历史") },
    { value: "nature", label: L("Nature & Wildlife","Nature et faune","自然与野生动物") },
    { value: "city", label: L("City Tours","Visites de ville","城市游") },
    { value: "adventure", label: L("Adventure & Hiking","Aventure et randonnée","探险与徒步") },
    { value: "relaxation", label: L("Relaxation & Leisure","Détente et loisirs","休闲与娱乐") },
    { value: "food", label: L("Food & Culinary","Gastronomie","美食与烹饪") },
    { value: "religious", label: L("Religious & Spiritual","Religieux et spirituel","宗教与灵性") },
    { value: "photography", label: L("Photography Tours","Visites photo","摄影之旅") },
  ];
  const activityOptions = [
    { value: "low", label: L("Low (Light walking)","Faible (Marche légère)","低（轻松步行）") },
    { value: "medium", label: L("Medium (Moderate activity)","Moyen (Activité modérée)","中等（适度活动）") },
    { value: "high", label: L("High (Strenuous activity)","Élevé (Activité intense)","高（剧烈活动）") },
  ];
  const durationOptions = [
    { value: "half_day", label: L("Half Day (4-5 hours)","Demi-journée (4-5 heures)","半天（4-5小时）") },
    { value: "full_day", label: L("Full Day (8-10 hours)","Journée entière (8-10 heures)","全天（8-10小时）") },
    { value: "multiple_days", label: L("Multiple Days","Plusieurs jours","多天") },
  ];
  const budgetOptions = [
    { value: "budget", label: L("Budget ($50 - $100 per person)","Budget (50 $ - 100 $ par personne)","经济型（每人50-100美元）") },
    { value: "mid", label: L("Mid-Range ($100 - $250 per person)","Milieu de gamme (100 $ - 250 $)","中档（每人100-250美元）") },
    { value: "premium", label: L("Premium ($250 - $500 per person)","Premium (250 $ - 500 $)","高端（每人250-500美元）") },
    { value: "vip", label: L("VIP ($500+ per person)","VIP (500 $+ par personne)","VIP（每人500美元以上）") },
    { value: "custom", label: L("Custom Budget","Budget personnalisé","自定义预算") },
  ];
  const transportOptions = [
    { value: "suv", label: L("SUV (1-6 people)","SUV (1-6 personnes)","SUV（1-6人）") },
    { value: "minivan", label: L("Minivan (7-12 people)","Minibus (7-12 personnes)","面包车（7-12人）") },
    { value: "bus", label: L("Tour Bus (13+ people)","Bus de visite (13+ personnes)","旅游巴士（13人以上）") },
    { value: "luxury_car", label: L("Luxury Car","Voiture de luxe","豪华轿车") },
    { value: "no_transport", label: L("No transport needed","Pas de transport nécessaire","无需交通") },
  ];
  const addonOptions = [
    { value: "professional_photographer", label: L("Professional Photographer","Photographe professionnel","专业摄影师") },
    { value: "multilingual_guide", label: L("Multilingual Guide","Guide multilingue","多语言导游") },
    { value: "meal_inclusions", label: L("Meal Inclusions","Repas inclus","含餐") },
    { value: "entrance_fees", label: L("Entrance Fees Included","Frais d'entrée inclus","含门票") },
    { value: "hotel_pickup", label: L("Hotel Pickup & Drop-off","Transfert hôtel","酒店接送") },
    { value: "custom_itinerary", label: L("Custom Itinerary Planning","Planification d'itinéraire personnalisé","定制行程规划") },
  ];

  return (
    <div className="">
      {/* Form Container */}
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {L("Tour Guide Request","Demande de guide touristique","导游请求")}
          </h1>
        </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                {/* Personal Information */}
                <div className="mb-8">
                  <SectionTitle icon={<User className="w-5 h-5" />}>
                    {L("Personal Information","Informations personnelles","个人信息")}
                  </SectionTitle>
                  <div className="grid grid-cols-1 gap-4">
                    <Field label={L("Full Name","Nom complet","全名")} required error={errors.fullName}>
                      <TextInput
                        icon={<User className="w-4 h-4" />}
                        placeholder={L("Enter your full name","Entrez votre nom complet","输入您的全名")}
                        value={values.fullName}
                        onChange={(e) => set("fullName", e.target.value)}
                        error={errors.fullName}
                      />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label={L("Email Address","Adresse e-mail","电子邮件地址")} required error={errors.email}>
                        <TextInput
                          icon={<Mail className="w-4 h-4" />}
                          placeholder="your.email@example.com"
                          value={values.email}
                          onChange={(e) => set("email", e.target.value)}
                          error={errors.email}
                        />
                      </Field>
                      <Field label={L("Phone Number","Numéro de téléphone","电话号码")} required error={errors.phone}>
                        <TextInput
                          icon={<Phone className="w-4 h-4" />}
                          placeholder="+250 78X XXX XXX"
                          value={values.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          error={errors.phone}
                        />
                      </Field>
                    </div>
                    <Field label={L("Preferred Language","Langue préférée","首选语言")} required error={errors.language}>
                      <Select
                        value={values.language || undefined}
                        onChange={(v) => set("language", v)}
                        options={languageOptions}
                        placeholder={L("Select preferred language","Sélectionnez la langue","选择首选语言")}
                        error={errors.language}
                      />
                    </Field>
                  </div>
                </div>

                {/* Tour Details */}
                <div className="mb-8">
                  <SectionTitle icon={<Calendar className="w-5 h-5" />}>
                    {L("Tour Details","Détails de la visite","旅游详情")}
                  </SectionTitle>
                  <div className="grid grid-cols-1 gap-4">
                    <Field label={L("Destinations to Visit","Destinations à visiter","目的地")} required error={errors.destinations}>
                      <TextInput
                        icon={<MapPin className="w-4 h-4" />}
                        placeholder={L("e.g., Volcanoes National Park, Lake Kivu, Kigali City","ex. : Parc des Volcans, Lac Kivu, Kigali","如：火山国家公园、基伍湖、基加利")}
                        value={values.destinations}
                        onChange={(e) => set("destinations", e.target.value)}
                        error={errors.destinations}
                      />
                    </Field>
                    <Field label={L("Travel Dates","Dates de voyage","旅行日期")} required error={errors.travelDates}>
                      <DateRangePicker
                        value={values.travelDates}
                        onChange={(v) => set("travelDates", v)}
                        error={errors.travelDates}
                        startPlaceholder={L('Start date','Date de début','开始日期')}
                        endPlaceholder={L('End date','Date de fin','结束日期')}
                      />
                    </Field>
                    <Field label={L("Number of Travelers","Nombre de voyageurs","旅行人数")} required error={errors.travelers}>
                      <NumberInput
                        min={1}
                        max={50}
                        placeholder={L("Number of people","Nombre de personnes","人数")}
                        value={values.travelers}
                        onChange={(e) => set("travelers", e.target.value)}
                        error={errors.travelers}
                      />
                    </Field>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Tour Preferences */}
                <div className="mb-8">
                  <SectionTitle icon={<Globe className="w-5 h-5" />}>
                    {L("Tour Preferences","Préférences de visite","旅游偏好")}
                  </SectionTitle>
                  <div className="grid grid-cols-1 gap-4">
                    <Field label={L("Tour Type","Type de visite","旅游类型")} required error={errors.tourType}>
                      <Select
                        multiple
                        value={values.tourType}
                        onChange={(v) => set("tourType", v)}
                        options={tourTypeOptions}
                        placeholder={L("Select types of tours you're interested in","Sélectionnez les types de visites","选择您感兴趣的旅游类型")}
                        error={errors.tourType}
                      />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label={L("Activity Level","Niveau d'activité","活动强度")} required error={errors.activityLevel}>
                        <Select
                          value={values.activityLevel || undefined}
                          onChange={(v) => set("activityLevel", v)}
                          options={activityOptions}
                          placeholder={L("Select activity level","Sélectionnez le niveau","选择活动强度")}
                          error={errors.activityLevel}
                        />
                      </Field>
                      <Field label={L("Tour Duration","Durée de la visite","旅游时长")} required error={errors.duration}>
                        <Select
                          value={values.duration || undefined}
                          onChange={handleDurationSelect}
                          options={durationOptions}
                          placeholder={L("Select duration","Sélectionnez la durée","选择时长")}
                          error={errors.duration}
                        />
                      </Field>
                    </div>
                    {durationType === "multiple_days" && (
                      <Field label={L("Number of Days","Nombre de jours","天数")} required error={errors.number_of_days}>
                        <NumberInput
                          min={2}
                          max={30}
                          placeholder={L("Number of days","Nombre de jours","天数")}
                          value={values.number_of_days}
                          onChange={(e) => set("number_of_days", e.target.value)}
                          error={errors.number_of_days}
                        />
                      </Field>
                    )}
                  </div>
                </div>

                {/* Budget & Transport */}
                <div className="mb-8">
                  <SectionTitle icon={<DollarSign className="w-5 h-5" />}>
                    {L("Budget & Transport","Budget et transport","预算与交通")}
                  </SectionTitle>
                  <div className="grid grid-cols-1 gap-4">
                    <Field label={L("Budget Range","Fourchette de budget","预算范围")} required error={errors.budget}>
                      <Select
                        value={values.budget || undefined}
                        onChange={handleBudgetSelect}
                        options={budgetOptions}
                        placeholder={L("Select your budget range","Sélectionnez votre budget","选择预算范围")}
                        error={errors.budget}
                      />
                    </Field>
                    {isCustomBudget && (
                      <Field label={L("Custom Budget Amount","Montant du budget personnalisé","自定义预算金额")} required error={errors.estimatedBudget}>
                        <NumberInput
                          icon={<DollarSign className="w-4 h-4" />}
                          placeholder={L("Enter your total budget","Entrez votre budget total","输入您的总预算")}
                          value={values.estimatedBudget}
                          onChange={(e) => set("estimatedBudget", e.target.value)}
                          error={errors.estimatedBudget}
                        />
                      </Field>
                    )}
                    <Field label={L("Preferred Transport","Transport préféré","首选交通")}>
                      <Select
                        value={values.transport || undefined}
                        onChange={(v) => set("transport", v)}
                        options={transportOptions}
                        placeholder={L("Select preferred transport (optional)","Sélectionnez le transport (optionnel)","选择首选交通（可选）")}
                      />
                    </Field>
                  </div>
                </div>

                {/* Additional Services */}
                <div className="mb-8">
                  <SectionTitle icon={<Lightbulb className="w-5 h-5" />}>
                    {L("Additional Services","Services supplémentaires","附加服务")}
                  </SectionTitle>
                  <div className="grid grid-cols-1 gap-4">
                    <Field label={L("Additional Services","Services supplémentaires","附加服务")}>
                      <Select
                        multiple
                        value={values.addons}
                        onChange={(v) => set("addons", v)}
                        options={addonOptions}
                        placeholder={L("Select additional services (optional)","Services supplémentaires (optionnel)","选择附加服务（可选）")}
                      />
                    </Field>
                    <Field label={L("Special Requests","Demandes spéciales","特殊要求")}>
                      <TextArea
                        rows={4}
                        placeholder={L("Any special requirements, specific interests, dietary restrictions, or additional information...","Exigences spéciales, intérêts particuliers, restrictions alimentaires...","任何特殊要求、特定兴趣、饮食限制或附加信息...")}
                        value={values.special_requests}
                        onChange={(e) => set("special_requests", e.target.value)}
                      />
                    </Field>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <SubmitButton loading={isLoading} className="px-16">
                {isLoading ? L('Submitting Your Request...','Envoi en cours...','提交中...') : L('Submit Tour Request','Soumettre la demande de visite','提交旅游请求')}
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
  );
};

export default TourGuideForm;
