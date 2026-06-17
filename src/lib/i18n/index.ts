import i18n from 'i18next';
// cSpell: ignore languagedetector
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { env } from '@/config/env';

import { backend } from './backend';
import { namespaces } from './utils';

const defaultI18n = i18n;

export const i18nInit = defaultI18n
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: env.isDevelopment,
    fallbackLng: {
      zh: ['zh-Hans'],
      'zh-CN': ['zh-Hans'],
      default: [__I18N_DEFAULT_LOCALE__],
    },
    // cSpell: ignore Lngs
    nonExplicitSupportedLngs: true,
    ns: namespaces,
    defaultNS: __I18N_DEFAULT_NAMESPACE__,
    partialBundledLanguages: true,
    saveMissing: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export { defaultI18n as i18n };
