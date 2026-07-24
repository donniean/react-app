import i18n from 'i18next';
// cSpell: ignore languagedetector
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { env } from '@/config/env';

import { backend } from './backend';
import { namespaces, supportedLanguages } from './resources';

const defaultI18n = i18n;

export const i18nInit = defaultI18n
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: env.isDevelopment,
    /* fallbackLng: {
      zh: ['zh-Hans'],
      'zh-CN': ['zh-Hans'],
      default: [__I18N_DEFAULT_LOCALE__],
    }, */
    fallbackLng: __I18N_DEFAULT_LOCALE__,
    // cSpell: ignore Lngs
    supportedLngs: supportedLanguages,
    load: 'currentOnly',
    ns: namespaces,
    defaultNS: __I18N_DEFAULT_NAMESPACE__,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      convertDetectedLanguage: (language) => {
        let maxLocale: Intl.Locale;

        try {
          const locale = new Intl.Locale(language);
          maxLocale = locale.maximize();
        } catch {
          return language;
        }

        const { language: lang, script } = maxLocale;

        const targetLanguage = supportedLanguages.find(
          (supportedLanguage) => supportedLanguage.toLocaleLowerCase() === lang.toLocaleLowerCase(),
        );
        const targetLanguageWithScript = supportedLanguages.find(
          (supportedLanguage) =>
            supportedLanguage.toLocaleLowerCase() === `${lang}-${script}`.toLocaleLowerCase(),
        );

        return targetLanguage ?? targetLanguageWithScript ?? language;
      },
    },
    react: {
      useSuspense: true,
    },
  });

export { defaultI18n as i18n };
