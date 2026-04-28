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

  import { modernToast } from "@/components/ModernToast";

  const handleSubmit = () => {
    if (!name || !email || !selectedService) {
      modernToast.error("Please fill in all fields.");
      return;
    }
    modernToast.success(`Request Submitted for ${selectedService}! We'll contact you soon.`);
    setShowModal(false);
  };

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in your ${selectedService || "Advisory"} services. Can we discuss?`;
    const whatsappUrl = `https://wa.me/250726300260?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-white shadow-lg mt-10 rounded-2xl p-6  mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Business <span className="text-[#C9A84C]">Advisory</span> Services</h2>
      <p className="text-gray-600 mb-6">Get expert guidance to grow, optimize, and secure your business.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="text-[#C9A84C] text-2xl">{service.icon}</div>
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
          className="bg-[#C9A84C] hover:bg-[#B8973B] text-white cursor-pointer px-8 py-3 rounded-xl font-semibold transition-colors">
          Get Advisory
        </button>
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 border border-gray-200 my-auto max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <div>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#C9A84C] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Book an Advisory Session
                </h3>
                <p className="text-gray-500">
                  Enter your details, and we will contact you.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Service Type
                  </label>
                  <select
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-gray-700 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 outline-none transition-all min-h-[52px]"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Select Advisory Service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service.name}>{service.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 outline-none transition-all min-h-[52px]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 outline-none transition-all min-h-[52px]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Message
                  </label>
                  <textarea
                    placeholder="Message (Optional)"
                    rows={4}
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl placeholder-gray-400 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-6 py-3 rounded-xl bg-[#C9A84C] text-white font-semibold hover:bg-[#B8973B] transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvisoryServices;
