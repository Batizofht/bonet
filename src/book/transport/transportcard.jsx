"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Car,
  Clock,
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

const TransportCard = ({ bookTransport }) => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    full_name: "",
    email: "",
    phone: "",
    transport_service: "",
    transport_type: "",
    car_type: "",
    seats: "",
    rent_time: "",
    number_of_days: "",
    pickup: "",
    dropoff_time: "",
    pickup_location: "",
    dropoff_location: "",
    addons: [],
    special_requests: "",
  });
  const [errors, setErrors] = useState({});

  const set = (name, val) => {
    setValues((v) => ({ ...v, [name]: val }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleTransportServiceChange = (value) => {
    if (value === "hotel_to_airport") {
      setValues((v) => ({
        ...v,
        transport_service: value,
        dropoff_location: "Kigali International Airport (KGL)",
        rent_time: "",
      }));
    } else {
      setValues((v) => ({
        ...v,
        transport_service: value,
        dropoff_location: "",
      }));
    }
    setErrors((e) => ({ ...e, transport_service: undefined, dropoff_location: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!values.full_name.trim()) e.full_name = L('Please enter your full name','Veuillez entrer votre nom complet','请输入您的全名');
    if (!values.email.trim()) e.email = L('Please enter your email','Veuillez entrer votre email','请输入您的邮箱');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = L('Please enter a valid email','Email invalide','请输入有效邮箱');
    if (!values.phone.trim()) e.phone = L('Please enter your phone number','Veuillez entrer votre numéro','请输入您的电话号码');
    if (!values.transport_service) e.transport_service = L('Please select service type','Veuillez sélectionner le type de service','请选择服务类型');
    if (!values.transport_type) e.transport_type = L('Please select transport type','Veuillez sélectionner le type de transport','请选择交通类型');
    if (!values.car_type) e.car_type = L('Please select vehicle type','Veuillez sélectionner le type de véhicule','请选择车辆类型');
    if (!values.seats) e.seats = L('Please enter number of passengers','Veuillez entrer le nombre de passagers','请输入乘客人数');
    if (!values.rent_time) e.rent_time = L('Please select rental duration','Veuillez sélectionner la durée de location','请选择租用时长');
    if (values.rent_time === "multiple_days" && !values.number_of_days) e.number_of_days = L('Please enter number of days','Veuillez entrer le nombre de jours','请输入天数');
    if (!values.pickup) e.pickup = L('Please select pickup date','Veuillez sélectionner la date de prise en charge','请选择上车日期');
    if (!values.dropoff_time) e.dropoff_time = L('Please select pickup time','Veuillez sélectionner l\'heure de prise en charge','请选择上车时间');
    if (!values.pickup_location.trim()) e.pickup_location = L('Please enter pickup location','Veuillez entrer le lieu de prise en charge','请输入上车地点');
    if (!values.dropoff_location.trim()) e.dropoff_location = L('Please enter drop-off location','Veuillez entrer le lieu de dépose','请输入下车地点');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      modernToast.error("📝 Please fill in all required fields correctly.");
      return;
    }
    if (!values.pickup || !values.dropoff_time) {
      modernToast.error("❌ Please select both pickup date and time.");
      return;
    }
    try {
      setIsLoading(true);
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
        pickup_date: values.pickup,
        pickup_time: values.dropoff_time.length === 5 ? `${values.dropoff_time}:00` : values.dropoff_time,
        addons: values.addons || [],
        special_requests: values.special_requests || "",
      };

      await apiPost(
        "https://api.bonet.rw/bonetBackend/backend/public/transportBooking",
        payload
      );

      modernToast.success("🎉 Transport request submitted successfully!");
      setValues({
        full_name: "",
        email: "",
        phone: "",
        transport_service: "",
        transport_type: "",
        car_type: "",
        seats: "",
        rent_time: "",
        number_of_days: "",
        pickup: "",
        dropoff_time: "",
        pickup_location: "",
        dropoff_location: "",
        addons: [],
        special_requests: "",
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      modernToast.error("❌ Failed to submit transport request.");
    } finally {
      setIsLoading(false);
    }
  };

  const serviceOptions = [
    { value: "airport_transfers", label: L("Airport Transfers","Transferts aéroport","机场接送") },
    { value: "hotel_to_airport", label: L("Hotel to Airport","Hôtel vers l'aéroport","酒店至机场") },
    { value: "local_business", label: L("Local Business Transport","Transport d'affaires local","本地商务交通") },
    { value: "city_tours", label: L("City Tours","Visites de ville","城市游览") },
    { value: "conference_event", label: L("Conference & Event Transport","Transport conférence et événement","会议活动交通") },
    { value: "intercity_travel", label: L("Intercity Travel","Voyage interurbain","城际旅行") },
  ];
  const transportTypeOptions = [
    { value: "business_vip", label: L("Business VIP Service","Service VIP Affaires","商务VIP服务") },
    { value: "executive", label: L("Executive Service","Service exécutif","行政服务") },
    { value: "standard", label: L("Standard Service","Service standard","标准服务") },
    { value: "group_transport", label: L("Group Transport","Transport de groupe","团队交通") },
  ];
  const carTypeOptions = [
    { value: "executive_sedan", label: L("Executive Sedan","Berline exécutive","行政轿车") },
    { value: "luxury_suv", label: L("Luxury SUV","SUV de luxe","豪华SUV") },
    { value: "business_sedan", label: L("Business Sedan","Berline d'affaires","商务轿车") },
    { value: "reliable_suv", label: L("Reliable SUV","SUV fiable","可靠SUV") },
    { value: "luxury_van", label: L("Luxury Van","Van de luxe","豪华面包车") },
    { value: "minibus", label: L("Minibus","Minibus","小型巴士") },
  ];
  const rentTimeOptions = [
    { value: "whole_day", label: L("Whole Day (8 hours)","Journée entière (8 heures)","全天（8小时）") },
    { value: "half_day", label: L("Half Day (4 hours)","Demi-journée (4 heures)","半天（4小时）") },
    { value: "per_trip", label: L("Per Trip","Par trajet","按次") },
    { value: "multiple_days", label: L("Multiple Days","Plusieurs jours","多天") },
  ];
  const addonOptions = [
    { value: "professional_driver", label: L("Professional Driver","Chauffeur professionnel","专业司机") },
    { value: "multilingual_driver", label: L("Multilingual Driver","Chauffeur multilingue","多语言司机") },
    { value: "water_wifi", label: L("Complimentary Water & WiFi","Eau et WiFi offerts","免费水和WiFi") },
    { value: "route_planning", label: L("Route Planning & Support","Planification d'itinéraire","路线规划与支持") },
    { value: "meet_greet", label: L("Meet & Greet Service","Service d'accueil","迎接服务") },
    { value: "child_seats", label: L("Child Safety Seats","Sièges enfant","儿童安全座椅") },
    { value: "luggage_assistance", label: L("Luggage Assistance","Assistance bagages","行李协助") },
  ];

  return (
    <div className="min-h-screen pb-8">
     <div className="mx-0 md:max-w-4xl md:mx-auto md:px-4 px-2">
        {/* Form Container */}
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="mb-8">
              <SectionTitle icon={<User className="w-5 h-5" />}>
                {L("Personal Information","Informations personnelles","个人信息")}
              </SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label={L("Full Name","Nom complet","全名")} required error={errors.full_name}>
                  <TextInput
                    icon={<User className="w-4 h-4" />}
                    placeholder={L("Enter your full name","Entrez votre nom complet","输入您的全名")}
                    value={values.full_name}
                    onChange={(e) => set("full_name", e.target.value)}
                    error={errors.full_name}
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

            {/* Transport Service */}
            <div className="mb-8">
              <SectionTitle icon={<Car className="w-5 h-5" />}>
                {L("Transport Service","Service de transport","交通服务")}
              </SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label={L("Service Type","Type de service","服务类型")} required error={errors.transport_service}>
                  <Select
                    value={values.transport_service || undefined}
                    onChange={handleTransportServiceChange}
                    options={serviceOptions}
                    placeholder={L("Select transport service","Sélectionnez le service de transport","选择交通服务")}
                    error={errors.transport_service}
                  />
                </Field>

                <Field label={L("Transport Type","Type de transport","交通类型")} required error={errors.transport_type}>
                  <Select
                    value={values.transport_type || undefined}
                    onChange={(v) => set("transport_type", v)}
                    options={transportTypeOptions}
                    placeholder={L("Select transport type","Sélectionnez le type de transport","选择交通类型")}
                    error={errors.transport_type}
                  />
                </Field>

                <Field label={L("Vehicle Type","Type de véhicule","车辆类型")} required error={errors.car_type}>
                  <Select
                    value={values.car_type || undefined}
                    onChange={(v) => set("car_type", v)}
                    options={carTypeOptions}
                    placeholder={L("Select vehicle type","Sélectionnez le type de véhicule","选择车辆类型")}
                    error={errors.car_type}
                  />
                </Field>

                <Field label={L("Number of Passengers","Nombre de passagers","乘客人数")} required error={errors.seats}>
                  <NumberInput
                    min={1}
                    max={50}
                    placeholder={L("Number of passengers","Nombre de passagers","乘客人数")}
                    value={values.seats}
                    onChange={(e) => set("seats", e.target.value)}
                    error={errors.seats}
                  />
                </Field>
              </div>
            </div>

            {/* Rental Details */}
            <div className="mb-8">
              <SectionTitle icon={<Clock className="w-5 h-5" />}>
                {L("Rental Details","Détails de la location","租车详情")}
              </SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label={L("Rental Duration","Durée de location","租用时长")} required error={errors.rent_time}>
                  <Select
                    value={values.rent_time || undefined}
                    onChange={(v) => set("rent_time", v)}
                    options={rentTimeOptions}
                    placeholder={L("Select rental duration","Sélectionnez la durée de location","选择租用时长")}
                    error={errors.rent_time}
                  />
                </Field>

                {values.rent_time === "multiple_days" && (
                  <Field label={L("Number of Days","Nombre de jours","天数")} required error={errors.number_of_days}>
                    <NumberInput
                      min={1}
                      max={30}
                      placeholder={L("Number of days","Nombre de jours","天数")}
                      value={values.number_of_days}
                      onChange={(e) => set("number_of_days", e.target.value)}
                      error={errors.number_of_days}
                    />
                  </Field>
                )}

                <Field label={L("Pickup Date","Date de prise en charge","上车日期")} required error={errors.pickup}>
                  <DatePicker
                    value={values.pickup || undefined}
                    onChange={(iso) => set("pickup", iso)}
                    placeholder={L("Select pickup date","Sélectionnez la date","选择上车日期")}
                    error={errors.pickup}
                  />
                </Field>

                <Field label={L("Pickup Time","Heure de prise en charge","上车时间")} required error={errors.dropoff_time}>
                  <TimePicker
                    value={values.dropoff_time || undefined}
                    onChange={(v) => set("dropoff_time", v)}
                    placeholder={L("Select pickup time","Sélectionnez l'heure","选择上车时间")}
                    error={errors.dropoff_time}
                  />
                </Field>
              </div>
            </div>

            {/* Locations */}
            <div className="mb-8">
              <SectionTitle icon={<MapPin className="w-5 h-5" />}>
                {L("Locations","Emplacements","地点")}
              </SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label={L("Pickup Location","Lieu de prise en charge","上车地点")} required error={errors.pickup_location}>
                  <TextInput
                    icon={<MapPin className="w-4 h-4" />}
                    placeholder="Enter pickup location"
                    value={values.pickup_location}
                    onChange={(e) => set("pickup_location", e.target.value)}
                    error={errors.pickup_location}
                  />
                </Field>

                <Field label={L("Drop-off Location","Lieu de dépose","下车地点")} required error={errors.dropoff_location}>
                  {values.transport_service === "hotel_to_airport" ? (
                    <TextInput
                      value="Kigali International Airport (KGL)"
                      disabled
                    />
                  ) : (
                    <TextInput
                      icon={<MapPin className="w-4 h-4" />}
                      placeholder="Enter drop-off location"
                      value={values.dropoff_location}
                      onChange={(e) => set("dropoff_location", e.target.value)}
                      error={errors.dropoff_location}
                    />
                  )}
                </Field>
              </div>
            </div>

            {/* Additional Services */}
            <div className="mb-8">
              <SectionTitle icon={<Lightbulb className="w-5 h-5" />}>
                {L("Additional Services","Services supplémentaires","附加服务")}
              </SectionTitle>
              <div className="grid grid-cols-1 gap-6">
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
                    placeholder={L("Any special requirements, specific routes, or additional information...","Exigences spéciales, itinéraires ou informations supplémentaires...","任何特殊要求、特定路线或附加信息...")}
                    value={values.special_requests}
                    onChange={(e) => set("special_requests", e.target.value)}
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

export default TransportCard;
