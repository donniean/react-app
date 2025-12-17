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
    '.autocorrectignore',
    '.autocorrectrc',
    '.browserslistrc',
    '.htmlvalidate',
    '.htmlvalidateignore',
    '.huskyrc',
    '.markdownlintignore',
    '.nvmrc',
    '.stylelintignore',
    // Git
    'signoff',
    // glossary
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
