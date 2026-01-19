import fs from 'node:fs';

import { defineConfig } from 'i18next-cli';

import { DEFAULT_LOCALE, DEFAULT_NAMESPACE } from './config/i18n';
import { resolveRoot } from './config/paths';

const localesPath = resolveRoot('src', 'locales');
const entries = fs.readdirSync(localesPath, { withFileTypes: true });
const dirNames = entries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const PREFERRED_PRIMARY_LANGUAGE = 'en' as const;
const primaryLanguage = dirNames.includes(PREFERRED_PRIMARY_LANGUAGE)
  ? PREFERRED_PRIMARY_LANGUAGE
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
    primaryLanguage,
    defaultValue: (_key, _namespace, _language, value) => value,
    removeUnusedKeys: true,
  },
  types: {
    input: [resolveRoot(localesPath, primaryLanguage, '*.json')],
    output: 'src/@types/i18next.d.ts',
    resourcesFile: 'src/@types/i18next-resources.d.ts',
    enableSelector: true,
  },
});
