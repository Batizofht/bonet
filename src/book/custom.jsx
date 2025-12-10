// import React, { useState, useEffect } from "react";
// import { Form, Input, Select, Row, Col, Button, Card, Spin } from "antd";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const { Option } = const CustomBooking = () => {
//   const [form] = Form.useForm();
//   const [ads, setAds] = useState([]);
//   const [loadingAds, setLoadingAds] = useState(true);

//   useEffect(() => {
//     const fetchAds = async () => {
//       try {
//         const res = await axios.get("https://api.bonet.rw/bonetBakend/backend/public/advertisements");
//         setAds(res.data.slice(0, 3));
//       } catch (err) {
//         console.error("Failed to fetch ads:", err);
//       } finally {
//         setLoadingAds(false);
//       }
//     };
//     fetchAds();
//   }, []);

//   const handleSubmit = async (values) => {
//     try {
//       const res = await axios.post("https://api.bonet.rw/bonetBakend/backend/public/customBooking", values);
//       //console.log(res);
//       toast.success("✅ Booking submitted successfully!");
//       form.resetFields();
//     } catch (err) {
//       toast.error("❌ Submission failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-6">
//       <ToastContainer /
//       {/* Form Section */}
//       <div className="flex-1">
//         <Card title="Custom Booking Form" className="shadow-md border border-gray-200">
//           <Form layout="vertical" form={form} onFinish={handleSubmit}>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="Username" name="username" rules={[{ required: true }]}>
//                   <Input placeholder="Enter your name" />
//                 </Form.Item>
//                 <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
//                   <Input placeholder="Enter your email" />
//                 </Form.Item>
//                 <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}>
//                   <Input placeholder="Enter your phone" />
//                 </Form.Item>
//               </Col>

//               <Col span={12}>
//                 <Form.Item label="Service Type" name="service" rules={[{ required: true }]}>
//                   <Select placeholder="Select service">
//                     <Option value="hotel">Hotel</Option>
//                     <Option value="apartment">Apartment</Option>
//                   </Select>
//                 </Form.Item>
//                 <Form.Item label="Hotel Level" name="level" rules={[{ required: true }]}>
//                   <Select placeholder="Select hotel level">
//                     <Option value={1}>1 Star</Option>
//                     <Option value={2}>2 Star</Option>
//                     <Option value={3}>3 Star</Option>
//                     <Option value={4}>4 Star</Option>
//                     <Option value={5}>5 Star</Option>
//                   </Select>
//                 </Form.Item>
//               </Col>

//               <Col span={24} className="text-center mt-4">
//                 <Button type="primary" htmlType="submit">Submit Booking</Button>
//               </Col>
//             </Row>
//           </Form>
//         </Card>
//       </div>

//       {/* Advertisement Section */}
//       <div className="w-full md:w-[320px]">
//         <Card title="Sponsored Ads" className="shadow-md border border-gray-200">
//           {loadingAds ? (
//             <div className="text-center py-6"><Spin /></div>
//           ) : ads.length > 0 ? (
//             ads.map((ad) => (
//               <div key={ad.id} className="mb-4 border-b pb-2">
//                 {ad.image && (
//                   <img
//                     src={`https://api.bonet.rw/bonetBakend/backend/public/${ad.image}`}
//                     alt={ad.title}
//                     className="w-full h-32 object-cover rounded mb-2"
//                   />
//                 )}
//                 <h4 className="font-semibold text-blue-500">{ad.adv_title}</h4>
//                 <p className="text-sm text-gray-700 line-clamp-3">{ad.subtitle}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No advertisements available.</p>
//           )}
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CustomBooking;
