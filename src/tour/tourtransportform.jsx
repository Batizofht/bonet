import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col, Button } from 'antd';

const { Option } = Select;

const TransportForm = ({ onFinish }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-400">Tour Transport</h1>
      <p className="text-[16px] text-gray-700 mb-10">
        Please fill out this form to search for the best recommended transport.
      </p>
      <Form layout="vertical" className="p-4 bg-white border border-gray-300 rounded-xl shadow-md" onFinish={onFinish}>
        <Row gutter={24} className="p-5">
          <Col span={12}>
            <Form.Item label="Full Name" name="name">
              <Input placeholder="Enter your name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Date & Time" name="datetime">
              <DatePicker showTime className="w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Pickup Location" name="pickup">
              <Input placeholder="Where should we pick you?" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Drop-off Location" name="dropoff">
              <Input placeholder="Where should we drop you?" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Passengers" name="passengers">
              <Input min={1} placeholder="Number of passengers" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Vehicle Type" name="vehicle">
              <Select placeholder="Select vehicle" className="w-full">
                <Option value="sedan">Sedan</Option>
                <Option value="suv">SUV</Option>
                <Option value="van">Van</Option>
                <Option value="bus">Bus</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Extra Notes" name="notes">
              <Input.TextArea rows={3} placeholder="Any preferences or luggage details?" />
            </Form.Item>
          </Col>
        </Row>

        <Col span={24}>
          <div className="flex justify-center -mt-3 mb-5">
            <Button type="primary" htmlType="submit">
              Submit Tour Transport
            </Button>
          </div>
        </Col>
      </Form>
    </div>
  );
};

export default TransportForm;