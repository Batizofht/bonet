import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock } from "lucide-react";
import { MARKETS, getMarket } from "@/content/insights/markets";
import { articlesFor, articleUrl, uiFor, formatDate } from "@/content/insights";
import { Breadcrumbs, CtaBand, ButtonLink, WhatsAppButton, JsonLd } from "@/components/ui/kit";

export const dynamicParams = false;

export function generateStaticParams() {
  return MARKETS.map((m) => ({ market: m.slug }));
}

type Props = { params: Promise<{ market: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { market } = await params;
  const m = getMarket(market);
  if (!m) return {};
  const url = `https://bonet.rw/${m.slug}`;
  return {
    title: { absolute: `${m.hub.metaTitle} | Bonet Elite` },
    description: m.hub.description,
    keywords: m.hub.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: m.hub.metaTitle,
      description: m.hub.description,
      siteName: "Bonet Elite Services",
      locale: m.ogLocale,
      images: [{ url: `https://bonet.rw${m.image}`, alt: m.hub.title }],
    },
    twitter: { card: "summary_large_image", title: m.hub.metaTitle, description: m.hub.description, images: [`https://bonet.rw${m.image}`] },
  };
}

export default async function MarketHub({ params }: Props) {
  const { market } = await params;
  const m = getMarket(market);
  if (!m) notFound();
  const list = articlesFor(m.slug);
  const [lead, ...rest] = list;
  const ui = uiFor(m.lang);

  return (
    <div lang={m.lang}>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: m.hub.title,
            description: m.hub.description,
            url: `https://bonet.rw/${m.slug}`,
            inLanguage: m.lang,
            publisher: { "@id": "https://bonet.rw/#organization" },
            hasPart: list.map((a) => ({ "@type": "Article", headline: a.title, url: `https://bonet.rw${articleUrl(a)}`, inLanguage: a.lang })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: m.hub.home, item: "https://bonet.rw/" },
              { "@type": "ListItem", position: 2, name: m.hub.eyebrow, item: `https://bonet.rw/${m.slug}` },
            ],
          },
        ]}
      />

      <section className="relative isolate overflow-hidden bg-ink-950 text-white">
        <Image src={m.image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/95 via-ink-950/80 to-ink-950/40" />
        <div className="container-x pb-16 pt-16 md:pb-24 md:pt-24">
          <Breadcrumbs light items={[{ name: m.hub.home, href: "/" }, { name: m.hub.eyebrow }]} />
          <p className="eyebrow eyebrow-light mt-8">{m.hub.eyebrow}</p>
          <h1 className="h-display mt-3 max-w-3xl !text-white text-[2.1rem] sm:text-[2.6rem] md:text-[3.1rem]">{m.hub.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{m.hub.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg">{m.hub.ctaButton}</ButtonLink>
            <WhatsAppButton variant="ghost-light" className="btn-lg">WhatsApp</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="container-x">
          {lead && (
            <Link href={articleUrl(lead)} className="card card-hover group grid overflow-hidden lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[400px]">
                <Image src={lead.image} alt={lead.imageAlt} fill sizes="(min-width: 1024px) 660px, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <p className="eyebrow">{lead.category}</p>
                <h2 className="mt-3 text-[1.5rem] font-semibold leading-snug text-ink-900 group-hover:text-gold-700 md:text-[1.8rem]">{lead.title}</h2>
                <p className="mt-5 text-[15.5px] leading-relaxed text-ink-600">{lead.description}</p>
                <p className="mt-6 flex items-center gap-4 text-[13px] text-ink-500">
                  <time dateTime={lead.date}>{formatDate(lead.date, lead.lang)}</time>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{lead.readMinutes} {uiFor(lead.lang).min}</span>
                </p>
                <span className="link-arrow mt-8 self-start">{m.hub.readLabel}<ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </Link>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {rest.map((a) => (
              <Link key={a.slug} href={articleUrl(a)} className="group card card-hover flex flex-col overflow-hidden" lang={a.lang}>
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width: 1024px) 300px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-gold-700">{a.category}</p>
                  <h3 className="mt-2 text-[1.05rem] font-semibold leading-snug text-ink-900 group-hover:text-gold-700">{a.title}</h3>
                  <p className="mt-auto pt-5 text-[13px] text-ink-500">{a.readMinutes} {uiFor(a.lang).min}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 border-t border-line pt-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-500">{ui.insights}</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {MARKETS.filter((x) => x.slug !== m.slug).map((x) => (
                <Link key={x.slug} href={`/${x.slug}`} className="rounded-md border border-line bg-white px-4 py-2 text-[14px] font-medium text-ink-800 transition-colors hover:border-ink-900">
                  {x.hub.eyebrow}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        image={m.image}
        title={m.hub.ctaTitle}
        lead={m.hub.ctaLead}
        actions={
          <>
            <ButtonLink href="/contact" size="lg">{m.hub.ctaButton}</ButtonLink>
            <WhatsAppButton variant="ghost-light" className="btn-lg">WhatsApp</WhatsAppButton>
          </>
        }
      />
    </div>
  );
}
