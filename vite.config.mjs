import { lingui } from '@lingui/vite-plugin';
// eslint-disable-next-line import-x/no-unresolved
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  plugins: [
    tsconfigPaths(),
    react({
      babel: {
        plugins: [
          'babel-plugin-react-compiler',
          '@lingui/babel-plugin-lingui-macro',
        ],
      },
    }),
    lingui(),
    svgr(),
    tailwindcss(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        useFlatConfig: true,
      },
      overlay: { initialIsOpen: 'error' },
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.css',
      },
      typescript: true,
    }),
  ],
  preview: {
    host: true,
    port: 3000,
  },
  server: {
    host: true,
    port: 3000,
  },
});
