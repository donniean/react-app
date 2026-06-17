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
    'DOCKERHUB',
    // files
    '.autocorrectignore',
    '.autocorrectrc',
    '.browserslistrc',
    '.htmlvalidate',
    '.htmlvalidateignore',
    '.huskyrc',
    '.markdownlintignore',
    '.ncurc',
    '.nvmrc',
    '.stylelintignore',
    // Git
    'signoff',
    // glossary
    'cooldown',
    'navs',
    'preid',
    // nginx
    'proxied',
    // npm
    'autocorrect',
    'clsx',
    'commitlint',
    'corepack',
    'cssnano',
    'deepmerge',
    'envinfo',
    'immer',
    'mantine',
    'markdownlint',
    'npmjs',
    'numbro',
    'oxfmt',
    'oxlint',
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
    'vite',
    // custom
    'donniean',
  ],
  ignorePaths: [
    '.*ignore',
    '.git/',
    '.gitattributes',
    '.idea/',
    '.vscode/',
    '**/*.min.*',
    '**/*.svg',
    '**/CHANGELOG.md',
    '**/Dockerfile',
    '**/package-lock.json',
    '**/package.json',
    '**/pnpm-lock.yaml',
    '**/pnpm-workspace.yaml',
    '**/yarn.lock',
  ],
});
