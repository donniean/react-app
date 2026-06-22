import type { KnipConfig } from 'knip';

const config = {
  entry: ['.htmlvalidate.mjs', '.ncurc.mjs', 'i18next.config.ts', 'src/@types/**/*.d.ts'],
  ignoreFiles: ['src/components/layouts/base-layout.tsx'],
  ignoreIssues: {
    'src/lib/i18n/index.ts': ['exports'],
  },
} as const satisfies KnipConfig;

export default config;
