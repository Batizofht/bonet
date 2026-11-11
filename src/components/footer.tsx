"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { apiGet } from "@/lib/api";
import { CtaBand, WhatsAppButton } from "./ui/kit";

interface FAQ {
  answer: string;
  question: string;
}

/** Homepage FAQ (from the API) + closing call to action */
export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<number | null>(0);
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);

  // Shown when the FAQ API is unreachable or returns nothing
  const fallback: FAQ[] = [
    {
      question: L("Can foreigners own 100% of a Rwandan company?", "Un étranger peut-il détenir 100 % d'une société rwandaise ?", "外国人可以100%拥有卢旺达公司吗？"),
      answer: L("Yes. Rwanda allows 100% foreign ownership in nearly all sectors, with no local partner required.", "Oui. Le Rwanda autorise 100 % de capitaux étrangers dans presque tous les secteurs, sans associé local.", "可以。卢旺达几乎所有行业都允许100%外资所有，无需本地合伙人。"),
    },
    {
      question: L("What is the minimum capital to start a business?", "Quel est le capital minimum pour créer une entreprise ?", "创业的最低资本是多少？"),
      answer: L("There is no minimum capital for most business types, and RDB charges no government fee for registration.", "Il n'y a pas de capital minimum pour la plupart des sociétés, et le RDB ne facture aucun frais d'immatriculation.", "大多数企业类型无最低资本要求，RDB也不收取注册费用。"),
    },
    {
      question: L("Do you help with work permits and residency?", "Gérez-vous les permis de travail et de séjour ?", "你们协助办理工作许可和居留吗？"),
      answer: L("Yes. We handle work permits, investor residence permits and dependant permits with the immigration authorities.", "Oui. Nous gérons les permis de travail, les titres de séjour investisseur et ceux des personnes à charge.", "是的。我们向移民部门办理工作许可、投资者居留许可及家属许可。"),
    },
    {
      question: L("How do I get started?", "Comment commencer ?", "如何开始？"),
      answer: L("Book a free 30-minute consultation by WhatsApp (+250 726 300 260), email (info@bonet.rw) or through our contact page.", "Réservez une consultation gratuite de 30 minutes par WhatsApp (+250 726 300 260), e-mail (info@bonet.rw) ou via notre page contact.", "通过WhatsApp（+250 726 300 260）、电子邮件（info@bonet.rw）或联系页面预约免费30分钟咨询。"),
    },
  ];
  const shown = faqs.length ? faqs : fallback;

  useEffect(() => {
    let alive = true;
    apiGet<FAQ[]>("https://api.bonet.rw/bonetBackend/backend/public/faqs")
      .then((d) => alive && setFaqs(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <section className="border-t border-line bg-white py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">{t("faqPage.support_label")}</p>
            <h2 className="h-display mt-3 text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]">{t("faqPage.title")}</h2>
            <p className="lead mt-5">
              {L("Essential information for foreign investors considering Rwanda", "Informations essentielles pour les investisseurs étrangers envisageant le Rwanda", "供考虑卢旺达的外国投资者参考的基本信息")}
            </p>
            <Link href="/faq" className="link-arrow mt-8">
              {L("See all questions", "Voir toutes les questions", "查看全部问题")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {loading &&
              [0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="py-6">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-sand" />
                </div>
              ))}
            {!loading &&
              shown.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} className="py-6">
                    <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-start justify-between gap-6 text-left">
                      <span className="font-display text-[1rem] font-semibold leading-snug text-ink-900">{f.question}</span>
                      <Plus className={`mt-0.5 h-5 w-5 shrink-0 text-gold-600 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`} />
                    </button>
                    {/* grid-rows 0fr→1fr: smooth height, answer stays in the DOM for SEO */}
                    <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <p className="pr-10 pt-3 text-[15px] leading-relaxed text-ink-500">{f.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <CtaBand
        image="/image/7.jpg"
        eyebrow={L("Get in Touch", "Nous Contacter", "联系我们")}
        title={L("Still have questions?", "Vous avez encore des questions ?", "还有疑问？")}
        lead={L(
          "Book a free consultation and we will outline your exact process, timeline, and costs.",
          "Réservez une consultation gratuite et nous vous expliquerons votre processus exact, votre calendrier et vos coûts.",
          "预约免费咨询，我们将为您说明具体流程、时间表和费用。"
        )}
        actions={
          <>
            <Link href="/contact" className="btn btn-gold btn-lg">
              {L("Contact Our Team", "Contacter Notre Équipe", "联系我们的团队")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton variant="ghost-light" className="btn-lg">WhatsApp</WhatsAppButton>
          </>
        }
      />
    </>
  );
}
