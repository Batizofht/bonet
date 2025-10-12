import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // load translations via HTTP
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next
  .init({
    fallbackLng: 'en',  // default language fallback
    debug: true,        // turn off in production
    interpolation: {
      escapeValue: false, // react already safe from xss
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // path to translations files
    },
  });

export default i18n;
