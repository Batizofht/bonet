'use client'
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Zap, 
  Crown,
  Shield,
  Brain,
  Users
} from "lucide-react";

import WelcomeMessage from "./mesa";
import WelcomeMessageAI from "./mesaai";

export function saveSecretKey(key: string) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  const data = {
    key,
    expiresAt: expiresAt.toISOString(),
  };

  localStorage.setItem("secretKey", JSON.stringify(data));
}

export function getSecretKey() {
  const data = localStorage.getItem("secretKey");
  if (!data) return null;

  try {
    const { key, expiresAt } = JSON.parse(data);
    const now = new Date();

    if (new Date(expiresAt) > now) {
      return key;
    } else {
      localStorage.removeItem("secretKey");
      return null;
    }
  } catch {
    localStorage.removeItem("secretKey");
    return null;
  }
}

const ChatBot = () => {
  const { t, i18n } = useTranslation();
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState("");
  const [inputtwo, setInputtwo] = useState("");
  const [isOnline, setUpdate] = useState("");
  const [messages, setMessages] = useState<{ from: string; text: string; }[]>([]);
  const [clientId, setClientId] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [liveChatSwitch, setLiveChatSwitch] = useState(false);
  const [userName, setUserName] = useState("");
  const [firstMessageSent, setFirstMessageSent] = useState("");
  const [backendMessages, setBackendMessages] = useState<{ sender_type: string; message: string; }[]>([]);
  const [secret, setSecret] = useState<string | null>(null);
  const [showPulseText, setShowPulseText] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Generate client ID
  useEffect(() => {
    let id = localStorage.getItem("livechat_client_id");
    if (!id) {
      const newId = uuidv4();
      localStorage.setItem("livechat_client_id", newId);
      id = newId;
    }
    setClientId(id);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Toggle pulsing text
  useEffect(() => {
    const interval = setInterval(() => setShowPulseText((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  // Send AI message
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMsg = { from: "me", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const lang = i18n.language;
      const apiEndpoint = lang === "fr" 
        ? `https://switchiify.com/bonetProject/backend/public/ai-replyFrench?clientId=${clientId}`
        : `https://switchiify.com/bonetProject/backend/public/ai-reply?clientId=${clientId}`;

      const response = await axios.post(apiEndpoint, {
        message: input,
      }, {
        timeout: 10000
      });

      const aiReply = response.data.reply || 
        (lang === "fr" 
          ? "Merci pour votre message! Comment puis-je vous aider aujourd'hui?" 
          : "Thank you for your message! How can I help you today?");

      setIsTyping(false);
      setMessages((prev) => [...prev, { from: "ai", text: aiReply }]);
    } catch (err) {
      console.error("API Error:", err);
      setIsTyping(false);
      const errorMsg = i18n.language === "fr" 
        ? "Désolé, je rencontre des difficultés techniques. Veuillez réessayer."
        : "Sorry, I'm experiencing technical difficulties. Please try again.";
      setMessages((prev) => [...prev, { from: "ai", text: errorMsg }]);
    }
  };

  // Status polling
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `https://switchiify.com/bonetProject/backend/public/List`
        );
        setUpdate(res.data.data[0].activeAdmin);
      } catch (error) {
        console.error("Error polling messages", error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Secret key management
  useEffect(() => {
    let existingKey = getSecretKey();
    if (!existingKey) {
      const newKey = Math.random().toString(36).substring(2, 15);
      saveSecretKey(newKey);
      existingKey = newKey;
    }
    setSecret(existingKey);
  }, []);

  // Send live chat message
  const sendMessageBackend = () => {
    const theDate = new Date();
    const formattedDate = theDate.toISOString().slice(0, 19).replace("T", " ");

    const dataForm = new FormData();
    dataForm.append("message", firstMessageSent);
    dataForm.append("session_id", secret || '');
    dataForm.append("sender_name", userName || "Anonymous");
    dataForm.append("sender_type", "customer");
    dataForm.append("file_name", "");
    dataForm.append("date", formattedDate);

    try {
      setFirstMessageSent("");
      axios.post("https://switchiify.com/bonetProject/backend/public/chats", dataForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).finally(() => {
        setIsTyping(false);
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
    }
  };

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://switchiify.com/bonetProject/backend/public/chats?session_id=${secret}`
        );
        setBackendMessages(response.data.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, [secret]);

  // Auto-scroll handling
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;
    setAutoScroll(scrollTop + clientHeight >= scrollHeight - 20);
  };

  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, backendMessages, isTyping, autoScroll]);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleNameSubmit = () => {
    if (inputtwo.trim()) {
      localStorage.setItem("userName", inputtwo.trim());
      setUserName(inputtwo.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      liveChatSwitch ? sendMessage() : sendMessageBackend();
    }
  };

 

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 flex items-center gap-3 bg-gradient-to-r from-[#188bff] to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-[9999] group"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          {isOnline && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          )}
        </div>
        
        <AnimatePresence>
          {showPulseText && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="whitespace-nowrap overflow-hidden font-semibold"
            >
              {t("liveChat.button") || "Chat with us"}
            </motion.span>
          )}
        </AnimatePresence>
        
        <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 md:inset-auto bg-white md:bottom-6 md:right-6 md:w-96 md:h-[600px] rounded-none md:rounded-2xl shadow-2xl flex flex-col z-[99999] border border-blue-100"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#188bff] to-cyan-500 text-white rounded-t-none md:rounded-t-2xl shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Bonet Assistant</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      <span>{isOnline ? (i18n.language === "fr" ? "En ligne" : "Online") : (i18n.language === "fr" ? "Hors ligne" : "Offline")}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowChat(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Type Switcher */}
              <div className="flex bg-white/20 rounded-xl p-1 backdrop-blur-sm">
                <button
                  onClick={() => setLiveChatSwitch(false)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                    !liveChatSwitch
                      ? 'bg-white text-[#188bff] shadow-sm'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  {i18n.language === "fr" ? "Support" : "Live"}
                </button>
                <button
                  onClick={() => setLiveChatSwitch(true)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                    liveChatSwitch
                      ? 'bg-white text-[#188bff] shadow-sm'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Brain className="w-4 h-4" />
                  {i18n.language === "fr" ? "IA" : "AI"}
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white space-y-3" onScroll={handleScroll}>
              {liveChatSwitch ? (
                <>
                  <WelcomeMessageAI />
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${m.from === "me" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        m.from === "me" ? "bg-[#188bff] text-white" : "bg-gray-200 text-gray-600"
                      }`}>
                        {m.from === "me" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                        m.from === "me" 
                          ? "bg-[#188bff] text-white rounded-br-none" 
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                      }`}>
                        {m.from === "ai" ? (
                          <span dangerouslySetInnerHTML={{ __html: m.text }} />
                        ) : (
                          m.text
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              ) : (
                <>
                  <WelcomeMessage />
                  {backendMessages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${m.sender_type === "customer" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        m.sender_type === "customer" ? "bg-[#188bff] text-white" : "bg-cyan-500 text-white"
                      }`}>
                        {m.sender_type === "customer" ? <User className="w-4 h-4" /> : <Crown className="w-4 h-4" />}
                      </div>
                      <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                        m.sender_type === "customer" 
                          ? "bg-[#188bff] text-white rounded-br-none" 
                          : "bg-cyan-500 text-white rounded-bl-none"
                      }`}>
                        {m.sender_type === "admin" ? (
                          <span dangerouslySetInnerHTML={{ __html: m.message }} />
                        ) : (
                          m.message
                        )}
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              {!liveChatSwitch && messages.length === 0 && !userName && (
                <div className="mb-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-800 mb-2 font-semibold">
                    {i18n.language === "fr" ? "👋 Commençons par votre nom" : "👋 Let's start with your name"}
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder={i18n.language === "fr" ? "Votre nom" : "Your name"}
                      value={inputtwo}
                      onChange={(e) => setInputtwo(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                    />
                    <button 
                      onClick={handleNameSubmit}
                      className="px-4 py-2 bg-[#188bff] text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                    >
                      {i18n.language === "fr" ? "Go" : "Go"}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder={t("Type your message...")}
                  value={liveChatSwitch ? input : firstMessageSent}
                  onChange={(e) => liveChatSwitch ? setInput(e.target.value) : setFirstMessageSent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={!liveChatSwitch && !userName}
                />
                <button
                  onClick={liveChatSwitch ? sendMessage : sendMessageBackend}
                  disabled={!liveChatSwitch && !userName}
                  className="px-4 py-3 bg-gradient-to-r from-[#188bff] to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">{t("Secure & Private")}</span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500">Powered by S.W.C.FY</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </>
  );
};

export default ChatBot;