// eslint-disable-next-line import-x/no-named-as-default
import i18n from 'i18next';
// cspell: ignore languagedetector
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { env } from '@/config/env';

import { backend } from './backend';
import { namespaces } from './utils';

// eslint-disable-next-line import-x/no-named-as-default-member
await i18n
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
    // cspell: ignore Lngs
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

export { default as i18n } from 'i18next';
