import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './public/locales/en/translation.json';
import fr from './public/locales/fr/translation.json';
import ch from "./public/locales/ch/translation.json"


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ch: { translation: ch },
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: { escapeValue: false },
    react: { useSuspense: false }, // no suspense needed since data is already available
  });

export default i18n;
