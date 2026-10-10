import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import en from './public/locales/en/translation.json';

// English is bundled so first paint NEVER shows raw keys (instant t()).
// French/Chinese (~200KB) load lazily in the background via backend.
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en } },
    partialBundledLanguages: true,
    // Synchronous init: English is ready before first paint — no delay,
    // no raw keys, no splash flash for the default language.
    initImmediate: false,
    supportedLngs: ['en', 'fr', 'ch'],
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    backend: { loadPath: '/locales/{{lng}}/translation.json' },
    detection: { caches: ['localStorage', 'cookie'] },
  });

// Warm up the other languages after first paint so switching is instant.
if (typeof window !== 'undefined') {
  const warm = () => {
    (['fr', 'ch'] as const).forEach((lng) => {
      if (!i18n.hasResourceBundle(lng, 'translation')) {
        i18n.loadLanguages(lng).catch(() => {});
      }
    });
  };
  if (document.readyState === 'complete') setTimeout(warm, 1000);
  else window.addEventListener('load', () => setTimeout(warm, 1000), { once: true });
}

export default i18n;
