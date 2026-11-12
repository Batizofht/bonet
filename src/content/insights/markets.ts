/**
 * The six market hubs. Each hub holds five articles written for that
 * audience, in that audience's language. URL = /{slug}/{article-slug}.
 */
export type MarketSlug = "us" | "uk" | "france" | "europe" | "deutschland" | "belgique";

export type Market = {
  slug: MarketSlug;
  /** Name shown in English UI (nav, footer) */
  name: string;
  /** Name in the market's own language */
  localName: string;
  /** Primary BCP-47 language of the hub page */
  lang: string;
  /** OpenGraph locale */
  ogLocale: string;
  /** Hub page copy, in the hub's language */
  hub: {
    title: string;
    metaTitle: string;
    description: string;
    eyebrow: string;
    intro: string;
    keywords: string[];
    readLabel: string;
    allLabel: string;
    ctaTitle: string;
    ctaLead: string;
    ctaButton: string;
    home: string;
  };
  image: string;
};

export const MARKETS: Market[] = [
  {
    slug: "us",
    name: "United States",
    localName: "United States",
    lang: "en-US",
    ogLocale: "en_US",
    image: "/assets/photos/kcc-aerial.jpg",
    hub: {
      title: "Investing in Rwanda from the United States",
      metaTitle: "Invest in Rwanda from the USA: Investor Guides",
      description:
        "Practical guides for American investors and founders: registering a company in Rwanda, tax incentives, best sectors and relocating to Kigali.",
      eyebrow: "Guides for US investors",
      intro:
        "Rwanda is one of the few African markets where a US founder can register a company online, own it 100%, and be operating within days. These guides answer the questions American investors ask us most.",
      keywords: ["invest in Rwanda from USA", "Rwanda investment for Americans", "US company Rwanda", "Kigali business setup"],
      readLabel: "Read the guide",
      allLabel: "All US guides",
      ctaTitle: "Planning a Rwanda investment from the US?",
      ctaLead: "Book a free 30-minute call. We work on US time zones and reply on WhatsApp the same day.",
      ctaButton: "Book a free consultation",
      home: "Home",
    },
  },
  {
    slug: "uk",
    name: "United Kingdom",
    localName: "United Kingdom",
    lang: "en-GB",
    ogLocale: "en_GB",
    image: "/assets/images/kiga1.jpeg",
    hub: {
      title: "Doing business in Rwanda from London and the UK",
      metaTitle: "Rwanda Business Guides for UK Companies",
      description:
        "Guides for London and UK businesses expanding to Rwanda: subsidiaries vs branches, UK trade access, hiring, and business travel to Kigali.",
      eyebrow: "Guides for UK businesses",
      intro:
        "English-speaking, Commonwealth member, and one flight from Heathrow: Rwanda is a natural first East African base for UK companies. Here is what London teams need to know.",
      keywords: ["Rwanda business UK", "invest in Rwanda from London", "UK company Rwanda subsidiary", "Kigali business travel London"],
      readLabel: "Read the guide",
      allLabel: "All UK guides",
      ctaTitle: "Expanding from the UK to Rwanda?",
      ctaLead: "Talk to our Kigali team. A free 30-minute call gives you a clear setup plan, timeline and costs.",
      ctaButton: "Book a free consultation",
      home: "Home",
    },
  },
  {
    slug: "france",
    name: "France",
    localName: "France",
    lang: "fr-FR",
    ogLocale: "fr_FR",
    image: "/assets/photos/car-free-zone.jpg",
    hub: {
      title: "Investir au Rwanda depuis la France",
      metaTitle: "Investir au Rwanda : guides pour les Français",
      description:
        "Guides pratiques pour les investisseurs et entreprises françaises : créer une société au Rwanda, fiscalité, incitations, expatriation à Kigali.",
      eyebrow: "Guides pour la France",
      intro:
        "Le français est une langue officielle du Rwanda, l’administration y est rapide et transparente, et Kigali s’impose comme une porte d’entrée vers l’Afrique de l’Est. Nos guides répondent aux questions des entrepreneurs français.",
      keywords: ["investir au Rwanda", "créer une entreprise au Rwanda", "Rwanda entreprise française", "s'installer à Kigali"],
      readLabel: "Lire le guide",
      allLabel: "Tous les guides France",
      ctaTitle: "Un projet au Rwanda depuis la France ?",
      ctaLead: "Réservez un appel gratuit de 30 minutes avec notre équipe francophone à Kigali.",
      ctaButton: "Consultation gratuite",
      home: "Accueil",
    },
  },
  {
    slug: "europe",
    name: "Europe",
    localName: "Europe",
    lang: "en",
    ogLocale: "en_IE",
    image: "/assets/images/cert.jpg",
    hub: {
      title: "Rwanda for European investors",
      metaTitle: "Investing in Rwanda: Guides for European Companies",
      description:
        "Guides for European companies looking at Rwanda: EU trade access, regional headquarters in Kigali, green investment and compliance.",
      eyebrow: "Guides for Europe",
      intro:
        "From Amsterdam to Zurich, European firms are using Kigali as a stable, well-governed base for East Africa. These guides cover the questions that come up in boardrooms across the EU.",
      keywords: ["invest in Rwanda Europe", "European company Rwanda", "EU Rwanda trade", "Kigali regional headquarters"],
      readLabel: "Read the guide",
      allLabel: "All Europe guides",
      ctaTitle: "Evaluating Rwanda for your European company?",
      ctaLead: "We prepare a setup roadmap, cost estimate and incentive check in a free 30-minute call.",
      ctaButton: "Book a free consultation",
      home: "Home",
    },
  },
  {
    slug: "deutschland",
    name: "Germany",
    localName: "Deutschland",
    lang: "de-DE",
    ogLocale: "de_DE",
    image: "/assets/images/manu.jpg",
    hub: {
      title: "In Ruanda investieren: Leitfäden für deutsche Unternehmen",
      metaTitle: "In Ruanda investieren: Leitfäden für Firmen",
      description:
        "Praxisleitfäden für deutsche Unternehmen und Investoren: Firmengründung in Ruanda, Steuervorteile, Fachkräfte und Geschäftsreisen nach Kigali.",
      eyebrow: "Leitfäden für Deutschland",
      intro:
        "Rheinland-Pfalz pflegt seit 1982 eine Partnerschaft mit Ruanda, BioNTech und Volkswagen sind bereits in Kigali aktiv. Unsere Leitfäden beantworten die Fragen, die deutsche Mittelständler uns am häufigsten stellen.",
      keywords: ["in Ruanda investieren", "Firmengründung Ruanda", "Ruanda Unternehmen gründen", "Geschäftsreise Kigali"],
      readLabel: "Zum Leitfaden",
      allLabel: "Alle Leitfäden",
      ctaTitle: "Sie planen ein Projekt in Ruanda?",
      ctaLead: "Buchen Sie ein kostenloses 30-minütiges Erstgespräch mit unserem Team in Kigali (auf Englisch oder Französisch).",
      ctaButton: "Kostenloses Erstgespräch",
      home: "Startseite",
    },
  },
  {
    slug: "belgique",
    name: "Belgium",
    localName: "Belgique / België",
    lang: "fr-BE",
    ogLocale: "fr_BE",
    image: "/assets/images/rra1.jpg",
    hub: {
      title: "Investir au Rwanda depuis la Belgique · Investeren in Rwanda vanuit België",
      metaTitle: "Investir au Rwanda depuis la Belgique",
      description:
        "Guides pour entrepreneurs belges et la diaspora rwandaise de Belgique (FR) et gidsen voor Vlaamse ondernemers (NL) : société, fiscalité, investissement.",
      eyebrow: "Belgique · België",
      intro:
        "La Belgique compte l’une des plus grandes diasporas rwandaises d’Europe et des liens économiques anciens. Nos guides en français et en néerlandais répondent aux questions des entrepreneurs belges.",
      keywords: ["investir au Rwanda Belgique", "investeren in Rwanda", "bedrijf oprichten Rwanda", "diaspora rwandaise Belgique"],
      readLabel: "Lire · Lezen",
      allLabel: "Tous les guides · Alle gidsen",
      ctaTitle: "Un projet au Rwanda ? Een project in Rwanda?",
      ctaLead: "Appel gratuit de 30 minutes avec notre équipe à Kigali, en français ou en anglais.",
      ctaButton: "Consultation gratuite",
      home: "Accueil",
    },
  },
];

export const getMarket = (slug: string) => MARKETS.find((m) => m.slug === slug);
