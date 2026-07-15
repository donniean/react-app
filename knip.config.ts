import type { KnipConfig } from 'knip';

export default {
  entry: ['.ncurc.mjs', 'html-validate.config.ts', 'i18next.config.ts', 'src/@types/**/*.d.ts'],
  ignoreDependencies: ['wrangler'],
  ignoreFiles: ['src/components/layouts/base-layout.tsx'],
  ignoreIssues: {
    'src/lib/i18n/index.ts': ['exports'],
  },
} satisfies KnipConfig;
