import { i18n } from '@lingui/core';
import { detect, fromCookie, fromNavigator } from '@lingui/detect-locale';
import { I18nProvider } from '@lingui/react';
import type { PropsWithChildren } from 'react';

import { DEFAULT_LOCALE } from '@/constants/i18n';
import { messages as enMessages } from '@/locales/en/messages';
import { messages as zhHansMessages } from '@/locales/zh-Hans/messages';

i18n.load({
  en: enMessages,
  'zh-Hans': zhHansMessages,
  'zh-CN': zhHansMessages,
  zh: zhHansMessages,
});

const locale = detect(
  fromCookie('lang'),
  fromNavigator(),
  () => DEFAULT_LOCALE,
);
const finalLocale = locale ?? DEFAULT_LOCALE;

i18n.activate(finalLocale);

export function AppI18nProvider({ children }: Readonly<PropsWithChildren>) {
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
