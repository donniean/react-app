import fs from 'node:fs';

import { defineConfig } from 'i18next-cli';

import { DEFAULT_LOCALE, DEFAULT_NAMESPACE } from './config/i18n';
import { resolveRoot } from './config/paths';

const localesPath = resolveRoot('src', 'locales');
const entries = fs.readdirSync(localesPath, { withFileTypes: true });
const dirNames = entries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const DEFAULT_SOURCE_LOCALE = 'en' as const;
const sourceLocale = dirNames.includes(DEFAULT_SOURCE_LOCALE)
  ? DEFAULT_SOURCE_LOCALE
  : DEFAULT_LOCALE;

export default defineConfig({
  locales: dirNames,
  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'src/locales/{{language}}/{{namespace}}.json',
    ignore: ['**/tests/**', '**/*.test.*', '**/mocks/**', '**/*.mock.*'],
    defaultNS: DEFAULT_NAMESPACE,
    keySeparator: false,
    sort: true,
    primaryLanguage: sourceLocale,
    defaultValue: (_key, _namespace, _language, value) => value,
    removeUnusedKeys: true,
  },
  types: {
    input: [resolveRoot(localesPath, sourceLocale, '*.json')],
    output: 'src/@types/i18next.d.ts',
    resourcesFile: 'src/@types/resources.d.ts',
    enableSelector: true,
  },
});
