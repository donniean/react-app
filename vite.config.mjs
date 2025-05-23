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
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
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
      overlay: { initialIsOpen: 'error' },
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        useFlatConfig: true,
      },
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.css',
      },
    }),
  ],
});
