import axios from "axios";
import React, { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";

const ChatAi = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstMessageSent, setFirstMessageSent] = useState(false);

  const handleContinue = () => {
    setIsOpen(false);
    setShowChat(true);
  };

  const sendMessage = async () => {
    if (!input.trim()) return; // Prevent sending empty messages
    
    setFirstMessageSent(true); // Hide placeholder permanently after first message

    const userMessage = `You: ${input}`;
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.deepai.org/api/text-generator",
        { text: input },
        {
          headers: { "api-key": process.env.REACT_APP_DEEPAI_API_KEY },
        }
      );

      const botResponse = response.data?.output || "Sorry, I didn't understand that.";
      setMessages((prevMessages) => [...prevMessages, `Bot: ${botResponse}`]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        `Bot: Something went wrong. Please try again later.`
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          <div className="absolute inset-0 bg-black opacity-70" onClick={() => setIsOpen(false)}></div>
          <div className="relative bg-white p-6 rounded-lg shadow-xl border-2 border-transparent bg-clip-border w-90 h-96 flex flex-col">
            <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl cursor-pointer">
              &times;
            </button>
            <h2 className="text-lg font-bold bg-[#188bff] bg-clip-text text-transparent text-center">
              Bonet Elite Service
            </h2>
            <p className="text-gray-700 mt-2 text-center">
            You are about to interact with an AI chatbot designed for 
            Bonet Elite Service. This chatbot is here to assist you
             with anything you need, including inquiries related to Bonet
              Elite Service as well as general topics
            </p>
            <div className="flex items-center mt-4">
              <input type="checkbox" id="agree" className="w-5 h-5" checked={agreed} onChange={() => setAgreed(!agreed)} />
              <label htmlFor="agree" className="text-gray-700 ml-2">I agree to the terms</label>
            </div>
            <button
              onClick={handleContinue}
              disabled={!agreed}
              className={`mt-4 w-full px-4 py-2 rounded text-white shadow-md ${
                agreed ? "bg-[#188bff] hover:scale-105" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Continue to Chat
            </button>
            <button onClick={() => setIsOpen(false)} className="mt-2 text-sm text-gray-500 hover:text-gray-700">
              Cancel
            </button>
          </div>
        </div>
      )}

{showChat && (
  <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
    <div className="absolute inset-0 bg-black opacity-70"></div>
    <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl h-[90vh] max-h-[600px] bg-[#ebdadc] shadow-lg rounded-lg border border-gray-200 flex flex-col">
      
      {/* Chat Header */}
      <div className="p-3 bg-[#188bff] text-white flex items-center justify-between rounded-t-lg">
        <div className="bg-white w-10 h-8 rounded-full">
          <img src="/assets/images/logo.png" alt="Logo" className="w-9 h-8 rounded-full" />
        </div>
        <div className="flex items-center gap-2 w-full justify-center">
          <div className="text-center">
            <p className="text-sm">Chat With</p>
            <p className="font-bold">Bonet Elite Service Agent</p>
          </div>
        </div>
        <button onClick={() => setShowChat(false)} className="text-white text-2xl font-bold cursor-pointer">
          &times;
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-3 overflow-y-auto bg-cover bg-center">
        {!firstMessageSent && (
          <div className="text-center text-gray-500 text-lg sm:text-2xl mt-20">
            What can I help you with? 
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className="flex mb-2">
            {!msg.startsWith("You:") ? (
              <div className="flex items-center gap-2 max-w-[80%] bg-gray-300 text-black rounded-lg p-2 mr-auto text-left">
                <img src="/assets/images/logo.png" alt="Bot" className="w-8 h-8 rounded-full" />
                <span>{msg}</span>
              </div>
            ) : (
              <div className="text-sm p-2 rounded-lg max-w-[80%] bg-[#188bff] text-white self-end ml-auto text-left">
                {msg.replace("You: ", "")}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-1 mt-2">
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="mt-2 p-3 flex items-center gap-3 bg-[#f3eaeb] mx-3 border border-gray-400 shadow-md rounded-full">
        <input
          type="text"
          placeholder={firstMessageSent ? "" : "Ask anything"}
          className="flex-1 px-3 py-2 rounded-full text-gray-700 focus:outline-none placeholder-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-[#188bff] text-white p-2 rounded-full">
          <FaTelegramPlane />
        </button>
      </div>
      
      {/* Footer Text */}
      <div className="text-center py-2">
        <h1 className="text-gray-500 text-xs sm:text-sm font-sans">Bonet Elite Service Agent Chatbot</h1>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default ChatAi;
