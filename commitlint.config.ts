import type { UserConfig } from '@commitlint/types';

const config = {
  extends: ['@commitlint/config-conventional'],
} as const satisfies UserConfig;

export default config;
