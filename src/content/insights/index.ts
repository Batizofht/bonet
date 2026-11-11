import type { Article } from "./types";
import { US_ARTICLES } from "./us";
import { UK_ARTICLES } from "./uk";
import { FRANCE_ARTICLES } from "./france";
import { EUROPE_ARTICLES } from "./europe";
import { DE_ARTICLES } from "./deutschland";
import { BE_ARTICLES } from "./belgique";

export const ALL_ARTICLES: Article[] = [
  ...US_ARTICLES,
  ...UK_ARTICLES,
  ...FRANCE_ARTICLES,
  ...EUROPE_ARTICLES,
  ...DE_ARTICLES,
  ...BE_ARTICLES,
];

export const articlesFor = (market: string) => ALL_ARTICLES.filter((a) => a.market === market);

export const getArticle = (market: string, slug: string) =>
  ALL_ARTICLES.find((a) => a.market === market && a.slug === slug);

export const articleUrl = (a: Pick<Article, "market" | "slug">) => `/${a.market}/${a.slug}`;

/** UI strings for the article template, by language prefix */
export const UI: Record<string, Record<string, string>> = {
  en: {
    home: "Home",
    insights: "Insights",
    published: "Published",
    min: "min read",
    onPage: "On this page",
    faq: "Frequently asked questions",
    related: "More guides for you",
    by: "By the Bonet Elite Services team, Kigali",
    ctaTitle: "Turn this guide into a plan",
    ctaLead: "Book a free 30-minute consultation. We reply on WhatsApp the same day.",
    ctaPrimary: "Book a free consultation",
    service: "Related service",
    disclaimer: "This guide is general information, not legal or tax advice. Rules change; we confirm current requirements with RDB, RRA and DGIE for every client.",
  },
  fr: {
    home: "Accueil",
    insights: "Guides",
    published: "Publié le",
    min: "min de lecture",
    onPage: "Sommaire",
    faq: "Questions fréquentes",
    related: "À lire aussi",
    by: "Par l’équipe Bonet Elite Services, Kigali",
    ctaTitle: "Passez du guide au plan d’action",
    ctaLead: "Réservez une consultation gratuite de 30 minutes. Réponse sur WhatsApp le jour même.",
    ctaPrimary: "Consultation gratuite",
    service: "Service associé",
    disclaimer: "Ce guide est une information générale, pas un conseil juridique ou fiscal. Les règles évoluent : nous vérifions les exigences en vigueur auprès du RDB, de la RRA et de la DGIE pour chaque client.",
  },
  de: {
    home: "Startseite",
    insights: "Leitfäden",
    published: "Veröffentlicht am",
    min: "Min. Lesezeit",
    onPage: "Inhalt",
    faq: "Häufige Fragen",
    related: "Weitere Leitfäden",
    by: "Vom Team von Bonet Elite Services, Kigali",
    ctaTitle: "Vom Leitfaden zum konkreten Plan",
    ctaLead: "Buchen Sie ein kostenloses 30-minütiges Erstgespräch. Antwort per WhatsApp noch am selben Tag.",
    ctaPrimary: "Kostenloses Erstgespräch",
    service: "Passende Leistung",
    disclaimer: "Dieser Leitfaden ist eine allgemeine Information und keine Rechts- oder Steuerberatung. Vorschriften ändern sich; wir prüfen die aktuellen Anforderungen bei RDB, RRA und DGIE für jeden Mandanten.",
  },
  nl: {
    home: "Home",
    insights: "Gidsen",
    published: "Gepubliceerd op",
    min: "min leestijd",
    onPage: "Inhoud",
    faq: "Veelgestelde vragen",
    related: "Lees ook",
    by: "Door het team van Bonet Elite Services, Kigali",
    ctaTitle: "Van gids naar concreet plan",
    ctaLead: "Boek een gratis gesprek van 30 minuten. Antwoord via WhatsApp op dezelfde dag.",
    ctaPrimary: "Gratis gesprek",
    service: "Bijbehorende dienst",
    disclaimer: "Deze gids is algemene informatie, geen juridisch of fiscaal advies. Regels veranderen; wij controleren de geldende vereisten bij RDB, RRA en DGIE voor elke klant.",
  },
};

export const uiFor = (lang: string) => UI[lang.slice(0, 2)] ?? UI.en;

export function formatDate(iso: string, lang: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString(lang, { year: "numeric", month: "long", day: "numeric" });
}
