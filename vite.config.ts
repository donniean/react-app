import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import { DEFAULT_LOCALE, DEFAULT_NAMESPACE } from './config/i18n';
import { resolveRoot } from './config/paths';

const cwd = process.cwd();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd);
  const apiUrl = env['VITE_API_BASE_URL'];

  const proxy = apiUrl
    ? {
        '/api': apiUrl,
      }
    : {};

  return {
    define: {
      __I18N_DEFAULT_LOCALE__: JSON.stringify(DEFAULT_LOCALE),
      __I18N_DEFAULT_NAMESPACE__: JSON.stringify(DEFAULT_NAMESPACE),
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
    server: {
      port: 3000,
      host: true,
      proxy,
    },
    preview: {
      port: 3000,
      host: true,
      proxy,
    },
    plugins: [
      tsconfigPaths({ projects: [resolveRoot('tsconfig.app.json')] }),
      react({
        babel: {
          plugins: ['babel-plugin-react-compiler'],
        },
      }),
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
  };
});
