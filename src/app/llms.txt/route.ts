import { MARKETS } from "@/content/insights/markets";
import { articlesFor, articleUrl } from "@/content/insights";

// llms.txt: a plain-text map of the site for AI search engines and assistants
export const dynamic = "force-static";

const BASE = "https://bonet.rw";

export function GET() {
  const lines: string[] = [
    "# Bonet Elite Services",
    "",
    "> Kigali-based firm helping foreign investors register companies in Rwanda, obtain investment certificates and tax incentives, recruit staff, relocate executives and families, and organise executive travel. English, French and Chinese spoken. Contact: info@bonet.rw, +250 726 300 260 (WhatsApp).",
    "",
    "## Services",
    `- [Business registration in Rwanda](${BASE}/business-registration): RDB registration, TIN, VAT, RSSB, licences and bank account support`,
    `- [Investment & business setup](${BASE}/investment): investment certificates, tax incentives, market access`,
    `- [Business consulting](${BASE}/consulting): business plans, financial advisory, project planning, audits`,
    `- [HR & recruitment](${BASE}/hr-recruitment): recruitment, payroll, HR compliance, work permits`,
    `- [Relocation](${BASE}/relocation-services): housing, schools, banking and settling in Kigali`,
    `- [Executive travel](${BASE}/executive-travel): VIP travel, gorilla trekking, conferences`,
    `- [FAQ](${BASE}/faq): visas, permits, company setup, tax and living in Rwanda`,
    `- [Contact](${BASE}/contact)`,
    "",
  ];
  for (const m of MARKETS) {
    lines.push(`## ${m.hub.title}`, `- [${m.hub.eyebrow}](${BASE}/${m.slug}): ${m.hub.description}`);
    for (const a of articlesFor(m.slug)) {
      lines.push(`- [${a.title}](${BASE}${articleUrl(a)}): ${a.description}`);
    }
    lines.push("");
  }
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
