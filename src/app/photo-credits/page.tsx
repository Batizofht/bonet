import type { Metadata } from "next";
import Image from "next/image";
import { PHOTO_CREDITS, LICENSE_URL } from "@/content/photo-credits";
import { Breadcrumbs } from "@/components/ui/kit";

export const metadata: Metadata = {
  title: "Photo Credits",
  description: "Credits and licences for the third-party photographs of Rwanda used on the Bonet Elite Services website.",
  alternates: { canonical: "https://bonet.rw/photo-credits" },
  robots: { index: true, follow: true },
};

export default function PhotoCreditsPage() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container-x">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Photo credits" }]} />
        <h1 className="h-display mt-6 text-[1.9rem] md:text-[2.4rem]">Photo credits</h1>
        <p className="lead mt-3 max-w-2xl">
          Some photographs on this site come from Wikimedia Commons and are used under the licences below. Images were resized for the web; no other changes were made.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTO_CREDITS.map((c) => (
            <li key={c.src} className="card overflow-hidden">
              <div className="relative aspect-[16/10] bg-sand">
                <Image src={c.src} alt={c.subject} fill sizes="(min-width: 1024px) 380px, 100vw" className="object-cover" />
              </div>
              <div className="p-5 text-[14px] leading-relaxed text-ink-500">
                <p className="font-semibold text-ink-900">{c.subject}</p>
                <p className="mt-1">
                  Photo: {c.author} ·{" "}
                  <a href={LICENSE_URL[c.license]} target="_blank" rel="noopener noreferrer license" className="underline underline-offset-2 hover:text-ink-900">{c.license}</a> ·{" "}
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink-900">Source</a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
