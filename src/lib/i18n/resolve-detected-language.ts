export function resolveDetectedLanguage({
  language,
  supportedLanguages,
}: {
  language: string;
  supportedLanguages: string[];
}) {
  let maxLocale: Intl.Locale;

  try {
    const locale = new Intl.Locale(language);
    maxLocale = locale.maximize();
  } catch {
    return language;
  }

  const { language: lang, script } = maxLocale;

  const targetLanguage = supportedLanguages.find(
    (supportedLanguage) => supportedLanguage.toLowerCase() === lang.toLowerCase(),
  );
  const targetLanguageWithScript = supportedLanguages.find(
    (supportedLanguage) => supportedLanguage.toLowerCase() === `${lang}-${script}`.toLowerCase(),
  );

  return targetLanguageWithScript ?? targetLanguage ?? language;
}
