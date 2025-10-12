'use client'
import React, { useState, useEffect ,useRef } from "react";
import { FaQuestionCircle, FaTelegramPlane } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

import WelcomeMessage from "./mesa";
import WelcomeMessageAI from "./mesaai";
import { XIcon } from "lucide-react";
import { usePathname } from "next/navigation";




export function saveSecretKey(key:string) {
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
      return key; // still valid
    } else {
      localStorage.removeItem("secretKey"); // expired
      return null;
    }
  } catch {
    localStorage.removeItem("secretKey"); // cleanup
    return null;
  }
}


const ChatBot = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [inputtwo, setInputtwo] = useState("");
  const [status, setUpdate] = useState("Offline");
  const [messages, setMessages] = useState<{ from: string; text: string; }[]>([]);
    const [autoScroll, setAutoScroll] = useState(true);

  const [clientId, setClientId] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [liveChatSwitch, setLiveChatSwitch] = useState(false);
  const [userName, setUserName] = useState("");
  const [input, setInput] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showPulseText, setShowPulseText] = useState(true);
  const [firstMessageSent, setFirstMessageSent] = useState("");
  const [loading, setLoading] = useState(false);
  const [backendMessages, setBackendMessages] = useState<{ sender_type: string; message: string; }[]>([]);
    const [isTypingLive, setIsTypingLive] = useState(false);
  const [secret, setSecret] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
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

    const { pathname }:any = usePathname();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // Toggle pulsing text
  useEffect(() => {
    const interval = setInterval(() => setShowPulseText((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  // Send message to backend
  // In your React component, fix the API call:

const sendMessage = async () => {
    if (input.trim() === "") return;
    
    setButtonClicked(buttonClicked)
    const userMsg = { from: "me", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
        const lang = i18n.language;
        
        const apiEndpoint = lang === "fr" 
            ? `https://switchiify.com/bonetProject/backend/public/ai-replyFrench?clientId=${clientId}`
            : `https://switchiify.com/bonetProject/backend/public/ai-reply?clientId=${clientId}`;

        console.log("Sending to:", apiEndpoint, "Language:", lang);
        
        const response = await axios.post(apiEndpoint, {
            
            message: input,
        }, {
            timeout: 10000 // 10 second timeout
        });
        
        console.log("AI response:", response.data);
        
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

  useEffect(() => {

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `https://switchiify.com/bonetProject/backend/public/List`
        );
        setUpdate(res.data.data[1].activeAdmin);
      } catch (error) {
        console.error("Error polling messages", error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);
 useEffect(() => {
    let existingKey = getSecretKey();
    if (!existingKey) {
      // Generate new key and save
      const newKey = Math.random().toString(36).substring(2, 15);
      saveSecretKey(newKey);
      existingKey = newKey;
    }

    setSecret(existingKey);
  }, []);


  const sendMessageBackend = () => {
// date  in this format 2025-07-24 15:27:35 
setButtonClicked(buttonClicked)
const theDate = new Date();
const formattedDate = theDate.toISOString().slice(0, 19).replace("T", " ");


    const dataForm = new FormData();
    dataForm.append("message", firstMessageSent);
    dataForm.append("session_id", secret || '');
    dataForm.append("sender_name",userName || "Anonymous");
    dataForm.append("sender_type", "customer");
    dataForm.append("file_name", "");
    dataForm.append("date", formattedDate);



    try {
    
      setFirstMessageSent("");

      axios.post("https://switchiify.com/bonetProject/backend/public/chats", dataForm, {
        headers: {
          "Content-Type": "multipart/form-data",
      }})
        .then((response) => {
          const data = response.data;
          
     
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsTypingLive(false);
        });
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTypingLive(false);
    }


  }

// get messages from backend per every one second
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
  // Scroll handling: only auto-scroll if user hasn’t scrolled up manually
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;
    setAutoScroll(scrollTop + clientHeight >= scrollHeight - 20);
  };

  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, backendMessages, isTyping, autoScroll, buttonClicked]);

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

  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === "Enter") {
      handleNameSubmit();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}

      {!showChat && <motion.button
        onClick={() => {
          setShowChat(true)
        }}
        className="fixed bottom-5 right-10 flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-5 py-3 rounded-full shadow-xl z-[99999] flex md:hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AiFillMessage className="w-6 h-6" />
        <AnimatePresence>
          {showPulseText && (
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
      </motion.button>}
     <motion.button
        onClick={() => {
          setShowChat(true)
        }}
        className="fixed bottom-5 right-10 flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-5 py-3 rounded-full shadow-xl z-[99999] hidden md:flex"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AiFillMessage className="w-6 h-6" />
        <AnimatePresence>
          {showPulseText && (
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

      {/* Chat Window */}
      {showChat && (
        <div className="fixed inset-0 md:inset-auto bg-white bottom-0 md:bottom-20   md:right-5 md:w-100 height-full md:h-[calc(100vh-20vh)] bg-white rounded-0 md:rounded-2xl shadow-2xl flex flex-col z-[9999]">

          <div className="p-4 bg-blue-600 text-white rounded-t-0 md:rounded-t-2xl shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3">
            <div className="bg-white w-10 h-10 rounded-full">

              <img src="./assets/images/logo.png" alt="" />

            </div>
            <div className="text-sm">
                
              <div>
                <p className="text-lg font-bold">
                {t("chatbot.bonetChatbotTitle") || "Bonet Chat"}
              </p>
            

              </div >
<div className="flex items-center justify-between gap-2 mr-[-30px]">
<p className="text-left">
  {status === "OFF"
    ? (i18n.language === "fr" ? "Hors ligne" : "Offline")
    : (i18n.language === "fr" ? "En ligne" : "Online")}
</p>  <div>
    <button
      className={`px-3 py-1 text-sm rounded-full shadow-md mr-2 ${
        liveChatSwitch
          ? "bg-blue-600 text-white"
          : "bg-white text-blue-600"
      }`}
      onClick={() => setLiveChatSwitch(false)}
    >
      {i18n.language === "fr"
        ? "Support en direct"
        : "Live support"}
   
    </button>
    <button
      className={`px-3 py-1 text-sm rounded-full shadow-md ${
        !liveChatSwitch
          ? "bg-blue-600 text-white"
          : "bg-white text-blue-600"
      }`}
      onClick={() => setLiveChatSwitch(true)}
    >
      {i18n.language === "fr"
        ? "Support IA"
        : "AI support"}
     
    </button>
  </div>
</div>

              
            </div>
            </div>

            {/* ❓ and ❌ Icons */}
            <div className="flex items-center gap-0  mb-5">
             
              <button
                onClick={() => setShowChat(false)}
                className="text-2xl bg-gray-200/20 font-bold hover:bg-gray-200/30  p-1 rounded-full"
              >
               <XIcon  className="w-4 h-4 "/>
              </button>
            </div>
          </div>

    

        {liveChatSwitch ? <>
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100 space-y-4 font-lato"  onScroll={handleScroll}>
            <WelcomeMessageAI />
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
                  <span dangerouslySetInnerHTML={{ __html: m.text }} />
                ) : (
                  m.text
                )}
                <div
                  className={`absolute top-0 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ${
                    m.from === "me"
                      ? ""
                      : ""
                  }`}
                />
                <div ref={messagesEndRef} />
              </div>
            ))}

            {isTyping && (
              <div className="w-fit max-w-[75%] px-4 py-2 text-sm rounded-2xl bg-white text-gray-800 border mr-auto">
                <span className="animate-pulse">
             {i18n.language === "fr" ? " Bonet Assistant est en train de taper..." : "Bonet Assistant is typing..."}

                </span>
              </div>
            )}
          </div>

          {/* Input Field */}
          <div className="p-3 bg-white border-t border-gray-300 flex items-center gap-2 rounded-b-1xl">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={t("chatbot.askPlaceholder") || "Type your message..."}
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
            <div className="flex items-center  px-4 pb-2 gap-2 rounded-b-2xl">
            <p className="text-gray-600 text-sm ">Powered By:</p>
               <img src="https://co.switchiify.com/logo/images.png" className="h-5 w-5 border-1 border-gray-300 rounded-full"/>
               
               <p className="text-gray-600 text-[15px] font-bold">SWCFY C.S</p>
          </div>
        </>:<>
          {/*Backend Chat Messages */}

  
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100 space-y-4 font-lato"  onScroll={handleScroll}>
     <WelcomeMessage />
            {backendMessages.map((m, i) => (
              <div
                key={i}
                className={`relative min-w-[2%] max-w-fit px-3 py-3 rounded-2xl shadow-md break-words text-sm ${
                  m.sender_type === "customer"
                    ? "ml-auto bg-blue-500 text-white rounded-br-none"
                    : "mr-auto bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {m.sender_type === "admin" ? (
                  <span dangerouslySetInnerHTML={{ __html: m.message }} />
                ) : (
                  m.message
                )}
                <div
                  className={`absolute top-0 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ${
                    m.sender_type === "customer"
                      ? ""
                      : ""
                  }`}
                />
                  <div ref={messagesEndRef} />
              </div>
            ))}

           
          </div>
          {messages.length === 0 && !userName && (
        <div className="p-3 bg-white border-t border-gray-300 bottom-0 flex items-center gap-2 rounded-b-1xl">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={ i18n.language === "fr" ? "Entrez votre nom" : "Enter your name"}
            value={inputtwo}
            onChange={(e) => setInputtwo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          <button onClick={handleNameSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm">
   
            {i18n.language === "fr" ? "Envoyer votre nom" : "Submit your name"}
          </button>
        </div>
      )}
          {/* Input Field */}
          <div className="p-3 bg-white border-t border-gray-300 flex items-center gap-2 rounded-b-1xl">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-900  rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={ i18n.language === "fr" ? "Envoyer un message" : "Send a message"}
              value={firstMessageSent}
              disabled={messages.length === 0 && !userName ? true : false}
              onChange={(e)=> setFirstMessageSent(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessageBackend()}
            />
            <button
             disabled={messages.length === 0 && !userName ? true : false}
              onClick={sendMessageBackend}
              className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full"
            >
              <FaTelegramPlane className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center  px-4 pb-2 gap-2 rounded-b-2xl">
            <p className="text-gray-600 text-sm ">Powered By:</p>
               <img src="https://co.switchiify.com/logo/images.png" className="h-5 w-5 border-1 border-gray-300 rounded-full"/>
               
               <p className="text-gray-600 text-[15px] font-bold">SWCFY C.S</p>
          </div>
       
        </>}
        </div>
      )}
    </>
  );
};

export default ChatBot;