import fs from 'node:fs';

import { resolveRoot } from './config/paths.mjs';

const localesPath = resolveRoot('src', 'locales');
const entries = fs.readdirSync(localesPath, { withFileTypes: true });
const dirNames = entries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

export default {
  defaultNamespace: 'common',
  keySeparator: false,
  lineEnding: 'lf',
  locales: dirNames,
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  input: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.ts',
    '!src/**/*.mock.ts',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
    '!src/examples/**',
  ],
  sort: true,
};
