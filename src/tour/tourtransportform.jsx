"use client";
import React from 'react';
import {
  Field,
  TextInput,
  TextArea,
  NumberInput,
  Select,
  DatePicker,
  TimePicker,
  SubmitButton,
} from "@/components/ui/inputs";
import { modernToast } from "@/components/ui/toast";

const TransportForm = ({ onFinish }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    name: "",
    datetime: "",
    pickup: "",
    dropoff: "",
    passengers: "",
    vehicle: "",
    notes: "",
  });
  const [errors, setErrors] = React.useState({});

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
    if (!values.name.trim()) e.name = "Please enter your full name";
    if (!datePart || !timePart) e.datetime = "Please select date and time";
    if (!values.pickup.trim()) e.pickup = "Please enter pickup location";
    if (!values.dropoff.trim()) e.dropoff = "Please enter drop-off location";
    if (!values.passengers) e.passengers = "Please enter number of passengers";
    if (!values.vehicle) e.vehicle = "Please select vehicle type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFinish = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      modernToast.error("📝 Please fill in all required fields correctly.");
      return;
    }
    setIsLoading(true);
    try {
      if (!values.datetime) {
        modernToast.error("❌ Please select date and time for your transport.");
        return;
      }
      await onFinish({ ...values, datetime: new Date(values.datetime).toISOString() });
      modernToast.success("🎉 Transport request submitted successfully!");
      setValues({
        name: "",
        datetime: "",
        pickup: "",
        dropoff: "",
        passengers: "",
        vehicle: "",
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
    { value: "sedan", label: "Sedan" },
    { value: "suv", label: "SUV" },
    { value: "van", label: "Van" },
    { value: "bus", label: "Bus" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#C9A84C]">Tour Transport</h1>
      <p className="text-[16px] text-gray-700 mb-10">
        Please fill out this form to search for the best recommended transport.
      </p>
      <form onSubmit={handleFinish} className="p-4 bg-white border border-gray-300 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
          <Field label="Full Name" required error={errors.name}>
            <TextInput
              placeholder="Enter your name"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              error={errors.name}
            />
          </Field>
          <Field label="Date & Time" required error={errors.datetime}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DatePicker
                value={datePart || undefined}
                onChange={setDatePart}
                placeholder="Select date"
                error={errors.datetime}
              />
              <TimePicker
                value={timePart || undefined}
                onChange={setTimePart}
                placeholder="Select time"
                error={errors.datetime}
              />
            </div>
          </Field>

          <Field label="Pickup Location" required error={errors.pickup}>
            <TextInput
              placeholder="Where should we pick you?"
              value={values.pickup}
              onChange={(e) => set("pickup", e.target.value)}
              error={errors.pickup}
            />
          </Field>
          <Field label="Drop-off Location" required error={errors.dropoff}>
            <TextInput
              placeholder="Where should we drop you?"
              value={values.dropoff}
              onChange={(e) => set("dropoff", e.target.value)}
              error={errors.dropoff}
            />
          </Field>

          <Field label="Passengers" required error={errors.passengers}>
            <NumberInput
              min={1}
              placeholder="Number of passengers"
              value={values.passengers}
              onChange={(e) => set("passengers", e.target.value)}
              error={errors.passengers}
            />
          </Field>
          <Field label="Vehicle Type" required error={errors.vehicle}>
            <Select
              placeholder="Select vehicle"
              value={values.vehicle || undefined}
              onChange={(v) => set("vehicle", v)}
              options={vehicleOptions}
              error={errors.vehicle}
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Extra Notes">
              <TextArea
                rows={3}
                placeholder="Any preferences or luggage details?"
                value={values.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
            </Field>
          </div>
        </div>

        <div className="flex justify-center -mt-3 mb-5">
          <SubmitButton loading={isLoading} className="w-auto px-6 min-h-[44px] text-base">
            Submit Tour Transport
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default TransportForm;
