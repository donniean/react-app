import { defineConfig } from 'cspell';

export default defineConfig({
  version: '0.2',
  language: 'en',
  enableGlobDot: true,
  words: [
    // apps
    'webstorm',
    'wechat',
    // brands
    'Vercel',
    // Docker
    'Buildx',
    // files
    'autocorrectignore',
    'autocorrectrc',
    'browserslistrc',
    'commitlintrc',
    'configsrc',
    'htmlhintrc',
    'huskyrc',
    'lintstagedrc',
    'markdownlintignore',
    'stylelintignore',
    'stylelintrc',
    // Git
    'signoff',
    // nginx
    'proxied',
    // npm
    'autocorrect',
    'clsx',
    'commitlint',
    'corepack',
    'cssnano',
    'deepmerge',
    'donniean',
    'htmlhint',
    'immer',
    'markdownlint',
    'npmjs',
    'numbro',
    'rimraf',
    'sonarjs',
    'stylelint',
    'svgr',
    'tailwindcss',
    'tanstack',
    'tsup',
    'vitest',
    'zustand',
    // TypeScript
    'classname',
  ],
  ignorePaths: [
    '.git/',
    '.idea/',
    '.vscode/',
    '**/*.min.*',
    '**/*.svg',
    '**/package.json',
    '**/package-lock.json',
    '**/yarn.lock',
    '**/pnpm-lock.yaml',
    '**/Dockerfile',
    '**/CHANGELOG.md',
    '**/.htmlhintrc',
    '.*ignore',
    '.gitattributes',
  ],
});
