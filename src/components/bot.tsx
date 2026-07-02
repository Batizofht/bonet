'use client'
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, Calendar, CheckCircle2, ChevronRight, MessageSquare } from "lucide-react";
import WelcomeMessageAI from "./mesaai";

const BONET_WA = "250726300260";
type Tab = "chat" | "book";
interface Msg { from: "me" | "agent"; text: string; }

export function saveSecretKey(key: string) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);
  localStorage.setItem("secretKey", JSON.stringify({ key, expiresAt: expiresAt.toISOString() }));
}
export function getSecretKey() {
  const data = localStorage.getItem("secretKey");
  if (!data) return null;
  try {
    const { key, expiresAt } = JSON.parse(data);
    if (new Date(expiresAt) > new Date()) return key;
    localStorage.removeItem("secretKey");
    return null;
  } catch { localStorage.removeItem("secretKey"); return null; }
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const els: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (!trimmed) { i++; continue; }
    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, "")); i++;
      }
      els.push(<ol key={`ol${i}`} className="list-decimal list-outside pl-5 space-y-1 my-1">{items.map((it, j) => <li key={j}>{fmt(it)}</li>)}</ol>);
      continue;
    }
    if (/^[-*•]\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*•]\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*•]\s/, "")); i++;
      }
      els.push(<ul key={`ul${i}`} className="list-disc list-outside pl-5 space-y-1 my-1">{items.map((it, j) => <li key={j}>{fmt(it)}</li>)}</ul>);
      continue;
    }
    if (/^#{1,3}\s/.test(trimmed)) {
      const t = trimmed.replace(/^#{1,3}\s/, "");
      els.push(<p key={`h${i}`} className="font-semibold text-gray-900 mt-2 mb-0.5">{fmt(t)}</p>); i++;
      continue;
    }
    els.push(<p key={`p${i}`} className="leading-relaxed">{fmt(trimmed)}</p>); i++;
  }
  return els;
}
function fmt(text: string): React.ReactNode {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((p, i) => {
    if (/^\*\*[^*]+\*\*$/.test(p)) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (/^\*[^*]+\*$/.test(p)) return <em key={i}>{p.slice(1, -1)}</em>;
    return p;
  });
}

const ChatBot = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [showChat, setShowChat] = useState(false);
  const [tab, setTab] = useState<Tab>("chat");

  // Chat
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [clientId, setClientId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Consultation form
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const L = (en: string, fr: string, ch: string) =>
    lang === "fr" ? fr : lang === "ch" ? ch : en;

  const suggestions = [
    L("How do I register a business in Rwanda?", "Comment créer une entreprise au Rwanda ?", "如何在卢旺达注册公司？"),
    L("What are the tax incentives?", "Quels sont les avantages fiscaux ?", "有哪些税收优惠？"),
    L("Executive travel services", "Services de voyage exécutif", "高管旅行服务"),
  ];

  const services = [
    { v: "business_setup", l: L("Business Setup & Registration", "Création d'entreprise", "商业设立与注册") },
    { v: "investment", l: L("Investment Certificate", "Certificat d'investissement", "投资证书") },
    { v: "hr", l: L("HR & Recruitment", "RH & Recrutement", "人力资源与招聘") },
    { v: "travel", l: L("Executive Travel", "Voyage Exécutif", "高管旅行") },
    { v: "relocation", l: L("Relocation Services", "Services de relocalisation", "搬迁服务") },
    { v: "consulting", l: L("Business Consulting", "Conseil d'entreprise", "商业咨询") },
    { v: "other", l: L("Other", "Autre", "其他") },
  ];

  useEffect(() => {
    let id = localStorage.getItem("livechat_client_id");
    if (!id) { const n = uuidv4(); localStorage.setItem("livechat_client_id", n); id = n; }
    setClientId(id);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, autoScroll]);

  const sendMessage = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setMessages(p => [...p, { from: "me", text: msg }]);
    setInput("");
    setIsTyping(true);
    try {
      const res = await axios.post("https://api.bonet.rw:8443/bonetBackend/backend/public/ai-reply", {
        message: msg, clientId
      }, { timeout: 10000 });
      const reply = res.data.reply || L(
        "Thank you! How can I help you today?",
        "Merci ! Comment puis-je vous aider ?",
        "谢谢！今天我能为您做什么？"
      );
      setIsTyping(false);
      setMessages(p => [...p, { from: "agent", text: reply }]);
    } catch {
      setIsTyping(false);
      setMessages(p => [...p, { from: "agent", text: L(
        "Sorry, I'm having technical difficulties. Please try again.",
        "Désolé, je rencontre des difficultés techniques. Veuillez réessayer.",
        "抱歉，我遇到了技术问题，请重试。"
      )}]);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setAutoScroll(scrollTop + clientHeight >= scrollHeight - 20);
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  }, [input, clientId]);

  const submitConsult = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = L("Name required", "Nom requis", "姓名必填");
    if (!form.phone.trim()) e.phone = L("Phone required", "Téléphone requis", "电话必填");
    if (!form.service) e.service = L("Please select a service", "Veuillez choisir un service", "请选择服务");
    if (Object.keys(e).length) { setErrors(e); return; }
    const svcLabel = services.find(s => s.v === form.service)?.l || form.service;
    const body = lang === "fr"
      ? `Bonjour Bonet Elite Services,\n\nJe souhaite réserver une consultation.\n\nNom : ${form.name}\nTéléphone : ${form.phone}\nService : ${svcLabel}${form.message ? `\nMessage : ${form.message}` : ""}`
      : lang === "ch"
      ? `您好 Bonet Elite Services，\n\n我想预约咨询。\n\n姓名：${form.name}\n电话：${form.phone}\n服务：${svcLabel}${form.message ? `\n留言：${form.message}` : ""}`
      : `Hello Bonet Elite Services,\n\nI'd like to book a consultation.\n\nName: ${form.name}\nPhone: ${form.phone}\nService: ${svcLabel}${form.message ? `\nMessage: ${form.message}` : ""}`;
    window.open(`https://wa.me/${BONET_WA}?text=${encodeURIComponent(body)}`, "_blank");
    setSubmitted(true);
  };

  const tabLabel = (tab: Tab) => {
    if (tab === "chat") return L("Chat", "Chat", "聊天");
    return L("Book Consultation", "Réserver", "预约咨询");
  };

  return (
    <>
      {/* Floating button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#C9A84C] hover:bg-[#B8973B] text-white rounded-full shadow-xl z-40 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-2xl"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat window */}
      {showChat && (
        <div className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-[400px] md:h-[640px] bg-white md:rounded-2xl md:shadow-2xl md:border md:border-gray-100 flex flex-col z-[99999] overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#1A1A2E] to-[#2d2d52] px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm tracking-wide">Bonet Elite Services</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[11px] text-white/70">
                    {L("Online · Replies instantly", "En ligne · Réponse immédiate", "在线 · 立即回复")}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 bg-white shrink-0">
            {(["chat", "book"] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  tab === t
                    ? "text-[#C9A84C] border-b-2 border-[#C9A84C]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t === "chat" ? <MessageCircle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
                {tabLabel(t)}
              </button>
            ))}
          </div>

          {/* ── CHAT TAB ── */}
          {tab === "chat" && (
            <>
              <div
                className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/60"
                onScroll={handleScroll}
              >
                <WelcomeMessageAI />

                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm ${
                      m.from === "me"
                        ? "bg-[#C9A84C] text-white rounded-br-md"
                        : "bg-white text-gray-800 rounded-bl-md border border-gray-100 shadow-sm"
                    }`}>
                      {m.from === "agent"
                        ? <div className="space-y-1">{renderMarkdown(m.text)}</div>
                        : <span className="leading-relaxed">{m.text}</span>
                      }
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-[#C9A84C] rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-2 h-2 bg-[#C9A84C] rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-2 h-2 bg-[#C9A84C] rounded-full animate-bounce" />
                      </div>
                    </div>
                  </div>
                )}

                {messages.length === 0 && !isTyping && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {suggestions.map(s => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-[11px] font-medium text-[#C9A84C] bg-white border border-[#C9A84C]/30 rounded-full px-3 py-1.5 hover:bg-[#C9A84C]/5 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="px-4 py-3 bg-white border-t border-gray-100 shrink-0">
                <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-1.5 border border-gray-200 focus-within:border-[#C9A84C] focus-within:ring-1 focus-within:ring-[#C9A84C]/20 transition-colors">
                  <input
                    type="text"
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none py-1.5"
                    placeholder={L("Write a message...", "Écrire un message...", "输入消息...")}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    onClick={() => sendMessage()}
                    className="w-8 h-8 bg-[#C9A84C] hover:bg-[#B8973B] text-white rounded-full -mr-3 flex items-center justify-center transition-colors shrink-0"
                    aria-label="Send"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-300 mt-2">Bonet Elite Services</p>
              </div>
            </>
          )}

          {/* ── BOOK CONSULTATION TAB ── */}
          {tab === "book" && !submitted && (
            <div className="flex-1 overflow-y-auto p-5 bg-gray-50/60">
              {/* Header card */}
              <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2d2d52] rounded-xl p-4 mb-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-[#C9A84C]" />
                  <span className="text-sm font-bold">
                    {L("Book a Consultation", "Réserver une consultation", "预约咨询")}
                  </span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed">
                  {L(
                    "Fill in your details and we'll connect via WhatsApp within 30 minutes.",
                    "Remplissez le formulaire et nous vous contacterons via WhatsApp dans les 30 minutes.",
                    "填写您的信息，我们将在30分钟内通过WhatsApp与您联系。"
                  )}
                </p>
              </div>

              <div className="space-y-3">
                {/* Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">
                    {L("Your Name", "Votre nom", "您的姓名")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: "" })); }}
                    placeholder={L("Enter your full name", "Entrez votre nom complet", "请输入您的全名")}
                    className={`w-full rounded-xl border text-sm px-3.5 py-2.5 outline-none transition-colors bg-white ${
                      errors.name ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-[#C9A84C]"
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">
                    {L("Phone / WhatsApp", "Téléphone / WhatsApp", "电话 / WhatsApp")} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: "" })); }}
                    placeholder="+250 726 300 260"
                    className={`w-full rounded-xl border text-sm px-3.5 py-2.5 outline-none transition-colors bg-white ${
                      errors.phone ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-[#C9A84C]"
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>

                {/* Service */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">
                    {L("Service Needed", "Service souhaité", "所需服务")} <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.service}
                    onChange={e => { setForm(f => ({ ...f, service: e.target.value })); setErrors(er => ({ ...er, service: "" })); }}
                    className={`w-full rounded-xl border text-sm px-3.5 py-2.5 outline-none transition-colors bg-white ${
                      errors.service ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-[#C9A84C]"
                    }`}
                  >
                    <option value="">{L("Select a service...", "Choisir un service...", "选择服务...")}</option>
                    {services.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
                  </select>
                  {errors.service && <p className="text-[11px] text-red-500 mt-1">{errors.service}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">
                    {L("Message (optional)", "Message (optionnel)", "留言（可选）")}
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder={L("Tell us more about what you need...", "Décrivez vos besoins...", "请描述您的需求...")}
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 text-sm px-3.5 py-2.5 outline-none focus:border-[#C9A84C] transition-colors bg-white resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={submitConsult}
                  className="w-full bg-[#C9A84C] hover:bg-[#B8973B] text-white font-semibold text-sm rounded-xl py-3 flex items-center justify-center gap-2 transition-colors mt-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {L("Send via WhatsApp", "Envoyer via WhatsApp", "通过WhatsApp发送")}
                  <ChevronRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[10px] text-gray-400">
                  {L("Opens WhatsApp with your details pre-filled", "Ouvre WhatsApp avec vos informations", "将在WhatsApp中预填您的信息")}
                </p>
              </div>
            </div>
          )}

          {/* ── SUCCESS STATE ── */}
          {tab === "book" && submitted && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50/60 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-2">
                {L("WhatsApp Opened!", "WhatsApp ouvert !", "WhatsApp已打开！")}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {L(
                  "Continue the conversation on WhatsApp. We'll respond within 30 minutes during business hours.",
                  "Continuez la conversation sur WhatsApp. Nous répondons dans les 30 minutes.",
                  "请在WhatsApp上继续对话，我们将在工作时间内30分钟内回复。"
                )}
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", service: "", message: "" }); }}
                className="text-sm font-semibold text-[#C9A84C] hover:underline"
              >
                {L("Book another consultation", "Réserver une autre consultation", "预约另一次咨询")}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
