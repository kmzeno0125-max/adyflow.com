import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import huTranslation from './locales/hu/translation.json';
import enTranslation from './locales/en/translation.json';
import deTranslation from './locales/de/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      hu: { translation: huTranslation },
      en: { translation: enTranslation },
      de: { translation: deTranslation },
    },
    fallbackLng: 'hu',
    supportedLngs: ['hu', 'en', 'de'],
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'adyflow-language',
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng);
});

document.documentElement.setAttribute('lang', i18n.language || 'hu');

export default i18n;
