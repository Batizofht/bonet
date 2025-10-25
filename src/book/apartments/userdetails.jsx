import React, { useState } from 'react';
import { Form, Input, Select, Radio, Button, Divider, Row, Col } from 'antd';
import BookingDetailsApartment from './bookingdetails';

const { Option } = Select;

const SmallFormApartments = () => {
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
        <h2 className="text-base font-semibold text-gray-800 mb-3">Your Details</h2>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item name="firstName" rules={[{ required: true }]} >
              <Input size="small" placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="lastName" rules={[{ required: true }]} >
              <Input size="small" placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="email" rules={[{ type: 'email', required: true }]}>
              <Input size="small" placeholder="Email Address" />
            </Form.Item>
          </Col>
        </Row>

        {/* <Divider /> */}

        <h2 className="text-base font-semibold text-gray-800 mb-3">Your Address</h2>
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item name="address" rules={[{ required: true }]}>
              <Input size="small" placeholder="Address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="city" rules={[{ required: true }]}>
              <Input size="small" placeholder="City" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="zipCode" rules={[{ required: true }]}>
              <Input size="small" placeholder="Zip Code" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="country" rules={[{ required: true }]}>
              <Select placeholder="Country/Region" size="small">
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
              <Input size="small" placeholder="Phone Number" />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <h2 className="text-base font-semibold text-gray-800 mb-3">Who are you booking for?</h2>
        <Form.Item name="bookingFor">
          <Radio.Group
            value={bookingFor}
            onChange={(e) => setBookingFor(e.target.value)}
          >
            <Radio value="myself" className="text-xs">Myself</Radio>
            <Radio value="someoneElse" className="text-xs">Someone Else</Radio>
          </Radio.Group>
        </Form.Item>

        {bookingFor === "someoneElse" && (
          <Form.Item
            name="otherPersonName"
            label={<span className="text-xs font-medium">Name for someone you are booking for:</span>}
            rules={[{ required: true, message: 'Please enter their name' }]}
          >
            <Input size="small" placeholder="Enter their name" />
          </Form.Item>
        )}

        <Button
          type="primary"
          block
          className="mt-2"
          onClick={handleNext}
        >
          Next: Final Details
        </Button>
      </Form>
    </div>
  );
};

export default SmallFormApartments;

