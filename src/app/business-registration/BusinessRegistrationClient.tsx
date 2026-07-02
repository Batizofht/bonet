"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Building2,
  FileCheck,
  Clock,
  Globe,
  Coins,
  CheckCircle,
  ArrowRight,
  Phone,
  Shield,
  Users,
  BarChart3,
  Landmark
} from "lucide-react";

export default function BusinessRegistrationClient() {
  const { t, i18n } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const L = (en: string, fr: string, ch: string) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const features = [
    {
      icon: Clock,
      title: L("6-Hour Registration","Enregistrement en 6 heures","6小时注册"),
      description: L("RDB processes applications same day — no waiting weeks for approval.","L'Office de développement du Rwanda traite les demandes le jour même — sans attendre des semaines.","RDB当天处理申请——无需等待数周审批。")
    },
    {
      icon: Globe,
      title: L("100% Foreign Ownership","Propriété étrangère à 100%","100%外资所有"),
      description: L("No local partner required. You retain full control of your company.","Aucun partenaire local requis. Vous conservez le contrôle total de votre entreprise.","无需本地合伙人，您完全掌控公司。")
    },
    {
      icon: Coins,
      title: L("Free Government Registration","Enregistrement gouvernemental gratuit","政府免费注册"),
      description: L("No government fee is required to register your company in Rwanda.","Aucun frais gouvernemental n'est requis pour enregistrer votre société au Rwanda.","在卢旺达注册公司无需缴纳政府费用。")
    },
    {
      icon: Building2,
      title: L("No Minimum Capital","Aucun capital minimum","无最低资本要求"),
      description: L("Start with any investment amount. Zero capital requirement.","Commencez avec n'importe quel montant d'investissement. Aucune exigence de capital.","以任意投资金额起步，零资本要求。")
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: L("Legal & Regulatory Compliance","Conformité légale et réglementaire","法律与合规监管"),
      description: L("We ensure your company meets all RDB, RSSB, and RRA requirements from day one, avoiding penalties and delays.","Nous veillons à ce que votre entreprise respecte toutes les exigences de l'Office de développement du Rwanda, du RSSB et de la RRA dès le premier jour.","我们确保您的公司从第一天起符合RDB、RSSB和RRA的所有要求，避免罚款和延误。")
    },
    {
      icon: Users,
      title: L("Dedicated Account Manager","Gestionnaire de compte dédié","专属客户经理"),
      description: L("A single point of contact guides you through every step — from name reservation to tax registration and beyond.","Un interlocuteur unique vous guide à chaque étape — de la réservation du nom à l'enregistrement fiscal et au-delà.","专属联络人全程引导您——从名称预留到税务登记及其后续事项。")
    },
    {
      icon: BarChart3,
      title: L("Post-Registration Support","Soutien après l'enregistrement","注册后支持"),
      description: L("Beyond registration, we help with bank account opening, work permits, tax filings, and operational setup.","Au-delà de l'enregistrement, nous vous aidons à ouvrir des comptes bancaires, obtenir des permis de travail, déposer des déclarations fiscales et mettre en place votre exploitation.","注册之外，我们协助开设银行账户、办理工作许可、税务申报及运营设置。")
    },
    {
      icon: Landmark,
      title: L("Government Liaison","Liaison gouvernementale","政府联络"),
      description: L("Our team maintains direct relationships with RDB, Rwanda Revenue Authority, and RSSB to fast-track your applications.","Notre équipe entretient des relations directes avec l'Office de développement du Rwanda, l'Autorité fiscale rwandaise et le RSSB pour accélérer vos demandes.","我们的团队与RDB、卢旺达税务局和RSSB保持直接关系，加快您的申请进度。")
    }
  ];

  const steps = [
    {
      number: "01",
      title: L("Company Name Reservation","Réservation du nom de la société","公司名称预留"),
      description: L("We reserve your preferred company name with RDB and verify availability within hours.","Nous réservons votre nom de société préféré auprès de l'Office de développement du Rwanda et en vérifions la disponibilité en quelques heures.","我们在RDB为您预留首选公司名称，并在数小时内确认可用性。")
    },
    {
      number: "02",
      title: L("Document Preparation","Préparation des documents","文件准备"),
      description: L("Our team prepares all incorporation documents — articles of association, shareholder details, and board resolutions.","Notre équipe prépare tous les documents d'incorporation — statuts, informations sur les actionnaires et résolutions du conseil.","我们的团队准备所有注册文件——公司章程、股东详情和董事会决议。")
    },
    {
      number: "03",
      title: L("RDB Submission","Soumission à l'Office de développement du Rwanda","提交RDB"),
      description: L("We submit your complete application to the Rwanda Development Board for processing and approval.","Nous soumettons votre dossier complet à l'Office de développement du Rwanda pour traitement et approbation.","我们将您的完整申请提交至卢旺达发展局进行审核和批准。")
    },
    {
      number: "04",
      title: L("TIN Registration","Enregistrement du NIF","税务识别号注册"),
      description: L("Once incorporated, we register your company for a Tax Identification Number with RRA.","Une fois constituée, nous enregistrons votre société pour un numéro d'identification fiscale auprès de l'Autorité fiscale rwandaise.","注册完成后，我们为您的公司在RRA申请税务识别号。")
    },
    {
      number: "05",
      title: L("RSSB Registration","Enregistrement RSSB","RSSB注册"),
      description: L("We enroll your company and employees with the Rwanda Social Security Board for compliance.","Nous inscrivons votre entreprise et vos employés auprès du Conseil de sécurité sociale du Rwanda pour la conformité.","我们为您的公司和员工在卢旺达社会保障委员会办理合规登记。")
    },
    {
      number: "06",
      title: L("Business License & Permits","Licence commerciale et permis","营业执照与许可证"),
      description: L("We handle all sector-specific licenses and permits so you can operate legally from day one.","Nous gérons toutes les licences et tous les permis spécifiques à votre secteur afin que vous puissiez exercer légalement dès le premier jour.","我们处理所有行业特定的许可证，让您从第一天起合法经营。")
    }
  ];

  const faqs = [
    {
      q: L("How long does company registration take in Rwanda?","Combien de temps dure l'enregistrement d'une société au Rwanda ?","在卢旺达注册公司需要多长时间？"),
      a: L("The Rwanda Development Board (RDB) typically processes company registrations within 6 hours for standard applications. Our end-to-end service, including document preparation and post-registration steps, is completed within 24-48 hours.","L'Office de développement du Rwanda traite généralement les enregistrements en 6 heures pour les demandes standard. Notre service de bout en bout, y compris la préparation des documents, est achevé en 24 à 48 heures.","卢旺达发展局通常在6小时内处理标准申请。我们的端到端服务（包括文件准备和注册后步骤）在24-48小时内完成。")
    },
    {
      q: L("Can a foreigner own 100% of a company in Rwanda?","Un étranger peut-il détenir 100 % d'une société au Rwanda ?","外国人可以在卢旺达拥有100%的公司吗？"),
      a: L("Yes. Rwanda allows 100% foreign ownership for most business sectors. There is no requirement for a local partner or shareholder.","Oui. Le Rwanda autorise la propriété étrangère à 100 % pour la plupart des secteurs. Il n'est pas nécessaire d'avoir un partenaire local.","是的。卢旺达允许大多数商业领域100%外资所有，无需本地合伙人或股东。")
    },
    {
      q: L("How much does it cost to register a company?","Combien coûte l'enregistrement d'une société ?","注册公司需要多少费用？"),
      a: L("RDB charges no government fee for company registration. Our service fees vary based on the complexity of your business structure and the additional services required (TIN, RSSB, licenses).","L'Office de développement du Rwanda ne facture aucun frais gouvernemental. Nos honoraires varient en fonction de la complexité de votre structure commerciale et des services supplémentaires requis.","RDB不收取公司注册政府费用。我们的服务费根据您的业务结构复杂程度及所需附加服务而定。")
    },
    {
      q: L("What documents do I need to register?","Quels documents sont nécessaires pour l'enregistrement ?","注册需要哪些文件？"),
      a: L("You need a valid passport or national ID for each shareholder and director, a proposed company name, proof of business address, and details of the company's share structure. We guide you through the full list.","Vous avez besoin d'un passeport valide ou d'une carte d'identité nationale pour chaque actionnaire et administrateur, d'un nom de société proposé et d'une preuve d'adresse commerciale. Nous vous guidons à travers la liste complète.","每位股东和董事需提供有效护照或国民身份证、拟用公司名称、营业地址证明及公司股权结构详情。我们将引导您完成完整清单。")
    },
    {
      q: L("What type of company should I register?","Quel type de société dois-je enregistrer ?","我应该注册哪种类型的公司？"),
      a: L("Most foreign investors register a Private Limited Company (PLC) — the most common and flexible structure. We also handle branches of foreign companies, public companies, and non-profit organizations.","La plupart des investisseurs étrangers enregistrent une société à responsabilité limitée privée — la structure la plus courante. Nous gérons également les succursales de sociétés étrangères, les sociétés anonymes et les organisations à but non lucratif.","大多数外国投资者注册有限责任公司（PLC）——最常见、最灵活的结构。我们还处理外国公司分支机构、上市公司和非营利组织。")
    },
    {
      q: L("Do I need to be in Rwanda to register?","Dois-je être au Rwanda pour m'enregistrer ?","注册时我需要在卢旺达吗？"),
      a: L("No. We handle the entire registration process remotely. You only need to provide scanned copies of your documents. However, certain post-registration steps (like bank account opening) may require your presence or a power of attorney.","Non. Nous gérons l'intégralité du processus à distance. Vous n'avez qu'à fournir des copies numérisées de vos documents. Certaines étapes post-enregistrement peuvent nécessiter votre présence ou une procuration.","不需要。我们可以远程处理整个注册流程，您只需提供文件扫描件。但某些注册后步骤可能需要您亲临或出具委托书。")
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div
        className="relative w-full h-[25vh] sm:h-[30vh] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/city.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("Rwanda Business Setup","Création d'entreprise au Rwanda","卢旺达企业注册")}</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">
            {L("Register Your Company in 6 Hours","Enregistrez votre société en 6 heures","6小时完成公司注册")}
          </h1>
          <p className="text-white/75 max-w-2xl mt-2 text-xs sm:text-sm leading-relaxed">
            {L("Just one team that handles every step from application to operations.","Une seule équipe pour gérer chaque étape, de la demande aux opérations.","一支团队处理从申请到运营的每个步骤。")}
          </p>
          <a
            href="/contact"
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-xs"
          >
            {L("Start Your Registration","Commencer l'enregistrement","开始注册")}
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: L("Companies Registered","Sociétés enregistrées","已注册企业") },
              { value: "6", label: L("Hours Average Time","Heures en moyenne","平均小时数") },
              { value: "0", label: L("Government Fee","Frais gouvernementaux","政府费用") },
              { value: "98%", label: L("Client Satisfaction","Satisfaction client","客户满意度") }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#C9A84C] mb-1">{stat.value}</div>
                <div className="text-gray-500 text-xs uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("Why Choose Us","Pourquoi nous choisir","为什么选择我们")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">{L("Everything You Need to Start","Tout ce qu'il vous faut pour démarrer","启动所需的一切")}</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">
              {L("Rwanda offers the fastest, most straightforward company registration process in Africa. Here is why investors choose us.","Le Rwanda offre le processus d'enregistrement le plus rapide et le plus simple d'Afrique. Voici pourquoi les investisseurs nous choisissent.","卢旺达提供非洲最快、最简单的公司注册流程。这就是投资者选择我们的原因。")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 lg:p-8 text-center">
                <feature.icon className="w-8 h-8 text-[#C9A84C] mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Register in Rwanda */}
      <div className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("Why Rwanda","Pourquoi le Rwanda","为什么选择卢旺达")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">{L("Africa's Easiest Place to Do Business","L'endroit le plus simple pour faire des affaires en Afrique","非洲最便于经商的国家")}</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">
              {L("Ranked 2nd in Africa for ease of doing business, Rwanda offers a stable, transparent, and investor-friendly environment.","Classé 2e en Afrique pour la facilité des affaires, le Rwanda offre un environnement stable, transparent et favorable aux investisseurs.","卢旺达在非洲营商便利度排名第二，提供稳定、透明、对投资者友好的环境。")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              L("Second easiest place to do business in Africa (World Bank)","2e endroit le plus facile pour faire des affaires en Afrique (Banque mondiale)","非洲营商便利度第二（世界银行）"),
              L("Stable political environment with strong governance","Environnement politique stable avec une gouvernance solide","稳定的政治环境与强有力的治理"),
              L("English, French, and Kinyarwanda speaking business community","Communauté d'affaires anglophone, francophone et kinyarwandaise","英语、法语和基尼亚卢旺达语商业社区"),
              L("Strategic location — access to COMESA, EAC, and AfCFTA markets","Emplacement stratégique — accès aux marchés COMESA, CAE et ZLECAf","战略位置——进入COMESA、EAC和非洲大陆自贸区市场"),
              L("Modern digital infrastructure for online business operations","Infrastructure numérique moderne pour les opérations commerciales en ligne","现代数字基础设施支持在线商业运营"),
              L("Competitive corporate tax rates and investment incentives","Taux d'imposition des sociétés compétitifs et incitations à l'investissement","具有竞争力的企业税率和投资激励措施")
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 border border-gray-200 rounded-xl p-4 bg-white">
                <CheckCircle className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("Process","Processus","流程")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">{L("Complete Setup in 6 Steps","Configuration complète en 6 étapes","6步完整注册")}</h2>
            <p className="text-gray-500 text-sm mt-2">{L("From name reservation to business license — we handle it all.","De la réservation du nom à la licence commerciale — nous gérons tout.","从名称预留到营业执照——我们一手包办。")}</p>
          </div>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-5 border border-gray-200 rounded-xl p-5 bg-white">
                <span className="text-[#C9A84C] font-bold text-lg w-8 flex-shrink-0">{step.number}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("What You Get","Ce que vous obtenez","您将获得")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">{L("Beyond Just Registration","Au-delà de la simple inscription","不仅仅是注册")}</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">
              {L("We do not stop at incorporation. Our team supports your business through every stage of setup and operations.","Nous ne nous arrêtons pas à l'incorporation. Notre équipe soutient votre entreprise à chaque étape.","我们不止步于注册。我们的团队在每个阶段为您的企业提供支持。")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white flex gap-4">
                <benefit.icon className="w-6 h-6 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 uppercase tracking-wider">{L("Frequently Asked Questions","Questions fréquemment posées","常见问题")}</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 text-sm pr-4">{faq.q}</span>
                  <span className={`text-[#C9A84C] text-lg transition-transform flex-shrink-0 ${openFAQ === index ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-5 pb-4 bg-white border-t border-gray-100">
                    <p className="text-gray-600 text-sm leading-relaxed pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className="relative w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/image/city.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative pt-16 pb-24 lg:pt-20 lg:pb-28">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{L("Get Started Today","Commencez dès aujourd'hui","立即开始")}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {L("Ready to Register Your Company in Rwanda?","Prêt à enregistrer votre société au Rwanda ?","准备好在卢旺达注册您的公司了吗？")}
            </h2>
            <p className="text-white/60 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              {L("Join hundreds of foreign investors who trusted us with their Rwanda business setup. Free consultation included.","Rejoignez des centaines d'investisseurs étrangers qui nous ont confié leur installation au Rwanda. Consultation gratuite incluse.","加入数百位信任我们的外国投资者，共同开启卢旺达商业之旅。含免费咨询。")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
              >
                <FileCheck className="w-4 h-4" />
                {L("Book Free Consultation","Réserver une consultation gratuite","预约免费咨询")}
              </a>
              <a
                href="https://wa.me/250726300260"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                {L("WhatsApp Us","Écrivez-nous sur WhatsApp","WhatsApp联系")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
