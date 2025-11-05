import fs from 'node:fs';

import { defineConfig } from 'i18next-cli';

import { resolveRoot } from './config/paths';

const localesPath = resolveRoot('src', 'locales');
const entries = fs.readdirSync(localesPath, { withFileTypes: true });
const dirNames = entries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

export default defineConfig({
  locales: dirNames,
  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'src/locales/{{language}}/{{namespace}}.json',
    ignore: [
      'src/**/*.test.ts',
      'src/**/*.mock.ts',
      'src/**/__tests__/**',
      'src/**/__mocks__/**',
    ],
    // outputFormat: 'ts',
    defaultNS: 'common',
    keySeparator: false,
    sort: true,
    primaryLanguage: 'en',
  },
  types: {
    input: ['src/locales/en/*.json'],
    output: 'src/@types/i18next.d.ts',
    resourcesFile: 'src/@types/resources.d.ts',
    enableSelector: true,
  },
});
