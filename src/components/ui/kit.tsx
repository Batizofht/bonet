import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Phone, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { whatsappWebUrl, BONET_WHATSAPP } from "@/lib/whatsapp";

/* ============================================================
   Shared building blocks. No hooks, so every piece works in
   server components (SEO pages) and client components alike.
   ============================================================ */

export function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("container-x", className)}>{children}</div>;
}

type Tone = "white" | "ivory" | "sand" | "ink";
const toneClass: Record<Tone, string> = {
  white: "bg-white",
  ivory: "bg-white border-t border-line",
  sand: "bg-white border-t border-line",
  ink: "bg-ink-900 text-white",
};

export function Section({
  children,
  tone = "white",
  className,
  id,
  tight,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  tight?: boolean;
}) {
  return (
    <section id={id} className={cx(toneClass[tone], tight ? "py-12 md:py-16" : "py-16 md:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, light, className }: { children: ReactNode; light?: boolean; className?: string }) {
  return <p className={cx("eyebrow", light && "eyebrow-light", className)}>{children}</p>;
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  light,
  as: As = "h2",
  className,
  action,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
  action?: ReactNode;
}) {
  const center = align === "center";
  return (
    <div
      className={cx(
        "mb-10 md:mb-12",
        center ? "mx-auto max-w-3xl text-center" : action ? "flex flex-col gap-6 md:flex-row md:items-end md:justify-between" : "max-w-3xl",
        className
      )}
    >
      <div className={cx(!center && action && "max-w-2xl")}>
        {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
        <As className={cx("h-display mt-3 text-[1.75rem] sm:text-[2rem] md:text-[2.35rem]", light && "!text-white")}>{title}</As>
        {lead && <p className={cx("lead mt-4", center && "mx-auto", light && "!text-white/70")}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

type BtnVariant = "gold" | "ink" | "outline" | "ghost-light";

export function ButtonLink({
  href,
  children,
  variant = "gold",
  size,
  icon = true,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  size?: "sm" | "lg";
  icon?: boolean | ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = cx("btn", `btn-${variant}`, size && `btn-${size}`, className);
  const iconEl = icon === true ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : icon || null;
  if (external || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        {iconEl}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {iconEl}
    </Link>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.62l6.02-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.34-11.35 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}

export function WhatsAppButton({
  children,
  variant = "outline",
  className,
  text,
}: {
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
  text?: string;
}) {
  return (
    <a href={whatsappWebUrl({ phone: BONET_WHATSAPP, text })} target="_blank" rel="noopener noreferrer" className={cx("btn", `btn-${variant}`, className)}>
      <WhatsAppIcon />
      {children}
    </a>
  );
}

export type Crumb = { name: string; href?: string };

export function Breadcrumbs({ items, light }: { items: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={cx("text-[13.5px]", light ? "text-white/55" : "text-ink-500")}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.href ? (
              <Link href={c.href} className={cx("transition-colors", light ? "text-white/75 hover:text-white" : "hover:text-ink-900")}>
                {c.name}
              </Link>
            ) : (
              <span className={light ? "text-white" : "text-ink-800"} aria-current="page">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Inner-page hero: photo with a navy gradient, copy bottom-left */
export function PageHero({
  image,
  imageAlt = "",
  eyebrow,
  title,
  lead,
  actions,
  crumbs,
  aside,
  size = "md",
  position = "center",
}: {
  image: string;
  imageAlt?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  crumbs?: Crumb[];
  aside?: ReactNode;
  size?: "md" | "lg";
  position?: string;
}) {
  return (
    <section className={cx("relative isolate flex items-end overflow-hidden bg-ink-950 text-white", size === "lg" ? "min-h-[620px]" : "min-h-[460px] md:min-h-[520px]")}>
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" quality={72} className="-z-20 object-cover" style={{ objectPosition: position }} />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,16,29,0.95)_0%,rgba(7,16,29,0.85)_38%,rgba(7,16,29,0.45)_72%,rgba(7,16,29,0.3)_100%),linear-gradient(0deg,rgba(7,16,29,0.9)_0%,rgba(7,16,29,0)_45%)]" />
      <Container className="pb-14 pt-24 md:pb-20">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-[700px]">
            {crumbs && (
              <div className="mb-7">
                <Breadcrumbs items={crumbs} light />
              </div>
            )}
            {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
            <h1 className="h-display mt-3 !text-white text-[2.1rem] sm:text-[2.6rem] md:text-[3.1rem]">{title}</h1>
            {lead && <p className="mt-5 max-w-[600px] text-[1.05rem] leading-relaxed text-white/80 md:text-[1.1rem]">{lead}</p>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}

/** Closing call to action: navy band, copy left, direct contact lines right */
export function CtaBand({
  eyebrow,
  title,
  lead,
  actions,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  image?: string;
}) {
  const reach = [
    { icon: <Phone className="h-4 w-4" />, label: "Call or WhatsApp", value: "+250 726 300 260", href: "tel:+250726300260" },
    { icon: <WhatsAppIcon className="h-4 w-4" />, label: "WhatsApp chat", value: "Message us now", href: whatsappWebUrl({ phone: BONET_WHATSAPP }) },
    { icon: <Mail className="h-4 w-4" />, label: "Email", value: "info@bonet.rw", href: "mailto:info@bonet.rw" },
  ];
  return (
    <section className="border-t border-white/5 bg-ink-800 py-16 text-white md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div>
            {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
            <h2 className="h-display mt-3 max-w-[18ch] !text-white text-[1.85rem] sm:text-[2.2rem] md:text-[2.6rem]">{title}</h2>
            {lead && <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-white/70">{lead}</p>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          <ul className="border-t border-white/15">
            {reach.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group grid grid-cols-[40px_1fr_auto] items-center gap-4 border-b border-white/15 px-1 py-5 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">{r.icon}</span>
                  <span>
                    <span className="block text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white/45">{r.label}</span>
                    <span className="block font-display text-[1.05rem] font-semibold text-white">{r.value}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/40 transition-colors group-hover:text-gold-400" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/** Facts strip: label + value pairs separated by hairlines */
export function StatStrip({ stats, className, dark }: { stats: { value: ReactNode; label: ReactNode }[]; className?: string; dark?: boolean }) {
  return (
    <div className={cx("grid grid-cols-2", stats.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3", className)}>
      {stats.map((s, i) => (
        <div
          key={i}
          className={cx(
            "py-6 pr-6 md:py-8",
            i % 2 === 1 && "border-l pl-6",
            i >= 2 && "border-t md:border-t-0",
            i === 2 && "md:border-l md:pl-6",
            i === 3 && "md:pl-6",
            dark ? "border-white/10" : "border-line"
          )}
        >
          <div className={cx("font-display text-[1.9rem] font-semibold leading-none md:text-[2.3rem]", dark ? "text-white" : "text-ink-900")}>{s.value}</div>
          <div className={cx("mt-2.5 text-[12.5px] font-medium uppercase tracking-[0.1em]", dark ? "text-white/55" : "text-ink-500")}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/** Feature block: bare gold icon, title, text */
export function FeatureCard({
  icon,
  title,
  children,
  className,
}: {
  icon?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <div className={cx("card flex h-full flex-col p-7", className)}>
      {icon && <span className="icon-chip [&_svg]:h-6 [&_svg]:w-6">{icon}</span>}
      <h3 className="mt-5 text-[1.05rem] font-semibold leading-snug text-ink-900">{title}</h3>
      {children && <div className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{children}</div>}
    </div>
  );
}

/** Alternating image + copy rows (service pages) */
export function MediaRow({
  image,
  imageAlt,
  eyebrow,
  title,
  children,
  reverse,
  footer,
}: {
  image: string;
  imageAlt: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  reverse?: boolean;
  index?: number;
  footer?: ReactNode;
}) {
  return (
    <div className="grid items-center gap-8 md:gap-14 lg:grid-cols-2">
      <div className={cx("relative aspect-[4/3] overflow-hidden rounded-[10px] bg-ivory", reverse && "lg:order-2")}>
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
      </div>
      <div className={cx(reverse && "lg:order-1")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h3 className="h-display mt-3 text-[1.5rem] md:text-[1.8rem]">{title}</h3>
        {children && <div className="mt-4 text-[1rem] leading-relaxed text-ink-500">{children}</div>}
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
}

/** SEO-friendly FAQ: native <details>, answers always in the DOM */
export function FaqList({ items, className }: { items: { q: ReactNode; a: ReactNode }[]; className?: string }) {
  return (
    <div className={cx("divide-y divide-line border-y border-line", className)}>
      {items.map((f, i) => (
        <details key={i} className="group py-5" open={i === 0}>
          <summary className="flex cursor-pointer items-start justify-between gap-6 text-left">
            <span className="font-display text-[1rem] font-semibold leading-snug text-ink-900">{f.q}</span>
            <Plus className="mt-0.5 h-5 w-5 shrink-0 text-gold-600 transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <div className="pr-10 pt-3 text-[15px] leading-relaxed text-ink-500">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

/** Check-list item */
export function CheckItem({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <svg viewBox="0 0 20 20" className={cx("mt-1 h-4 w-4 shrink-0", light ? "text-gold-400" : "text-gold-600")} fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
      </svg>
      <span className={cx("leading-relaxed", light ? "text-white/80" : "text-ink-600")}>{children}</span>
    </li>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
