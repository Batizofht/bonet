import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Select, Radio, Divider, Row, Col } from 'antd';
import BookingDetailsApartment from './bookingdetails';

const { Option } = Select;

const SmallFormApartments = () => {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
  const [form] = Form.useForm();
  const [bookingFor, setBookingFor] = useState("myself");
  const [showFinalDetails, setShowFinalDetails] = useState(false);

  const handleNext = () => {
    form.validateFields().then(() => {
      setShowFinalDetails(true);
    }).catch(() => {});
  };

  if (showFinalDetails) {
    return <div className="mt-10"><BookingDetailsApartment /></div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-[440px] mx-auto border border-gray-200">
      <Form form={form} layout="vertical">
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          {L("Your Details","Vos coordonnées","您的信息")}
        </h2>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item name="firstName" rules={[{ required: true }]}>
              <Input size="small" placeholder={L("First Name","Prénom","名字")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="lastName" rules={[{ required: true }]}>
              <Input size="small" placeholder={L("Last Name","Nom de famille","姓氏")} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="email" rules={[{ type: 'email', required: true }]}>
              <Input size="small" placeholder={L("Email Address","Adresse e-mail","电子邮件地址")} />
            </Form.Item>
          </Col>
        </Row>

        <h2 className="text-base font-semibold text-gray-800 mb-3">
          {L("Your Address","Votre adresse","您的地址")}
        </h2>
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item name="address" rules={[{ required: true }]}>
              <Input size="small" placeholder={L("Address","Adresse","地址")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="city" rules={[{ required: true }]}>
              <Input size="small" placeholder={L("City","Ville","城市")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="zipCode" rules={[{ required: true }]}>
              <Input size="small" placeholder={L("Zip Code","Code postal","邮政编码")} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="country" rules={[{ required: true }]}>
              <Select placeholder={L("Country/Region","Pays/Région","国家/地区")} size="small">
                <Option value="rwanda">Rwanda</Option>
                <Option value="kenya">Kenya</Option>
                <Option value="uganda">Uganda</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="countryCode" initialValue="+250">
              <Select size="small">
                <Option value="+250">+250</Option>
                <Option value="+254">+254</Option>
                <Option value="+256">+256</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item name="phone" rules={[{ required: true }]}>
              <Input size="small" placeholder={L("Phone Number","Numéro de téléphone","电话号码")} />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <h2 className="text-base font-semibold text-gray-800 mb-3">
          {L("Who are you booking for?","Pour qui effectuez-vous cette réservation ?","您是为谁预订？")}
        </h2>
        <Form.Item name="bookingFor">
          <Radio.Group
            value={bookingFor}
            onChange={(e) => setBookingFor(e.target.value)}
          >
            <Radio value="myself" className="text-xs">{L("Myself","Moi-même","我自己")}</Radio>
            <Radio value="someoneElse" className="text-xs">{L("Someone Else","Quelqu'un d'autre","其他人")}</Radio>
          </Radio.Group>
        </Form.Item>

        {bookingFor === "someoneElse" && (
          <Form.Item
            name="otherPersonName"
            label={<span className="text-xs font-medium">{L("Name for someone you are booking for:","Nom de la personne pour laquelle vous réservez :","您为其预订的人的姓名：")}</span>}
            rules={[{ required: true, message: L('Please enter their name','Veuillez entrer leur nom','请输入其姓名') }]}
          >
            <Input size="small" placeholder={L("Enter their name","Entrez leur nom","输入其姓名")} />
          </Form.Item>
        )}

        <button
          onClick={handleNext}
          className="mt-2 w-full bg-[#C9A84C] hover:bg-[#B8973B] text-white font-semibold py-2 rounded-lg transition-colors duration-200 border-0"
        >
          {L("Next: Final Details","Suivant : Détails finaux","下一步：最终详情")}
        </button>
      </Form>
    </div>
  );
};

export default SmallFormApartments;
