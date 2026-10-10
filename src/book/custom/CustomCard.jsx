"use client";
import React, { useState } from "react";
import { User, Mail, Phone, MapPin } from "lucide-react";
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
  transport: "",
  purpose_of_stay: "",
  preferred_location: "",
  custom_location: "",
  location: "",
  date_range: [undefined, undefined],
  room_type: "",
  budget_range: "",
  custom_budget: "",
  special_needs: "",
};

const AccommodationForm = () => {
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
    if (!values.full_name.trim()) e.full_name = t("apartmentForm.fields.fullName");
    if (!values.email.trim()) e.email = t("apartmentForm.fields.email");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      e.email = t("apartmentForm.fields.email");
    if (!values.phone.trim()) e.phone = t("apartmentForm.fields.phone");
    if (!String(values.guests).trim()) e.guests = t("apartmentForm.fields.guests");
    if (!values.date_range?.[0] || !values.date_range?.[1])
      e.date_range = t("apartmentForm.fields.dates");
    if (!values.budget_range) e.budget_range = t("apartmentForm.fields.budget");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const [checkinDate, checkoutDate] = values.date_range || [];
      const payload = {
        full_name: values.full_name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        guests: values.guests,
        purpose_of_stay: values.purpose_of_stay,
        location: values.custom_location || values.location,
        transport: values.transport,
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        room_type: values.room_type,
        budget_range: values.budget_range,
        custom_budget: values.custom_budget || null,
        special_needs: values.special_needs || "",
      };
      await apiPost(
        "https://api.bonet.rw/bonetBackend/backend/public/apartment-requests",
        payload
      );
      modernToast.success("✅ Apartment request submitted!");
      setValues(initialState);
      setErrors({});
    } catch (err) {
      console.error(err);
      modernToast.error("❌ Failed to submit apartment request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl border relative w-full max-w-4xl p-10 rounded-2xl shadow-lg border-gray-200 overflow-hidden">
        <h2 className="text-3xl font-bold text-center text-[#C9A84C] mb-8">
          {t("apartmentForm.title")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label={t("apartmentForm.fields.fullName")} error={errors.full_name} required>
              <TextInput
                icon={<User className="w-4 h-4" />}
                placeholder={t("apartmentForm.placeholders.fullName")}
                value={values.full_name}
                onChange={(e) => set("full_name", e.target.value)}
                error={errors.full_name}
              />
            </Field>
            <Field label={t("apartmentForm.fields.email")} error={errors.email} required>
              <TextInput
                icon={<Mail className="w-4 h-4" />}
                placeholder={t("apartmentForm.placeholders.email")}
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                error={errors.email}
              />
            </Field>
            <Field label={t("apartmentForm.fields.phone")} error={errors.phone} required>
              <TextInput
                icon={<Phone className="w-4 h-4" />}
                placeholder={t("apartmentForm.placeholders.phone")}
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                error={errors.phone}
              />
            </Field>
            <Field label={t("apartmentForm.fields.guests")} error={errors.guests} required>
              <NumberInput
                min={1}
                placeholder={t("apartmentForm.placeholders.guests")}
                value={values.guests}
                onChange={(e) => set("guests", e.target.value)}
                error={errors.guests}
              />
            </Field>
          </div>

          {/* Transport & Purpose */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label={t("apartmentForm.fields.transport")}>
              <Select
                placeholder={t("apartmentForm.placeholders.transport")}
                value={values.transport || undefined}
                onChange={(v) => set("transport", v)}
                options={[
                  { value: "Executive Sedans – First-Class (VIP)", label: t("apartmentForm.options.transport.execSedan") },
                  { value: "Luxury SUVs – First-Class (VIP)", label: t("apartmentForm.options.transport.luxSUV") },
                  { value: "Business-Class Sedans – Second-Class (Executive)", label: t("apartmentForm.options.transport.bizSedan") },
                  { value: "Reliable SUVs – Second-Class (Business & NGO Use)", label: t("apartmentForm.options.transport.reliableSUV") },
                  { value: "Luxury Vans – VIP Group Transport", label: t("apartmentForm.options.transport.luxVan") },
                ]}
              />
            </Field>
            <Field label={t("apartmentForm.fields.purpose")}>
              <Select
                placeholder={t("form.purpose.placeholder")}
                value={values.purpose_of_stay || undefined}
                onChange={(v) => set("purpose_of_stay", v)}
                options={[
                  { value: "business", label: t("form.purpose.options.business") },
                  { value: "honeymoon", label: t("form.purpose.options.honeymoon") },
                  { value: "family", label: t("form.purpose.options.family") },
                  { value: "diplomatic", label: t("form.purpose.options.diplomatic") },
                  { value: "vip_longterm", label: t("form.purpose.options.vip_longterm") },
                  { value: "vip_event", label: t("form.purpose.options.vip_event") },
                ]}
              />
            </Field>
          </div>

          {/* Location & Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Field label={t("apartmentForm.fields.preferredLocation")}>
                <Select
                  placeholder={t("apartmentForm.placeholders.location")}
                  value={values.preferred_location || undefined}
                  onChange={handleLocationChange}
                  options={[
                    { value: "kcc", label: t("form.preferredLocation.options.kcc") },
                    { value: "embassy", label: t("form.preferredLocation.options.embassy") },
                    { value: "vision_city", label: t("form.preferredLocation.options.vision_city") },
                    { value: "lake_kivu", label: t("form.preferredLocation.options.lake_kivu") },
                    { value: "musanze", label: t("form.preferredLocation.options.musanze") },
                    { value: "akagera", label: t("form.preferredLocation.options.akagera") },
                    { value: "other", label: t("form.preferredLocation.options.other") },
                  ]}
                />
              </Field>
              {values.preferred_location === "other" && (
                <div className="mt-4">
                  <TextInput
                    placeholder={t("apartmentForm.placeholders.customLocation")}
                    value={values.custom_location}
                    onChange={(e) => set("custom_location", e.target.value)}
                  />
                </div>
              )}
            </div>
            <Field label={t("apartmentForm.fields.locationFull")}>
              <TextInput
                icon={<MapPin className="w-4 h-4" />}
                placeholder={t("apartmentForm.placeholders.locationFull")}
                value={values.location}
                onChange={(e) => set("location", e.target.value)}
              />
            </Field>
            <Field label={t("apartmentForm.fields.dates")} error={errors.date_range} required>
              <DateRangePicker
                value={values.date_range}
                onChange={(v) => set("date_range", v)}
                error={errors.date_range}
              />
            </Field>
          </div>

          {/* Room Type & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label={t("apartmentForm.fields.roomType")}>
              <Select
                placeholder={t("apartmentForm.placeholders.roomType")}
                value={values.room_type || undefined}
                onChange={(v) => set("room_type", v)}
                options={[
                  { value: "executiveRoom", label: t("apartmentForm.options.roomType.executiveRoom") },
                  { value: "deluxeRoom", label: t("apartmentForm.options.roomType.deluxeRoom") },
                  { value: "juniorSuite", label: t("apartmentForm.options.roomType.juniorSuite") },
                  { value: "presidentialSuite", label: t("apartmentForm.options.roomType.presidentialSuite") },
                  { value: "penthouseSuite", label: t("apartmentForm.options.roomType.penthouseSuite") },
                  { value: "luxury1bedroom", label: t("apartmentForm.options.roomType.luxury1bedroom") },
                  { value: "apartment2bedroom", label: t("apartmentForm.options.roomType.apartment2bedroom") },
                  { value: "apartment3bedroom", label: t("apartmentForm.options.roomType.apartment3bedroom") },
                  { value: "privateVilla", label: t("apartmentForm.options.roomType.privateVilla") },
                ]}
              />
            </Field>
            <div>
              <Field label={t("apartmentForm.fields.budget")} error={errors.budget_range} required>
                <Select
                  placeholder={t("apartmentForm.placeholders.budget")}
                  value={values.budget_range || undefined}
                  onChange={handleBudgetChange}
                  error={errors.budget_range}
                  options={[
                    { value: "150_200", label: t("apartmentForm.options.budget.range1") },
                    { value: "200_400", label: t("apartmentForm.options.budget.range2") },
                    { value: "400_plus", label: t("apartmentForm.options.budget.range3") },
                    { value: "custom", label: t("apartmentForm.options.budget.custom") },
                  ]}
                />
              </Field>
              {values.budget_range === "custom" && (
                <div className="mt-4">
                  <NumberInput
                    placeholder={t("apartmentForm.placeholders.customBudget")}
                    value={values.custom_budget}
                    onChange={(e) => set("custom_budget", e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Special Needs */}
          <Field label={t("apartmentForm.fields.specialNeeds")}>
            <TextArea
              rows={3}
              placeholder={t("apartmentForm.placeholders.specialNeeds")}
              value={values.special_needs}
              onChange={(e) => set("special_needs", e.target.value)}
            />
          </Field>

          {/* Submit */}
          <div className="text-center mt-6">
            <SubmitButton loading={isLoading} className="rounded-full px-12 w-auto">
              {t("apartmentForm.submit")}
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccommodationForm;
