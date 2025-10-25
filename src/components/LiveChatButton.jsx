import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillMessage } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const LiveChatButton = () => {
  const { t } = useTranslation();
  const [showText, setShowText] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [firstMessageSent, setFirstMessageSent] = useState("");

  useEffect(() => {
    let id = localStorage.getItem("livechat_client_id");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("livechat_client_id", id);
    }
    setClientId(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setShowText((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMsg = { from: "me", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(
        "https://switchiify.com/bonetProject/backend/public/ai-reply",
        {
          clientId,
          message: input,
        }
      );

      const aiReply = response.data.reply || "Thank you! We'll reply shortly.";

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { from: "ai", text: aiReply }]);
      }, 3500);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Error contacting AI server." },
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[3.25rem] right-10 flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-5 py-3 rounded-full shadow-xl overflow-hidden z-[9999]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AiFillMessage className="w-6 h-6" />
        <AnimatePresence>
          {showText && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="whitespace-nowrap overflow-hidden font-bold"
            >
              {t("liveChat.button") || "Chat with us"}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Intro Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          <div
            className="absolute inset-0 bg-black opacity-60"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="relative bg-white p-6 rounded-lg shadow-2xl w-96 flex flex-col">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
            <h2 className="text-lg font-bold text-blue-600">Bonet Elite Service</h2>
            <p className="mt-2 text-gray-700">
              
            </p>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="agree"
                onChange={(e) => {
                  if (e.target.checked) {
                    setIsOpen(false);
                    setShowChat(true);
                  }
                }}
                className="w-5 h-5"
              />
              <label htmlFor="agree" className="ml-2 text-gray-700 text-sm">
                I agree to the terms
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-5 right-5 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-[9999]">
          {/* Header */}
          <div className="p-4 bg-blue-600 text-white rounded-t-2xl shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">AI Assistant</p>
              <p className="text-lg font-bold">Bonet Chat</p>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-2xl font-bold hover:text-red-300"
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100 space-y-4 font-lato">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`w-fit max-w-[75%] px-4 py-2 text-sm rounded-2xl relative break-words font-lato ${
                  m.from === "me"
                    ? "ml-auto bg-blue-500 text-white rounded-br-none"
                    : "mr-auto bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {m.from === "ai" ? (
                  <span
                    className="[&>a]:text-blue-600 [&>a]:underline"
                    dangerouslySetInnerHTML={{ __html: m.text }}
                  />
                ) : (
                  m.text
                )}
                <div
                  className={`absolute top-0 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ${
                    m.from === "me"
                      ? ""
                      : "left-[-10px] border-r-[10px] border-r-white"
                  }`}
                />
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="w-fit max-w-[75%] px-4 py-2 text-sm rounded-2xl relative break-words font-lato mr-auto bg-white text-gray-800 border rounded-bl-none">
                <div className="flex items-center gap-2">
                  <span className="animate-pulse text-black">
                    Bonet Assistant is typing...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-300 flex items-center gap-2 rounded-b-1xl">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full"
            >
              <FaTelegramPlane className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChatButton;
