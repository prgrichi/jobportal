import { createI18n } from 'vue-i18n';
import de from './locales/de.json';
import en from './locales/en.json';

const messages = {
  de,
  en
};

// i18n Instanz erstellen
const i18n = createI18n({
  legacy: true,
  locale: localStorage.getItem('locale') || 'de',
  fallbackLocale: 'en',
  messages
});

export default i18n;