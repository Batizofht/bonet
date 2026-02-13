'use client'
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Sparkles, 
  Shield,
  Maximize2,
  Minimize2,
  ArrowUpRight,
  ArrowDownLeft,
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
  const [showPulseText, setShowPulseText] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  
  // Resize state
  const [chatSize, setChatSize] = useState({ width: 384, height: 600 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // OPTIMIZED: Memoize size presets to prevent recreation
  const sizePresets = useMemo(() => ({
    small: { width: 320, height: 480 },
    medium: { width: 384, height: 600 },
    large: { width: 480, height: 700 },
    maximized: { width: window.innerWidth * 0.9, height: window.innerHeight * 0.8 }
  }), []);

  // Handle resize start
  const handleResizeStart = (direction: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeDirection(direction);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!chatRef.current) return;
      
      const rect = chatRef.current.getBoundingClientRect();
      let newWidth = chatSize.width;
      let newHeight = chatSize.height;
      
      if (direction.includes('right')) {
        newWidth = Math.max(320, Math.min(800, e.clientX - rect.left));
      }
      if (direction.includes('left')) {
        newWidth = Math.max(320, Math.min(800, rect.right - e.clientX));
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(400, Math.min(900, e.clientY - rect.top));
      }
      if (direction.includes('top')) {
        newHeight = Math.max(400, Math.min(900, rect.bottom - e.clientY));
      }
      
      setChatSize({ width: newWidth, height: newHeight });
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection('');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Toggle maximize
  const toggleMaximize = () => {
    if (isMaximized) {
      setChatSize(sizePresets.medium);
      setIsMaximized(false);
    } else {
      setChatSize(sizePresets.maximized);
      setIsMaximized(true);
    }
  };

  // Set size preset
  const setSizePreset = (preset: keyof typeof sizePresets) => {
    if (preset === 'maximized') {
      setChatSize(sizePresets.maximized);
      setIsMaximized(true);
    } else {
      setChatSize(sizePresets[preset]);
      setIsMaximized(false);
    }
  };

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
      const apiEndpoint = 
         `https://api.bonet.rw:8443/bonetBackend/backend/public/ai-reply`;

      const response = await axios.post(apiEndpoint, {
        message: input,
        clientId: clientId
      }, {
        timeout: 10000
      });
    console.log("REPLY", response.data)
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

  // OPTIMIZED: Memoize key handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }, [sendMessage]);

  // OPTIMIZED: Memoize animation variants
  const buttonVariants = useMemo(() => ({
    initial: { scale: 0.9, opacity: 0, y: 20 },
    animate: { scale: 1, opacity: 1, y: 0 },
    whileHover: { scale: 1.05, y: -2 }
  }), []);

  const chatVariants = useMemo(() => ({
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 }
  }), []);

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
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
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
            ref={chatRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed bg-white shadow-2xl flex flex-col z-[99999] border border-blue-100 ${
              isMaximized 
                ? 'inset-4 rounded-2xl' 
                : 'inset-0 md:inset-auto md:bottom-6 md:right-6 rounded-none md:rounded-2xl'
            }`}
            style={{
              width: isMaximized ? 'auto' : window.innerWidth < 768 ? '100vw' : `${chatSize.width}px`,
              height: isMaximized ? 'auto' : window.innerWidth < 768 ? '100vh' : `${chatSize.height}px`
            }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#188bff] to-cyan-500 text-white rounded-t-none md:rounded-t-2xl shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
               
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis">Bonet Agent</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis">{i18n.language === "fr" ? "En ligne" : "Online"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Size Preset Buttons */}
                  {!isMaximized && (
                    <div className="flex gap-1 bg-white/20 rounded-lg p-1">
                      <button
                        onClick={() => setSizePreset('small')}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                          chatSize.width === 320 ? 'bg-white text-[#188bff]' : 'text-white/80 hover:text-white'
                        }`}
                        title="Small"
                      >
                        S
                      </button>
                      <button
                        onClick={() => setSizePreset('medium')}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                          chatSize.width === 384 ? 'bg-white text-[#188bff]' : 'text-white/80 hover:text-white'
                        }`}
                        title="Medium"
                      >
                        M
                      </button>
                      <button
                        onClick={() => setSizePreset('large')}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                          chatSize.width === 480 ? 'bg-white text-[#188bff]' : 'text-white/80 hover:text-white'
                        }`}
                        title="Large"
                      >
                        L
                      </button>
                    </div>
                  )}
                  
                  {/* Maximize/Minimize Button */}
                  <button
                    onClick={toggleMaximize}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    title={isMaximized ? "Minimize" : "Maximize"}
                  >
                    {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setShowChat(false)}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white space-y-3" onScroll={handleScroll}>
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
                    {m.from === "me" ? <User className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                    m.from === "me" 
                      ? "bg-[#188bff] text-white rounded-br-none" 
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                  }`}>
                    {m.from === "agent" ? (
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
                    <Headphones className="w-4 h-4 text-gray-600" />
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
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder={i18n.language === "fr" ? "Tapez votre message..." : "Type your message..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-3 bg-gradient-to-r from-[#188bff] to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-sm"
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

            {/* Resize Handles */}
            {!isMaximized && (
              <>
                {/* Top Edge */}
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 cursor-ns-resize hover:bg-white/30 rounded-full transition-colors"
                  onMouseDown={handleResizeStart('top')}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-4 h-0.5 bg-white/50 rounded-full"></div>
                  </div>
                </div>
                
                {/* Bottom Edge */}
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 cursor-ns-resize hover:bg-white/30 rounded-full transition-colors"
                  onMouseDown={handleResizeStart('bottom')}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-4 h-0.5 bg-white/50 rounded-full"></div>
                  </div>
                </div>
                
                {/* Left Edge */}
                <div
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 cursor-ew-resize hover:bg-white/30 rounded-full transition-colors"
                  onMouseDown={handleResizeStart('left')}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-0.5 h-4 bg-white/50 rounded-full"></div>
                  </div>
                </div>
                
                {/* Right Edge */}
                <div
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 cursor-ew-resize hover:bg-white/30 rounded-full transition-colors"
                  onMouseDown={handleResizeStart('right')}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-0.5 h-4 bg-white/50 rounded-full"></div>
                  </div>
                </div>
                
                {/* Top-Left Corner */}
                <div
                  className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize hover:bg-white/30 rounded-tl-lg transition-colors"
                  onMouseDown={handleResizeStart('top-left')}
                >
                  <ArrowUpRight className="w-3 h-3 text-white/50" />
                </div>
                
                {/* Top-Right Corner */}
                <div
                  className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize hover:bg-white/30 rounded-tr-lg transition-colors"
                  onMouseDown={handleResizeStart('top-right')}
                >
                  <ArrowDownLeft className="w-3 h-3 text-white/50 transform rotate-90" />
                </div>
                
                {/* Bottom-Left Corner */}
                <div
                  className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize hover:bg-white/30 rounded-bl-lg transition-colors"
                  onMouseDown={handleResizeStart('bottom-left')}
                >
                  <ArrowDownLeft className="w-3 h-3 text-white/50 transform -rotate-90" />
                </div>
                
                {/* Bottom-Right Corner */}
                <div
                  className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize hover:bg-white/30 rounded-br-lg transition-colors"
                  onMouseDown={handleResizeStart('bottom-right')}
                >
                  <ArrowUpRight className="w-3 h-3 text-white/50 transform rotate-180" />
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
    </>
  );
};

export default ChatBot;