'use client'
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import { 
  MessageCircle, 
  X, 
  Send, 
  Headphones
} from "lucide-react";

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
  const [messages, setMessages] = useState<{ from: string; text: string; }[]>([]);
  const [clientId, setClientId] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
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

  // Send message
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMsg = { from: "me", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const lang = i18n.language;
      const apiEndpoint = 
         `https://api.bonet.rw:8443/bonetBackend/backend/public/ai-reply`;

      const response = await axios.post(apiEndpoint, {
        message: input,
        clientId: clientId
      }, {
        timeout: 10000
      });

      const aiReply = response.data.reply || 
        (lang === "fr" 
          ? "Merci pour votre message! Comment puis-je vous aider aujourd'hui?" 
          : "Thank you for your message! How can I help you today?");

      setIsTyping(false);
      setMessages((prev) => [...prev, { from: "agent", text: aiReply }]);
  
    } catch (err) {
      console.error("API Error:", err);
      setIsTyping(false);
      const errorMsg = i18n.language === "fr" 
        ? "Désolé, je rencontre des difficultés techniques. Veuillez réessayer."
        : "Sorry, I'm experiencing technical difficulties. Please try again.";
      setMessages((prev) => [...prev, { from: "agent", text: errorMsg }]);
    }
  };

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
  }, [messages, isTyping, autoScroll]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }, [sendMessage]);

  return (
    <>
      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#C9A84C] hover:bg-[#B8973B] text-white rounded-full shadow-lg z-[40] transition-all duration-200 hover:shadow-xl flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {showChat && (
        <div
          className="fixed bg-white flex flex-col z-[99999] rounded-none md:rounded-2xl md:shadow-2xl md:border md:border-gray-200 overflow-hidden md:bottom-6 md:right-6 md:w-[400px] md:h-[640px] inset-0 md:inset-auto"
        >
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C9A84C] rounded-full flex items-center justify-center">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Bonet Support</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-xs text-gray-500">{i18n.language === "fr" ? "En ligne" : "Online"}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowChat(false)}
              className="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 px-5 py-4 overflow-y-auto bg-gray-50/50 space-y-4" onScroll={handleScroll}>
            <WelcomeMessageAI />
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                  m.from === "me" 
                    ? "bg-[#C9A84C] text-white rounded-2xl rounded-br-md" 
                    : "bg-white text-gray-800 rounded-2xl rounded-bl-md border border-gray-100"
                }`}>
                  {m.from === "agent" ? (
                    <span dangerouslySetInnerHTML={{ __html: m.text }} />
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="px-4 py-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-1.5 border border-gray-200 focus-within:border-[#C9A84C] focus-within:ring-1 focus-within:ring-[#C9A84C]/20 transition-colors">
              <input
                type="text"
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none py-1.5"
                placeholder={i18n.language === "fr" ? "Écrire un message..." : "Write a message..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={sendMessage}
                className="w-8 h-8 bg-[#C9A84C] hover:bg-[#B8973B] text-white rounded-full -mr-3 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-300 mt-2">Bonet Elite Services</p>
          </div>
        </div>
      )}
      
    </>
  );
};

export default ChatBot;