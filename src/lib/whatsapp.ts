/**
 * WhatsApp links that land in a chat straight away.
 *
 * `wa.me` and `api.whatsapp.com` links stop on WhatsApp's "Continue to Chat"
 * interstitial in a desktop browser, where the visitor still has to choose
 * between WhatsApp Web and the desktop app. These helpers skip that page:
 * desktop goes to web.whatsapp.com, phones hand off to the installed app via
 * the whatsapp:// scheme.
 */

export const BONET_WHATSAPP = "250726300260";

type WhatsAppTarget = {
  /** International format, digits only. Omit to let the user pick a contact. */
  phone?: string;
  /** Pre-filled message body. */
  text?: string;
};

const buildQuery = ({ phone, text }: WhatsAppTarget): string => {
  const params: string[] = [];
  const digits = (phone ?? "").replace(/\D/g, "");
  if (digits) params.push(`phone=${digits}`);
  if (text) params.push(`text=${encodeURIComponent(text)}`);
  return params.length ? `?${params.join("&")}` : "";
};

const isMobileBrowser = (): boolean => {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
};

/** WhatsApp Web URL — opens the chat in the browser, no interstitial. */
export const whatsappWebUrl = (target: WhatsAppTarget = {}): string =>
  `https://web.whatsapp.com/send${buildQuery(target)}`;

/** Native app URL — opens the installed WhatsApp app, no interstitial. */
export const whatsappAppUrl = (target: WhatsAppTarget = {}): string =>
  `whatsapp://send${buildQuery(target)}`;

/**
 * Open a WhatsApp chat directly: the app on phones, WhatsApp Web everywhere
 * else. Never shows the "Continue to Chat" landing page.
 */
export function openWhatsApp(target: WhatsAppTarget = {}): void {
  if (typeof window === "undefined") return;

  if (isMobileBrowser()) {
    window.location.href = whatsappAppUrl(target);
    return;
  }
  window.open(whatsappWebUrl(target), "_blank", "noopener,noreferrer");
}
