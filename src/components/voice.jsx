import React, { useState, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import KnowledgeBase from "./knowledge";

const ElitePopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!firstMessageSent) {
      setMessages(["What can I help you with?"]);
    }
  }, [firstMessageSent]);

  // Fix: Define the handleContinue function
  const handleContinue = () => {
    setShowChat(true);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          <div className="absolute inset-0 bg-black opacity-70" onClick={() => setIsOpen(false)}></div>
          <div className="relative bg-white p-6 rounded-lg shadow-xl border-2 border-transparent w-90 h-96 flex flex-col">
            <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">&times;</button>
            <h2 className="text-lg font-bold bg-[#188bff] bg-clip-text text-transparent">Bonet Elite Service</h2>
            <p className="text-gray-700 mt-2">
              Our voice assistant allows you to chat with an agent seamlessly. You can get
              instant support, navigate services hands-free, and receive quick responses to
              your inquiries. Enjoy a smooth and efficient Elite experience at your fingertips.
            </p>
            <div className="flex items-center mt-4">
              <input type="checkbox" id="agree" className="w-5 h-5" checked={agreed} onChange={() => setAgreed(!agreed)} />
              <label htmlFor="agree" className="text-gray-700 ml-2">I agree to the terms</label>
            </div>
            <button onClick={handleContinue} disabled={!agreed} className={`mt-4 w-full px-4 py-2 rounded text-white shadow-md ${agreed ? "bg-[#188bff] hover:scale-105" : "bg-gray-400 cursor-not-allowed"}`}>
              Continue to Chat
            </button>
          </div>
        </div>
      )}

      {showChat && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="relative w-80 h-96 bg-[#ebdadc] shadow-lg rounded-lg border border-gray-200 flex flex-col">
            <div className="p-3 bg-[#188bff] text-white flex items-center justify-between rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="bg-white w-10 h-8 rounded-full">
                  <img src="../assets/images/logo.png" alt="Logo" className="w-9 h-8 rounded-full" />
                </div>
                <div>
                  <p className="text-sm">Chat with customer support</p>
                  <p className="font-bold">Bonet Elite Service Chatbot uuekjlajkd</p>
                </div>
              </div>
              <button onClick={() => setShowChat(false)} className="text-white text-2xl font-bold">&times;</button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto">
              {messages.length === 1 && !firstMessageSent ? (
                <div className="flex justify-center items-center h-full text-gray-500">
                  {messages[0]}
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`flex mb-2 ${msg.startsWith("You:") ? "justify-end" : "justify-start"}`}>
                    <div className={`text-sm p-2 rounded-lg max-w-[80%] w-auto ${msg.startsWith("You:") ? "bg-[#188bff] text-white" : "bg-gray-300 text-black"}`}>
                      {msg.replace("You: ", "")}
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex gap-1 mt-2">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                </div>
              )}
            </div>

            <div className="p-3 flex items-center justify-center bg-[#f3eaeb] border border-gray-400 shadow-md rounded-lg ml-4" style={{ width: '18pc', height: '50px', borderRadius: '20px' }}>
              <button className="bg-[#188bff] text-white p-3 rounded-full">
                <FaMicrophone size={20} />
              </button>
            </div>
            <h1 className="text-gray-500 text-center text-xs mb-1 mt-1">Voice-Enabled Customer Support Chatbot</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ElitePopup;
