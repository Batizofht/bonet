"use client";
import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { apiPost } from "@/lib/api";
import { modernToast } from "@/components/ui/toast";
import { useTranslation } from "react-i18next";
import {
  Field,
  TextInput,
  TextArea,
  NumberInput,
  Select,
  DateRangePicker,
  SubmitButton,
} from "@/components/ui/inputs";

const initialState = {
  full_name: "",
  email: "",
  phone: "",
  guests: "",
  purpose_of_stay: "",
  preferred_location: "",
  custom_location: "",
  location: "",
  date_range: [undefined, undefined],
  hotel_level: "",
  transport: "",
  budget_range: "",
  custom_budget: "",
  special_needs: "",
};

const AccommodationHotel = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const set = (k, v) => {
    setValues((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const handleBudgetChange = (value) => {
    setValues((p) => ({
      ...p,
      budget_range: value,
      custom_budget: value !== "custom" ? "" : p.custom_budget,
    }));
    setErrors((p) => ({ ...p, budget_range: undefined, custom_budget: undefined }));
  };

  const handleLocationChange = (value) => {
    setValues((p) => ({
      ...p,
      preferred_location: value,
      custom_location: value !== "other" ? "" : p.custom_location,
    }));
  };

  const validate = () => {
    const e = {};
    if (!values.full_name.trim()) e.full_name = t("form.fullName.required");
    if (!values.email.trim()) e.email = t("form.email.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      e.email = t("form.email.invalid");
    if (!values.phone.trim()) e.phone = t("form.phone.required");
    if (!String(values.guests).trim()) e.guests = t("form.guests.required");
    if (!values.date_range?.[0] || !values.date_range?.[1])
      e.date_range = t("form.errors.selectDates");
    if (values.budget_range === "custom") {
      if (!String(values.custom_budget).trim())
        e.custom_budget = t("form.customBudget.required");
      else if (!/^\d+$/.test(String(values.custom_budget).trim()))
        e.custom_budget = t("form.customBudget.onlyNumbers");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      if (!values.date_range?.[0] || !values.date_range?.[1])
        modernToast.error(t("form.errors.selectDates"));
      return;
    }
    setIsLoading(true);
    try {
      const [checkinDate, checkoutDate] = values.date_range;
      const payload = {
        full_name: values.full_name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        guests: values.guests,
        purpose_of_stay: values.purpose_of_stay,
        custom_location: values.custom_location || values.location,
        location: values.location,
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        hotel_level: values.hotel_level,
        transport: values.transport,
        budget_range: values.budget_range,
        custom_budget: values.custom_budget || null,
        special_needs: values.special_needs || "",
      };
      await apiPost(
        "https://api.bonet.rw/bonetBackend/backend/public/hotel-requests",
        payload
      );
      modernToast.success(t("form.success"));
      setValues(initialState);
      setErrors({});
    } catch (err) {
      console.error(err);
      modernToast.error(t("form.fail"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={t("form.fullName.label")} error={errors.full_name} required>
            <TextInput
              icon={<User className="w-4 h-4" />}
              placeholder={t("form.fullName.placeholder")}
              value={values.full_name}
              onChange={(e) => set("full_name", e.target.value)}
              error={errors.full_name}
            />
          </Field>
          <Field label={t("form.email.label")} error={errors.email} required>
            <TextInput
              icon={<Mail className="w-4 h-4" />}
              placeholder={t("form.email.placeholder")}
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              error={errors.email}
            />
          </Field>
          <Field label={t("form.phone.label")} error={errors.phone} required>
            <TextInput
              icon={<Phone className="w-4 h-4" />}
              placeholder={t("form.phone.placeholder")}
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              error={errors.phone}
            />
          </Field>
          <Field label={t("form.guests.label")} error={errors.guests} required>
            <NumberInput
              min={1}
              placeholder={t("form.guests.placeholder")}
              value={values.guests}
              onChange={(e) => set("guests", e.target.value)}
              error={errors.guests}
            />
          </Field>
        </div>

        {/* Stay Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Field label={t("form.purpose.label")}>
              <Select
                placeholder={t("form.purpose.placeholder")}
                value={values.purpose_of_stay || undefined}
                onChange={(v) => set("purpose_of_stay", v)}
                options={[
                  { value: "business", label: t("form.purpose.options.business") },
                  { value: "honeymoon", label: t("form.purpose.options.honeymoon") },
                  { value: "family", label: t("form.purpose.options.family") },
                  { value: "diplomatic", label: t("form.purpose.options.diplomatic") },
                  { value: "vip_event", label: t("form.purpose.options.vip_event") },
                ]}
              />
            </Field>
          </div>
          <div>
            <Field label={t("form.preferredLocation.label")}>
              <Select
                placeholder={t("form.preferredLocation.placeholder")}
                value={values.preferred_location || undefined}
                onChange={handleLocationChange}
                options={[
                  { value: "kcc", label: t("form.preferredLocation.options.kcc") },
                  { value: "embassy", label: t("form.preferredLocation.options.embassy") },
                  { value: "vision_city", label: t("form.preferredLocation.options.vision_city") },
                  { value: "musanze", label: t("form.preferredLocation.options.musanze") },
                  { value: "lake_kivu", label: t("form.preferredLocation.options.lake_kivu") },
                  { value: "other", label: t("form.preferredLocation.options.other") },
                ]}
              />
            </Field>
            {values.preferred_location === "other" && (
              <div className="mt-4">
                <TextInput
                  placeholder={t("form.customLocation.placeholder")}
                  value={values.custom_location}
                  onChange={(e) => set("custom_location", e.target.value)}
                />
              </div>
            )}
          </div>
          <Field label={t("form.location.label")}>
            <TextInput
              icon={<MapPin className="w-4 h-4" />}
              placeholder={t("form.location.placeholder")}
              value={values.location}
              onChange={(e) => set("location", e.target.value)}
            />
          </Field>
          <Field label={t("form.dates.label")} error={errors.date_range} required>
            <DateRangePicker
              value={values.date_range}
              onChange={(v) => set("date_range", v)}
              error={errors.date_range}
            />
          </Field>
        </div>

        {/* Budget & Hotel Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={t("form.hotelLevel.label")}>
            <Select
              placeholder={t("form.hotelLevel.placeholder")}
              value={values.hotel_level || undefined}
              onChange={(v) => set("hotel_level", v)}
              options={[
                { value: "premium", label: t("form.hotelLevel.options.premium") },
                { value: "4-star", label: t("form.hotelLevel.options.4star") },
                { value: "5-star", label: t("form.hotelLevel.options.5star") },
                { value: "luxury1", label: t("form.hotelLevel.options.luxury1") },
                { value: "luxury2", label: t("form.hotelLevel.options.luxury2") },
                { value: "private_villa", label: t("form.hotelLevel.options.private_villa") },
              ]}
            />
          </Field>
          <Field label={t("form.transport.label")}>
            <Select
              placeholder={t("form.transport.placeholder")}
              value={values.transport || undefined}
              onChange={(v) => set("transport", v)}
              options={[
                { value: "Executive Sedans – First-Class (VIP)", label: t("form.transport.options.sedan_vip") },
                { value: "Luxury SUVs – First-Class (VIP)", label: t("form.transport.options.suv_vip") },
                { value: "Business-Class Sedans – Second-Class (Executive)", label: t("form.transport.options.sedan_exec") },
                { value: "Reliable SUVs – Second-Class (Business & NGO Use)", label: t("form.transport.options.suv_exec") },
                { value: "Luxury Vans – VIP Group Transport", label: t("form.transport.options.van_vip") },
              ]}
            />
          </Field>
          <div>
            <Field label={t("form.budget.label")}>
              <Select
                placeholder={t("form.budget.placeholder")}
                value={values.budget_range || undefined}
                onChange={handleBudgetChange}
                options={[
                  { value: "150_200", label: t("form.budget.options.150_200") },
                  { value: "200_400", label: t("form.budget.options.200_400") },
                  { value: "400_plus", label: t("form.budget.options.400_plus") },
                  { value: "custom", label: t("form.budget.options.custom") },
                ]}
              />
            </Field>
            {values.budget_range === "custom" && (
              <div className="mt-4">
                <Field error={errors.custom_budget}>
                  <NumberInput
                    placeholder={t("form.customBudget.placeholder")}
                    value={values.custom_budget}
                    onChange={(e) => set("custom_budget", e.target.value)}
                    error={errors.custom_budget}
                  />
                </Field>
              </div>
            )}
          </div>
        </div>

        {/* Special Needs */}
        <Field label={t("form.specialNeeds.label")}>
          <TextArea
            rows={3}
            placeholder={t("form.specialNeeds.placeholder")}
            value={values.special_needs}
            onChange={(e) => set("special_needs", e.target.value)}
          />
        </Field>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <SubmitButton loading={isLoading}>{t("form.submit")}</SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default AccommodationHotel;
