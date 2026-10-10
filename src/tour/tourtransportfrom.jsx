"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Car,
  Lightbulb,
} from "lucide-react";
import {
  Field,
  TextInput,
  TextArea,
  NumberInput,
  Select,
  DatePicker,
  TimePicker,
  SectionTitle,
  SubmitButton,
} from "@/components/ui/inputs";
import { apiPost } from "@/lib/api";
import { modernToast } from "@/components/ui/toast";
import { useTranslation } from "react-i18next";

const TransportForm = () => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    datetime: "",
    passengers: "",
    pickup: "",
    dropoff: "",
    vehicle: "",
    addons: [],
    notes: "",
  });
  const [errors, setErrors] = useState({});

  const set = (name, val) => {
    setValues((v) => ({ ...v, [name]: val }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const datePart = values.datetime && values.datetime.length >= 10 ? values.datetime.slice(0, 10) : "";
  const timePart = values.datetime && values.datetime.length > 11 ? values.datetime.slice(11, 16) : "";
  const setDatePart = (iso) => set("datetime", timePart ? `${iso}T${timePart}` : iso);
  const setTimePart = (tm) => set("datetime", datePart ? `${datePart}T${tm}` : tm);

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = L('Please enter your full name','Veuillez entrer votre nom complet','请输入您的全名');
    if (!values.email.trim()) e.email = L('Please enter your email','Veuillez entrer votre email','请输入您的邮箱');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = L('Please enter a valid email','Email invalide','请输入有效邮箱');
    if (!values.phone.trim()) e.phone = L('Please enter your phone number','Veuillez entrer votre numéro','请输入您的电话号码');
    if (!datePart || !timePart) e.datetime = L('Please select date and time','Veuillez sélectionner la date et l\'heure','请选择日期和时间');
    if (!values.passengers) e.passengers = L('Please enter number of passengers','Veuillez entrer le nombre de passagers','请输入乘客人数');
    if (!values.pickup.trim()) e.pickup = L('Please enter pickup location','Veuillez entrer le lieu de prise en charge','请输入上车地点');
    if (!values.dropoff.trim()) e.dropoff = L('Please enter drop-off location','Veuillez entrer le lieu de dépose','请输入下车地点');
    if (!values.vehicle) e.vehicle = L('Please select vehicle type','Veuillez sélectionner le type de véhicule','请选择车辆类型');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      modernToast.error("📝 Please fill in all required fields correctly.");
      return;
    }
    if (!values.datetime) {
      modernToast.error("❌ Please select date and time for your transport.");
      return;
    }
    try {
      setIsLoading(true);
      const adds_on = Array.isArray(values.addons) ? values.addons.join(", ") : "";

      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        datetime: new Date(values.datetime).toISOString(),
        pickup: values.pickup,
        dropoff: values.dropoff,
        passengers: values.passengers,
        vehicle: values.vehicle,
        addons: adds_on,
        notes: values.notes || "",
      };

      await apiPost(
        "https://api.bonet.rw/bonetBackend/backend/public/tourTransports",
        payload
      );

      modernToast.success("🎉 Transport request submitted successfully!");
      setValues({
        name: "",
        email: "",
        phone: "",
        datetime: "",
        passengers: "",
        pickup: "",
        dropoff: "",
        vehicle: "",
        addons: [],
        notes: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      modernToast.error("❌ Failed to submit transport request.");
    } finally {
      setIsLoading(false);
    }
  };

  const vehicleOptions = [
    { value: "suv", label: L("SUV (1-6 passengers)","SUV (1-6 passagers)","SUV（1-6人）") },
    { value: "cruiser", label: L("4x4 Cruiser (1-6 passengers)","Cruiser 4x4 (1-6 passagers)","4x4越野车（1-6人）") },
    { value: "minivan", label: L("Minivan (7-12 passengers)","Minibus (7-12 passagers)","面包车（7-12人）") },
    { value: "bus", label: L("Tour Bus (13+ passengers)","Bus de visite (13+ passagers)","旅游巴士（13人以上）") },
    { value: "luxury_suv", label: L("Luxury SUV","SUV de luxe","豪华SUV") },
    { value: "executive_car", label: L("Executive Car","Voiture exécutive","行政轿车") },
  ];
  const addonOptions = [
    { value: "professional_driver", label: L("Professional Driver","Chauffeur professionnel","专业司机") },
    { value: "multilingual_driver", label: L("Multilingual Driver","Chauffeur multilingue","多语言司机") },
    { value: "water_wifi", label: L("Complimentary Water & WiFi","Eau et WiFi offerts","免费水和WiFi") },
    { value: "route_planning", label: L("Route Planning & Support","Planification d'itinéraire","路线规划与支持") },
    { value: "meet_greet", label: L("Meet & Greet Service","Service d'accueil","迎接服务") },
    { value: "luggage_assistance", label: L("Luggage Assistance","Assistance bagages","行李协助") },
    { value: "child_seats", label: L("Child Safety Seats","Sièges enfant","儿童安全座椅") },
    { value: "cooler_box", label: L("Cooler Box with Refreshments","Glacière avec rafraîchissements","带饮料的冷藏箱") },
  ];

  return (
    <div className="">
      <div className="">
        {/* Form Container */}
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {L("Tour Transport Request","Demande de transport touristique","旅游交通请求")}
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="mb-8">
              <SectionTitle icon={<User className="w-5 h-5" />}>
                {L("Personal Information","Informations personnelles","个人信息")}
              </SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label={L("Full Name","Nom complet","全名")} required error={errors.name}>
                  <TextInput
                    icon={<User className="w-4 h-4" />}
                    placeholder={L("Enter your full name","Entrez votre nom complet","输入您的全名")}
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                    error={errors.name}
                  />
                </Field>
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
            </div>

            {/* Transport Details */}
            <div className="mb-8">
              <SectionTitle icon={<Car className="w-5 h-5" />}>
                {L("Transport Details","Détails du transport","交通详情")}
              </SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label={L("Date & Time","Date et heure","日期与时间")} required error={errors.datetime}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <DatePicker
                      value={datePart || undefined}
                      onChange={setDatePart}
                      placeholder={L("Select date and time","Sélectionnez la date et l'heure","选择日期和时间")}
                      error={errors.datetime}
                    />
                    <TimePicker
                      value={timePart || undefined}
                      onChange={setTimePart}
                      placeholder={L("Select date and time","Sélectionnez la date et l'heure","选择日期和时间")}
                      error={errors.datetime}
                    />
                  </div>
                </Field>
                <Field label={L("Number of Passengers","Nombre de passagers","乘客人数")} required error={errors.passengers}>
                  <NumberInput
                    min={1}
                    max={50}
                    placeholder={L("Number of passengers","Nombre de passagers","乘客人数")}
                    value={values.passengers}
                    onChange={(e) => set("passengers", e.target.value)}
                    error={errors.passengers}
                  />
                </Field>
                <Field label={L("Pickup Location","Lieu de prise en charge","上车地点")} required error={errors.pickup}>
                  <TextInput
                    icon={<MapPin className="w-4 h-4" />}
                    placeholder={L("Enter pickup address or location","Entrez l'adresse de prise en charge","输入上车地址或位置")}
                    value={values.pickup}
                    onChange={(e) => set("pickup", e.target.value)}
                    error={errors.pickup}
                  />
                </Field>
                <Field label={L("Drop-off Location","Lieu de dépose","下车地点")} required error={errors.dropoff}>
                  <TextInput
                    icon={<MapPin className="w-4 h-4" />}
                    placeholder={L("Enter drop-off address or location","Entrez l'adresse de dépose","输入下车地址或位置")}
                    value={values.dropoff}
                    onChange={(e) => set("dropoff", e.target.value)}
                    error={errors.dropoff}
                  />
                </Field>
              </div>
            </div>

            {/* Vehicle & Services */}
            <div className="mb-8">
              <SectionTitle icon={<Lightbulb className="w-5 h-5" />}>
                {L("Vehicle & Services","Véhicule et services","车辆与服务")}
              </SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label={L("Vehicle Type","Type de véhicule","车辆类型")} required error={errors.vehicle}>
                  <Select
                    value={values.vehicle || undefined}
                    onChange={(v) => set("vehicle", v)}
                    options={vehicleOptions}
                    placeholder={L("Select vehicle type","Sélectionnez le type de véhicule","选择车辆类型")}
                    error={errors.vehicle}
                  />
                </Field>
                <Field label={L("Additional Services","Services supplémentaires","附加服务")}>
                  <Select
                    multiple
                    value={values.addons}
                    onChange={(v) => set("addons", v)}
                    options={addonOptions}
                    placeholder={L("Select additional services (optional)","Services supplémentaires (optionnel)","选择附加服务（可选）")}
                  />
                </Field>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <SectionTitle icon={<MapPin className="w-5 h-5" />}>
                {L("Additional Information","Informations complémentaires","附加信息")}
              </SectionTitle>
              <div className="grid grid-cols-1 gap-6">
                <Field label={L("Special Instructions","Instructions spéciales","特殊说明")}>
                  <TextArea
                    rows={4}
                    placeholder={L("Any special requirements, specific routes, waiting times, or additional information...","Exigences spéciales, itinéraires, temps d'attente ou informations supplémentaires...","任何特殊要求、特定路线、等待时间或附加信息...")}
                    value={values.notes}
                    onChange={(e) => set("notes", e.target.value)}
                  />
                </Field>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <SubmitButton loading={isLoading}>
                {isLoading ? L('Submitting Your Request...','Envoi en cours...','提交中...') : L('Submit Transport Request','Soumettre la demande de transport','提交交通请求')}
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransportForm;
