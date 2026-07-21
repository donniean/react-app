import i18n from 'i18next';
// cSpell: ignore languagedetector Lngs
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { env } from '@/config/env';

import { backend } from './backend';
import { namespaces, supportedLanguages } from './utils';

const defaultI18n = i18n;

const fallbackLng = {
  zh: ['zh-Hans'],
  'zh-CN': ['zh-Hans'],
  default: [__I18N_DEFAULT_LOCALE__],
};

function resolveDetectedLanguage(language: string) {
  const languageOnly = language.split('-').at(0);
  const supportedLanguage = supportedLanguages.find(
    (candidateLanguage) => candidateLanguage === language || candidateLanguage === languageOnly,
  );
  const fallbackLanguage = Object.entries(fallbackLng).find(
    ([fallbackCode]) => fallbackCode === language || fallbackCode === languageOnly,
  );

  return supportedLanguage ?? fallbackLanguage?.[1].at(0) ?? language;
}

export const i18nInit = defaultI18n
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: env.isDevelopment,
    fallbackLng,
    load: 'currentOnly',
    supportedLngs: supportedLanguages,
    ns: namespaces,
    defaultNS: __I18N_DEFAULT_NAMESPACE__,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      convertDetectedLanguage: resolveDetectedLanguage,
    },
    react: {
      useSuspense: true,
    },
  });

export { defaultI18n as i18n };
