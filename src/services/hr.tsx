"use client";
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, UserPlus, Shield, GraduationCap, CreditCard } from "lucide-react";
import Image from "next/image";
import InquiryModal from "@/components/InquiryModal";
import { WhatsAppButton, SectionHeader, CtaBand } from "@/components/ui/kit";

const hrServices = [
  { base: "hrServices.recruitment", image: "/assets/images/talent.jpg", icon: UserPlus },
  { base: "hrServices.compliance", image: "/assets/images/rra1.jpg", icon: Shield },
  { base: "hrServices.training", image: "/assets/images/s3.jpeg", icon: GraduationCap },
  { base: "hrServices.payroll", image: "/assets/photos/kigali-cbd-3.jpg", icon: CreditCard },
];

export default function HRAdminSupport() {
  const { t, i18n } = useTranslation();
  const L = (en: string, fr: string, ch: string) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);
  const [open, setOpen] = useState(false);
  const f = "hrModal.form";

  return (
    <>
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeader
            eyebrow={L("Services", "Services", "服务")}
            title={L("HR & Admin Support", "Soutien RH et Administratif", "人力资源与行政支持")}
            lead={L("Contracts, payroll, policies, training and permits, kept compliant with Rwandan labour law.", "Contrats, paie, politiques, formation et permis, conformes au droit du travail rwandais.", "合同、薪资、制度、培训和许可证，均符合卢旺达劳动法。")}
            action={
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setOpen(true)} className="btn btn-ink">
                  {t("hrServices.ctaContact")}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <WhatsAppButton>{t("hrServices.ctaWhatsApp")}</WhatsAppButton>
              </div>
            }
          />

          <div className="grid gap-6 md:grid-cols-2">
            {hrServices.map((s) => {
              const Icon = s.icon;
              return (
                <article key={s.base} className="card card-hover group overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden bg-sand">
                    <Image src={s.image} alt={t(`${s.base}.title`)} fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
                  </div>
                  <div className="p-7">
                    <p className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-gold-700"><Icon className="h-4 w-4" />{t(`${s.base}.subtitle`)}</p>
                    <h3 className="mt-2 text-[1.2rem] font-semibold leading-snug text-ink-900">{t(`${s.base}.title`)}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{t(`${s.base}.description`)}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 rounded-[10px] border border-line p-7 md:flex-row md:items-center md:justify-between">
            <p className="text-[15px] font-medium text-ink-800">
              {L("Looking for recruitment services? View our talent solutions", "Vous cherchez des services de recrutement ? Découvrez nos solutions de talents", "寻找招聘服务？查看我们的人才解决方案")}
            </p>
            <Link href="/hr-recruitment" className="link-arrow">{L("Recruitment", "Recrutement", "招聘")}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <CtaBand
        image="/assets/images/s3.jpeg"
        eyebrow={L("HR & Admin Support", "Soutien RH et Administratif", "人力资源与行政支持")}
        title={L("Build a compliant team in Rwanda", "Constituez une équipe conforme au Rwanda", "在卢旺达组建合规团队")}
        lead={t("pageHero.hrsupport.desc")}
        actions={
          <>
            <button type="button" onClick={() => setOpen(true)} className="btn btn-gold btn-lg">
              {t("hrServices.ctaContact")}
              <ArrowRight className="h-4 w-4" />
            </button>
            <WhatsAppButton variant="ghost-light" className="btn-lg">WhatsApp</WhatsAppButton>
          </>
        }
      />

      <InquiryModal
        open={open}
        onClose={() => setOpen(false)}
        endpoint="https://api.bonet.rw/bonetBackend/backend/public/hrsupport"
        labels={{
          title: t("hrModal.title"),
          description: t("hrModal.instructions"),
          name: { label: t(`${f}.fullnames.label`), placeholder: t(`${f}.fullnames.placeholder`), error: t(`${f}.fullnames.error`) },
          email: { label: t(`${f}.email.label`), placeholder: t(`${f}.email.placeholder`), required: t(`${f}.email.required`), invalid: t(`${f}.email.invalid`) },
          phone: { label: t(`${f}.phone.label`), placeholder: t(`${f}.phone.placeholder`), error: t(`${f}.phone.error`) },
          message: { label: t(`${f}.description.label`), placeholder: t(`${f}.description.placeholder`), error: t(`${f}.description.error`) },
          cancel: t(`${f}.buttons.cancel`),
          submit: t(`${f}.buttons.submit`),
          success: (name: string) => t("ContactMessage.success", { name }),
          serverError: t("hrModal.toast.error"),
        }}
      />
    </>
  );
}
