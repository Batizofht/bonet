"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Building, FileText, ClipboardCheck, Award, Search, Rocket, ArrowRight } from "lucide-react";
import InquiryModal from "@/components/InquiryModal";
import { MediaRow, WhatsAppButton, SectionHeader } from "@/components/ui/kit";

const investmentServices = [
  { key: "service1", image: "/assets/images/rdb2.jpg", icon: Building },
  { key: "service2", image: "/assets/images/cert.jpg", icon: Award },
  { key: "service3", image: "/assets/images/rra.jpg", icon: FileText },
  { key: "service4", image: "/assets/images/rra1.jpg", icon: ClipboardCheck },
  { key: "service5", image: "/assets/photos/kigali-cbd-2.jpg", icon: Search },
  { key: "service6", image: "/assets/photos/kigali-tower.jpg", icon: Rocket },
];

export default function InvestmentBusinessSetup() {
  const { t, i18n } = useTranslation();
  const L = (en, fr, ch) => (i18n.language === "fr" ? fr : i18n.language === "ch" ? ch : en);
  const [open, setOpen] = useState(false);
  const k = "investmentBusinessSetup.modal.form";

  return (
    <>
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <SectionHeader
            eyebrow={L("Services", "Services", "服务")}
            title={L("Investment & Business Setup", "Investissement et Création d'Entreprise", "投资与企业设立")}
            lead={L("From company registration to licences and tax, each step below is handled by our team in Kigali.", "De l'immatriculation aux licences et à la fiscalité, chaque étape ci-dessous est gérée par notre équipe à Kigali.", "从公司注册到许可证和税务，以下每一步都由我们在基加利的团队办理。")}
            action={
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setOpen(true)} className="btn btn-ink">
                  {L("Request a consultation", "Demander une consultation", "申请咨询")}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <WhatsAppButton>{t("travelHospitality.page.buttons.quickContact")}</WhatsAppButton>
              </div>
            }
          />

          <div className="space-y-20 md:space-y-28">
            {investmentServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <MediaRow
                  key={s.key}
                  index={i}
                  reverse={i % 2 === 1}
                  image={s.image}
                  imageAlt={t(`investmentBusinessSetup.services.${s.key}.title`)}
                  eyebrow={t(`investmentBusinessSetup.services.${s.key}.subtitle`)}
                  title={t(`investmentBusinessSetup.services.${s.key}.title`)}
                  footer={
                    <span className="inline-flex items-center gap-3 text-sm font-medium text-ink-500">
                      <Icon className="h-4 w-4 text-gold-600" />
                      {L("Handled end to end by our team", "Entièrement géré par notre équipe", "由我们的团队全程办理")}
                    </span>
                  }
                >
                  <p>{t(`investmentBusinessSetup.services.${s.key}.description`)}</p>
                </MediaRow>
              );
            })}
          </div>
        </div>
      </section>

      <InquiryModal
        open={open}
        onClose={() => setOpen(false)}
        endpoint="https://api.bonet.rw/bonetBackend/backend/public/investments"
        labels={{
          title: t("investmentBusinessSetup.modal.title"),
          description: t("investmentBusinessSetup.modal.description"),
          name: { label: t(`${k}.fullnames.label`), placeholder: t(`${k}.fullnames.placeholder`), error: t(`${k}.fullnames.requiredMessage`) },
          email: { label: t(`${k}.email.label`), placeholder: t(`${k}.email.placeholder`), required: t(`${k}.email.requiredMessage`), invalid: t(`${k}.email.invalidMessage`) },
          phone: { label: t(`${k}.phone_number.label`), placeholder: t(`${k}.phone_number.placeholder`), error: t(`${k}.phone_number.requiredMessage`) },
          message: { label: t(`${k}.service_description.label`), placeholder: t(`${k}.service_description.placeholder`), error: t(`${k}.service_description.requiredMessage`) },
          cancel: t("investmentBusinessSetup.button.cancel"),
          submit: t("investmentBusinessSetup.button.submit"),
          success: (name) => t("ContactMessage.success", { name }),
          serverError: t("investmentBusinessSetup.toastMessages.errorServer"),
        }}
      />
    </>
  );
}
