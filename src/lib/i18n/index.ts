// eslint-disable-next-line import-x/no-named-as-default
import i18n from 'i18next';
// cspell: ignore languagedetector
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { env } from '@/config/env';
import { DEFAULT_LOCALE, DEFAULT_NAMESPACE } from '@/constants/i18n';

import { backend } from './backend';
import { namespaces } from './utils';

// eslint-disable-next-line import-x/no-named-as-default-member
await i18n
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: env.isDevelopment,
    lng: DEFAULT_LOCALE,
    fallbackLng: {
      zh: ['zh-Hans'],
      'zh-CN': ['zh-Hans'],
      default: ['en'],
    },
    // cspell: ignore Lngs
    nonExplicitSupportedLngs: true,
    ns: namespaces,
    defaultNS: DEFAULT_NAMESPACE,
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
