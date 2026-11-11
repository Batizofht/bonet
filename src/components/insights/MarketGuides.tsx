import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MARKETS } from "@/content/insights/markets";
import { articlesFor, articleUrl } from "@/content/insights";

/**
 * Server-rendered list of the market guides, used on /blogs so every
 * guide is linked from the blog index in the initial HTML.
 */
export default function MarketGuides() {
  return (
    <section className="border-t border-line bg-white py-16 md:py-24">
      <div className="container-x">
        <div className="mb-10 max-w-3xl md:mb-12">
          <p className="eyebrow">Investor guides by market</p>
          <h2 className="h-display mt-3 text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">Written for investors in your country, in your language</h2>
          <p className="lead mt-4">Practical guides for investors and companies in the United States, the United Kingdom, France, Europe, Germany and Belgium.</p>
        </div>
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {MARKETS.map((m) => (
            <div key={m.slug} lang={m.lang}>
              <Link href={`/${m.slug}`} className="group flex items-center justify-between border-b-2 border-ink-900 pb-3">
                <span>
                  <span className="block text-[11.5px] font-semibold uppercase tracking-[0.12em] text-gold-700">{m.localName}</span>
                  <span className="mt-1 block font-display text-[1.1rem] font-semibold text-ink-900 group-hover:text-gold-700">{m.hub.eyebrow}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-gold-600" />
              </Link>
              <ul>
                {articlesFor(m.slug).map((a) => (
                  <li key={a.slug} lang={a.lang}>
                    <Link href={articleUrl(a)} className="block border-b border-line py-3 text-[14.5px] leading-snug text-ink-600 transition-colors hover:text-ink-900">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
