import React, { useState } from "react";
import { Card, Select, Row, Col } from "antd";

const { Option, OptGroup } = Select;

const TransportFirst = () => {
  const [transportType, setTransportType] = useState(null);

  const businessOptions = (
    <>
      <OptGroup label="A. Executive Sedans – First-Class (VIP)">
        <Option value="Mercedes-Benz E-Class / S-Class">Mercedes-Benz E-Class / S-Class</Option>
        <Option value="BMW 5 Series / 7 Series">BMW 5 Series / 7 Series</Option>
        <Option value="Audi A6 / A8">Audi A6 / A8</Option>
        <Option value="Toyota Crown">Toyota Crown</Option>
      </OptGroup>
      <OptGroup label="B. Luxury SUVs – First-Class (VIP)">
        <Option value="Toyota Land Cruiser V8 / VX">Toyota Land Cruiser V8 / VX</Option>
        <Option value="Lexus LX570">Lexus LX570</Option>
        <Option value="Range Rover Vogue / Sport">Range Rover Vogue / Sport</Option>
        <Option value="BMW X5 / X7">BMW X5 / X7</Option>
        <Option value="Mercedes-Benz GLE / GLS">Mercedes-Benz GLE / GLS</Option>
      </OptGroup>
      <OptGroup label="C. Business-Class Sedans – Second-Class (Executive)">
        <Option value="Toyota Premio / Allion">Toyota Premio / Allion</Option>
        <Option value="Nissan Teana / Altima">Nissan Teana / Altima</Option>
        <Option value="Honda Accord">Honda Accord</Option>
        <Option value="Mazda 6">Mazda 6</Option>
      </OptGroup>
      <OptGroup label="D. Reliable SUVs – Second-Class (Business & NGO Use)">
        <Option value="Toyota RAV4">Toyota RAV4</Option>
        <Option value="Mitsubishi Outlander">Mitsubishi Outlander</Option>
        <Option value="Nissan X-Trail">Nissan X-Trail</Option>
        <Option value="Hyundai Santa Fe">Hyundai Santa Fe</Option>
      </OptGroup>
      <OptGroup label="E. Luxury Vans – VIP Group Transport">
        <Option value="Toyota Alphard / Vellfire">Toyota Alphard / Vellfire</Option>
        <Option value="Mercedes-Benz V-Class">Mercedes-Benz V-Class</Option>
      </OptGroup>
    </>
  );

  const touristOptions = (
    <>
      <OptGroup label="A. SUVs for Adventure Travel">
        <Option value="Toyota RAV4">Toyota RAV4</Option>
        <Option value="Nissan X-Trail">Nissan X-Trail</Option>
        <Option value="Mitsubishi Pajero / Outlander">Mitsubishi Pajero / Outlander</Option>
        <Option value="Hyundai Tucson">Hyundai Tucson</Option>
      </OptGroup>
      <OptGroup label="B. Tourist Minivans (7–14 Seaters)">
        <Option value="Toyota Noah / Voxy">Toyota Noah / Voxy</Option>
        <Option value="Honda StepWGN">Honda StepWGN</Option>
        <Option value="Nissan Serena">Nissan Serena</Option>
        <Option value="Toyota Hiace">Toyota Hiace (14-seater)</Option>
      </OptGroup>
      <OptGroup label="C. Tourist Buses (25–45+ Seaters)">
        <Option value="Toyota Coaster">Toyota Coaster (25–30 seats)</Option>
        <Option value="Full-size Coaches">Full-size Coaches (on request)</Option>
      </OptGroup>
      <OptGroup label="D. Tourist Add-ons & Support">
        <Option value="Experienced driver-guides">Experienced driver-guides</Option>
        <Option value="Multilingual staff">Multilingual staff (English, French, Kinyarwanda)</Option>
        <Option value="Bottled water and Wi-Fi">Bottled water and Wi-Fi</Option>
        <Option value="Travel support">Travel route support & itinerary suggestions</Option>
        <Option value="Meet & greet">Airport meet & greet</Option>
      </OptGroup>
    </>
  );

  return (
    <div className="mb-5">
      <Row gutter={24} className="mb-5">
        <Col span={24}>
          {/* <label className="block mb-1 font-medium">Transport Services</label> */}
          <Select placeholder="Select Transport Service" className="w-full">
            <Option value="Airport Transfers">Airport Transfers</Option>
            <Option value="Hotel to Airport Pickups">Hotel to Airport Pickups</Option>
            <Option value="Local Business Transport">Local Business Transport</Option>
            <Option value="City Tours & Excursions">City Tours & Excursions</Option>
            <Option value="Conference & Event Transport">Conference & Event Transport</Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          {/* <label className="block mb-1 font-medium">Transport Type</label> */}
          <Select
            placeholder="Select Transport Type"
            className="w-full"
            onChange={value => setTransportType(value)}
          >
            <Option value="Business & VIP Transport">Business & VIP Transport</Option>
            <Option value="Tourist Transport Services">Tourist Transport Services</Option>
          </Select>
        </Col>

        {transportType && (
          <Col span={12}>
            {/* <label className="block mb-1 font-medium">Vehicle Category</label> */}
            <Select placeholder="Select Vehicle" className="w-full" showSearch optionFilterProp="children">
              {transportType === "Business & VIP Transport" ? businessOptions : touristOptions}
            </Select>
          </Col>
        )}
      </Row>
      </div>    
  );
};

export default TransportFirst;
