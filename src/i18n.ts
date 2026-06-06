import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import nl from './locales/nl.json';
import en from './locales/en.json';
import tr from './locales/tr.json';
import de from './locales/de.json';
import fr from './locales/fr.json';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      nl: { translation: nl },
      en: { translation: en },
      tr: { translation: tr },
      de: { translation: de },
      fr: { translation: fr },
    },
    lng: 'nl', // Default language
    fallbackLng: 'nl',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;
