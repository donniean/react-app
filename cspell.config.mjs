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
    'htmlhintrc',
    'huskyrc',
    'lintstagedrc',
    'markdownlintignore',
    'nvmrc',
    'stylelintignore',
    'stylelintrc',
    // Git
    'signoff',
    // glossary
    'navs',
    // nginx
    'proxied',
    // npm
    'autocorrect',
    'clsx',
    'commitlint',
    'corepack',
    'cssnano',
    'deepmerge',
    'htmlhint',
    'immer',
    'mantine',
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
    'nodenext',
    'classname',
    // Vite
    'VITE',
    // custom
    'donniean',
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
    '**/pnpm-workspace.yaml',
    '**/Dockerfile',
    '**/CHANGELOG.md',
    '**/.htmlhintrc',
    '.*ignore',
    '.gitattributes',
  ],
});
