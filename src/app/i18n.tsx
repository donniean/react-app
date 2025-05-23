import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import type { ReactNode } from 'react';

import { DEFAULT_LOCALE } from '@/configs';
import { messages as enMessages } from '@/locales/en/messages';
import { messages as zhHansMessages } from '@/locales/zh-Hans/messages';

i18n.load({
  en: enMessages,
  'zh-Hans': zhHansMessages,
});
i18n.activate(DEFAULT_LOCALE);

export function AppI18nProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
