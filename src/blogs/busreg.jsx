"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Calendar,
  Clock,
  User,
} from "lucide-react";
import Link from "next/link";

const BusinessRegistration = () => {
  const { i18n } = useTranslation();
  const L = (en, fr, ch) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const blogArticle = {
    title: L(
      "Complete Guide to Business Registration in Rwanda: 2024 Edition",
      "Guide Complet pour l'Enregistrement d'Entreprise au Rwanda : Édition 2024",
      "卢旺达企业注册完整指南：2024版"
    ),
    author: "Bonet Business Team",
    date: L("December 15, 2024", "15 Décembre 2024", "2024年12月15日"),
    readTime: L("8 min read", "8 min de lecture", "阅读约8分钟"),
    category: L("Business Setup", "Création d'Entreprise", "企业设立"),
    content: [
      {
        type: "paragraph",
        text: L(
          "Starting a business in Rwanda has never been easier with the government's continued efforts to streamline the registration process. This comprehensive guide will walk you through every step needed to legally establish your business in Rwanda.",
          "Créer une entreprise au Rwanda n'a jamais été aussi facile grâce aux efforts continus du gouvernement pour simplifier le processus d'enregistrement. Ce guide complet vous guidera à travers chaque étape nécessaire pour établir légalement votre entreprise au Rwanda.",
          "随着政府持续简化注册流程，在卢旺达创业从未如此简单。本全面指南将引导您完成在卢旺达合法设立企业所需的每个步骤。"
        )
      },
      {
        type: "heading",
        text: L(
          "Why Register Your Business in Rwanda?",
          "Pourquoi Enregistrer Votre Entreprise au Rwanda ?",
          "为什么要在卢旺达注册企业？"
        )
      },
      {
        type: "paragraph",
        text: L(
          "Rwanda ranks among the easiest places to do business in Africa, thanks to its efficient registration system, favorable tax policies, and strong support for entrepreneurs. Registered businesses gain access to legal protection, banking services, and government incentives.",
          "Le Rwanda se classe parmi les endroits les plus faciles pour faire des affaires en Afrique, grâce à son système d'enregistrement efficace, ses politiques fiscales favorables et son fort soutien aux entrepreneurs. Les entreprises enregistrées accèdent à la protection juridique, aux services bancaires et aux incitations gouvernementales.",
          "卢旺达凭借高效的注册体系、优惠的税收政策和对创业者的大力支持，跻身非洲最易经商国家之列。已注册企业可享有法律保护、银行服务和政府激励措施。"
        )
      }
    ]
  };

  const services = [
    {
      title: L("Business Setup And Investment", "Création d'Entreprise et Investissement", "企业设立与投资"),
      description: L(
        "Eleven-incentive tax map (0%, 3%, 15%, 7-year holiday), RDB Investment Certificate application, structuring for maximum eligibility, and access to 1.6 billion+ consumers across EAC, COMESA, EU, AGOA, and AfCFTA.",
        "Carte fiscale à onze incitations (0%, 3%, 15%, exonération 7 ans), demande de Certificat d'Investissement RDB, structuration pour une éligibilité maximale, et accès à plus de 1,6 milliard de consommateurs via EAC, COMESA, UE, AGOA et AfCFTA.",
        "十一项税收优惠图（0%、3%、15%、7年免税期），RDB投资证书申请，最大化资格结构设计，通过东非共同体、康迈萨、欧盟、AGOA和非洲自贸区覆盖16亿+消费者。"
      ),
      features: [
        L("Company registration", "Enregistrement d'entreprise", "公司注册"),
        L("Legal documentation", "Documentation légale", "法律文件"),
        L("License acquisition", "Obtention de licences", "许可证办理"),
        L("Bank account setup", "Ouverture de compte bancaire", "银行账户开设")
      ],
      link: "investment"
    },
    {
      title: L("Business Consulting", "Conseil en Affaires", "企业咨询"),
      description: L(
        "Strategic consulting services to optimize your business processes and drive sustainable growth.",
        "Services de conseil stratégique pour optimiser vos processus d'entreprise et stimuler une croissance durable.",
        "战略咨询服务，优化您的业务流程并推动可持续增长。"
      ),
      features: [
        L("Strategic planning", "Planification stratégique", "战略规划"),
        L("Process optimization", "Optimisation des processus", "流程优化"),
        L("Market analysis", "Analyse de marché", "市场分析"),
        L("Performance improvement", "Amélioration des performances", "绩效提升")
      ],
      link: "consulting"
    },
    {
      title: L("HR & Admin Support", "Soutien RH et Administratif", "人力资源与行政支持"),
      description: L(
        "Recruitment and screening, Rwanda-compliant employment contracts, monthly payroll with PAYE and RSSB, work permits for foreign staff, and HR policy frameworks aligned to Rwandan labor law.",
        "Recrutement et sélection, contrats de travail conformes au Rwanda, paie mensuelle avec PAYE et RSSB, permis de travail pour le personnel étranger et cadres de politique RH alignés sur le droit du travail rwandais.",
        "招聘与筛选、符合卢旺达法规的劳动合同、含PAYE和RSSB的月度工资发放、外籍员工工作许可，以及符合卢旺达劳动法的人力资源政策框架。"
      ),
      features: [
        L("Recruitment & staffing", "Recrutement et dotation en personnel", "招聘与配置"),
        L("Payroll management", "Gestion de la paie", "薪酬管理"),
        L("Employee relations", "Relations avec les employés", "员工关系"),
        L("Admin workflow optimization", "Optimisation des flux de travail administratifs", "行政流程优化")
      ],
      link: "hrsupport"
    },
    {
      title: L("Travel & Hospitality", "Voyage et Hôtellerie", "旅游与酒店"),
      description: L(
        "Named-property bookings (Radisson Blu, Marriott, Singita Kwitonda, One&Only), private gorilla trekking permits, chauffeured transport, and three pre-priced sample itineraries from $1,800.",
        "Réservations d'établissements nommés (Radisson Blu, Marriott, Singita Kwitonda, One&Only), permis privés de trekking des gorilles, transport avec chauffeur et trois exemples d'itinéraires à prix fixes à partir de 1 800$.",
        "知名酒店预订（丽笙蓝光、万豪、Singita Kwitonda、One&Only），私人大猩猩徒步许可证，配司机接送，以及三条起价1800美元的精选行程方案。"
      ),
      features: [
        L("Business travel management", "Gestion des voyages d'affaires", "商务旅行管理"),
        L("Hotel & accommodation services", "Services hôteliers et d'hébergement", "酒店与住宿服务"),
        L("Event planning & coordination", "Planification et coordination d'événements", "活动策划与协调"),
        L("VIP hospitality services", "Services d'accueil VIP", "VIP贵宾接待服务")
      ],
      link: "travel"
    }
  ];

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Services Section */}
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            {L("Services","Services","服务")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            {L("What","Ce Que","我们的")}
            <span className="text-[#C9A84C]"> {L("We Do","Nous Faisons","服务内容")} </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {L(
              "Professional solutions tailored for your business success",
              "Solutions professionnelles adaptées à la réussite de votre entreprise",
              "为您的业务成功量身定制的专业解决方案"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="text-left p-8 rounded-2xl bg-white border border-gray-200/30 hover:border-[#C9A84C]/40 transition-colors duration-300"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <ul className="text-left space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={`/${service.link}`}>
                  <button className="px-4 py-2 bg-[#C9A84C] text-white text-sm font-medium rounded-full hover:bg-[#B8973B] transition-colors duration-300">
                    {L("Learn More","En Savoir Plus","了解更多")}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Article Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-8 md:p-12 border-b border-gray-100 text-center">
          <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-widest">
            {blogArticle.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            {blogArticle.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-500">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span className="text-sm">{blogArticle.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-sm">{blogArticle.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-sm">{blogArticle.readTime}</span>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="prose max-w-none">
              {blogArticle.content.map((section, index) => (
                <div key={index} className="mb-6">
                  {section.type === "heading" ? (
                    <h3 className="text-xl font-bold text-gray-900 mb-3 mt-8">
                      {section.text}
                    </h3>
                  ) : (
                    <p className="text-gray-600 leading-relaxed">
                      {section.text}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 border border-gray-200 rounded-xl text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {L(
                  "Need Help With Business Registration?",
                  "Besoin d'aide pour l'enregistrement de votre entreprise ?",
                  "需要企业注册帮助？"
                )}
              </h3>
              <p className="text-gray-500 mb-4 text-sm">
                {L(
                  "Let our experts handle the entire registration process for you. We ensure compliance with all regulations and save you time.",
                  "Laissez nos experts gérer l'ensemble du processus d'enregistrement pour vous. Nous assurons la conformité avec toutes les réglementations et vous économisons du temps.",
                  "让我们的专家为您处理整个注册流程。我们确保符合所有法规并为您节省时间。"
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/investment">
                  <button className="bg-[#C9A84C] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#B8973B] transition-colors duration-200 text-sm">
                    {L("Start Registration Today","Commencer l'enregistrement aujourd'hui","立即开始注册")}
                  </button>
                </Link>
                <Link href="/consulting">
                  <button className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-200 text-sm">
                    {L("Free Consultation","Consultation Gratuite","免费咨询")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessRegistration;
