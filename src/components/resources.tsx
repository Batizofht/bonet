"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { slugify } from "../../slugify";
import { apiGet } from "@/lib/api";
import { cleanText } from "@/lib/text";
import { MARKETS } from "@/content/insights/markets";

interface Blog {
  image: string;
  title: string;
  quote: string;
  created_at?: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);

  useEffect(() => {
    let alive = true;
    apiGet<any>("https://api.bonet.rw/bonetBackend/backend/public/blogshome")
      .then((data) => {
        const arr = Array.isArray(data?.data) ? data.data : data?.data || [];
        if (alive) setBlogs(arr);
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  const shown = blogs.slice(0, 3);

  return (
    <section className="border-t border-line bg-white py-16 md:py-24">
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{t("blog.resourcesLabel")}</p>
            <h2 className="h-display mt-3 text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">{t("blog.resourcesTitle")}</h2>
            <p className="lead mt-4">{t("blog.resourcesDesc")}</p>
          </div>
          <Link href="/blogs" className="link-arrow shrink-0">
            {t("blog.viewAllArticles")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {loading &&
            [0, 1, 2].map((i) => (
              <div key={i}>
                <div className="aspect-[4/3] animate-pulse rounded-[10px] bg-sand" />
                <div className="mt-5 h-4 w-24 animate-pulse rounded bg-sand" />
                <div className="mt-3 h-6 w-full animate-pulse rounded bg-sand" />
              </div>
            ))}
          {!loading &&
            shown.map((post, i) => (
              <article key={i} className="group">
                <Link href={`/blog/${slugify(post.title)}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-sand">
                    <Image
                      src={`https://api.bonet.rw/bonetBackend/public/${post.image}`}
                      alt={post.title}
                      fill
                      sizes="(min-width: 768px) 380px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-700">
                    {post.created_at ? fmt(post.created_at) : L("Recent", "Récent", "最新")}
                  </p>
                  <h3 className="mt-2 text-[1.12rem] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-gold-700 line-clamp-2">
                    {post.title}
                  </h3>
                  {cleanText(post.quote) && <p className="mt-3 text-[15px] leading-relaxed text-ink-500 line-clamp-2">{cleanText(post.quote)}</p>}
                </Link>
              </article>
            ))}
        </div>

        {/* Market guides */}
        <div className="mt-14 border-t border-line pt-10">
          <p className="eyebrow">{L("Investor guides by market", "Guides par marché", "按市场分类的投资指南")}</p>
          <p className="mt-2 text-[1.15rem] font-semibold text-ink-900">{L("Written for investors in your country, in your language", "Écrits pour les investisseurs de votre pays, dans votre langue", "以您的语言，为您所在国家的投资者撰写")}</p>
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {MARKETS.map((m) => (
              <li key={m.slug}>
                <Link href={`/${m.slug}`} className="group flex items-center justify-between border-b border-line py-3.5 text-[15px] font-medium text-ink-800 transition-colors hover:text-gold-700">
                  {m.hub.eyebrow}
                  <ArrowUpRight className="h-4 w-4 text-gold-600" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
