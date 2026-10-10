"use client";
// src/book/HotelCard.jsx
import React, { useState } from "react";
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
import { modernToast } from "@/components/ui/toast";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Car,
  DollarSign,
  Users,
  Lightbulb,
} from "lucide-react";
import { apiPost, API_BASE } from "@/lib/api";
import { useTranslation } from "react-i18next";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues = {
  full_name: "",
  email: "",
  phone: "",
  guests: "",
  purpose_of_stay: undefined,
  preferred_location: undefined,
  custom_location: "",
  date_range: [undefined, undefined],
  hotel_level: undefined,
  transport: undefined,
  budget_range: undefined,
  custom_budget: "",
  special_needs: "",
};

const HotelCard = ({ bookHotel }) => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [budgetType, setBudgetType] = useState(null);
  const [locationType, setLocationType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const set = (k, v) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const handleBudgetChange = (value) => {
    setBudgetType(value);
    setValues((prev) => ({
      ...prev,
      budget_range: value,
      custom_budget: value !== "custom" ? "" : prev.custom_budget,
    }));
    setErrors((prev) => ({ ...prev, budget_range: undefined, custom_budget: undefined }));
  };

  const handleLocationChange = (value) => {
    setLocationType(value);
    setValues((prev) => ({
      ...prev,
      preferred_location: value,
      custom_location: value !== "other" ? "" : prev.custom_location,
    }));
    setErrors((prev) => ({ ...prev, preferred_location: undefined, custom_location: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!values.full_name?.trim()) e.full_name = L('Please enter your full name','Veuillez entrer votre nom complet','请输入您的全名');
    if (!values.email?.trim()) e.email = L('Please enter your email','Veuillez entrer votre email','请输入您的邮箱');
    else if (!EMAIL_RE.test(values.email.trim())) e.email = L('Please enter a valid email','Veuillez entrer un email valide','请输入有效的邮箱');
    if (!values.phone?.trim()) e.phone = L('Please enter your phone number','Veuillez entrer votre numéro de téléphone','请输入您的电话号码');
    if (values.guests === "" || values.guests == null) e.guests = L('Please enter number of guests','Veuillez entrer le nombre d\'invités','请输入宾客人数');
    if (!values.date_range?.[0] || !values.date_range?.[1]) e.date_range = L('Please select check-in and check-out dates','Veuillez sélectionner les dates','请选择入住和退房日期');
    if (locationType === "other" && !values.custom_location?.trim()) e.custom_location = L('Please specify your location','Veuillez préciser votre emplacement','请指定您的位置');
    if (budgetType === "custom" && (values.custom_budget === "" || values.custom_budget == null)) e.custom_budget = L('Please enter your budget amount','Veuillez entrer votre budget','请输入您的预算金额');
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      modernToast.error("📝 Please fill in all required fields correctly.");
      return;
    }

    if (!values.date_range || values.date_range.length !== 2 || !values.date_range[0] || !values.date_range[1]) {
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
      custom_location: values.custom_location || values.preferred_location,
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
      hotel_level: values.hotel_level,
      transport: values.transport,
      budget_range: values.budget_range,
      custom_budget: values.custom_budget || null,
      special_needs: values.special_needs || "",
    };

    try {
      setIsLoading(true);
      await apiPost(
        `${API_BASE}/hotel-requests`,
        payload
      );

      modernToast.success("🎉 Hotel request submitted successfully!");
      setValues(initialValues);
      setErrors({});
      setBudgetType(null);
      setLocationType(null);
    } catch (error) {
      console.error(error);
      modernToast.error("❌ Failed to submit hotel request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  pb-8 ">
      <div className="mx-0 md:max-w-4xl md:mx-auto md:px-4 px-2">
        {/* Form Container */}
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {/* Personal Information */}
            <div className="mb-8">
              <SectionTitle icon={<User className="text-[#C9A84C]" size={22} />}>
                {L("Personal Information","Informations personnelles","个人信息")}
              </SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label={L("Full Name","Nom complet","全名")} required error={errors.full_name}>
                  <TextInput
                    icon={<User size={16} />}
                    placeholder={L("Enter your full name","Entrez votre nom complet","输入您的全名")}
                    value={values.full_name}
                    onChange={(e) => set("full_name", e.target.value)}
                    error={errors.full_name}
                  />
                </Field>
                <Field label={L("Email Address","Adresse e-mail","电子邮件地址")} required error={errors.email}>
                  <TextInput
                    icon={<Mail size={16} />}
                    placeholder="your.email@example.com"
                    type="email"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    error={errors.email}
                  />
                </Field>
                <Field label={L("Phone Number","Numéro de téléphone","电话号码")} required error={errors.phone}>
                  <TextInput
                    icon={<Phone size={16} />}
                    placeholder="+250 78X XXX XXX"
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    error={errors.phone}
                  />
                </Field>
                <Field label={L("Number of Guests","Nombre d'invités","宾客人数")} required error={errors.guests}>
                  <NumberInput
                    min={1}
                    max={20}
                    placeholder="E.g 4"
                    value={values.guests}
                    onChange={(e) => set("guests", e.target.value === "" ? "" : Number(e.target.value))}
                    error={errors.guests}
                  />
                </Field>
              </div>
            </div>

            {/* Stay Details */}
            <div className="mb-8">
              <SectionTitle icon={<Calendar className="text-green-600" size={22} />}>
                {L("Stay Details","Détails du séjour","住宿详情")}
              </SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label={L("Purpose of Stay","Motif du séjour","入住目的")}>
                  <Select
                    placeholder={L("Select purpose of stay","Sélectionnez le motif","选择入住目的")}
                    value={values.purpose_of_stay}
                    onChange={(v) => set("purpose_of_stay", v)}
                    options={[
                      { value: "business", label: L("Business Trip","Voyage d'affaires","商务出行") },
                      { value: "honeymoon", label: L("Honeymoon","Lune de miel","蜜月") },
                      { value: "family", label: L("Family Vacation","Vacances en famille","家庭度假") },
                      { value: "diplomatic", label: L("Diplomatic Visit","Visite diplomatique","外交访问") },
                      { value: "vip_event", label: L("VIP Event","Événement VIP","VIP活动") },
                      { value: "tourism", label: L("Tourism","Tourisme","旅游") },
                    ]}
                  />
                </Field>
                <div>
                  <Field label={L("Preferred Location","Emplacement préféré","首选位置")}>
                    <Select
                      placeholder={L("Choose preferred location","Choisissez l'emplacement","选择首选位置")}
                      value={values.preferred_location}
                      onChange={handleLocationChange}
                      options={[
                        { value: "kcc", label: L("Kigali Convention Center Area","Zone du Centre de conférences de Kigali","基加利会议中心区域") },
                        { value: "embassy", label: L("Embassy & Diplomatic Area","Zone des ambassades et diplomatique","大使馆和外交区") },
                        { value: "vision_city", label: "Vision City" },
                        { value: "musanze", label: "Musanze" },
                        { value: "lake_kivu", label: L("Lake Kivu","Lac Kivu","基伍湖") },
                        { value: "other", label: L("Other Location","Autre emplacement","其他位置") },
                      ]}
                    />
                  </Field>
                  {locationType === "other" && (
                    <div className="mt-4">
                      <Field error={errors.custom_location}>
                        <TextInput
                          icon={<MapPin size={16} />}
                          placeholder={L("Enter specific location","Entrez l'emplacement spécifique","输入具体位置")}
                          value={values.custom_location}
                          onChange={(e) => set("custom_location", e.target.value)}
                          error={errors.custom_location}
                        />
                      </Field>
                    </div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Field
                    label={L("Check-in & Check-out Dates","Dates d'arrivée et de départ","入住与退房日期")}
                    required
                    error={errors.date_range}
                  >
                    <DateRangePicker
                      value={values.date_range}
                      onChange={(v) => set("date_range", v)}
                      error={errors.date_range}
                      startPlaceholder={L('Check-in date',"Date d'arrivée",'入住日期')}
                      endPlaceholder={L('Check-out date','Date de départ','退房日期')}
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* Hotel Preferences */}
            <div className="mb-8">
              <SectionTitle icon={<Star className="text-yellow-600" size={22} />}>
                {L("Hotel Preferences","Préférences d'hôtel","酒店偏好")}
              </SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label={L("Hotel Category","Catégorie d'hôtel","酒店类别")}>
                  <Select
                    placeholder={L("Select hotel category","Sélectionnez la catégorie","选择酒店类别")}
                    value={values.hotel_level}
                    onChange={(v) => set("hotel_level", v)}
                    options={[
                      { value: "premium", label: L("Premium Hotel","Hôtel Premium","高级酒店") },
                      { value: "4-star", label: L("4 Star Hotel","Hôtel 4 Étoiles","四星级酒店") },
                      { value: "5-star", label: L("5 Star Hotel","Hôtel 5 Étoiles","五星级酒店") },
                      { value: "luxury1", label: L("Luxury Hotel","Hôtel de luxe","豪华酒店") },
                      { value: "luxury2", label: L("Ultra Luxury","Ultra luxe","超豪华") },
                      { value: "private_villa", label: L("Private Villa","Villa privée","私人别墅") },
                      { value: "boutique", label: L("Boutique Hotel","Hôtel boutique","精品酒店") },
                    ]}
                  />
                </Field>
                <Field label={L("Transportation Service","Service de transport","交通服务")}>
                  <Select
                    placeholder={L("Select transportation","Sélectionnez le transport","选择交通方式")}
                    value={values.transport}
                    onChange={(v) => set("transport", v)}
                    options={[
                      { value: "Executive Sedans – First-Class (VIP)", label: L("Executive Sedans (VIP)","Berlines exécutives (VIP)","行政轿车（VIP）") },
                      { value: "Luxury SUVs – First-Class (VIP)", label: L("Luxury SUVs (VIP)","SUV de luxe (VIP)","豪华SUV（VIP）") },
                      { value: "Business-Class Sedans – Second-Class (Executive)", label: L("Business Sedans (Executive)","Berlines d'affaires (Exécutif)","商务轿车（行政）") },
                      { value: "Reliable SUVs – Second-Class (Business & NGO Use)", label: L("Reliable SUVs (Business)","SUV fiables (Affaires)","可靠SUV（商务）") },
                      { value: "Luxury Vans – VIP Group Transport", label: L("Luxury Vans (Group VIP)","Vans de luxe (Groupe VIP)","豪华面包车（VIP团队）") },
                      { value: "none", label: L("No Transportation Needed","Pas de transport nécessaire","无需交通服务") },
                    ]}
                  />
                </Field>
                <div>
                  <Field label={L("Budget Range","Fourchette de budget","预算范围")}>
                    <Select
                      placeholder={L("Select your budget range","Sélectionnez votre budget","选择预算范围")}
                      value={values.budget_range}
                      onChange={handleBudgetChange}
                      options={[
                        { value: "150_200", label: L("$150 - $200 per night","150 $ - 200 $ par nuit","每晚150-200美元") },
                        { value: "200_400", label: L("$200 - $400 per night","200 $ - 400 $ par nuit","每晚200-400美元") },
                        { value: "400_plus", label: L("$400+ per night","400 $+ par nuit","每晚400美元以上") },
                        { value: "custom", label: L("Custom Budget","Budget personnalisé","自定义预算") },
                      ]}
                    />
                  </Field>
                  {budgetType === "custom" && (
                    <div className="mt-4">
                      <Field error={errors.custom_budget}>
                        <TextInput
                          icon={<DollarSign size={16} />}
                          placeholder={L("Enter your budget amount","Entrez votre budget","输入您的预算金额")}
                          type="number"
                          value={values.custom_budget}
                          onChange={(e) => set("custom_budget", e.target.value)}
                          error={errors.custom_budget}
                        />
                      </Field>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <SectionTitle icon={<Lightbulb className="text-purple-600" size={22} />}>
                {L("Additional Information","Informations complémentaires","附加信息")}
              </SectionTitle>
              <div className="grid grid-cols-1 gap-6">
                <Field label={L("Special Requests","Demandes spéciales","特殊要求")}>
                  <TextArea
                    rows={4}
                    placeholder={L("Any special requirements, preferences, or additional information we should know about...","Exigences spéciales, préférences ou informations supplémentaires...","任何特殊要求、偏好或我们需要了解的附加信息...")}
                    value={values.special_needs}
                    onChange={(e) => set("special_needs", e.target.value)}
                  />
                </Field>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <SubmitButton loading={isLoading}>
                {isLoading ? L('Submitting Your Request...','Envoi en cours...','提交中...') : L('Submit Booking Request','Soumettre la demande','提交预订请求')}
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
