import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ALL_ARTICLES, articleUrl } from "@/content/insights";
import { getMarket } from "@/content/insights/markets";

/**
 * Server-rendered links from a service page to the market guides about
 * that service (matched on the guide's `service.href`). Builds internal
 * links in both directions between service pages and guides.
 */
export default function RelatedGuides({ service, limit = 6 }: { service: string; limit?: number }) {
  const guides = ALL_ARTICLES.filter((a) => a.service.href === service).slice(0, limit);
  if (!guides.length) return null;

  return (
    <section className="border-t border-line bg-white py-16 md:py-20">
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Investor guides</p>
            <h2 className="h-display mt-3 text-[1.6rem] md:text-[2rem]">Guides on this topic, written for your market</h2>
          </div>
          <Link href="/blogs" className="link-arrow shrink-0">All guides<ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((a) => (
            <Link key={`${a.market}-${a.slug}`} href={articleUrl(a)} lang={a.lang} className="card card-hover group flex flex-col overflow-hidden">
              <div className="relative aspect-[16/9] bg-sand">
                <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-gold-700">{getMarket(a.market)?.hub.eyebrow}</p>
                <h3 className="mt-2 text-[1.02rem] font-semibold leading-snug text-ink-900 group-hover:text-gold-700">{a.title}</h3>
                <p className="mt-auto pt-4 text-[13px] text-ink-500">{a.readMinutes} min</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
