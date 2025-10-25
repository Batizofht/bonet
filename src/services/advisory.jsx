import { useState } from "react";
import { Briefcase, BarChart, ShieldCheck, Users, Globe, DollarSign, X } from "lucide-react";

const AdvisoryServices = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const services = [
    { name: "Financial Advisory", icon: <DollarSign />, description: "Optimize your financial strategy and investments." },
    { name: "Management Advisory", icon: <Briefcase />, description: "Enhance operations and leadership effectiveness." },
    { name: "Technology Advisory", icon: <Globe />, description: "Leverage tech solutions and digital transformation." },
    { name: "Risk & Compliance", icon: <ShieldCheck />, description: "Mitigate risks and ensure regulatory compliance." },
    { name: "HR & Workforce", icon: <Users />, description: "Improve hiring, retention, and company culture." },
    { name: "Strategy & Growth", icon: <BarChart />, description: "Plan long-term success and market expansion." },
  ];

  const handleSubmit = () => {
    if (!name || !email || !selectedService) {
      alert("Please fill in all fields.");
      return;
    }
    alert(`Request Submitted for ${selectedService}! We'll contact you soon.`);
    setShowModal(false);
  };

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in your ${selectedService || "Advisory"} services. Can we discuss?`;
    const whatsappUrl = `https://wa.me/250726300260?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-white shadow-lg mt-10 rounded-2xl p-6  mx-auto">
      <h2 className="text-3xl font-bold bg-[#188bff] bg-clip-text text-transparent mb-4">Business Advisory Services</h2>
      <p className="text-gray-600 mb-6">Get expert guidance to grow, optimize, and secure your business.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="text-[#57007B] text-2xl">{service.icon}</div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{service.name}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#188bff] text-white cursor-pointer px-6 py-2 rounded-full shadow-lg">
          Get Advisory
        </button>
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70  flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg mt-20 shadow-lg w-96 relative">
            <button className="absolute top-3 right-3 text-gray-500" onClick={() => setShowModal(false)}>
              <X />
            </button>
            <h3 className="text-xl font-bold mt-1 bg-[#188bff] bg-clip-text text-transparent font-semibold mb-2">Book an Advisory Session</h3>
            <p className="text-gray-700 text-sm mb-4">Enter your details, and we will contact you.</p>
            
            <select 
              className="border border-gray-400 p-2 w-full text-gray-600 rounded mb-3"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">Select Advisory Service</option>
              {services.map((service, index) => (
                <option key={index} value={service.name}>{service.name}</option>
              ))}
            </select>

            <input 
              type="text" 
              placeholder="Your Name" 
              className="border border-gray-400 p-2 placeholder-gray-700 w-full rounded mb-3"
              
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="border border-gray-400 p-2 placeholder-gray-700 p-2 w-full rounded mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea 
              placeholder="Message (Optional)" 
              className="border border-gray-400 p-2 placeholder-gray-700 p-2 w-full rounded mb-3">
            </textarea>

            <button 
              className="w-full bg-[#188bff] text-white py-2 rounded shadow-md mb-3"
              onClick={handleSubmit}>
              Submit Request
            </button>

            <button 
              className="w-full bg-green-500 text-white py-2 rounded shadow-md flex items-center justify-center gap-2"
              onClick={handleWhatsApp}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
              Contact on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvisoryServices;
