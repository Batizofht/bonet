"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, Search, MessageCircle, ArrowRight } from "lucide-react";

type FAQItem = { question: string; answer: string; };
type FAQCategory = { id: string; title: string; items: FAQItem[]; };

export default function FAQClient() {
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) =>
    i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo<FAQCategory[]>(() => {
    const L2 = (en: string, fr: string, ch: string) =>
      i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
    return [
      {
        id: "visas",
        title: L2("Visas, Permits and Immigration","Visas, Permis et Immigration","签证、许可证和移民"),
        items: [
          {
            question: L2("Do I need a visa to enter Rwanda?","Ai-je besoin d'un visa pour entrer au Rwanda ?","进入卢旺达需要签证吗？"),
            answer: L2(
              "It depends on your nationality. Many travelers get a 30-day visa on arrival (some free, some paid). If you must apply before travel, use Irembo: https://irembo.gov.rw. Always confirm current rules with DGIE: https://www.migration.gov.rw.",
              "Cela dépend de votre nationalité. De nombreux voyageurs obtiennent un visa d'arrivée de 30 jours (certains gratuits, d'autres payants). Si vous devez faire une demande avant le voyage, utilisez Irembo : https://irembo.gov.rw. Confirmez toujours les règles actuelles avec la DGIE : https://www.migration.gov.rw.",
              "这取决于您的国籍。许多旅行者可获得30天落地签（部分免费，部分收费）。如需提前申请，请使用Irembo：https://irembo.gov.rw。请务必向DGIE确认最新规定：https://www.migration.gov.rw。"
            )
          },
          {
            question: L2("What is the difference between a visa and a residence permit?","Quelle est la différence entre un visa et un permis de séjour ?","签证和居留许可有什么区别？"),
            answer: L2(
              "A visa is for short stays (commonly 30-90 days). A residence permit is for long-term stay (usually 1-2 years, renewable) tied to work, investment, study, family, or retirement. If you plan to stay or operate in Rwanda beyond 90 days, you typically need a residence permit.",
              "Un visa est destiné aux séjours courts (généralement 30 à 90 jours). Un permis de séjour est pour les séjours à long terme (habituellement 1 à 2 ans, renouvelable) lié au travail, à l'investissement, aux études, à la famille ou à la retraite. Si vous prévoyez de rester ou d'opérer au Rwanda au-delà de 90 jours, vous avez généralement besoin d'un permis de séjour.",
              "签证用于短期逗留（通常30-90天）。居留许可用于长期居留（通常1-2年，可续签），与工作、投资、学习、家庭或退休相关。如果您计划在卢旺达停留或经营超过90天，通常需要居留许可。"
            )
          },
          {
            question: L2("Which residence permit do I need as an investor?","Quel permis de séjour me faut-il en tant qu'investisseur ?","作为投资者，我需要哪种居留许可？"),
            answer: L2(
              "If you register a company and meet investor requirements, you may qualify for an investor permit (often up to 2 years, renewable). Thresholds and classes can change, so confirm with DGIE: https://www.migration.gov.rw and RDB: https://rdb.rw.",
              "Si vous enregistrez une société et remplissez les conditions requises pour les investisseurs, vous pouvez bénéficier d'un permis d'investisseur (souvent jusqu'à 2 ans, renouvelable). Les seuils et catégories peuvent changer, confirmez avec la DGIE : https://www.migration.gov.rw et le RDB : https://rdb.rw.",
              "如果您注册了公司并满足投资者要求，您可能有资格获得投资者许可证（通常最长2年，可续签）。门槛和类别可能变化，请向DGIE：https://www.migration.gov.rw和RDB：https://rdb.rw确认。"
            )
          },
          {
            question: L2("How do I get a work permit?","Comment obtenir un permis de travail ?","如何获得工作许可证？"),
            answer: L2(
              "Your employer applies through Irembo: https://irembo.gov.rw. Common requirements include an employment contract, qualifications, a criminal record certificate, valid passport, and a photo. Processing often takes around 5-15 working days depending on the case.",
              "Votre employeur fait la demande via Irembo : https://irembo.gov.rw. Les exigences courantes comprennent un contrat de travail, des qualifications, un casier judiciaire, un passeport valide et une photo. Le traitement prend généralement environ 5 à 15 jours ouvrables selon le dossier.",
              "您的雇主通过Irembo申请：https://irembo.gov.rw。常见要求包括劳动合同、资质证明、无犯罪记录证明、有效护照和照片。根据具体情况，办理时间通常约需5-15个工作日。"
            )
          },
          {
            question: L2("Can I work remotely from Rwanda for a foreign company?","Puis-je travailler à distance depuis le Rwanda pour une entreprise étrangère ?","我可以在卢旺达远程为外国公司工作吗？"),
            answer: L2(
              "Yes, but you still need a legal basis to stay (visa or a residence permit). For longer stays, confirm permit options with DGIE: https://www.migration.gov.rw. If you stay more than 183 days, you may become a Rwanda tax resident-confirm with RRA: https://www.rra.gov.rw.",
              "Oui, mais vous avez toujours besoin d'une base légale pour rester (visa ou permis de séjour). Pour les séjours prolongés, confirmez les options de permis avec la DGIE : https://www.migration.gov.rw. Si vous restez plus de 183 jours, vous pouvez devenir résident fiscal au Rwanda – confirmez avec la RRA : https://www.rra.gov.rw.",
              "可以，但您仍需要合法的居留依据（签证或居留许可）。长期居留请向DGIE确认许可选项：https://www.migration.gov.rw。如果您停留超过183天，可能成为卢旺达税务居民——请向RRA确认：https://www.rra.gov.rw。"
            )
          },
          {
            question: L2("Can my spouse and children join me?","Mon conjoint et mes enfants peuvent-ils me rejoindre ?","我的配偶和子女可以与我同行吗？"),
            answer: L2(
              "Yes. Permit holders can usually sponsor dependents (spouse and children under 18). You may need certified marriage/birth certificates (translated and apostilled/legalized), proof of means, and copies of the sponsor's permit and passport. Check DGIE guidance: https://www.migration.gov.rw.",
              "Oui. Les titulaires de permis peuvent généralement parrainer des personnes à charge (conjoint et enfants de moins de 18 ans). Vous pourriez avoir besoin de certificats de mariage/naissance certifiés (traduits et apostillés/légalisés), d'une preuve de moyens et de copies du permis et du passeport du parrain. Consultez les directives de la DGIE : https://www.migration.gov.rw.",
              "可以。许可证持有人通常可以为受抚养人（配偶和18岁以下子女）提供担保。您可能需要经认证的结婚/出生证明（已翻译并经公证）、经济能力证明以及担保人许可证和护照复印件。请查看DGIE指南：https://www.migration.gov.rw。"
            )
          },
          {
            question: L2("How long does it take to renew a permit?","Combien de temps faut-il pour renouveler un permis ?","续签许可证需要多长时间？"),
            answer: L2(
              "Apply early (at least 30 days before expiry). Renewals via Irembo often take around 5-10 working days, but timelines vary. Avoid expiry because it can trigger fines and impact future applications. Portal: https://irembo.gov.rw.",
              "Faites la demande tôt (au moins 30 jours avant l'expiration). Les renouvellements via Irembo prennent souvent environ 5 à 10 jours ouvrables, mais les délais varient. Évitez l'expiration car elle peut entraîner des amendes et affecter les demandes futures. Portail : https://irembo.gov.rw.",
              "请提前申请（至少在到期前30天）。通过Irembo续签通常需要约5-10个工作日，但时间会有所不同。避免过期，因为这可能导致罚款并影响未来申请。门户：https://irembo.gov.rw。"
            )
          },
          {
            question: L2("What documents do I need to apostille or legalize before coming?","Quels documents dois-je faire apostiller ou légaliser avant de venir ?","来卢旺达之前需要对哪些文件进行公证或合法化？"),
            answer: L2(
              "Common documents include birth/marriage certificates, highest academic certificate, professional certificates, criminal record certificate (recent), and any relevant company documents. Requirements vary by permit type-confirm with DGIE: https://www.migration.gov.rw.",
              "Les documents courants comprennent les certificats de naissance/mariage, le diplôme le plus élevé, les certificats professionnels, le casier judiciaire (récent) et tout document d'entreprise pertinent. Les exigences varient selon le type de permis – confirmez avec la DGIE : https://www.migration.gov.rw.",
              "常见文件包括出生/结婚证明、最高学历证书、职业资格证书、无犯罪记录证明（近期）以及相关公司文件。要求因许可证类型而异——请向DGIE确认：https://www.migration.gov.rw。"
            )
          }
        ]
      },
      {
        id: "business",
        title: L2("Business Registration and Investment","Enregistrement d'entreprise et investissement","企业注册与投资"),
        items: [
          {
            question: L2("How long does it take to register a company in Rwanda?","Combien de temps faut-il pour enregistrer une entreprise au Rwanda ?","在卢旺达注册公司需要多长时间？"),
            answer: L2(
              "Online registration via RDB can be fast once documents are ready (often within hours to a few working days). The real work is preparing correct articles, shareholder IDs, share capital declaration, and a valid address. Authority: https://rdb.rw.",
              "L'enregistrement en ligne via le RDB peut être rapide une fois les documents prêts (souvent en quelques heures à quelques jours ouvrables). Le vrai travail consiste à préparer des statuts corrects, des pièces d'identité des actionnaires, une déclaration de capital social et une adresse valide. Autorité : https://rdb.rw.",
              "一旦文件准备好，通过RDB在线注册可以很快（通常在数小时至几个工作日内）。真正的工作在于准备正确的公司章程、股东身份证明、股本声明和有效地址。主管机构：https://rdb.rw。"
            )
          },
          {
            question: L2("Can a foreigner own 100% of a Rwandan company?","Un étranger peut-il détenir 100 % d'une société rwandaise ?","外国人可以100%持有卢旺达公司吗？"),
            answer: L2(
              "Yes. Rwanda generally allows 100% foreign ownership in most sectors and does not require a local partner. A few sensitive sectors have specific rules-confirm for your sector with RDB: https://rdb.rw.",
              "Oui. Le Rwanda autorise généralement une propriété étrangère à 100 % dans la plupart des secteurs et n'exige pas de partenaire local. Quelques secteurs sensibles ont des règles spécifiques – confirmez pour votre secteur avec le RDB : https://rdb.rw.",
              "是的。卢旺达通常允许大多数行业100%外资所有权，无需当地合伙人。少数敏感行业有特定规定——请向RDB确认您所在行业的规定：https://rdb.rw。"
            )
          },
          {
            question: L2("What is the minimum capital to start a company?","Quel est le capital minimum pour créer une entreprise ?","创办公司所需的最低资本是多少？"),
            answer: L2(
              "There is typically no fixed statutory minimum share capital for a private limited company, but practical requirements depend on your business and banking/permit needs. For investor permit or incentives, higher investment commitments may apply-confirm with RDB: https://rdb.rw.",
              "Il n'y a généralement pas de capital social minimum légal fixe pour une société à responsabilité limitée, mais les exigences pratiques dépendent de votre activité et de vos besoins en matière bancaire et de permis. Pour un permis d'investisseur ou des incitations, des engagements d'investissement plus élevés peuvent s'appliquer – confirmez avec le RDB : https://rdb.rw.",
              "私人有限公司通常没有固定的法定最低股本要求，但实际要求取决于您的业务和银行/许可证需求。对于投资者许可证或激励措施，可能需要更高的投资承诺——请向RDB确认：https://rdb.rw。"
            )
          },
          {
            question: L2("What investment incentives can I claim?","Quels avantages fiscaux puis-je revendiquer ?","我可以申请哪些投资激励措施？"),
            answer: L2(
              "Incentives depend on sector and thresholds and may include tax holidays, accelerated depreciation, VAT/customs exemptions, and industrial park benefits. Incentives are conditional-confirm current rules with RDB: https://rdb.rw before structuring your application.",
              "Les incitations dépendent du secteur et des seuils et peuvent inclure des exonérations fiscales, l'amortissement accéléré, les exonérations de TVA/douanes et les avantages des zones industrielles. Les incitations sont conditionnelles – confirmez les règles actuelles avec le RDB : https://rdb.rw avant de structurer votre demande.",
              "激励措施因行业和门槛而异，可能包括免税期、加速折旧、增值税/关税豁免和工业园区福利。激励措施有条件——在构建申请前请向RDB确认当前规则：https://rdb.rw。"
            )
          },
          {
            question: L2("Do I need a physical office to register a company?","Ai-je besoin d'un bureau physique pour enregistrer une entreprise ?","注册公司需要实体办公室吗？"),
            answer: L2(
              "You need a registered address that is real and verifiable. It can be a virtual office, coworking address, or leased space, as long as official documents can be served there.",
              "Vous avez besoin d'une adresse enregistrée réelle et vérifiable. Il peut s'agir d'un bureau virtuel, d'une adresse de coworking ou d'un espace loué, à condition que les documents officiels puissent y être remis.",
              "您需要一个真实且可核实的注册地址。可以是虚拟办公室、共享办公地址或租赁空间，只要官方文件可以在那里送达即可。"
            )
          },
          {
            question: L2("What sectors are most open to foreign investment right now?","Quels secteurs sont les plus ouverts aux investissements étrangers ?","目前哪些行业对外国投资最为开放？"),
            answer: L2(
              "Common active sectors include ICT, financial services (KIFC), tourism and hospitality, agro-processing, manufacturing, mining, energy, construction, and education. Confirm incentives and sector notes with RDB: https://rdb.rw and KIFC: https://kifc.rw.",
              "Les secteurs actifs courants comprennent les TIC, les services financiers (KIFC), le tourisme et l'hôtellerie, l'agro-industrie, la fabrication, l'exploitation minière, l'énergie, la construction et l'éducation. Confirmez les incitations et les notes sectorielles avec le RDB : https://rdb.rw et le KIFC : https://kifc.rw.",
              "常见活跃行业包括信息通信技术、金融服务（KIFC）、旅游和酒店业、农产品加工、制造业、采矿业、能源、建筑和教育。请向RDB：https://rdb.rw和KIFC：https://kifc.rw确认激励措施和行业说明。"
            )
          }
        ]
      },
      {
        id: "banking",
        title: L2("Banking and Finance","Banque et Finance","银行与金融"),
        items: [
          {
            question: L2("Can a foreigner open a bank account in Rwanda?","Un étranger peut-il ouvrir un compte bancaire au Rwanda ?","外国人可以在卢旺达开设银行账户吗？"),
            answer: L2(
              "Yes. Banks commonly require a passport, residence/work permit (or non-resident status documents), proof of address, and source-of-funds evidence. Requirements vary by bank and your residency status.",
              "Oui. Les banques exigent généralement un passeport, un permis de séjour/travail (ou des documents de statut de non-résident), une preuve d'adresse et des justificatifs d'origine des fonds. Les exigences varient selon la banque et votre statut de résidence.",
              "可以。银行通常要求提供护照、居留/工作许可证（或非居民身份文件）、地址证明和资金来源证明。要求因银行和您的居住状态而异。"
            )
          },
          {
            question: L2("How long does it take to open a corporate account?","Combien de temps faut-il pour ouvrir un compte d'entreprise ?","开设企业账户需要多长时间？"),
            answer: L2(
              "After incorporation and a TIN, corporate account opening often takes around 5-10 working days. Banks usually request incorporation certificate, articles, TIN, board resolution, and KYC for signatories and beneficial owners.",
              "Après la constitution de la société et l'obtention du NIF, l'ouverture d'un compte d'entreprise prend souvent environ 5 à 10 jours ouvrables. Les banques demandent généralement le certificat de constitution, les statuts, le NIF, la résolution du conseil d'administration et le KYC pour les signataires et les bénéficiaires effectifs.",
              "完成公司注册并获得税务识别号后，开设企业账户通常需要约5-10个工作日。银行通常要求提供注册证书、公司章程、税务识别号、董事会决议以及签署人和实际受益人的KYC材料。"
            )
          },
          {
            question: L2("What currencies can I hold?","Quelles devises puis-je détenir ?","我可以持有哪些货币？"),
            answer: L2(
              "Many banks offer accounts in RWF, USD, EUR, and GBP. Multi-currency accounts are common. Foreign exchange reporting rules can apply above thresholds-see BNR: https://www.bnr.rw.",
              "De nombreuses banques proposent des comptes en RWF, USD, EUR et GBP. Les comptes multi-devises sont courants. Des règles de déclaration des changes peuvent s'appliquer au-delà de certains seuils – voir BNR : https://www.bnr.rw.",
              "许多银行提供卢旺达法郎、美元、欧元和英镑账户。多币种账户很常见。超过一定金额可能需要申报外汇——请参阅BNR：https://www.bnr.rw。"
            )
          },
          {
            question: L2("Can I repatriate profits and capital?","Puis-je rapatrier mes bénéfices et mon capital ?","我可以汇回利润和资本吗？"),
            answer: L2(
              "Generally yes, once taxes are compliant. Banks may request a tax clearance from RRA for outward transfers. Confirm current requirements with RRA: https://www.rra.gov.rw and your bank.",
              "Généralement oui, une fois les impôts conformes. Les banques peuvent demander un certificat de conformité fiscale de la RRA pour les transferts sortants. Confirmez les exigences actuelles avec la RRA : https://www.rra.gov.rw et votre banque.",
              "一般情况下可以，只要税务合规。银行可能要求提供RRA的税务清关证明才能进行对外转账。请向RRA：https://www.rra.gov.rw和您的银行确认当前要求。"
            )
          },
          {
            question: L2("Is mobile money widely used?","Le mobile money est-il largement utilisé ?","移动支付是否广泛使用？"),
            answer: L2(
              "Yes. Mobile money is used widely for everyday payments and many official payments. Setting up a SIM and mobile money wallet is one of the most practical first steps after arrival.",
              "Oui. Le mobile money est largement utilisé pour les paiements quotidiens et de nombreux paiements officiels. La mise en place d'une SIM et d'un portefeuille de mobile money est l'une des premières démarches les plus pratiques après l'arrivée.",
              "是的。移动支付广泛用于日常付款和许多官方付款。办理SIM卡和移动支付钱包是抵达后最实用的首要步骤之一。"
            )
          }
        ]
      },
      {
        id: "tax",
        title: L2("Tax and Compliance","Fiscalité et Conformité","税务与合规"),
        items: [
          {
            question: L2("What taxes will my Rwandan company pay?","Quels impôts ma société rwandaise devra-t-elle payer ?","我的卢旺达公司需要缴纳哪些税款？"),
            answer: L2(
              "Common taxes include Corporate Income Tax, VAT (if registered), PAYE on salaries, RSSB social security contributions, and withholding taxes on certain payments. Rates and rules can change-confirm with RRA: https://www.rra.gov.rw and RSSB: https://www.rssb.rw.",
              "Les taxes courantes comprennent l'impôt sur les sociétés, la TVA (si enregistré), le PAYE sur les salaires, les cotisations de sécurité sociale RSSB et les retenues à la source sur certains paiements. Les taux et les règles peuvent changer – confirmez avec la RRA : https://www.rra.gov.rw et le RSSB : https://www.rssb.rw.",
              "常见税种包括企业所得税、增值税（如已注册）、工资所得税代扣代缴、RSSB社会保障缴款以及某些付款的预扣税。税率和规则可能有所变化——请向RRA：https://www.rra.gov.rw和RSSB：https://www.rssb.rw确认。"
            )
          },
          {
            question: L2("When am I a tax resident in Rwanda?","Quand suis-je résident fiscal au Rwanda ?","我何时成为卢旺达税务居民？"),
            answer: L2(
              "You may become a tax resident if you stay more than 183 days in a 12-month period or meet other residency tests. Tax residents may be taxed on worldwide income. Confirm with RRA: https://www.rra.gov.rw.",
              "Vous pouvez devenir résident fiscal si vous séjournez plus de 183 jours sur une période de 12 mois ou si vous remplissez d'autres critères de résidence. Les résidents fiscaux peuvent être imposés sur leur revenu mondial. Confirmez avec la RRA : https://www.rra.gov.rw.",
              "如果您在12个月内停留超过183天或满足其他居住测试，您可能成为税务居民。税务居民可能需要就全球收入纳税。请向RRA确认：https://www.rra.gov.rw。"
            )
          },
          {
            question: L2("Do I need to file taxes if my company has no revenue yet?","Dois-je déposer des déclarations fiscales si ma société n'a pas encore de revenus ?","如果公司尚无收入，我还需要报税吗？"),
            answer: L2(
              "Often yes. Dormant companies may still need filings (e.g., annual returns and certain monthly returns if registered). Missing filings can trigger penalties even with zero revenue. Confirm obligations with RRA: https://www.rra.gov.rw.",
              "Souvent oui. Les sociétés dormantes peuvent encore avoir besoin de déposer des déclarations (p. ex., déclarations annuelles et certaines déclarations mensuelles si enregistrées). Les déclarations manquantes peuvent entraîner des pénalités même avec zéro revenu. Confirmez les obligations avec la RRA : https://www.rra.gov.rw.",
              "通常需要。休眠公司可能仍需提交申报（例如年度申报表和某些月度申报表）。即使收入为零，缺少申报也可能触发罚款。请向RRA确认义务：https://www.rra.gov.rw。"
            )
          },
          {
            question: L2("What is a TIN and how do I get one?","Qu'est-ce qu'un NIF et comment l'obtenir ?","什么是税务识别号，如何获取？"),
            answer: L2(
              "A TIN (Taxpayer Identification Number) is required for many formal activities. Companies typically receive a TIN at incorporation; individuals apply via RRA's portal. Authority: https://www.rra.gov.rw.",
              "Un NIF (Numéro d'Identification Fiscale) est requis pour de nombreuses activités formelles. Les sociétés reçoivent généralement un NIF lors de leur constitution ; les personnes physiques font la demande via le portail de la RRA. Autorité : https://www.rra.gov.rw.",
              "税务识别号（TIN）是许多正式活动所必需的。公司通常在注册时获得TIN；个人通过RRA门户申请。主管机构：https://www.rra.gov.rw。"
            )
          },
          {
            question: L2("Does Rwanda have double-taxation treaties?","Le Rwanda a-t-il des conventions de double imposition ?","卢旺达有双重征税条约吗？"),
            answer: L2(
              "Yes, Rwanda has DTAs with multiple countries and the list changes over time. DTAs can reduce withholding tax rates if claimed properly. Confirm the current list and process with RRA: https://www.rra.gov.rw.",
              "Oui, le Rwanda a des CDI avec plusieurs pays et la liste évolue. Les CDI peuvent réduire les taux de retenue à la source si elles sont correctement invoquées. Confirmez la liste actuelle et le processus avec la RRA : https://www.rra.gov.rw.",
              "是的，卢旺达与多个国家签有双边税收协定（DTA），且名单会随时间变化。如果正确申请，DTA可降低预扣税率。请向RRA确认当前名单和流程：https://www.rra.gov.rw。"
            )
          }
        ]
      },
      {
        id: "employment",
        title: L2("Employment and Human Resources","Emploi et Ressources Humaines","就业与人力资源"),
        items: [
          {
            question: L2("What are the basic labour rules I need to know?","Quelles sont les règles de base du droit du travail à connaître ?","我需要了解哪些基本劳动法规？"),
            answer: L2(
              "Key rules cover working hours, annual leave, termination notice, and due process for dismissal. Compliance matters because disputes can lead to damages for procedural errors. For official guidance, consult MINALOC/Labour or a qualified advisor.",
              "Les règles clés portent sur les heures de travail, les congés annuels, le préavis de licenciement et le processus régulier de licenciement. La conformité est importante car les litiges peuvent entraîner des dommages et intérêts pour des erreurs de procédure. Pour des conseils officiels, consultez le MINALOC/Travail ou un conseiller qualifié.",
              "关键规定涵盖工作时间、年假、解雇通知和解雇正当程序。合规很重要，因为纠纷可能因程序错误导致赔偿。如需官方指导，请咨询MINALOC/劳工部门或合格顾问。"
            )
          },
          {
            question: L2("Can I hire foreign staff?","Puis-je embaucher du personnel étranger ?","我可以雇用外国员工吗？"),
            answer: L2(
              "Yes, but each foreign hire generally needs a work permit, and you may need to justify specialized skills or knowledge-transfer needs. Work permits are managed through Irembo: https://irembo.gov.rw and DGIE: https://www.migration.gov.rw.",
              "Oui, mais chaque embauche étrangère a généralement besoin d'un permis de travail, et vous devrez peut-être justifier des compétences spécialisées ou des besoins de transfert de connaissances. Les permis de travail sont gérés via Irembo : https://irembo.gov.rw et la DGIE : https://www.migration.gov.rw.",
              "可以，但每位外国员工通常需要工作许可证，您可能需要证明其具有专业技能或知识转让需求。工作许可证通过Irembo：https://irembo.gov.rw和DGIE：https://www.migration.gov.rw管理。"
            )
          },
          {
            question: L2("What is the minimum wage?","Quel est le salaire minimum ?","最低工资是多少？"),
            answer: L2(
              "Rwanda does not always have a single universal minimum wage across all sectors; practical market rates vary. Always document payments and ensure PAYE and RSSB compliance where applicable. Check with RRA: https://www.rra.gov.rw and RSSB: https://www.rssb.rw.",
              "Le Rwanda n'a pas toujours de salaire minimum universel unique dans tous les secteurs ; les taux pratiques du marché varient. Documentez toujours les paiements et assurez la conformité au PAYE et au RSSB le cas échéant. Vérifiez avec la RRA : https://www.rra.gov.rw et le RSSB : https://www.rssb.rw.",
              "卢旺达并非在所有行业都有统一的最低工资标准；实际市场工资有所不同。请务必记录付款并确保适用时符合所得税代扣代缴和RSSB要求。请向RRA：https://www.rra.gov.rw和RSSB：https://www.rssb.rw咨询。"
            )
          },
          {
            question: L2("Are employment contracts mandatory?","Les contrats de travail sont-ils obligatoires ?","劳动合同是否为强制性要求？"),
            answer: L2(
              "For longer employment relationships, written contracts are strongly recommended and often required in practice. Contracts should be compliant and available for inspection. Bonet can draft compliant bilingual contracts and onboarding documents.",
              "Pour les relations d'emploi plus longues, les contrats écrits sont fortement recommandés et souvent exigés en pratique. Les contrats doivent être conformes et disponibles pour inspection. Bonet peut rédiger des contrats bilingues conformes et des documents d'intégration.",
              "对于较长的劳动关系，强烈建议并在实践中通常需要书面合同。合同应合规并可供检查。Bonet可以起草合规的双语合同和入职文件。"
            )
          }
        ]
      },
      {
        id: "housing",
        title: L2("Housing, Real Estate and Land","Logement, Immobilier et Foncier","住房、房地产和土地"),
        items: [
          {
            question: L2("Can foreigners buy property in Rwanda?","Les étrangers peuvent-ils acheter des biens immobiliers au Rwanda ?","外国人可以在卢旺达购买房产吗？"),
            answer: L2(
              "Foreigners can typically hold long-term land rights via leases (often up to 99 years, renewable) and can own buildings on that land. Rules can vary by structure-confirm via the National Land Authority: https://www.lands.rw.",
              "Les étrangers peuvent généralement détenir des droits fonciers à long terme via des baux (souvent jusqu'à 99 ans, renouvelable) et peuvent posséder des bâtiments sur ce terrain. Les règles peuvent varier selon la structure – confirmez via l'Autorité Nationale des Terres : https://www.lands.rw.",
              "外国人通常可以通过租约持有长期土地权利（通常最长99年，可续签），并可拥有该土地上的建筑物。规则可能因结构而异——请通过国家土地局确认：https://www.lands.rw。"
            )
          },
          {
            question: L2("How much should I budget for rent in Kigali?","Quel budget prévoir pour la location à Kigali ?","在基加利租房需要预算多少？"),
            answer: L2(
              "Rent varies widely by neighborhood, size, and furnishing. For current market ranges, consult local agents and verify what is included (utilities, security, generator/water tank).",
              "Le loyer varie considérablement selon le quartier, la taille et l'ameublement. Pour les fourchettes de prix actuelles du marché, consultez des agents locaux et vérifiez ce qui est inclus (services publics, sécurité, groupe électrogène/réservoir d'eau).",
              "租金因地区、面积和装修程度差异很大。请咨询当地中介了解当前市场价格范围，并确认包含哪些费用（水电、安保、发电机/水箱）。"
            )
          },
          {
            question: L2("Are leases negotiable?","Les baux sont-ils négociables ?","租约可以协商吗？"),
            answer: L2(
              "Yes. Typical terms are 12 months with upfront payment and a deposit. Always insist on a written contract, inventory list, and clarity on maintenance responsibilities.",
              "Oui. Les conditions habituelles sont de 12 mois avec paiement anticipé et un dépôt. Insistez toujours sur un contrat écrit, une liste d'inventaire et la clarté des responsabilités de maintenance.",
              "可以。典型条款为12个月，预付款加押金。务必坚持签订书面合同、提供物品清单，并明确维修责任。"
            )
          },
          {
            question: L2("How safe are the residential neighborhoods?","Les quartiers résidentiels sont-ils sûrs ?","住宅区的安全状况如何？"),
            answer: L2(
              "Kigali is widely considered one of the safer capital cities in the region. Popular expat areas are generally secure, but always do a site visit, confirm security arrangements, and choose a location that fits your routine.",
              "Kigali est largement considérée comme l'une des capitales les plus sûres de la région. Les quartiers expatriés populaires sont généralement sécurisés, mais faites toujours une visite sur place, confirmez les arrangements de sécurité et choisissez un emplacement qui correspond à votre routine.",
              "基加利被普遍认为是该地区最安全的首都之一。热门外籍人士聚居区通常较为安全，但请务必实地考察，确认安保安排，并选择适合您日常生活的位置。"
            )
          }
        ]
      },
      {
        id: "healthcare",
        title: L2("Healthcare and Insurance","Santé et Assurance","医疗保健与保险"),
        items: [
          {
            question: L2("Is the healthcare system foreigner-friendly?","Le système de santé est-il adapté aux étrangers ?","医疗系统对外国人友好吗？"),
            answer: L2(
              "Kigali has reliable private healthcare and pharmacies, with referral options for complex cases. If you need specialized treatment, many residents also travel abroad depending on the situation and insurance coverage.",
              "Kigali dispose d'une offre de soins privés et de pharmacies fiables, avec des options de référence pour les cas complexes. Si vous avez besoin d'un traitement spécialisé, de nombreux résidents voyagent également à l'étranger selon la situation et la couverture d'assurance.",
              "基加利拥有可靠的私人医疗机构和药店，复杂病例有转诊选项。如需专科治疗，许多居民也会根据情况和保险覆盖情况出国就医。"
            )
          },
          {
            question: L2("Do I need health insurance?","Ai-je besoin d'une assurance maladie ?","我需要购买健康保险吗？"),
            answer: L2(
              "Strongly recommended. Options include international cover (for regional/global treatment) and local private plans. Coverage requirements depend on your employer and immigration status, so confirm your best option before arrival.",
              "Fortement recommandé. Les options comprennent une couverture internationale (pour les soins régionaux/mondiaux) et des plans privés locaux. Les exigences de couverture dépendent de votre employeur et de votre statut d'immigration, alors confirmez la meilleure option avant votre arrivée.",
              "强烈建议购买。选项包括国际保险（用于区域/全球医疗）和当地私人保险计划。保险要求取决于您的雇主和移民状态，因此请在抵达前确认最佳选择。"
            )
          },
          {
            question: L2("What vaccinations and health prep do I need?","Quels vaccins et préparations sanitaires sont nécessaires ?","我需要接种哪些疫苗和做哪些健康准备？"),
            answer: L2(
              "Yellow fever proof may be required depending on your travel history. Common recommendations include Hep A/B, typhoid, tetanus, and routine boosters. For current entry requirements, verify with your airline and Rwanda border/health guidance.",
              "La preuve de vaccination contre la fièvre jaune peut être requise selon votre historique de voyage. Les recommandations courantes incluent l'hépatite A/B, la typhoïde, le tétanos et les rappels de routine. Pour les exigences d'entrée actuelles, vérifiez avec votre compagnie aérienne et les directives sanitaires rwandaises.",
              "根据您的旅行记录，可能需要提供黄热病疫苗接种证明。常见建议包括甲/乙型肝炎、伤寒、破伤风及常规加强疫苗。请向您的航空公司和卢旺达边境/卫生部门确认当前入境要求。"
            )
          }
        ]
      },
      {
        id: "education",
        title: L2("Education and Schools","Éducation et Écoles","教育与学校"),
        items: [
          {
            question: L2("What international schools operate in Kigali?","Quelles écoles internationales opèrent à Kigali ?","基加利有哪些国际学校？"),
            answer: L2(
              "Kigali has several international curriculum options (IB, American, French and others). Availability changes, so shortlist early and contact schools directly to confirm admissions windows and fees.",
              "Kigali offre plusieurs options de programmes internationaux (IB, américain, français et autres). La disponibilité change, donc établissez une liste restreinte tôt et contactez directement les écoles pour confirmer les périodes d'admission et les frais.",
              "基加利提供多种国际课程选择（IB、美国、法国等）。供应情况会有变化，因此请提前筛选并直接联系学校确认入学时间和费用。"
            )
          },
          {
            question: L2("Is enrollment competitive?","L'inscription est-elle concurrentielle ?","入学竞争激烈吗？"),
            answer: L2(
              "Yes for top schools. Apply well in advance and prepare transcripts, recommendations, interviews, and assessments as required by the school.",
              "Oui, pour les meilleures écoles. Faites votre demande bien à l'avance et préparez les relevés de notes, les lettres de recommandation, les entretiens et les évaluations requis par l'école.",
              "顶尖学校的入学竞争激烈。请提前申请，并按学校要求准备成绩单、推荐信、面试和评估材料。"
            )
          }
        ]
      },
      {
        id: "transport",
        title: L2("Transportation and Driving","Transport et Conduite","交通与驾驶"),
        items: [
          {
            question: L2("Can I drive with my foreign licence?","Puis-je conduire avec mon permis de conduire étranger ?","我可以使用外国驾照驾车吗？"),
            answer: L2(
              "You may be able to drive using an international driving permit (IDP) for a limited period, then convert to a Rwandan licence. For current conversion rules, confirm with Rwanda National Police: https://www.police.gov.rw.",
              "Vous pourriez être en mesure de conduire avec un permis de conduire international (IDP) pour une période limitée, puis de le convertir en permis rwandais. Pour les règles de conversion actuelles, confirmez avec la Police Nationale du Rwanda : https://www.police.gov.rw.",
              "您可以使用国际驾驶许可证（IDP）在有限期间内驾车，然后转换为卢旺达驾照。请向卢旺达国家警察确认当前转换规则：https://www.police.gov.rw。"
            )
          },
          {
            question: L2("Should I buy or rent a car?","Dois-je acheter ou louer une voiture ?","我应该购买还是租赁汽车？"),
            answer: L2(
              "If you'll stay long-term, buying can make sense, but import duties and landed costs must be calculated carefully. Short-term stays often work best with rentals or driver-included services.",
              "Si vous restez à long terme, l'achat peut être judicieux, mais les droits de douane et les coûts d'importation doivent être calculés soigneusement. Pour les séjours de courte durée, les locations ou les services avec chauffeur fonctionnent souvent mieux.",
              "如果您打算长期居留，购车可能是合理选择，但必须仔细计算进口税和到岸成本。短期居留通常更适合租车或包含司机的服务。"
            )
          },
          {
            question: L2("Are taxis and ride-hailing available?","Y a-t-il des taxis et des services de covoiturage disponibles ?","是否有出租车和网约车服务？"),
            answer: L2(
              "Yes. Kigali has taxi and ride services, and moto taxis are widely used. For safer, metered rides, use established platforms where available.",
              "Oui. Kigali dispose de services de taxi et de VTC, et les moto-taxis sont largement utilisés. Pour des trajets plus sûrs et tarifés, utilisez des plateformes établies lorsqu'elles sont disponibles.",
              "是的。基加利有出租车和网约车服务，摩托车出租车也被广泛使用。如需更安全、按计费的出行，请在可用时使用成熟的平台。"
            )
          },
          {
            question: L2("How is public transport?","Comment est le transport en commun ?","公共交通状况如何？"),
            answer: L2(
              "City buses cover many routes at low cost and use stored-value cards. Inter-city coaches are available for major towns. Availability and routes evolve, so check current operator schedules.",
              "Les bus de ville couvrent de nombreux trajets à faible coût et utilisent des cartes à valeur stockée. Des autobus inter-urbains sont disponibles pour les grandes villes. La disponibilité et les itinéraires évoluent, vérifiez donc les horaires actuels des opérateurs.",
              "市区公共汽车覆盖多条线路，费用低廉，使用储值卡。主要城镇之间有长途客车。供应情况和路线会有变化，请查看运营商的最新时刻表。"
            )
          }
        ]
      },
      {
        id: "utilities",
        title: L2("Utilities, Internet and Mobile","Services publics, Internet et Mobile","公用事业、互联网和移动通信"),
        items: [
          {
            question: L2("How do I get a SIM card?","Comment obtenir une carte SIM ?","如何获取SIM卡？"),
            answer: L2(
              "Bring your passport. SIMs are available at the airport and operator shops. Registration usually requires biometric capture. Activate mobile money if you will make everyday payments quickly.",
              "Apportez votre passeport. Les SIM sont disponibles à l'aéroport et dans les boutiques des opérateurs. L'enregistrement nécessite généralement une capture biométrique. Activez le mobile money si vous souhaitez effectuer rapidement des paiements quotidiens.",
              "携带护照。SIM卡在机场和运营商门店均有售。注册通常需要生物特征采集。如果您希望快速进行日常支付，请激活移动支付。"
            )
          },
          {
            question: L2("How fast and reliable is internet?","Internet est-il rapide et fiable ?","互联网速度和可靠性如何？"),
            answer: L2(
              "Kigali has fibre coverage in many areas and 4G/5G mobile data. Reliability is generally good, but outages happen-many residents keep a mobile data backup.",
              "Kigali dispose d'une couverture fibre dans de nombreuses zones et de données mobiles 4G/5G. La fiabilité est généralement bonne, mais des pannes surviennent – de nombreux résidents gardent une sauvegarde de données mobiles.",
              "基加利许多地区有光纤覆盖，以及4G/5G移动数据。可靠性通常较好，但偶有中断——许多居民备有移动数据作为备用。"
            )
          },
          {
            question: L2("How do I set up electricity and water?","Comment mettre en place l'électricité et l'eau ?","如何设置电力和供水？"),
            answer: L2(
              "Many rentals use prepaid meters. Top-ups can be done via mobile money. New connections for new builds take longer and require documentation and inspections depending on the provider.",
              "De nombreuses locations utilisent des compteurs prépayés. Les recharges peuvent être effectuées via le mobile money. Les nouvelles connexions pour les nouvelles constructions prennent plus de temps et nécessitent une documentation et des inspections selon le fournisseur.",
              "许多租赁房产使用预付费电表。可通过移动支付充值。新建筑的新连接需要更长时间，并根据供应商要求提供文件和进行检查。"
            )
          }
        ]
      },
      {
        id: "customs",
        title: L2("Customs, Imports and Relocation","Douanes, Importations et Relocalisation","海关、进口和搬迁"),
        items: [
          {
            question: L2("Can I import my household goods duty-free?","Puis-je importer mes biens ménagers en franchise de droits de douane ?","我可以免税进口家庭物品吗？"),
            answer: L2(
              "In some cases, yes, depending on your immigration status and timing. Customs rules change, so confirm eligibility and documentation requirements with RRA: https://www.rra.gov.rw and use a licensed clearing agent.",
              "Dans certains cas, oui, selon votre statut d'immigration et le moment. Les règles douanières changent, alors confirmez l'éligibilité et les exigences documentaires avec la RRA : https://www.rra.gov.rw et utilisez un agent en douane agréé.",
              "在某些情况下可以，取决于您的移民状态和时间安排。海关规则会有变化，请向RRA确认资格和文件要求：https://www.rra.gov.rw，并使用持牌清关代理。"
            )
          },
          {
            question: L2("What can I not bring in?","Qu'est-ce que je ne peux pas importer ?","有哪些物品不能带入卢旺达？"),
            answer: L2(
              "Plastic bags are banned. Some items (e.g., drones) may require clearance, and restricted goods exist. Always check RRA customs guidance before shipping: https://www.rra.gov.rw.",
              "Les sacs en plastique sont interdits. Certains articles (p. ex., drones) peuvent nécessiter un dédouanement, et des marchandises restreintes existent. Vérifiez toujours les directives douanières de la RRA avant d'expédier : https://www.rra.gov.rw.",
              "塑料袋被禁止。某些物品（例如无人机）可能需要清关，且存在限制商品。发货前请务必查阅RRA海关指南：https://www.rra.gov.rw。"
            )
          },
          {
            question: L2("How do I ship a container to Rwanda?","Comment expédier un conteneur au Rwanda ?","如何向卢旺达运送集装箱？"),
            answer: L2(
              "Most shipments route via regional ports and then move inland by road/rail. Lead times vary by origin and forwarder. Use a reputable forwarder with Rwanda-based agents and budget extra time for clearance.",
              "La plupart des expéditions passent par des ports régionaux puis se déplacent vers l'intérieur par route/rail. Les délais varient selon l'origine et le transitaire. Utilisez un transitaire réputé avec des agents basés au Rwanda et prévoyez du temps supplémentaire pour le dédouanement.",
              "大多数货运通过区域港口路由，然后经公路/铁路向内陆运输。提前期因货源地和货运代理而异。请使用在卢旺达设有代理的信誉良好的货运代理，并为清关预留额外时间。"
            )
          }
        ]
      },
      {
        id: "culture",
        title: L2("Culture, Language and Daily Life","Culture, Langue et Vie Quotidienne","文化、语言和日常生活"),
        items: [
          {
            question: L2("What languages do people speak?","Quelles langues les gens parlent-ils ?","当地人说什么语言？"),
            answer: L2(
              "Rwanda's official languages include Kinyarwanda, English, French and Swahili. English is widely used in government and business, but basic Kinyarwanda greetings help a lot in daily life.",
              "Les langues officielles du Rwanda sont le kinyarwanda, l'anglais, le français et le swahili. L'anglais est largement utilisé dans les administrations et les entreprises, mais quelques salutations de base en kinyarwanda aident beaucoup dans la vie quotidienne.",
              "卢旺达官方语言包括卢旺达语、英语、法语和斯瓦希里语。英语在政府和商业中广泛使用，但掌握基本的卢旺达语问候在日常生活中大有帮助。"
            )
          },
          {
            question: L2("Is Kigali safe for women, families and LGBTQ+ travelers?","Kigali est-elle sûre pour les femmes, les familles et les voyageurs LGBTQ+ ?","基加利对女性、家庭和LGBTQ+旅行者安全吗？"),
            answer: L2(
              "Kigali is generally very safe with low street crime. Rwanda is socially conservative-public displays of affection are uncommon. Use normal travel precautions and follow local norms.",
              "Kigali est généralement très sûre avec peu de criminalité de rue. Le Rwanda est socialement conservateur – les démonstrations publiques d'affection sont peu communes. Prenez les précautions de voyage habituelles et respectez les normes locales.",
              "基加利总体上非常安全，街头犯罪率低。卢旺达社会较为保守——公开表达感情并不常见。请采取正常旅行防范措施，遵守当地习俗。"
            )
          },
          {
            question: L2("What is Umuganda?","Qu'est-ce que l'Umuganda ?","什么是Umuganda？"),
            answer: L2(
              "Umuganda is monthly community service held on the last Saturday of the month (typically morning). Many shops close and traffic is restricted. Foreigners are welcome to participate in their neighborhood.",
              "L'Umuganda est un service communautaire mensuel organisé le dernier samedi du mois (généralement le matin). De nombreux commerces ferment et la circulation est restreinte. Les étrangers sont les bienvenus pour participer dans leur quartier.",
              "Umuganda是每月最后一个星期六举行的社区服务活动（通常在上午）。许多商店关闭，交通受到限制。外国人欢迎在其所在社区参与。"
            )
          },
          {
            question: L2("Are there cultural rules I should know?","Y a-t-il des règles culturelles que je devrais connaître ?","有哪些文化规则我应该了解？"),
            answer: L2(
              "Yes. Be respectful when discussing sensitive history, dress neatly for business settings, and follow local etiquette. When unsure, ask a local colleague or guide-Rwandans are generally helpful and direct.",
              "Oui. Soyez respectueux lorsque vous discutez d'histoire sensible, habillez-vous correctement dans les contextes professionnels et respectez l'étiquette locale. En cas de doute, demandez à un collègue ou guide local – les Rwandais sont généralement serviables et directs.",
              "是的。谈及敏感历史话题时请保持尊重，商务场合穿着整洁，并遵守当地礼仪。如有疑问，可询问当地同事或向导——卢旺达人通常乐于助人且直接坦诚。"
            )
          },
          {
            question: L2("What is the cost of living for a single professional?","Quel est le coût de la vie pour un professionnel célibataire ?","单身职业人士的生活成本如何？"),
            answer: L2(
              "Costs vary by rent and lifestyle. Imported groceries and international schooling are the biggest drivers; local transport and local food can be affordable. Create a budget based on your neighborhood and requirements.",
              "Les coûts varient selon le loyer et le style de vie. L'épicerie importée et la scolarisation internationale sont les plus grands facteurs ; les transports locaux et la nourriture locale peuvent être abordables. Créez un budget basé sur votre quartier et vos besoins.",
              "费用因租金和生活方式而异。进口食品和国际教育是最大的支出；当地交通和本地食品可以相当实惠。请根据您所在社区和需求制定预算。"
            )
          }
        ]
      },
      {
        id: "safety",
        title: L2("Safety, Emergencies and Legal Matters","Sécurité, Urgences et Questions Juridiques","安全、紧急情况和法律事务"),
        items: [
          {
            question: L2("What are the emergency numbers?","Quels sont les numéros d'urgence ?","紧急电话号码是什么？"),
            answer: L2(
              "Common numbers used in Rwanda include Police 112, Ambulance 912, Fire 111 and Traffic Accident 113. Save them on day one and confirm locally, as hotlines can change.",
              "Les numéros courants utilisés au Rwanda comprennent Police 112, Ambulance 912, Pompiers 111 et Accident de la route 113. Sauvegardez-les dès le premier jour et confirmez localement, car les numéros peuvent changer.",
              "卢旺达常用紧急号码：警察112、救护车912、消防111、交通事故113。请在第一天就保存这些号码，并在当地确认，因为热线号码可能会变更。"
            )
          },
          {
            question: L2("Where do I register with my embassy?","Où dois-je m'inscrire auprès de mon ambassade ?","我应该在哪里向我的大使馆登记？"),
            answer: L2(
              "Use your embassy's online consular registration (if offered) to register your presence. Kigali has many resident missions; check your embassy website for the correct registration process and emergency contacts.",
              "Utilisez l'enregistrement consulaire en ligne de votre ambassade (si disponible) pour enregistrer votre présence. Kigali abrite de nombreuses missions résidentes ; consultez le site de votre ambassade pour connaître le processus d'enregistrement correct et les contacts d'urgence.",
              "请使用您大使馆的在线领事登记（如有）登记您的存在。基加利设有许多常驻使团；请查阅您大使馆网站以了解正确的登记程序和紧急联系方式。"
            )
          },
          {
            question: L2("What if I have a legal dispute?","Que faire en cas de litige juridique ?","如果我有法律纠纷怎么办？"),
            answer: L2(
              "Commercial disputes can go through Rwanda's courts or arbitration. If you have a dispute, document everything and get professional legal advice early. Arbitration information: https://kiac.org.rw.",
              "Les litiges commerciaux peuvent passer par les tribunaux rwandais ou l'arbitrage. En cas de litige, documentez tout et obtenez des conseils juridiques professionnels rapidement. Informations sur l'arbitrage : https://kiac.org.rw.",
              "商业纠纷可通过卢旺达法院或仲裁解决。如有纠纷，请记录一切并尽早获得专业法律建议。仲裁信息：https://kiac.org.rw。"
            )
          },
          {
            question: L2("Is bribery a problem?","La corruption est-elle un problème ?","贿赂是个问题吗？"),
            answer: L2(
              "Rwanda has a strong anti-corruption stance. Do not offer informal payments-this is illegal and risky for your status. If you face issues, follow formal complaint/reporting channels.",
              "Le Rwanda a une position ferme contre la corruption. N'offrez pas de paiements informels – c'est illégal et risqué pour votre statut. Si vous rencontrez des problèmes, suivez les canaux officiels de plainte/signalement.",
              "卢旺达具有强烈的反腐立场。请勿进行非正式付款——这是非法的，会危及您的身份。如遇问题，请通过正式投诉/举报渠道处理。"
            )
          }
        ]
      }
    ];
  }, [i18n.language]);

  const bonetHelp = useMemo(() => {
    const L2 = (en: string, fr: string, ch: string) =>
      i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
    return {
      description: L2(
        "Bonet Elite Services Ltd is Kigali-based and helps foreigners make Rwanda work-end-to-end, in English, French and Chinese.",
        "Bonet Elite Services Ltd est basée à Kigali et aide les étrangers à s'établir au Rwanda, de bout en bout, en anglais, en français et en chinois.",
        "Bonet精英服务有限公司总部位于基加利，提供全方位服务，帮助外国人在卢旺达工作和生活，服务语言涵盖英语、法语和中文。"
      ),
      services: [
        L2("Visa, work permit and residence permit applications and renewals","Demandes et renouvellements de visas, permis de travail et de résidence","签证、工作许可证和居留许可的申请及续签"),
        L2("Company registration with RDB and TIN setup with RRA","Enregistrement de société auprès du RDB et obtention du NIF auprès de la RRA","在RDB注册公司及在RRA办理税务识别号"),
        L2("Investment certificate and incentive applications","Demandes de certificat d'investissement et d'incitations","投资证书和激励措施申请"),
        L2("Bank account opening (corporate and personal)","Ouverture de compte bancaire (entreprise et personnel)","开设银行账户（企业和个人）"),
        L2("Tax registration, monthly compliance and accounting","Enregistrement fiscal, conformité mensuelle et comptabilité","税务注册、月度合规和会计服务"),
        L2("HR, payroll, recruitment and contract drafting","RH, paie, recrutement et rédaction de contrats","人力资源、薪资、招聘和合同起草"),
        L2("Office and home search, lease negotiation, utilities setup","Recherche de bureaux et de logements, négociation de baux, mise en place des services","寻找办公室和住宅、租约谈判、公用事业设置"),
        L2("Driver's licence conversion and car purchase support","Conversion de permis de conduire et assistance à l'achat de véhicule","驾照转换和购车支持"),
        L2("School search and enrollment for accompanying children","Recherche d'école et inscription pour les enfants accompagnants","为随行子女寻找学校并办理入学手续"),
        L2("Executive travel, airport pickup, and concierge support","Voyages d'affaires, accueil à l'aéroport et services de conciergerie","商务旅行、机场接送和礼宾服务"),
      ],
    };
  }, [i18n.language]);

  const officialLinks = useMemo(() => {
    const L2 = (en: string, fr: string, ch: string) =>
      i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en;
    return [
      { label: L2("Irembo (one-stop government services)","Irembo (guichet unique des services gouvernementaux)","Irembo（政府一站式服务）"), href: "https://irembo.gov.rw" },
      { label: "Rwanda Development Board (RDB)", href: "https://rdb.rw" },
      { label: L2("Directorate General of Immigration & Emigration (DGIE)","Direction Générale de l'Immigration et de l'Émigration (DGIE)","移民局总局（DGIE）"), href: "https://www.migration.gov.rw" },
      { label: L2("Rwanda Revenue Authority (RRA)","Office Rwandais des Impôts (RRA)","卢旺达税务局（RRA）"), href: "https://www.rra.gov.rw" },
      { label: L2("National Bank of Rwanda (BNR)","Banque Nationale du Rwanda (BNR)","卢旺达国家银行（BNR）"), href: "https://www.bnr.rw" },
      { label: L2("Rwanda Social Security Board (RSSB)","Caisse Nationale de Sécurité Sociale du Rwanda (RSSB)","卢旺达社会保障委员会（RSSB）"), href: "https://www.rssb.rw" },
      { label: L2("National Land Authority (NLA)","Autorité Nationale des Terres (NLA)","国家土地局（NLA）"), href: "https://www.lands.rw" },
      { label: "Kigali International Financial Centre (KIFC)", href: "https://kifc.rw" },
      { label: L2("Rwanda National Police","Police Nationale du Rwanda","卢旺达国家警察"), href: "https://www.police.gov.rw" },
      { label: L2("Rwanda Investigation Bureau (RIB)","Bureau d'Investigation du Rwanda (RIB)","卢旺达调查局（RIB）"), href: "https://www.rib.gov.rw" },
      { label: L2("Kigali International Arbitration Centre (KIAC)","Centre International d'Arbitrage de Kigali (KIAC)","基加利国际仲裁中心（KIAC）"), href: "https://kiac.org.rw" },
    ];
  }, [i18n.language]);

  const allItems = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.items.map((item) => ({ ...item, categoryId: cat.id, categoryTitle: cat.title }))
    );
  }, [categories]);

  const filteredItems = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q)
    );
  }, [allItems, searchTerm]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="top" className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: allItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />

      <div className="relative w-full h-[20vh] sm:h-[30vh] bg-gray-900 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/image/3.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="w-2 h-2 bg-[#C9A84C] rotate-45 mb-4" />
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{t("faqPage.subtitle")}</p>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wider">{t("faqPage.title")}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-lg p-4 flex items-center gap-3 border border-gray-300">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t("faqPage.search_placeholder")}
            className="flex-1 outline-none text-gray-800 bg-transparent text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-10">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-semibold text-gray-900 mb-3">{t("faqPage.browse_label")}</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-3 py-1.5 border border-gray-200 text-sm text-gray-700 hover:border-gray-300 transition-colors rounded"
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {searchTerm.trim() ? (
          <div className="space-y-4">
            {filteredItems.map((faq, index) => (
              <div key={`${faq.categoryId}-${index}`} className="bg-white rounded-lg border border-gray-200">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="pr-4">
                    <div className="text-xs font-semibold text-[#C9A84C] mb-1">{faq.categoryTitle}</div>
                    <div className="font-semibold text-gray-900 text-sm">{faq.question}</div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.answer}</div>
                )}
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-sm">{t("faqPage.no_results")}</div>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((cat) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-24">
                <div className="flex items-end justify-between gap-4 mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">{cat.title}</h2>
                  <a href="#top" className="text-sm text-gray-500 hover:text-gray-900">{t("faqPage.back_to_top")}</a>
                </div>
                <div className="space-y-3">
                  {cat.items.map((faq, index) => {
                    const globalIndex = allItems.findIndex(
                      (x) => x.categoryId === cat.id && x.question === faq.question
                    );
                    return (
                      <div key={index} className="bg-white rounded-lg border border-gray-200">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full flex items-center justify-between p-5 text-left"
                        >
                          <span className="font-semibold text-gray-900 text-sm pr-4">{faq.question}</span>
                          <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openIndex === globalIndex ? "rotate-180" : ""}`} />
                        </button>
                        {openIndex === globalIndex && (
                          <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.answer}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{t("faqPage.how_bonet_title")}</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">{bonetHelp.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bonetHelp.services.map((service, i) => (
              <div key={i} className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 text-[#C9A84C] flex-shrink-0" />
                <span className="text-sm text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{t("faqPage.official_links_title")}</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">{t("faqPage.official_links_desc")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {officialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-gray-800 hover:text-[#C9A84C] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-900 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[#C9A84C] text-xs font-bold uppercase mb-3 tracking-wider">{t("faqPage.support_label")}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{t("faqPage.support_title")}</h2>
          <p className="text-white/75 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">{t("faqPage.support_desc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#B8973B] transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              {t("faqPage.contact_us")}
            </a>
            <a
              href="https://wa.me/250726300260"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              {t("faqPage.whatsapp")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
