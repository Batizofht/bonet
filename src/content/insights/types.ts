import type { MarketSlug } from "./markets";

export type Article = {
  market: MarketSlug;
  slug: string;
  /** BCP-47, e.g. en-US, fr-FR, de-DE, nl-BE */
  lang: string;
  /** H1 on the page */
  title: string;
  /** <title> — keep under ~60 characters, brand is appended */
  metaTitle: string;
  /** Meta description — 140–160 characters */
  description: string;
  keywords: string[];
  /** Short label shown above the title */
  category: string;
  /** ISO date */
  date: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  /** Lightweight markdown: ## h2, ### h3, paragraphs, - / 1. lists, > quote, | tables |, **bold**, [link](/path) */
  body: string;
  faqs: { q: string; a: string }[];
  /** Service page most relevant to the article */
  service: { href: string; label: string };
};
