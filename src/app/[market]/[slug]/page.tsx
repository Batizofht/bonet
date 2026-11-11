import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Clock, CalendarDays } from "lucide-react";
import { getMarket } from "@/content/insights/markets";
import { ALL_ARTICLES, articlesFor, articleUrl, getArticle, uiFor, formatDate } from "@/content/insights";
import Markdown, { headingsOf } from "@/components/insights/Markdown";
import { creditFor, LICENSE_URL } from "@/content/photo-credits";
import { Breadcrumbs, ButtonLink, WhatsAppButton, FaqList, JsonLd } from "@/components/ui/kit";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_ARTICLES.map((a) => ({ market: a.market, slug: a.slug }));
}

type Props = { params: Promise<{ market: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { market, slug } = await params;
  const a = getArticle(market, slug);
  const m = getMarket(market);
  if (!a || !m) return {};
  const url = `https://bonet.rw${articleUrl(a)}`;
  const image = `https://bonet.rw${a.image}`;
  return {
    title: { absolute: `${a.metaTitle} | Bonet Elite` },
    description: a.description,
    keywords: a.keywords,
    authors: [{ name: "Bonet Elite Services", url: "https://bonet.rw/about" }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: a.metaTitle,
      description: a.description,
      siteName: "Bonet Elite Services",
      locale: a.lang.replace("-", "_"),
      publishedTime: a.date,
      modifiedTime: a.date,
      section: a.category,
      tags: a.keywords,
      images: [{ url: image, alt: a.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: a.metaTitle, description: a.description, images: [image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { market, slug } = await params;
  const a = getArticle(market, slug);
  const m = getMarket(market);
  if (!a || !m) notFound();

  const ui = uiFor(a.lang);
  const toc = headingsOf(a.body);
  const related = articlesFor(m.slug).filter((x) => x.slug !== a.slug).slice(0, 3);
  const url = `https://bonet.rw${articleUrl(a)}`;
  const words = a.body.split(/\s+/).length;
  const credit = creditFor(a.image);

  return (
    <article lang={a.lang} className="bg-white">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.description,
            image: [`https://bonet.rw${a.image}`],
            datePublished: a.date,
            dateModified: a.date,
            inLanguage: a.lang,
            wordCount: words,
            articleSection: a.category,
            keywords: a.keywords.join(", "),
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            author: { "@type": "Organization", name: "Bonet Elite Services", url: "https://bonet.rw/about" },
            publisher: {
              "@type": "Organization",
              "@id": "https://bonet.rw/#organization",
              name: "Bonet Elite Services",
              logo: { "@type": "ImageObject", url: "https://bonet.rw/assets/images/bonet-logo.png" },
            },
            about: { "@type": "Country", name: "Rwanda" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: ui.home, item: "https://bonet.rw/" },
              { "@type": "ListItem", position: 2, name: m.hub.eyebrow, item: `https://bonet.rw/${m.slug}` },
              { "@type": "ListItem", position: 3, name: a.title, item: url },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: a.lang,
            mainEntity: a.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      {/* Header */}
      <header className="bg-white">
        <div className="container-x pb-10 pt-10 md:pb-12 md:pt-14">
          <Breadcrumbs items={[{ name: ui.home, href: "/" }, { name: m.hub.eyebrow, href: `/${m.slug}` }, { name: a.category }]} />
          <div className="mt-8 max-w-[860px]">
            <p className="eyebrow">{a.category}</p>
            <h1 className="h-display mt-3 text-[1.9rem] sm:text-[2.3rem] md:text-[2.75rem]">{a.title}</h1>
            <p className="mt-5 max-w-3xl text-[1.08rem] leading-relaxed text-ink-500">{a.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-ink-500">
              <span className="font-medium text-ink-700">{ui.by}</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{ui.published} <time dateTime={a.date}>{formatDate(a.date, a.lang)}</time></span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{a.readMinutes} {ui.min}</span>
            </div>
          </div>
        </div>
        <div className="container-x">
          <figure>
            <div className="relative aspect-[16/8] overflow-hidden rounded-[10px] md:aspect-[16/7]">
              <Image src={a.image} alt={a.imageAlt} fill priority sizes="(min-width: 1240px) 1160px, 100vw" className="object-cover" />
            </div>
            {credit && (
              <figcaption className="mt-2 text-right text-[12px] text-ink-400">
                Photo: {credit.author} ·{" "}
                <a href={LICENSE_URL[credit.license]} target="_blank" rel="noopener noreferrer license" className="hover:text-ink-700">{credit.license}</a>
              </figcaption>
            )}
          </figure>
        </div>
        <div className="h-12 md:h-16" />
      </header>

      {/* Body */}
      <div className="container-x grid gap-12 pb-20 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
        <div className="mx-auto w-full max-w-[720px] lg:mx-0">
          <Markdown source={a.body} />

          <section className="mt-16">
            <h2 className="text-[1.6rem] font-semibold text-ink-900">{ui.faq}</h2>
            <FaqList className="mt-6" items={a.faqs} />
          </section>

          <div className="mt-14 rounded-[10px] bg-ink-900 p-8 text-white md:p-10">
            <p className="font-display text-[1.4rem] font-semibold leading-snug">{ui.ctaTitle}</p>
            <p className="mt-3 text-white/70">{ui.ctaLead}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/contact">{ui.ctaPrimary}</ButtonLink>
              <WhatsAppButton variant="ghost-light">WhatsApp</WhatsAppButton>
            </div>
          </div>

          <p className="mt-8 text-[13px] leading-relaxed text-ink-400">{ui.disclaimer}</p>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            {toc.length > 0 && (
              <nav aria-label={ui.onPage} className="border-l-2 border-line pl-5">
                <p className="eyebrow">{ui.onPage}</p>
                <ol className="mt-4 space-y-2.5">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="block text-[14px] leading-snug text-ink-600 transition-colors hover:text-ink-900">{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <Link href={a.service.href} className="card card-hover group block p-6">
              <p className="eyebrow">{ui.service}</p>
              <p className="mt-2 text-[1.05rem] font-semibold leading-snug text-ink-900 group-hover:text-gold-700">{a.service.label}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[13px] font-semibold text-ink-900">
                {ui.ctaPrimary} <ArrowRight className="h-3.5 w-3.5 text-gold-600" />
              </span>
            </Link>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-ivory py-16 md:py-20">
          <div className="container-x">
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2 className="h-display text-[1.6rem] md:text-[2rem]">{ui.related}</h2>
              <Link href={`/${m.slug}`} className="link-arrow hidden shrink-0 sm:inline-flex">{m.hub.allLabel}<ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={articleUrl(r)} className="group card card-hover overflow-hidden" lang={r.lang}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                    <Image src={r.image} alt={r.imageAlt} fill sizes="(min-width: 768px) 380px, 100vw" className="object-cover" />
                  </div>
                  <div className="p-6">
                    <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-gold-700">{r.category}</p>
                    <h3 className="mt-2 text-[1.05rem] font-semibold leading-snug text-ink-900 group-hover:text-gold-700">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
