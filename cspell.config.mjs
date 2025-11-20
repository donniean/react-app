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
    '.*ignore',
    '.gitattributes',
  ],
});
