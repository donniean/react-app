import fs from 'node:fs';

import { defineConfig } from 'i18next-cli';

import { resolveRoot } from './config/paths.mjs';
import { DEFAULT_NAMESPACE } from './src/constants/i18n';

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
    defaultNS: DEFAULT_NAMESPACE,
    keySeparator: false,
    sort: true,
  },
  types: {
    input: ['src/locales/en/*.json'],
    output: 'src/@types/i18next.d.ts',
    resourcesFile: 'src/@types/resources.d.ts',
    enableSelector: true,
  },
});

defineConfig({
  locales: ['en'],
  extract: {
    input: 'src/**/*.{js,jsx,ts,tsx}',
    output: 'src/locales/{{language}}/{{namespace}}.json',
  },
});
