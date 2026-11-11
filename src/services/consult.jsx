"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import InquiryModal from "@/components/InquiryModal";
import { MediaRow, WhatsAppButton, SectionHeader, CtaBand } from "@/components/ui/kit";

const services = [
  { base: "businessConsulting.services.businessPlan", image: "/assets/images/s1.jpeg" },
  { base: "businessConsulting.services.projectPlanning", image: "/assets/photos/conference-2.jpg" },
  { base: "businessConsulting.services.financialAdvisory", image: "/assets/images/s2.jpeg" },
  { base: "businessConsulting.services.auditing", image: "/assets/photos/kigali-cbd.jpg" },
];

export default function BusinessConsulting() {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);
  const [open, setOpen] = useState(false);
  const f = "businessConsulting.form";

  const tags = [
    L("Strategic Planning", "Planification Stratégique", "战略规划"),
    L("Expert Guidance", "Orientation d'Expert", "专家指导"),
    L("Proven Results", "Résultats Prouvés", "成效卓著"),
  ];

  return (
    <>
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeader
            eyebrow={L("Services", "Services", "服务")}
            title={L("Business Consulting", "Conseil en Affaires", "企业咨询")}
            lead={L("Practical advisory for companies entering or growing in Rwanda, delivered by our finance and strategy team in Kigali.", "Un accompagnement concret pour les entreprises qui s'implantent ou se développent au Rwanda, par notre équipe finance et stratégie à Kigali.", "为进入或拓展卢旺达市场的企业提供务实咨询，由我们在基加利的财务与战略团队提供。")}
            action={
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setOpen(true)} className="btn btn-ink">
                  {L("Request a consultation", "Demander une consultation", "申请咨询")}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <WhatsAppButton>{t("businessConsulting.quickContact")}</WhatsAppButton>
              </div>
            }
          />
          <div className="space-y-20 md:space-y-28">
            {services.map((s, i) => (
              <MediaRow
                key={s.base}
                index={i}
                reverse={i % 2 === 1}
                image={s.image}
                imageAlt={t(`${s.base}.title`)}
                eyebrow={t(`${s.base}.subtitle`)}
                title={t(`${s.base}.title`)}
                footer={
                  <ul className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-line bg-ivory px-3.5 py-1.5 text-[13px] font-medium text-ink-700">{tag}</li>
                    ))}
                  </ul>
                }
              >
                <p>{t(`${s.base}.description`)}</p>
              </MediaRow>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        image="/assets/images/inv.jpg"
        eyebrow={L("Expert Consulting", "Conseil d'experts", "专家咨询")}
        title={t("businessConsulting.cta")}
        actions={
          <>
            <button type="button" onClick={() => setOpen(true)} className="btn btn-gold btn-lg">
              {L("Request a consultation", "Demander une consultation", "申请咨询")}
              <ArrowRight className="h-4 w-4" />
            </button>
            <WhatsAppButton variant="ghost-light" className="btn-lg">WhatsApp</WhatsAppButton>
          </>
        }
      />

      <InquiryModal
        open={open}
        onClose={() => setOpen(false)}
        endpoint="https://api.bonet.rw/bonetBackend/backend/public/consulting"
        labels={{
          title: t("businessConsulting.title"),
          description: t(`${f}.instructions`),
          name: { label: t(`${f}.fullnames.label`), placeholder: t(`${f}.fullnames.placeholder`), error: t(`${f}.fullnames.error`) },
          email: { label: t(`${f}.email.label`), placeholder: t(`${f}.email.placeholder`), required: t(`${f}.email.required`), invalid: t(`${f}.email.invalid`) },
          phone: { label: t(`${f}.phone.label`), placeholder: t(`${f}.phone.placeholder`), error: t(`${f}.phone.error`) },
          message: { label: t(`${f}.description.label`), placeholder: t(`${f}.description.placeholder`), error: t(`${f}.description.error`) },
          cancel: t(`${f}.buttons.cancel`),
          submit: t(`${f}.buttons.submit`),
          success: (name) => t("ContactMessage.success", { name }),
          serverError: t("businessConsulting.toast.serverError"),
        }}
      />
    </>
  );
}
