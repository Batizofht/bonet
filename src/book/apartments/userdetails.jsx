"use client";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Field,
  TextInput,
  Select,
  RadioGroup,
  SubmitButton,
} from '@/components/ui/inputs';
import BookingDetailsApartment from './bookingdetails';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  zipCode: "",
  country: undefined,
  countryCode: "+250",
  phone: "",
  bookingFor: "myself",
  otherPersonName: "",
};

const SmallFormApartments = () => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [bookingFor, setBookingFor] = useState("myself");
  const [showFinalDetails, setShowFinalDetails] = useState(false);

  const set = (k, v) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!values.firstName?.trim()) e.firstName = L("Required", "Requis", "必填");
    if (!values.lastName?.trim()) e.lastName = L("Required", "Requis", "必填");
    if (!values.email?.trim()) e.email = L("Required", "Requis", "必填");
    else if (!EMAIL_RE.test(values.email.trim())) e.email = L('Please enter a valid email', 'Veuillez entrer un email valide', '请输入有效的邮箱');
    if (!values.address?.trim()) e.address = L("Required", "Requis", "必填");
    if (!values.city?.trim()) e.city = L("Required", "Requis", "必填");
    if (!values.zipCode?.trim()) e.zipCode = L("Required", "Requis", "必填");
    if (!values.country) e.country = L("Required", "Requis", "必填");
    if (!values.phone?.trim()) e.phone = L("Required", "Requis", "必填");
    if (bookingFor === "someoneElse" && !values.otherPersonName?.trim()) e.otherPersonName = L('Please enter their name','Veuillez entrer leur nom','请输入其姓名');
    return e;
  };

  const handleNext = () => {
    const nextBookingFor = bookingFor;
    const merged = { ...values, bookingFor: nextBookingFor };
    setValues(merged);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setShowFinalDetails(true);
    }
  };

  if (showFinalDetails) {
    return <div className="mt-10"><BookingDetailsApartment /></div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-[440px] mx-auto border border-gray-200">
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          {L("Your Details","Vos coordonnées","您的信息")}
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="col-span-1">
            <Field error={errors.firstName}>
              <TextInput
                placeholder={L("First Name","Prénom","名字")}
                value={values.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                error={errors.firstName}
              />
            </Field>
          </div>
          <div className="col-span-1">
            <Field error={errors.lastName}>
              <TextInput
                placeholder={L("Last Name","Nom de famille","姓氏")}
                value={values.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                error={errors.lastName}
              />
            </Field>
          </div>
          <div className="col-span-2">
            <Field error={errors.email}>
              <TextInput
                placeholder={L("Email Address","Adresse e-mail","电子邮件地址")}
                type="email"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                error={errors.email}
              />
            </Field>
          </div>
        </div>

        <h2 className="text-base font-semibold text-gray-800 mb-3 mt-4">
          {L("Your Address","Votre adresse","您的地址")}
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="col-span-2">
            <Field error={errors.address}>
              <TextInput
                placeholder={L("Address","Adresse","地址")}
                value={values.address}
                onChange={(e) => set("address", e.target.value)}
                error={errors.address}
              />
            </Field>
          </div>
          <div className="col-span-1">
            <Field error={errors.city}>
              <TextInput
                placeholder={L("City","Ville","城市")}
                value={values.city}
                onChange={(e) => set("city", e.target.value)}
                error={errors.city}
              />
            </Field>
          </div>
          <div className="col-span-1">
            <Field error={errors.zipCode}>
              <TextInput
                placeholder={L("Zip Code","Code postal","邮政编码")}
                value={values.zipCode}
                onChange={(e) => set("zipCode", e.target.value)}
                error={errors.zipCode}
              />
            </Field>
          </div>
          <div className="col-span-2">
            <Field error={errors.country}>
              <Select
                placeholder={L("Country/Region","Pays/Région","国家/地区")}
                value={values.country}
                onChange={(v) => set("country", v)}
                error={errors.country}
                options={[
                  { value: "rwanda", label: "Rwanda" },
                  { value: "kenya", label: "Kenya" },
                  { value: "uganda", label: "Uganda" },
                ]}
              />
            </Field>
          </div>
          <div className="col-span-1">
            <Field>
              <Select
                value={values.countryCode}
                onChange={(v) => set("countryCode", v)}
                options={[
                  { value: "+250", label: "+250" },
                  { value: "+254", label: "+254" },
                  { value: "+256", label: "+256" },
                ]}
              />
            </Field>
          </div>
          <div className="col-span-1">
            <Field error={errors.phone}>
              <TextInput
                placeholder={L("Phone Number","Numéro de téléphone","电话号码")}
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                error={errors.phone}
              />
            </Field>
          </div>
        </div>

        <hr className="my-4 border-gray-200" />

        <h2 className="text-base font-semibold text-gray-800 mb-3">
          {L("Who are you booking for?","Pour qui effectuez-vous cette réservation ?","您是为谁预订？")}
        </h2>
        <Field>
          <RadioGroup
            value={bookingFor}
            onChange={(v) => { setBookingFor(v); set("bookingFor", v); }}
            options={[
              { value: "myself", label: L("Myself","Moi-même","我自己") },
              { value: "someoneElse", label: L("Someone Else","Quelqu'un d'autre","其他人") },
            ]}
          />
        </Field>

        {bookingFor === "someoneElse" && (
          <div className="mt-3">
            <Field
              label={L("Name for someone you are booking for:","Nom de la personne pour laquelle vous réservez :","您为其预订的人的姓名：")}
              error={errors.otherPersonName}
            >
              <TextInput
                placeholder={L("Enter their name","Entrez leur nom","输入其姓名")}
                value={values.otherPersonName}
                onChange={(e) => set("otherPersonName", e.target.value)}
                error={errors.otherPersonName}
              />
            </Field>
          </div>
        )}

        <div className="mt-2">
          <SubmitButton className="!min-h-[44px] !text-base !rounded-lg">
            {L("Next: Final Details","Suivant : Détails finaux","下一步：最终详情")}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default SmallFormApartments;
