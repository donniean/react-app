// cSpell: ignore cimode
const ENGLISH_LANGUAGE = 'en';
const SIMPLIFIED_CHINESE_LANGUAGE = 'zh-Hans';
const TRADITIONAL_CHINESE_LANGUAGE = 'zh-Hant';
// Prevent i18next from approximately matching an unsupported candidate before checking later preferences.
const UNMATCHED_LANGUAGE = 'und';

export function resolveDetectedLanguage(language: string, supportedLanguages: readonly string[]) {
  if (language === 'cimode') {
    return language;
  }

  let locale: Intl.Locale;

  try {
    locale = new Intl.Locale(language);
  } catch {
    return UNMATCHED_LANGUAGE;
  }

  if (locale.language === ENGLISH_LANGUAGE) {
    return supportedLanguages.includes(ENGLISH_LANGUAGE) ? ENGLISH_LANGUAGE : UNMATCHED_LANGUAGE;
  }

  if (locale.language !== 'zh') {
    return UNMATCHED_LANGUAGE;
  }

  const script = locale.script ?? locale.maximize().script;

  if (script === 'Hans' && supportedLanguages.includes(SIMPLIFIED_CHINESE_LANGUAGE)) {
    return SIMPLIFIED_CHINESE_LANGUAGE;
  }

  if (script === 'Hant' && supportedLanguages.includes(TRADITIONAL_CHINESE_LANGUAGE)) {
    return TRADITIONAL_CHINESE_LANGUAGE;
  }

  return UNMATCHED_LANGUAGE;
}
